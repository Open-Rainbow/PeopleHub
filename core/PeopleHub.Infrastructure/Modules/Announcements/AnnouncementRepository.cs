using System.Data;
using System.Text.Json;
using Dapper;
using PeopleHub.Application.Modules.Announcements.Contracts;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Announcements;

/// <summary>One method per announcement stored procedure.</summary>
internal sealed class AnnouncementRepository(SqlDb db) : IAnnouncementRepository
{
    public Task<List<AnnouncementDto>> GetListAsync(int organizationId, string userId, AnnouncementQuery query, CancellationToken ct) =>
        db.QueryAsync<AnnouncementDto>(
            StoredProcedures.GetList,
            new
            {
                OrganizationId = organizationId,
                UserId = userId,
                query.Status,
                query.Search,
                query.IncludeScheduled,
            },
            ct);

    public async Task<AnnouncementSummary> GetSummaryAsync(int organizationId, string userId, CancellationToken ct)
    {
        var rows = await db.QueryAsync<AnnouncementSummary>(
            StoredProcedures.GetSummary,
            new { OrganizationId = organizationId, UserId = userId },
            ct);
        return rows.FirstOrDefault() ?? new AnnouncementSummary();
    }

    public async Task<AnnouncementDto?> GetByIdAsync(int organizationId, string userId, int id, CancellationToken ct)
    {
        var rows = await db.QueryAsync<AnnouncementDto>(
            StoredProcedures.GetById,
            new { OrganizationId = organizationId, UserId = userId, Id = id },
            ct);
        return rows.FirstOrDefault();
    }

    public async Task<AnnouncementSaveResult> SaveAsync(int organizationId, string userId, int? id, AnnouncementRequest r, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@OrganizationId", organizationId);
        p.Add("@Title", Clean(r.Title));
        p.Add("@Description", Clean(r.Description));
        p.Add("@Priority", Priority(r.Priority));
        p.Add("@Category", Clean(r.Category));
        p.Add("@Department", Clean(r.Department));
        p.Add("@TargetAudience", Clean(r.TargetAudience));
        p.Add("@PublishOn", r.PublishOn?.Date, DbType.Date);
        p.Add("@ExpiresOn", r.ExpiresOn?.Date, DbType.Date);
        p.Add("@IsPinned", r.IsPinned);
        p.Add("@PostedBy", Clean(r.PostedBy));
        p.Add("@UserId", userId);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync(StoredProcedures.Save, p, ct);

        return new AnnouncementSaveResult(
            p.Get<int?>("@Id"),
            p.Get<string?>("@ResultMessage") ?? "Announcement saved successfully.");
    }

    public async Task<bool> SetPinnedAsync(int organizationId, string userId, int id, bool isPinned, CancellationToken ct)
    {
        var p = Affected(organizationId, userId, id);
        p.Add("@IsPinned", isPinned);
        await db.ExecuteAsync(StoredProcedures.SetPinned, p, ct);
        return p.Get<int>("@Affected") > 0;
    }

    public async Task<bool> DeleteAsync(int organizationId, string userId, int id, CancellationToken ct)
    {
        var p = Affected(organizationId, userId, id);
        await db.ExecuteAsync(StoredProcedures.Delete, p, ct);
        return p.Get<int>("@Affected") > 0;
    }

    public async Task MarkReadAsync(int organizationId, string userId, IReadOnlyList<int> ids, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@UserId", userId);
        p.Add("@IdsJson", JsonSerializer.Serialize(ids), DbType.String, size: -1);
        await db.ExecuteAsync(StoredProcedures.MarkRead, p, ct);
    }

    private static DynamicParameters Affected(int organizationId, string userId, int id)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@OrganizationId", organizationId);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        return p;
    }

    /// <summary>"high" / "HIGH" become "High" so the DB check constraint always matches.</summary>
    private static string? Priority(string? value)
    {
        var v = Clean(value);
        return v is null ? null : char.ToUpperInvariant(v[0]) + v[1..].ToLowerInvariant();
    }

    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
