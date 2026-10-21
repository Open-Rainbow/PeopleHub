using PeopleHub.Application.Modules.Organizations.Contracts;

namespace PeopleHub.Application.Modules.Organizations.Interfaces;

/// <summary>Organizations: Super Admin creates and manages them; everyone can read their own.</summary>
public interface IOrganizationService
{
    Task<IReadOnlyList<OrganizationDto>> ListAsync(string? search, bool includeInactive, CancellationToken ct);
    Task<OrganizationDto> GetAsync(int id, CancellationToken ct);
    Task<OrganizationDto> GetCurrentAsync(CancellationToken ct);
    Task<OrganizationDto> CreateAsync(SaveOrganizationRequest request, CancellationToken ct);
    Task<OrganizationDto> UpdateAsync(int id, SaveOrganizationRequest request, CancellationToken ct);
    Task<OrganizationDto> SetStatusAsync(int id, SetOrganizationStatusRequest request, CancellationToken ct);
}
