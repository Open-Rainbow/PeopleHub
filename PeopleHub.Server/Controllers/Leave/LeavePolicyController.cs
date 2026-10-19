using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Server.Controllers.Leave;

/// <summary>
/// Leave Policy Manager (HR): one policy per year + employment type.
/// Edit the draft, publish it, discard it, or copy a whole year into the next.
/// </summary>
[ApiController]
[Route("api/v1/leave/policies")]
public sealed class LeavePolicyController(ILeavePolicyService service) : ControllerBase
{
    [HttpGet("/api/v1/leave/employment-types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetEmploymentTypes(CancellationToken ct)
        => Ok(await service.GetEmploymentTypesAsync(ct));

    /// <summary>Published / draft state of every policy (optionally for one year).</summary>
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<LeavePolicySummaryDto>>> GetPolicies([FromQuery] int? year, CancellationToken ct)
        => Ok(await service.GetPoliciesAsync(year, ct));

    /// <summary>The draft if there is one, else the published version, else the defaults (status None).</summary>
    [HttpGet("current")]
    public async Task<ActionResult<LeavePolicyDto>> GetCurrent(
        [FromQuery] int? year, [FromQuery] string? employmentType, [FromQuery] string? status, CancellationToken ct)
        => Ok(await service.GetCurrentAsync(year, employmentType, status, ct));

    [HttpPut("draft")]
    public async Task<ActionResult<LeavePolicyDto>> SaveDraft(SaveLeavePolicyRequest request, CancellationToken ct)
        => Ok(await service.SaveDraftAsync(request, ct));

    [HttpPost("publish")]
    public async Task<ActionResult<LeavePolicyDto>> Publish(LeavePolicyKey key, CancellationToken ct)
        => Ok(await service.PublishAsync(key, ct));

    [HttpPost("discard")]
    public async Task<ActionResult<LeavePolicyDto>> Discard(LeavePolicyKey key, CancellationToken ct)
        => Ok(await service.DiscardDraftAsync(key, ct));

    [HttpPost("copy")]
    public async Task<ActionResult<CopyLeavePolicyResult>> Copy(CopyLeavePolicyRequest request, CancellationToken ct)
        => Ok(await service.CopyAsync(request, ct));
}
