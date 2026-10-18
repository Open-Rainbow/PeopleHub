namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Assets and Compliance step.</summary>
public sealed record AssetsRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public List<SystemAccessItem> SystemAccess { get; init; } = [];
    public List<AssetItem> Assets { get; init; } = [];
}

/// <summary>Assets and Compliance: one row of SystemAccess.</summary>
public sealed record SystemAccessItem
{
    public int? Id { get; init; }  // empty = new row
    public string? ApplicationOrSystemName { get; init; }  // required, max 150
    public string? UsernameOrLoginId { get; init; }  // required, max 100
    public string? RoleOrAccessProfile { get; init; }  // max 100
    public DateTime? AccessStartDate { get; init; }
    public DateTime? AccessEndDate { get; init; }
    public string? AccountStatus { get; init; }  // max 50
    public bool PasswordSetupRequired { get; init; }
    public bool TemporaryPasswordIssuedFlag { get; init; }
    public bool PasswordResetRequired { get; init; }
    public bool MfaEnabled { get; init; }
    public DateTime? LastLogin { get; init; }
    public string? AccessApprovalReference { get; init; }  // max 100
}

/// <summary>Assets and Compliance: one row of Assets.</summary>
public sealed record AssetItem
{
    public int? Id { get; init; }  // empty = new row
    public string? AssetAssignmentId { get; init; }  // max 50, server generated
    public string? AssetType { get; init; }  // required, max 50
    public string? AssetCategory { get; init; }  // max 50
    public string? AssetName { get; init; }  // required, max 150
    public string? AssetSerialNumber { get; init; }  // max 100
    public string? MakeBrand { get; init; }  // max 100
    public string? Model { get; init; }  // max 100
    public string? ConfigurationDetails { get; init; }  // max 1000
    public string? TagNumber { get; init; }  // max 100
    public string? OwnershipType { get; init; }  // max 50
    public DateTime? IssuedDate { get; init; }  // required
    public string? IssuedBy { get; init; }  // max 150
    public string? IssueLocation { get; init; }  // max 150
    public bool EmployeeAcknowledgement { get; init; }
    public DateTime? AcknowledgementDate { get; init; }
    public string? AssetConditionAtIssue { get; init; }  // max 50
    public DateTime? WarrantyStartDate { get; init; }
    public DateTime? WarrantyEndDate { get; init; }
    public bool InsuranceCovered { get; init; }
    public decimal? AssetValue { get; init; }
    public bool SecurityDepositApplicable { get; init; }
    public decimal? DepositAmount { get; init; }
    public string? AssetRemarks { get; init; }  // max 500
}
