using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Domain.Modules.Employees;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class PersonalInfoValidator : AbstractValidator<PersonalInfoRequest>
{
    public PersonalInfoValidator()
    {
        // Required fields mirror the Angular config. Lengths match dbo.sp_ins_emp_per_info.
        // EmployeeId and photo are optional here: the SP generates the id, and updates may skip the photo.
        RuleFor(x => x.EmployeeId).MaximumLength(50);
        RuleFor(x => x.Salutation).NotEmpty().MaximumLength(10);
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(250);
        RuleFor(x => x.MiddleName).MaximumLength(250);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(250);
        RuleFor(x => x.PreferredName).MaximumLength(250);
        RuleFor(x => x.DateOfBirth).NotNull();
        RuleFor(x => x.DateOfJoining).NotNull();
        RuleFor(x => x.Gender).NotEmpty().MaximumLength(50);
        RuleFor(x => x.MaritalStatus).NotEmpty().MaximumLength(20);
        RuleFor(x => x.BloodGroup).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Nationality).MaximumLength(50);
        RuleFor(x => x.PlaceOfBirth).MaximumLength(100);
        RuleFor(x => x.Religion).MaximumLength(50);
        RuleFor(x => x.Category).MaximumLength(100);
        RuleFor(x => x.EmployeePhoto).ValidFile();

        RuleFor(x => x.DateOfBirth)
            .Must(dob => EmployeeRules.IsOfWorkingAge(DateOnly.FromDateTime(dob!.Value), DateOnly.FromDateTime(DateTime.Today)))
            .WithMessage($"Employee must be between {EmployeeRules.MinimumAgeYears} and {EmployeeRules.MaximumAgeYears} years old.")
            .When(x => x.DateOfBirth.HasValue);

        RuleFor(x => x.DateOfJoining)
            .Must((x, doj) => doj!.Value.Date > x.DateOfBirth!.Value.Date)
            .WithMessage("Date of joining must be after date of birth.")
            .When(x => x.DateOfJoining.HasValue && x.DateOfBirth.HasValue);
    }
}
