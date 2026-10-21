using System.Text.RegularExpressions;

namespace PeopleHub.Application.Modules.Organizations.Contracts;

/// <summary>One organization with its numbers (org.fn_organizations).</summary>
public sealed record OrganizationDto
{
    public int Id { get; init; }
    public string Code { get; init; } = "";
    public string Name { get; init; } = "";
    public string? LegalName { get; init; }
    public string? Industry { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
    public string? Website { get; init; }
    public string? AddressLine { get; init; }
    public string? City { get; init; }
    public string? StateProvince { get; init; }
    public string? Country { get; init; }
    public string? Pincode { get; init; }
    public string? TimeZone { get; init; }
    public string? Currency { get; init; }
    public int? FinancialYearStartMonth { get; init; }
    public string? TaxId { get; init; }
    public string? RegistrationNumber { get; init; }
    public bool IsActive { get; init; }
    public int EmployeeCount { get; init; }
    public int RoleCount { get; init; }
    public DateTime CreatedAt { get; init; }
    public string? CreatedBy { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public string? UpdatedBy { get; init; }
}

/// <summary>POST / PUT api/v1/organizations</summary>
public sealed record SaveOrganizationRequest
{
    public string? Code { get; init; }
    public string? Name { get; init; }
    public string? LegalName { get; init; }
    public string? Industry { get; init; }
    public string? Email { get; init; }
    public string? Phone { get; init; }
    public string? Website { get; init; }
    public string? AddressLine { get; init; }
    public string? City { get; init; }
    public string? StateProvince { get; init; }
    public string? Country { get; init; }
    public string? Pincode { get; init; }
    public string? TimeZone { get; init; }
    public string? Currency { get; init; }
    public int? FinancialYearStartMonth { get; init; }
    public string? TaxId { get; init; }
    public string? RegistrationNumber { get; init; }
}

public sealed record SetOrganizationStatusRequest(bool IsActive);

public static partial class OrganizationRules
{
    public const string SuperAdmin = "superadmin";
    public const int NameMin = 2;
    public const int NameMax = 200;

    public static bool IsCode(string? v) => !string.IsNullOrWhiteSpace(v) && CodePattern().IsMatch(v.Trim());
    public static bool IsPhone(string? v) => string.IsNullOrWhiteSpace(v) || PhonePattern().IsMatch(v.Trim());
    public static bool IsWebsite(string? v) => string.IsNullOrWhiteSpace(v) || WebsitePattern().IsMatch(v.Trim());
    public static bool IsPincode(string? v) => string.IsNullOrWhiteSpace(v) || PincodePattern().IsMatch(v.Trim());
    public static bool IsCurrency(string? v) => string.IsNullOrWhiteSpace(v) || CurrencyPattern().IsMatch(v.Trim());
    public static bool IsTaxId(string? v) => string.IsNullOrWhiteSpace(v) || TaxIdPattern().IsMatch(v.Trim());

    [GeneratedRegex("^[A-Za-z][A-Za-z0-9-]{1,19}$")]
    private static partial Regex CodePattern();

    [GeneratedRegex(@"^[0-9+()\-\s]{6,20}$")]
    private static partial Regex PhonePattern();

    [GeneratedRegex(@"^https?://[^\s]+\.[^\s]+$", RegexOptions.IgnoreCase)]
    private static partial Regex WebsitePattern();

    [GeneratedRegex(@"^[A-Za-z0-9\s-]{3,12}$")]
    private static partial Regex PincodePattern();

    [GeneratedRegex("^[A-Za-z]{3}$")]
    private static partial Regex CurrencyPattern();

    [GeneratedRegex(@"^[A-Za-z0-9/\-\s]{3,30}$")]
    private static partial Regex TaxIdPattern();
}
