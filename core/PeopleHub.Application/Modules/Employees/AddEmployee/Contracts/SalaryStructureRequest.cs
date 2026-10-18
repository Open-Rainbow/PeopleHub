namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Compensation, Payroll and Bank step.</summary>
public sealed record SalaryStructureRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<SalaryStructureItem> SalaryStructures { get; init; } = [];
}

/// <summary>Compensation, Payroll and Bank: one row of SalaryStructures.</summary>
/// <remarks>reEnterAccountNumber is a UI-only confirm field and is not sent.</remarks>
public sealed record SalaryStructureItem
{
    public int? Id { get; init; }  // empty = new row
    public string? PayrollGroup { get; init; }  // max 50
    public string? SalaryStructurePlan { get; init; }  // max 50
    public string? PayGrade { get; init; }  // max 50
    public string? BankName { get; init; }  // required, max 100
    public string? AccountHolderName { get; init; }  // max 100
    public string? BankAccountNumber { get; init; }  // required, max 18
    public string? BranchName { get; init; }  // max 100
    public string? IfscCode { get; init; }  // required, max 11
    public string? MicrNumber { get; init; }  // max 9
    public string? AccountType { get; init; }  // max 50
    public string? SalaryPaymentMode { get; init; }  // max 50
    public string? TaxRegime { get; init; }  // max 50
    public DateTime? PayrollEffectiveFrom { get; init; }
    public string? BankProofLink { get; init; }  // max 255
    public string? BankAddress { get; init; }  // max 300
}
