namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Family and Dependents step.</summary>
public sealed record FamilyDetailsRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<FamilyMemberItem> FamilyMembers { get; init; } = [];
    public List<DependentItem> Dependents { get; init; } = [];
}

/// <summary>Family and Dependents: one row of FamilyMembers.</summary>
public sealed record FamilyMemberItem
{
    public int? Id { get; init; }  // empty = new row
    public string? MemberName { get; init; }  // required, max 100
    public string? MemberRelationship { get; init; }  // required, max 50
    public string? MemberGender { get; init; }  // max 50
    public DateTime? MemberDateOfBirth { get; init; }
    public string? MemberMaritalStatus { get; init; }  // max 50
    public string? MemberOccupation { get; init; }  // max 100
    public string? MemberContactNumber { get; init; }  // max 20
    public bool LivesWithEmployee { get; init; }
    public string? MemberNotes { get; init; }  // max 500
    public string? MemberEmail { get; init; }  // max 500
    public bool AddressSameAsEmployee { get; init; }
}

/// <summary>Family and Dependents: one row of Dependents.</summary>
public sealed record DependentItem
{
    public int? Id { get; init; }  // empty = new row
    public string? DependentName { get; init; }  // required, max 100
    public string? DependentRelationship { get; init; }  // required, max 50
    public DateTime? DependentDateOfBirth { get; init; }  // required
    public string? DependentGender { get; init; }  // max 50
    public bool FinanciallyDependent { get; init; }
    public bool StudentStatus { get; init; }
    public bool DisabilityStatus { get; init; }
    public DateTime? DependencyStartDate { get; init; }
    public bool EligibleForBenefits { get; init; }
    public string? DependentRemarks { get; init; }  // max 500
    public string? LinkedFamilyRecord { get; init; }  // max 500
    public decimal? MonthlyIncomeOrPension { get; init; }
    public DateTime? DependencyEndDate { get; init; }
    public string? ProofDocumentLink { get; init; }  // max 500
}
