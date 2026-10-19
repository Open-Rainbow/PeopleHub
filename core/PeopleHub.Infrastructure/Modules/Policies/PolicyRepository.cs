using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Policies.Contracts;
using PeopleHub.Application.Modules.Policies.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Policies;

/// <summary>One method per policy stored procedure (database/policies.sql).</summary>
internal sealed class PolicyRepository(SqlDb db) : IPolicyRepository
{
    public Task<List<PolicyDto>> GetAsync(int organizationId, string? employeeId, bool manage, string? status, string? category, string? search, int? id, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@Manage", manage);
        p.Add("@Status", status, DbType.AnsiString, size: 10);
        p.Add("@Category", category, DbType.AnsiString, size: 30);
        p.Add("@Search", search);
        p.Add("@Id", id, DbType.Int32);
        return db.QueryAsync<PolicyDto>("dbo.sp_pol_get_policies", p, ct);
    }

    public async Task<PolicyFileDto?> GetFileAsync(int organizationId, int id, string? employeeId, bool manage, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Id", id);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@Manage", manage);
        return (await db.QueryAsync<PolicyFileDto>("dbo.sp_pol_get_file", p, ct)).FirstOrDefault();
    }

    public async Task<int?> SaveAsync(int organizationId, int? id, SavePolicyRequest r, string fileAction, PolicyFilePayload? file, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Title", r.Title);
        p.Add("@Category", r.Category, DbType.AnsiString, size: 30);
        p.Add("@Summary", r.Summary);
        p.Add("@Content", r.Content, DbType.String, size: -1);
        p.Add("@FileAction", fileAction, DbType.AnsiString, size: 10);
        p.Add("@FileName", file?.FileName);
        p.Add("@FileContentType", file?.ContentType, DbType.AnsiString, size: 100);
        p.Add("@FileData", file?.Data, DbType.Binary, size: -1);
        p.Add("@EffectiveFrom", r.EffectiveFrom, DbType.Date);
        p.Add("@RequiresAck", r.RequiresAck);
        p.Add("@Audience", r.Audience);
        p.Add("@IsPinned", r.IsPinned);
        p.Add("@Publish", r.Publish);
        p.Add("@BumpVersion", r.NewVersion);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pol_save_policy", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> SetStatusAsync(int organizationId, int id, string status, string userId, CancellationToken ct)
    {
        var p = Affected(organizationId, id, userId);
        p.Add("@Status", status, DbType.AnsiString, size: 10);
        await db.ExecuteAsync("dbo.sp_pol_set_status", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public async Task<bool> DeleteAsync(int organizationId, int id, string userId, CancellationToken ct)
    {
        var p = Affected(organizationId, id, userId);
        await db.ExecuteAsync("dbo.sp_pol_delete_policy", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public Task AcknowledgeAsync(int organizationId, int id, string employeeId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Id", id);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        return db.ExecuteAsync("dbo.sp_pol_acknowledge", p, ct);
    }

    public Task<List<PolicyAckDto>> GetAcknowledgementsAsync(int organizationId, int id, CancellationToken ct) =>
        db.QueryAsync<PolicyAckDto>("dbo.sp_pol_get_acknowledgements", new { OrganizationId = organizationId, Id = id }, ct);

    private static DynamicParameters Affected(int organizationId, int id, string userId)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Id", id);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        return p;
    }
}
