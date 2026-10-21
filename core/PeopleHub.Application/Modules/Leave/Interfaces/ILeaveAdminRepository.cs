using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

public interface ILeaveAdminRepository
{
    Task<List<LeaveAdminDepartmentDto>> GetDepartmentsAsync(int organizationId, CancellationToken ct);

    Task<List<LeaveAdminRequestDto>> GetRequestsAsync(
        int organizationId, DateTime from, DateTime to, string? department, string? leaveType, CancellationToken ct);

    Task<List<LeaveAdminBalanceRow>> GetBalancesAsync(
        int organizationId, int year, DateTime from, DateTime to, string? department, string? search, CancellationToken ct);
}
