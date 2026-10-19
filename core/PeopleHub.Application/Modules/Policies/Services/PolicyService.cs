using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Policies.Contracts;
using PeopleHub.Application.Modules.Policies.Interfaces;

namespace PeopleHub.Application.Modules.Policies.Services;

/// <summary>Company policies: HR / admin publish them (text and/or a file), employees read, download and acknowledge.</summary>
public sealed class PolicyService(
    IPolicyRepository repository,
    IValidator<SavePolicyRequest> saveValidator,
    IValidator<SetPolicyStatusRequest> statusValidator,
    IRequestContext context) : IPolicyService
{
    private const string Resource = "Policy";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<IReadOnlyList<PolicyDto>> GetPoliciesAsync(string? employeeId, bool manage, string? status, string? category, string? search, CancellationToken ct)
    {
        var term = Clean(search);
        if (term is { Length: > PolicyRules.SearchMax }) throw Invalid("search", $"Search must be {PolicyRules.SearchMax} characters or fewer.");

        string? statusMatch = null;
        if (!string.IsNullOrWhiteSpace(status) && !status.Equals("All", StringComparison.OrdinalIgnoreCase))
            statusMatch = PolicyRules.Canonical(PolicyRules.Statuses, status) ?? throw Invalid("status", "Status must be All, Draft, Published or Archived.");

        string? categoryMatch = null;
        if (!string.IsNullOrWhiteSpace(category) && !category.Equals("All", StringComparison.OrdinalIgnoreCase))
            categoryMatch = PolicyRules.Canonical(PolicyRules.Categories, category) ?? throw Invalid("category", "Unknown category.");

        return await repository.GetAsync(OrgId, Reader(employeeId, manage), manage, manage ? statusMatch : null, categoryMatch, term, null, ct);
    }

    public async Task<PolicyDto> GetPolicyAsync(int id, string? employeeId, bool manage, CancellationToken ct) =>
        (await repository.GetAsync(OrgId, Reader(employeeId, manage), manage, null, null, null, id, ct)).FirstOrDefault()
        ?? throw new NotFoundException(Resource, id);

    public async Task<PolicyFileDto> GetFileAsync(int id, string? employeeId, bool manage, CancellationToken ct)
    {
        var file = await repository.GetFileAsync(OrgId, id, Reader(employeeId, manage), manage, ct);
        if (file is null || file.FileData.Length == 0) throw new NotFoundException("Policy file", id);
        if (string.IsNullOrWhiteSpace(file.FileContentType))
            file.FileContentType = PolicyRules.FileTypes.TryGetValue(PolicyRules.Extension(file.FileName), out var type) ? type : "application/octet-stream";
        return file;
    }

    public async Task<PolicyDto> CreateAsync(SavePolicyRequest request, CancellationToken ct)
    {
        await saveValidator.EnsureValidAsync(request, ct);
        var file = Payload(request.File);
        if (file is null && string.IsNullOrWhiteSpace(request.Content))
            throw Invalid(nameof(SavePolicyRequest.Content), "Write the policy or attach a file.");

        var id = await repository.SaveAsync(OrgId, null, Normalize(request), file is null ? "keep" : "replace", file, UserId, ct);
        return await GetPolicyAsync(id ?? throw new BusinessRuleException("The policy could not be saved."), null, true, ct);
    }

    public async Task<PolicyDto> UpdateAsync(int id, SavePolicyRequest request, CancellationToken ct)
    {
        await saveValidator.EnsureValidAsync(request, ct);
        var file = Payload(request.File);
        var action = file is not null ? "replace" : request.RemoveFile ? "remove" : "keep";
        await repository.SaveAsync(OrgId, id, Normalize(request), action, file, UserId, ct);
        return await GetPolicyAsync(id, null, true, ct);
    }

    public async Task<PolicyDto> SetStatusAsync(int id, SetPolicyStatusRequest request, CancellationToken ct)
    {
        await statusValidator.EnsureValidAsync(request, ct);
        if (!await repository.SetStatusAsync(OrgId, id, PolicyRules.Canonical(PolicyRules.Statuses, request.Status)!, UserId, ct))
            throw new NotFoundException(Resource, id);
        return await GetPolicyAsync(id, null, true, ct);
    }

    public async Task DeleteAsync(int id, CancellationToken ct)
    {
        if (!await repository.DeleteAsync(OrgId, id, UserId, ct)) throw new NotFoundException(Resource, id);
    }

    public async Task<PolicyDto> AcknowledgeAsync(int id, string? employeeId, CancellationToken ct)
    {
        var code = Employee(employeeId);
        await repository.AcknowledgeAsync(OrgId, id, code, ct);
        return await GetPolicyAsync(id, code, false, ct);
    }

    public async Task<IReadOnlyList<PolicyAckDto>> GetAcknowledgementsAsync(int id, CancellationToken ct) =>
        await repository.GetAcknowledgementsAsync(OrgId, id, ct);

    // ---- Helpers --------------------------------------------------------------------------------

    private static SavePolicyRequest Normalize(SavePolicyRequest r) => r with
    {
        Title = r.Title!.Trim(),
        Category = PolicyRules.Canonical(PolicyRules.Categories, r.Category)!,
        Summary = Clean(r.Summary),
        Content = string.IsNullOrWhiteSpace(r.Content) ? null : r.Content.Trim(),
        Audience = Clean(r.Audience),
        EffectiveFrom = r.EffectiveFrom?.Date,
    };

    private static PolicyFilePayload? Payload(PolicyFileInput? file)
    {
        if (file is null) return null;
        var name = file.FileName!.Trim().Split('\\', '/')[^1]; // browsers may send C:/fakepath/name
        var bytes = PolicyRules.Decode(file.Data) ?? throw Invalid("File", "The file could not be read. Upload it again.");
        var type = PolicyRules.FileTypes[PolicyRules.Extension(name)];
        return new PolicyFilePayload(name, type, bytes);
    }

    /// <summary>Who is reading: the token once authenticated, otherwise the employee code from the request (optional for HR).</summary>
    private string? Reader(string? employeeId, bool manage)
    {
        if (context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)) return context.UserId;
        var code = Clean(employeeId);
        return manage || code is not null ? code : throw Invalid("employeeId", "Employee id is required.");
    }

    private string Employee(string? fromRequest) =>
        Reader(fromRequest, false) ?? throw Invalid("employeeId", "Employee id is required.");

    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });
}
