using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class InsuranceDetailsRequestValidator : AbstractValidator<InsuranceDetailsRequest>
{
    public InsuranceDetailsRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Policy).NotNull().SetValidator(new InsurancePolicyItemValidator());
        RuleFor(x => x.Nominee).NotNull().SetValidator(new NomineeItemValidator());
    }
}

internal sealed class InsurancePolicyItemValidator : AbstractValidator<InsurancePolicyItem>
{
    public InsurancePolicyItemValidator()
    {
        RuleFor(x => x.BenefitType).NotEmpty().MaximumLength(50);
        RuleFor(x => x.ProviderName).MaximumLength(100);
        RuleFor(x => x.PolicyNumber).MaximumLength(50);
        RuleFor(x => x.PremiumSharingType).MaximumLength(50);
        RuleFor(x => x.CoverageAmount).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.PolicyStatus).MaximumLength(50);
        RuleFor(x => x.InsuranceRemarks).MaximumLength(500);
        RuleFor(x => x.CoveredMemberName).MaximumLength(100);
        RuleFor(x => x.CoveredMemberRelationship).MaximumLength(50);
        RuleFor(x => x.SumInsuredAllocation).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.SumInsuredAllocation)
            .Must((x, v) => v <= x.CoverageAmount)
            .When(x => x.SumInsuredAllocation.HasValue && x.CoverageAmount.HasValue)
            .WithMessage("Sum insured allocation cannot exceed the coverage amount.");
        RuleFor(x => x.LinkedFamilyOrDependentRecord).MaximumLength(50);
        RuleFor(x => x.InsuranceCardProofLink).MaximumLength(50);
        RuleFor(x => x.CoverageEndDate)
            .Must((x, v) => v >= x.CoverageStartDate)
            .When(x => x.CoverageStartDate.HasValue && x.CoverageEndDate.HasValue)
            .WithMessage("Coverage end date must be on or after coverage start date.");
        RuleFor(x => x.MemberCoverageTo)
            .Must((x, v) => v >= x.MemberCoverageFrom)
            .When(x => x.MemberCoverageFrom.HasValue && x.MemberCoverageTo.HasValue)
            .WithMessage("Member coverage to must be on or after member coverage from.");
    }
}

internal sealed class NomineeItemValidator : AbstractValidator<NomineeItem>
{
    public NomineeItemValidator()
    {
        RuleFor(x => x.NomineeBenefitType).NotEmpty().MaximumLength(50);
        RuleFor(x => x.NomineeName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.NomineeRelationship).NotEmpty().MaximumLength(50);
        RuleFor(x => x.NomineeContactNumber).MaximumLength(20).ValidMobile();
        RuleFor(x => x.SharePercentage).NotNull()
            .Must(v => v is null or (>= 0 and <= 100))
            .WithMessage("Share percentage must be between 0 and 100.");
        RuleFor(x => x.NomineePriority).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.GuardianName).MaximumLength(100);
        RuleFor(x => x.GuardianName).NotEmpty().When(x => x.MinorFlag).WithMessage("Guardian name is required for a minor nominee.");
        RuleFor(x => x.NomineeBankName).MaximumLength(100);
        RuleFor(x => x.NomineeAccountNumber).MaximumLength(18).ValidBankAccount();
        RuleFor(x => x.NomineeIfscCode).MaximumLength(11).ValidIfsc();
        RuleFor(x => x.NomineeAadhaarNumber).MaximumLength(12).ValidAadhaar();
        RuleFor(x => x.NomineePanNumber).MaximumLength(10).ValidPan();
        RuleFor(x => x.LinkedFamilyOrDependentRecord).MaximumLength(50);
        RuleFor(x => x.ProofDocumentLink).MaximumLength(255);
        RuleFor(x => x.Address).MaximumLength(300);
        RuleFor(x => x.NomineeEffectiveTo)
            .Must((x, v) => v >= x.NomineeEffectiveFrom)
            .When(x => x.NomineeEffectiveFrom.HasValue && x.NomineeEffectiveTo.HasValue)
            .WithMessage("Effective to must be on or after effective from.");
    }
}
