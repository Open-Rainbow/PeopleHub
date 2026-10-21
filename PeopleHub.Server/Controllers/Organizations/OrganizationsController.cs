using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Organizations.Contracts;
using PeopleHub.Application.Modules.Organizations.Interfaces;

namespace PeopleHub.Server.Controllers.Organizations;

/// <summary>
/// Organizations. Everything except "current" is Super Admin only (checked in OrganizationService).
/// Super Admin works inside one organization at a time: the app sends it in the X-Organization-Id header.
/// </summary>
[ApiController]
[Route("api/v1/organizations")]
public sealed class OrganizationsController(IOrganizationService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrganizationDto>>> List([FromQuery] string? search, [FromQuery] bool includeInactive = true, CancellationToken ct = default) =>
        Ok(await service.ListAsync(search, includeInactive, ct));

    /// <summary>The organization this request works in (any role).</summary>
    [HttpGet("current")]
    public async Task<ActionResult<OrganizationDto>> Current(CancellationToken ct) =>
        Ok(await service.GetCurrentAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrganizationDto>> Get(int id, CancellationToken ct) =>
        Ok(await service.GetAsync(id, ct));

    [HttpPost]
    public async Task<ActionResult<OrganizationDto>> Create(SaveOrganizationRequest request, CancellationToken ct)
    {
        var created = await service.CreateAsync(request, ct);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<OrganizationDto>> Update(int id, SaveOrganizationRequest request, CancellationToken ct) =>
        Ok(await service.UpdateAsync(id, request, ct));

    /// <summary>{ "isActive": false } deactivates the organization.</summary>
    [HttpPost("{id:int}/status")]
    public async Task<ActionResult<OrganizationDto>> SetStatus(int id, SetOrganizationStatusRequest request, CancellationToken ct) =>
        Ok(await service.SetStatusAsync(id, request, ct));
}
