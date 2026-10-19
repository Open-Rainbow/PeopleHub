using PeopleHub.Application.Modules.OrgChart.Contracts;

namespace PeopleHub.Application.Modules.OrgChart.Interfaces;

public interface IOrgChartService
{
    Task<IReadOnlyList<OrgChartNodeDto>> GetAsync(CancellationToken ct);

    /// <summary>Moves the employee (and everyone below them) under a new manager. Returns the fresh chart.</summary>
    Task<IReadOnlyList<OrgChartNodeDto>> SetManagerAsync(string employeeId, SetManagerRequest request, CancellationToken ct);
}
