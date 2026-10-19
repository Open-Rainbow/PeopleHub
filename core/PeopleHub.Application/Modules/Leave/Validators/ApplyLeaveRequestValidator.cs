using System.Text.RegularExpressions;
using FluentValidation;
using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Validators;

/// <summary>Shape checks. Whether the type exists for the employee, balance, overlap, backdating and per-type limits are enforced by sp_apply_leave.</summary>
public sealed class ApplyLeaveRequestValidator : AbstractValidator<ApplyLeaveRequest>
{
    private static readonly Regex TypeCode = new(LeaveRules.LeaveTypePattern, RegexOptions.Compiled);

    public ApplyLeaveRequestValidator()
    {
        RuleFor(x => x.LeaveType)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Leave type is required.")
            .Must(v => TypeCode.IsMatch(v!.Trim().ToLowerInvariant()))
            .WithMessage("Leave type is not valid.");

        RuleFor(x => x.FromDate).NotNull().WithMessage("Start date is required.");

        RuleFor(x => x.ToDate)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("End date is required.")
            .Must((x, to) => x.FromDate is null || to!.Value.Date >= x.FromDate.Value.Date)
            .WithMessage("End date must be on or after the start date.")
            .Must((x, to) => x.FromDate is null || (to!.Value.Date - x.FromDate.Value.Date).TotalDays <= LeaveRules.MaxRangeDays)
            .WithMessage("A leave request can cover at most one year.");

        RuleFor(x => x.DayPart)
            .Must(v => string.IsNullOrWhiteSpace(v) || LeaveRules.DayParts.Contains(v.Trim(), StringComparer.OrdinalIgnoreCase))
            .WithMessage("Day part must be full, first-half or second-half.")
            .Must((x, v) => string.IsNullOrWhiteSpace(v) || v.Trim().Equals("full", StringComparison.OrdinalIgnoreCase)
                            || x.FromDate is null || x.ToDate is null || x.FromDate.Value.Date == x.ToDate.Value.Date)
            .WithMessage("Half day applies to a single date only.");

        RuleFor(x => x.Reason)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Reason is required.")
            .Must(v => v!.Trim().Length >= LeaveRules.ReasonMin)
            .WithMessage($"Reason must be at least {LeaveRules.ReasonMin} characters.")
            .Must(v => v!.Trim().Length <= LeaveRules.ReasonMax)
            .WithMessage($"Reason must be {LeaveRules.ReasonMax} characters or fewer.");
    }
}

public sealed class LeaveDecisionRequestValidator : AbstractValidator<LeaveDecisionRequest>
{
    public LeaveDecisionRequestValidator()
    {
        RuleFor(x => x.Note)
            .MaximumLength(LeaveRules.NoteMax)
            .Must((x, note) => x.Approve || !string.IsNullOrWhiteSpace(note))
            .WithMessage("Add a note when rejecting a request.");
    }
}
