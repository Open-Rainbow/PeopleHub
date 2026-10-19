using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.OrgChart.Contracts;
using PeopleHub.Application.Modules.OrgChart.Interfaces;

namespace PeopleHub.Server.Controllers.OrgChart;

/// <summary>Organization chart (reporting lines from job details). HR / admin can move people.</summary>
[ApiController]
[Route("api/v1/org-chart")]
public sealed class OrgChartController(IOrgChartService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrgChartNodeDto>>> Get(CancellationToken ct)
        => Ok(await service.GetAsync(ct));

    /// <summary>Change who someone reports to. Their whole team moves with them. Returns the updated chart.</summary>
    [HttpPut("{employeeId}/manager")]
    public async Task<ActionResult<IReadOnlyList<OrgChartNodeDto>>> SetManager(string employeeId, SetManagerRequest request, CancellationToken ct)
        => Ok(await service.SetManagerAsync(employeeId, request, ct));
}
