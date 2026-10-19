using FluentValidation;
using PeopleHub.Application.Modules.Attendance.Contracts;

namespace PeopleHub.Application.Modules.Attendance.Validators;

/// <summary>Shape checks only. Time-window rules (today, last N days, duplicates) live in the stored procedures.</summary>
public sealed class CheckInRequestValidator : AbstractValidator<CheckInRequest>
{
    public CheckInRequestValidator()
    {
        RuleFor(x => x.WorkMode)
            .Must(v => AttendanceRules.CanonicalMode(v) is not null)
            .WithMessage("Work mode must be Office or Remote.");

        RuleFor(x => x.Note)
            .MaximumLength(AttendanceRules.NoteMax)
            .WithMessage($"Note must be {AttendanceRules.NoteMax} characters or fewer.");
    }
}

public sealed class CheckOutRequestValidator : AbstractValidator<CheckOutRequest>
{
    public CheckOutRequestValidator()
    {
        RuleFor(x => x.Note)
            .MaximumLength(AttendanceRules.NoteMax)
            .WithMessage($"Note must be {AttendanceRules.NoteMax} characters or fewer.");
    }
}

public sealed class RegularizationRequestValidator : AbstractValidator<RegularizationRequest>
{
    public RegularizationRequestValidator()
    {
        RuleFor(x => x.WorkDate)
            .NotNull().WithMessage("Pick the day to correct.");

        RuleFor(x => x.CheckIn)
            .Must(v => AttendanceRules.ParseTime(v) is not null)
            .WithMessage("Check-in must be a time like 09:30.");

        RuleFor(x => x.CheckOut)
            .Cascade(CascadeMode.Stop)
            .Must(v => AttendanceRules.ParseTime(v) is not null)
            .WithMessage("Check-out must be a time like 18:30.")
            .Must((x, v) => AttendanceRules.ParseTime(x.CheckIn) is not { } start || AttendanceRules.ParseTime(v) > start)
            .WithMessage("Check-out must be after check-in.");

        RuleFor(x => x.WorkMode)
            .Must(v => AttendanceRules.CanonicalMode(v) is not null)
            .WithMessage("Work mode must be Office or Remote.");

        RuleFor(x => x.Reason)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Tell your manager what happened.")
            .Must(v => v!.Trim().Length >= AttendanceRules.ReasonMin)
            .WithMessage($"Reason must be at least {AttendanceRules.ReasonMin} characters.")
            .Must(v => v!.Trim().Length <= AttendanceRules.ReasonMax)
            .WithMessage($"Reason must be {AttendanceRules.ReasonMax} characters or fewer.");
    }
}

public sealed class RegularizationDecisionRequestValidator : AbstractValidator<RegularizationDecisionRequest>
{
    public RegularizationDecisionRequestValidator()
    {
        RuleFor(x => x.Approve)
            .NotNull().WithMessage("Choose approve or reject.");

        RuleFor(x => x.Note)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().When(x => x.Approve == false).WithMessage("Add a note when rejecting a request.")
            .MaximumLength(AttendanceRules.DecisionNoteMax)
            .WithMessage($"Note must be {AttendanceRules.DecisionNoteMax} characters or fewer.");
    }
}
