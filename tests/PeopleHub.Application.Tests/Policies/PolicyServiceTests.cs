using Moq;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Policies.Contracts;
using PeopleHub.Application.Modules.Policies.Interfaces;
using PeopleHub.Application.Modules.Policies.Services;
using PeopleHub.Application.Modules.Policies.Validators;

namespace PeopleHub.Application.Tests.Policies;

public sealed class PolicyServiceTests
{
    private const int OrgId = 1;
    private const string Pdf = "data:application/pdf;base64,JVBERi0xLjQK"; // "%PDF-1.4\n"

    private readonly Mock<IPolicyRepository> repository = new();
    private readonly Mock<IRequestContext> context = new();
    private readonly PolicyService service;

    public PolicyServiceTests()
    {
        context.SetupGet(c => c.OrganizationId).Returns(OrgId);
        context.SetupGet(c => c.IsAuthenticated).Returns(false);
        service = new PolicyService(repository.Object, new SavePolicyRequestValidator(), new SetPolicyStatusRequestValidator(), context.Object);
    }

    private void ReturnsPolicy(int id) =>
        repository.Setup(r => r.GetAsync(OrgId, null, true, null, null, null, id, It.IsAny<CancellationToken>()))
            .ReturnsAsync([new PolicyDto { Id = id, Title = "Floor and desk management", Status = "Draft" }]);

    [Fact]
    public async Task Upload_is_decoded_and_typed_from_the_extension()
    {
        PolicyFilePayload? saved = null;
        repository.Setup(r => r.SaveAsync(OrgId, null, It.IsAny<SavePolicyRequest>(), "replace", It.IsAny<PolicyFilePayload?>(), "anonymous", It.IsAny<CancellationToken>()))
            .Callback<int, int?, SavePolicyRequest, string, PolicyFilePayload?, string, CancellationToken>((_, _, _, _, f, _, _) => saved = f)
            .ReturnsAsync(9);
        ReturnsPolicy(9);

        await service.CreateAsync(new SavePolicyRequest
        {
            Title = "  Floor and desk management ",
            Category = "workplace",
            File = new PolicyFileInput { FileName = @"C:\fakepath\desk-policy.PDF", ContentType = "text/html", Data = Pdf },
        }, CancellationToken.None);

        Assert.NotNull(saved);
        Assert.Equal("desk-policy.PDF", saved!.FileName);
        Assert.Equal("application/pdf", saved.ContentType);
        Assert.Equal("%PDF-1.4\n"u8.ToArray(), saved.Data);
    }

    [Fact]
    public async Task New_policy_needs_text_or_a_file()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.CreateAsync(new SavePolicyRequest { Title = "Parking", Category = "Workplace" }, CancellationToken.None));
        Assert.Contains(nameof(SavePolicyRequest.Content), error.Errors.Keys);
    }

    [Fact]
    public async Task Executables_are_rejected()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() => service.CreateAsync(new SavePolicyRequest
        {
            Title = "Setup",
            Category = "IT & Security",
            File = new PolicyFileInput { FileName = "setup.exe", Data = Pdf },
        }, CancellationToken.None));
        Assert.Contains("File.FileName", error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Update_without_a_new_file_keeps_or_removes_the_old_one()
    {
        ReturnsPolicy(3);
        var request = new SavePolicyRequest { Title = "Work from home", Category = "HR", Content = "Two days a week.", RemoveFile = true };

        await service.UpdateAsync(3, request, CancellationToken.None);

        repository.Verify(r => r.SaveAsync(OrgId, 3, It.IsAny<SavePolicyRequest>(), "remove", null, "anonymous", It.IsAny<CancellationToken>()));
    }

    [Fact]
    public async Task Employees_must_say_who_they_are()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.GetPoliciesAsync(null, false, null, null, null, CancellationToken.None));
        Assert.Contains("employeeId", error.Errors.Keys);
    }

    [Fact]
    public async Task Employees_never_filter_by_status()
    {
        repository.Setup(r => r.GetAsync(OrgId, "EMP00001", false, null, "Workplace", null, null, It.IsAny<CancellationToken>())).ReturnsAsync([]);

        await service.GetPoliciesAsync("EMP00001", false, "Draft", "workplace", " ", CancellationToken.None);

        repository.Verify(r => r.GetAsync(OrgId, "EMP00001", false, null, "Workplace", null, null, It.IsAny<CancellationToken>()));
    }

    [Fact]
    public async Task Unknown_status_is_a_validation_error()
    {
        await Assert.ThrowsAsync<RequestValidationException>(() =>
            service.SetStatusAsync(1, new SetPolicyStatusRequest { Status = "Deleted" }, CancellationToken.None));
    }

    [Fact]
    public async Task Missing_file_is_not_found()
    {
        repository.Setup(r => r.GetFileAsync(OrgId, 4, "EMP00001", false, It.IsAny<CancellationToken>())).ReturnsAsync((PolicyFileDto?)null);
        await Assert.ThrowsAsync<NotFoundException>(() => service.GetFileAsync(4, "EMP00001", false, CancellationToken.None));
    }
}
