using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Payroll.Calculation;
using PeopleHub.Application.Modules.Payroll.Contracts;
using PeopleHub.Application.Modules.Payroll.Interfaces;

namespace PeopleHub.Application.Modules.Payroll.Services;

/// <summary>
/// Validates input, resolves org / employee from the request, runs the calculator and calls the repository.
/// Run states and date windows are enforced by the stored procedures (THROW 506xx -> 422).
/// </summary>
public sealed class PayrollService(
    IPayrollRepository repository,
    IValidator<PayrollSettingsDto> settingsValidator,
    IValidator<SaveComponentsRequest> componentsValidator,
    IValidator<PreviewStructureRequest> previewValidator,
    IValidator<SaveRevisionRequest> revisionValidator,
    IValidator<CreateRunRequest> createRunValidator,
    IValidator<AddAdjustmentRequest> adjustmentValidator,
    IValidator<SetLopRequest> lopValidator,
    IValidator<SaveDeclarationRequest> declarationValidator,
    IValidator<DeclarationDecisionRequest> declarationDecisionValidator,
    IValidator<TaxCompareRequest> compareValidator,
    IValidator<ClaimRequest> claimValidator,
    IValidator<ReimbursementDecisionRequest> claimDecisionValidator,
    IRequestContext context) : IPayrollService
{
    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    // ---- Settings -------------------------------------------------------------------------------

    public async Task<PayrollSettingsDto> GetSettingsAsync(CancellationToken ct) =>
        await repository.GetSettingsAsync(OrgId, ct) ?? new PayrollSettingsDto();

    public async Task<PayrollSettingsDto> SaveSettingsAsync(PayrollSettingsDto request, CancellationToken ct)
    {
        await settingsValidator.EnsureValidAsync(request, ct);
        request.DefaultRegime = PayrollRules.Canonical(PayrollRules.Regimes, request.DefaultRegime)!;
        request.PtState = request.PtState?.Trim() ?? string.Empty;
        return await repository.SaveSettingsAsync(OrgId, request, UserId, ct) ?? request;
    }

    public async Task<IReadOnlyList<PayComponentDto>> GetComponentsAsync(CancellationToken ct) =>
        await repository.GetComponentsAsync(OrgId, ct);

    public async Task<IReadOnlyList<PayComponentDto>> SaveComponentsAsync(SaveComponentsRequest request, CancellationToken ct)
    {
        await componentsValidator.EnsureValidAsync(request, ct);
        var items = request.Components!.Select(c => new
        {
            code = c.Code.Trim().ToUpperInvariant(),
            name = c.Name.Trim(),
            calcType = c.CalcType,
            value = c.CalcType == "Balance" ? 0 : c.Value,
            isTaxable = c.IsTaxable,
            isProrated = c.IsProrated,
        });
        return await repository.SaveComponentsAsync(OrgId, PayrollJson.Write(items), UserId, ct);
    }

    public async Task<IReadOnlyList<PtSlabDto>> GetPtSlabsAsync(string? state, CancellationToken ct) =>
        await repository.GetPtSlabsAsync(Clean(state), ct);

    // ---- Structures -----------------------------------------------------------------------------

    public async Task<IReadOnlyList<EmployeeSalaryRowDto>> GetStructuresAsync(string? search, CancellationToken ct)
    {
        var term = Clean(search);
        if (term is { Length: > PayrollRules.SearchMax }) throw Invalid("search", $"Search must be {PayrollRules.SearchMax} characters or fewer.");
        var rows = await repository.GetStructuresAsync(OrgId, term, ct);
        var (settings, components, slabs) = await RulesAsync(ct);
        foreach (var r in rows.Where(r => r.AnnualCtc is > 0))
            r.MonthlyGross = PayrollCalculator.Structure(r.AnnualCtc!.Value, r.PfApplicable, components, settings, slabs).MonthlyGross;
        return rows;
    }

    public async Task<EmployeeSalaryDto> GetEmployeeSalaryAsync(string? employeeId, CancellationToken ct)
    {
        var code = Employee(employeeId);
        var row = (await repository.GetStructuresAsync(OrgId, code, ct)).FirstOrDefault(r => r.EmployeeId.Equals(code, StringComparison.OrdinalIgnoreCase))
                  ?? throw new NotFoundException("Employee", code);
        var revisions = await repository.GetRevisionsAsync(OrgId, code, ct);
        var result = new EmployeeSalaryDto
        {
            EmployeeId = row.EmployeeId,
            EmployeeName = row.EmployeeName,
            Department = row.Department,
            Designation = row.Designation,
            TaxRegime = row.TaxRegime,
            EffectiveFrom = row.EffectiveFrom,
            Revisions = revisions,
        };
        if (row.AnnualCtc is > 0)
        {
            var (settings, components, slabs) = await RulesAsync(ct);
            result.Current = PayrollCalculator.Structure(row.AnnualCtc.Value, row.PfApplicable, components, settings, slabs);
        }
        return result;
    }

    public async Task<SalaryBreakdownDto> PreviewStructureAsync(PreviewStructureRequest request, CancellationToken ct)
    {
        await previewValidator.EnsureValidAsync(request, ct);
        var (settings, components, slabs) = await RulesAsync(ct);
        return PayrollCalculator.Structure(request.AnnualCtc!.Value, request.PfApplicable ?? true, components, settings, slabs);
    }

    public async Task<EmployeeSalaryDto> SaveRevisionAsync(string employeeId, SaveRevisionRequest request, CancellationToken ct)
    {
        await revisionValidator.EnsureValidAsync(request, ct);
        var code = Required(employeeId, "employeeId");
        var (settings, components, slabs) = await RulesAsync(ct);
        var check = PayrollCalculator.Structure(request.AnnualCtc!.Value, request.PfApplicable ?? true, components, settings, slabs);
        if (check.Warnings.Count > 0) throw new BusinessRuleException(check.Warnings[0]);

        await repository.SaveRevisionAsync(OrgId, code, request.AnnualCtc.Value, request.EffectiveFrom!.Value.Date,
            request.PfApplicable ?? true, Clean(request.Reason), UserId, ct);
        return await GetEmployeeSalaryAsync(code, ct);
    }

    // ---- Runs -----------------------------------------------------------------------------------

    public async Task<IReadOnlyList<PayrollRunDto>> GetRunsAsync(int? year, CancellationToken ct) =>
        await repository.GetRunsAsync(OrgId, year, null, ct);

    public async Task<PayrollRunDto> GetRunAsync(int id, CancellationToken ct) =>
        (await repository.GetRunsAsync(OrgId, null, id, ct)).FirstOrDefault() ?? throw new NotFoundException("Payroll run", id);

    public async Task<PayrollRunDto> CreateRunAsync(CreateRunRequest request, CancellationToken ct)
    {
        await createRunValidator.EnsureValidAsync(request, ct);
        var id = await repository.CreateRunAsync(OrgId, request.Year!.Value, request.Month!.Value, Clean(request.Note), UserId, ct);
        return await GetRunAsync(id ?? throw new BusinessRuleException("The payroll run could not be created."), ct);
    }

    public async Task DeleteRunAsync(int id, CancellationToken ct)
    {
        await GetRunAsync(id, ct);
        await repository.DeleteRunAsync(OrgId, id, UserId, ct);
    }

    public async Task<ProcessRunResult> ProcessRunAsync(int id, CancellationToken ct)
    {
        var run = await GetRunAsync(id, ct);
        if (run.Status is "Locked" or "Published") throw new BusinessRuleException("This payroll run is locked. Unlock it before processing again.");

        var (settings, components, slabs) = await RulesAsync(ct);
        if (components.Count == 0) throw new BusinessRuleException("Set up salary components before running payroll.");

        var inputs = await repository.GetRunInputsAsync(OrgId, id, ct);
        if (inputs.Count == 0) throw new BusinessRuleException("Nobody has a salary structure for this month yet.");

        var slips = inputs.Select(i => PayrollCalculator.Payslip(i, run.Month, components, settings, slabs)).ToList();
        await repository.SaveRunResultsAsync(OrgId, id, PayrollJson.Write(slips), UserId, ct);
        return new ProcessRunResult(await GetRunAsync(id, ct), await repository.GetPayslipsAsync(OrgId, id, null, null, false, ct));
    }

    public async Task<PayrollRunDto> ChangeRunStatusAsync(int id, string action, CancellationToken ct)
    {
        var verb = PayrollRules.Canonical(PayrollRules.RunActions, action) ?? throw Invalid("action", "Action must be lock, unlock or publish.");
        await GetRunAsync(id, ct);
        await repository.SetRunStatusAsync(OrgId, id, verb, UserId, ct);
        return await GetRunAsync(id, ct);
    }

    public async Task<IReadOnlyList<PayslipDto>> GetRunPayslipsAsync(int id, CancellationToken ct)
    {
        await GetRunAsync(id, ct);
        return await repository.GetPayslipsAsync(OrgId, id, null, null, false, ct);
    }

    public async Task<IReadOnlyList<RunAdjustmentDto>> GetAdjustmentsAsync(int runId, CancellationToken ct)
    {
        await GetRunAsync(runId, ct);
        return await repository.GetAdjustmentsAsync(OrgId, runId, ct);
    }

    public async Task<IReadOnlyList<RunAdjustmentDto>> AddAdjustmentAsync(int runId, AddAdjustmentRequest request, CancellationToken ct)
    {
        await adjustmentValidator.EnsureValidAsync(request, ct);
        var kind = PayrollRules.Canonical(PayrollRules.AdjustmentKinds, request.Kind)!;
        await repository.AddAdjustmentAsync(OrgId, runId, request.EmployeeId!.Trim(), kind, request.Label!.Trim(), request.Amount!.Value,
            kind == "Earning" && (request.IsTaxable ?? true), UserId, ct);
        return await repository.GetAdjustmentsAsync(OrgId, runId, ct);
    }

    public async Task<IReadOnlyList<RunAdjustmentDto>> DeleteAdjustmentAsync(int runId, int adjustmentId, CancellationToken ct)
    {
        if (!await repository.DeleteAdjustmentAsync(OrgId, runId, adjustmentId, ct)) throw new NotFoundException("Adjustment", adjustmentId);
        return await repository.GetAdjustmentsAsync(OrgId, runId, ct);
    }

    public async Task<PayrollRunDto> SetLopAsync(int runId, string employeeId, SetLopRequest request, CancellationToken ct)
    {
        await lopValidator.EnsureValidAsync(request, ct);
        await repository.SetLopAsync(OrgId, runId, Required(employeeId, "employeeId"), request.LopDays, Clean(request.Reason), UserId, ct);
        return await GetRunAsync(runId, ct);
    }

    // ---- Payslips -------------------------------------------------------------------------------

    public async Task<IReadOnlyList<PayslipDto>> GetMyPayslipsAsync(string? employeeId, CancellationToken ct) =>
        await repository.GetPayslipsAsync(OrgId, null, Employee(employeeId), null, true, ct);

    /// <summary>Employees only see their own published payslips. HR (no employeeId, authenticated later via roles) sees any.</summary>
    public async Task<PayslipDto> GetPayslipAsync(int id, string? employeeId, CancellationToken ct)
    {
        var self = context.IsAuthenticated || !string.IsNullOrWhiteSpace(employeeId);
        var slip = (await repository.GetPayslipsAsync(OrgId, null, self ? Employee(employeeId) : null, id, self, ct)).FirstOrDefault();
        return slip ?? throw new NotFoundException("Payslip", id);
    }

    // ---- Tax ------------------------------------------------------------------------------------

    public async Task<IReadOnlyList<TaxDeclarationDto>> GetDeclarationsAsync(string? employeeId, int? fy, string? status, CancellationToken ct)
    {
        var match = string.IsNullOrWhiteSpace(status) ? "All" : PayrollRules.Canonical(PayrollRules.DeclarationStatuses, status)
                    ?? throw Invalid("status", "Status must be All, Draft, Submitted, Approved or Rejected.");
        return await repository.GetDeclarationsAsync(OrgId, Clean(employeeId), fy ?? PayrollRules.FinancialYear(DateTime.Today),
            match == "All" ? null : match, null, ct);
    }

    public async Task<TaxDeclarationDto> SaveDeclarationAsync(SaveDeclarationRequest request, CancellationToken ct)
    {
        await declarationValidator.EnsureValidAsync(request, ct);
        var code = Employee(request.EmployeeId);
        var items = (request.Items ?? []).Where(i => i.Amount > 0).Select(i => new
        {
            section = i.Section!.Trim().ToUpperInvariant(),
            description = i.Description!.Trim(),
            amount = i.Amount!.Value,
        });
        var regime = PayrollRules.Canonical(PayrollRules.Regimes, request.Regime)!;
        var id = await repository.SaveDeclarationAsync(OrgId, code, request.FinancialYear!.Value, regime, PayrollJson.Write(items), request.Submit, UserId, ct);
        return await DeclarationAsync(id ?? throw new BusinessRuleException("The declaration could not be saved."), request.FinancialYear.Value, ct);
    }

    public async Task<TaxDeclarationDto> DecideDeclarationAsync(int id, DeclarationDecisionRequest request, CancellationToken ct)
    {
        await declarationDecisionValidator.EnsureValidAsync(request, ct);
        var approver = context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId) ? context.UserId : Clean(request.ApproverId);
        var approved = request.Items is { Count: > 0 } ? PayrollJson.Write(request.Items.Select(i => new { id = i.Id, approvedAmount = i.ApprovedAmount })) : null;
        if (!await repository.DecideDeclarationAsync(OrgId, id, request.Approve!.Value, Clean(request.Note), approved, approver, UserId, ct))
            throw new NotFoundException("Tax declaration", id);

        // FY is unknown here: look it up in the current and neighbouring years.
        var fy = PayrollRules.FinancialYear(DateTime.Today);
        foreach (var year in new[] { fy, fy - 1, fy + 1 })
        {
            var found = (await repository.GetDeclarationsAsync(OrgId, null, year, null, id, ct)).FirstOrDefault();
            if (found is not null) return found;
        }
        throw new NotFoundException("Tax declaration", id);
    }

    public async Task<TaxCompareResult> CompareRegimesAsync(TaxCompareRequest request, CancellationToken ct)
    {
        await compareValidator.EnsureValidAsync(request, ct);
        var code = Employee(request.EmployeeId);
        var row = (await repository.GetStructuresAsync(OrgId, code, ct)).FirstOrDefault(r => r.EmployeeId.Equals(code, StringComparison.OrdinalIgnoreCase));
        if (row?.AnnualCtc is not > 0) throw new BusinessRuleException("There is no salary structure for you yet. Ask HR to set it up.");

        var (settings, components, slabs) = await RulesAsync(ct);
        var s = PayrollCalculator.Structure(row!.AnnualCtc!.Value, row.PfApplicable, components, settings, slabs);
        decimal Annual(string line) => (s.Lines.FirstOrDefault(l => l.Code.Equals(line, StringComparison.OrdinalIgnoreCase))?.Monthly ?? 0) * 12;

        var input = new TaxInput
        {
            Gross = s.MonthlyTaxable * 12,
            EmployeePf = Annual("PF"),
            ProfessionalTax = Math.Min(2500, Annual("PT")),
            BasicAnnual = Annual(PayrollCalculator.Basic),
            HraAnnual = Annual(PayrollCalculator.Hra),
            Metro = PayrollCalculator.IsMetro(row.WorkLocation),
            Declarations = (request.Items ?? [])
                .Where(i => i.Amount > 0 && i.Section is not null)
                .Select(i => new DeclarationAmount(i.Section!.Trim().ToUpperInvariant(), i.Amount!.Value))
                .ToList(),
        };
        var n = TaxCalculator.New(input);
        var o = TaxCalculator.Old(input);
        RegimeTax Map(string regime, TaxResult r) =>
            new(regime, input.Gross, r.Deductions, r.TaxableIncome, r.Tax, PayrollCalculator.Rupees(r.Tax / 12));

        var recommended = o.Tax < n.Tax ? "Old" : "New";
        return new TaxCompareResult(input.Gross, Map("New", n), Map("Old", o), recommended, Math.Abs(n.Tax - o.Tax));
    }

    // ---- Reimbursements -------------------------------------------------------------------------

    public async Task<IReadOnlyList<ReimbursementDto>> GetReimbursementsAsync(string? employeeId, string? status, CancellationToken ct)
    {
        var match = string.IsNullOrWhiteSpace(status) ? "All" : PayrollRules.Canonical(PayrollRules.ClaimStatuses, status)
                    ?? throw Invalid("status", "Status must be All, Pending, Approved, Rejected, Paid or Cancelled.");
        return await repository.GetReimbursementsAsync(OrgId, Clean(employeeId), match == "All" ? null : match, null, ct);
    }

    public async Task<ReimbursementDto> ClaimAsync(ClaimRequest request, CancellationToken ct)
    {
        await claimValidator.EnsureValidAsync(request, ct);
        var id = await repository.ClaimAsync(OrgId, Employee(request.EmployeeId), PayrollRules.Canonical(PayrollRules.ClaimCategories, request.Category)!,
            request.ClaimDate!.Value.Date, Math.Round(request.Amount!.Value, 2), request.Description!.Trim(), Clean(request.BillNumber), UserId, ct);
        return await ClaimByIdAsync(id ?? throw new BusinessRuleException("The claim could not be saved."), ct);
    }

    public async Task<ReimbursementDto> DecideReimbursementAsync(int id, ReimbursementDecisionRequest request, CancellationToken ct)
    {
        await claimDecisionValidator.EnsureValidAsync(request, ct);
        var approver = context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId) ? context.UserId : Clean(request.ApproverId);
        if (!await repository.DecideReimbursementAsync(OrgId, id, request.Approve!.Value, Clean(request.Note), approver, UserId, ct))
            throw new NotFoundException("Reimbursement", id);
        return await ClaimByIdAsync(id, ct);
    }

    public async Task<ReimbursementDto> CancelReimbursementAsync(int id, string? employeeId, CancellationToken ct)
    {
        if (!await repository.CancelReimbursementAsync(OrgId, id, Employee(employeeId), UserId, ct))
            throw new NotFoundException("Reimbursement", id);
        return await ClaimByIdAsync(id, ct);
    }

    // ---- Helpers --------------------------------------------------------------------------------

    private async Task<(PayrollSettingsDto Settings, List<PayComponentDto> Components, List<PtSlabDto> Slabs)> RulesAsync(CancellationToken ct)
    {
        var settings = await GetSettingsAsync(ct);
        var components = await repository.GetComponentsAsync(OrgId, ct);
        var slabs = await repository.GetPtSlabsAsync(settings.PtState, ct);
        return (settings, components, slabs);
    }

    private async Task<TaxDeclarationDto> DeclarationAsync(int id, int fy, CancellationToken ct) =>
        (await repository.GetDeclarationsAsync(OrgId, null, fy, null, id, ct)).FirstOrDefault() ?? throw new NotFoundException("Tax declaration", id);

    private async Task<ReimbursementDto> ClaimByIdAsync(int id, CancellationToken ct) =>
        (await repository.GetReimbursementsAsync(OrgId, null, null, id, ct)).FirstOrDefault() ?? throw new NotFoundException("Reimbursement", id);

    /// <summary>Authenticated: the token decides who you are. Until login exists, the client passes the employee code.</summary>
    private string Employee(string? fromRequest)
    {
        if (context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)) return context.UserId!;
        return Required(fromRequest, "employeeId");
    }

    private static string Required(string? value, string field) =>
        string.IsNullOrWhiteSpace(value) ? throw Invalid(field, "Employee id is required.") : value.Trim();

    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });
}
