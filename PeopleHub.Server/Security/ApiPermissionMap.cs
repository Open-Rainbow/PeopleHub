using System.Text.RegularExpressions;

namespace PeopleHub.Server.Security;

/// <summary>
/// Which page permission each API call needs. First matching rule wins; calls with no rule are not checked.
/// Path is relative to /api/v1/. Pages are sec.Page keys (database/setup.sql); allowed when the role has the action
/// on at least one of them.
/// </summary>
internal static class ApiPermissionMap
{
    internal sealed record Rule(string Verbs, Regex Path, string[] Pages, string Action, bool Public = false)
    {
        public bool Matches(string verb, string path) => (Verbs == "*" || Verbs.Split('|').Contains(verb)) && Path.IsMatch(path);
    }

    private const string Get = "GET";
    private const string Post = "POST";
    private const string Put = "PUT|PATCH";
    private const string Delete = "DELETE";
    private const string Any = "*";

    private static readonly string[] LeavePages = ["apply-leave", "leave-approval", "leave-management"];
    private static readonly string[] ApproverPages = ["leave-approval", "leave-management"];
    private static readonly string[] PayrollPages = ["payroll", "payroll.manage"];

    private static Rule R(string verbs, string pattern, string[] pages, string action) =>
        new(verbs, new Regex($"^{pattern}$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled), pages, action);

    private static Rule Open(string verbs, string pattern) =>
        new(verbs, new Regex($"^{pattern}$", RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled), [], "view", true);

    internal static readonly IReadOnlyList<Rule> Rules =
    [
        // Setup
        Open(Get, "setup/my-access"),
        Open(Post, "setup/fields/register"),
        R(Get, "setup(/.*)?", ["setup"], "view"),
        R(Post, "setup/roles", ["setup"], "create"),
        R(Delete, "setup/roles/\\d+", ["setup"], "delete"),
        R(Any, "setup/.*", ["setup"], "edit"),

        // Announcements
        R(Post, "announcements/read", ["announcements", "announcements.manage"], "view"),
        R(Get, "announcements(/.*)?", ["announcements", "announcements.manage"], "view"),
        R(Post, "announcements", ["announcements.manage"], "create"),
        R(Put, "announcements/.*", ["announcements.manage"], "edit"),
        R(Delete, "announcements/.*", ["announcements.manage"], "delete"),

        // Attendance
        R(Post, "attendance/regularizations/\\d+/decision", ["attendance"], "approve"),
        R(Post, "attendance/(check-in|check-out|regularizations|regularizations/\\d+/cancel)", ["attendance"], "create"),
        R(Get, "attendance(/.*)?", ["attendance"], "view"),

        // Employees
        R(Post, "add-employee/.*", ["employees.add"], "create"),
        R(Get, "employees/export", ["employees.view"], "export"),
        R(Get, "employees(/.*)?", ["employees.view"], "view"),
        R(Post, "employees/[^/]+/status", ["employees.add"], "edit"),
        R(Delete, "employees/[^/]+", ["employees.add"], "delete"),
        R(Get, "org-chart(/.*)?", ["org-chart", "employees.view"], "view"),
        R(Put, "org-chart/.*", ["org-chart"], "edit"),

        // Holidays
        R(Get, "holidays(/.*)?", ["holidays", "holidays.manage"], "view"),
        R(Post, "holidays", ["holidays.manage"], "create"),
        R(Put, "holidays/.*", ["holidays.manage"], "edit"),
        R(Delete, "holidays/.*", ["holidays.manage"], "delete"),

        // Leave
        R(Get, "leave/admin(/.*)?", ApproverPages, "view"),
        R(Get, "leave/approvals", ApproverPages, "view"),
        R(Post, "leave/requests/\\d+/decision", ApproverPages, "approve"),
        R(Post, "leave/requests(/\\d+/withdraw)?", ["apply-leave"], "create"),
        R(Get, "leave/(policies|employment-types)(/.*)?", LeavePages, "view"),
        R(Any, "leave/policies(/.*)?", ["leave-management"], "edit"),
        R(Get, "leave(/.*)?", LeavePages, "view"),

        // Payroll: self-service first, then processing
        R(Get, "payroll/(me/salary|payslips(/.*)?|declarations|reimbursements)", PayrollPages, "view"),
        R(Post, "payroll/tax/compare", PayrollPages, "view"),
        R(Post, "payroll/(declarations|reimbursements)/\\d+/decision", ["payroll.manage"], "approve"),
        R(Put, "payroll/declarations", ["payroll"], "create"),
        R(Post, "payroll/reimbursements(/\\d+/cancel)?", ["payroll"], "create"),
        R(Post, "payroll/runs/\\d+/publish", ["payroll.manage"], "approve"),
        R(Post, "payroll/runs/\\d+/(process|lock|unlock)", ["payroll.manage"], "edit"),
        R(Post, "payroll/structures/preview", ["payroll.manage"], "view"),
        R(Get, "payroll(/.*)?", ["payroll.manage"], "view"),
        R(Post, "payroll/.*", ["payroll.manage"], "create"),
        R(Put, "payroll/.*", ["payroll.manage"], "edit"),
        R(Delete, "payroll/.*", ["payroll.manage"], "delete"),

        // Policies
        R(Get, "policies/\\d+/acknowledgements", ["policies"], "edit"),
        R(Post, "policies/\\d+/acknowledge", ["policies"], "view"),
        R(Get, "policies(/.*)?", ["policies"], "view"),
        R(Post, "policies", ["policies"], "create"),
        R(Put, "policies/\\d+", ["policies"], "edit"),
        R(Post, "policies/\\d+/status", ["policies"], "edit"),
        R(Delete, "policies/\\d+", ["policies"], "delete"),
    ];

    private const string Prefix = "/api/v1/";

    /// <summary>The rule for this call, or null when the path is not secured by page permissions.</summary>
    internal static Rule? Match(string method, string? path)
    {
        if (string.IsNullOrEmpty(path) || !path.StartsWith(Prefix, StringComparison.OrdinalIgnoreCase)) return null;
        var relative = path[Prefix.Length..].TrimEnd('/');
        var verb = method.ToUpperInvariant();
        return Rules.FirstOrDefault(r => r.Matches(verb, relative));
    }
}
