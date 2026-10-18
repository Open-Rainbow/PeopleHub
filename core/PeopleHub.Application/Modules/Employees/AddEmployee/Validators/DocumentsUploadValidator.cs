using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class DocumentsUploadRequestValidator : AbstractValidator<DocumentsUploadRequest>
{
    public DocumentsUploadRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.EmployeePhoto).NotEmpty().ValidFile();
        RuleFor(x => x.EmployeePanNumber).NotEmpty().MaximumLength(50).ValidPan();
        RuleFor(x => x.EmployeePan).NotEmpty().ValidFile();
        RuleFor(x => x.EmployeeAadhaarNumber).NotEmpty().MaximumLength(50).ValidAadhaar();
        RuleFor(x => x.EmployeeAadhaar).NotEmpty().ValidFile();
        RuleFor(x => x.EmployeePassportNumber).NotEmpty().MaximumLength(50);
        RuleFor(x => x.EmployeePassport).NotEmpty().ValidFile();
        RuleFor(x => x.Last6MonthsBankStatements).NotEmpty().ValidFile();
        RuleFor(x => x.Last3MonthsPayslips).NotEmpty().ValidFile();
        RuleFor(x => x.ExperienceLetter).NotEmpty().ValidFile();
        RuleFor(x => x.RelievingLetter).NotEmpty().ValidFile();
        RuleFor(x => x.OfferLetter).NotEmpty().ValidFile();
    }
}
