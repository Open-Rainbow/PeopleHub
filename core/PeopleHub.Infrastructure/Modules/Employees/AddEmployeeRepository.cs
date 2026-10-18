using System.Data;
using System.Text.Json;
using Dapper;
using PeopleHub.Application.Common.Utilities;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Infrastructure.Database;
using PeopleHub.Infrastructure.Security;

namespace PeopleHub.Infrastructure.Modules.Employees;

/// <summary>One method per Add Employee step, each calls its stored procedure.</summary>
internal sealed class AddEmployeeRepository(SqlDb db) : IAddEmployeeRepository
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public async Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest r, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", r.Id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@Employee_Id", Clean(r.EmployeeId), DbType.AnsiString, ParameterDirection.InputOutput, 50);
        p.Add("@OperationType", r.Id is null or 0 ? "INS" : "UPD");
        p.Add("@Salutation", Clean(r.Salutation));
        p.Add("@FirstName", Clean(r.FirstName));
        p.Add("@MiddleName", Clean(r.MiddleName));
        p.Add("@LastName", Clean(r.LastName));
        p.Add("@PreferredName", Clean(r.PreferredName));
        p.Add("@DateOfBirth", r.DateOfBirth);
        p.Add("@DateOfJoining", r.DateOfJoining);
        p.Add("@Gender", Clean(r.Gender));
        p.Add("@MaritalStatus", Clean(r.MaritalStatus));
        p.Add("@BloodGroup", Clean(r.BloodGroup));
        p.Add("@Nationality", Clean(r.Nationality));
        p.Add("@PlaceOfBirth", Clean(r.PlaceOfBirth));
        p.Add("@Religion", Clean(r.Religion));
        p.Add("@Category", Clean(r.Category));
        p.Add("@EmployeePhoto", Base64Payload.TryDecode(r.EmployeePhoto), DbType.Binary, size: -1);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync(StoredProcedures.PersonalInfo, p, ct);

        return new SaveResponse(
            p.Get<int?>("@Id"),
            p.Get<string?>("@Employee_Id") ?? Clean(r.EmployeeId),
            p.Get<string?>("@ResultMessage") ?? "Personal info saved successfully.");
    }

    public Task<SaveResponse> SaveContactInfoAsync(ContactInfoRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.ContactInfo, r.EmployeeId, r.Id, r, ct);

    public Task<SaveResponse> SaveFamilyDetailsAsync(FamilyDetailsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.FamilyDetails, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveJobDetailsAsync(JobDetailsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.JobDetails, r.EmployeeId, r.Id, r, ct);

    public Task<SaveResponse> SaveEducationDetailsAsync(EducationDetailsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.EducationDetails, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveSkillsAsync(SkillsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.Skills, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveSalaryStructureAsync(SalaryStructureRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.SalaryStructure, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveIdentityStatutoryAsync(IdentityStatutoryRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.IdentityStatutory, r.EmployeeId, r.Id, r, ct);

    public Task<SaveResponse> SaveWorkExperienceAsync(WorkExperienceRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.WorkExperience, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveInsuranceDetailsAsync(InsuranceDetailsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.InsuranceDetails, r.EmployeeId, r.Policy.Id, r, ct);

    public Task<SaveResponse> SaveDocumentsAsync(DocumentsUploadRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.Documents, r.EmployeeId, r.Id, r, ct);

    public Task<SaveResponse> SaveTempLoginAsync(TempLoginRequest r, CancellationToken ct) =>
        SaveStepAsync(
            StoredProcedures.TempLogin,
            r.EmployeeId,
            r.Id,
            r with { TemporaryPassword = PasswordHasher.Hash(r.TemporaryPassword!) },
            ct);

    public Task<SaveResponse> SaveSeparationAsync(SeparationRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.Separation, r.EmployeeId, r.Id, r, ct);

    public Task<SaveResponse> SaveAssetsAsync(AssetsRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.Assets, r.EmployeeId, null, r, ct);

    public Task<SaveResponse> SaveChangeRequestsAuditAsync(ChangeRequestsAuditRequest r, CancellationToken ct) =>
        SaveStepAsync(StoredProcedures.ChangeRequestsAudit, r.EmployeeId, r.Id, r, ct);

    /// <summary>Shared call for every step SP: ids as parameters, the whole request as JSON.</summary>
    private async Task<SaveResponse> SaveStepAsync<T>(string procedure, string? employeeId, int? id, T request, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@Employee_Id", Clean(employeeId), DbType.AnsiString, size: 50);
        p.Add("@OperationType", id is null or 0 ? "INS" : "UPD");
        p.Add("@Json", JsonSerializer.Serialize(request, Json), DbType.String, size: -1);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync(procedure, p, ct);

        return new SaveResponse(
            p.Get<int?>("@Id"),
            Clean(employeeId),
            p.Get<string?>("@ResultMessage") ?? "Saved successfully.");
    }

    /// <summary>Empty strings go to the DB as NULL, everything else trimmed.</summary>
    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
