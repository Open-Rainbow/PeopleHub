using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

/// <summary>Leaves &amp; WFH dashboard for HR / admins: filters, requests in a period, employee balances.</summary>
public interface ILeaveAdminService
{
    Task<LeaveAdminFiltersDto> GetFiltersAsync(CancellationToken ct);
    Task<LeaveAdminRequestsResult> GetRequestsAsync(LeaveAdminQuery query, CancellationToken ct);
    Task<IReadOnlyList<LeaveAdminEmployeeDto>> GetEmployeesAsync(LeaveAdminEmployeesQuery query, CancellationToken ct);
    Task<string> ExportRequestsCsvAsync(LeaveAdminQuery query, CancellationToken ct);
}
