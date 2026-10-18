using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using PeopleHub.Application;
using PeopleHub.Application.Abstractions.Messaging;
using PeopleHub.Application.Abstractions.Time;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Employees.Common;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;

namespace PeopleHub.Application.Tests.Employees;

/// <summary>Goes through the real dispatcher + pipeline, only the repository is mocked.</summary>
public sealed class SavePersonalInfoPipelineTests
{
    private readonly Mock<IPersonalInfoRepository> repository = new();
    private readonly IDispatcher dispatcher;

    public SavePersonalInfoPipelineTests()
    {
        var clock = new Mock<IDateTimeProvider>();
        clock.SetupGet(c => c.Today).Returns(new DateOnly(2026, 1, 1));
        clock.SetupGet(c => c.UtcNow).Returns(new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc));

        var services = new ServiceCollection();
        services.AddSingleton(typeof(ILogger<>), typeof(NullLogger<>));
        services.AddSingleton(clock.Object);
        services.AddSingleton(repository.Object);
        services.AddPeopleHubApplication();

        dispatcher = services.BuildServiceProvider()
            .CreateScope()
            .ServiceProvider
            .GetRequiredService<IDispatcher>();
    }

    [Fact]
    public async Task Rejects_missing_first_name()
    {
        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => dispatcher.SendAsync(new SavePersonalInfoCommand { LastName = "Jangili" }));

        Assert.Contains(nameof(SavePersonalInfoCommand.FirstName), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task Rejects_under_age_employee()
    {
        var command = new SavePersonalInfoCommand
        {
            FirstName = "Venkat",
            DateOfBirth = new DateTime(2015, 1, 1),
        };

        var error = await Assert.ThrowsAsync<RequestValidationException>(() => dispatcher.SendAsync(command));

        Assert.Contains(nameof(SavePersonalInfoCommand.DateOfBirth), error.Errors.Keys);
    }

    [Fact]
    public async Task Valid_command_reaches_repository()
    {
        var command = new SavePersonalInfoCommand
        {
            FirstName = "Venkat",
            LastName = "Jangili",
            DateOfBirth = new DateTime(1995, 5, 10),
            DateOfJoining = new DateTime(2020, 1, 1),
        };
        repository
            .Setup(r => r.SaveAsync(command, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new EmployeeSectionSaveResult(1, "EMP001", "ok"));

        var result = await dispatcher.SendAsync(command);

        Assert.Equal(1, result.Id);
        Assert.Equal("EMP001", result.EmployeeId);
    }
}
