using PeopleHub.Application.Modules.Policies.Contracts;

namespace PeopleHub.Application.Modules.Policies.Interfaces;

/// <summary>Database calls for policies (see database/policies.sql).</summary>
public interface IPolicyRepository
{
    Task<List<PolicyDto>> GetAsync(int organizationId, string? employeeId, bool manage, string? status, string? category, string? search, int? id, CancellationToken ct);
    Task<PolicyFileDto?> GetFileAsync(int organizationId, int id, string? employeeId, bool manage, CancellationToken ct);

    /// <summary>Insert (id null) or update. Returns the policy id. fileAction: keep | replace | remove.</summary>
    Task<int?> SaveAsync(int organizationId, int? id, SavePolicyRequest request, string fileAction, PolicyFilePayload? file, string userId, CancellationToken ct);

    Task<bool> SetStatusAsync(int organizationId, int id, string status, string userId, CancellationToken ct);
    Task<bool> DeleteAsync(int organizationId, int id, string userId, CancellationToken ct);
    Task AcknowledgeAsync(int organizationId, int id, string employeeId, CancellationToken ct);
    Task<List<PolicyAckDto>> GetAcknowledgementsAsync(int organizationId, int id, CancellationToken ct);
}
