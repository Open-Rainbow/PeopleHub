namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Skills and Competencies step.</summary>
public sealed record SkillsRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<SkillItem> Skills { get; init; } = [];
}

/// <summary>Skills and Competencies: one row of Skills.</summary>
public sealed record SkillItem
{
    public int? Id { get; init; }  // empty = new row
    public string? SkillName { get; init; }  // required, max 100
    public string? SkillCategory { get; init; }  // max 50
    public string? ProficiencyLevel { get; init; }  // max 50
    public int? YearsOfExperience { get; init; }
    public int? LastUsedYear { get; init; }
    public string? LinkedCertification { get; init; }  // max 100
    public bool PrimarySkill { get; init; }
    public string? Remarks { get; init; }  // max 500
}
