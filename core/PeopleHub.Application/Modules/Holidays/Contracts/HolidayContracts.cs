namespace PeopleHub.Application.Modules.Holidays.Contracts;

/// <summary>Body for POST /api/v1/holidays and PUT /api/v1/holidays/{id}.</summary>
public sealed record SaveHolidayRequest
{
    public DateTime? Date { get; init; }
    public string? Name { get; init; }

    /// <summary>Public | Festival | Regional | Company</summary>
    public string? Type { get; init; } = "Public";

    /// <summary>Optional (restricted) holidays are not skipped when counting leave days.</summary>
    public bool IsOptional { get; init; }

    public string? Description { get; init; }
}

public sealed class HolidayItemDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "Public";
    public bool IsOptional { get; set; }
    public string? Description { get; set; }
}

/// <summary>Output of sp_save_holiday.</summary>
public sealed record HolidaySaveResult(int? Id, int Affected);

public static class HolidayRules
{
    public const int NameMin = 2;
    public const int NameMax = 100;
    public const int DescriptionMax = 200;
    public const int YearMin = 2000;
    public const int YearMax = 2100;

    public static readonly string[] Types = ["Public", "Festival", "Regional", "Company"];

    public static string? Canonical(string? type) =>
        type is null ? null : Types.FirstOrDefault(t => t.Equals(type.Trim(), StringComparison.OrdinalIgnoreCase));
}
