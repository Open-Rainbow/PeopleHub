using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class FamilyDetailsRequestValidator : AbstractValidator<FamilyDetailsRequest>
{
    public FamilyDetailsRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleForEach(x => x.FamilyMembers).SetValidator(new FamilyMemberItemValidator());
        RuleForEach(x => x.Dependents).SetValidator(new DependentItemValidator());
    }
}

internal sealed class FamilyMemberItemValidator : AbstractValidator<FamilyMemberItem>
{
    public FamilyMemberItemValidator()
    {
        RuleFor(x => x.MemberName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.MemberRelationship).NotEmpty().MaximumLength(50);
        RuleFor(x => x.MemberGender).MaximumLength(50);
        RuleFor(x => x.MemberMaritalStatus).MaximumLength(50);
        RuleFor(x => x.MemberOccupation).MaximumLength(100);
        RuleFor(x => x.MemberContactNumber).MaximumLength(20).ValidMobile();
        RuleFor(x => x.MemberNotes).MaximumLength(500);
        RuleFor(x => x.MemberEmail).MaximumLength(100).ValidEmail();
    }
}

internal sealed class DependentItemValidator : AbstractValidator<DependentItem>
{
    public DependentItemValidator()
    {
        RuleFor(x => x.DependentName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.DependentRelationship).NotEmpty().MaximumLength(50);
        RuleFor(x => x.DependentDateOfBirth).NotNull();
        RuleFor(x => x.DependentGender).MaximumLength(50);
        RuleFor(x => x.DependentRemarks).MaximumLength(500);
        RuleFor(x => x.LinkedFamilyRecord).MaximumLength(500);
        RuleFor(x => x.MonthlyIncomeOrPension).Must(v => v is null or >= 0).WithMessage("'{PropertyName}' cannot be negative.");
        RuleFor(x => x.ProofDocumentLink).MaximumLength(500);
        RuleFor(x => x.DependencyEndDate)
            .Must((x, v) => v >= x.DependencyStartDate)
            .When(x => x.DependencyStartDate.HasValue && x.DependencyEndDate.HasValue)
            .WithMessage("Dependency end date must be on or after dependency start date.");
    }
}
