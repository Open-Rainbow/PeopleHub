using PeopleHub.Application.Abstractions.Messaging;
using PeopleHub.Application.Modules.Employees.Common;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

namespace PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;

internal sealed class SavePersonalInfoCommandHandler(IPersonalInfoRepository repository)
    : ICommandHandler<SavePersonalInfoCommand, EmployeeSectionSaveResult>
{
    public Task<EmployeeSectionSaveResult> HandleAsync(
        SavePersonalInfoCommand request,
        CancellationToken cancellationToken) =>
        repository.SaveAsync(request, cancellationToken);
}
