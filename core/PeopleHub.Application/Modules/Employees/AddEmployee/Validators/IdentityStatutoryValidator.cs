using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class IdentityStatutoryRequestValidator : AbstractValidator<IdentityStatutoryRequest>
{
    public IdentityStatutoryRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.PanNumber).MaximumLength(10).ValidPan();
        RuleFor(x => x.AadhaarNumber).MaximumLength(12).ValidAadhaar();
        RuleFor(x => x.UanNumber).MaximumLength(12).ValidUan();
        RuleFor(x => x.PfAccountNumber).MaximumLength(22);
        RuleFor(x => x.EsiNumber).MaximumLength(17);
        RuleForEach(x => x.IdentityDocuments).SetValidator(new IdentityDocumentItemValidator());
        RuleForEach(x => x.DocumentRepository).SetValidator(new RepositoryDocumentItemValidator());
    }
}

internal sealed class IdentityDocumentItemValidator : AbstractValidator<IdentityDocumentItem>
{
    public IdentityDocumentItemValidator()
    {
        RuleFor(x => x.DocumentType).NotEmpty().MaximumLength(50);
        RuleFor(x => x.DocumentNumber).NotEmpty().MaximumLength(50);
        RuleFor(x => x.NameOnDocument).MaximumLength(100);
        RuleFor(x => x.IssuingAuthority).MaximumLength(100);
        RuleFor(x => x.CountryOfIssue).MaximumLength(50);
        RuleFor(x => x.PlaceOfIssue).MaximumLength(100);
        RuleFor(x => x.VerificationStatus).MaximumLength(50);
        RuleFor(x => x.VerifiedBy).MaximumLength(50);
        RuleFor(x => x.FrontAttachLink).MaximumLength(50);
        RuleFor(x => x.BackAttachLink).MaximumLength(50);
        RuleFor(x => x.IdentificationDocumentRemarks).MaximumLength(500);
        RuleFor(x => x.IssueDate)
            .Must(v => v <= DateTime.Today)
            .When(x => x.IssueDate.HasValue)
            .WithMessage("Issue date cannot be in the future.");
        RuleFor(x => x.ValidTo)
            .Must((x, v) => v >= x.ValidFrom)
            .When(x => x.ValidFrom.HasValue && x.ValidTo.HasValue)
            .WithMessage("Valid to must be on or after valid from.");
    }
}

internal sealed class RepositoryDocumentItemValidator : AbstractValidator<RepositoryDocumentItem>
{
    public RepositoryDocumentItemValidator()
    {
        RuleFor(x => x.GenericDocumentCategory).MaximumLength(50);
        RuleFor(x => x.GenericDocumentName).MaximumLength(100);
        RuleFor(x => x.GenericRelatedSection).MaximumLength(50);
        RuleFor(x => x.GenericRelatedRecordId).MaximumLength(50);
        RuleFor(x => x.GenericFileUpload).MaximumLength(50);
        RuleFor(x => x.GenericVerificationStatus).MaximumLength(50);
        RuleFor(x => x.GenericVerifiedBy).MaximumLength(50);
        RuleFor(x => x.GenericRemarks).MaximumLength(500);
        RuleFor(x => x.GenericValidTo)
            .Must((x, v) => v >= x.GenericValidFrom)
            .When(x => x.GenericValidFrom.HasValue && x.GenericValidTo.HasValue)
            .WithMessage("Valid to must be on or after valid from.");
    }
}
