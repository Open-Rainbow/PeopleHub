using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Holidays.Contracts;
using PeopleHub.Application.Modules.Holidays.Interfaces;

namespace PeopleHub.Server.Controllers.Holidays;

/// <summary>Company holiday calendar. Everyone reads; HR adds, edits and deletes.</summary>
[ApiController]
[Route("api/v1/holidays")]
public sealed class HolidayController(IHolidayService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<HolidayItemDto>>> Get([FromQuery] int? year, CancellationToken ct)
        => Ok(await service.GetAsync(year, ct));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<HolidayItemDto>> GetById(int id, CancellationToken ct)
        => Ok(await service.GetByIdAsync(id, ct));

    [HttpPost]
    public async Task<ActionResult<HolidayItemDto>> Create(SaveHolidayRequest request, CancellationToken ct)
    {
        var created = await service.CreateAsync(request, ct);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<HolidayItemDto>> Update(int id, SaveHolidayRequest request, CancellationToken ct)
        => Ok(await service.UpdateAsync(id, request, ct));

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        await service.DeleteAsync(id, ct);
        return NoContent();
    }
}
