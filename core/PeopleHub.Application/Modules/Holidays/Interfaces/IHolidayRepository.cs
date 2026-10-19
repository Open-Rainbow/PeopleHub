using PeopleHub.Application.Modules.Holidays.Contracts;

namespace PeopleHub.Application.Modules.Holidays.Interfaces;

/// <summary>Database calls for holidays (see database/holidays.sql).</summary>
public interface IHolidayRepository
{
    Task<List<HolidayItemDto>> GetAsync(int organizationId, int year, CancellationToken ct);
    Task<HolidayItemDto?> GetByIdAsync(int organizationId, int id, CancellationToken ct);

    /// <summary>id null = create.</summary>
    Task<HolidaySaveResult> SaveAsync(int organizationId, string userId, int? id, SaveHolidayRequest request, CancellationToken ct);

    Task<bool> DeleteAsync(int organizationId, string userId, int id, CancellationToken ct);
}
