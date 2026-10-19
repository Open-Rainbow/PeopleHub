using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Announcements.Contracts;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Application.Modules.Announcements.Services;
using PeopleHub.Application.Modules.Announcements.Validators;

namespace PeopleHub.Application.Tests.Announcements;

public sealed class AnnouncementServiceTests
{
    private const int OrgId = 1;

    private readonly Mock<IAnnouncementRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly AnnouncementService service;

    public AnnouncementServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.UserId).Returns("EMP00001");
        service = new AnnouncementService(repository.Object, new AnnouncementRequestValidator(), context.Object);
    }

    private static AnnouncementRequest Valid() => new()
    {
        Title = "Diwali celebrations",
        Description = "Sweets in the cafeteria at 4 PM.",
        Priority = "High",
        Category = "Celebration",
        Department = "All Departments",
        TargetAudience = "All Employees",
        PublishOn = DateTime.Today,
        ExpiresOn = DateTime.Today.AddDays(7),
    };

    [Fact]
    public async Task Missing_title_never_reaches_the_database()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CreateAsync(Valid() with { Title = " " }, CancellationToken.None));

        Assert.Contains(nameof(AnnouncementRequest.Title), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Expiry_before_publish_is_rejected()
    {
        var request = Valid() with { ExpiresOn = DateTime.Today.AddDays(-1) };

        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.UpdateAsync(5, request, CancellationToken.None));

        Assert.Contains(nameof(AnnouncementRequest.ExpiresOn), error.Errors.Keys);
    }

    [Fact]
    public async Task Unknown_priority_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CreateAsync(Valid() with { Priority = "Urgent" }, CancellationToken.None));

        Assert.Contains(nameof(AnnouncementRequest.Priority), error.Errors.Keys);
    }

    [Fact]
    public async Task Create_returns_the_saved_announcement()
    {
        var request = Valid();
        repository
            .Setup(r => r.SaveAsync(OrgId, "EMP00001", null, request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AnnouncementSaveResult(42, "Announcement published."));
        repository
            .Setup(r => r.GetByIdAsync(OrgId, "EMP00001", 42, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AnnouncementDto { Id = 42, Title = request.Title! });

        var created = await service.CreateAsync(request, CancellationToken.None);

        Assert.Equal(42, created.Id);
    }

    [Fact]
    public async Task Update_of_missing_announcement_is_404()
    {
        repository
            .Setup(r => r.SaveAsync(OrgId, "EMP00001", 99, It.IsAny<AnnouncementRequest>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new AnnouncementSaveResult(null, "Announcement not found."));

        await Assert.ThrowsAsync<NotFoundException>(
            () => service.UpdateAsync(99, Valid(), CancellationToken.None));
    }

    [Fact]
    public async Task Delete_of_missing_announcement_is_404()
    {
        repository
            .Setup(r => r.DeleteAsync(OrgId, "EMP00001", 7, It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        await Assert.ThrowsAsync<NotFoundException>(() => service.DeleteAsync(7, CancellationToken.None));
    }

    [Fact]
    public async Task Invalid_status_filter_is_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.GetListAsync(new AnnouncementQuery { Status = "Draft" }, CancellationToken.None));

        Assert.Contains(nameof(AnnouncementQuery.Status), error.Errors.Keys);
    }

    [Fact]
    public async Task Status_filter_is_normalized()
    {
        repository
            .Setup(r => r.GetListAsync(OrgId, "EMP00001", It.Is<AnnouncementQuery>(q => q.Status == "Active" && q.Search == null), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<AnnouncementDto>());

        var rows = await service.GetListAsync(new AnnouncementQuery { Status = "active", Search = "  " }, CancellationToken.None);

        Assert.Empty(rows);
    }

    [Fact]
    public async Task Mark_read_skips_empty_and_duplicate_ids()
    {
        await service.MarkReadAsync([0, 3, 3, -1], CancellationToken.None);

        repository.Verify(r => r.MarkReadAsync(OrgId, "EMP00001",
            It.Is<IReadOnlyList<int>>(ids => ids.Count == 1 && ids[0] == 3), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Missing_organization_is_forbidden()
    {
        context.SetupGet(c => c.OrganizationId).Returns((int?)null);

        await Assert.ThrowsAsync<ForbiddenException>(() => service.GetSummaryAsync(CancellationToken.None));
    }
}
