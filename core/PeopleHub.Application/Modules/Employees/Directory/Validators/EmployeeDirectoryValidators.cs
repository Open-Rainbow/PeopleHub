using FluentValidation;
using PeopleHub.Application.Modules.Employees.Directory.Contracts;

namespace PeopleHub.Application.Modules.Employees.Directory.Validators;

/// <summary>Shape checks. Team / duplicate-status rules are checked by the stored procedures.</summary>
public sealed class EmployeeQueryValidator : AbstractValidator<EmployeeQuery>
{
    public EmployeeQueryValidator()
    {
        RuleFor(x => x.Page).GreaterThanOrEqualTo(1).WithMessage("Page must be 1 or more.");
        RuleFor(x => x.PageSize).InclusiveBetween(1, EmployeeDirectoryRules.MaxPageSize)
            .WithMessage($"Page size must be between 1 and {EmployeeDirectoryRules.MaxPageSize}.");
        RuleFor(x => x.Search).MaximumLength(EmployeeDirectoryRules.SearchMax)
            .WithMessage($"Search must be {EmployeeDirectoryRules.SearchMax} characters or fewer.");
        RuleFor(x => x.Status)
            .Must(s => EmployeeDirectoryRules.Filter(s, 30) is null || EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.Statuses, s) is not null)
            .WithMessage("Status is not valid.");
        RuleFor(x => x.SortBy)
            .Must(s => string.IsNullOrWhiteSpace(s) || EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.SortFields, s) is not null)
            .WithMessage("Sort field is not valid.");
        RuleFor(x => x.SortDir)
            .Must(s => string.IsNullOrWhiteSpace(s) || s.Trim().Equals("asc", StringComparison.OrdinalIgnoreCase) || s.Trim().Equals("desc", StringComparison.OrdinalIgnoreCase))
            .WithMessage("Sort direction must be asc or desc.");
        RuleFor(x => x.ManagerCode)
            .Must(c => EmployeeDirectoryRules.Filter(c, 50) is null || EmployeeDirectoryRules.IsCode(c!.Trim()))
            .WithMessage("Manager is not valid.");
        RuleFor(x => x.JoinedTo)
            .GreaterThanOrEqualTo(x => x.JoinedFrom)
            .When(x => x.JoinedFrom is not null && x.JoinedTo is not null)
            .WithMessage("'Joined to' must be on or after 'Joined from'.");
    }
}

public sealed class SetEmployeeStatusRequestValidator : AbstractValidator<SetEmployeeStatusRequest>
{
    public SetEmployeeStatusRequestValidator()
    {
        RuleFor(x => x.Status).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Pick the new status.")
            .Must(s => EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.Statuses, s) is not null)
            .WithMessage("Status is not valid.");
        RuleFor(x => x.Reason)
            .NotEmpty()
            .When(x => EmployeeDirectoryRules.NeedsReason(EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.Statuses, x.Status)))
            .WithMessage("Give a reason for this change.");
        RuleFor(x => x.Reason).MaximumLength(EmployeeDirectoryRules.ReasonMax)
            .WithMessage($"Reason must be {EmployeeDirectoryRules.ReasonMax} characters or fewer.");
    }
}
