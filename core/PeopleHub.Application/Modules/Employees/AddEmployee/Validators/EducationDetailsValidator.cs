using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class EducationDetailsRequestValidator : AbstractValidator<EducationDetailsRequest>
{
    public EducationDetailsRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Educations).NotEmpty().WithMessage("Add at least one education record.");
        RuleForEach(x => x.Educations).SetValidator(new EducationItemValidator());
        RuleForEach(x => x.Certifications).SetValidator(new CertificationItemValidator());
    }
}

internal sealed class EducationItemValidator : AbstractValidator<EducationItem>
{
    public EducationItemValidator()
    {
        RuleFor(x => x.QualificationLevel).NotEmpty().MaximumLength(50);
        RuleFor(x => x.DegreeOrCourseName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.SpecializationOrMajor).MaximumLength(100);
        RuleFor(x => x.InstitutionOrCollegeName).NotEmpty().MaximumLength(150);
        RuleFor(x => x.UniversityOrBoardName).MaximumLength(150);
        RuleFor(x => x.ModeOfStudy).MaximumLength(50);
        RuleFor(x => x.StartDate).NotNull();
        RuleFor(x => x.YearOfPassing).NotNull()
            .Must(v => v is null || (v >= 1950 && v <= DateTime.Today.Year + 1))
            .WithMessage("Enter a valid year of passing.");
        RuleFor(x => x.GradePercentageOrCgpa).MaximumLength(10);
        RuleFor(x => x.HighestQualificationFlag).MaximumLength(5);
        RuleFor(x => x.EducationDocumentLink).MaximumLength(255);
        RuleFor(x => x.EndDate)
            .Must((x, v) => v >= x.StartDate)
            .When(x => x.StartDate.HasValue && x.EndDate.HasValue)
            .WithMessage("End date must be on or after start date.");
    }
}

internal sealed class CertificationItemValidator : AbstractValidator<CertificationItem>
{
    public CertificationItemValidator()
    {
        RuleFor(x => x.CertificationName).MaximumLength(100);
        RuleFor(x => x.IssuingOrganization).MaximumLength(100);
        RuleFor(x => x.CredentialId).MaximumLength(100);
        RuleFor(x => x.CertificationScoreOrGrade).MaximumLength(20);
        RuleFor(x => x.VerificationUrl).MaximumLength(255).ValidUrl();
        RuleFor(x => x.AttachmentLink).MaximumLength(255);
        RuleFor(x => x.ActiveExpiredStatus).MaximumLength(20);
        RuleFor(x => x.ValidTo)
            .Must((x, v) => v >= x.ValidFrom)
            .When(x => x.ValidFrom.HasValue && x.ValidTo.HasValue)
            .WithMessage("Valid to must be on or after valid from.");
    }
}
