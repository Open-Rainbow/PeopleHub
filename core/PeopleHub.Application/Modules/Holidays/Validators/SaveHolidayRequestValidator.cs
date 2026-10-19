using FluentValidation;
using PeopleHub.Application.Modules.Holidays.Contracts;

namespace PeopleHub.Application.Modules.Holidays.Validators;

/// <summary>Shape checks. Duplicate dates are rejected by sp_save_holiday.</summary>
public sealed class SaveHolidayRequestValidator : AbstractValidator<SaveHolidayRequest>
{
    public SaveHolidayRequestValidator()
    {
        RuleFor(x => x.Date)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Pick a date.")
            .Must(d => d!.Value.Year is >= HolidayRules.YearMin and <= HolidayRules.YearMax)
            .WithMessage($"Year must be between {HolidayRules.YearMin} and {HolidayRules.YearMax}.");

        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the holiday a name.")
            .Must(v => v!.Trim().Length >= HolidayRules.NameMin)
            .WithMessage($"Name must be at least {HolidayRules.NameMin} characters.")
            .Must(v => v!.Trim().Length <= HolidayRules.NameMax)
            .WithMessage($"Name must be {HolidayRules.NameMax} characters or fewer.");

        RuleFor(x => x.Type)
            .Must(v => HolidayRules.Canonical(v) is not null)
            .WithMessage("Type must be Public, Festival, Regional or Company.");

        RuleFor(x => x.Description)
            .MaximumLength(HolidayRules.DescriptionMax)
            .WithMessage($"Description must be {HolidayRules.DescriptionMax} characters or fewer.");
    }
}
