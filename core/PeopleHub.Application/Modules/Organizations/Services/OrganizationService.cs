using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Organizations.Contracts;
using PeopleHub.Application.Modules.Organizations.Interfaces;

namespace PeopleHub.Application.Modules.Organizations.Services;

/// <summary>
/// Organizations. Only Super Admin can list, create, edit, activate or deactivate them.
/// A new organization gets the system roles (Admin, HR, Manager, Employee, Super Admin) with default access.
/// Anyone can read the organization they are working in (GET current).
/// </summary>
public sealed class OrganizationService(
    IOrganizationRepository repository,
    IValidator<SaveOrganizationRequest> validator,
    IRequestContext context) : IOrganizationService
{
    private const string Resource = "Organization";

    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? (context.Role ?? "anonymous") : context.UserId!;

    public async Task<IReadOnlyList<OrganizationDto>> ListAsync(string? search, bool includeInactive, CancellationToken ct)
    {
        EnsureSuperAdmin();
        var term = string.IsNullOrWhiteSpace(search) ? null : search.Trim();
        if (term is { Length: > 100 }) term = term[..100];
        return await repository.ListAsync(term, includeInactive, ct);
    }

    public async Task<OrganizationDto> GetAsync(int id, CancellationToken ct)
    {
        EnsureSuperAdmin();
        return await repository.GetAsync(id, ct) ?? throw new NotFoundException(Resource, id);
    }

    public async Task<OrganizationDto> GetCurrentAsync(CancellationToken ct)
    {
        var id = context.RequireOrganizationId();
        return await repository.GetAsync(id, ct) ?? throw new NotFoundException(Resource, id);
    }

    public async Task<OrganizationDto> CreateAsync(SaveOrganizationRequest request, CancellationToken ct)
    {
        EnsureSuperAdmin();
        await validator.EnsureValidAsync(request, ct);
        var id = await repository.SaveAsync(null, Normalize(request), UserId, ct)
                 ?? throw new BusinessRuleException("The organization could not be saved.");
        return await repository.GetAsync(id, ct) ?? throw new NotFoundException(Resource, id);
    }

    public async Task<OrganizationDto> UpdateAsync(int id, SaveOrganizationRequest request, CancellationToken ct)
    {
        EnsureSuperAdmin();
        await validator.EnsureValidAsync(request, ct);
        _ = await repository.SaveAsync(id, Normalize(request), UserId, ct) ?? throw new NotFoundException(Resource, id);
        return await repository.GetAsync(id, ct) ?? throw new NotFoundException(Resource, id);
    }

    public async Task<OrganizationDto> SetStatusAsync(int id, SetOrganizationStatusRequest request, CancellationToken ct)
    {
        EnsureSuperAdmin();
        if (!await repository.SetStatusAsync(id, request.IsActive, UserId, ct)) throw new NotFoundException(Resource, id);
        return await repository.GetAsync(id, ct) ?? throw new NotFoundException(Resource, id);
    }

    private void EnsureSuperAdmin()
    {
        if (!string.Equals(context.Role?.Trim(), OrganizationRules.SuperAdmin, StringComparison.OrdinalIgnoreCase))
            throw new ForbiddenException("Only Super Admin can manage organizations.");
    }

    private static SaveOrganizationRequest Normalize(SaveOrganizationRequest r) => r with
    {
        Code = r.Code!.Trim().ToUpperInvariant(),
        Name = r.Name!.Trim(),
        LegalName = Clean(r.LegalName),
        Industry = Clean(r.Industry),
        Email = Clean(r.Email)?.ToLowerInvariant(),
        Phone = Clean(r.Phone),
        Website = Clean(r.Website),
        AddressLine = Clean(r.AddressLine),
        City = Clean(r.City),
        StateProvince = Clean(r.StateProvince),
        Country = Clean(r.Country),
        Pincode = Clean(r.Pincode),
        TimeZone = Clean(r.TimeZone),
        Currency = Clean(r.Currency)?.ToUpperInvariant(),
        TaxId = Clean(r.TaxId)?.ToUpperInvariant(),
        RegistrationNumber = Clean(r.RegistrationNumber),
    };

    private static string? Clean(string? v) => string.IsNullOrWhiteSpace(v) ? null : v.Trim();
}
