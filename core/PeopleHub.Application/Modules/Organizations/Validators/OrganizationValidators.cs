using FluentValidation;
using PeopleHub.Application.Modules.Organizations.Contracts;

namespace PeopleHub.Application.Modules.Organizations.Validators;

/// <summary>Shape checks. Duplicate code / name are checked by sp_orgs_save.</summary>
public sealed class SaveOrganizationRequestValidator : AbstractValidator<SaveOrganizationRequest>
{
    public SaveOrganizationRequestValidator()
    {
        RuleFor(x => x.Code).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the organization a short code, e.g. OR.")
            .Must(OrganizationRules.IsCode).WithMessage("Code must start with a letter and use 2-20 letters, digits or dashes.");

        RuleFor(x => x.Name).Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Give the organization a name.")
            .Must(v => v!.Trim().Length >= OrganizationRules.NameMin).WithMessage($"Name must be at least {OrganizationRules.NameMin} characters.")
            .Must(v => v!.Trim().Length <= OrganizationRules.NameMax).WithMessage($"Name must be {OrganizationRules.NameMax} characters or fewer.");

        RuleFor(x => x.LegalName).MaximumLength(200).WithMessage("Legal name must be 200 characters or fewer.");
        RuleFor(x => x.Industry).MaximumLength(100).WithMessage("Industry must be 100 characters or fewer.");

        RuleFor(x => x.Email).Cascade(CascadeMode.Stop)
            .MaximumLength(150).WithMessage("Email must be 150 characters or fewer.")
            .EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email)).WithMessage("Enter a valid email address.");
        RuleFor(x => x.Phone).Must(OrganizationRules.IsPhone).WithMessage("Enter a valid phone number (6-20 digits).");
        RuleFor(x => x.Website).Cascade(CascadeMode.Stop)
            .MaximumLength(200).WithMessage("Website must be 200 characters or fewer.")
            .Must(OrganizationRules.IsWebsite).WithMessage("Website must start with http:// or https://.");

        RuleFor(x => x.AddressLine).MaximumLength(300).WithMessage("Address must be 300 characters or fewer.");
        RuleFor(x => x.City).MaximumLength(100).WithMessage("City must be 100 characters or fewer.");
        RuleFor(x => x.StateProvince).MaximumLength(100).WithMessage("State must be 100 characters or fewer.");
        RuleFor(x => x.Country).MaximumLength(50).WithMessage("Country must be 50 characters or fewer.");
        RuleFor(x => x.Pincode).Must(OrganizationRules.IsPincode).WithMessage("Enter a valid PIN / postal code.");

        RuleFor(x => x.TimeZone).MaximumLength(50).WithMessage("Time zone must be 50 characters or fewer.");
        RuleFor(x => x.Currency).Must(OrganizationRules.IsCurrency).WithMessage("Currency must be a 3-letter code, e.g. INR.");
        RuleFor(x => x.FinancialYearStartMonth).InclusiveBetween(1, 12).When(x => x.FinancialYearStartMonth is not null)
            .WithMessage("Pick the month the financial year starts.");

        RuleFor(x => x.TaxId).Must(OrganizationRules.IsTaxId).WithMessage("Tax ID can use letters, digits, / and - (3-30 characters).");
        RuleFor(x => x.RegistrationNumber).MaximumLength(50).WithMessage("Registration number must be 50 characters or fewer.");
    }
}
