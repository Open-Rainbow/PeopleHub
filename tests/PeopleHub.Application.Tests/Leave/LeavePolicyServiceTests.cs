using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Application.Modules.Leave.Services;
using PeopleHub.Application.Modules.Leave.Validators;

namespace PeopleHub.Application.Tests.Leave;

public sealed class LeavePolicyServiceTests
{
    private const int OrgId = 1;
    private const string FullTime = "Full Time";

    private readonly Mock<ILeavePolicyRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly LeavePolicyService service;

    public LeavePolicyServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.IsAuthenticated).Returns(false);
        service = new LeavePolicyService(
            repository.Object,
            new SaveLeavePolicyRequestValidator(),
            new LeavePolicyKeyValidator(),
            new CopyLeavePolicyRequestValidator(),
            context.Object);
    }

    private static LeavePolicyItemDto Earned() => new()
    {
        Code = "earned",
        Label = "Earned Leave",
        Category = "standard",
        AnnualAllowance = 12,
        CarryForwardDays = 5,
        IsPaid = true,
        AllowanceBasis = "Yearly",
        ApprovalType = "Manager",
    };

    private static SaveLeavePolicyRequest Policy(params LeavePolicyItemDto[] items) =>
        new() { Year = 2026, EmploymentType = FullTime, Items = items };

    private async Task<RequestValidationException> Invalid(SaveLeavePolicyRequest request)
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() => service.SaveDraftAsync(request, CancellationToken.None));
        repository.Verify(
            r => r.SaveDraftAsync(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<SaveLeavePolicyRequest>(), It.IsAny<CancellationToken>()),
            Times.Never);
        return error;
    }

    [Fact]
    public async Task Carry_forward_above_allowance_is_rejected()
        => await Invalid(Policy(Earned() with { CarryForwardDays = 20 }));

    [Fact]
    public async Task Paid_leave_without_allowance_is_rejected()
        => await Invalid(Policy(Earned() with { AnnualAllowance = null }));

    [Fact]
    public async Task Certificate_without_days_is_rejected()
        => await Invalid(Policy(Earned() with { CertificateRequired = true, CertificateAfterDays = null }));

    [Fact]
    public async Task Duplicate_names_are_rejected()
        => await Invalid(Policy(Earned(), Earned() with { Code = null, Label = "earned leave" }));

    [Fact]
    public async Task Unpaid_encashable_is_rejected()
        => await Invalid(Policy(Earned() with { IsPaid = false, AnnualAllowance = null, CarryForwardDays = 0, IsEncashable = true }));

    [Fact]
    public async Task Unknown_approval_is_rejected()
        => await Invalid(Policy(Earned() with { ApprovalType = "CEO" }));

    [Fact]
    public async Task Unlimited_unpaid_leave_is_allowed_and_new_codes_are_generated()
    {
        SaveLeavePolicyRequest? sent = null;
        repository
            .Setup(r => r.SaveDraftAsync(OrgId, "anonymous", It.IsAny<SaveLeavePolicyRequest>(), It.IsAny<CancellationToken>()))
            .Callback<int, string, SaveLeavePolicyRequest, CancellationToken>((_, _, r, _) => sent = r)
            .ReturnsAsync(new LeavePolicySaveResult(7, "Draft saved"));
        repository
            .Setup(r => r.GetPolicyAsync(OrgId, 2026, FullTime, "Draft", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LeavePolicyHeader { Id = 7, Year = 2026, EmploymentType = FullTime, Status = "Draft", Version = 2 });
        repository
            .Setup(r => r.GetItemsAsync(OrgId, 7, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LeavePolicyItemDto>());

        var unpaid = new LeavePolicyItemDto
        {
            Label = "  Bereavement Leave ", Category = "Additional", AnnualAllowance = null, IsPaid = false,
            AllowanceBasis = "yearly", ApprovalType = "manager + hr",
        };
        var result = await service.SaveDraftAsync(Policy(Earned(), unpaid) with { EmploymentType = " Full Time " }, CancellationToken.None);

        Assert.Equal("Draft", result.Status);
        Assert.NotNull(sent);
        Assert.Equal(FullTime, sent!.EmploymentType);
        var item = sent.Items[1];
        Assert.Equal("bereavement-leave", item.Code);
        Assert.Equal("Bereavement Leave", item.Label);
        Assert.Equal("additional", item.Category);
        Assert.Equal("Manager + HR", item.ApprovalType);
        Assert.Equal("Yearly", item.AllowanceBasis);
    }

    [Fact]
    public async Task No_saved_policy_returns_the_defaults()
    {
        repository
            .Setup(r => r.GetPolicyAsync(OrgId, 2027, FullTime, null, It.IsAny<CancellationToken>()))
            .ReturnsAsync((LeavePolicyHeader?)null);
        repository
            .Setup(r => r.GetItemsAsync(OrgId, null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LeavePolicyItemDto> { Earned() });

        var policy = await service.GetCurrentAsync(2027, FullTime, null, CancellationToken.None);

        Assert.Equal("None", policy.Status);
        Assert.Single(policy.Items);
        Assert.Empty(policy.PublishedItems);
    }

    [Fact]
    public async Task Draft_comes_with_the_published_items_for_comparison()
    {
        repository
            .Setup(r => r.GetPolicyAsync(OrgId, 2026, FullTime, null, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LeavePolicyHeader { Id = 8, Status = "Draft", HasPublished = true, PublishedVersion = 1 });
        repository
            .Setup(r => r.GetPolicyAsync(OrgId, 2026, FullTime, "Published", It.IsAny<CancellationToken>()))
            .ReturnsAsync(new LeavePolicyHeader { Id = 3, Status = "Published" });
        repository.Setup(r => r.GetItemsAsync(OrgId, 8, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LeavePolicyItemDto> { Earned() with { AnnualAllowance = 15 } });
        repository.Setup(r => r.GetItemsAsync(OrgId, 3, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new List<LeavePolicyItemDto> { Earned() });

        var policy = await service.GetCurrentAsync(2026, FullTime, null, CancellationToken.None);

        Assert.Equal(15m, policy.Items[0].AnnualAllowance);
        Assert.Equal(12m, policy.PublishedItems[0].AnnualAllowance);
    }

    [Fact]
    public async Task Discarding_a_missing_draft_is_404()
    {
        repository
            .Setup(r => r.DiscardDraftAsync(OrgId, "anonymous", 2026, FullTime, It.IsAny<CancellationToken>()))
            .ReturnsAsync(0);

        await Assert.ThrowsAsync<NotFoundException>(
            () => service.DiscardDraftAsync(new LeavePolicyKey { Year = 2026, EmploymentType = FullTime }, CancellationToken.None));
    }

    [Fact]
    public async Task Copy_to_the_same_year_is_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(
            () => service.CopyAsync(new CopyLeavePolicyRequest { SourceYear = 2026, TargetYear = 2026 }, CancellationToken.None));
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Bad_status_filter_is_rejected()
    {
        await Assert.ThrowsAsync<RequestValidationException>(
            () => service.GetCurrentAsync(2026, FullTime, "Archived", CancellationToken.None));
    }
}
