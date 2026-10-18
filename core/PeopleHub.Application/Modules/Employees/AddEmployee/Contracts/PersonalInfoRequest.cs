namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Personal Info step. Id empty = insert, Id set = update.</summary>
public sealed record PersonalInfoRequest
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

    /// <summary>Base64 or data-URI image.</summary>
    public string? EmployeePhoto { get; init; }
}
