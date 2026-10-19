using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Attendance.Contracts;
using PeopleHub.Application.Modules.Attendance.Interfaces;
using PeopleHub.Application.Modules.Attendance.Services;
using PeopleHub.Application.Modules.Attendance.Validators;

namespace PeopleHub.Application.Tests.Attendance;

public sealed class AttendanceServiceTests
{
    private const int OrgId = 1;
    private const string Emp = "EMP00001";

    private readonly Mock<IAttendanceRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly AttendanceService service;

    public AttendanceServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.IsAuthenticated).Returns(false);
        service = new AttendanceService(
            repository.Object,
            new CheckInRequestValidator(),
            new CheckOutRequestValidator(),
            new RegularizationRequestValidator(),
            new RegularizationDecisionRequestValidator(),
            context.Object);
    }

    private static RegularizationRequest ValidCorrection() => new()
    {
        EmployeeId = Emp,
        WorkDate = new DateTime(2026, 10, 16, 15, 0, 0),
        CheckIn = "9:40",
        CheckOut = "18:45",
        WorkMode = "office",
        Reason = "  Forgot to check out before leaving. ",
    };

    [Fact]
    public async Task Check_in_normalizes_mode_and_note()
    {
        repository
            .Setup(r => r.CheckInAsync(OrgId, Emp, "anonymous", "Remote", null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AttendanceActionResult("Checked in at 09:41.", new AttendanceDayDto { Status = "Working" }));

        var result = await service.CheckInAsync(new CheckInRequest { EmployeeId = " EMP00001 ", WorkMode = "remote", Note = "  " }, CancellationToken.None);

        Assert.Equal("Working", result.Today!.Status);
    }

    [Fact]
    public async Task Unknown_work_mode_never_reaches_the_database()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CheckInAsync(new CheckInRequest { EmployeeId = Emp, WorkMode = "Beach" }, CancellationToken.None));

        Assert.Contains(nameof(CheckInRequest.WorkMode), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Missing_employee_is_a_validation_error()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CheckOutAsync(new CheckOutRequest(), CancellationToken.None));

        Assert.Contains("employeeId", error.Errors.Keys);
    }

    [Fact]
    public async Task Authenticated_user_cannot_check_in_as_someone_else()
    {
        context.SetupGet(c => c.IsAuthenticated).Returns(true);
        context.SetupGet(c => c.UserId).Returns("EMP00002");
        repository
            .Setup(r => r.CheckInAsync(OrgId, "EMP00002", "EMP00002", "Office", null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AttendanceActionResult("ok", null));

        await service.CheckInAsync(new CheckInRequest { EmployeeId = Emp }, CancellationToken.None);

        repository.Verify(r => r.CheckInAsync(OrgId, "EMP00002", "EMP00002", "Office", null, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Days_default_to_the_current_month()
    {
        var first = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
        repository
            .Setup(r => r.GetDaysAsync(OrgId, Emp, first, first.AddMonths(1).AddDays(-1), It.IsAny<CancellationToken>()))
            .ReturnsAsync([new AttendanceDayDto { Status = "Present" }]);

        var days = await service.GetDaysAsync(Emp, null, null, CancellationToken.None);

        Assert.Single(days);
    }

    [Fact]
    public async Task Ranges_longer_than_three_months_are_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.GetDaysAsync(Emp, new DateTime(2026, 1, 1), new DateTime(2026, 6, 1), CancellationToken.None));
    }

    [Fact]
    public async Task Correction_check_out_must_be_after_check_in()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.RequestRegularizationAsync(ValidCorrection() with { CheckIn = "18:00", CheckOut = "09:00" }, CancellationToken.None));

        Assert.Contains(nameof(RegularizationRequest.CheckOut), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Correction_is_normalized_and_returned()
    {
        repository
            .Setup(r => r.RequestRegularizationAsync(OrgId, Emp, "anonymous", new DateTime(2026, 10, 16),
                new TimeSpan(9, 40, 0), new TimeSpan(18, 45, 0), "Office", "Forgot to check out before leaving.", It.IsAny<CancellationToken>()))
            .ReturnsAsync(7);
        repository
            .Setup(r => r.GetRegularizationsAsync(OrgId, null, null, 7, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new RegularizationDto { Id = 7, Status = "Pending" }]);

        var saved = await service.RequestRegularizationAsync(ValidCorrection(), CancellationToken.None);

        Assert.Equal(7, saved.Id);
    }

    [Fact]
    public async Task Rejecting_without_a_note_is_a_validation_error()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.DecideRegularizationAsync(3, new RegularizationDecisionRequest { Approve = false }, CancellationToken.None));

        Assert.Contains(nameof(RegularizationDecisionRequest.Note), error.Errors.Keys);
    }

    [Fact]
    public async Task Deciding_a_missing_request_is_404()
    {
        repository
            .Setup(r => r.DecideRegularizationAsync(OrgId, 99, true, null, "EMP00004", "anonymous", It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        await Assert.ThrowsAsync<NotFoundException>(() =>
            service.DecideRegularizationAsync(99, new RegularizationDecisionRequest { Approve = true, ApproverId = "EMP00004" }, CancellationToken.None));
    }

    [Fact]
    public async Task Unknown_status_filter_is_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.GetRegularizationsAsync(Emp, "Maybe", CancellationToken.None));
    }
}
