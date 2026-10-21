using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Organizations.Contracts;
using PeopleHub.Application.Modules.Organizations.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Organizations;

/// <summary>One method per organization stored procedure (database/organizations.sql).</summary>
internal sealed class OrganizationRepository(SqlDb db) : IOrganizationRepository
{
    public Task<List<OrganizationDto>> ListAsync(string? search, bool includeInactive, CancellationToken ct) =>
        db.QueryAsync<OrganizationDto>("dbo.sp_orgs_list", new { Search = search, IncludeInactive = includeInactive }, ct);

    public async Task<OrganizationDto?> GetAsync(int id, CancellationToken ct) =>
        (await db.QueryAsync<OrganizationDto>("dbo.sp_orgs_get", new { Id = id }, ct)).FirstOrDefault();

    public async Task<int?> SaveAsync(int? id, SaveOrganizationRequest r, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@Code", r.Code, DbType.AnsiString, size: 20);
        p.Add("@Name", r.Name);
        p.Add("@LegalName", r.LegalName);
        p.Add("@Industry", r.Industry);
        p.Add("@Email", r.Email);
        p.Add("@Phone", r.Phone);
        p.Add("@Website", r.Website);
        p.Add("@AddressLine", r.AddressLine);
        p.Add("@City", r.City);
        p.Add("@StateProvince", r.StateProvince);
        p.Add("@Country", r.Country);
        p.Add("@Pincode", r.Pincode);
        p.Add("@TimeZone", r.TimeZone, DbType.AnsiString, size: 50);
        p.Add("@Currency", r.Currency, DbType.AnsiString, size: 3);
        p.Add("@FinancialYearStartMonth", r.FinancialYearStartMonth, DbType.Int32);
        p.Add("@TaxId", r.TaxId);
        p.Add("@RegistrationNumber", r.RegistrationNumber);
        p.Add("@UserId", userId);
        await db.ExecuteAsync("dbo.sp_orgs_save", p, ct);
        return p.Get<int?>("@Id");
    }

    public async Task<bool> SetStatusAsync(int id, bool isActive, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@Id", id);
        p.Add("@IsActive", isActive);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync("dbo.sp_orgs_set_status", p, ct);
        return p.Get<int?>("@Affected") > 0;
    }
}
