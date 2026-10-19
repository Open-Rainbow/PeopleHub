using PeopleHub.Application.Modules.Holidays.Contracts;

namespace PeopleHub.Application.Modules.Holidays.Interfaces;

/// <summary>Company holiday calendar (HR edits, everyone reads).</summary>
public interface IHolidayService
{
    Task<IReadOnlyList<HolidayItemDto>> GetAsync(int? year, CancellationToken ct);
    Task<HolidayItemDto> GetByIdAsync(int id, CancellationToken ct);
    Task<HolidayItemDto> CreateAsync(SaveHolidayRequest request, CancellationToken ct);
    Task<HolidayItemDto> UpdateAsync(int id, SaveHolidayRequest request, CancellationToken ct);
    Task DeleteAsync(int id, CancellationToken ct);
}
