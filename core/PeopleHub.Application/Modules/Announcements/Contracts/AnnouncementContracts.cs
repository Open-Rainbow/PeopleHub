namespace PeopleHub.Application.Modules.Announcements.Contracts;

/// <summary>Body for POST /api/v1/announcements and PUT /api/v1/announcements/{id}.</summary>
public sealed record AnnouncementRequest
{
    public string? Title { get; init; }
    public string? Description { get; init; }

    /// <summary>High | Medium | Low</summary>
    public string? Priority { get; init; }

    public string? Category { get; init; }
    public string? Department { get; init; }
    public string? TargetAudience { get; init; }

    /// <summary>Future date = scheduled (hidden from employees until then).</summary>
    public DateTime? PublishOn { get; init; }

    public DateTime? ExpiresOn { get; init; }
    public bool IsPinned { get; init; }

    /// <summary>Optional display name; defaults to "HR Team".</summary>
    public string? PostedBy { get; init; }
}

/// <summary>Query string for GET /api/v1/announcements.</summary>
public sealed record AnnouncementQuery
{
    /// <summary>All | Active | Scheduled | Expired (default All).</summary>
    public string? Status { get; init; }

    public string? Search { get; init; }

    /// <summary>Employee feeds pass false so scheduled items stay hidden.</summary>
    public bool IncludeScheduled { get; init; } = true;
}

/// <summary>One announcement as returned by the API. Status and IsRead are computed by the database.</summary>
public sealed class AnnouncementDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Priority { get; set; } = "Medium";
    public string Category { get; set; } = "General";
    public string Department { get; set; } = "All Departments";
    public string TargetAudience { get; set; } = "All Employees";
    public DateTime PublishOn { get; set; }
    public DateTime ExpiresOn { get; set; }
    public bool IsPinned { get; set; }
    public string PostedBy { get; set; } = "HR Team";

    /// <summary>Active | Scheduled | Expired</summary>
    public string Status { get; set; } = "Active";

    public bool IsRead { get; set; }
    public int ReadCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

/// <summary>Counts for the HR stat cards and the employee unread badge.</summary>
public sealed class AnnouncementSummary
{
    public int Total { get; set; }
    public int Active { get; set; }
    public int Scheduled { get; set; }
    public int Expired { get; set; }
    public int Unread { get; set; }
}

public sealed record PinAnnouncementRequest(bool IsPinned);

public sealed record MarkAnnouncementsReadRequest(IReadOnlyList<int> Ids);

/// <summary>Raw result from the save stored procedure (Id is null when the row was not found).</summary>
public sealed record AnnouncementSaveResult(int? Id, string Message);

public static class AnnouncementRules
{
    public const int TitleMax = 120;
    public const int DescriptionMax = 2000;
    public const int CategoryMax = 50;
    public const int DepartmentMax = 100;
    public const int AudienceMax = 50;
    public const int PostedByMax = 100;
    public const int SearchMax = 100;
    public const int MarkReadMax = 200;

    public static readonly string[] Priorities = ["High", "Medium", "Low"];
    public static readonly string[] Statuses = ["All", "Active", "Scheduled", "Expired"];
}
