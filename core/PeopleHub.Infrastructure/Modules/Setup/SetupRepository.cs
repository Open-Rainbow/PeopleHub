using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Setup.Contracts;
using PeopleHub.Application.Modules.Setup.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Setup;

/// <summary>One method per setup stored procedure (database/setup.sql).</summary>
internal sealed class SetupRepository(SqlDb db) : ISetupRepository
{
    public Task<List<RoleDto>> GetRolesAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<RoleDto>("dbo.sp_sec_get_roles", new { OrganizationId = organizationId }, ct);

    public async Task<int?> SaveRoleAsync(int organizationId, int? id, SaveRoleRequest r, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Code", r.Code, DbType.AnsiString, size: 30);
        p.Add("@Name", r.Name);
        p.Add("@Description", r.Description);
        p.Add("@CopyFromRoleId", r.CopyFromRoleId, DbType.Int32);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_sec_save_role", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> SetRoleStatusAsync(int organizationId, int id, bool isActive, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Id", id);
        p.Add("@IsActive", isActive);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_sec_set_role_status", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public async Task<bool> DeleteRoleAsync(int organizationId, int id, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Id", id);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_sec_delete_role", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public Task<List<PagePermissionDto>> GetPermissionsAsync(int organizationId, int roleId, CancellationToken ct) =>
        db.QueryAsync<PagePermissionDto>("dbo.sp_sec_get_permissions", new { OrganizationId = organizationId, RoleId = roleId }, ct);

    public Task SavePermissionsAsync(int organizationId, int roleId, string itemsJson, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@RoleId", roleId);
        p.Add("@Items", itemsJson, DbType.String, size: -1);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_sec_save_permissions", p, ct);
    }

    public Task<List<AccessPermissionDto>> GetAccessAsync(int organizationId, string roleCode, CancellationToken ct) =>
        db.QueryAsync<AccessPermissionDto>("dbo.sp_sec_get_access", Role(organizationId, roleCode), ct);

    public Task<List<FieldRuleDto>> GetFieldRulesAsync(int organizationId, string roleCode, CancellationToken ct) =>
        db.QueryAsync<FieldRuleDto>("dbo.sp_sec_get_field_rules", Role(organizationId, roleCode), ct);

    public Task RegisterFieldsAsync(int organizationId, string formKey, string itemsJson, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@FormKey", formKey, DbType.AnsiString, size: 100);
        p.Add("@Items", itemsJson, DbType.String, size: -1);
        return db.ExecuteAsync("dbo.sp_sec_register_fields", p, ct);
    }

    public Task<List<FormDto>> GetFormsAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<FormDto>("dbo.sp_sec_get_forms", new { OrganizationId = organizationId }, ct);

    public Task<List<FieldSettingDto>> GetFieldSettingsAsync(int organizationId, int roleId, string formKey, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@RoleId", roleId);
        p.Add("@FormKey", formKey, DbType.AnsiString, size: 100);
        return db.QueryAsync<FieldSettingDto>("dbo.sp_sec_get_field_settings", p, ct);
    }

    public Task SaveFieldSettingsAsync(int organizationId, int roleId, string formKey, string itemsJson, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@RoleId", roleId);
        p.Add("@FormKey", formKey, DbType.AnsiString, size: 100);
        p.Add("@Items", itemsJson, DbType.String, size: -1);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_sec_save_field_settings", p, ct);
    }

    private static DynamicParameters Role(int organizationId, string roleCode)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@RoleCode", roleCode, DbType.AnsiString, size: 30);
        return p;
    }
}
