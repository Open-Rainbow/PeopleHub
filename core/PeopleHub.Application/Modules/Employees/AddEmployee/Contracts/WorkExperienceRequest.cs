namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Previous Employment step.</summary>
public sealed record WorkExperienceRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<WorkExperienceItem> WorkExperiences { get; init; } = [];
}

/// <summary>Previous Employment: one row of WorkExperiences.</summary>
public sealed record WorkExperienceItem
{
    public int? Id { get; init; }  // empty = new row
    public string? EmployerName { get; init; }  // max 100
    public string? EmployerLocation { get; init; }  // max 100
    public string? Designation { get; init; }  // max 100
    public string? EmploymentType { get; init; }  // max 50
    public DateTime? StartDate { get; init; }  // required
    public DateTime? EndDate { get; init; }
    public decimal? TotalExperience { get; init; }  // years, auto-calculated in UI
    public string? PreviousEmployerPfAccountNumber { get; init; }  // max 50
    public string? ManagerName { get; init; }  // max 100
    public decimal? LastDrawnSalary { get; init; }
    public string? ReasonForLeaving { get; init; }  // max 500
    public string? SkillsUsed { get; init; }  // max 500
    public string? ExperienceLetterLink { get; init; }  // max 500
    public string? RelievingLetterLink { get; init; }  // max 500
    public string? PayslipLink { get; init; }  // max 500
}
