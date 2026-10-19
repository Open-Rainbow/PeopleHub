using System.Data;
using System.Text.Json;
using Dapper;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Leave;

/// <summary>One method per leave policy stored procedure.</summary>
internal sealed class LeavePolicyRepository(SqlDb db) : ILeavePolicyRepository
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public Task<List<string>> GetEmploymentTypesAsync(CancellationToken ct) =>
        db.QueryAsync<string>(StoredProcedures.GetEmploymentTypes, null, ct);

    public Task<List<LeavePolicySummaryDto>> GetPoliciesAsync(int organizationId, int? year, CancellationToken ct) =>
        db.QueryAsync<LeavePolicySummaryDto>(StoredProcedures.GetPolicies, new { OrganizationId = organizationId, Year = year }, ct);

    public async Task<LeavePolicyHeader?> GetPolicyAsync(int organizationId, int year, string employmentType, string? status, CancellationToken ct)
    {
        var rows = await db.QueryAsync<LeavePolicyHeader>(
            StoredProcedures.GetPolicy,
            new { OrganizationId = organizationId, Year = year, EmploymentType = employmentType, Status = status },
            ct);
        return rows.FirstOrDefault();
    }

    public Task<List<LeavePolicyItemDto>> GetItemsAsync(int organizationId, int? policyId, CancellationToken ct) =>
        db.QueryAsync<LeavePolicyItemDto>(StoredProcedures.GetPolicyItems, new { OrganizationId = organizationId, PolicyId = policyId }, ct);

    public async Task<LeavePolicySaveResult> SaveDraftAsync(int organizationId, string userId, SaveLeavePolicyRequest request, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Year", request.Year);
        p.Add("@EmploymentType", request.EmploymentType);
        p.Add("@Json", JsonSerializer.Serialize(request.Items, Json));
        p.Add("@UserId", userId);
        p.Add("@PolicyId", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync(StoredProcedures.SavePolicyDraft, p, ct);

        return new LeavePolicySaveResult(p.Get<int?>("@PolicyId"), p.Get<string?>("@ResultMessage") ?? "Draft saved.");
    }

    public Task<int> PublishAsync(int organizationId, string userId, int year, string employmentType, CancellationToken ct) =>
        RunKeyed(StoredProcedures.PublishPolicy, organizationId, userId, year, employmentType, ct);

    public Task<int> DiscardDraftAsync(int organizationId, string userId, int year, string employmentType, CancellationToken ct) =>
        RunKeyed(StoredProcedures.DiscardPolicyDraft, organizationId, userId, year, employmentType, ct);

    public async Task<int> CopyAsync(int organizationId, string userId, CopyLeavePolicyRequest request, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@SourceYear", request.SourceYear);
        p.Add("@TargetYear", request.TargetYear);
        p.Add("@EmploymentType", request.EmploymentType);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(StoredProcedures.CopyPolicy, p, ct);
        return p.Get<int?>("@Affected") ?? 0;
    }

    private async Task<int> RunKeyed(string procedure, int organizationId, string userId, int year, string employmentType, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Year", year);
        p.Add("@EmploymentType", employmentType);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(procedure, p, ct);
        return p.Get<int?>("@Affected") ?? 0;
    }
}
