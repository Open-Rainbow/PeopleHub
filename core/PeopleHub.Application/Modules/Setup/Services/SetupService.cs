using System.Text.Json;
using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Setup.Contracts;
using PeopleHub.Application.Modules.Setup.Interfaces;

namespace PeopleHub.Application.Modules.Setup.Services;

/// <summary>
/// Setup page: Super Admin / Admin manage roles, what each role can do on each page, and which form fields a role
/// sees, can edit or must fill. Super Admin is locked to full access; only Super Admin can change the Admin role.
/// </summary>
public sealed class SetupService(
    ISetupRepository repository,
    IAccessService access,
    IValidator<SaveRoleRequest> roleValidator,
    IValidator<SavePermissionsRequest> permissionsValidator,
    IValidator<RegisterFieldsRequest> registerValidator,
    IValidator<SaveFieldSettingsRequest> fieldsValidator,
    IRequestContext context) : ISetupService
{
    private const string Resource = "Role";
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? (context.Role ?? "anonymous") : context.UserId!;

    // ---- Roles ---------------------------------------------------------------------------------

    public async Task<IReadOnlyList<RoleDto>> GetRolesAsync(CancellationToken ct) => await repository.GetRolesAsync(OrgId, ct);

    public async Task<RoleDto> CreateRoleAsync(SaveRoleRequest request, CancellationToken ct)
    {
        await roleValidator.EnsureValidAsync(request, ct);
        var id = await repository.SaveRoleAsync(OrgId, null, Normalize(request), UserId, ct)
                 ?? throw new BusinessRuleException("The role could not be saved.");
        access.Invalidate(OrgId);
        return await GetRoleAsync(id, ct);
    }

    public async Task<RoleDto> UpdateRoleAsync(int id, SaveRoleRequest request, CancellationToken ct)
    {
        await roleValidator.EnsureValidAsync(request, ct);
        await GuardAsync(id, ct);
        await repository.SaveRoleAsync(OrgId, id, Normalize(request) with { CopyFromRoleId = null }, UserId, ct);
        access.Invalidate(OrgId);
        return await GetRoleAsync(id, ct);
    }

    public async Task<RoleDto> SetRoleStatusAsync(int id, SetRoleStatusRequest request, CancellationToken ct)
    {
        await GuardAsync(id, ct);
        if (!await repository.SetRoleStatusAsync(OrgId, id, request.IsActive, UserId, ct)) throw new NotFoundException(Resource, id);
        access.Invalidate(OrgId);
        return await GetRoleAsync(id, ct);
    }

    public async Task DeleteRoleAsync(int id, CancellationToken ct)
    {
        await GuardAsync(id, ct);
        if (!await repository.DeleteRoleAsync(OrgId, id, ct)) throw new NotFoundException(Resource, id);
        access.Invalidate(OrgId);
    }

    // ---- Page access ---------------------------------------------------------------------------

    public async Task<IReadOnlyList<PagePermissionDto>> GetPermissionsAsync(int roleId, CancellationToken ct) =>
        await repository.GetPermissionsAsync(OrgId, roleId, ct);

    public async Task<IReadOnlyList<PagePermissionDto>> SavePermissionsAsync(int roleId, SavePermissionsRequest request, CancellationToken ct)
    {
        await permissionsValidator.EnsureValidAsync(request, ct);
        await GuardAsync(roleId, ct);
        var items = request.Items!.Select(i => i with { PageKey = i.PageKey!.Trim().ToLowerInvariant() });
        await repository.SavePermissionsAsync(OrgId, roleId, JsonSerializer.Serialize(items, Json), UserId, ct);
        access.Invalidate(OrgId);
        return await repository.GetPermissionsAsync(OrgId, roleId, ct);
    }

    // ---- Fields --------------------------------------------------------------------------------

    public async Task<IReadOnlyList<FormDto>> GetFormsAsync(CancellationToken ct) => await repository.GetFormsAsync(OrgId, ct);

    public async Task RegisterFieldsAsync(RegisterFieldsRequest request, CancellationToken ct)
    {
        await registerValidator.EnsureValidAsync(request, ct);
        var fields = request.Fields!
            .Where(f => !string.IsNullOrWhiteSpace(f.Label))
            .GroupBy(f => f.FieldKey!.Trim(), StringComparer.Ordinal)
            .Select(g => new FieldItem { FieldKey = g.Key, Label = Trim(g.First().Label!, SetupRules.LabelMax), SortOrder = g.First().SortOrder })
            .ToList();
        if (fields.Count == 0) return;
        await repository.RegisterFieldsAsync(OrgId, request.FormKey!.Trim().ToLowerInvariant(), JsonSerializer.Serialize(fields, Json), ct);
    }

    public async Task<IReadOnlyList<FieldSettingDto>> GetFieldSettingsAsync(int roleId, string? formKey, CancellationToken ct)
    {
        if (!SetupRules.IsFormKey(formKey)) throw Invalid("formKey", "Pick a form.");
        return await repository.GetFieldSettingsAsync(OrgId, roleId, formKey!.Trim().ToLowerInvariant(), ct);
    }

    public async Task<IReadOnlyList<FieldSettingDto>> SaveFieldSettingsAsync(int roleId, SaveFieldSettingsRequest request, CancellationToken ct)
    {
        await fieldsValidator.EnsureValidAsync(request, ct);
        await GuardAsync(roleId, ct);
        var formKey = request.FormKey!.Trim().ToLowerInvariant();
        var items = request.Items!.Select(i => i with
        {
            FieldKey = i.FieldKey!.Trim(),
            Requirement = SetupRules.Canonical(SetupRules.Requirements, i.Requirement) ?? "Default",
        });
        await repository.SaveFieldSettingsAsync(OrgId, roleId, formKey, JsonSerializer.Serialize(items, Json), UserId, ct);
        access.Invalidate(OrgId);
        return await repository.GetFieldSettingsAsync(OrgId, roleId, formKey, ct);
    }

    // ---- Helpers -------------------------------------------------------------------------------

    private async Task<RoleDto> GetRoleAsync(int id, CancellationToken ct) =>
        (await repository.GetRolesAsync(OrgId, ct)).FirstOrDefault(r => r.Id == id) ?? throw new NotFoundException(Resource, id);

    /// <summary>Super Admin is never editable; the Admin role can only be changed by Super Admin.</summary>
    private async Task GuardAsync(int roleId, CancellationToken ct)
    {
        var role = await GetRoleAsync(roleId, ct);
        if (role.Code == SetupRules.SuperAdmin) throw new ForbiddenException("Super Admin always has full access and cannot be changed.");
        var caller = context.Role?.Trim().ToLowerInvariant();
        if (role.Code == SetupRules.Admin && caller is not null && caller != SetupRules.SuperAdmin)
            throw new ForbiddenException("Only Super Admin can change the Admin role.");
    }

    private static SaveRoleRequest Normalize(SaveRoleRequest r) => r with
    {
        Code = r.Code!.Trim().ToLowerInvariant(),
        Name = r.Name!.Trim(),
        Description = string.IsNullOrWhiteSpace(r.Description) ? null : r.Description.Trim(),
    };

    private static string Trim(string value, int max) => value.Trim().Length <= max ? value.Trim() : value.Trim()[..max];

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });
}
