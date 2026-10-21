namespace PeopleHub.Application.Modules.Leave.Contracts;

/// <summary>One leave type inside a policy (request body item and response item).</summary>
public sealed record LeavePolicyItemDto
{
    /// <summary>Slug (earned, casual, ...). Leave empty for a new type: it is generated from the label.</summary>
    public string? Code { get; init; }

    public string? Label { get; init; }
    public string? Description { get; init; }

    /// <summary>standard | parental | additional</summary>
    public string? Category { get; init; } = "standard";

    /// <summary>Days per year (parental: total duration). null = no limit (only allowed for unpaid leave).</summary>
    public decimal? AnnualAllowance { get; init; }

    public decimal CarryForwardDays { get; init; }
    public bool IsPaid { get; init; } = true;
    public bool IsEncashable { get; init; }
    public int? MustBeTakenWithinMonths { get; init; }

    /// <summary>Yearly | Monthly accrual | Pro-rata</summary>
    public string? AllowanceBasis { get; init; } = "Yearly";

    /// <summary>Auto | Manager | HR | Manager + HR</summary>
    public string? ApprovalType { get; init; } = "Manager";

    public bool CertificateRequired { get; init; }
    public decimal? CertificateAfterDays { get; init; }

    /// <summary>How many days in the past a request may start.</summary>
    public int BackdateDays { get; init; }

    /// <summary>Longest single request in working days. null = no limit.</summary>
    public decimal? MaxConsecutive { get; init; }

    // ---- Rules added for the Leave Policy Manager screen (database section 19) ----

    /// <summary>false = employees can't apply for this type (Comp-Off / LOP / WFH "Enable").</summary>
    public bool IsEnabled { get; init; } = true;

    public bool AdvanceNoticeRequired { get; init; }

    /// <summary>Hours before the start date the request must be sent. Used when AdvanceNoticeRequired.</summary>
    public int? AdvanceNoticeHours { get; init; }

    /// <summary>Parental: paid part of the total duration (days).</summary>
    public decimal? PaidDays { get; init; }

    /// <summary>Parental: extra unpaid weeks allowed. null / 0 = no extension.</summary>
    public int? ExtensionWeeks { get; init; }

    public string? Notes { get; init; }

    /// <summary>Comp-Off: days to use it before it lapses.</summary>
    public int? ExpiryDays { get; init; }

    /// <summary>Comp-Off: most days banked at one time.</summary>
    public decimal? MaxAccrual { get; init; }

    /// <summary>WFH: most days in a month / week.</summary>
    public decimal? MaxPerMonth { get; init; }
    public decimal? MaxPerWeek { get; init; }

    /// <summary>Months of service before this type can be used.</summary>
    public int? EligibleAfterMonths { get; init; }
}

/// <summary>Body for PUT /api/v1/leave/policies/draft. Replaces every item of the draft.</summary>
public sealed record SaveLeavePolicyRequest
{
    public int Year { get; init; }
    public string? EmploymentType { get; init; }
    public IReadOnlyList<LeavePolicyItemDto> Items { get; init; } = [];
}

/// <summary>Body for POST publish / discard.</summary>
public sealed record LeavePolicyKey
{
    public int Year { get; init; }
    public string? EmploymentType { get; init; }
}

/// <summary>Body for POST /api/v1/leave/policies/copy. EmploymentType null = every employment type.</summary>
public sealed record CopyLeavePolicyRequest
{
    public int SourceYear { get; init; }
    public int TargetYear { get; init; }
    public string? EmploymentType { get; init; }
}

public sealed record CopyLeavePolicyResult(int Created, string Message);

/// <summary>The policy being viewed/edited for one year + employment type.</summary>
public sealed class LeavePolicyDto
{
    public int? Id { get; set; }
    public int Year { get; set; }
    public string EmploymentType { get; set; } = string.Empty;

    /// <summary>Draft | Published | None (nothing saved yet: Items are the organization defaults).</summary>
    public string Status { get; set; } = "None";

    public int? Version { get; set; }
    public DateTime? PublishedAt { get; set; }
    public string? PublishedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public bool HasPublished { get; set; }
    public int? PublishedVersion { get; set; }
    public IReadOnlyList<LeavePolicyItemDto> Items { get; set; } = [];

    /// <summary>Items of the version in force (for "changes since publish"). Empty when nothing is published.</summary>
    public IReadOnlyList<LeavePolicyItemDto> PublishedItems { get; set; } = [];
}

/// <summary>Row of sp_get_leave_policy.</summary>
public sealed class LeavePolicyHeader
{
    public int Id { get; set; }
    public int Year { get; set; }
    public string EmploymentType { get; set; } = string.Empty;
    public int Version { get; set; }
    public string Status { get; set; } = "Draft";
    public DateTime? PublishedAt { get; set; }
    public string? PublishedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public bool HasPublished { get; set; }
    public int? PublishedVersion { get; set; }
}

/// <summary>Row of sp_get_leave_policies.</summary>
public sealed class LeavePolicySummaryDto
{
    public int Year { get; set; }
    public string EmploymentType { get; set; } = string.Empty;
    public int? PublishedVersion { get; set; }
    public DateTime? PublishedAt { get; set; }
    public bool HasDraft { get; set; }
    public DateTime? DraftUpdatedAt { get; set; }
    public int PublishedItemCount { get; set; }
}

public sealed record LeavePolicySaveResult(int? PolicyId, string Message);

public static class LeavePolicyRules
{
    public const int YearMin = 2000;
    public const int YearMax = 2100;
    public const int EmploymentTypeMax = 50;
    public const int LabelMax = 50;
    public const int DescriptionMax = 200;
    public const int NotesMax = 500;
    public const int MaxItems = 30;
    public const int NoticeHoursMax = 720;
    public const int ExtensionWeeksMax = 52;
    public const int ExpiryDaysMax = 365;
    public const int EligibleMonthsMax = 60;
    public const string CodePattern = "^[a-z0-9-]{2,20}$";

    public static readonly string[] Categories = ["standard", "parental", "additional"];
    public static readonly string[] AllowanceBases = ["Yearly", "Monthly accrual", "Pro-rata"];
    public static readonly string[] ApprovalTypes = ["Auto", "Manager", "HR", "Manager + HR"];
    public static readonly string[] Statuses = ["Draft", "Published"];
    public static readonly string[] DefaultEmploymentTypes = ["Full Time", "Part Time", "Contract", "Intern"];

    /// <summary>"Bereavement Leave" -> "bereavement-leave" (max 20 chars).</summary>
    public static string Slugify(string label)
    {
        var chars = label.Trim().ToLowerInvariant().Select(c => char.IsAsciiLetterOrDigit(c) ? c : '-').ToArray();
        var slug = string.Join('-', new string(chars).Split('-', StringSplitOptions.RemoveEmptyEntries));
        if (slug.Length > 20) slug = slug[..20].TrimEnd('-');
        return slug.Length >= 2 ? slug : $"type-{slug}".TrimEnd('-');
    }

    /// <summary>Case-insensitive match against an allowed list, returning the canonical spelling.</summary>
    public static string? Canonical(string[] allowed, string? value) =>
        value is null ? null : allowed.FirstOrDefault(a => a.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));
}
