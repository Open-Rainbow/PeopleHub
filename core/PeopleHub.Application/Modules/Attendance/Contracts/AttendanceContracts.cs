namespace PeopleHub.Application.Modules.Attendance.Contracts;

/// <summary>Body for POST /api/v1/attendance/check-in.</summary>
public sealed record CheckInRequest
{
    /// <summary>Employee code (EMP00001). Ignored once the caller is authenticated.</summary>
    public string? EmployeeId { get; init; }

    /// <summary>Office | Remote</summary>
    public string? WorkMode { get; init; } = "Office";

    public string? Note { get; init; }
}

/// <summary>Body for POST /api/v1/attendance/check-out.</summary>
public sealed record CheckOutRequest
{
    public string? EmployeeId { get; init; }
    public string? Note { get; init; }
}

/// <summary>Body for POST /api/v1/attendance/regularizations ("I forgot to check in / out").</summary>
public sealed record RegularizationRequest
{
    public string? EmployeeId { get; init; }
    public DateTime? WorkDate { get; init; }

    /// <summary>HH:mm, organization local time.</summary>
    public string? CheckIn { get; init; }

    /// <summary>HH:mm, organization local time.</summary>
    public string? CheckOut { get; init; }

    public string? WorkMode { get; init; } = "Office";
    public string? Reason { get; init; }
}

/// <summary>Body for POST /api/v1/attendance/regularizations/{id}/decision.</summary>
public sealed record RegularizationDecisionRequest
{
    public bool? Approve { get; init; }

    /// <summary>Required when rejecting.</summary>
    public string? Note { get; init; }

    /// <summary>Approver employee code. Ignored once the caller is authenticated.</summary>
    public string? ApproverId { get; init; }
}

/// <summary>Body for POST /api/v1/attendance/regularizations/{id}/cancel.</summary>
public sealed record CancelRegularizationRequest
{
    public string? EmployeeId { get; init; }
}

public sealed class AttendancePolicyDto
{
    public string ShiftStart { get; set; } = "09:30";
    public string ShiftEnd { get; set; } = "18:30";
    public int GraceMinutes { get; set; }
    public decimal FullDayHours { get; set; }
    public decimal HalfDayHours { get; set; }
    public int RegularizeDays { get; set; }
    public string TimeZone { get; set; } = string.Empty;

    /// <summary>Current time in the organization's time zone (the client uses it to fix clock drift).</summary>
    public DateTime ServerNow { get; set; }
}

/// <summary>One calendar day for one employee (att.fn_days).</summary>
public sealed class AttendanceDayDto
{
    public DateTime Date { get; set; }

    /// <summary>Present | Half day | Short day | Working | Missed check-out | On leave | Holiday | Weekend | Not checked in | Absent | Upcoming</summary>
    public string Status { get; set; } = string.Empty;

    public bool IsLate { get; set; }
    public DateTime? CheckInAt { get; set; }
    public DateTime? CheckOutAt { get; set; }
    public int? WorkedMinutes { get; set; }
    public string? WorkMode { get; set; }
    public string? Source { get; set; }
    public string? Note { get; set; }
    public string? HolidayName { get; set; }
    public string? LeaveType { get; set; }
    public bool IsHalfDayLeave { get; set; }
}

/// <summary>Check-in / check-out response: message + today's row.</summary>
public sealed record AttendanceActionResult(string Message, AttendanceDayDto? Today);

/// <summary>One employee's status on one day (HR / manager view).</summary>
public sealed class TeamDayRowDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool IsLate { get; set; }
    public DateTime? CheckInAt { get; set; }
    public DateTime? CheckOutAt { get; set; }
    public int? WorkedMinutes { get; set; }
    public string? WorkMode { get; set; }
    public string? Source { get; set; }
    public string? LeaveType { get; set; }
    public string? HolidayName { get; set; }
}

/// <summary>Organization-wide counts for one day.</summary>
public sealed class AttendanceTrendDto
{
    public DateTime Date { get; set; }
    public int Present { get; set; }
    public int Late { get; set; }
    public int Remote { get; set; }
    public int OnLeave { get; set; }
    public int Absent { get; set; }
    public bool IsOffDay { get; set; }
}

public sealed class RegularizationDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime WorkDate { get; set; }
    public string CheckIn { get; set; } = string.Empty;
    public string CheckOut { get; set; } = string.Empty;
    public string WorkMode { get; set; } = "Office";
    public string Reason { get; set; } = string.Empty;

    /// <summary>Pending | Approved | Rejected | Cancelled</summary>
    public string Status { get; set; } = "Pending";

    public string? ApproverId { get; set; }
    public string? ApproverName { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? DecidedAt { get; set; }
    public DateTime RequestedAt { get; set; }
}

public static class AttendanceRules
{
    public const int NoteMax = 200;
    public const int ReasonMin = 10;
    public const int ReasonMax = 300;
    public const int DecisionNoteMax = 300;
    public const int MaxRangeDays = 93;
    public const int MaxTrendDays = 62;
    public const int SearchMax = 100;

    public static readonly string[] WorkModes = ["Office", "Remote"];
    public static readonly string[] RegularizationStatuses = ["All", "Pending", "Approved", "Rejected", "Cancelled"];

    /// <summary>Office | Remote in canonical casing, or null when unknown. Empty = Office.</summary>
    public static string? CanonicalMode(string? value) =>
        string.IsNullOrWhiteSpace(value)
            ? "Office"
            : WorkModes.FirstOrDefault(m => m.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));

    /// <summary>Parses "HH:mm" (24h). Null when invalid.</summary>
    public static TimeSpan? ParseTime(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        var parts = value.Trim().Split(':');
        if (parts.Length != 2 || parts[0].Length is < 1 or > 2 || parts[1].Length != 2) return null;
        if (!int.TryParse(parts[0], out var h) || !int.TryParse(parts[1], out var m)) return null;
        return h is >= 0 and <= 23 && m is >= 0 and <= 59 ? new TimeSpan(h, m, 0) : null;
    }
}
