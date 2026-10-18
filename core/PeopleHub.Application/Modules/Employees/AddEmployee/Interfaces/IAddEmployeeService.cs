using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

public interface IAddEmployeeService
{
    Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest request, CancellationToken cancellationToken);
}
