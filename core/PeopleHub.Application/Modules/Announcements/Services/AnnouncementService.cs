using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Announcements.Contracts;
using PeopleHub.Application.Modules.Announcements.Interfaces;

namespace PeopleHub.Application.Modules.Announcements.Services;

/// <summary>Validates input, resolves org/user from the request, then calls the repository.</summary>
public sealed class AnnouncementService(
    IAnnouncementRepository repository,
    IValidator<AnnouncementRequest> validator,
    IRequestContext context) : IAnnouncementService
{
    private const string Resource = "Announcement";

    /// <summary>Until login is wired up, unauthenticated callers share one read-tracking identity.</summary>
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<IReadOnlyList<AnnouncementDto>> GetListAsync(AnnouncementQuery query, CancellationToken ct)
    {
        var status = string.IsNullOrWhiteSpace(query.Status) ? "All" : query.Status.Trim();
        var match = AnnouncementRules.Statuses.FirstOrDefault(s => s.Equals(status, StringComparison.OrdinalIgnoreCase));
        var search = query.Search?.Trim();

        var errors = new Dictionary<string, string[]>();
        if (match is null)
            errors[nameof(AnnouncementQuery.Status)] = ["Status must be All, Active, Scheduled or Expired."];
        if (search is { Length: > AnnouncementRules.SearchMax })
            errors[nameof(AnnouncementQuery.Search)] = [$"Search must be {AnnouncementRules.SearchMax} characters or fewer."];
        if (errors.Count > 0)
            throw new RequestValidationException(errors);

        var normalized = query with { Status = match, Search = string.IsNullOrEmpty(search) ? null : search };
        return await repository.GetListAsync(context.RequireOrganizationId(), UserId, normalized, ct);
    }

    public Task<AnnouncementSummary> GetSummaryAsync(CancellationToken ct) =>
        repository.GetSummaryAsync(context.RequireOrganizationId(), UserId, ct);

    public async Task<AnnouncementDto> GetByIdAsync(int id, CancellationToken ct) =>
        await repository.GetByIdAsync(context.RequireOrganizationId(), UserId, id, ct)
        ?? throw new NotFoundException(Resource, id);

    public async Task<AnnouncementDto> CreateAsync(AnnouncementRequest request, CancellationToken ct)
    {
        await validator.EnsureValidAsync(request, ct);
        if (request.ExpiresOn!.Value.Date < DateTime.Today)
        {
            throw new RequestValidationException(new Dictionary<string, string[]>
            {
                [nameof(AnnouncementRequest.ExpiresOn)] = ["A new announcement cannot already be expired."],
            });
        }

        var result = await repository.SaveAsync(context.RequireOrganizationId(), UserId, null, request, ct);
        return await GetByIdAsync(result.Id ?? throw new BusinessRuleException(result.Message), ct);
    }

    public async Task<AnnouncementDto> UpdateAsync(int id, AnnouncementRequest request, CancellationToken ct)
    {
        await validator.EnsureValidAsync(request, ct);
        var result = await repository.SaveAsync(context.RequireOrganizationId(), UserId, id, request, ct);
        if (result.Id is null) throw new NotFoundException(Resource, id);
        return await GetByIdAsync(id, ct);
    }

    public async Task<AnnouncementDto> SetPinnedAsync(int id, bool isPinned, CancellationToken ct)
    {
        if (!await repository.SetPinnedAsync(context.RequireOrganizationId(), UserId, id, isPinned, ct))
            throw new NotFoundException(Resource, id);
        return await GetByIdAsync(id, ct);
    }

    public async Task DeleteAsync(int id, CancellationToken ct)
    {
        if (!await repository.DeleteAsync(context.RequireOrganizationId(), UserId, id, ct))
            throw new NotFoundException(Resource, id);
    }

    public async Task MarkReadAsync(IReadOnlyList<int> ids, CancellationToken ct)
    {
        var distinct = (ids ?? []).Where(i => i > 0).Distinct().ToList();
        if (distinct.Count == 0) return;
        if (distinct.Count > AnnouncementRules.MarkReadMax)
        {
            throw new RequestValidationException(new Dictionary<string, string[]>
            {
                [nameof(MarkAnnouncementsReadRequest.Ids)] = [$"Mark at most {AnnouncementRules.MarkReadMax} announcements at a time."],
            });
        }

        await repository.MarkReadAsync(context.RequireOrganizationId(), UserId, distinct, ct);
    }
}
