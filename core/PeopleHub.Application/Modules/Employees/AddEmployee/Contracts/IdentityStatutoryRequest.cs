namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Identity and Statutory step.</summary>
public sealed record IdentityStatutoryRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? PanNumber { get; init; }  // max 10
    public string? AadhaarNumber { get; init; }  // max 12
    public string? UanNumber { get; init; }  // max 12
    public string? PfAccountNumber { get; init; }  // max 22
    public string? EsiNumber { get; init; }  // max 17
    public List<IdentityDocumentItem> IdentityDocuments { get; init; } = [];
    public List<RepositoryDocumentItem> DocumentRepository { get; init; } = [];
}

/// <summary>Identity and Statutory: one row of IdentityDocuments.</summary>
public sealed record IdentityDocumentItem
{
    public int? Id { get; init; }  // empty = new row
    public string? DocumentType { get; init; }  // required, max 50
    public string? DocumentNumber { get; init; }  // required, max 50
    public string? NameOnDocument { get; init; }  // max 100
    public string? IssuingAuthority { get; init; }  // max 100
    public string? CountryOfIssue { get; init; }  // max 50
    public string? PlaceOfIssue { get; init; }  // max 100
    public DateTime? IssueDate { get; init; }
    public DateTime? ValidFrom { get; init; }
    public DateTime? ValidTo { get; init; }
    public string? VerificationStatus { get; init; }  // max 50
    public string? VerifiedBy { get; init; }  // max 50
    public string? FrontAttachLink { get; init; }  // max 50
    public string? BackAttachLink { get; init; }  // max 50
    public string? IdentificationDocumentRemarks { get; init; }  // max 500
}

/// <summary>Identity and Statutory: one row of DocumentRepository.</summary>
public sealed record RepositoryDocumentItem
{
    public int? Id { get; init; }  // empty = new row
    public string? GenericDocumentCategory { get; init; }  // max 50
    public string? GenericDocumentName { get; init; }  // max 100
    public string? GenericRelatedSection { get; init; }  // max 50
    public string? GenericRelatedRecordId { get; init; }  // max 50
    public string? GenericFileUpload { get; init; }  // max 50 (UI renders a text box today)
    public DateTime? GenericUploadDate { get; init; }
    public DateTime? GenericValidFrom { get; init; }
    public DateTime? GenericValidTo { get; init; }
    public string? GenericVerificationStatus { get; init; }  // max 50
    public string? GenericVerifiedBy { get; init; }  // max 50
    public string? GenericRemarks { get; init; }  // max 500
}
