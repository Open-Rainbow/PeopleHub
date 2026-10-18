using FluentValidation;
using PeopleHub.Application.Common.Utilities;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Domain.Modules.Employees;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class PersonalInfoValidator : AbstractValidator<PersonalInfoRequest>
{
    private const int MaxPhotoBytes = 2 * 1024 * 1024;

    public PersonalInfoValidator()
    {
        // Lengths match dbo.sp_ins_emp_per_info parameters.
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(250);
        RuleFor(x => x.MiddleName).MaximumLength(250);
        RuleFor(x => x.LastName).MaximumLength(250);
        RuleFor(x => x.PreferredName).MaximumLength(250);
        RuleFor(x => x.EmployeeId).MaximumLength(50);
        RuleFor(x => x.Salutation).MaximumLength(10);
        RuleFor(x => x.Gender).MaximumLength(50);
        RuleFor(x => x.MaritalStatus).MaximumLength(20);
        RuleFor(x => x.BloodGroup).MaximumLength(20);
        RuleFor(x => x.Nationality).MaximumLength(50);
        RuleFor(x => x.PlaceOfBirth).MaximumLength(100);
        RuleFor(x => x.Religion).MaximumLength(50);
        RuleFor(x => x.Category).MaximumLength(100);

        RuleFor(x => x.DateOfBirth)
            .Must(dob => EmployeeRules.IsOfWorkingAge(DateOnly.FromDateTime(dob!.Value), DateOnly.FromDateTime(DateTime.Today)))
            .WithMessage($"Employee must be between {EmployeeRules.MinimumAgeYears} and {EmployeeRules.MaximumAgeYears} years old.")
            .When(x => x.DateOfBirth.HasValue);

        RuleFor(x => x.DateOfJoining)
            .Must((x, doj) => doj!.Value.Date > x.DateOfBirth!.Value.Date)
            .WithMessage("Date of joining must be after date of birth.")
            .When(x => x.DateOfJoining.HasValue && x.DateOfBirth.HasValue);

        RuleFor(x => x.EmployeePhoto)
            .Must(photo => Base64Payload.TryDecode(photo) is { Length: > 0 and <= MaxPhotoBytes })
            .WithMessage("Employee photo must be a valid image up to 2 MB.")
            .When(x => !string.IsNullOrWhiteSpace(x.EmployeePhoto));
    }
}
