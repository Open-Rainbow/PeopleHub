using PeopleHub.Application.Modules.Organizations.Contracts;

namespace PeopleHub.Application.Modules.Organizations.Interfaces;

/// <summary>One method per organization stored procedure (database/organizations.sql).</summary>
public interface IOrganizationRepository
{
    Task<List<OrganizationDto>> ListAsync(string? search, bool includeInactive, CancellationToken ct);
    Task<OrganizationDto?> GetAsync(int id, CancellationToken ct);
    /// <summary>Returns the id, or null when the organization to update does not exist.</summary>
    Task<int?> SaveAsync(int? id, SaveOrganizationRequest request, string userId, CancellationToken ct);
    Task<bool> SetStatusAsync(int id, bool isActive, string userId, CancellationToken ct);
}
