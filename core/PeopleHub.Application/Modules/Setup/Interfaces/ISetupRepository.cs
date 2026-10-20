using PeopleHub.Application.Modules.Setup.Contracts;

namespace PeopleHub.Application.Modules.Setup.Interfaces;

/// <summary>One method per setup stored procedure (database/setup.sql).</summary>
public interface ISetupRepository
{
    Task<List<RoleDto>> GetRolesAsync(int organizationId, CancellationToken ct);
    Task<int?> SaveRoleAsync(int organizationId, int? id, SaveRoleRequest request, string userId, CancellationToken ct);
    Task<bool> SetRoleStatusAsync(int organizationId, int id, bool isActive, string userId, CancellationToken ct);
    Task<bool> DeleteRoleAsync(int organizationId, int id, CancellationToken ct);

    Task<List<PagePermissionDto>> GetPermissionsAsync(int organizationId, int roleId, CancellationToken ct);
    Task SavePermissionsAsync(int organizationId, int roleId, string itemsJson, string userId, CancellationToken ct);

    Task<List<AccessPermissionDto>> GetAccessAsync(int organizationId, string roleCode, CancellationToken ct);
    Task<List<FieldRuleDto>> GetFieldRulesAsync(int organizationId, string roleCode, CancellationToken ct);

    Task RegisterFieldsAsync(int organizationId, string formKey, string itemsJson, CancellationToken ct);
    Task<List<FormDto>> GetFormsAsync(int organizationId, CancellationToken ct);
    Task<List<FieldSettingDto>> GetFieldSettingsAsync(int organizationId, int roleId, string formKey, CancellationToken ct);
    Task SaveFieldSettingsAsync(int organizationId, int roleId, string formKey, string itemsJson, string userId, CancellationToken ct);
}
