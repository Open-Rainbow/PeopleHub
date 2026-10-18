using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Abstractions.Messaging;

namespace PeopleHub.Server.Common;

/// <summary>Every controller inherits this. Controllers only map HTTP to commands/queries.</summary>
[ApiController]
[Produces("application/json")]
[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
public abstract class ApiControllerBase(IDispatcher dispatcher) : ControllerBase
{
    protected IDispatcher Dispatcher { get; } = dispatcher;
}
