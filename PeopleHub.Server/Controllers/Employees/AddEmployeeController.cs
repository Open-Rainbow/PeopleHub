using Microsoft.AspNetCore.Mvc;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;

namespace PeopleHub.Server.Controllers.Employees;

/// <summary>All Add Employee step APIs: POST api/v1/add-employee/{step}. Every step returns SaveResponse.</summary>
[ApiController]
[Route("api/v1/add-employee")]
public sealed class AddEmployeeController(IAddEmployeeService service) : ControllerBase
{
    [HttpPost("personal-info")]
    public async Task<ActionResult<SaveResponse>> SavePersonalInfo(PersonalInfoRequest request, CancellationToken ct)
        => Ok(await service.SavePersonalInfoAsync(request, ct));

    [HttpPost("contact-info")]
    public async Task<ActionResult<SaveResponse>> SaveContactInfo(ContactInfoRequest request, CancellationToken ct)
        => Ok(await service.SaveContactInfoAsync(request, ct));

    [HttpPost("family-details")]
    public async Task<ActionResult<SaveResponse>> SaveFamilyDetails(FamilyDetailsRequest request, CancellationToken ct)
        => Ok(await service.SaveFamilyDetailsAsync(request, ct));

    [HttpPost("job-details")]
    public async Task<ActionResult<SaveResponse>> SaveJobDetails(JobDetailsRequest request, CancellationToken ct)
        => Ok(await service.SaveJobDetailsAsync(request, ct));

    [HttpPost("education-details")]
    public async Task<ActionResult<SaveResponse>> SaveEducationDetails(EducationDetailsRequest request, CancellationToken ct)
        => Ok(await service.SaveEducationDetailsAsync(request, ct));

    [HttpPost("skills")]
    public async Task<ActionResult<SaveResponse>> SaveSkills(SkillsRequest request, CancellationToken ct)
        => Ok(await service.SaveSkillsAsync(request, ct));

    [HttpPost("salary-structure")]
    public async Task<ActionResult<SaveResponse>> SaveSalaryStructure(SalaryStructureRequest request, CancellationToken ct)
        => Ok(await service.SaveSalaryStructureAsync(request, ct));

    [HttpPost("identity-statutory")]
    public async Task<ActionResult<SaveResponse>> SaveIdentityStatutory(IdentityStatutoryRequest request, CancellationToken ct)
        => Ok(await service.SaveIdentityStatutoryAsync(request, ct));

    [HttpPost("work-experience")]
    public async Task<ActionResult<SaveResponse>> SaveWorkExperience(WorkExperienceRequest request, CancellationToken ct)
        => Ok(await service.SaveWorkExperienceAsync(request, ct));

    [HttpPost("insurance-details")]
    public async Task<ActionResult<SaveResponse>> SaveInsuranceDetails(InsuranceDetailsRequest request, CancellationToken ct)
        => Ok(await service.SaveInsuranceDetailsAsync(request, ct));

    [HttpPost("documents")]
    [RequestSizeLimit(100 * 1024 * 1024)] // 10 files x 5 MB as base64
    public async Task<ActionResult<SaveResponse>> SaveDocuments(DocumentsUploadRequest request, CancellationToken ct)
        => Ok(await service.SaveDocumentsAsync(request, ct));

    [HttpPost("temp-login")]
    public async Task<ActionResult<SaveResponse>> SaveTempLogin(TempLoginRequest request, CancellationToken ct)
        => Ok(await service.SaveTempLoginAsync(request, ct));

    [HttpPost("separation")]
    public async Task<ActionResult<SaveResponse>> SaveSeparation(SeparationRequest request, CancellationToken ct)
        => Ok(await service.SaveSeparationAsync(request, ct));

    [HttpPost("assets")]
    public async Task<ActionResult<SaveResponse>> SaveAssets(AssetsRequest request, CancellationToken ct)
        => Ok(await service.SaveAssetsAsync(request, ct));

    [HttpPost("change-requests-audit")]
    public async Task<ActionResult<SaveResponse>> SaveChangeRequestsAudit(ChangeRequestsAuditRequest request, CancellationToken ct)
        => Ok(await service.SaveChangeRequestsAuditAsync(request, ct));
}
