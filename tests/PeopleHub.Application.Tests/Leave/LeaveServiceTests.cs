using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Application.Modules.Leave.Services;
using PeopleHub.Application.Modules.Leave.Validators;

namespace PeopleHub.Application.Tests.Leave;

public sealed class LeaveServiceTests
{
    private const int OrgId = 1;
    private const string Emp = "EMP00001";

    private readonly Mock<ILeaveRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly LeaveService service;

    public LeaveServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.IsAuthenticated).Returns(false);
        service = new LeaveService(repository.Object, new ApplyLeaveRequestValidator(), new LeaveDecisionRequestValidator(), context.Object);
    }

    private static ApplyLeaveRequest Valid() => new()
    {
        EmployeeId = Emp,
        LeaveType = "Earned",
        FromDate = DateTime.Today.AddDays(10),
        ToDate = DateTime.Today.AddDays(11),
        DayPart = "full",
        Reason = "Family function",
    };

    [Fact]
    public async Task Short_reason_never_reaches_the_database()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.ApplyAsync(Valid() with { Reason = "abc" }, CancellationToken.None));

        Assert.Contains(nameof(ApplyLeaveRequest.Reason), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Reversed_dates_are_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.ApplyAsync(Valid() with { ToDate = DateTime.Today }, CancellationToken.None));

        Assert.Contains(nameof(ApplyLeaveRequest.ToDate), error.Errors.Keys);
    }

    [Fact]
    public async Task Half_day_over_two_dates_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.ApplyAsync(Valid() with { DayPart = "first-half" }, CancellationToken.None));

        Assert.Contains(nameof(ApplyLeaveRequest.DayPart), error.Errors.Keys);
    }

    [Fact]
    public async Task Unknown_leave_type_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.ApplyAsync(Valid() with { LeaveType = "vacation" }, CancellationToken.None));

        Assert.Contains(nameof(ApplyLeaveRequest.LeaveType), error.Errors.Keys);
    }

    [Fact]
    public async Task Missing_employee_is_rejected_when_not_logged_in()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.ApplyAsync(Valid() with { EmployeeId = null }, CancellationToken.None));

        Assert.Contains("employeeId", error.Errors.Keys);
    }

    [Fact]
    public async Task Logged_in_user_overrides_the_employee_in_the_body()
    {
        context.SetupGet(c => c.IsAuthenticated).Returns(true);
        context.SetupGet(c => c.UserId).Returns("EMP00002");
        repository
            .Setup(r => r.GetRequestsAsync(OrgId, "EMP00002", null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LeaveRequestDto>());

        await service.GetRequestsAsync(Emp, null, CancellationToken.None);

        repository.Verify(r => r.GetRequestsAsync(OrgId, "EMP00002", null, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Apply_normalizes_and_returns_the_saved_request()
    {
        repository
            .Setup(r => r.ApplyAsync(OrgId, Emp, "anonymous",
                It.Is<ApplyLeaveRequest>(x => x.LeaveType == "earned" && x.Reason == "Family function"), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LeaveApplyResult(9, "ok"));
        repository
            .Setup(r => r.GetRequestAsync(OrgId, 9, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LeaveRequestDto { Id = 9, Status = "Pending" });

        var created = await service.ApplyAsync(Valid() with { Reason = "  Family function  " }, CancellationToken.None);

        Assert.Equal(9, created.Id);
    }

    [Fact]
    public async Task Withdraw_of_missing_request_is_404()
    {
        repository
            .Setup(r => r.WithdrawAsync(OrgId, Emp, "anonymous", 5, It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        await Assert.ThrowsAsync<NotFoundException>(() => service.WithdrawAsync(5, Emp, CancellationToken.None));
    }

    [Fact]
    public async Task Reject_without_note_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.DecideAsync(5, new LeaveDecisionRequest { Approve = false }, CancellationToken.None));

        Assert.Contains(nameof(LeaveDecisionRequest.Note), error.Errors.Keys);
    }

    [Fact]
    public async Task Invalid_status_filter_is_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(
            () => service.GetRequestsAsync(Emp, "Draft", CancellationToken.None));
    }
}
