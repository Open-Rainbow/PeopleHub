using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

namespace PeopleHub.Application.Modules.Employees.AddEmployee.Services;

/// <summary>Every step: validate with its validator, then save through the repository.</summary>
public sealed class AddEmployeeService(IAddEmployeeRepository repository, IServiceProvider services) : IAddEmployeeService
{
    public Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest r, CancellationToken ct) => SaveAsync(r, repository.SavePersonalInfoAsync, ct);
    public Task<SaveResponse> SaveContactInfoAsync(ContactInfoRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveContactInfoAsync, ct);
    public Task<SaveResponse> SaveFamilyDetailsAsync(FamilyDetailsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveFamilyDetailsAsync, ct);
    public Task<SaveResponse> SaveJobDetailsAsync(JobDetailsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveJobDetailsAsync, ct);
    public Task<SaveResponse> SaveEducationDetailsAsync(EducationDetailsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveEducationDetailsAsync, ct);
    public Task<SaveResponse> SaveSkillsAsync(SkillsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveSkillsAsync, ct);
    public Task<SaveResponse> SaveSalaryStructureAsync(SalaryStructureRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveSalaryStructureAsync, ct);
    public Task<SaveResponse> SaveIdentityStatutoryAsync(IdentityStatutoryRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveIdentityStatutoryAsync, ct);
    public Task<SaveResponse> SaveWorkExperienceAsync(WorkExperienceRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveWorkExperienceAsync, ct);
    public Task<SaveResponse> SaveInsuranceDetailsAsync(InsuranceDetailsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveInsuranceDetailsAsync, ct);
    public Task<SaveResponse> SaveDocumentsAsync(DocumentsUploadRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveDocumentsAsync, ct);
    public Task<SaveResponse> SaveTempLoginAsync(TempLoginRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveTempLoginAsync, ct);
    public Task<SaveResponse> SaveSeparationAsync(SeparationRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveSeparationAsync, ct);
    public Task<SaveResponse> SaveAssetsAsync(AssetsRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveAssetsAsync, ct);
    public Task<SaveResponse> SaveChangeRequestsAuditAsync(ChangeRequestsAuditRequest r, CancellationToken ct) => SaveAsync(r, repository.SaveChangeRequestsAuditAsync, ct);

    private async Task<SaveResponse> SaveAsync<T>(
        T request,
        Func<T, CancellationToken, Task<SaveResponse>> save,
        CancellationToken ct)
    {
        await services.GetRequiredService<IValidator<T>>().EnsureValidAsync(request, ct);
        return await save(request, ct);
    }
}
