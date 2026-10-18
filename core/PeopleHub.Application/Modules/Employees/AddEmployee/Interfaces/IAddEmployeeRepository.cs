using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

/// <summary>Implemented in Infrastructure (stored procedures).</summary>
public interface IAddEmployeeRepository
{
    Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest request, CancellationToken ct);
    Task<SaveResponse> SaveContactInfoAsync(ContactInfoRequest request, CancellationToken ct);
    Task<SaveResponse> SaveFamilyDetailsAsync(FamilyDetailsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveJobDetailsAsync(JobDetailsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveEducationDetailsAsync(EducationDetailsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveSkillsAsync(SkillsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveSalaryStructureAsync(SalaryStructureRequest request, CancellationToken ct);
    Task<SaveResponse> SaveIdentityStatutoryAsync(IdentityStatutoryRequest request, CancellationToken ct);
    Task<SaveResponse> SaveWorkExperienceAsync(WorkExperienceRequest request, CancellationToken ct);
    Task<SaveResponse> SaveInsuranceDetailsAsync(InsuranceDetailsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveDocumentsAsync(DocumentsUploadRequest request, CancellationToken ct);
    Task<SaveResponse> SaveTempLoginAsync(TempLoginRequest request, CancellationToken ct);
    Task<SaveResponse> SaveSeparationAsync(SeparationRequest request, CancellationToken ct);
    Task<SaveResponse> SaveAssetsAsync(AssetsRequest request, CancellationToken ct);
    Task<SaveResponse> SaveChangeRequestsAuditAsync(ChangeRequestsAuditRequest request, CancellationToken ct);
}
