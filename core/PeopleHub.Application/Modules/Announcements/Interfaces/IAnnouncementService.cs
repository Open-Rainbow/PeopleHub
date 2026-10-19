using PeopleHub.Application.Modules.Announcements.Contracts;

namespace PeopleHub.Application.Modules.Announcements.Interfaces;

public interface IAnnouncementService
{
    Task<IReadOnlyList<AnnouncementDto>> GetListAsync(AnnouncementQuery query, CancellationToken ct);
    Task<AnnouncementSummary> GetSummaryAsync(CancellationToken ct);
    Task<AnnouncementDto> GetByIdAsync(int id, CancellationToken ct);
    Task<AnnouncementDto> CreateAsync(AnnouncementRequest request, CancellationToken ct);
    Task<AnnouncementDto> UpdateAsync(int id, AnnouncementRequest request, CancellationToken ct);
    Task<AnnouncementDto> SetPinnedAsync(int id, bool isPinned, CancellationToken ct);
    Task DeleteAsync(int id, CancellationToken ct);
    Task MarkReadAsync(IReadOnlyList<int> ids, CancellationToken ct);
}
