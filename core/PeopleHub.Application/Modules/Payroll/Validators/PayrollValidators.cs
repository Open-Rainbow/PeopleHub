using FluentValidation;
using PeopleHub.Application.Modules.Payroll.Contracts;

namespace PeopleHub.Application.Modules.Payroll.Validators;

/// <summary>Shape checks only. State rules (locked runs, duplicates, date windows) live in the stored procedures.</summary>
public sealed class PayrollSettingsValidator : AbstractValidator<PayrollSettingsDto>
{
    public PayrollSettingsValidator()
    {
        RuleFor(x => x.PfRate).InclusiveBetween(0, 20).WithMessage("PF rate must be between 0 and 20%.");
        RuleFor(x => x.PfWageCeiling).InclusiveBetween(0, 1_000_000).WithMessage("PF wage ceiling looks wrong.");
        RuleFor(x => x.EsiEmployeeRate).InclusiveBetween(0, 10).WithMessage("ESI employee rate must be between 0 and 10%.");
        RuleFor(x => x.EsiEmployerRate).InclusiveBetween(0, 10).WithMessage("ESI employer rate must be between 0 and 10%.");
        RuleFor(x => x.EsiWageLimit).InclusiveBetween(0, 1_000_000).WithMessage("ESI wage limit looks wrong.");
        RuleFor(x => x.PtState).NotEmpty().When(x => x.PtEnabled).WithMessage("Pick the state for professional tax.")
            .MaximumLength(50);
        RuleFor(x => x.DefaultRegime).Must(v => PayrollRules.Canonical(PayrollRules.Regimes, v) is not null)
            .WithMessage("Default regime must be New or Old.");
        RuleFor(x => x.PayDay).InclusiveBetween(1, 28).WithMessage("Pay day must be between 1 and 28.");
    }
}

public sealed class SaveComponentsRequestValidator : AbstractValidator<SaveComponentsRequest>
{
    public SaveComponentsRequestValidator()
    {
        RuleFor(x => x.Components).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Add at least one component.")
            .Must(c => c!.Count <= 20).WithMessage("Use 20 components or fewer.")
            .Must(c => c!.Any(x => string.Equals(x.Code?.Trim(), "BASIC", StringComparison.OrdinalIgnoreCase)))
            .WithMessage("A BASIC component is required.")
            .Must(c => c!.Count(x => x.CalcType == "Balance") == 1)
            .WithMessage("Exactly one component must take the balance.")
            .Must(c => c!.Select(x => x.Code?.Trim().ToUpperInvariant()).Distinct().Count() == c!.Count)
            .WithMessage("Component codes must be unique.")
            .Must(c => c!.Where(x => x.CalcType == "PctCtc").Sum(x => x.Value) <= 100)
            .WithMessage("Percent-of-CTC components add up to more than 100%.");

        RuleForEach(x => x.Components).ChildRules(c =>
        {
            c.RuleFor(x => x.Code).Cascade(CascadeMode.Stop)
                .NotEmpty().WithMessage("Every component needs a code.")
                .Matches("^[A-Za-z][A-Za-z0-9_]{1,19}$").WithMessage("Codes are 2-20 letters, digits or _ and start with a letter.");
            c.RuleFor(x => x.Name).NotEmpty().WithMessage("Every component needs a name.").MaximumLength(60);
            c.RuleFor(x => x.CalcType).Must(v => PayrollRules.CalcTypes.Contains(v))
                .WithMessage("Calculation must be PctCtc, PctBasic, Fixed or Balance.");
            c.RuleFor(x => x.Value).GreaterThanOrEqualTo(0).WithMessage("Values cannot be negative.");
            c.RuleFor(x => x.Value).LessThanOrEqualTo(100).When(x => x.CalcType is "PctCtc" or "PctBasic")
                .WithMessage("Percentages must be 100 or less.");
            c.RuleFor(x => x.CalcType).NotEqual("PctBasic")
                .When(x => string.Equals(x.Code?.Trim(), "BASIC", StringComparison.OrdinalIgnoreCase))
                .WithMessage("Basic cannot be a percentage of itself.");
        });
    }
}

public sealed class PreviewStructureRequestValidator : AbstractValidator<PreviewStructureRequest>
{
    public PreviewStructureRequestValidator()
    {
        RuleFor(x => x.AnnualCtc).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Enter the annual CTC.")
            .GreaterThan(0).WithMessage("CTC must be more than zero.")
            .LessThanOrEqualTo(PayrollRules.MaxCtc).WithMessage("CTC looks too high.");
    }
}

public sealed class SaveRevisionRequestValidator : AbstractValidator<SaveRevisionRequest>
{
    public SaveRevisionRequestValidator()
    {
        RuleFor(x => x.AnnualCtc).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Enter the annual CTC.")
            .GreaterThan(0).WithMessage("CTC must be more than zero.")
            .LessThanOrEqualTo(PayrollRules.MaxCtc).WithMessage("CTC looks too high.");
        RuleFor(x => x.EffectiveFrom).NotNull().WithMessage("Pick the date the new salary starts.");
        RuleFor(x => x.Reason).MaximumLength(PayrollRules.ReasonMax)
            .WithMessage($"Reason must be {PayrollRules.ReasonMax} characters or fewer.");
    }
}

public sealed class CreateRunRequestValidator : AbstractValidator<CreateRunRequest>
{
    public CreateRunRequestValidator()
    {
        RuleFor(x => x.Year).NotNull().WithMessage("Pick the year.").InclusiveBetween(2000, 2100).WithMessage("Pick a valid year.");
        RuleFor(x => x.Month).NotNull().WithMessage("Pick the month.").InclusiveBetween(1, 12).WithMessage("Pick a valid month.");
        RuleFor(x => x.Note).MaximumLength(PayrollRules.NoteMax);
    }
}

public sealed class AddAdjustmentRequestValidator : AbstractValidator<AddAdjustmentRequest>
{
    public AddAdjustmentRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().WithMessage("Pick the employee.");
        RuleFor(x => x.Kind).Must(v => PayrollRules.Canonical(PayrollRules.AdjustmentKinds, v) is not null)
            .WithMessage("Type must be Earning or Deduction.");
        RuleFor(x => x.Label).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Describe the adjustment (e.g. Festival bonus).")
            .MaximumLength(PayrollRules.LabelMax).WithMessage($"Keep the description under {PayrollRules.LabelMax} characters.");
        RuleFor(x => x.Amount).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Enter the amount.")
            .GreaterThan(0).WithMessage("Amount must be more than zero.")
            .LessThanOrEqualTo(PayrollRules.MaxAdjustment).WithMessage("Amount looks too high.");
    }
}

public sealed class SetLopRequestValidator : AbstractValidator<SetLopRequest>
{
    public SetLopRequestValidator()
    {
        RuleFor(x => x.LopDays).InclusiveBetween(0, 31).When(x => x.LopDays is not null)
            .WithMessage("Loss-of-pay days must be between 0 and 31.")
            .Must(v => v is null || v * 2 == Math.Floor(v.Value * 2)).WithMessage("Use whole or half days.");
        RuleFor(x => x.Reason).MaximumLength(PayrollRules.ReasonMax);
    }
}

public sealed class SaveDeclarationRequestValidator : AbstractValidator<SaveDeclarationRequest>
{
    public SaveDeclarationRequestValidator()
    {
        RuleFor(x => x.FinancialYear).NotNull().WithMessage("Pick the financial year.");
        RuleFor(x => x.Regime).Must(v => PayrollRules.Canonical(PayrollRules.Regimes, v) is not null)
            .WithMessage("Regime must be New or Old.");
        RuleFor(x => x.Items).Must(i => i is null || i.Count <= 30).WithMessage("Use 30 lines or fewer.");
        RuleForEach(x => x.Items).ChildRules(i =>
        {
            i.RuleFor(x => x.Section).Must(v => v is not null && PayrollRules.Sections.ContainsKey(v.Trim().ToUpperInvariant()))
                .WithMessage("Unknown section.");
            i.RuleFor(x => x.Description).NotEmpty().WithMessage("Describe each investment.").MaximumLength(100);
            i.RuleFor(x => x.Amount).NotNull().WithMessage("Enter the amount.")
                .InclusiveBetween(0, 10_000_000).WithMessage("Amount looks wrong.");
        });
    }
}

public sealed class DeclarationDecisionRequestValidator : AbstractValidator<DeclarationDecisionRequest>
{
    public DeclarationDecisionRequestValidator()
    {
        RuleFor(x => x.Approve).NotNull().WithMessage("Choose approve or reject.");
        RuleFor(x => x.Note).Cascade(CascadeMode.Stop)
            .NotEmpty().When(x => x.Approve == false).WithMessage("Add a note when rejecting a declaration.")
            .MaximumLength(PayrollRules.NoteMax);
        RuleForEach(x => x.Items).ChildRules(i =>
            i.RuleFor(x => x.ApprovedAmount).GreaterThanOrEqualTo(0).When(x => x.ApprovedAmount is not null)
                .WithMessage("Approved amounts cannot be negative."));
    }
}

public sealed class TaxCompareRequestValidator : AbstractValidator<TaxCompareRequest>
{
    public TaxCompareRequestValidator()
    {
        RuleForEach(x => x.Items).ChildRules(i =>
        {
            i.RuleFor(x => x.Section).Must(v => v is not null && PayrollRules.Sections.ContainsKey(v.Trim().ToUpperInvariant()))
                .WithMessage("Unknown section.");
            i.RuleFor(x => x.Amount).InclusiveBetween(0, 10_000_000).When(x => x.Amount is not null).WithMessage("Amount looks wrong.");
        });
    }
}

public sealed class ClaimRequestValidator : AbstractValidator<ClaimRequest>
{
    public ClaimRequestValidator()
    {
        RuleFor(x => x.Category).Must(v => PayrollRules.Canonical(PayrollRules.ClaimCategories, v) is not null)
            .WithMessage("Pick a category.");
        RuleFor(x => x.ClaimDate).NotNull().WithMessage("Pick the bill date.");
        RuleFor(x => x.Amount).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Enter the amount.")
            .GreaterThan(0).WithMessage("Amount must be more than zero.")
            .LessThanOrEqualTo(PayrollRules.MaxClaim).WithMessage($"Claims over ₹{PayrollRules.MaxClaim:N0} need finance approval outside PeopleHub.");
        RuleFor(x => x.Description).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Say what the expense was for.")
            .Must(v => v!.Trim().Length >= 5).WithMessage("Description must be at least 5 characters.")
            .MaximumLength(PayrollRules.DescriptionMax).WithMessage($"Description must be {PayrollRules.DescriptionMax} characters or fewer.");
        RuleFor(x => x.BillNumber).MaximumLength(PayrollRules.BillMax);
    }
}

public sealed class ReimbursementDecisionRequestValidator : AbstractValidator<ReimbursementDecisionRequest>
{
    public ReimbursementDecisionRequestValidator()
    {
        RuleFor(x => x.Approve).NotNull().WithMessage("Choose approve or reject.");
        RuleFor(x => x.Note).Cascade(CascadeMode.Stop)
            .NotEmpty().When(x => x.Approve == false).WithMessage("Add a note when rejecting a claim.")
            .MaximumLength(PayrollRules.NoteMax);
    }
}
