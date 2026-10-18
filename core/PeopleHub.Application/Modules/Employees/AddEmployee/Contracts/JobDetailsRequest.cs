namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Employment Details step.</summary>
public sealed record JobDetailsRequest
{
    public string? EmployeeId { get; init; }  // required, max 20
    public int? Id { get; init; }  // empty = insert
    public string? OfficeEmail { get; init; }  // required, max 50
    public DateTime? DateOfJoining { get; init; }  // required
    public string? EmploymentStatus { get; init; }  // required, max 50
    public string? EmployeeType { get; init; }  // required, max 20
    public string? Department { get; init; }  // required, max 30
    public string? BusinessUnit { get; init; }  // max 50
    public string? Designation { get; init; }  // required, max 30
    public string? PayLevel { get; init; }  // required, max 20
    public string? WorkLocation { get; init; }  // required, max 50
    public string? ReportingManager { get; init; }  // required, max 50
    public string? DottedLineManager { get; init; }  // max 50
    public string? ShiftTimings { get; init; }  // required, max 30
    public string? WorkSchedule { get; init; }  // max 50
    public DateTime? ProbationStartDate { get; init; }
    public DateTime? ProbationEndDate { get; init; }
    public DateTime? ConfirmationDate { get; init; }
    public string? CostCenter { get; init; }  // max 50
    public string? EmployeeCategory { get; init; }  // max 50
    public string? HrOwner { get; init; }  // max 50
}
