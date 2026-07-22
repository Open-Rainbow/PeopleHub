namespace PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;

public sealed record PersonalInfoSaveResponseDto
{
    public int? Id { get; init; }

    public string? EmployeeId { get; init; }

    public string? Message { get; init; }
}