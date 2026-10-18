using FluentValidation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class ChangeRequestsAuditRequestValidator : AbstractValidator<ChangeRequestsAuditRequest>
{
    public ChangeRequestsAuditRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.ChangeRequestType).MaximumLength(100);
        RuleFor(x => x.RequestedBy).MaximumLength(100);
        RuleFor(x => x.AuditReference).MaximumLength(100);
        RuleFor(x => x.AuditRemarks).MaximumLength(1000);
    }
}
