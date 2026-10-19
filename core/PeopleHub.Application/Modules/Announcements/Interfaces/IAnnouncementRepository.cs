using PeopleHub.Application.Modules.Announcements.Contracts;

namespace PeopleHub.Application.Modules.Announcements.Interfaces;

/// <summary>Database calls for announcements. Every call is scoped to one organization.</summary>
public interface IAnnouncementRepository
{
    Task<List<AnnouncementDto>> GetListAsync(int organizationId, string userId, AnnouncementQuery query, CancellationToken ct);
    Task<AnnouncementSummary> GetSummaryAsync(int organizationId, string userId, CancellationToken ct);
    Task<AnnouncementDto?> GetByIdAsync(int organizationId, string userId, int id, CancellationToken ct);
    Task<AnnouncementSaveResult> SaveAsync(int organizationId, string userId, int? id, AnnouncementRequest request, CancellationToken ct);
    Task<bool> SetPinnedAsync(int organizationId, string userId, int id, bool isPinned, CancellationToken ct);
    Task<bool> DeleteAsync(int organizationId, string userId, int id, CancellationToken ct);
    Task MarkReadAsync(int organizationId, string userId, IReadOnlyList<int> ids, CancellationToken ct);
}
