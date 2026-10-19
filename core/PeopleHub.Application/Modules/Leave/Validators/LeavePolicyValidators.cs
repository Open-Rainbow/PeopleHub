using System.Text.RegularExpressions;
using FluentValidation;
using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Validators;

/// <summary>Everything the policy editor can get wrong. The database re-checks allowance / carry forward / certificate rules.</summary>
public sealed class SaveLeavePolicyRequestValidator : AbstractValidator<SaveLeavePolicyRequest>
{
    public SaveLeavePolicyRequestValidator()
    {
        RuleFor(x => x.Year)
            .InclusiveBetween(LeavePolicyRules.YearMin, LeavePolicyRules.YearMax)
            .WithMessage($"Year must be between {LeavePolicyRules.YearMin} and {LeavePolicyRules.YearMax}.");

        RuleFor(x => x.EmploymentType)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Employment type is required.")
            .MaximumLength(LeavePolicyRules.EmploymentTypeMax);

        RuleFor(x => x.Items)
            .Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Items are required.")
            .Must(items => items.Count <= LeavePolicyRules.MaxItems)
            .WithMessage($"A policy can have at most {LeavePolicyRules.MaxItems} leave types.")
            .Must(items => items
                .Where(i => !string.IsNullOrWhiteSpace(i.Label))
                .GroupBy(i => i.Label!.Trim(), StringComparer.OrdinalIgnoreCase)
                .All(g => g.Count() == 1))
            .WithMessage("Two leave types have the same name.")
            .Must(items => items
                .Where(i => !string.IsNullOrWhiteSpace(i.Code))
                .GroupBy(i => i.Code!.Trim(), StringComparer.OrdinalIgnoreCase)
                .All(g => g.Count() == 1))
            .WithMessage("Two leave types have the same code.");

        RuleForEach(x => x.Items).SetValidator(new LeavePolicyItemValidator());
    }
}

public sealed class LeavePolicyItemValidator : AbstractValidator<LeavePolicyItemDto>
{
    private static readonly Regex Code = new(LeavePolicyRules.CodePattern, RegexOptions.Compiled);

    public LeavePolicyItemValidator()
    {
        RuleFor(x => x.Label)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Leave name is required.")
            .Must(v => v!.Trim().Length <= LeavePolicyRules.LabelMax)
            .WithMessage($"Leave name must be {LeavePolicyRules.LabelMax} characters or fewer.");

        RuleFor(x => x.Code)
            .Must(v => string.IsNullOrWhiteSpace(v) || Code.IsMatch(v.Trim().ToLowerInvariant()))
            .WithMessage("Code may only use letters, digits and hyphens (2-20 characters).");

        RuleFor(x => x.Description)
            .MaximumLength(LeavePolicyRules.DescriptionMax);

        RuleFor(x => x.Category)
            .Must(v => LeavePolicyRules.Canonical(LeavePolicyRules.Categories, v) is not null)
            .WithMessage("Category must be standard, parental or additional.");

        RuleFor(x => x.AnnualAllowance)
            .Must((x, v) => v is not null || !x.IsPaid)
            .WithMessage("Paid leave needs an annual allowance (only unpaid leave can be unlimited).");

        RuleFor(x => x.AnnualAllowance)
            .InclusiveBetween(0m, 365m)
            .When(x => x.AnnualAllowance is not null)
            .WithMessage("Annual allowance must be between 0 and 365 days.");

        RuleFor(x => x.CarryForwardDays)
            .GreaterThanOrEqualTo(0).WithMessage("Carry forward can't be negative.")
            .Must((x, v) => x.AnnualAllowance is null || v <= x.AnnualAllowance)
            .WithMessage("Carry forward can't be more than the annual allowance.");

        RuleFor(x => x.MustBeTakenWithinMonths)
            .InclusiveBetween(1, 24)
            .When(x => x.MustBeTakenWithinMonths is not null)
            .WithMessage("'Must be taken within' must be between 1 and 24 months.");

        RuleFor(x => x.AllowanceBasis)
            .Must(v => LeavePolicyRules.Canonical(LeavePolicyRules.AllowanceBases, v) is not null)
            .WithMessage("Allowance basis must be Yearly, Monthly accrual or Pro-rata.");

        RuleFor(x => x.ApprovalType)
            .Must(v => LeavePolicyRules.Canonical(LeavePolicyRules.ApprovalTypes, v) is not null)
            .WithMessage("Approval must be Auto, Manager, HR or Manager + HR.");

        RuleFor(x => x.CertificateAfterDays)
            .NotNull()
            .When(x => x.CertificateRequired)
            .WithMessage("Say after how many days a certificate is needed.");

        RuleFor(x => x.CertificateAfterDays)
            .InclusiveBetween(0.5m, 365m)
            .When(x => x.CertificateRequired && x.CertificateAfterDays is not null)
            .WithMessage("Certificate days must be between 0.5 and 365.");

        RuleFor(x => x.BackdateDays)
            .InclusiveBetween(0, 30).WithMessage("Backdating must be between 0 and 30 days.");

        RuleFor(x => x.MaxConsecutive)
            .InclusiveBetween(0.5m, 365m)
            .When(x => x.MaxConsecutive is not null)
            .WithMessage("Max days per request must be between 0.5 and 365.");

        RuleFor(x => x.IsEncashable)
            .Must((x, v) => !v || x.IsPaid)
            .WithMessage("Unpaid leave can't be encashable.");
    }
}

public sealed class LeavePolicyKeyValidator : AbstractValidator<LeavePolicyKey>
{
    public LeavePolicyKeyValidator()
    {
        RuleFor(x => x.Year)
            .InclusiveBetween(LeavePolicyRules.YearMin, LeavePolicyRules.YearMax)
            .WithMessage($"Year must be between {LeavePolicyRules.YearMin} and {LeavePolicyRules.YearMax}.");
        RuleFor(x => x.EmploymentType)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Employment type is required.")
            .MaximumLength(LeavePolicyRules.EmploymentTypeMax);
    }
}

public sealed class CopyLeavePolicyRequestValidator : AbstractValidator<CopyLeavePolicyRequest>
{
    public CopyLeavePolicyRequestValidator()
    {
        RuleFor(x => x.SourceYear)
            .InclusiveBetween(LeavePolicyRules.YearMin, LeavePolicyRules.YearMax)
            .WithMessage($"Year must be between {LeavePolicyRules.YearMin} and {LeavePolicyRules.YearMax}.");
        RuleFor(x => x.TargetYear)
            .InclusiveBetween(LeavePolicyRules.YearMin, LeavePolicyRules.YearMax)
            .WithMessage($"Year must be between {LeavePolicyRules.YearMin} and {LeavePolicyRules.YearMax}.")
            .NotEqual(x => x.SourceYear).WithMessage("Pick a different year to copy to.");
        RuleFor(x => x.EmploymentType)
            .MaximumLength(LeavePolicyRules.EmploymentTypeMax);
    }
}
