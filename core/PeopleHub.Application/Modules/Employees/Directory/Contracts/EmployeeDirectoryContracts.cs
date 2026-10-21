using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace PeopleHub.Application.Modules.Employees.Directory.Contracts;

/// <summary>GET api/v1/employees query string. "All" or empty means no filter.</summary>
public sealed class EmployeeQuery
{
    public string? Search { get; set; }
    public string? Status { get; set; }
    public string? Department { get; set; }
    public string? Location { get; set; }
    public string? EmployeeType { get; set; }
    public string? ManagerCode { get; set; }
    public DateTime? JoinedFrom { get; set; }
    public DateTime? JoinedTo { get; set; }
    public bool IncludeExited { get; set; }
    /// <summary>name, code, designation, department, location, status or joined.</summary>
    public string? SortBy { get; set; }
    /// <summary>asc or desc.</summary>
    public string? SortDir { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = EmployeeDirectoryRules.DefaultPageSize;

    public EmployeeQuery Copy() => (EmployeeQuery)MemberwiseClone();
}

/// <summary>One row of the directory (sp_dir_get_employees).</summary>
public sealed record EmployeeListItemDto
{
    public int Id { get; init; }
    public string EmployeeCode { get; init; } = "";
    public string FullName { get; init; } = "";
    public string? PreferredName { get; init; }
    public string? Designation { get; init; }
    public string? Department { get; init; }
    public string? BusinessUnit { get; init; }
    public string? WorkLocation { get; init; }
    public string? EmployeeType { get; init; }
    public string? OfficeEmail { get; init; }
    public string? MobileNumber { get; init; }
    public string Status { get; init; } = "Active";
    public DateTime? DateOfJoining { get; init; }
    public string? ManagerCode { get; init; }
    public string? ManagerName { get; init; }
    public int DirectReports { get; init; }
    public bool HasPhoto { get; init; }
    [JsonIgnore] public int TotalCount { get; init; }
}

public sealed record EmployeePageDto(IReadOnlyList<EmployeeListItemDto> Items, int Total, int Page, int PageSize);

/// <summary>Cards on top of the screen (sp_dir_get_summary).</summary>
public sealed record EmployeeSummaryDto
{
    public int Total { get; init; }
    public int Active { get; init; }
    public int Onboarding { get; init; }
    public int Probation { get; init; }
    public int NoticePeriod { get; init; }
    public int OnLeave { get; init; }
    public int Inactive { get; init; }
    public int Exited { get; init; }
    public int JoinedLast30Days { get; init; }
    public int Departments { get; init; }
}

/// <summary>One filter value (sp_dir_get_filters). Kind: department, location, type, status or manager.</summary>
public sealed record FilterOptionDto
{
    public string Kind { get; init; } = "";
    public string Value { get; init; } = "";
    public string Label { get; init; } = "";
    public int Count { get; init; }
}

public sealed record EmployeeFiltersDto(
    IReadOnlyList<FilterOptionDto> Departments,
    IReadOnlyList<FilterOptionDto> Locations,
    IReadOnlyList<FilterOptionDto> Types,
    IReadOnlyList<FilterOptionDto> Statuses,
    IReadOnlyList<FilterOptionDto> Managers);

/// <summary>Side panel (sp_dir_get_profile).</summary>
public sealed record EmployeeProfileDto
{
    public int Id { get; init; }
    public string EmployeeCode { get; init; } = "";
    public string? Salutation { get; init; }
    public string? FirstName { get; init; }
    public string? MiddleName { get; init; }
    public string? LastName { get; init; }
    public string FullName { get; init; } = "";
    public string? PreferredName { get; init; }
    public string? Gender { get; init; }
    public DateTime? DateOfBirth { get; init; }
    public DateTime? DateOfJoining { get; init; }
    public string? MaritalStatus { get; init; }
    public string? BloodGroup { get; init; }
    public string? Nationality { get; init; }
    public string Status { get; init; } = "Active";
    public bool HasPhoto { get; init; }
    public string? Designation { get; init; }
    public string? Department { get; init; }
    public string? BusinessUnit { get; init; }
    public string? WorkLocation { get; init; }
    public string? EmployeeType { get; init; }
    public string? EmploymentStatus { get; init; }
    public string? OfficeEmail { get; init; }
    public string? PayLevel { get; init; }
    public string? ShiftTimings { get; init; }
    public string? WorkSchedule { get; init; }
    public DateTime? ProbationStartDate { get; init; }
    public DateTime? ProbationEndDate { get; init; }
    public DateTime? ConfirmationDate { get; init; }
    public string? ManagerCode { get; init; }
    public string? ManagerName { get; init; }
    public string? HrOwnerCode { get; init; }
    public string? HrOwnerName { get; init; }
    public string? PersonalMail { get; init; }
    public string? AlternateMail { get; init; }
    public string? MobileNumber { get; init; }
    public string? AlternateMobile { get; init; }
    public string? OfficialEmail { get; init; }
    public string? LinkedinUrl { get; init; }
    public int DirectReports { get; init; }
    /// <summary>Base64 photo, or null.</summary>
    public string? Photo { get; init; }
}

public sealed record EmployeeStatusHistoryDto
{
    public int Id { get; init; }
    public string? OldStatus { get; init; }
    public string NewStatus { get; init; } = "";
    public string? Reason { get; init; }
    public DateTime? EffectiveDate { get; init; }
    public DateTime ChangedAt { get; init; }
    public string? ChangedBy { get; init; }
}

/// <summary>POST api/v1/employees/{code}/status</summary>
public sealed record SetEmployeeStatusRequest(string? Status, string? Reason, DateTime? EffectiveDate);

public sealed record ExportFileDto(string FileName, string ContentType, byte[] Content);

public static partial class EmployeeDirectoryRules
{
    public static readonly string[] Statuses = ["Onboarding", "Active", "Probation", "Notice Period", "On Leave", "Inactive", "Exited"];
    public static readonly string[] SortFields = ["name", "code", "designation", "department", "location", "status", "joined"];

    public const int DefaultPageSize = 20;
    public const int MaxPageSize = 100;
    public const int ExportMax = 10000;
    public const int SearchMax = 100;
    public const int ReasonMax = 500;

    /// <summary>The list value with the right casing, or null when it is not in the list.</summary>
    public static string? Canonical(IEnumerable<string> values, string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : values.FirstOrDefault(v => string.Equals(v, value.Trim(), StringComparison.OrdinalIgnoreCase));

    /// <summary>Exited and Inactive need a reason.</summary>
    public static bool NeedsReason(string? status) => status is "Exited" or "Inactive";

    public static bool IsCode(string? value) => !string.IsNullOrWhiteSpace(value) && value.Length <= 50 && CodePattern().IsMatch(value);

    /// <summary>Empty or "All" means no filter.</summary>
    public static string? Filter(string? value, int max)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        var v = value.Trim();
        if (string.Equals(v, "All", StringComparison.OrdinalIgnoreCase)) return null;
        return v.Length <= max ? v : v[..max];
    }

    [GeneratedRegex("^[A-Za-z0-9_-]+$")]
    private static partial Regex CodePattern();
}
