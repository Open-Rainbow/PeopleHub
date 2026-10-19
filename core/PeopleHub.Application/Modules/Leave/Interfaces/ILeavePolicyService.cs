using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

/// <summary>Leave Policy Manager: per year + employment type, edit a draft and publish it.</summary>
public interface ILeavePolicyService
{
    Task<IReadOnlyList<string>> GetEmploymentTypesAsync(CancellationToken ct);
    Task<IReadOnlyList<LeavePolicySummaryDto>> GetPoliciesAsync(int? year, CancellationToken ct);
    Task<LeavePolicyDto> GetCurrentAsync(int? year, string? employmentType, string? status, CancellationToken ct);
    Task<LeavePolicyDto> SaveDraftAsync(SaveLeavePolicyRequest request, CancellationToken ct);
    Task<LeavePolicyDto> PublishAsync(LeavePolicyKey key, CancellationToken ct);
    Task<LeavePolicyDto> DiscardDraftAsync(LeavePolicyKey key, CancellationToken ct);
    Task<CopyLeavePolicyResult> CopyAsync(CopyLeavePolicyRequest request, CancellationToken ct);
}
