using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Policies.Contracts;
using PeopleHub.Application.Modules.Policies.Interfaces;

namespace PeopleHub.Server.Controllers.Policies;

/// <summary>
/// Company policies (floor / desk management, WFH, IT use, ...).
/// HR / admin create or upload, publish and archive (manage=true); employees read, download and acknowledge.
/// </summary>
[ApiController]
[Route("api/v1/policies")]
public sealed class PoliciesController(IPolicyService service) : ControllerBase
{
    [HttpGet("categories")]
    public ActionResult<IReadOnlyList<string>> GetCategories() => Ok(PolicyRules.Categories);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PolicyDto>>> GetPolicies(
        [FromQuery] string? employeeId, [FromQuery] bool manage, [FromQuery] string? status,
        [FromQuery] string? category, [FromQuery] string? search, CancellationToken ct) =>
        Ok(await service.GetPoliciesAsync(employeeId, manage, status, category, search, ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PolicyDto>> GetPolicy(int id, [FromQuery] string? employeeId, [FromQuery] bool manage, CancellationToken ct) =>
        Ok(await service.GetPolicyAsync(id, employeeId, manage, ct));

    /// <summary>Downloads the attached document (inline=true opens it in the browser).</summary>
    [HttpGet("{id:int}/file")]
    public async Task<IActionResult> Download(int id, [FromQuery] string? employeeId, [FromQuery] bool manage, [FromQuery] bool inline, CancellationToken ct)
    {
        var file = await service.GetFileAsync(id, employeeId, manage, ct);
        return inline
            ? File(file.FileData, file.FileContentType ?? "application/octet-stream")
            : File(file.FileData, file.FileContentType ?? "application/octet-stream", file.FileName);
    }

    [HttpPost]
    [RequestSizeLimit(16 * 1024 * 1024)]
    public async Task<ActionResult<PolicyDto>> Create(SavePolicyRequest request, CancellationToken ct)
    {
        var created = await service.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetPolicy), new { id = created.Id, manage = true }, created);
    }

    [HttpPut("{id:int}")]
    [RequestSizeLimit(16 * 1024 * 1024)]
    public async Task<ActionResult<PolicyDto>> Update(int id, SavePolicyRequest request, CancellationToken ct) =>
        Ok(await service.UpdateAsync(id, request, ct));

    /// <summary>{ "status": "Published" | "Archived" | "Draft" }</summary>
    [HttpPost("{id:int}/status")]
    public async Task<ActionResult<PolicyDto>> SetStatus(int id, SetPolicyStatusRequest request, CancellationToken ct) =>
        Ok(await service.SetStatusAsync(id, request, ct));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await service.DeleteAsync(id, ct);
        return NoContent();
    }

    [HttpPost("{id:int}/acknowledge")]
    public async Task<ActionResult<PolicyDto>> Acknowledge(int id, AcknowledgePolicyRequest request, CancellationToken ct) =>
        Ok(await service.AcknowledgeAsync(id, request.EmployeeId, ct));

    /// <summary>Everyone the policy is for, with when they acknowledged the current version.</summary>
    [HttpGet("{id:int}/acknowledgements")]
    public async Task<ActionResult<IReadOnlyList<PolicyAckDto>>> GetAcknowledgements(int id, CancellationToken ct) =>
        Ok(await service.GetAcknowledgementsAsync(id, ct));
}
