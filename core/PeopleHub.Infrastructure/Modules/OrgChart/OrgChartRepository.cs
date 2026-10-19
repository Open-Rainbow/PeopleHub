using System.Data;
using Dapper;
using PeopleHub.Application.Modules.OrgChart.Contracts;
using PeopleHub.Application.Modules.OrgChart.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.OrgChart;

/// <summary>One method per org chart stored procedure (database/orgchart.sql).</summary>
internal sealed class OrgChartRepository(SqlDb db) : IOrgChartRepository
{
    private const string GetChart = "dbo.sp_org_get_chart";
    private const string SetManager = "dbo.sp_org_set_manager";

    public Task<List<OrgChartNodeDto>> GetAsync(int organizationId, CancellationToken ct) =>
        db.QueryAsync<OrgChartNodeDto>(GetChart, new { OrganizationId = organizationId }, ct);

    public async Task<bool> SetManagerAsync(int organizationId, string employeeId, string? managerId, string userId, CancellationToken ct)
    {
        var p = new DynamicParameters();
        p.Add("@OrganizationId", organizationId);
        p.Add("@Employee_Id", employeeId, DbType.AnsiString, size: 50);
        p.Add("@Manager_Id", managerId, DbType.AnsiString, size: 50);
        p.Add("@UserId", userId);
        p.Add("@Affected", dbType: DbType.Int32, direction: ParameterDirection.Output);
        await db.ExecuteAsync(SetManager, p, ct);
        return p.Get<int?>("@Affected") > 0;
    }
}
