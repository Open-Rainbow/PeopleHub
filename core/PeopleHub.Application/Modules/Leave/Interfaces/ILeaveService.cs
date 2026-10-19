using PeopleHub.Application.Modules.Leave.Contracts;

namespace PeopleHub.Application.Modules.Leave.Interfaces;

public interface ILeaveService
{
    /// <summary>With an employee: the rules in force for them (published policy + carry forward). Without: the catalog.</summary>
    Task<IReadOnlyList<LeaveTypeDto>> GetTypesAsync(string? employeeId, int? year, CancellationToken ct);
    Task<IReadOnlyList<HolidayDto>> GetHolidaysAsync(int? year, CancellationToken ct);
    Task<IReadOnlyList<LeaveBalanceDto>> GetBalancesAsync(string? employeeId, int? year, CancellationToken ct);
    Task<IReadOnlyList<LeaveRequestDto>> GetRequestsAsync(string? employeeId, string? status, CancellationToken ct);
    Task<LeaveRequestDto> GetRequestAsync(int id, CancellationToken ct);
    Task<LeaveRequestDto> ApplyAsync(ApplyLeaveRequest request, CancellationToken ct);
    Task<LeaveRequestDto> WithdrawAsync(int id, string? employeeId, CancellationToken ct);
    Task<IReadOnlyList<LeaveRequestDto>> GetApprovalsAsync(string? approverId, CancellationToken ct);
    Task<LeaveRequestDto> DecideAsync(int id, LeaveDecisionRequest request, CancellationToken ct);
}
