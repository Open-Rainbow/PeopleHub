using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

namespace PeopleHub.Application.Tests.Employees;

public sealed class AddEmployeeValidatorTests
{
    [Fact]
    public void Contact_rejects_bad_email_and_missing_address()
    {
        var request = new ContactInfoRequest
        {
            EmployeeId = "EMP001",
            PersonalMail = "not-an-email",
            MobileNumber = "9876543210",
            EmergencyContacts = [new EmergencyContactItem { ContactName = "Ravi", ContactNumber = "9876543210", Relation = "Brother" }],
        };

        var result = new ContactInfoRequestValidator().Validate(request);

        Assert.Contains(result.Errors, e => e.PropertyName == nameof(ContactInfoRequest.PersonalMail));
        Assert.Contains(result.Errors, e => e.PropertyName == nameof(ContactInfoRequest.Addresses));
    }

    [Fact]
    public void Contact_list_errors_point_at_the_row()
    {
        var request = new ContactInfoRequest
        {
            EmployeeId = "EMP001",
            PersonalMail = "venkat@example.com",
            MobileNumber = "9876543210",
            Addresses = [new AddressItem { AddressType = "Current", City = "Hyderabad", StateProvince = "Telangana", Country = "India" }],
            EmergencyContacts = [new EmergencyContactItem { ContactName = "Ravi", ContactNumber = "9876543210", Relation = "Brother" }],
        };

        var result = new ContactInfoRequestValidator().Validate(request);

        Assert.Contains(result.Errors, e => e.PropertyName == "Addresses[0].Pincode");
    }

    [Fact]
    public void Salary_rejects_bad_ifsc()
    {
        var request = new SalaryStructureRequest
        {
            EmployeeId = "EMP001",
            SalaryStructures = [new SalaryStructureItem { BankName = "HDFC", BankAccountNumber = "123456789012", IfscCode = "HDFC123" }],
        };

        var result = new SalaryStructureRequestValidator().Validate(request);

        Assert.Contains(result.Errors, e => e.PropertyName == "SalaryStructures[0].IfscCode");
    }

    [Fact]
    public void Minor_nominee_needs_guardian()
    {
        var nominee = new NomineeItem
        {
            NomineeBenefitType = "Health",
            NomineeName = "Asha",
            NomineeRelationship = "Daughter",
            SharePercentage = 100,
            MinorFlag = true,
        };

        var result = new NomineeItemValidator().Validate(nominee);

        Assert.Contains(result.Errors, e => e.PropertyName == nameof(NomineeItem.GuardianName));
    }

    [Fact]
    public void Separation_rejects_last_day_before_initiation()
    {
        var request = new SeparationRequest
        {
            EmployeeId = "EMP001",
            SeparationType = "Resignation",
            SeparationStatus = "Initiated",
            ExitReason = "Relocation",
            InitiationDate = new DateTime(2026, 10, 1),
            FinalLastWorkingDay = new DateTime(2026, 9, 1),
        };

        var result = new SeparationRequestValidator().Validate(request);

        Assert.Contains(result.Errors, e => e.PropertyName == nameof(SeparationRequest.FinalLastWorkingDay));
    }

    [Fact]
    public void Temp_login_requires_strong_password()
    {
        var request = new TempLoginRequest { EmployeeId = "EMP001", TemporaryUsername = "venkat", TemporaryPassword = "password" };

        var result = new TempLoginRequestValidator().Validate(request);

        Assert.Contains(result.Errors, e => e.PropertyName == nameof(TempLoginRequest.TemporaryPassword));
    }
}
