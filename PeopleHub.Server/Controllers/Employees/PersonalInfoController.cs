using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Abstractions.Messaging;
using PeopleHub.Application.Modules.Employees.Common;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;
using PeopleHub.Server.Common;

namespace PeopleHub.Server.Controllers.Employees;

[Route(ApiRoutes.Employees.Root + "/personal-info")]
[Tags("Employees")]
public sealed class PersonalInfoController(IDispatcher dispatcher) : ApiControllerBase(dispatcher)
{
    /// <summary>Insert (no Id) or update (with Id) the Personal Info step.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(EmployeeSectionSaveResult), StatusCodes.Status200OK)]
    public async Task<ActionResult<EmployeeSectionSaveResult>> Save(
        [FromBody] SavePersonalInfoCommand command,
        CancellationToken cancellationToken) =>
        Ok(await Dispatcher.SendAsync(command, cancellationToken));
}
