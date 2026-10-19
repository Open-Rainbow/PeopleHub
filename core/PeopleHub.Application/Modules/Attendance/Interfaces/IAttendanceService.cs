using PeopleHub.Application.Modules.Attendance.Contracts;

namespace PeopleHub.Application.Modules.Attendance.Interfaces;

public interface IAttendanceService
{
    Task<AttendancePolicyDto> GetPolicyAsync(CancellationToken ct);

    /// <summary>Defaults to the current month.</summary>
    Task<IReadOnlyList<AttendanceDayDto>> GetDaysAsync(string? employeeId, DateTime? from, DateTime? to, CancellationToken ct);

    Task<AttendanceActionResult> CheckInAsync(CheckInRequest request, CancellationToken ct);
    Task<AttendanceActionResult> CheckOutAsync(CheckOutRequest request, CancellationToken ct);

    /// <summary>Everyone's status on one day (default today). managerId limits it to that manager's reports.</summary>
    Task<IReadOnlyList<TeamDayRowDto>> GetTeamDayAsync(DateTime? date, string? search, string? managerId, CancellationToken ct);

    /// <summary>Daily organization counts. Defaults to the last 30 days.</summary>
    Task<IReadOnlyList<AttendanceTrendDto>> GetTrendAsync(DateTime? from, DateTime? to, CancellationToken ct);

    Task<IReadOnlyList<RegularizationDto>> GetRegularizationsAsync(string? employeeId, string? status, CancellationToken ct);
    Task<RegularizationDto> GetRegularizationAsync(int id, CancellationToken ct);
    Task<RegularizationDto> RequestRegularizationAsync(RegularizationRequest request, CancellationToken ct);
    Task<RegularizationDto> DecideRegularizationAsync(int id, RegularizationDecisionRequest request, CancellationToken ct);
    Task<RegularizationDto> CancelRegularizationAsync(int id, string? employeeId, CancellationToken ct);
}
