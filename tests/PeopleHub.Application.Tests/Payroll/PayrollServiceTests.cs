using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Payroll.Contracts;
using PeopleHub.Application.Modules.Payroll.Interfaces;
using PeopleHub.Application.Modules.Payroll.Services;
using PeopleHub.Application.Modules.Payroll.Validators;

namespace PeopleHub.Application.Tests.Payroll;

public sealed class PayrollServiceTests
{
    private const int OrgId = 1;

    private readonly Mock<IPayrollRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly PayrollService service;

    public PayrollServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.IsAuthenticated).Returns(false);
        repository.Setup(r => r.GetSettingsAsync(OrgId, It.IsAny<CancellationToken>())).ReturnsAsync(PayrollCalculatorTests.Settings);
        repository.Setup(r => r.GetComponentsAsync(OrgId, It.IsAny<CancellationToken>())).ReturnsAsync(PayrollCalculatorTests.Components);
        repository.Setup(r => r.GetPtSlabsAsync("Telangana", It.IsAny<CancellationToken>())).ReturnsAsync(PayrollCalculatorTests.Slabs);
        service = new PayrollService(
            repository.Object,
            new PayrollSettingsValidator(),
            new SaveComponentsRequestValidator(),
            new PreviewStructureRequestValidator(),
            new SaveRevisionRequestValidator(),
            new CreateRunRequestValidator(),
            new AddAdjustmentRequestValidator(),
            new SetLopRequestValidator(),
            new SaveDeclarationRequestValidator(),
            new DeclarationDecisionRequestValidator(),
            new TaxCompareRequestValidator(),
            new ClaimRequestValidator(),
            new ReimbursementDecisionRequestValidator(),
            context.Object);
    }

    [Fact]
    public async Task Components_need_basic_and_one_balance()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() => service.SaveComponentsAsync(new SaveComponentsRequest
        {
            Components = [new() { Code = "HRA", Name = "HRA", CalcType = "Fixed", Value = 1000 }],
        }, CancellationToken.None));

        Assert.Contains(nameof(SaveComponentsRequest.Components), error.Errors.Keys);
        repository.Verify(r => r.SaveComponentsAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Process_computes_and_saves_every_payslip()
    {
        repository.Setup(r => r.GetRunsAsync(OrgId, null, 5, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new PayrollRunDto { Id = 5, Year = 2026, Month = 9, Status = "Draft" }]);
        repository.Setup(r => r.GetRunInputsAsync(OrgId, 5, It.IsAny<CancellationToken>())).ReturnsAsync(
        [
            new RunInputRow { EmployeeId = "EMP00001", EmployeeName = "Venkat", AnnualCtc = 900000, DaysInMonth = 30, PfApplicable = true },
            new RunInputRow { EmployeeId = "EMP00002", EmployeeName = "Polly", AnnualCtc = 480000, DaysInMonth = 30, PfApplicable = true },
        ]);
        string? saved = null;
        repository.Setup(r => r.SaveRunResultsAsync(OrgId, 5, It.IsAny<string>(), "anonymous", It.IsAny<CancellationToken>()))
            .Callback<int, int, string, string, CancellationToken>((_, _, json, _, _) => saved = json)
            .Returns(Task.CompletedTask);
        repository.Setup(r => r.GetPayslipsAsync(OrgId, 5, null, null, false, It.IsAny<CancellationToken>())).ReturnsAsync([]);

        await service.ProcessRunAsync(5, CancellationToken.None);

        var slips = PayrollJson.List<PayslipComputation>(saved);
        Assert.Equal(2, slips.Count);
        Assert.All(slips, s => Assert.True(s.NetPay > 0));
        Assert.Contains("\"employeeId\":\"EMP00001\"", saved);
    }

    [Fact]
    public async Task Locked_run_is_not_processed()
    {
        repository.Setup(r => r.GetRunsAsync(OrgId, null, 6, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new PayrollRunDto { Id = 6, Year = 2026, Month = 8, Status = "Locked" }]);

        await Assert.ThrowsAsync<BusinessRuleException>(() => service.ProcessRunAsync(6, CancellationToken.None));
        repository.Verify(r => r.GetRunInputsAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Rejecting_a_claim_needs_a_note()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.DecideReimbursementAsync(3, new ReimbursementDecisionRequest { Approve = false }, CancellationToken.None));
        Assert.Contains(nameof(ReimbursementDecisionRequest.Note), error.Errors.Keys);
    }

    [Fact]
    public async Task Claim_without_employee_is_a_validation_error()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() => service.ClaimAsync(new ClaimRequest
        {
            Category = "travel",
            ClaimDate = new DateTime(2026, 10, 10),
            Amount = 500,
            Description = "Cab to client office",
        }, CancellationToken.None));
        Assert.Contains("employeeId", error.Errors.Keys);
    }

    [Fact]
    public async Task Revision_that_breaks_the_structure_is_refused()
    {
        await Assert.ThrowsAsync<BusinessRuleException>(() => service.SaveRevisionAsync("EMP00003",
            new SaveRevisionRequest { AnnualCtc = 30000, EffectiveFrom = new DateTime(2026, 11, 1) }, CancellationToken.None));
        repository.Verify(r => r.SaveRevisionAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<decimal>(), It.IsAny<DateTime>(),
            It.IsAny<bool>(), It.IsAny<string?>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}
