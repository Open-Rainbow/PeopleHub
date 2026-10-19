using PeopleHub.Application.Modules.Payroll.Contracts;

namespace PeopleHub.Application.Modules.Payroll.Interfaces;

public interface IPayrollService
{
    // Settings
    Task<PayrollSettingsDto> GetSettingsAsync(CancellationToken ct);
    Task<PayrollSettingsDto> SaveSettingsAsync(PayrollSettingsDto request, CancellationToken ct);
    Task<IReadOnlyList<PayComponentDto>> GetComponentsAsync(CancellationToken ct);
    Task<IReadOnlyList<PayComponentDto>> SaveComponentsAsync(SaveComponentsRequest request, CancellationToken ct);
    Task<IReadOnlyList<PtSlabDto>> GetPtSlabsAsync(string? state, CancellationToken ct);

    // Structures
    Task<IReadOnlyList<EmployeeSalaryRowDto>> GetStructuresAsync(string? search, CancellationToken ct);
    Task<EmployeeSalaryDto> GetEmployeeSalaryAsync(string? employeeId, CancellationToken ct);
    Task<SalaryBreakdownDto> PreviewStructureAsync(PreviewStructureRequest request, CancellationToken ct);
    Task<EmployeeSalaryDto> SaveRevisionAsync(string employeeId, SaveRevisionRequest request, CancellationToken ct);

    // Runs
    Task<IReadOnlyList<PayrollRunDto>> GetRunsAsync(int? year, CancellationToken ct);
    Task<PayrollRunDto> GetRunAsync(int id, CancellationToken ct);
    Task<PayrollRunDto> CreateRunAsync(CreateRunRequest request, CancellationToken ct);
    Task DeleteRunAsync(int id, CancellationToken ct);
    Task<ProcessRunResult> ProcessRunAsync(int id, CancellationToken ct);
    Task<PayrollRunDto> ChangeRunStatusAsync(int id, string action, CancellationToken ct);
    Task<IReadOnlyList<PayslipDto>> GetRunPayslipsAsync(int id, CancellationToken ct);
    Task<IReadOnlyList<RunAdjustmentDto>> GetAdjustmentsAsync(int runId, CancellationToken ct);
    Task<IReadOnlyList<RunAdjustmentDto>> AddAdjustmentAsync(int runId, AddAdjustmentRequest request, CancellationToken ct);
    Task<IReadOnlyList<RunAdjustmentDto>> DeleteAdjustmentAsync(int runId, int adjustmentId, CancellationToken ct);
    Task<PayrollRunDto> SetLopAsync(int runId, string employeeId, SetLopRequest request, CancellationToken ct);

    // Payslips (employee)
    Task<IReadOnlyList<PayslipDto>> GetMyPayslipsAsync(string? employeeId, CancellationToken ct);
    Task<PayslipDto> GetPayslipAsync(int id, string? employeeId, CancellationToken ct);

    // Tax
    Task<IReadOnlyList<TaxDeclarationDto>> GetDeclarationsAsync(string? employeeId, int? fy, string? status, CancellationToken ct);
    Task<TaxDeclarationDto> SaveDeclarationAsync(SaveDeclarationRequest request, CancellationToken ct);
    Task<TaxDeclarationDto> DecideDeclarationAsync(int id, DeclarationDecisionRequest request, CancellationToken ct);
    Task<TaxCompareResult> CompareRegimesAsync(TaxCompareRequest request, CancellationToken ct);

    // Reimbursements
    Task<IReadOnlyList<ReimbursementDto>> GetReimbursementsAsync(string? employeeId, string? status, CancellationToken ct);
    Task<ReimbursementDto> ClaimAsync(ClaimRequest request, CancellationToken ct);
    Task<ReimbursementDto> DecideReimbursementAsync(int id, ReimbursementDecisionRequest request, CancellationToken ct);
    Task<ReimbursementDto> CancelReimbursementAsync(int id, string? employeeId, CancellationToken ct);
}
