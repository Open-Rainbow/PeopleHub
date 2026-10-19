using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.OrgChart.Contracts;
using PeopleHub.Application.Modules.OrgChart.Interfaces;
using PeopleHub.Application.Modules.OrgChart.Services;
using PeopleHub.Application.Modules.OrgChart.Validators;

namespace PeopleHub.Application.Tests.OrgChart;

public sealed class OrgChartServiceTests
{
    private const int OrgId = 1;

    private readonly Mock<IOrgChartRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly OrgChartService service;

    public OrgChartServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        service = new OrgChartService(repository.Object, new SetManagerRequestValidator(), context.Object);
    }

    [Fact]
    public async Task Returns_the_chart()
    {
        repository.Setup(r => r.GetAsync(OrgId, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new OrgChartNodeDto { EmployeeId = "EMP00006" }, new OrgChartNodeDto { EmployeeId = "EMP00004", ManagerId = "EMP00006" }]);

        var chart = await service.GetAsync(CancellationToken.None);

        Assert.Equal(2, chart.Count);
    }

    [Fact]
    public async Task Moving_someone_trims_ids_and_returns_the_fresh_chart()
    {
        repository.Setup(r => r.SetManagerAsync(OrgId, "EMP00003", "EMP00009", "anonymous", It.IsAny<CancellationToken>())).ReturnsAsync(true);
        repository.Setup(r => r.GetAsync(OrgId, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new OrgChartNodeDto { EmployeeId = "EMP00003", ManagerId = "EMP00009" }]);

        var chart = await service.SetManagerAsync(" EMP00003 ", new SetManagerRequest { ManagerId = " EMP00009 " }, CancellationToken.None);

        Assert.Equal("EMP00009", chart[0].ManagerId);
    }

    [Fact]
    public async Task Empty_manager_moves_to_the_top()
    {
        repository.Setup(r => r.SetManagerAsync(OrgId, "EMP00006", null, "anonymous", It.IsAny<CancellationToken>())).ReturnsAsync(true);
        repository.Setup(r => r.GetAsync(OrgId, It.IsAny<CancellationToken>())).ReturnsAsync([]);

        await service.SetManagerAsync("EMP00006", new SetManagerRequest { ManagerId = "  " }, CancellationToken.None);

        repository.Verify(r => r.SetManagerAsync(OrgId, "EMP00006", null, "anonymous", It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Reporting_to_yourself_never_reaches_the_database()
    {
        await Assert.ThrowsAsync<BusinessRuleException>(() =>
            service.SetManagerAsync("EMP00001", new SetManagerRequest { ManagerId = "emp00001" }, CancellationToken.None));

        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Unknown_employee_is_404()
    {
        repository.Setup(r => r.SetManagerAsync(OrgId, "EMP99999", "EMP00006", "anonymous", It.IsAny<CancellationToken>())).ReturnsAsync(false);

        await Assert.ThrowsAsync<NotFoundException>(() =>
            service.SetManagerAsync("EMP99999", new SetManagerRequest { ManagerId = "EMP00006" }, CancellationToken.None));
    }

    [Fact]
    public async Task Overlong_manager_id_is_a_validation_error()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.SetManagerAsync("EMP00001", new SetManagerRequest { ManagerId = new string('x', 51) }, CancellationToken.None));

        Assert.Contains(nameof(SetManagerRequest.ManagerId), error.Errors.Keys);
    }
}
