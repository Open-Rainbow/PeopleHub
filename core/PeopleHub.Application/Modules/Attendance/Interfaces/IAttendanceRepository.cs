using PeopleHub.Application.Modules.Attendance.Contracts;

namespace PeopleHub.Application.Modules.Attendance.Interfaces;

/// <summary>Database calls for attendance (see database/attendance.sql).</summary>
public interface IAttendanceRepository
{
    Task<AttendancePolicyDto?> GetPolicyAsync(int organizationId, CancellationToken ct);
    Task<List<AttendanceDayDto>> GetDaysAsync(int organizationId, string employeeId, DateTime from, DateTime to, CancellationToken ct);
    Task<AttendanceActionResult> CheckInAsync(int organizationId, string employeeId, string userId, string workMode, string? note, CancellationToken ct);
    Task<AttendanceActionResult> CheckOutAsync(int organizationId, string employeeId, string userId, string? note, CancellationToken ct);
    Task<List<TeamDayRowDto>> GetTeamDayAsync(int organizationId, DateTime date, string? search, string? managerId, CancellationToken ct);
    Task<List<AttendanceTrendDto>> GetTrendAsync(int organizationId, DateTime from, DateTime to, CancellationToken ct);
    Task<List<RegularizationDto>> GetRegularizationsAsync(int organizationId, string? employeeId, string? status, int? id, CancellationToken ct);

    /// <summary>Returns the new request id.</summary>
    Task<int?> RequestRegularizationAsync(int organizationId, string employeeId, string userId, DateTime workDate,
        TimeSpan checkIn, TimeSpan checkOut, string workMode, string reason, CancellationToken ct);

    /// <summary>False when the request does not exist.</summary>
    Task<bool> DecideRegularizationAsync(int organizationId, int id, bool approve, string? note, string? approverId, string userId, CancellationToken ct);

    /// <summary>False when the request does not exist or is not the employee's.</summary>
    Task<bool> CancelRegularizationAsync(int organizationId, int id, string employeeId, string userId, CancellationToken ct);
}
