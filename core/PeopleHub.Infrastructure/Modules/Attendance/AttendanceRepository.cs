using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Attendance.Contracts;
using PeopleHub.Application.Modules.Attendance.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Attendance;

/// <summary>One method per attendance stored procedure (database/attendance.sql).</summary>
internal sealed class AttendanceRepository(SqlDb db) : IAttendanceRepository
{
    private const string GetPolicy = "dbo.sp_att_get_policy";
    private const string GetDays = "dbo.sp_att_get_days";
    private const string CheckIn = "dbo.sp_att_check_in";
    private const string CheckOut = "dbo.sp_att_check_out";
    private const string GetTeamDay = "dbo.sp_att_get_team_day";
    private const string GetTrend = "dbo.sp_att_get_trend";
    private const string GetRegularizations = "dbo.sp_att_get_regularizations";
    private const string RequestRegularization = "dbo.sp_att_request_regularization";
    private const string DecideRegularization = "dbo.sp_att_decide_regularization";
    private const string CancelRegularization = "dbo.sp_att_cancel_regularization";

    public async Task<AttendancePolicyDto?> GetPolicyAsync(int organizationId, CancellationToken ct) =>
        (await db.QueryAsync<AttendancePolicyDto>(GetPolicy, new { OrganizationId = organizationId }, ct)).FirstOrDefault();

    public Task<List<AttendanceDayDto>> GetDaysAsync(int organizationId, string employeeId, DateTime from, DateTime to, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@From", from.Date, DbType.Date);
        p.Add("@To", to.Date, DbType.Date);
        return db.QueryAsync<AttendanceDayDto>(GetDays, p, ct);
    }

    public async Task<AttendanceActionResult> CheckInAsync(int organizationId, string employeeId, string userId, string workMode, string? note, CancellationToken ct)
    {
        var p = Action(organizationId, employeeId, userId, note);
        p.Add("@WorkMode", workMode, DbType.AnsiString, size: 10);
        var rows = await db.QueryAsync<AttendanceDayDto>(CheckIn, p, ct);
        return new AttendanceActionResult(p.Get<string?>("@ResultMessage") ?? "Checked in.", rows.FirstOrDefault());
    }

    public async Task<AttendanceActionResult> CheckOutAsync(int organizationId, string employeeId, string userId, string? note, CancellationToken ct)
    {
        var p = Action(organizationId, employeeId, userId, note);
        var rows = await db.QueryAsync<AttendanceDayDto>(CheckOut, p, ct);
        return new AttendanceActionResult(p.Get<string?>("@ResultMessage") ?? "Checked out.", rows.FirstOrDefault());
    }

    public Task<List<TeamDayRowDto>> GetTeamDayAsync(int organizationId, DateTime date, string? search, string? managerId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Date", date.Date, DbType.Date);
        p.Add("@Search", search);
        p.Add("@Manager_Id", managerId, DbType.AnsiString, size: 50);
        return db.QueryAsync<TeamDayRowDto>(GetTeamDay, p, ct);
    }

    public Task<List<AttendanceTrendDto>> GetTrendAsync(int organizationId, DateTime from, DateTime to, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@From", from.Date, DbType.Date);
        p.Add("@To", to.Date, DbType.Date);
        return db.QueryAsync<AttendanceTrendDto>(GetTrend, p, ct);
    }

    public Task<List<RegularizationDto>> GetRegularizationsAsync(int organizationId, string? employeeId, string? status, int? id, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@Status", status, DbType.AnsiString, size: 10);
        p.Add("@Id", id, DbType.Int32);
        return db.QueryAsync<RegularizationDto>(GetRegularizations, p, ct);
    }

    public async Task<int?> RequestRegularizationAsync(int organizationId, string employeeId, string userId, DateTime workDate,
        TimeSpan checkIn, TimeSpan checkOut, string workMode, string reason, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@WorkDate", workDate.Date, DbType.Date);
        p.Add("@CheckIn", checkIn, DbType.Time);
        p.Add("@CheckOut", checkOut, DbType.Time);
        p.Add("@WorkMode", workMode, DbType.AnsiString, size: 10);
        p.Add("@Reason", reason);
        p.Add("@UserId", userId);
        await db.ExecuteAsync(RequestRegularization, p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> DecideRegularizationAsync(int organizationId, int id, bool approve, string? note, string? approverId, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Approve", approve);
        p.Add("@Note", note);
        p.Add("@Approver_Id", approverId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(DecideRegularization, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public async Task<bool> CancelRegularizationAsync(int organizationId, int id, string employeeId, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(CancelRegularization, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    private static DynamicParameters Action(int organizationId, string employeeId, string userId, string? note)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@Note", note);
        p.Add("@UserId", userId);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);
        return p;
    }
}
