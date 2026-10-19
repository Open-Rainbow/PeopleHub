using PeopleHub.Application.Modules.Payroll.Contracts;

namespace PeopleHub.Application.Modules.Payroll.Interfaces;

/// <summary>Database calls for payroll (see database/payroll.sql).</summary>
public interface IPayrollRepository
{
    Task<PayrollSettingsDto?> GetSettingsAsync(int organizationId, CancellationToken ct);
    Task<PayrollSettingsDto?> SaveSettingsAsync(int organizationId, PayrollSettingsDto settings, string userId, CancellationToken ct);
    Task<List<PayComponentDto>> GetComponentsAsync(int organizationId, CancellationToken ct);
    Task<List<PayComponentDto>> SaveComponentsAsync(int organizationId, string json, string userId, CancellationToken ct);
    Task<List<PtSlabDto>> GetPtSlabsAsync(string? state, CancellationToken ct);

    Task<List<EmployeeSalaryRowDto>> GetStructuresAsync(int organizationId, string? search, CancellationToken ct);
    Task<List<SalaryRevisionDto>> GetRevisionsAsync(int organizationId, string employeeId, CancellationToken ct);
    Task<int?> SaveRevisionAsync(int organizationId, string employeeId, decimal annualCtc, DateTime effectiveFrom, bool pfApplicable, string? reason, string userId, CancellationToken ct);

    Task<List<PayrollRunDto>> GetRunsAsync(int organizationId, int? year, int? id, CancellationToken ct);
    Task<int?> CreateRunAsync(int organizationId, int year, int month, string? note, string userId, CancellationToken ct);
    Task DeleteRunAsync(int organizationId, int runId, string userId, CancellationToken ct);
    Task<List<RunInputRow>> GetRunInputsAsync(int organizationId, int runId, CancellationToken ct);
    Task SaveRunResultsAsync(int organizationId, int runId, string json, string userId, CancellationToken ct);
    Task SetRunStatusAsync(int organizationId, int runId, string action, string userId, CancellationToken ct);

    Task<List<RunAdjustmentDto>> GetAdjustmentsAsync(int organizationId, int runId, CancellationToken ct);
    Task<int?> AddAdjustmentAsync(int organizationId, int runId, string employeeId, string kind, string label, decimal amount, bool isTaxable, string userId, CancellationToken ct);
    Task<bool> DeleteAdjustmentAsync(int organizationId, int runId, int adjustmentId, CancellationToken ct);
    Task SetLopAsync(int organizationId, int runId, string employeeId, decimal? lopDays, string? reason, string userId, CancellationToken ct);

    Task<List<PayslipDto>> GetPayslipsAsync(int organizationId, int? runId, string? employeeId, int? id, bool publishedOnly, CancellationToken ct);

    Task<List<TaxDeclarationDto>> GetDeclarationsAsync(int organizationId, string? employeeId, int fy, string? status, int? id, CancellationToken ct);
    Task<int?> SaveDeclarationAsync(int organizationId, string employeeId, int fy, string regime, string itemsJson, bool submit, string userId, CancellationToken ct);
    Task<bool> DecideDeclarationAsync(int organizationId, int id, bool approve, string? note, string? approvedJson, string? approverId, string userId, CancellationToken ct);

    Task<List<ReimbursementDto>> GetReimbursementsAsync(int organizationId, string? employeeId, string? status, int? id, CancellationToken ct);
    Task<int?> ClaimAsync(int organizationId, string employeeId, string category, DateTime claimDate, decimal amount, string description, string? billNumber, string userId, CancellationToken ct);
    Task<bool> DecideReimbursementAsync(int organizationId, int id, bool approve, string? note, string? approverId, string userId, CancellationToken ct);
    Task<bool> CancelReimbursementAsync(int organizationId, int id, string employeeId, string userId, CancellationToken ct);
}
