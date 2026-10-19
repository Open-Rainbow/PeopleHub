using PeopleHub.Application.Modules.Policies.Contracts;

namespace PeopleHub.Application.Modules.Policies.Interfaces;

public interface IPolicyService
{
    /// <summary>manage = true: every policy (HR / admin). Otherwise the employee's published policies.</summary>
    Task<IReadOnlyList<PolicyDto>> GetPoliciesAsync(string? employeeId, bool manage, string? status, string? category, string? search, CancellationToken ct);
    Task<PolicyDto> GetPolicyAsync(int id, string? employeeId, bool manage, CancellationToken ct);
    Task<PolicyFileDto> GetFileAsync(int id, string? employeeId, bool manage, CancellationToken ct);
    Task<PolicyDto> CreateAsync(SavePolicyRequest request, CancellationToken ct);
    Task<PolicyDto> UpdateAsync(int id, SavePolicyRequest request, CancellationToken ct);
    Task<PolicyDto> SetStatusAsync(int id, SetPolicyStatusRequest request, CancellationToken ct);
    Task DeleteAsync(int id, CancellationToken ct);
    Task<PolicyDto> AcknowledgeAsync(int id, string? employeeId, CancellationToken ct);
    Task<IReadOnlyList<PolicyAckDto>> GetAcknowledgementsAsync(int id, CancellationToken ct);
}
