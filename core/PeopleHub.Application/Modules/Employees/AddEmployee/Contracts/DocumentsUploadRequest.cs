namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Employee Documents step. File fields are base64 / data-URI strings.</summary>
public sealed record DocumentsUploadRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? EmployeePhoto { get; init; }  // required, file
    public string? EmployeePanNumber { get; init; }  // required, max 50
    public string? EmployeePan { get; init; }  // required, file
    public string? EmployeeAadhaarNumber { get; init; }  // required, max 50
    public string? EmployeeAadhaar { get; init; }  // required, file
    public string? EmployeePassportNumber { get; init; }  // required, max 50
    public string? EmployeePassport { get; init; }  // required, file
    public string? Last6MonthsBankStatements { get; init; }  // required, file
    public string? Last3MonthsPayslips { get; init; }  // required, file
    public string? ExperienceLetter { get; init; }  // required, file
    public string? RelievingLetter { get; init; }  // required, file
    public string? OfferLetter { get; init; }  // required, file
}
