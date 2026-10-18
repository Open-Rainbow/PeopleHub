namespace PeopleHub.Application.Modules.Employees.Common;

/// <summary>Returned by every Add Employee step save.</summary>
public sealed record EmployeeSectionSaveResult(int? Id, string? EmployeeId, string Message);
