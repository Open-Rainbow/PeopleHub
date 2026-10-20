using PeopleHub.Application.Modules.Setup.Contracts;

namespace PeopleHub.Application.Modules.Setup.Interfaces;

/// <summary>Effective access of a role, cached briefly. Used by the API permission filter and GET my-access.</summary>
public interface IAccessService
{
    /// <summary>Page access and field rules of the calling role (from the request context, or <paramref name="roleCode"/>).</summary>
    Task<MyAccessDto> GetMyAccessAsync(string? roleCode, CancellationToken ct);

    /// <summary>True when the role may do <paramref name="action"/> on at least one of <paramref name="pageKeys"/>.</summary>
    Task<bool> IsAllowedAsync(string roleCode, IReadOnlyCollection<string> pageKeys, string action, CancellationToken ct);

    /// <summary>Drops the cached access of the organization (after setup changes).</summary>
    void Invalidate(int organizationId);
}
