namespace PeopleHub.Server.Configuration;

public sealed class JwtOptions
{
    public const string SectionName = "Authentication:Jwt";

    public bool Enabled { get; set; }

    public string Issuer { get; set; } = string.Empty;

    public string Audience { get; set; } = string.Empty;

    /// <summary>Keep out of appsettings.json: use user-secrets / env vars.</summary>
    public string SigningKey { get; set; } = string.Empty;
}

public sealed class OrganizationOptions
{
    public const string SectionName = "Organization";

    /// <summary>JWT claim carrying the organization id.</summary>
    public string ClaimType { get; set; } = "org_id";

    /// <summary>Header accepted only for unauthenticated (dev) calls.</summary>
    public string HeaderName { get; set; } = "X-Organization-Id";

    /// <summary>Dev fallback when neither claim nor header is present.</summary>
    public int? DefaultOrganizationId { get; set; }
}
