using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Holidays.Contracts;
using PeopleHub.Application.Modules.Holidays.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Holidays;

/// <summary>One method per holiday stored procedure.</summary>
internal sealed class HolidayRepository(SqlDb db) : IHolidayRepository
{
    private const string GetList = "dbo.sp_get_holiday_list";
    private const string Save = "dbo.sp_save_holiday";
    private const string Delete = "dbo.sp_delete_holiday";

    public Task<List<HolidayItemDto>> GetAsync(int organizationId, int year, CancellationToken ct) =>
        db.QueryAsync<HolidayItemDto>(GetList, new { OrganizationId = organizationId, Year = year, Id = (int?)null }, ct);

    public async Task<HolidayItemDto?> GetByIdAsync(int organizationId, int id, CancellationToken ct)
    {
        var rows = await db.QueryAsync<HolidayItemDto>(GetList, new { OrganizationId = organizationId, Year = 0, Id = id }, ct);
        return rows.FirstOrDefault();
    }

    public async Task<HolidaySaveResult> SaveAsync(int organizationId, string userId, int? id, SaveHolidayRequest r, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@OrganizationId", organizationId);
        p.Add("@HolidayDate", r.Date?.Date, DbType.Date);
        p.Add("@Name", r.Name);
        p.Add("@HolidayType", r.Type, DbType.AnsiString, size: 20);
        p.Add("@IsOptional", r.IsOptional);
        p.Add("@Description", r.Description);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);

        await db.ExecuteAsync(Save, p, ct);

        return new HolidaySaveResult(p.Get<int?>("@Id"), p.Get<int?>("@Affected") ?? 0);
    }

    public async Task<bool> DeleteAsync(int organizationId, string userId, int id, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(Delete, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }
}
