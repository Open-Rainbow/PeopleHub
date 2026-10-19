using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Holidays.Contracts;
using PeopleHub.Application.Modules.Holidays.Interfaces;
using PeopleHub.Application.Modules.Holidays.Services;
using PeopleHub.Application.Modules.Holidays.Validators;

namespace PeopleHub.Application.Tests.Holidays;

public sealed class HolidayServiceTests
{
    private const int OrgId = 1;

    private readonly Mock<IHolidayRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly HolidayService service;

    public HolidayServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        service = new HolidayService(repository.Object, new SaveHolidayRequestValidator(), context.Object);
    }

    private static SaveHolidayRequest Valid() => new()
    {
        Date = new DateTime(2026, 11, 9, 14, 30, 0),
        Name = "  Diwali (observed) ",
        Type = "festival",
        Description = " ",
    };

    [Fact]
    public async Task Missing_name_never_reaches_the_database()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CreateAsync(Valid() with { Name = " " }, CancellationToken.None));

        Assert.Contains(nameof(SaveHolidayRequest.Name), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Unknown_type_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CreateAsync(Valid() with { Type = "Bank" }, CancellationToken.None));

        Assert.Contains(nameof(SaveHolidayRequest.Type), error.Errors.Keys);
    }

    [Fact]
    public async Task Create_normalizes_and_returns_the_saved_holiday()
    {
        repository
            .Setup(r => r.SaveAsync(OrgId, "anonymous", null,
                It.Is<SaveHolidayRequest>(x => x.Name == "Diwali (observed)" && x.Type == "Festival"
                    && x.Description == null && x.Date == new DateTime(2026, 11, 9)),
                It.IsAny<CancellationToken>()))
            .ReturnsAsync(new HolidaySaveResult(12, 1));
        repository
            .Setup(r => r.GetByIdAsync(OrgId, 12, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new HolidayItemDto { Id = 12, Name = "Diwali (observed)" });

        var saved = await service.CreateAsync(Valid(), CancellationToken.None);

        Assert.Equal(12, saved.Id);
    }

    [Fact]
    public async Task Updating_a_missing_holiday_is_404()
    {
        repository
            .Setup(r => r.SaveAsync(OrgId, "anonymous", 99, It.IsAny<SaveHolidayRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new HolidaySaveResult(99, 0));

        await Assert.ThrowsAsync<NotFoundException>(() => service.UpdateAsync(99, Valid(), CancellationToken.None));
    }

    [Fact]
    public async Task Deleting_a_missing_holiday_is_404()
    {
        repository.Setup(r => r.DeleteAsync(OrgId, "anonymous", 5, It.IsAny<CancellationToken>())).ReturnsAsync(false);

        await Assert.ThrowsAsync<NotFoundException>(() => service.DeleteAsync(5, CancellationToken.None));
    }

    [Fact]
    public async Task Bad_year_is_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(() => service.GetAsync(1990, CancellationToken.None));
    }
}
