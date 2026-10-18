using FluentValidation;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

internal sealed class SalaryStructureRequestValidator : AbstractValidator<SalaryStructureRequest>
{
    public SalaryStructureRequestValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty().MaximumLength(50);
        RuleFor(x => x.SalaryStructures).NotEmpty().WithMessage("Add bank and payroll details.");
        RuleForEach(x => x.SalaryStructures).SetValidator(new SalaryStructureItemValidator());
    }
}

internal sealed class SalaryStructureItemValidator : AbstractValidator<SalaryStructureItem>
{
    public SalaryStructureItemValidator()
    {
        RuleFor(x => x.PayrollGroup).MaximumLength(50);
        RuleFor(x => x.SalaryStructurePlan).MaximumLength(50);
        RuleFor(x => x.PayGrade).MaximumLength(50);
        RuleFor(x => x.BankName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.AccountHolderName).MaximumLength(100);
        RuleFor(x => x.BankAccountNumber).NotEmpty().MaximumLength(18).ValidBankAccount();
        RuleFor(x => x.BranchName).MaximumLength(100);
        RuleFor(x => x.IfscCode).NotEmpty().MaximumLength(11).ValidIfsc();
        RuleFor(x => x.MicrNumber).MaximumLength(9).ValidMicr();
        RuleFor(x => x.AccountType).MaximumLength(50);
        RuleFor(x => x.SalaryPaymentMode).MaximumLength(50);
        RuleFor(x => x.TaxRegime).MaximumLength(50);
        RuleFor(x => x.BankProofLink).MaximumLength(255);
        RuleFor(x => x.BankAddress).MaximumLength(300);
    }
}
