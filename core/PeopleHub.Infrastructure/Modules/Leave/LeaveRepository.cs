using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Leave;

/// <summary>One method per leave stored procedure.</summary>
internal sealed class LeaveRepository(SqlDb db) : ILeaveRepository
{
    public Task<List<LeaveTypeDto>> GetTypesAsync(int organizationId, string? employeeId, int? year, CancellationToken ct) =>
        db.QueryAsync<LeaveTypeDto>(
            StoredProcedures.GetTypes,
            new { OrganizationId = organizationId, Employee_Id = employeeId, Year = year },
            ct);

    public Task<List<HolidayDto>> GetHolidaysAsync(int organizationId, int year, CancellationToken ct) =>
        db.QueryAsync<HolidayDto>(StoredProcedures.GetHolidays, new { OrganizationId = organizationId, Year = year }, ct);

    public Task<List<LeaveBalanceDto>> GetBalancesAsync(int organizationId, string employeeId, int year, CancellationToken ct) =>
        db.QueryAsync<LeaveBalanceDto>(
            StoredProcedures.GetBalances,
            new { OrganizationId = organizationId, Employee_Id = employeeId, Year = year },
            ct);

    public Task<List<LeaveRequestDto>> GetRequestsAsync(int organizationId, string employeeId, string? status, CancellationToken ct) =>
        db.QueryAsync<LeaveRequestDto>(
            StoredProcedures.GetRequests,
            new { OrganizationId = organizationId, Employee_Id = employeeId, Status = status },
            ct);

    public async Task<LeaveRequestDto?> GetRequestAsync(int organizationId, int id, CancellationToken ct)
    {
        var rows = await db.QueryAsync<LeaveRequestDto>(StoredProcedures.GetRequest, new { OrganizationId = organizationId, Id = id }, ct);
        return rows.FirstOrDefault();
    }

    public async Task<LeaveApplyResult> ApplyAsync(int organizationId, string employeeId, string userId, ApplyLeaveRequest r, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", null, DbType.Int32, ParameterDirection.Output);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@LeaveType", r.LeaveType, DbType.AnsiString, size: 20);
        p.Add("@FromDate", r.FromDate?.Date, DbType.Date);
        p.Add("@ToDate", r.ToDate?.Date, DbType.Date);
        p.Add("@DayPart", r.DayPart ?? "full", DbType.AnsiString, size: 12);
        p.Add("@Reason", r.Reason);
        p.Add("@UserId", userId);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync(StoredProcedures.Apply, p, ct);

        return new LeaveApplyResult(p.Get<int?>("@Id"), p.Get<string?>("@ResultMessage") ?? "Leave request sent.");
    }

    public async Task<bool> WithdrawAsync(int organizationId, string employeeId, string userId, int id, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(StoredProcedures.Withdraw, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public Task<List<LeaveRequestDto>> GetApprovalsAsync(int organizationId, string? approverId, CancellationToken ct) =>
        db.QueryAsync<LeaveRequestDto>(
            StoredProcedures.GetApprovals,
            new { OrganizationId = organizationId, Approver_Id = approverId },
            ct);

    public async Task<bool> DecideAsync(int organizationId, string? approverId, string userId, int id, LeaveDecisionRequest r, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Approve", r.Approve);
        p.Add("@Note", string.IsNullOrWhiteSpace(r.Note) ? null : r.Note.Trim());
        p.Add("@Approver_Id", approverId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(StoredProcedures.Decide, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }
}
