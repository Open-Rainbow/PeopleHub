using PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;

namespace PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.DTAs;

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

    public string EmployeeName => string.Join(
        " ",
        new[] { Salutation, FirstName, MiddleName, LastName }
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value!.Trim()));

    public static PersonalInfoDta From(PersonalInfoSaveRequestDto request)
    {
        return new PersonalInfoDta
        {
            Id = request.Id,
            EmployeeId = Normalize(request.EmployeeId),
            Salutation = Normalize(request.Salutation),
            FirstName = Normalize(request.FirstName),
            MiddleName = Normalize(request.MiddleName),
            LastName = Normalize(request.LastName),
            PreferredName = Normalize(request.PreferredName),
            DateOfBirth = request.DateOfBirth,
            DateOfJoining = request.DateOfJoining,
            Gender = Normalize(request.Gender),
            MaritalStatus = Normalize(request.MaritalStatus),
            BloodGroup = Normalize(request.BloodGroup),
            Nationality = Normalize(request.Nationality),
            PlaceOfBirth = Normalize(request.PlaceOfBirth),
            Religion = Normalize(request.Religion),
            Category = Normalize(request.Category),
            EmployeePhoto = DecodeEmployeePhoto(request.EmployeePhoto),
        };
    }

    private static string? Normalize(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    private static byte[]? DecodeEmployeePhoto(string? employeePhoto)
    {
        if (string.IsNullOrWhiteSpace(employeePhoto))
        {
            return null;
        }

        var base64Index = employeePhoto.IndexOf("base64,", StringComparison.OrdinalIgnoreCase);
        var base64Value = base64Index >= 0
            ? employeePhoto[(base64Index + "base64,".Length)..]
            : employeePhoto;

        try
        {
            return Convert.FromBase64String(base64Value);
        }
        catch (FormatException)
        {
            return null;
        }
    }
}