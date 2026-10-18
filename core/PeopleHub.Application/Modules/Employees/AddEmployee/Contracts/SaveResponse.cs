namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Same response for every Add Employee step.</summary>
public sealed record SaveResponse(int? Id, string? EmployeeId, string Message);
