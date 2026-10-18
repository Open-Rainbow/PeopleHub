using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Services;

/// <summary>Validate, then save. One method per Add Employee step.</summary>
public sealed class AddEmployeeService(
    IAddEmployeeRepository repository,
    IValidator<PersonalInfoRequest> personalInfoValidator) : IAddEmployeeService
{
    public async Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest request, CancellationToken cancellationToken)
    {
        await personalInfoValidator.EnsureValidAsync(request, cancellationToken);
        return await repository.SavePersonalInfoAsync(request, cancellationToken);
    }
}
