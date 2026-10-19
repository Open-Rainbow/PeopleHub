using System.Text.Json;
using System.Text.Json.Serialization;

namespace PeopleHub.Application.Modules.Payroll.Contracts;

// ---- Settings / components ---------------------------------------------------------------------

/// <summary>GET / PUT api/v1/payroll/settings. Rates are percentages (12 = 12%).</summary>
public sealed class PayrollSettingsDto
{
    public bool PfEnabled { get; set; } = true;
    public decimal PfRate { get; set; } = 12;
    public decimal PfWageCeiling { get; set; } = 15000;
    public bool PfCapAtCeiling { get; set; } = true;
    public bool EsiEnabled { get; set; } = true;
    public decimal EsiEmployeeRate { get; set; } = 0.75m;
    public decimal EsiEmployerRate { get; set; } = 3.25m;
    public decimal EsiWageLimit { get; set; } = 21000;
    public bool PtEnabled { get; set; } = true;
    public string PtState { get; set; } = "Telangana";
    public bool TdsEnabled { get; set; } = true;

    /// <summary>New | Old</summary>
    public string DefaultRegime { get; set; } = "New";

    /// <summary>Absent days in attendance count as loss of pay (unpaid leave always does).</summary>
    public bool LopFromAttendance { get; set; }

    /// <summary>Day of the following month salaries are paid (1-28).</summary>
    public int PayDay { get; set; } = 1;

    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
}

/// <summary>A salary component and how it is derived from CTC.</summary>
public sealed class PayComponentDto
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    /// <summary>PctCtc (% of monthly CTC) | PctBasic (% of basic) | Fixed (monthly amount) | Balance (whatever is left)</summary>
    public string CalcType { get; set; } = "Fixed";

    public decimal Value { get; set; }
    public bool IsTaxable { get; set; } = true;

    /// <summary>Reduced for loss-of-pay days.</summary>
    public bool IsProrated { get; set; } = true;

    public int SortOrder { get; set; }
}

/// <summary>PUT api/v1/payroll/components (display order = list order).</summary>
public sealed record SaveComponentsRequest
{
    public List<PayComponentDto>? Components { get; init; }
}

public sealed class PtSlabDto
{
    public string State { get; set; } = string.Empty;
    public decimal FromAmount { get; set; }
    public decimal? ToAmount { get; set; }
    public decimal Amount { get; set; }
}

// ---- Salary structures --------------------------------------------------------------------------

/// <summary>One line of a monthly salary breakdown.</summary>
public sealed record SalaryLineDto(string Code, string Name, string Kind, decimal Monthly, decimal Annual, bool IsTaxable);

/// <summary>CTC split into components. Kind: Earning | Employer (employer contribution, part of CTC) | Deduction (employee).</summary>
public sealed class SalaryBreakdownDto
{
    public decimal AnnualCtc { get; set; }
    public decimal MonthlyCtc { get; set; }
    public bool PfApplicable { get; set; }
    public bool EsiApplicable { get; set; }
    public List<SalaryLineDto> Lines { get; set; } = [];
    public decimal MonthlyGross { get; set; }
    public decimal MonthlyTaxable { get; set; }
    public decimal MonthlyDeductions { get; set; }

    /// <summary>Gross minus PF / ESI / PT, before income tax.</summary>
    public decimal MonthlyNetBeforeTax { get; set; }

    public List<string> Warnings { get; set; } = [];
}

/// <summary>Row of GET api/v1/payroll/structures.</summary>
public sealed class EmployeeSalaryRowDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string? WorkLocation { get; set; }
    public DateTime? DateOfJoining { get; set; }

    /// <summary>NULL = no salary structure yet.</summary>
    public decimal? AnnualCtc { get; set; }

    public DateTime? EffectiveFrom { get; set; }
    public bool PfApplicable { get; set; } = true;
    public string TaxRegime { get; set; } = "New";
    public int Revisions { get; set; }
    public DateTime? UpcomingFrom { get; set; }
    public decimal? MonthlyGross { get; set; }
}

public sealed class SalaryRevisionDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public decimal AnnualCtc { get; set; }
    public DateTime EffectiveFrom { get; set; }
    public bool PfApplicable { get; set; }
    public string? Reason { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
}

/// <summary>GET api/v1/payroll/structures/{employeeId} and GET api/v1/payroll/me/salary.</summary>
public sealed class EmployeeSalaryDto
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string TaxRegime { get; set; } = "New";
    public DateTime? EffectiveFrom { get; set; }
    public SalaryBreakdownDto? Current { get; set; }
    public List<SalaryRevisionDto> Revisions { get; set; } = [];
}

/// <summary>POST api/v1/payroll/structures/{employeeId}/revisions</summary>
public sealed record SaveRevisionRequest
{
    public decimal? AnnualCtc { get; init; }
    public DateTime? EffectiveFrom { get; init; }
    public bool? PfApplicable { get; init; } = true;
    public string? Reason { get; init; }
}

/// <summary>POST api/v1/payroll/structures/preview</summary>
public sealed record PreviewStructureRequest
{
    public decimal? AnnualCtc { get; init; }
    public bool? PfApplicable { get; init; } = true;
}

// ---- Runs ---------------------------------------------------------------------------------------

public sealed class PayrollRunDto
{
    public int Id { get; set; }
    public int Year { get; set; }
    public int Month { get; set; }

    /// <summary>Draft | Processed | Locked | Published</summary>
    public string Status { get; set; } = "Draft";

    public int Employees { get; set; }
    public decimal Gross { get; set; }
    public decimal Deductions { get; set; }
    public decimal Reimbursements { get; set; }
    public decimal NetPay { get; set; }
    public decimal EmployerCost { get; set; }
    public string? Note { get; set; }
    public DateTime PayDate { get; set; }
    public int Adjustments { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public string? ProcessedBy { get; set; }
    public DateTime? LockedAt { get; set; }
    public string? LockedBy { get; set; }
    public DateTime? PublishedAt { get; set; }
    public string? PublishedBy { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
}

/// <summary>POST api/v1/payroll/runs</summary>
public sealed record CreateRunRequest
{
    public int? Year { get; init; }
    public int? Month { get; init; }
    public string? Note { get; init; }
}

/// <summary>Process response: the run totals and every payslip.</summary>
public sealed record ProcessRunResult(PayrollRunDto Run, IReadOnlyList<PayslipDto> Payslips);

public sealed class RunAdjustmentDto
{
    public int Id { get; set; }
    public int RunId { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>Earning | Deduction</summary>
    public string Kind { get; set; } = "Earning";

    public string Label { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public bool IsTaxable { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
}

/// <summary>POST api/v1/payroll/runs/{id}/adjustments</summary>
public sealed record AddAdjustmentRequest
{
    public string? EmployeeId { get; init; }
    public string? Kind { get; init; } = "Earning";
    public string? Label { get; init; }
    public decimal? Amount { get; init; }
    public bool? IsTaxable { get; init; } = true;
}

/// <summary>PUT api/v1/payroll/runs/{id}/lop/{employeeId}. LopDays null = use the calculated value.</summary>
public sealed record SetLopRequest
{
    public decimal? LopDays { get; init; }
    public string? Reason { get; init; }
}

/// <summary>Everything the calculator needs for one employee in one run (sp_pay_get_run_inputs).</summary>
public sealed class RunInputRow
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string? WorkLocation { get; set; }
    public string? Pan { get; set; }
    public string? Uan { get; set; }
    public string? BankName { get; set; }
    public string? BankAccount { get; set; }
    public string? Ifsc { get; set; }
    public string TaxRegime { get; set; } = "New";
    public decimal AnnualCtc { get; set; }
    public bool PfApplicable { get; set; } = true;
    public int DaysInMonth { get; set; }
    public decimal PreJoinDays { get; set; }
    public decimal UnpaidLeaveDays { get; set; }
    public decimal AbsentDays { get; set; }
    public decimal? LopOverride { get; set; }
    public string? LopReason { get; set; }
    public string? AdjustmentsJson { get; set; }
    public string? ReimbursementsJson { get; set; }
    public string? DeclarationsJson { get; set; }
    public decimal YtdTaxable { get; set; }
    public decimal YtdTds { get; set; }
    public decimal YtdPf { get; set; }
    public decimal YtdPt { get; set; }
    public int YtdMonths { get; set; }

    public List<InputAdjustment> Adjustments() => PayrollJson.List<InputAdjustment>(AdjustmentsJson);
    public List<InputReimbursement> Reimbursements() => PayrollJson.List<InputReimbursement>(ReimbursementsJson);
    public List<DeclarationAmount> Declarations() => PayrollJson.List<DeclarationAmount>(DeclarationsJson);
}

public sealed record InputAdjustment(int Id, string Kind, string Label, decimal Amount, bool IsTaxable);
public sealed record InputReimbursement(int Id, string Category, decimal Amount);
public sealed record DeclarationAmount(string Section, decimal Amount);

// ---- Payslips -----------------------------------------------------------------------------------

/// <summary>Kind: Earning | Deduction | Reimbursement</summary>
public sealed record PayslipLineDto(string Code, string Name, string Kind, decimal Amount);

/// <summary>Calculator output for one employee; serialized (camelCase) into sp_pay_save_run_results.</summary>
public sealed class PayslipComputation
{
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string? Pan { get; set; }
    public string? Uan { get; set; }
    public string? BankName { get; set; }
    public string? BankAccount { get; set; }
    public string? Ifsc { get; set; }
    public string TaxRegime { get; set; } = "New";
    public int DaysInMonth { get; set; }
    public decimal PaidDays { get; set; }
    public decimal LopDays { get; set; }
    public decimal AnnualCtc { get; set; }
    public decimal Gross { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal Reimbursements { get; set; }
    public decimal NetPay { get; set; }
    public decimal EmployeePf { get; set; }
    public decimal EmployerPf { get; set; }
    public decimal EmployeeEsi { get; set; }
    public decimal EmployerEsi { get; set; }
    public decimal ProfessionalTax { get; set; }
    public decimal Tds { get; set; }
    public decimal TaxableGross { get; set; }
    public decimal ProjectedTaxable { get; set; }
    public decimal AnnualTax { get; set; }
    public List<PayslipLineDto> Lines { get; set; } = [];
    public List<int> ReimbursementIds { get; set; } = [];
    public string? Warnings { get; set; }
}

public sealed class PayslipDto
{
    public int Id { get; set; }
    public int RunId { get; set; }
    public int Year { get; set; }
    public int Month { get; set; }
    public string RunStatus { get; set; } = string.Empty;
    public DateTime PayDate { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string? Pan { get; set; }
    public string? Uan { get; set; }
    public string? BankName { get; set; }

    /// <summary>Masked (XXXXXX1234).</summary>
    public string? BankAccount { get; set; }

    public string? Ifsc { get; set; }
    public string TaxRegime { get; set; } = "New";
    public int DaysInMonth { get; set; }
    public decimal PaidDays { get; set; }
    public decimal LopDays { get; set; }
    public decimal AnnualCtc { get; set; }
    public decimal Gross { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal Reimbursements { get; set; }
    public decimal NetPay { get; set; }
    public decimal EmployeePf { get; set; }
    public decimal EmployerPf { get; set; }
    public decimal EmployeeEsi { get; set; }
    public decimal EmployerEsi { get; set; }
    public decimal ProfessionalTax { get; set; }
    public decimal Tds { get; set; }
    public decimal TaxableGross { get; set; }
    public decimal ProjectedTaxable { get; set; }
    public decimal AnnualTax { get; set; }
    public decimal? YtdGross { get; set; }
    public decimal? YtdDeductions { get; set; }
    public decimal? YtdNet { get; set; }
    public decimal? YtdTds { get; set; }
    public decimal? YtdPf { get; set; }
    public string? Warnings { get; set; }

    [JsonIgnore]
    public string? LinesJson { get; set; }

    public List<PayslipLineDto> Lines => PayrollJson.List<PayslipLineDto>(LinesJson);
}

// ---- Tax declarations ---------------------------------------------------------------------------

public sealed record DeclarationItemDto(int Id, string Section, string Description, decimal Amount, decimal? ApprovedAmount);

public sealed class TaxDeclarationDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public int FinancialYear { get; set; }
    public string Regime { get; set; } = "New";

    /// <summary>Draft | Submitted | Approved | Rejected</summary>
    public string Status { get; set; } = "Draft";

    public DateTime? SubmittedAt { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecidedBy { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public decimal? TotalDeclared { get; set; }

    [JsonIgnore]
    public string? ItemsJson { get; set; }

    public List<DeclarationItemDto> Items => PayrollJson.List<DeclarationItemDto>(ItemsJson);
}

public sealed record DeclarationItemInput
{
    public string? Section { get; init; }
    public string? Description { get; init; }
    public decimal? Amount { get; init; }
}

/// <summary>PUT api/v1/payroll/declarations</summary>
public sealed record SaveDeclarationRequest
{
    public string? EmployeeId { get; init; }
    public int? FinancialYear { get; init; }
    public string? Regime { get; init; } = "New";
    public List<DeclarationItemInput>? Items { get; init; }

    /// <summary>true = send to HR, false = save draft.</summary>
    public bool Submit { get; init; }
}

public sealed record ApprovedItemInput
{
    public int Id { get; init; }
    public decimal? ApprovedAmount { get; init; }
}

/// <summary>POST api/v1/payroll/declarations/{id}/decision</summary>
public sealed record DeclarationDecisionRequest
{
    public bool? Approve { get; init; }
    public string? Note { get; init; }
    public List<ApprovedItemInput>? Items { get; init; }
    public string? ApproverId { get; init; }
}

/// <summary>POST api/v1/payroll/tax/compare: what the employee pays under each regime for the year.</summary>
public sealed record TaxCompareRequest
{
    public string? EmployeeId { get; init; }
    public List<DeclarationItemInput>? Items { get; init; }
}

public sealed record RegimeTax(string Regime, decimal GrossIncome, decimal Deductions, decimal TaxableIncome, decimal Tax, decimal MonthlyTds);

public sealed record TaxCompareResult(decimal AnnualGross, RegimeTax New, RegimeTax Old, string Recommended, decimal Saving);

// ---- Reimbursements -----------------------------------------------------------------------------

public sealed class ReimbursementDto
{
    public int Id { get; set; }
    public string EmployeeId { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public DateTime ClaimDate { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? BillNumber { get; set; }

    /// <summary>Pending | Approved | Rejected | Paid | Cancelled</summary>
    public string Status { get; set; } = "Pending";

    public string? ApproverId { get; set; }
    public string? ApproverName { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? DecidedAt { get; set; }
    public int? PaidRunId { get; set; }

    /// <summary>yyyy-MM of the run that pays it.</summary>
    public string? PaidInPeriod { get; set; }

    public DateTime RequestedAt { get; set; }
}

/// <summary>POST api/v1/payroll/reimbursements</summary>
public sealed record ClaimRequest
{
    public string? EmployeeId { get; init; }
    public string? Category { get; init; }
    public DateTime? ClaimDate { get; init; }
    public decimal? Amount { get; init; }
    public string? Description { get; init; }
    public string? BillNumber { get; init; }
}

/// <summary>POST api/v1/payroll/reimbursements/{id}/decision</summary>
public sealed record ReimbursementDecisionRequest
{
    public bool? Approve { get; init; }
    public string? Note { get; init; }
    public string? ApproverId { get; init; }
}

/// <summary>POST api/v1/payroll/reimbursements/{id}/cancel</summary>
public sealed record CancelClaimRequest
{
    public string? EmployeeId { get; init; }
}

// ---- Rules --------------------------------------------------------------------------------------

public static class PayrollRules
{
    public static readonly string[] Regimes = ["New", "Old"];
    public static readonly string[] CalcTypes = ["PctCtc", "PctBasic", "Fixed", "Balance"];
    public static readonly string[] AdjustmentKinds = ["Earning", "Deduction"];
    public static readonly string[] RunActions = ["lock", "unlock", "publish"];
    public static readonly string[] ClaimCategories = ["Fuel", "Internet", "Phone", "Travel", "Meal", "Medical", "Books", "Other"];
    public static readonly string[] ClaimStatuses = ["All", "Pending", "Approved", "Rejected", "Paid", "Cancelled"];
    public static readonly string[] DeclarationStatuses = ["All", "Draft", "Submitted", "Approved", "Rejected"];

    /// <summary>Old-regime sections and their yearly caps (null = no cap).</summary>
    public static readonly IReadOnlyDictionary<string, decimal?> Sections = new Dictionary<string, decimal?>
    {
        ["80C"] = 150000,      // PPF, ELSS, LIC, tuition, principal (employee PF counts here too)
        ["80D"] = 75000,       // health insurance: self/family + parents
        ["80CCD1B"] = 50000,   // NPS (own contribution)
        ["24B"] = 200000,      // home-loan interest (self occupied)
        ["HRA"] = null,        // annual rent paid; exemption is calculated
        ["80E"] = null,        // education-loan interest
        ["80G"] = null,        // donations
    };

    public static readonly string[] MetroCities = ["Mumbai", "Delhi", "New Delhi", "Kolkata", "Chennai"];

    public const int NoteMax = 300;
    public const int LabelMax = 60;
    public const int ReasonMax = 200;
    public const int DescriptionMax = 300;
    public const int BillMax = 50;
    public const decimal MaxCtc = 100_000_000;
    public const decimal MaxClaim = 200_000;
    public const decimal MaxAdjustment = 10_000_000;
    public const int SearchMax = 100;

    public static string? Canonical(IEnumerable<string> allowed, string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : allowed.FirstOrDefault(a => a.Equals(value.Trim(), StringComparison.OrdinalIgnoreCase));

    /// <summary>FY start year for a date (April - March): Oct 2026 -> 2026 (FY 2026-27).</summary>
    public static int FinancialYear(DateTime date) => date.Month >= 4 ? date.Year : date.Year - 1;

    /// <summary>Months left in the FY including this one: April = 12, March = 1.</summary>
    public static int MonthsLeftInFy(int month) => month >= 4 ? 16 - month : 4 - month;
}

/// <summary>JSON helpers (SQL FOR JSON columns, calculator output).</summary>
public static class PayrollJson
{
    public static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web);

    public static List<T> List<T>(string? json) =>
        string.IsNullOrWhiteSpace(json) ? [] : JsonSerializer.Deserialize<List<T>>(json, Options) ?? [];

    public static string Write<T>(T value) => JsonSerializer.Serialize(value, Options);
}
