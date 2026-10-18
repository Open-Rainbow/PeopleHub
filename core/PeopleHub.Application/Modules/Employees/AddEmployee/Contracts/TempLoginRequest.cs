namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>System Access (temporary login) step.</summary>
public sealed record TempLoginRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? TemporaryUsername { get; init; }  // required, max 50
    public string? TemporaryPassword { get; init; }  // required, max 50, hash before saving
}
