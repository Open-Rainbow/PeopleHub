using PeopleHub.Application.Common.Exceptions;

namespace PeopleHub.Application.Abstractions.Context;

/// <summary>Who is calling and for which organization. Implemented by Server (HTTP) and Worker (jobs).</summary>
public interface IRequestContext
{
    string? UserId { get; }

    int? OrganizationId { get; }

    string CorrelationId { get; }

    bool IsAuthenticated { get; }

    /// <summary>Role code of the caller (superadmin, admin, hr, manager, employee or a custom role). Null for jobs.</summary>
    string? Role => null;
}

public static class RequestContextExtensions
{
    public static int RequireOrganizationId(this IRequestContext context) =>
        context.OrganizationId
        ?? throw new ForbiddenException("Organization context is required for this operation.");
}
