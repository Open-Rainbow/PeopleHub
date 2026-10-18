using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class ContactInfoRequestValidator : AbstractValidator<ContactInfoRequest>
{
    public ContactInfoRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.PersonalMail).NotEmpty().MaximumLength(100).ValidEmail();
        RuleFor(x => x.AlternateMail).MaximumLength(100).ValidEmail();
        RuleFor(x => x.MobileNumber).NotEmpty().MaximumLength(15).ValidMobile();
        RuleFor(x => x.AlternateMobile).MaximumLength(15).ValidMobile();
        RuleFor(x => x.LandlineNumber).MaximumLength(20).ValidLandline();
        RuleFor(x => x.OfficialEmail).MaximumLength(100).ValidEmail();
        RuleFor(x => x.LinkedinUrl).MaximumLength(200).ValidUrl();
        RuleFor(x => x.Addresses).NotEmpty().WithMessage("Add at least one address.");
        RuleForEach(x => x.Addresses).SetValidator(new AddressItemValidator());
        RuleFor(x => x.EmergencyContacts).NotEmpty().WithMessage("Add at least one emergency contact.");
        RuleFor(x => x.EmergencyContacts)
            .Must(list => list.Count(c => c.PrimaryEmergencyContact) <= 1)
            .WithMessage("Only one emergency contact can be primary.");
        RuleForEach(x => x.EmergencyContacts).SetValidator(new EmergencyContactItemValidator());
    }
}

internal sealed class AddressItemValidator : AbstractValidator<AddressItem>
{
    public AddressItemValidator()
    {
        RuleFor(x => x.AddressType).NotEmpty().MaximumLength(50);
        RuleFor(x => x.HouseNumber).MaximumLength(50);
        RuleFor(x => x.StreetName).MaximumLength(100);
        RuleFor(x => x.Landmark).MaximumLength(100);
        RuleFor(x => x.Colony).MaximumLength(100);
        RuleFor(x => x.Area).MaximumLength(100);
        RuleFor(x => x.AddressProofLink).MaximumLength(250);
        RuleFor(x => x.City).NotEmpty().MaximumLength(100);
        RuleFor(x => x.District).MaximumLength(100);
        RuleFor(x => x.StateProvince).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Country).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Pincode).NotEmpty().MaximumLength(10).ValidPincode();
        RuleFor(x => x.EffectiveTo)
            .Must((x, v) => v >= x.EffectiveFrom)
            .When(x => x.EffectiveFrom.HasValue && x.EffectiveTo.HasValue)
            .WithMessage("Effective to must be on or after effective from.");
    }
}

internal sealed class EmergencyContactItemValidator : AbstractValidator<EmergencyContactItem>
{
    public EmergencyContactItemValidator()
    {
        RuleFor(x => x.ContactName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.ContactNumber).NotEmpty().MaximumLength(15).ValidMobile();
        RuleFor(x => x.Relation).NotEmpty().MaximumLength(50);
        RuleFor(x => x.EmergencyAlternateNumber).MaximumLength(15).ValidMobile();
        RuleFor(x => x.EmergencyEmail).MaximumLength(100).ValidEmail();
        RuleFor(x => x.Remarks).MaximumLength(500);
        RuleFor(x => x.EmergencyAddress).MaximumLength(300);
    }
}
