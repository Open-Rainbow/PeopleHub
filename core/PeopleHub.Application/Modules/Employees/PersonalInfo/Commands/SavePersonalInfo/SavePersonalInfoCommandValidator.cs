using FluentValidation;
using PeopleHub.Application.Abstractions.Time;
using PeopleHub.Application.Common.Utilities;
using PeopleHub.Domain.Modules.Employees;

namespace PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;

internal sealed class SavePersonalInfoCommandValidator : AbstractValidator<SavePersonalInfoCommand>
{
    private const int MaxPhotoBytes = 2 * 1024 * 1024;

    public SavePersonalInfoCommandValidator(IDateTimeProvider clock)
    {
        // Lengths mirror dbo.sp_ins_emp_per_info parameter sizes.
        RuleFor(x => x.Id).GreaterThan(0).When(x => x.Id.HasValue && x.Id != 0);
        RuleFor(x => x.EmployeeId).MaximumLength(50);
        RuleFor(x => x.Salutation).MaximumLength(10);
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(250);
        RuleFor(x => x.MiddleName).MaximumLength(250);
        RuleFor(x => x.LastName).MaximumLength(250);
        RuleFor(x => x.PreferredName).MaximumLength(250);
        RuleFor(x => x.Gender).MaximumLength(50);
        RuleFor(x => x.MaritalStatus).MaximumLength(20);
        RuleFor(x => x.BloodGroup).MaximumLength(20);
        RuleFor(x => x.Nationality).MaximumLength(50);
        RuleFor(x => x.PlaceOfBirth).MaximumLength(100);
        RuleFor(x => x.Religion).MaximumLength(50);
        RuleFor(x => x.Category).MaximumLength(100);

        RuleFor(x => x.DateOfBirth)
            .Must(dob => EmployeeRules.IsOfWorkingAge(DateOnly.FromDateTime(dob!.Value), clock.Today))
            .WithMessage($"Employee must be between {EmployeeRules.MinimumAgeYears} and {EmployeeRules.MaximumAgeYears} years old.")
            .When(x => x.DateOfBirth.HasValue);

        RuleFor(x => x.DateOfJoining)
            .Must((command, doj) => doj!.Value.Date > command.DateOfBirth!.Value.Date)
            .WithMessage("Date of joining must be after date of birth.")
            .When(x => x.DateOfJoining.HasValue && x.DateOfBirth.HasValue);

        RuleFor(x => x.EmployeePhoto)
            .Must(photo => Base64Payload.TryDecode(photo) is { Length: > 0 and <= MaxPhotoBytes })
            .WithMessage("Employee photo must be a valid base64 image up to 2 MB.")
            .When(x => !string.IsNullOrWhiteSpace(x.EmployeePhoto));
    }
}
