using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Payroll.Contracts;
using PeopleHub.Application.Modules.Payroll.Interfaces;

namespace PeopleHub.Server.Controllers.Payroll;

/// <summary>
/// Payroll: settings and components, salary structures, monthly runs (process / lock / publish),
/// payslips, tax declarations and reimbursements.
/// </summary>
[ApiController]
[Route("api/v1/payroll")]
public sealed class PayrollController(IPayrollService service) : ControllerBase
{
    // ---- Settings ----------------------------------------------------------------------------
    [HttpGet("settings")]
    public async Task<ActionResult<PayrollSettingsDto>> GetSettings(CancellationToken ct) => Ok(await service.GetSettingsAsync(ct));

    [HttpPut("settings")]
    public async Task<ActionResult<PayrollSettingsDto>> SaveSettings(PayrollSettingsDto request, CancellationToken ct) =>
        Ok(await service.SaveSettingsAsync(request, ct));

    [HttpGet("components")]
    public async Task<ActionResult<IReadOnlyList<PayComponentDto>>> GetComponents(CancellationToken ct) => Ok(await service.GetComponentsAsync(ct));

    [HttpPut("components")]
    public async Task<ActionResult<IReadOnlyList<PayComponentDto>>> SaveComponents(SaveComponentsRequest request, CancellationToken ct) =>
        Ok(await service.SaveComponentsAsync(request, ct));

    [HttpGet("pt-slabs")]
    public async Task<ActionResult<IReadOnlyList<PtSlabDto>>> GetPtSlabs([FromQuery] string? state, CancellationToken ct) =>
        Ok(await service.GetPtSlabsAsync(state, ct));

    // ---- Salary structures -------------------------------------------------------------------
    [HttpGet("structures")]
    public async Task<ActionResult<IReadOnlyList<EmployeeSalaryRowDto>>> GetStructures([FromQuery] string? search, CancellationToken ct) =>
        Ok(await service.GetStructuresAsync(search, ct));

    [HttpPost("structures/preview")]
    public async Task<ActionResult<SalaryBreakdownDto>> Preview(PreviewStructureRequest request, CancellationToken ct) =>
        Ok(await service.PreviewStructureAsync(request, ct));

    [HttpGet("structures/{employeeId}")]
    public async Task<ActionResult<EmployeeSalaryDto>> GetStructure(string employeeId, CancellationToken ct) =>
        Ok(await service.GetEmployeeSalaryAsync(employeeId, ct));

    [HttpPost("structures/{employeeId}/revisions")]
    public async Task<ActionResult<EmployeeSalaryDto>> SaveRevision(string employeeId, SaveRevisionRequest request, CancellationToken ct) =>
        Ok(await service.SaveRevisionAsync(employeeId, request, ct));

    /// <summary>My current salary breakdown and revision history.</summary>
    [HttpGet("me/salary")]
    public async Task<ActionResult<EmployeeSalaryDto>> MySalary([FromQuery] string? employeeId, CancellationToken ct) =>
        Ok(await service.GetEmployeeSalaryAsync(employeeId, ct));

    // ---- Runs --------------------------------------------------------------------------------
    [HttpGet("runs")]
    public async Task<ActionResult<IReadOnlyList<PayrollRunDto>>> GetRuns([FromQuery] int? year, CancellationToken ct) =>
        Ok(await service.GetRunsAsync(year, ct));

    [HttpGet("runs/{id:int}")]
    public async Task<ActionResult<PayrollRunDto>> GetRun(int id, CancellationToken ct) => Ok(await service.GetRunAsync(id, ct));

    [HttpPost("runs")]
    public async Task<ActionResult<PayrollRunDto>> CreateRun(CreateRunRequest request, CancellationToken ct)
    {
        var run = await service.CreateRunAsync(request, ct);
        return CreatedAtAction(nameof(GetRun), new { id = run.Id }, run);
    }

    [HttpDelete("runs/{id:int}")]
    public async Task<IActionResult> DeleteRun(int id, CancellationToken ct)
    {
        await service.DeleteRunAsync(id, ct);
        return NoContent();
    }

    /// <summary>Calculates every payslip in the run (can be repeated until the run is locked).</summary>
    [HttpPost("runs/{id:int}/process")]
    public async Task<ActionResult<ProcessRunResult>> Process(int id, CancellationToken ct) => Ok(await service.ProcessRunAsync(id, ct));

    /// <summary>Processed -> Locked: no more changes.</summary>
    [HttpPost("runs/{id:int}/lock")]
    public async Task<ActionResult<PayrollRunDto>> Lock(int id, CancellationToken ct) => Ok(await service.ChangeRunStatusAsync(id, "lock", ct));

    /// <summary>Locked -> Processed.</summary>
    [HttpPost("runs/{id:int}/unlock")]
    public async Task<ActionResult<PayrollRunDto>> Unlock(int id, CancellationToken ct) => Ok(await service.ChangeRunStatusAsync(id, "unlock", ct));

    /// <summary>Locked -> Published: employees can see their payslips; included claims become Paid.</summary>
    [HttpPost("runs/{id:int}/publish")]
    public async Task<ActionResult<PayrollRunDto>> Publish(int id, CancellationToken ct) => Ok(await service.ChangeRunStatusAsync(id, "publish", ct));

    [HttpGet("runs/{id:int}/payslips")]
    public async Task<ActionResult<IReadOnlyList<PayslipDto>>> GetRunPayslips(int id, CancellationToken ct) =>
        Ok(await service.GetRunPayslipsAsync(id, ct));

    [HttpGet("runs/{id:int}/adjustments")]
    public async Task<ActionResult<IReadOnlyList<RunAdjustmentDto>>> GetAdjustments(int id, CancellationToken ct) =>
        Ok(await service.GetAdjustmentsAsync(id, ct));

    [HttpPost("runs/{id:int}/adjustments")]
    public async Task<ActionResult<IReadOnlyList<RunAdjustmentDto>>> AddAdjustment(int id, AddAdjustmentRequest request, CancellationToken ct) =>
        Ok(await service.AddAdjustmentAsync(id, request, ct));

    [HttpDelete("runs/{id:int}/adjustments/{adjustmentId:int}")]
    public async Task<ActionResult<IReadOnlyList<RunAdjustmentDto>>> DeleteAdjustment(int id, int adjustmentId, CancellationToken ct) =>
        Ok(await service.DeleteAdjustmentAsync(id, adjustmentId, ct));

    [HttpPut("runs/{id:int}/lop/{employeeId}")]
    public async Task<ActionResult<PayrollRunDto>> SetLop(int id, string employeeId, SetLopRequest request, CancellationToken ct) =>
        Ok(await service.SetLopAsync(id, employeeId, request, ct));

    // ---- Payslips ----------------------------------------------------------------------------
    /// <summary>My published payslips, newest first.</summary>
    [HttpGet("payslips")]
    public async Task<ActionResult<IReadOnlyList<PayslipDto>>> MyPayslips([FromQuery] string? employeeId, CancellationToken ct) =>
        Ok(await service.GetMyPayslipsAsync(employeeId, ct));

    [HttpGet("payslips/{id:int}")]
    public async Task<ActionResult<PayslipDto>> GetPayslip(int id, [FromQuery] string? employeeId, CancellationToken ct) =>
        Ok(await service.GetPayslipAsync(id, employeeId, ct));

    // ---- Tax ---------------------------------------------------------------------------------
    [HttpGet("declarations")]
    public async Task<ActionResult<IReadOnlyList<TaxDeclarationDto>>> GetDeclarations(
        [FromQuery] string? employeeId, [FromQuery] int? fy, [FromQuery] string? status, CancellationToken ct) =>
        Ok(await service.GetDeclarationsAsync(employeeId, fy, status, ct));

    [HttpPut("declarations")]
    public async Task<ActionResult<TaxDeclarationDto>> SaveDeclaration(SaveDeclarationRequest request, CancellationToken ct) =>
        Ok(await service.SaveDeclarationAsync(request, ct));

    [HttpPost("declarations/{id:int}/decision")]
    public async Task<ActionResult<TaxDeclarationDto>> DecideDeclaration(int id, DeclarationDecisionRequest request, CancellationToken ct) =>
        Ok(await service.DecideDeclarationAsync(id, request, ct));

    /// <summary>Yearly tax under the new and old regime for the employee's current salary.</summary>
    [HttpPost("tax/compare")]
    public async Task<ActionResult<TaxCompareResult>> CompareRegimes(TaxCompareRequest request, CancellationToken ct) =>
        Ok(await service.CompareRegimesAsync(request, ct));

    // ---- Reimbursements ----------------------------------------------------------------------
    [HttpGet("reimbursements")]
    public async Task<ActionResult<IReadOnlyList<ReimbursementDto>>> GetClaims([FromQuery] string? employeeId, [FromQuery] string? status, CancellationToken ct) =>
        Ok(await service.GetReimbursementsAsync(employeeId, status, ct));

    [HttpPost("reimbursements")]
    public async Task<ActionResult<ReimbursementDto>> Claim(ClaimRequest request, CancellationToken ct) => Ok(await service.ClaimAsync(request, ct));

    [HttpPost("reimbursements/{id:int}/decision")]
    public async Task<ActionResult<ReimbursementDto>> DecideClaim(int id, ReimbursementDecisionRequest request, CancellationToken ct) =>
        Ok(await service.DecideReimbursementAsync(id, request, ct));

    [HttpPost("reimbursements/{id:int}/cancel")]
    public async Task<ActionResult<ReimbursementDto>> CancelClaim(int id, CancelClaimRequest request, CancellationToken ct) =>
        Ok(await service.CancelReimbursementAsync(id, request.EmployeeId, ct));
}
