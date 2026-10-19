using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Application.Modules.Leave.Services;

/// <summary>
/// Leave Policy Manager. One policy per year + employment type, with a Draft being edited
/// and a Published version in force. Apply Leave reads the published version.
/// </summary>
public sealed class LeavePolicyService(
    ILeavePolicyRepository repository,
    IValidator<SaveLeavePolicyRequest> saveValidator,
    IValidator<LeavePolicyKey> keyValidator,
    IValidator<CopyLeavePolicyRequest> copyValidator,
    IRequestContext context) : ILeavePolicyService
{
    private const string Resource = "Leave policy";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<IReadOnlyList<string>> GetEmploymentTypesAsync(CancellationToken ct)
    {
        var rows = await repository.GetEmploymentTypesAsync(ct);
        return rows.Count > 0 ? rows : (IReadOnlyList<string>)LeavePolicyRules.DefaultEmploymentTypes;
    }

    public async Task<IReadOnlyList<LeavePolicySummaryDto>> GetPoliciesAsync(int? year, CancellationToken ct)
    {
        if (year is not null) Year(year);
        return await repository.GetPoliciesAsync(OrgId, year, ct);
    }

    public async Task<LeavePolicyDto> GetCurrentAsync(int? year, string? employmentType, string? status, CancellationToken ct)
    {
        var y = Year(year);
        var type = string.IsNullOrWhiteSpace(employmentType)
            ? throw Invalid("employmentType", "Employment type is required.")
            : employmentType.Trim();
        string? wanted = null;
        if (!string.IsNullOrWhiteSpace(status))
        {
            wanted = LeavePolicyRules.Canonical(LeavePolicyRules.Statuses, status)
                ?? throw Invalid("status", "Status must be Draft or Published.");
        }

        var header = await repository.GetPolicyAsync(OrgId, y, type, wanted, ct);
        if (header is null)
        {
            if (wanted is not null) throw new NotFoundException(Resource, $"{y} {type} ({wanted})");
            // Nothing saved yet: start from the organization's leave type defaults.
            return new LeavePolicyDto
            {
                Year = y,
                EmploymentType = type,
                Status = "None",
                Items = await repository.GetItemsAsync(OrgId, null, ct),
            };
        }

        var items = await repository.GetItemsAsync(OrgId, header.Id, ct);
        IReadOnlyList<LeavePolicyItemDto> published = header.Status == "Published" ? items : [];
        if (header.Status == "Draft" && header.HasPublished)
        {
            var live = await repository.GetPolicyAsync(OrgId, y, type, "Published", ct);
            if (live is not null) published = await repository.GetItemsAsync(OrgId, live.Id, ct);
        }

        return new LeavePolicyDto
        {
            Id = header.Id,
            Year = header.Year,
            EmploymentType = header.EmploymentType,
            Status = header.Status,
            Version = header.Version,
            PublishedAt = header.PublishedAt,
            PublishedBy = header.PublishedBy,
            UpdatedAt = header.UpdatedAt,
            UpdatedBy = header.UpdatedBy,
            HasPublished = header.HasPublished,
            PublishedVersion = header.PublishedVersion,
            Items = items,
            PublishedItems = published,
        };
    }

    public async Task<LeavePolicyDto> SaveDraftAsync(SaveLeavePolicyRequest request, CancellationToken ct)
    {
        await saveValidator.EnsureValidAsync(request, ct);
        var normalized = Normalize(request);
        var result = await repository.SaveDraftAsync(OrgId, UserId, normalized, ct);
        if (result.PolicyId is null) throw new BusinessRuleException(result.Message);
        return await GetCurrentAsync(normalized.Year, normalized.EmploymentType, "Draft", ct);
    }

    public async Task<LeavePolicyDto> PublishAsync(LeavePolicyKey key, CancellationToken ct)
    {
        await keyValidator.EnsureValidAsync(key, ct);
        var type = key.EmploymentType!.Trim();
        if (await repository.PublishAsync(OrgId, UserId, key.Year, type, ct) == 0)
            throw new NotFoundException(Resource, $"{key.Year} {type} draft");
        return await GetCurrentAsync(key.Year, type, "Published", ct);
    }

    public async Task<LeavePolicyDto> DiscardDraftAsync(LeavePolicyKey key, CancellationToken ct)
    {
        await keyValidator.EnsureValidAsync(key, ct);
        var type = key.EmploymentType!.Trim();
        if (await repository.DiscardDraftAsync(OrgId, UserId, key.Year, type, ct) == 0)
            throw new NotFoundException(Resource, $"{key.Year} {type} draft");
        return await GetCurrentAsync(key.Year, type, null, ct);
    }

    public async Task<CopyLeavePolicyResult> CopyAsync(CopyLeavePolicyRequest request, CancellationToken ct)
    {
        await copyValidator.EnsureValidAsync(request, ct);
        var normalized = request with
        {
            EmploymentType = string.IsNullOrWhiteSpace(request.EmploymentType) ? null : request.EmploymentType.Trim(),
        };
        var created = await repository.CopyAsync(OrgId, UserId, normalized, ct);
        var message = created switch
        {
            0 => $"{request.TargetYear} already has a policy for {(normalized.EmploymentType ?? "every employment type")}. Nothing copied.",
            1 => $"Created a {request.TargetYear} draft from {request.SourceYear}.",
            _ => $"Created {created} {request.TargetYear} drafts from {request.SourceYear}.",
        };
        return new CopyLeavePolicyResult(created, message);
    }

    /// <summary>Trims text, fixes casing of the option fields and generates codes for new leave types.</summary>
    internal static SaveLeavePolicyRequest Normalize(SaveLeavePolicyRequest request)
    {
        var used = new HashSet<string>(
            request.Items.Where(i => !string.IsNullOrWhiteSpace(i.Code)).Select(i => i.Code!.Trim().ToLowerInvariant()));

        var items = request.Items.Select(i =>
        {
            var code = i.Code?.Trim().ToLowerInvariant();
            if (string.IsNullOrEmpty(code))
            {
                var baseCode = LeavePolicyRules.Slugify(i.Label!);
                code = baseCode;
                for (var n = 2; used.Contains(code); n++)
                {
                    var suffix = $"-{n}";
                    code = (baseCode.Length + suffix.Length > 20 ? baseCode[..(20 - suffix.Length)] : baseCode) + suffix;
                }
                used.Add(code);
            }

            return i with
            {
                Code = code,
                Label = i.Label!.Trim(),
                Description = string.IsNullOrWhiteSpace(i.Description) ? null : i.Description.Trim(),
                Category = LeavePolicyRules.Canonical(LeavePolicyRules.Categories, i.Category),
                AllowanceBasis = LeavePolicyRules.Canonical(LeavePolicyRules.AllowanceBases, i.AllowanceBasis),
                ApprovalType = LeavePolicyRules.Canonical(LeavePolicyRules.ApprovalTypes, i.ApprovalType),
                CertificateAfterDays = i.CertificateRequired ? i.CertificateAfterDays : null,
                IsEncashable = i.IsPaid && i.IsEncashable,
            };
        }).ToList();

        return request with { EmploymentType = request.EmploymentType!.Trim(), Items = items };
    }

    private static int Year(int? year)
    {
        var value = year ?? DateTime.Today.Year;
        return value is < LeavePolicyRules.YearMin or > LeavePolicyRules.YearMax
            ? throw Invalid("year", $"Year must be between {LeavePolicyRules.YearMin} and {LeavePolicyRules.YearMax}.")
            : value;
    }

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });
}
