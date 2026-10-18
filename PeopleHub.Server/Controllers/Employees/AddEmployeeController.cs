using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

namespace PeopleHub.Server.Controllers.Employees;

/// <summary>All Add Employee step APIs: POST api/v1/add-employee/{step}.</summary>
[ApiController]
[Route("api/v1/add-employee")]
public sealed class AddEmployeeController(IAddEmployeeService service) : ControllerBase
{
    [HttpPost("personal-info")]
    public async Task<ActionResult<SaveResponse>> SavePersonalInfo(PersonalInfoRequest request, CancellationToken cancellationToken)
        => Ok(await service.SavePersonalInfoAsync(request, cancellationToken));
}
