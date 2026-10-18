using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

/// <summary>Implemented in Infrastructure (stored procedures).</summary>
public interface IAddEmployeeRepository
{
    Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest request, CancellationToken cancellationToken);
}
