using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Leave;

/// <summary>One method per Leaves &amp; WFH dashboard stored procedure (database section 19).</summary>
internal sealed class LeaveAdminRepository(SqlDb db) : ILeaveAdminRepository
{
    public Task<List<LeaveAdminDepartmentDto>> GetDepartmentsAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<LeaveAdminDepartmentDto>(StoredProcedures.AdminDepartments, new { OrganizationId = organizationId }, ct);

    public Task<List<LeaveAdminRequestDto>> GetRequestsAsync(
        int organizationId, DateTime from, DateTime to, string? department, string? leaveType, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@From", from.Date, DbType.Date);
        p.Add("@To", to.Date, DbType.Date);
        p.Add("@Department", department);
        p.Add("@LeaveType", leaveType, DbType.AnsiString, size: 20);
        return db.QueryAsync<LeaveAdminRequestDto>(StoredProcedures.AdminRequests, p, ct);
    }

    public Task<List<LeaveAdminBalanceRow>> GetBalancesAsync(
        int organizationId, int year, DateTime from, DateTime to, string? department, string? search, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Year", year);
        p.Add("@From", from.Date, DbType.Date);
        p.Add("@To", to.Date, DbType.Date);
        p.Add("@Department", department);
        p.Add("@Search", search);
        return db.QueryAsync<LeaveAdminBalanceRow>(StoredProcedures.AdminBalances, p, ct);
    }
}
