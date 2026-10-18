namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Education Details step.</summary>
public sealed record EducationDetailsRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<EducationItem> Educations { get; init; } = [];
    public List<CertificationItem> Certifications { get; init; } = [];
}

/// <summary>Education Details: one row of Educations.</summary>
public sealed record EducationItem
{
    public int? Id { get; init; }  // empty = new row
    public string? QualificationLevel { get; init; }  // required, max 50
    public string? DegreeOrCourseName { get; init; }  // required, max 100
    public string? SpecializationOrMajor { get; init; }  // max 100
    public string? InstitutionOrCollegeName { get; init; }  // required, max 150
    public string? UniversityOrBoardName { get; init; }  // max 150
    public string? ModeOfStudy { get; init; }  // max 50
    public DateTime? StartDate { get; init; }  // required
    public DateTime? EndDate { get; init; }
    public int? YearOfPassing { get; init; }  // required
    public string? GradePercentageOrCgpa { get; init; }  // max 10
    public string? HighestQualificationFlag { get; init; }  // max 5
    public string? EducationDocumentLink { get; init; }  // max 255
}

/// <summary>Education Details: one row of Certifications.</summary>
public sealed record CertificationItem
{
    public int? Id { get; init; }  // empty = new row
    public string? CertificationName { get; init; }  // max 100
    public string? IssuingOrganization { get; init; }  // max 100
    public string? CredentialId { get; init; }  // max 100
    public DateTime? IssueDate { get; init; }
    public DateTime? ValidFrom { get; init; }
    public DateTime? ValidTo { get; init; }
    public string? CertificationScoreOrGrade { get; init; }  // max 20
    public string? VerificationUrl { get; init; }  // max 255
    public string? AttachmentLink { get; init; }  // max 255
    public string? ActiveExpiredStatus { get; init; }  // max 20
}
