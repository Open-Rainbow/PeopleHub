namespace PeopleHub.Application.Modules.Leave.Contracts;

/// <summary>Body for POST /api/v1/leave/requests.</summary>
public sealed record ApplyLeaveRequest
{
    /// <summary>Employee code (EMP00001). Ignored when the caller is authenticated (taken from the token).</summary>
    public string? EmployeeId { get; init; }

    /// <summary>earned | casual | sick | comp-off | loss-of-pay</summary>
    public string? LeaveType { get; init; }

    public DateTime? FromDate { get; init; }
    public DateTime? ToDate { get; init; }

    /// <summary>full | first-half | second-half (half days only for a single date).</summary>
    public string? DayPart { get; init; } = "full";

    public string? Reason { get; init; }
}

/// <summary>Body for POST /api/v1/leave/requests/{id}/withdraw.</summary>
public sealed record WithdrawLeaveRequest(string? EmployeeId);

/// <summary>Body for POST /api/v1/leave/requests/{id}/decision.</summary>
public sealed record LeaveDecisionRequest
{
    public bool Approve { get; init; }
    public string? Note { get; init; }

    /// <summary>Approver employee code. Ignored when authenticated.</summary>
    public string? ApproverId { get; init; }
}

public sealed class LeaveTypeDto
{
    public string Code { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string ShortCode { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? AnnualEntitlement { get; set; }
    public int BackdateDays { get; set; }
    public decimal? MaxConsecutive { get; set; }
    public decimal? DocumentAfterDays { get; set; }
    public bool IsPaid { get; set; }
}

public sealed class HolidayDto
{
    public DateTime Date { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsOptional { get; set; }
}

public sealed class LeaveBalanceDto
{
    public string LeaveType { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;

    /// <summary>null = no limit (Loss of Pay).</summary>
    public decimal? Entitlement { get; set; }

    public decimal Used { get; set; }
    public decimal Pending { get; set; }
    public decimal? Available { get; set; }
}

public sealed class LeaveRequestDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string LeaveType { get; set; } = string.Empty;
    public string LeaveTypeLabel { get; set; } = string.Empty;
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public string DayPart { get; set; } = "full";
    public decimal Days { get; set; }
    public string Reason { get; set; } = string.Empty;

    /// <summary>Pending | Approved | Rejected | Cancelled</summary>
    public string Status { get; set; } = "Pending";

    public string? ApproverId { get; set; }
    public string? ApproverName { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? DecidedAt { get; set; }
    public DateTime AppliedAt { get; set; }
}

/// <summary>Raw result of the apply procedure.</summary>
public sealed record LeaveApplyResult(int? Id, string Message);

public static class LeaveRules
{
    public const int ReasonMin = 5;
    public const int ReasonMax = 500;
    public const int NoteMax = 500;
    public const int MaxRangeDays = 366;

    public static readonly string[] LeaveTypes = ["earned", "casual", "sick", "comp-off", "loss-of-pay"];
    public static readonly string[] DayParts = ["full", "first-half", "second-half"];
    public static readonly string[] Statuses = ["All", "Pending", "Approved", "Rejected", "Cancelled"];
}
