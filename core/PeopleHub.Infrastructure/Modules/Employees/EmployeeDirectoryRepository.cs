using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Employees.Directory.Contracts;
using PeopleHub.Application.Modules.Employees.Directory.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Employees;

/// <summary>One method per directory stored procedure (database/employees.sql).</summary>
internal sealed class EmployeeDirectoryRepository(SqlDb db) : IEmployeeDirectoryRepository
{
    public Task<List<EmployeeListItemDto>> GetEmployeesAsync(int organizationId, EmployeeQuery q, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Search", q.Search);
        p.Add("@Status", q.Status);
        p.Add("@Department", q.Department);
        p.Add("@Location", q.Location);
        p.Add("@EmployeeType", q.EmployeeType);
        p.Add("@ManagerCode", q.ManagerCode, DbType.AnsiString, size: 50);
        p.Add("@JoinedFrom", q.JoinedFrom, DbType.Date);
        p.Add("@JoinedTo", q.JoinedTo, DbType.Date);
        p.Add("@IncludeExited", q.IncludeExited);
        p.Add("@SortBy", q.SortBy, DbType.AnsiString, size: 20);
        p.Add("@SortDir", q.SortDir, DbType.AnsiString, size: 4);
        p.Add("@Page", q.Page);
        p.Add("@PageSize", q.PageSize);
        return db.QueryAsync<EmployeeListItemDto>("dbo.sp_dir_get_employees", p, ct);
    }

    public async Task<EmployeeSummaryDto?> GetSummaryAsync(int organizationId, CancellationToken ct) =>
        (await db.QueryAsync<EmployeeSummaryDto>("dbo.sp_dir_get_summary", new { OrganizationId = organizationId }, ct)).FirstOrDefault();

    public Task<List<FilterOptionDto>> GetFiltersAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<FilterOptionDto>("dbo.sp_dir_get_filters", new { OrganizationId = organizationId }, ct);

    public async Task<EmployeeProfileDto?> GetProfileAsync(int organizationId, string employeeCode, CancellationToken ct) =>
        (await db.QueryAsync<EmployeeProfileDto>("dbo.sp_dir_get_profile", Code(organizationId, employeeCode), ct)).FirstOrDefault();

    public Task<List<EmployeeStatusHistoryDto>> GetStatusHistoryAsync(int organizationId, string employeeCode, CancellationToken ct) =>
        db.QueryAsync<EmployeeStatusHistoryDto>("dbo.sp_dir_get_status_history", Code(organizationId, employeeCode), ct);

    public async Task<bool> SetStatusAsync(int organizationId, string employeeCode, SetEmployeeStatusRequest r, string userId, CancellationToken ct)
    {
        var p = Code(organizationId, employeeCode);
        p.Add("@Status", r.Status);
        p.Add("@Reason", r.Reason);
        p.Add("@EffectiveDate", r.EffectiveDate, DbType.Date);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_dir_set_status", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    public async Task<bool> DeleteAsync(int organizationId, string employeeCode, string userId, CancellationToken ct)
    {
        var p = Code(organizationId, employeeCode);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_dir_delete", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }

    private static DynamicParameters Code(int organizationId, string employeeCode)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@EmployeeCode", employeeCode, DbType.AnsiString, size: 50);
        return p;
    }
}
