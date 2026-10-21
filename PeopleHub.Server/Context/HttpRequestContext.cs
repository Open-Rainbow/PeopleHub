using System.Security.Claims;
using Microsoft.Extensions.Options;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Server.Configuration;
using PeopleHub.Server.Middleware;

namespace PeopleHub.Server.Context;

internal sealed class HttpRequestContext(
    IHttpContextAccessor accessor,
    IOptions<OrganizationOptions> options) : IRequestContext
{
    /// <summary>Sent by the Angular app until the login API issues tokens with a role claim.</summary>
    public const string RoleHeader = "X-PeopleHub-Role";

    /// <summary>Only Super Admin may work in another organization (picked in the app header).</summary>
    private const string SuperAdminRole = "superadmin";

    private HttpContext? Http => accessor.HttpContext;

    public bool IsAuthenticated => Http?.User.Identity?.IsAuthenticated ?? false;

    public string? UserId =>
        Http?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
        ?? Http?.User.FindFirst("sub")?.Value;

    public string CorrelationId =>
        Http?.Items[CorrelationIdMiddleware.ItemKey] as string
        ?? Http?.TraceIdentifier
        ?? string.Empty;

    public string? Role
    {
        get
        {
            if (Http is null) return null;

            // Authenticated: trust the token only.
            if (IsAuthenticated)
            {
                var claim = Http.User.FindFirst(ClaimTypes.Role)?.Value ?? Http.User.FindFirst("role")?.Value;
                return string.IsNullOrWhiteSpace(claim) ? null : claim.Trim().ToLowerInvariant();
            }

            return Http.Request.Headers.TryGetValue(RoleHeader, out var header) && !string.IsNullOrWhiteSpace(header.ToString())
                ? header.ToString().Trim().ToLowerInvariant()
                : null;
        }
    }

    public int? OrganizationId
    {
        get
        {
            var settings = options.Value;
            var headerOrg = Http is not null
                && Http.Request.Headers.TryGetValue(settings.HeaderName, out var header)
                && int.TryParse(header.ToString(), out var fromHeader)
                && fromHeader > 0
                    ? fromHeader
                    : (int?)null;
            var isSuperAdmin = string.Equals(Role, SuperAdminRole, StringComparison.Ordinal);

            // Authenticated: the token decides; Super Admin may switch to another organization.
            if (IsAuthenticated)
            {
                if (isSuperAdmin && headerOrg is not null) return headerOrg;
                return int.TryParse(Http!.User.FindFirst(settings.ClaimType)?.Value, out var fromClaim)
                    ? fromClaim
                    : settings.DefaultOrganizationId;
            }

            // Dev (no sign-in yet): only Super Admin can pick the organization with the header.
            if (isSuperAdmin && headerOrg is not null) return headerOrg;
            return settings.DefaultOrganizationId;
        }
    }
}
