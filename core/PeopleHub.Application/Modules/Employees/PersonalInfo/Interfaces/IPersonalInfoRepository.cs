using PeopleHub.Application.Modules.Employees.Common;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;

namespace PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

/// <summary>Port. Implemented in Infrastructure.</summary>
public interface IPersonalInfoRepository
{
    Task<EmployeeSectionSaveResult> SaveAsync(
        SavePersonalInfoCommand command,
        CancellationToken cancellationToken);
}
