using FluentValidation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class WorkExperienceRequestValidator : AbstractValidator<WorkExperienceRequest>
{
    public WorkExperienceRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleForEach(x => x.WorkExperiences).SetValidator(new WorkExperienceItemValidator());
    }
}

internal sealed class WorkExperienceItemValidator : AbstractValidator<WorkExperienceItem>
{
    public WorkExperienceItemValidator()
    {
        RuleFor(x => x.EmployerName).MaximumLength(100);
        RuleFor(x => x.EmployerLocation).MaximumLength(100);
        RuleFor(x => x.Designation).MaximumLength(100);
        RuleFor(x => x.EmploymentType).MaximumLength(50);
        RuleFor(x => x.StartDate).NotNull();
        RuleFor(x => x.TotalExperience).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.PreviousEmployerPfAccountNumber).MaximumLength(50);
        RuleFor(x => x.ManagerName).MaximumLength(100);
        RuleFor(x => x.LastDrawnSalary).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.ReasonForLeaving).MaximumLength(500);
        RuleFor(x => x.SkillsUsed).MaximumLength(500);
        RuleFor(x => x.ExperienceLetterLink).MaximumLength(500);
        RuleFor(x => x.RelievingLetterLink).MaximumLength(500);
        RuleFor(x => x.PayslipLink).MaximumLength(500);
        RuleFor(x => x.EndDate)
            .Must((x, v) => v >= x.StartDate)
            .When(x => x.StartDate.HasValue && x.EndDate.HasValue)
            .WithMessage("End date must be on or after start date.");
    }
}
