using PeopleHub.Application.Modules.Setup.Contracts;

namespace PeopleHub.Application.Modules.Setup.Interfaces;

/// <summary>Setup page: roles, page access per role and field rules per role.</summary>
public interface ISetupService
{
    Task<IReadOnlyList<RoleDto>> GetRolesAsync(CancellationToken ct);
    Task<RoleDto> CreateRoleAsync(SaveRoleRequest request, CancellationToken ct);
    Task<RoleDto> UpdateRoleAsync(int id, SaveRoleRequest request, CancellationToken ct);
    Task<RoleDto> SetRoleStatusAsync(int id, SetRoleStatusRequest request, CancellationToken ct);
    Task DeleteRoleAsync(int id, CancellationToken ct);

    Task<IReadOnlyList<PagePermissionDto>> GetPermissionsAsync(int roleId, CancellationToken ct);
    Task<IReadOnlyList<PagePermissionDto>> SavePermissionsAsync(int roleId, SavePermissionsRequest request, CancellationToken ct);

    Task<IReadOnlyList<FormDto>> GetFormsAsync(CancellationToken ct);
    Task RegisterFieldsAsync(RegisterFieldsRequest request, CancellationToken ct);
    Task<IReadOnlyList<FieldSettingDto>> GetFieldSettingsAsync(int roleId, string? formKey, CancellationToken ct);
    Task<IReadOnlyList<FieldSettingDto>> SaveFieldSettingsAsync(int roleId, SaveFieldSettingsRequest request, CancellationToken ct);
}
