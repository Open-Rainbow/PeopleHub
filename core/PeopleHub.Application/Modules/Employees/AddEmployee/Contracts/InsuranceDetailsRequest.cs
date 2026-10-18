namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Insurance and Benefits step.</summary>
public sealed record InsuranceDetailsRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public InsurancePolicyItem Policy { get; init; } = new();
    public NomineeItem Nominee { get; init; } = new();
}

/// <summary>Insurance and Benefits: Policy.</summary>
public sealed record InsurancePolicyItem
{
    public int? Id { get; init; }  // empty = insert
    public string? BenefitType { get; init; }  // required, max 50
    public string? ProviderName { get; init; }  // max 100
    public string? PolicyNumber { get; init; }  // max 50
    public DateTime? CoverageStartDate { get; init; }
    public DateTime? CoverageEndDate { get; init; }
    public bool EmployeeCovered { get; init; }
    public string? PremiumSharingType { get; init; }  // max 50
    public decimal? CoverageAmount { get; init; }
    public string? PolicyStatus { get; init; }  // max 50
    public string? InsuranceRemarks { get; init; }  // max 500
    public string? CoveredMemberName { get; init; }  // max 100
    public string? CoveredMemberRelationship { get; init; }  // max 50
    public decimal? SumInsuredAllocation { get; init; }
    public DateTime? MemberCoverageFrom { get; init; }
    public DateTime? MemberCoverageTo { get; init; }
    public string? LinkedFamilyOrDependentRecord { get; init; }  // max 50
    public string? InsuranceCardProofLink { get; init; }  // max 50
    public bool CoveredUnderPolicy { get; init; }
}

/// <summary>Insurance and Benefits: Nominee.</summary>
public sealed record NomineeItem
{
    public int? Id { get; init; }  // empty = insert
    public string? NomineeBenefitType { get; init; }  // required, max 50
    public string? NomineeName { get; init; }  // required, max 100
    public string? NomineeRelationship { get; init; }  // required, max 50
    public DateTime? NomineeDateOfBirth { get; init; }
    public string? NomineeContactNumber { get; init; }  // max 20
    public decimal? SharePercentage { get; init; }  // required, 0-100
    public int? NomineePriority { get; init; }
    public DateTime? NomineeEffectiveFrom { get; init; }
    public DateTime? NomineeEffectiveTo { get; init; }
    public bool MinorFlag { get; init; }
    public string? GuardianName { get; init; }  // max 100, required when MinorFlag
    public bool NomineeActive { get; init; }
    public string? NomineeBankName { get; init; }  // max 100
    public string? NomineeAccountNumber { get; init; }  // max 18
    public string? NomineeIfscCode { get; init; }  // max 11
    public string? NomineeAadhaarNumber { get; init; }  // max 12
    public string? NomineePanNumber { get; init; }  // max 10
    public string? LinkedFamilyOrDependentRecord { get; init; }  // UI config says max 10, confirm
    public string? ProofDocumentLink { get; init; }  // UI config says max 10, confirm
    public string? Address { get; init; }  // UI config says max 10, confirm
}
