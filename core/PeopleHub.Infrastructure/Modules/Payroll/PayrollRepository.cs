using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Payroll.Contracts;
using PeopleHub.Application.Modules.Payroll.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Payroll;

/// <summary>One method per payroll stored procedure (database/payroll.sql).</summary>
internal sealed class PayrollRepository(SqlDb db) : IPayrollRepository
{
    private const string Code = "@Employee_Id";

    public async Task<PayrollSettingsDto?> GetSettingsAsync(int organizationId, CancellationToken ct) =>
        (await db.QueryAsync<PayrollSettingsDto>("dbo.sp_pay_get_settings", new { OrganizationId = organizationId }, ct)).FirstOrDefault();

    public async Task<PayrollSettingsDto?> SaveSettingsAsync(int organizationId, PayrollSettingsDto s, string userId, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@PfEnabled", s.PfEnabled);
        p.Add("@PfRate", s.PfRate);
        p.Add("@PfWageCeiling", s.PfWageCeiling);
        p.Add("@PfCapAtCeiling", s.PfCapAtCeiling);
        p.Add("@EsiEnabled", s.EsiEnabled);
        p.Add("@EsiEmployeeRate", s.EsiEmployeeRate);
        p.Add("@EsiEmployerRate", s.EsiEmployerRate);
        p.Add("@EsiWageLimit", s.EsiWageLimit);
        p.Add("@PtEnabled", s.PtEnabled);
        p.Add("@PtState", s.PtState);
        p.Add("@TdsEnabled", s.TdsEnabled);
        p.Add("@DefaultRegime", s.DefaultRegime, DbType.AnsiString, size: 3);
        p.Add("@LopFromAttendance", s.LopFromAttendance);
        p.Add("@PayDay", s.PayDay);
        p.Add("@UserId", userId);
        return (await db.QueryAsync<PayrollSettingsDto>("dbo.sp_pay_save_settings", p, ct)).FirstOrDefault();
    }

    public Task<List<PayComponentDto>> GetComponentsAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<PayComponentDto>("dbo.sp_pay_get_components", new { OrganizationId = organizationId }, ct);

    public Task<List<PayComponentDto>> SaveComponentsAsync(int organizationId, string json, string userId, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Json", json);
        p.Add("@UserId", userId);
        return db.QueryAsync<PayComponentDto>("dbo.sp_pay_save_components", p, ct);
    }

    public Task<List<PtSlabDto>> GetPtSlabsAsync(string? state, CancellationToken ct) =>
        db.QueryAsync<PtSlabDto>("dbo.sp_pay_get_pt_slabs", new { State = state }, ct);

    public Task<List<EmployeeSalaryRowDto>> GetStructuresAsync(int organizationId, string? search, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Search", search);
        return db.QueryAsync<EmployeeSalaryRowDto>("dbo.sp_pay_get_structures", p, ct);
    }

    public Task<List<SalaryRevisionDto>> GetRevisionsAsync(int organizationId, string employeeId, CancellationToken ct) =>
        db.QueryAsync<SalaryRevisionDto>("dbo.sp_pay_get_revisions", Emp(organizationId, employeeId), ct);

    public async Task<int?> SaveRevisionAsync(int organizationId, string employeeId, decimal annualCtc, DateTime effectiveFrom, bool pfApplicable,
        string? reason, string userId, CancellationToken ct)
    {
        var p = Emp(organizationId, employeeId);
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@AnnualCtc", annualCtc);
        p.Add("@EffectiveFrom", effectiveFrom.Date, DbType.Date);
        p.Add("@PfApplicable", pfApplicable);
        p.Add("@Reason", reason);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pay_save_revision", p, ct);
        return p.Get<int?>("@Id");
    }

    public Task<List<PayrollRunDto>> GetRunsAsync(int organizationId, int? year, int? id, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Year", year, DbType.Int32);
        p.Add("@Id", id, DbType.Int32);
        return db.QueryAsync<PayrollRunDto>("dbo.sp_pay_get_runs", p, ct);
    }

    public async Task<int?> CreateRunAsync(int organizationId, int year, int month, string? note, string userId, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@Year", year);
        p.Add("@Month", month);
        p.Add("@Note", note);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pay_create_run", p, ct);
        return p.Get<int?>("@Id");
    }

    public Task DeleteRunAsync(int organizationId, int runId, string userId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_pay_delete_run", p, ct);
    }

    public Task<List<RunInputRow>> GetRunInputsAsync(int organizationId, int runId, CancellationToken ct) =>
        db.QueryAsync<RunInputRow>("dbo.sp_pay_get_run_inputs", Run(organizationId, runId), ct);

    public Task SaveRunResultsAsync(int organizationId, int runId, string json, string userId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add("@Json", json);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_pay_save_run_results", p, ct);
    }

    public Task SetRunStatusAsync(int organizationId, int runId, string action, string userId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add("@Action", action, DbType.AnsiString, size: 10);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_pay_set_run_status", p, ct);
    }

    public Task<List<RunAdjustmentDto>> GetAdjustmentsAsync(int organizationId, int runId, CancellationToken ct) =>
        db.QueryAsync<RunAdjustmentDto>("dbo.sp_pay_get_adjustments", Run(organizationId, runId), ct);

    public async Task<int?> AddAdjustmentAsync(int organizationId, int runId, string employeeId, string kind, string label, decimal amount,
        bool isTaxable, string userId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        p.Add("@Kind", kind, DbType.AnsiString, size: 10);
        p.Add("@Label", label);
        p.Add("@Amount", amount);
        p.Add("@IsTaxable", isTaxable);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pay_add_adjustment", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> DeleteAdjustmentAsync(int organizationId, int runId, int adjustmentId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add("@AdjustmentId", adjustmentId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_pay_delete_adjustment", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public Task SetLopAsync(int organizationId, int runId, string employeeId, decimal? lopDays, string? reason, string userId, CancellationToken ct)
    {
        var p = Run(organizationId, runId);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        p.Add("@LopDays", lopDays, DbType.Decimal, precision: 4, scale: 1);
        p.Add("@Reason", reason);
        p.Add("@UserId", userId);
        return db.ExecuteAsync("dbo.sp_pay_set_lop", p, ct);
    }

    public Task<List<PayslipDto>> GetPayslipsAsync(int organizationId, int? runId, string? employeeId, int? id, bool publishedOnly, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@RunId", runId, DbType.Int32);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        p.Add("@Id", id, DbType.Int32);
        p.Add("@PublishedOnly", publishedOnly);
        return db.QueryAsync<PayslipDto>("dbo.sp_pay_get_payslips", p, ct);
    }

    public Task<List<TaxDeclarationDto>> GetDeclarationsAsync(int organizationId, string? employeeId, int fy, string? status, int? id, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        p.Add("@Fy", fy);
        p.Add("@Status", status, DbType.AnsiString, size: 10);
        p.Add("@Id", id, DbType.Int32);
        return db.QueryAsync<TaxDeclarationDto>("dbo.sp_pay_get_declarations", p, ct);
    }

    public async Task<int?> SaveDeclarationAsync(int organizationId, string employeeId, int fy, string regime, string itemsJson, bool submit,
        string userId, CancellationToken ct)
    {
        var p = Emp(organizationId, employeeId);
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@Fy", fy);
        p.Add("@Regime", regime, DbType.AnsiString, size: 3);
        p.Add("@ItemsJson", itemsJson);
        p.Add("@Submit", submit);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pay_save_declaration", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> DecideDeclarationAsync(int organizationId, int id, bool approve, string? note, string? approvedJson, string? approverId,
        string userId, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Id", id);
        p.Add("@Approve", approve);
        p.Add("@Note", note);
        p.Add("@ApprovedJson", approvedJson);
        p.Add("@Approver_Id", approverId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_pay_decide_declaration", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public Task<List<ReimbursementDto>> GetReimbursementsAsync(int organizationId, string? employeeId, string? status, int? id, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        p.Add("@Status", status, DbType.AnsiString, size: 10);
        p.Add("@Id", id, DbType.Int32);
        return db.QueryAsync<ReimbursementDto>("dbo.sp_pay_get_reimbursements", p, ct);
    }

    public async Task<int?> ClaimAsync(int organizationId, string employeeId, string category, DateTime claimDate, decimal amount, string description,
        string? billNumber, string userId, CancellationToken ct)
    {
        var p = Emp(organizationId, employeeId);
        p.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);
        p.Add("@Category", category, DbType.AnsiString, size: 20);
        p.Add("@ClaimDate", claimDate.Date, DbType.Date);
        p.Add("@Amount", amount);
        p.Add("@Description", description);
        p.Add("@BillNumber", billNumber);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_pay_claim_reimbursement", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> DecideReimbursementAsync(int organizationId, int id, bool approve, string? note, string? approverId, string userId, CancellationToken ct)
    {
        var p = Org(organizationId);
        p.Add("@Id", id);
        p.Add("@Approve", approve);
        p.Add("@Note", note);
        p.Add("@Approver_Id", approverId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_pay_decide_reimbursement", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public async Task<bool> CancelReimbursementAsync(int organizationId, int id, string employeeId, string userId, CancellationToken ct)
    {
        var p = Emp(organizationId, employeeId);
        p.Add("@Id", id);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_pay_cancel_reimbursement", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    private static DynamicParameters Org(int organizationId)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        return p;
    }

    private static DynamicParameters Emp(int organizationId, string employeeId)
    {
        var p = Org(organizationId);
        p.Add(Code, employeeId, DbType.AnsiString, size: 50);
        return p;
    }

    private static DynamicParameters Run(int organizationId, int runId)
    {
        var p = Org(organizationId);
        p.Add("@RunId", runId);
        return p;
    }
}
