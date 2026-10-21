using System.Text;
using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Server.Controllers.Leave;

/// <summary>
/// Leaves &amp; WFH dashboard for HR / admins (leave-approval page). Dates are yyyy-MM-dd.
/// Approve / reject still go through POST api/v1/leave/requests/{id}/decision.
/// </summary>
[ApiController]
[Route("api/v1/leave/admin")]
public sealed class LeaveAdminController(ILeaveAdminService service) : ControllerBase
{
    /// <summary>Departments (with headcount) and leave types for the filter panel.</summary>
    [HttpGet("filters")]
    public async Task<ActionResult<LeaveAdminFiltersDto>> GetFilters(CancellationToken ct)
        => Ok(await service.GetFiltersAsync(ct));

    /// <summary>Requests touching from..to, filtered by department, type, status and search.</summary>
    [HttpGet("requests")]
    public async Task<ActionResult<LeaveAdminRequestsResult>> GetRequests([FromQuery] LeaveAdminQuery query, CancellationToken ct)
        => Ok(await service.GetRequestsAsync(query, ct));

    [HttpGet("requests/export")]
    public async Task<IActionResult> ExportRequests([FromQuery] LeaveAdminQuery query, CancellationToken ct)
    {
        var csv = await service.ExportRequestsCsvAsync(query, ct);
        var bytes = Encoding.UTF8.GetPreamble().Concat(Encoding.UTF8.GetBytes(csv)).ToArray();
        return File(bytes, "text/csv", $"leave-requests-{DateTime.Today:yyyy-MM-dd}.csv");
    }

    /// <summary>Leave balance by type for every active employee.</summary>
    [HttpGet("employees")]
    public async Task<ActionResult<IReadOnlyList<LeaveAdminEmployeeDto>>> GetEmployees([FromQuery] LeaveAdminEmployeesQuery query, CancellationToken ct)
        => Ok(await service.GetEmployeesAsync(query, ct));
}
