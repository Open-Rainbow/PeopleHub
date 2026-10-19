namespace PeopleHub.Infrastructure.Modules.Leave;

/// <summary>Stored procedure names for leave (see database/leave.sql).</summary>
internal static class StoredProcedures
{
    public const string GetTypes = "dbo.sp_get_leave_types";
    public const string GetHolidays = "dbo.sp_get_holidays";
    public const string GetBalances = "dbo.sp_get_leave_balances";
    public const string GetRequests = "dbo.sp_get_leave_requests";
    public const string GetRequest = "dbo.sp_get_leave_request";
    public const string GetApprovals = "dbo.sp_get_leave_approvals";
    public const string Apply = "dbo.sp_apply_leave";
    public const string Withdraw = "dbo.sp_withdraw_leave";
    public const string Decide = "dbo.sp_decide_leave";
}
