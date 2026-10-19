using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Announcements.Contracts;
using PeopleHub.Application.Modules.Announcements.Interfaces;

namespace PeopleHub.Server.Controllers.Announcements;

/// <summary>Announcements: HR manages them, employees read them. All routes are scoped to the caller's organization.</summary>
[ApiController]
[Route("api/v1/announcements")]
public sealed class AnnouncementsController(IAnnouncementService service) : ControllerBase
{
    /// <summary>List with optional filters: ?status=Active&amp;search=leave&amp;includeScheduled=false</summary>
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AnnouncementDto>>> GetList([FromQuery] AnnouncementQuery query, CancellationToken ct)
        => Ok(await service.GetListAsync(query, ct));

    /// <summary>Counts for the stat cards and unread badge.</summary>
    [HttpGet("summary")]
    public async Task<ActionResult<AnnouncementSummary>> GetSummary(CancellationToken ct)
        => Ok(await service.GetSummaryAsync(ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AnnouncementDto>> GetById(int id, CancellationToken ct)
        => Ok(await service.GetByIdAsync(id, ct));

    [HttpPost]
    public async Task<ActionResult<AnnouncementDto>> Create(AnnouncementRequest request, CancellationToken ct)
    {
        var created = await service.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<AnnouncementDto>> Update(int id, AnnouncementRequest request, CancellationToken ct)
        => Ok(await service.UpdateAsync(id, request, ct));

    [HttpPatch("{id:int}/pin")]
    public async Task<ActionResult<AnnouncementDto>> SetPinned(int id, PinAnnouncementRequest request, CancellationToken ct)
        => Ok(await service.SetPinnedAsync(id, request.IsPinned, ct));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await service.DeleteAsync(id, ct);
        return NoContent();
    }

    /// <summary>Marks one or more announcements as read for the current user.</summary>
    [HttpPost("read")]
    public async Task<IActionResult> MarkRead(MarkAnnouncementsReadRequest request, CancellationToken ct)
    {
        await service.MarkReadAsync(request.Ids, ct);
        return NoContent();
    }
}
