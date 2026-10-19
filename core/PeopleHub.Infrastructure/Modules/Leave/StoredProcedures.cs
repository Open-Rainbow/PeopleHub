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

    // Leave Policy Manager
    public const string GetEmploymentTypes = "dbo.sp_get_employment_types";
    public const string GetPolicies = "dbo.sp_get_leave_policies";
    public const string GetPolicy = "dbo.sp_get_leave_policy";
    public const string GetPolicyItems = "dbo.sp_get_leave_policy_items";
    public const string SavePolicyDraft = "dbo.sp_save_leave_policy_draft";
    public const string PublishPolicy = "dbo.sp_publish_leave_policy";
    public const string DiscardPolicyDraft = "dbo.sp_discard_leave_policy_draft";
    public const string CopyPolicy = "dbo.sp_copy_leave_policy";
}
