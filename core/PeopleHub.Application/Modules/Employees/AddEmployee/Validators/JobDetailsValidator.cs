using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class JobDetailsRequestValidator : AbstractValidator<JobDetailsRequest>
{
    public JobDetailsRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(20);
        RuleFor(x => x.OfficeEmail).NotEmpty().MaximumLength(50).ValidEmail();
        RuleFor(x => x.DateOfJoining).NotNull();
        RuleFor(x => x.EmploymentStatus).NotEmpty().MaximumLength(50);
        RuleFor(x => x.EmployeeType).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Department).NotEmpty().MaximumLength(30);
        RuleFor(x => x.BusinessUnit).MaximumLength(50);
        RuleFor(x => x.Designation).NotEmpty().MaximumLength(30);
        RuleFor(x => x.PayLevel).NotEmpty().MaximumLength(20);
        RuleFor(x => x.WorkLocation).NotEmpty().MaximumLength(50);
        RuleFor(x => x.ReportingManager).NotEmpty().MaximumLength(50);
        RuleFor(x => x.DottedLineManager).MaximumLength(50);
        RuleFor(x => x.ShiftTimings).NotEmpty().MaximumLength(30);
        RuleFor(x => x.WorkSchedule).MaximumLength(50);
        RuleFor(x => x.CostCenter).MaximumLength(50);
        RuleFor(x => x.EmployeeCategory).MaximumLength(50);
        RuleFor(x => x.HrOwner).MaximumLength(50);
        RuleFor(x => x.ProbationEndDate)
            .Must((x, v) => v >= x.ProbationStartDate)
            .When(x => x.ProbationStartDate.HasValue && x.ProbationEndDate.HasValue)
            .WithMessage("Probation end date must be on or after probation start date.");
        RuleFor(x => x.ConfirmationDate)
            .Must((x, v) => v >= x.DateOfJoining)
            .When(x => x.ConfirmationDate.HasValue && x.DateOfJoining.HasValue)
            .WithMessage("Confirmation date must be on or after date of joining.");
    }
}
