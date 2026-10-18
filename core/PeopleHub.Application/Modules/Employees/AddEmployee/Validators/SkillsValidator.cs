using FluentValidation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class SkillsRequestValidator : AbstractValidator<SkillsRequest>
{
    public SkillsRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleForEach(x => x.Skills).SetValidator(new SkillItemValidator());
    }
}

internal sealed class SkillItemValidator : AbstractValidator<SkillItem>
{
    public SkillItemValidator()
    {
        RuleFor(x => x.SkillName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.SkillCategory).MaximumLength(50);
        RuleFor(x => x.ProficiencyLevel).MaximumLength(50);
        RuleFor(x => x.YearsOfExperience)
            .Must(v => v is null or (>= 0 and <= 60))
            .WithMessage("Years of experience must be between 0 and 60.");
        RuleFor(x => x.LastUsedYear)
            .Must(v => v is null || (v >= 1950 && v <= DateTime.Today.Year))
            .WithMessage("Enter a valid year.");
        RuleFor(x => x.LinkedCertification).MaximumLength(100);
        RuleFor(x => x.Remarks).MaximumLength(500);
    }
}
