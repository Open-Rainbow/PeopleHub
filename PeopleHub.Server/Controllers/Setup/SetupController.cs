using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Setup.Contracts;
using PeopleHub.Application.Modules.Setup.Interfaces;

namespace PeopleHub.Server.Controllers.Setup;

/// <summary>
/// Setup page (Super Admin / Admin): roles, page access per role and field rules per role.
/// my-access and fields/register are open to every role (the app calls them for the signed-in user).
/// Everything else needs the "setup" page permission (see Security/ApiPermissionMap).
/// </summary>
[ApiController]
[Route("api/v1/setup")]
public sealed class SetupController(ISetupService service, IAccessService access) : ControllerBase
{
    /// <summary>Page access and field rules of the calling role (X-PeopleHub-Role header or role claim).</summary>
    [HttpGet("my-access")]
    public async Task<ActionResult<MyAccessDto>> GetMyAccess(CancellationToken ct) =>
        Ok(await access.GetMyAccessAsync(null, ct));

    [HttpGet("roles")]
    public async Task<ActionResult<IReadOnlyList<RoleDto>>> GetRoles(CancellationToken ct) =>
        Ok(await service.GetRolesAsync(ct));

    [HttpPost("roles")]
    public async Task<ActionResult<RoleDto>> CreateRole(SaveRoleRequest request, CancellationToken ct)
    {
        var created = await service.CreateRoleAsync(request, ct);
        return CreatedAtAction(nameof(GetPermissions), new { id = created.Id }, created);
    }

    [HttpPut("roles/{id:int}")]
    public async Task<ActionResult<RoleDto>> UpdateRole(int id, SaveRoleRequest request, CancellationToken ct) =>
        Ok(await service.UpdateRoleAsync(id, request, ct));

    /// <summary>{ "isActive": false } deactivates a custom role (its users lose access).</summary>
    [HttpPost("roles/{id:int}/status")]
    public async Task<ActionResult<RoleDto>> SetRoleStatus(int id, SetRoleStatusRequest request, CancellationToken ct) =>
        Ok(await service.SetRoleStatusAsync(id, request, ct));

    [HttpDelete("roles/{id:int}")]
    public async Task<IActionResult> DeleteRole(int id, CancellationToken ct)
    {
        await service.DeleteRoleAsync(id, ct);
        return NoContent();
    }

    /// <summary>Every page with what the role may do on it.</summary>
    [HttpGet("roles/{id:int}/permissions")]
    public async Task<ActionResult<IReadOnlyList<PagePermissionDto>>> GetPermissions(int id, CancellationToken ct) =>
        Ok(await service.GetPermissionsAsync(id, ct));

    [HttpPut("roles/{id:int}/permissions")]
    public async Task<ActionResult<IReadOnlyList<PagePermissionDto>>> SavePermissions(int id, SavePermissionsRequest request, CancellationToken ct) =>
        Ok(await service.SavePermissionsAsync(id, request, ct));

    /// <summary>Forms the app has reported so far (open a form once and it shows up here).</summary>
    [HttpGet("forms")]
    public async Task<ActionResult<IReadOnlyList<FormDto>>> GetForms(CancellationToken ct) =>
        Ok(await service.GetFormsAsync(ct));

    /// <summary>Sent by the app when a form renders: its labelled shared controls.</summary>
    [HttpPost("fields/register")]
    public async Task<IActionResult> RegisterFields(RegisterFieldsRequest request, CancellationToken ct)
    {
        await service.RegisterFieldsAsync(request, ct);
        return NoContent();
    }

    [HttpGet("roles/{id:int}/fields")]
    public async Task<ActionResult<IReadOnlyList<FieldSettingDto>>> GetFieldSettings(int id, [FromQuery] string? formKey, CancellationToken ct) =>
        Ok(await service.GetFieldSettingsAsync(id, formKey, ct));

    [HttpPut("roles/{id:int}/fields")]
    public async Task<ActionResult<IReadOnlyList<FieldSettingDto>>> SaveFieldSettings(int id, SaveFieldSettingsRequest request, CancellationToken ct) =>
        Ok(await service.SaveFieldSettingsAsync(id, request, ct));
}
