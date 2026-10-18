namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Separation and Exit step.</summary>
public sealed record SeparationRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? SeparationType { get; init; }  // required, max 50
    public string? SeparationStatus { get; init; }  // required, max 50
    public string? ExitReason { get; init; }  // required, max 100
    public DateTime? InitiationDate { get; init; }  // required
    public DateTime? ResignationDate { get; init; }
    public DateTime? NoticeStartDate { get; init; }
    public DateTime? NoticeEndDate { get; init; }
    public DateTime? ProposedLastWorkingDay { get; init; }
    public DateTime? FinalLastWorkingDay { get; init; }  // required
    public bool RehireEligible { get; init; }
    public string? AttritionCategory { get; init; }  // max 50
    public string? ManagerClearanceStatus { get; init; }  // max 50
    public string? HrClearanceStatus { get; init; }  // max 50
    public bool ExitInterviewRequired { get; init; }
    public string? ExitInterviewStatus { get; init; }  // max 50
    public bool KnowledgeTransferRequired { get; init; }
    public string? KnowledgeTransferStatus { get; init; }  // max 50
    public decimal? LeaveBalanceAtExit { get; init; }  // days, can be half days
    public bool GratuityEligible { get; init; }
    public string? FinalSettlementStatus { get; init; }  // max 50
    public DateTime? OfficialEmailDisableDate { get; init; }
    public string? ApplicationAccessRevokeStatus { get; init; }  // max 50
    public string? DetailedExitRemarks { get; init; }  // max 1000
}
