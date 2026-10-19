using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

/// <summary>Database calls for leave. Every call is scoped to one organization.</summary>
public interface ILeaveRepository
{
    Task<List<LeaveTypeDto>> GetTypesAsync(int organizationId, CancellationToken ct);
    Task<List<HolidayDto>> GetHolidaysAsync(int organizationId, int year, CancellationToken ct);
    Task<List<LeaveBalanceDto>> GetBalancesAsync(int organizationId, string employeeId, int year, CancellationToken ct);
    Task<List<LeaveRequestDto>> GetRequestsAsync(int organizationId, string employeeId, string? status, CancellationToken ct);
    Task<LeaveRequestDto?> GetRequestAsync(int organizationId, int id, CancellationToken ct);
    Task<LeaveApplyResult> ApplyAsync(int organizationId, string employeeId, string userId, ApplyLeaveRequest request, CancellationToken ct);
    Task<bool> WithdrawAsync(int organizationId, string employeeId, string userId, int id, CancellationToken ct);
    Task<List<LeaveRequestDto>> GetApprovalsAsync(int organizationId, string? approverId, CancellationToken ct);
    Task<bool> DecideAsync(int organizationId, string? approverId, string userId, int id, LeaveDecisionRequest request, CancellationToken ct);
}
