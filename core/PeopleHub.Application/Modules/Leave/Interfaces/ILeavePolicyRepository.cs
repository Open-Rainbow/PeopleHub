using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

/// <summary>Database calls for leave policies (see database/leave.sql).</summary>
public interface ILeavePolicyRepository
{
    Task<List<string>> GetEmploymentTypesAsync(CancellationToken ct);
    Task<List<LeavePolicySummaryDto>> GetPoliciesAsync(int organizationId, int? year, CancellationToken ct);
    Task<LeavePolicyHeader?> GetPolicyAsync(int organizationId, int year, string employmentType, string? status, CancellationToken ct);

    /// <summary>policyId null = the organization's leave type defaults.</summary>
    Task<List<LeavePolicyItemDto>> GetItemsAsync(int organizationId, int? policyId, CancellationToken ct);

    Task<LeavePolicySaveResult> SaveDraftAsync(int organizationId, string userId, SaveLeavePolicyRequest request, CancellationToken ct);
    Task<int> PublishAsync(int organizationId, string userId, int year, string employmentType, CancellationToken ct);
    Task<int> DiscardDraftAsync(int organizationId, string userId, int year, string employmentType, CancellationToken ct);
    Task<int> CopyAsync(int organizationId, string userId, CopyLeavePolicyRequest request, CancellationToken ct);
}
