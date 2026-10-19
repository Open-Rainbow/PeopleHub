using PeopleHub.Application.Modules.OrgChart.Contracts;

namespace PeopleHub.Application.Modules.OrgChart.Interfaces;

/// <summary>Database calls for the org chart (see database/orgchart.sql).</summary>
public interface IOrgChartRepository
{
    Task<List<OrgChartNodeDto>> GetAsync(int organizationId, CancellationToken ct);

    /// <summary>False when the employee does not exist.</summary>
    Task<bool> SetManagerAsync(int organizationId, string employeeId, string? managerId, string userId, CancellationToken ct);
}
