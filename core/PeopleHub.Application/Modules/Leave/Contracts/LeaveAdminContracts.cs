namespace PeopleHub.Application.Modules.Leave.Contracts;

/// <summary>Query string of GET /api/v1/leave/admin/requests (Leaves &amp; WFH dashboard).</summary>
public sealed record LeaveAdminQuery
{
    public DateTime? From { get; init; }
    public DateTime? To { get; init; }
    public string? Department { get; init; }
    public string? LeaveType { get; init; }

    /// <summary>All | Pending | New | Approved | Rejected | Cancelled. New = pending and applied in the last 2 days.</summary>
    public string? Status { get; init; }

    /// <summary>Name, employee id, role or reason.</summary>
    public string? Search { get; init; }
}

/// <summary>Query string of GET /api/v1/leave/admin/employees.</summary>
public sealed record LeaveAdminEmployeesQuery
{
    public DateTime? From { get; init; }
    public DateTime? To { get; init; }
    public string? Department { get; init; }
    public string? Search { get; init; }

    /// <summary>true = count the whole year of "To" instead of the From..To period.</summary>
    public bool IgnorePeriod { get; init; }
}

/// <summary>Row of sp_leave_admin_requests.</summary>
public sealed class LeaveAdminRequestDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Designation { get; set; }
    public string Department { get; set; } = "Unassigned";
    public string LeaveType { get; set; } = string.Empty;
    public string LeaveTypeLabel { get; set; } = string.Empty;
    public string Category { get; set; } = "standard";
    public bool IsPaid { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string DayPart { get; set; } = "full";
    public decimal Days { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public DateTime AppliedAt { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? ApproverName { get; set; }
    public string? DecisionNote { get; set; }

    /// <summary>Pending and applied in the last 2 days (the "New" chip on the dashboard).</summary>
    public bool IsNew { get; set; }
}

public sealed class LeaveAdminRequestsResult
{
    public DateTime From { get; set; }
    public DateTime To { get; set; }

    /// <summary>Day used for "today" numbers: today when it is in the range, else the last day of the range.</summary>
    public DateTime ReferenceDate { get; set; }

    /// <summary>Active employees (in the department when one is picked).</summary>
    public int Headcount { get; set; }

    public IReadOnlyList<LeaveAdminRequestDto> Items { get; set; } = [];
}

/// <summary>Row of sp_leave_admin_departments.</summary>
public sealed class LeaveAdminDepartmentDto
{
    public string Department { get; set; } = string.Empty;
    public int Headcount { get; set; }
}

public sealed class LeaveAdminFiltersDto
{
    public int Headcount { get; set; }
    public IReadOnlyList<LeaveAdminDepartmentDto> Departments { get; set; } = [];
    public IReadOnlyList<LeaveTypeDto> LeaveTypes { get; set; } = [];
}

/// <summary>Row of sp_leave_admin_balances (one employee x one leave type).</summary>
public sealed class LeaveAdminBalanceRow
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Designation { get; set; }
    public string Department { get; set; } = "Unassigned";
    public string LeaveType { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public decimal? Entitlement { get; set; }
    public decimal Used { get; set; }
    public decimal Pending { get; set; }
}

public sealed class LeaveAdminBalanceDto
{
    public string LeaveType { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;

    /// <summary>null = no limit (Loss of Pay).</summary>
    public decimal? Total { get; set; }
    public decimal Used { get; set; }
    public decimal Pending { get; set; }
    public decimal? Left { get; set; }
}

public sealed class LeaveAdminEmployeeDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Designation { get; set; }
    public string Department { get; set; } = "Unassigned";

    /// <summary>Totals over limited leave types (WFH and unlimited types are not counted).</summary>
    public decimal TotalDays { get; set; }
    public decimal UsedDays { get; set; }
    public decimal PendingDays { get; set; }
    public decimal AvailableDays { get; set; }
    public int UtilizationPercent { get; set; }
    public IReadOnlyList<LeaveAdminBalanceDto> Balances { get; set; } = [];
}

public static class LeaveAdminRules
{
    public const int MaxRangeDays = 731;
    public const int SearchMax = 100;
    public const int DepartmentMax = 100;
    public const int NewWithinHours = 48;
    public static readonly string[] Statuses = ["All", "Pending", "New", "Approved", "Rejected", "Cancelled"];

    /// <summary>Not counted in leave balances / utilization.</summary>
    public const string WfhCode = "wfh";
}
