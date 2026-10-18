using Moq;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Application.Modules.Employees.AddEmployee.Services;
using PeopleHub.Application.Modules.Employees.AddEmployee.Validators;

namespace PeopleHub.Application.Tests.Employees;

public sealed class AddEmployeeServiceTests
{
    private readonly Mock<IAddEmployeeRepository> repository = new();
    private readonly AddEmployeeService service;

    public AddEmployeeServiceTests()
    {
        service = new AddEmployeeService(repository.Object, new PersonalInfoValidator());
    }

    private static PersonalInfoRequest ValidPersonalInfo() => new()
    {
        Salutation = "Mr",
        FirstName = "Venkat",
        LastName = "Jangili",
        DateOfBirth = new DateTime(1995, 5, 10),
        DateOfJoining = new DateTime(2020, 1, 1),
        Gender = "Male",
        MaritalStatus = "Single",
        BloodGroup = "O+",
    };

    [Fact]
    public async Task PersonalInfo_without_first_name_is_rejected()
    {
        var request = ValidPersonalInfo() with { FirstName = null };

        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.SavePersonalInfoAsync(request, CancellationToken.None));

        Assert.Contains(nameof(PersonalInfoRequest.FirstName), error.Errors.Keys);
        repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task PersonalInfo_under_age_is_rejected()
    {
        var request = ValidPersonalInfo() with { DateOfBirth = DateTime.Today.AddYears(-10), DateOfJoining = DateTime.Today };

        var error = await Assert.ThrowsAsync<RequestValidationException>(
            () => service.SavePersonalInfoAsync(request, CancellationToken.None));

        Assert.Contains(nameof(PersonalInfoRequest.DateOfBirth), error.Errors.Keys);
    }

    [Fact]
    public async Task Valid_personal_info_is_saved()
    {
        var request = ValidPersonalInfo();
        repository
            .Setup(r => r.SavePersonalInfoAsync(request, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new SaveResponse(1, "EMP001", "ok"));

        var result = await service.SavePersonalInfoAsync(request, CancellationToken.None);

        Assert.Equal("EMP001", result.EmployeeId);
    }
}
