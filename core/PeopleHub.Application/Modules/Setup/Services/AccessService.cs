using System.Collections.Concurrent;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Modules.Setup.Contracts;
using PeopleHub.Application.Modules.Setup.Interfaces;

namespace PeopleHub.Application.Modules.Setup.Services;

/// <summary>
/// Effective access per organization + role, cached for a minute (the permission filter runs on every API call).
/// Setup changes call <see cref="Invalidate"/>, so they apply immediately on this server.
/// </summary>
public sealed class AccessService(ISetupRepository repository, IRequestContext context) : IAccessService
{
    private static readonly TimeSpan Ttl = TimeSpan.FromSeconds(60);
    private static readonly ConcurrentDictionary<(int Org, string Role), (DateTime At, MyAccessDto Access)> Cache = new();

    public async Task<MyAccessDto> GetMyAccessAsync(string? roleCode, CancellationToken ct)
    {
        var role = Normalize(roleCode ?? context.Role) ?? "employee";
        return await LoadAsync(context.RequireOrganizationId(), role, ct);
    }

    public async Task<bool> IsAllowedAsync(string roleCode, IReadOnlyCollection<string> pageKeys, string action, CancellationToken ct)
    {
        var role = Normalize(roleCode);
        if (role is null) return false;
        if (role == SetupRules.SuperAdmin) return true;

        var access = await LoadAsync(context.RequireOrganizationId(), role, ct);
        return access.Pages.Any(p => pageKeys.Contains(p.PageKey, StringComparer.OrdinalIgnoreCase) && p.Allows(action));
    }

    public void Invalidate(int organizationId)
    {
        foreach (var key in Cache.Keys.Where(k => k.Org == organizationId).ToList()) Cache.TryRemove(key, out _);
    }

    private async Task<MyAccessDto> LoadAsync(int org, string role, CancellationToken ct)
    {
        if (Cache.TryGetValue((org, role), out var hit) && DateTime.UtcNow - hit.At < Ttl) return hit.Access;

        var access = new MyAccessDto
        {
            Role = role,
            IsSuperAdmin = role == SetupRules.SuperAdmin,
            Pages = await repository.GetAccessAsync(org, role, ct),
            Fields = role == SetupRules.SuperAdmin ? [] : await repository.GetFieldRulesAsync(org, role, ct),
        };
        Cache[(org, role)] = (DateTime.UtcNow, access);
        return access;
    }

    private static string? Normalize(string? role) => string.IsNullOrWhiteSpace(role) ? null : role.Trim().ToLowerInvariant();
}
