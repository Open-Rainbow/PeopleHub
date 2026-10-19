namespace PeopleHub.Application.Modules.OrgChart.Contracts;

/// <summary>One person on the org chart. The client builds the tree from ManagerId.</summary>
public sealed class OrgChartNodeDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? PreferredName { get; set; }
    public string? Designation { get; set; }
    public string? Department { get; set; }
    public string? WorkLocation { get; set; }
    public string? EmployeeType { get; set; }
    public string? EmploymentStatus { get; set; }
    public string? EmployeeStatus { get; set; }

    /// <summary>Null for the top of the chart (or when the saved manager is missing / part of a loop).</summary>
    public string? ManagerId { get; set; }

    public string? DottedLineManagerId { get; set; }
    public string? Email { get; set; }
    public string? Mobile { get; set; }
    public DateTime? DateOfJoining { get; set; }
    public int DirectReports { get; set; }
    public int TotalReports { get; set; }

    /// <summary>True when the saved reporting line formed a loop and was cut here.</summary>
    public bool InLoop { get; set; }
}

/// <summary>Body for PUT /api/v1/org-chart/{employeeId}/manager.</summary>
public sealed record SetManagerRequest
{
    /// <summary>Employee code of the new manager. Null or empty = top of the chart.</summary>
    public string? ManagerId { get; init; }
}

public static class OrgChartRules
{
    public const int CodeMax = 50;
}
