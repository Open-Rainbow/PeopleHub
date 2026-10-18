using PeopleHub.Application.Common.Utilities;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;

namespace PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.DTAs;

/// <summary>Data-transfer shape for the stored procedure: trimmed strings, decoded photo.</summary>
internal sealed record PersonalInfoDta
{
    public int? Id { get; init; }

    public string? EmployeeId { get; init; }

    public string? Salutation { get; init; }

    public string? FirstName { get; init; }

    public string? MiddleName { get; init; }

    public string? LastName { get; init; }

    public string? PreferredName { get; init; }

    public DateTime? DateOfBirth { get; init; }

    public DateTime? DateOfJoining { get; init; }

    public string? Gender { get; init; }

    public string? MaritalStatus { get; init; }

    public string? BloodGroup { get; init; }

    public string? Nationality { get; init; }

    public string? PlaceOfBirth { get; init; }

    public string? Religion { get; init; }

    public string? Category { get; init; }

    public byte[]? EmployeePhoto { get; init; }

    public string OperationType => Id is null or 0 ? "INS" : "UPD";

    public static PersonalInfoDta From(SavePersonalInfoCommand command) => new()
    {
        Id = command.Id,
        EmployeeId = Normalize(command.EmployeeId),
        Salutation = Normalize(command.Salutation),
        FirstName = Normalize(command.FirstName),
        MiddleName = Normalize(command.MiddleName),
        LastName = Normalize(command.LastName),
        PreferredName = Normalize(command.PreferredName),
        DateOfBirth = command.DateOfBirth,
        DateOfJoining = command.DateOfJoining,
        Gender = Normalize(command.Gender),
        MaritalStatus = Normalize(command.MaritalStatus),
        BloodGroup = Normalize(command.BloodGroup),
        Nationality = Normalize(command.Nationality),
        PlaceOfBirth = Normalize(command.PlaceOfBirth),
        Religion = Normalize(command.Religion),
        Category = Normalize(command.Category),
        EmployeePhoto = Base64Payload.TryDecode(command.EmployeePhoto),
    };

    private static string? Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
