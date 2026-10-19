using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Attendance.Contracts;
using PeopleHub.Application.Modules.Attendance.Interfaces;

namespace PeopleHub.Application.Modules.Attendance.Services;

/// <summary>Validates input, resolves org/employee from the request, then calls the repository.
/// "Today" is decided by the database in the organization's time zone (att.Policy.TimeZone).</summary>
public sealed class AttendanceService(
    IAttendanceRepository repository,
    IValidator<CheckInRequest> checkInValidator,
    IValidator<CheckOutRequest> checkOutValidator,
    IValidator<RegularizationRequest> regularizationValidator,
    IValidator<RegularizationDecisionRequest> decisionValidator,
    IRequestContext context) : IAttendanceService
{
    private const string Resource = "Regularization request";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public async Task<AttendancePolicyDto> GetPolicyAsync(CancellationToken ct) =>
        await repository.GetPolicyAsync(OrgId, ct) ?? throw new NotFoundException("Attendance policy", OrgId);

    public async Task<IReadOnlyList<AttendanceDayDto>> GetDaysAsync(string? employeeId, DateTime? from, DateTime? to, CancellationToken ct)
    {
        var today = DateTime.Today;
        var start = (from ?? new DateTime(today.Year, today.Month, 1)).Date;
        var end = (to ?? start.AddMonths(1).AddDays(-1)).Date;
        Range(start, end, AttendanceRules.MaxRangeDays, "Pick a range of up to 3 months.");
        return await repository.GetDaysAsync(OrgId, Employee(employeeId), start, end, ct);
    }

    public async Task<AttendanceActionResult> CheckInAsync(CheckInRequest request, CancellationToken ct)
    {
        await checkInValidator.EnsureValidAsync(request, ct);
        return await repository.CheckInAsync(OrgId, Employee(request.EmployeeId), UserId,
            AttendanceRules.CanonicalMode(request.WorkMode)!, Clean(request.Note), ct);
    }

    public async Task<AttendanceActionResult> CheckOutAsync(CheckOutRequest request, CancellationToken ct)
    {
        await checkOutValidator.EnsureValidAsync(request, ct);
        return await repository.CheckOutAsync(OrgId, Employee(request.EmployeeId), UserId, Clean(request.Note), ct);
    }

    public async Task<IReadOnlyList<TeamDayRowDto>> GetTeamDayAsync(DateTime? date, string? search, string? managerId, CancellationToken ct)
    {
        var term = Clean(search);
        if (term is { Length: > AttendanceRules.SearchMax })
            throw Invalid("search", $"Search must be {AttendanceRules.SearchMax} characters or fewer.");
        return await repository.GetTeamDayAsync(OrgId, (date ?? DateTime.Today).Date, term, Clean(managerId), ct);
    }

    public async Task<IReadOnlyList<AttendanceTrendDto>> GetTrendAsync(DateTime? from, DateTime? to, CancellationToken ct)
    {
        var end = (to ?? DateTime.Today).Date;
        var start = (from ?? end.AddDays(-29)).Date;
        Range(start, end, AttendanceRules.MaxTrendDays, "Pick a range of up to 2 months.");
        return await repository.GetTrendAsync(OrgId, start, end, ct);
    }

    public async Task<IReadOnlyList<RegularizationDto>> GetRegularizationsAsync(string? employeeId, string? status, CancellationToken ct)
    {
        var match = string.IsNullOrWhiteSpace(status)
            ? "All"
            : AttendanceRules.RegularizationStatuses.FirstOrDefault(s => s.Equals(status.Trim(), StringComparison.OrdinalIgnoreCase));
        if (match is null)
            throw Invalid("status", "Status must be All, Pending, Approved, Rejected or Cancelled.");

        return await repository.GetRegularizationsAsync(OrgId, Clean(employeeId), match == "All" ? null : match, null, ct);
    }

    public async Task<RegularizationDto> GetRegularizationAsync(int id, CancellationToken ct) =>
        (await repository.GetRegularizationsAsync(OrgId, null, null, id, ct)).FirstOrDefault()
        ?? throw new NotFoundException(Resource, id);

    public async Task<RegularizationDto> RequestRegularizationAsync(RegularizationRequest request, CancellationToken ct)
    {
        await regularizationValidator.EnsureValidAsync(request, ct);
        var id = await repository.RequestRegularizationAsync(
            OrgId,
            Employee(request.EmployeeId),
            UserId,
            request.WorkDate!.Value.Date,
            AttendanceRules.ParseTime(request.CheckIn)!.Value,
            AttendanceRules.ParseTime(request.CheckOut)!.Value,
            AttendanceRules.CanonicalMode(request.WorkMode)!,
            request.Reason!.Trim(),
            ct);
        return await GetRegularizationAsync(id ?? throw new BusinessRuleException("The request could not be saved."), ct);
    }

    public async Task<RegularizationDto> DecideRegularizationAsync(int id, RegularizationDecisionRequest request, CancellationToken ct)
    {
        await decisionValidator.EnsureValidAsync(request, ct);
        var approver = context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId) ? context.UserId : Clean(request.ApproverId);
        if (!await repository.DecideRegularizationAsync(OrgId, id, request.Approve!.Value, Clean(request.Note), approver, UserId, ct))
            throw new NotFoundException(Resource, id);
        return await GetRegularizationAsync(id, ct);
    }

    public async Task<RegularizationDto> CancelRegularizationAsync(int id, string? employeeId, CancellationToken ct)
    {
        if (!await repository.CancelRegularizationAsync(OrgId, id, Employee(employeeId), UserId, ct))
            throw new NotFoundException(Resource, id);
        return await GetRegularizationAsync(id, ct);
    }

    /// <summary>Authenticated: the token decides who you are. Until login exists, the client passes the employee code.</summary>
    private string Employee(string? fromRequest)
    {
        if (context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)) return context.UserId!;
        return string.IsNullOrWhiteSpace(fromRequest)
            ? throw Invalid("employeeId", "Employee id is required.")
            : fromRequest.Trim();
    }

    private static void Range(DateTime from, DateTime to, int maxDays, string message)
    {
        if (to < from) throw Invalid("to", "End date must be on or after the start date.");
        if ((to - from).TotalDays + 1 > maxDays) throw Invalid("to", message);
    }

    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });
}
