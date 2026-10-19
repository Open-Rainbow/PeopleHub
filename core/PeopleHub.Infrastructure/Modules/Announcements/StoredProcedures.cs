namespace PeopleHub.Infrastructure.Modules.Announcements;

/// <summary>Stored procedure names for announcements (see database/announcements.sql).</summary>
internal static class StoredProcedures
{
    public const string GetList = "dbo.sp_get_announcements";
    public const string GetById = "dbo.sp_get_announcement";
    public const string GetSummary = "dbo.sp_get_announcement_summary";
    public const string Save = "dbo.sp_save_announcement";
    public const string SetPinned = "dbo.sp_set_announcement_pin";
    public const string Delete = "dbo.sp_delete_announcement";
    public const string MarkRead = "dbo.sp_mark_announcements_read";
}
