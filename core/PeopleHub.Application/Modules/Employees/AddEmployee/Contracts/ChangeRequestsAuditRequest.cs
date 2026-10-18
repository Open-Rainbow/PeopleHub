namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Change Requests and Audit step.</summary>
public sealed record ChangeRequestsAuditRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? ChangeRequestType { get; init; }  // max 100
    public string? RequestedBy { get; init; }  // max 100
    public string? AuditReference { get; init; }  // max 100
    public string? AuditRemarks { get; init; }  // max 1000
}
