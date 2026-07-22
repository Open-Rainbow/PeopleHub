using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

namespace PeopleHub.Server.Controllers.Employees;

[ApiController]
[Route("api/employees/personal-info")]
public sealed class PersonalInfoController : ControllerBase
{
    private readonly IPersonalInfoService personalInfoService;

    public PersonalInfoController(IPersonalInfoService personalInfoService)
    {
        this.personalInfoService = personalInfoService;
    }

    [HttpPost]
    public async Task<ActionResult<PersonalInfoSaveResponseDto>> SaveAsync(
        PersonalInfoSaveRequestDto request,
        CancellationToken cancellationToken)
    {
        var response = await personalInfoService.SaveAsync(request, cancellationToken);

        return Ok(response);
    }
}