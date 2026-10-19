using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Server.Controllers.Leave;

/// <summary>
/// Leave: types, holidays, balances, requests (apply / withdraw) and approvals.
/// Until login is wired up, pass the employee code as ?employeeId=EMP00001 (or in the body).
/// </summary>
[ApiController]
[Route("api/v1/leave")]
public sealed class LeaveController(ILeaveService service) : ControllerBase
{
    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<LeaveTypeDto>>> GetTypes(CancellationToken ct)
        => Ok(await service.GetTypesAsync(ct));

    [HttpGet("holidays")]
    public async Task<ActionResult<IReadOnlyList<HolidayDto>>> GetHolidays([FromQuery] int? year, CancellationToken ct)
        => Ok(await service.GetHolidaysAsync(year, ct));

    [HttpGet("balances")]
    public async Task<ActionResult<IReadOnlyList<LeaveBalanceDto>>> GetBalances([FromQuery] string? employeeId, [FromQuery] int? year, CancellationToken ct)
        => Ok(await service.GetBalancesAsync(employeeId, year, ct));

    [HttpGet("requests")]
    public async Task<ActionResult<IReadOnlyList<LeaveRequestDto>>> GetRequests([FromQuery] string? employeeId, [FromQuery] string? status, CancellationToken ct)
        => Ok(await service.GetRequestsAsync(employeeId, status, ct));

    [HttpGet("requests/{id:int}")]
    public async Task<ActionResult<LeaveRequestDto>> GetRequest(int id, CancellationToken ct)
        => Ok(await service.GetRequestAsync(id, ct));

    [HttpPost("requests")]
    public async Task<ActionResult<LeaveRequestDto>> Apply(ApplyLeaveRequest request, CancellationToken ct)
    {
        var created = await service.ApplyAsync(request, ct);
        return CreatedAtAction(nameof(GetRequest), new { id = created.Id }, created);
    }

    [HttpPost("requests/{id:int}/withdraw")]
    public async Task<ActionResult<LeaveRequestDto>> Withdraw(int id, WithdrawLeaveRequest request, CancellationToken ct)
        => Ok(await service.WithdrawAsync(id, request.EmployeeId, ct));

    /// <summary>Pending requests to approve. Without approverId (and not logged in) returns every pending request in the org.</summary>
    [HttpGet("approvals")]
    public async Task<ActionResult<IReadOnlyList<LeaveRequestDto>>> GetApprovals([FromQuery] string? approverId, CancellationToken ct)
        => Ok(await service.GetApprovalsAsync(approverId, ct));

    [HttpPost("requests/{id:int}/decision")]
    public async Task<ActionResult<LeaveRequestDto>> Decide(int id, LeaveDecisionRequest request, CancellationToken ct)
        => Ok(await service.DecideAsync(id, request, ct));
}
