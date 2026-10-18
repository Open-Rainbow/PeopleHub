namespace PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

/// <summary>Contact Details step.</summary>
public sealed record ContactInfoRequest
{
    public string? EmployeeId { get; init; }  // required, from Personal Info save
    public int? Id { get; init; }  // empty = insert
    public string? PersonalMail { get; init; }  // required, max 100
    public string? AlternateMail { get; init; }  // max 100
    public string? MobileNumber { get; init; }  // required, max 15
    public string? AlternateMobile { get; init; }  // max 15
    public string? LandlineNumber { get; init; }  // max 20
    public string? OfficialEmail { get; init; }  // max 100
    public string? LinkedinUrl { get; init; }  // max 200
    public List<AddressItem> Addresses { get; init; } = [];
    public List<EmergencyContactItem> EmergencyContacts { get; init; } = [];
}

/// <summary>Contact Details: one row of Addresses.</summary>
public sealed record AddressItem
{
    public int? Id { get; init; }  // empty = new row
    public string? AddressType { get; init; }  // required, max 50
    public string? HouseNumber { get; init; }  // max 50
    public string? StreetName { get; init; }  // max 100
    public string? Landmark { get; init; }  // max 100
    public string? Colony { get; init; }  // max 100
    public string? Area { get; init; }  // max 100
    public DateTime? EffectiveFrom { get; init; }
    public DateTime? EffectiveTo { get; init; }
    public string? AddressProofLink { get; init; }  // max 250
    public string? City { get; init; }  // required, max 100
    public string? District { get; init; }  // max 100
    public string? StateProvince { get; init; }  // required, max 100
    public string? Country { get; init; }  // required, max 50
    public string? Pincode { get; init; }  // required, max 10
    public bool CheckToggle { get; init; }  // "Same as another address"
}

/// <summary>Contact Details: one row of EmergencyContacts.</summary>
public sealed record EmergencyContactItem
{
    public int? Id { get; init; }  // empty = new row
    public string? ContactName { get; init; }  // required, max 100
    public string? ContactNumber { get; init; }  // required, max 15
    public string? Relation { get; init; }  // required, max 50
    public string? EmergencyAlternateNumber { get; init; }  // max 15
    public string? EmergencyEmail { get; init; }  // max 100
    public string? Remarks { get; init; }  // max 500
    public string? EmergencyAddress { get; init; }  // max 300
    public bool PriorityOrder { get; init; }  // UI renders a checkbox today
    public bool PrimaryEmergencyContact { get; init; }
}
