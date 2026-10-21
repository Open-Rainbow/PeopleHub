using FluentValidation;
using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Validators;

public sealed class LeaveAdminQueryValidator : AbstractValidator<LeaveAdminQuery>
{
    public LeaveAdminQueryValidator()
    {
        RuleFor(x => x.To)
            .Must((x, to) => x.From is null || to is null || to.Value.Date >= x.From.Value.Date)
            .WithMessage("End date must be on or after the start date.")
            .Must((x, to) => x.From is null || to is null || (to.Value.Date - x.From.Value.Date).TotalDays <= LeaveAdminRules.MaxRangeDays)
            .WithMessage("The date range can be at most two years.");

        RuleFor(x => x.Status)
            .Must(s => string.IsNullOrWhiteSpace(s)
                       || LeaveAdminRules.Statuses.Any(a => a.Equals(s.Trim(), StringComparison.OrdinalIgnoreCase)))
            .WithMessage("Status must be All, Pending, New, Approved, Rejected or Cancelled.");

        RuleFor(x => x.LeaveType)
            .Matches(LeaveRules.LeaveTypePattern)
            .When(x => !string.IsNullOrWhiteSpace(x.LeaveType))
            .WithMessage("Unknown leave type.");

        RuleFor(x => x.Department).MaximumLength(LeaveAdminRules.DepartmentMax);
        RuleFor(x => x.Search).MaximumLength(LeaveAdminRules.SearchMax);
    }
}

public sealed class LeaveAdminEmployeesQueryValidator : AbstractValidator<LeaveAdminEmployeesQuery>
{
    public LeaveAdminEmployeesQueryValidator()
    {
        RuleFor(x => x.To)
            .Must((x, to) => x.From is null || to is null || to.Value.Date >= x.From.Value.Date)
            .WithMessage("End date must be on or after the start date.")
            .Must((x, to) => x.From is null || to is null || (to.Value.Date - x.From.Value.Date).TotalDays <= LeaveAdminRules.MaxRangeDays)
            .WithMessage("The date range can be at most two years.");

        RuleFor(x => x.Department).MaximumLength(LeaveAdminRules.DepartmentMax);
        RuleFor(x => x.Search).MaximumLength(LeaveAdminRules.SearchMax);
    }
}
