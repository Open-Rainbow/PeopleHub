using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class TempLoginRequestValidator : AbstractValidator<TempLoginRequest>
{
    public TempLoginRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.TemporaryUsername).NotEmpty().MaximumLength(50);
        RuleFor(x => x.TemporaryPassword).NotEmpty().MaximumLength(50).StrongPassword();
    }
}
