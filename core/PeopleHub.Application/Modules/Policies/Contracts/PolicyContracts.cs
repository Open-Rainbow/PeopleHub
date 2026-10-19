namespace PeopleHub.Application.Modules.Policies.Contracts;

/// <summary>A company policy. Content is only filled for single-policy reads.</summary>
public sealed class PolicyDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Content { get; set; }
    public bool HasContent { get; set; }
    public string? FileName { get; set; }
    public string? FileContentType { get; set; }
    public int? FileSize { get; set; }
    public bool HasFile { get; set; }
    public int Version { get; set; }
    public DateTime? EffectiveFrom { get; set; }

    /// <summary>Draft | Published | Archived</summary>
    public string Status { get; set; } = "Draft";

    public bool RequiresAck { get; set; }

    /// <summary>Department name; null = everyone.</summary>
    public string? Audience { get; set; }

    public bool IsPinned { get; set; }
    public DateTime? PublishedAt { get; set; }
    public string? PublishedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }

    /// <summary>When the requesting employee acknowledged the current version (null = not yet).</summary>
    public DateTime? AcknowledgedAt { get; set; }

    public int AckCount { get; set; }
    public int AudienceCount { get; set; }
}

/// <summary>The attached document, for download.</summary>
public sealed class PolicyFileDto
{
    public string FileName { get; set; } = "policy";
    public string? FileContentType { get; set; }
    public byte[] FileData { get; set; } = [];
}

/// <summary>A new attachment: base64 or a data URI (data:application/pdf;base64,...).</summary>
public sealed record PolicyFileInput
{
    public string? FileName { get; init; }
    public string? ContentType { get; init; }
    public string? Data { get; init; }
}

/// <summary>POST api/v1/policies | PUT api/v1/policies/{id}</summary>
public sealed record SavePolicyRequest
{
    public string? Title { get; init; }
    public string? Category { get; init; }
    public string? Summary { get; init; }
    public string? Content { get; init; }

    /// <summary>New file (replaces the current one).</summary>
    public PolicyFileInput? File { get; init; }

    /// <summary>Drop the current file (ignored when File is sent).</summary>
    public bool RemoveFile { get; init; }

    public DateTime? EffectiveFrom { get; init; }
    public bool RequiresAck { get; init; }
    public string? Audience { get; init; }
    public bool IsPinned { get; init; }

    /// <summary>true = publish now, false = keep the current status (new policies start as Draft).</summary>
    public bool Publish { get; init; }

    /// <summary>On a published policy: save as a new version, so everyone must acknowledge again.</summary>
    public bool NewVersion { get; init; }
}

/// <summary>POST api/v1/policies/{id}/status</summary>
public sealed record SetPolicyStatusRequest
{
    public string? Status { get; init; }
}

/// <summary>POST api/v1/policies/{id}/acknowledge</summary>
public sealed record AcknowledgePolicyRequest
{
    public string? EmployeeId { get; init; }
}

public sealed class PolicyAckDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public DateTime? AcknowledgedAt { get; set; }
    public int Version { get; set; }
}

/// <summary>Decoded upload ready for the database.</summary>
public sealed record PolicyFilePayload(string FileName, string ContentType, byte[] Data);

public static class PolicyRules
{
    public static readonly string[] Categories =
        ["Workplace", "HR", "IT & Security", "Leave & Attendance", "Finance", "Code of Conduct", "Health & Safety", "Other"];

    public static readonly string[] Statuses = ["Draft", "Published", "Archived"];

    /// <summary>Extension -> content type for uploads.</summary>
    public static readonly IReadOnlyDictionary<string, string> FileTypes = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
    {
        [".pdf"] = "application/pdf",
        [".doc"] = "application/msword",
        [".docx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        [".xls"] = "application/vnd.ms-excel",
        [".xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        [".ppt"] = "application/vnd.ms-powerpoint",
        [".pptx"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        [".txt"] = "text/plain",
        [".png"] = "image/png",
        [".jpg"] = "image/jpeg",
        [".jpeg"] = "image/jpeg",
    };

    public const int MaxFileBytes = 10 * 1024 * 1024;
    public const int TitleMin = 3;
    public const int TitleMax = 150;
    public const int SummaryMax = 500;
    public const int ContentMax = 50_000;
    public const int AudienceMax = 50;
    public const int FileNameMax = 200;
    public const int SearchMax = 100;

    public static string? Canonical(IEnumerable<string> allowed, string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : allowed.FirstOrDefault(a => a.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));

    public static string Extension(string? fileName) => string.IsNullOrWhiteSpace(fileName) ? string.Empty : Path.GetExtension(fileName.Trim());

    /// <summary>Strips a data-URI prefix. Null when the text is not valid base64.</summary>
    public static byte[]? Decode(string? data)
    {
        if (string.IsNullOrWhiteSpace(data)) return null;
        var comma = data.IndexOf("base64,", StringComparison.OrdinalIgnoreCase);
        var raw = comma >= 0 ? data[(comma + 7)..] : data;
        try { return Convert.FromBase64String(raw.Trim()); }
        catch (FormatException) { return null; }
    }

    /// <summary>Approximate decoded size without decoding.</summary>
    public static long DecodedLength(string? data)
    {
        if (string.IsNullOrWhiteSpace(data)) return 0;
        var comma = data.IndexOf("base64,", StringComparison.OrdinalIgnoreCase);
        var length = comma >= 0 ? data.Length - comma - 7 : data.Length;
        return length * 3L / 4;
    }
}
