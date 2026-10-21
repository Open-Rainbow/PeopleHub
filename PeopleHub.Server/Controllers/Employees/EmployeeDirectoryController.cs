using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Employees.Directory.Contracts;
using PeopleHub.Application.Modules.Employees.Directory.Interfaces;

namespace PeopleHub.Server.Controllers.Employees;

/// <summary>
/// View Employee screen (employee directory). Reads need the "employees.view" page, export needs its export action,
/// status changes and delete need "employees.add" edit / delete (see Security/ApiPermissionMap).
/// </summary>
[ApiController]
[Route("api/v1/employees")]
public sealed class EmployeeDirectoryController(IEmployeeDirectoryService service) : ControllerBase
{
    /// <summary>Search, filters, sort and paging, e.g. ?search=polly&amp;department=Engineering&amp;sortBy=joined&amp;sortDir=desc&amp;page=1&amp;pageSize=20</summary>
    [HttpGet]
    public async Task<ActionResult<EmployeePageDto>> GetEmployees([FromQuery] EmployeeQuery query, CancellationToken ct) =>
        Ok(await service.GetEmployeesAsync(query, ct));

    [HttpGet("summary")]
    public async Task<ActionResult<EmployeeSummaryDto>> GetSummary(CancellationToken ct) =>
        Ok(await service.GetSummaryAsync(ct));

    [HttpGet("filters")]
    public async Task<ActionResult<EmployeeFiltersDto>> GetFilters(CancellationToken ct) =>
        Ok(await service.GetFiltersAsync(ct));

    /// <summary>Same filters as the list; returns every matching row as CSV.</summary>
    [HttpGet("export")]
    public async Task<IActionResult> Export([FromQuery] EmployeeQuery query, CancellationToken ct)
    {
        var file = await service.ExportAsync(query, ct);
        return File(file.Content, file.ContentType, file.FileName);
    }

    [HttpGet("{employeeCode}")]
    public async Task<ActionResult<EmployeeProfileDto>> GetProfile(string employeeCode, CancellationToken ct) =>
        Ok(await service.GetProfileAsync(employeeCode, ct));

    [HttpGet("{employeeCode}/status-history")]
    public async Task<ActionResult<IReadOnlyList<EmployeeStatusHistoryDto>>> GetStatusHistory(string employeeCode, CancellationToken ct) =>
        Ok(await service.GetStatusHistoryAsync(employeeCode, ct));

    /// <summary>{ "status": "Notice Period", "reason": "Resigned", "effectiveDate": "2026-11-01" }</summary>
    [HttpPost("{employeeCode}/status")]
    public async Task<ActionResult<EmployeeProfileDto>> SetStatus(string employeeCode, SetEmployeeStatusRequest request, CancellationToken ct) =>
        Ok(await service.SetStatusAsync(employeeCode, request, ct));

    [HttpDelete("{employeeCode}")]
    public async Task<IActionResult> Delete(string employeeCode, CancellationToken ct)
    {
        await service.DeleteAsync(employeeCode, ct);
        return NoContent();
    }
}
