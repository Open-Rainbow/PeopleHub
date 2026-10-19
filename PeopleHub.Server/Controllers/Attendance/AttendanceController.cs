using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Attendance.Contracts;
using PeopleHub.Application.Modules.Attendance.Interfaces;

namespace PeopleHub.Server.Controllers.Attendance;

/// <summary>Check in / out, my attendance, team view and regularization (correction) requests.</summary>
[ApiController]
[Route("api/v1/attendance")]
public sealed class AttendanceController(IAttendanceService service) : ControllerBase
{
    [HttpGet("policy")]
    public async Task<ActionResult<AttendancePolicyDto>> GetPolicy(CancellationToken ct)
        => Ok(await service.GetPolicyAsync(ct));

    /// <summary>One row per day. Defaults to the current month; max 3 months.</summary>
    [HttpGet("days")]
    public async Task<ActionResult<IReadOnlyList<AttendanceDayDto>>> GetDays(
        [FromQuery] string? employeeId, [FromQuery] DateTime? from, [FromQuery] DateTime? to, CancellationToken ct)
        => Ok(await service.GetDaysAsync(employeeId, from, to, ct));

    [HttpPost("check-in")]
    public async Task<ActionResult<AttendanceActionResult>> CheckIn(CheckInRequest request, CancellationToken ct)
        => Ok(await service.CheckInAsync(request, ct));

    [HttpPost("check-out")]
    public async Task<ActionResult<AttendanceActionResult>> CheckOut(CheckOutRequest request, CancellationToken ct)
        => Ok(await service.CheckOutAsync(request, ct));

    /// <summary>Everyone's status for one day (HR / managers).</summary>
    [HttpGet("team")]
    public async Task<ActionResult<IReadOnlyList<TeamDayRowDto>>> GetTeam(
        [FromQuery] DateTime? date, [FromQuery] string? search, [FromQuery] string? managerId, CancellationToken ct)
        => Ok(await service.GetTeamDayAsync(date, search, managerId, ct));

    /// <summary>Daily organization counts. Defaults to the last 30 days; max 2 months.</summary>
    [HttpGet("trend")]
    public async Task<ActionResult<IReadOnlyList<AttendanceTrendDto>>> GetTrend(
        [FromQuery] DateTime? from, [FromQuery] DateTime? to, CancellationToken ct)
        => Ok(await service.GetTrendAsync(from, to, ct));

    [HttpGet("regularizations")]
    public async Task<ActionResult<IReadOnlyList<RegularizationDto>>> GetRegularizations(
        [FromQuery] string? employeeId, [FromQuery] string? status, CancellationToken ct)
        => Ok(await service.GetRegularizationsAsync(employeeId, status, ct));

    [HttpGet("regularizations/{id:int}")]
    public async Task<ActionResult<RegularizationDto>> GetRegularization(int id, CancellationToken ct)
        => Ok(await service.GetRegularizationAsync(id, ct));

    [HttpPost("regularizations")]
    public async Task<ActionResult<RegularizationDto>> RequestRegularization(RegularizationRequest request, CancellationToken ct)
    {
        var created = await service.RequestRegularizationAsync(request, ct);
        return CreatedAtAction(nameof(GetRegularization), new { id = created.Id }, created);
    }

    [HttpPost("regularizations/{id:int}/decision")]
    public async Task<ActionResult<RegularizationDto>> Decide(int id, RegularizationDecisionRequest request, CancellationToken ct)
        => Ok(await service.DecideRegularizationAsync(id, request, ct));

    [HttpPost("regularizations/{id:int}/cancel")]
    public async Task<ActionResult<RegularizationDto>> Cancel(int id, CancelRegularizationRequest request, CancellationToken ct)
        => Ok(await service.CancelRegularizationAsync(id, request.EmployeeId, ct));
}
