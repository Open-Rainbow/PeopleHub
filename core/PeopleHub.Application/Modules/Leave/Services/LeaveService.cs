using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Application.Modules.Leave.Services;

/// <summary>Validates input, resolves org/employee from the request, then calls the repository.</summary>
public sealed class LeaveService(
    ILeaveRepository repository,
    IValidator<ApplyLeaveRequest> applyValidator,
    IValidator<LeaveDecisionRequest> decisionValidator,
    IRequestContext context) : ILeaveService
{
    private const string Resource = "Leave request";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? "anonymous" : context.UserId!;

    public Task<IReadOnlyList<LeaveTypeDto>> GetTypesAsync(string? employeeId, int? year, CancellationToken ct)
    {
        var employee = OptionalEmployee(employeeId);
        return List(repository.GetTypesAsync(OrgId, employee, employee is null ? null : Year(year), ct));
    }

    public Task<IReadOnlyList<HolidayDto>> GetHolidaysAsync(int? year, CancellationToken ct) =>
        List(repository.GetHolidaysAsync(OrgId, Year(year), ct));

    public Task<IReadOnlyList<LeaveBalanceDto>> GetBalancesAsync(string? employeeId, int? year, CancellationToken ct) =>
        List(repository.GetBalancesAsync(OrgId, Employee(employeeId), Year(year), ct));

    public Task<IReadOnlyList<LeaveRequestDto>> GetRequestsAsync(string? employeeId, string? status, CancellationToken ct)
    {
        var match = string.IsNullOrWhiteSpace(status)
            ? "All"
            : LeaveRules.Statuses.FirstOrDefault(s => s.Equals(status.Trim(), StringComparison.OrdinalIgnoreCase));
        if (match is null)
            throw Invalid("status", "Status must be All, Pending, Approved, Rejected or Cancelled.");

        return List(repository.GetRequestsAsync(OrgId, Employee(employeeId), match == "All" ? null : match, ct));
    }

    public async Task<LeaveRequestDto> GetRequestAsync(int id, CancellationToken ct) =>
        await repository.GetRequestAsync(OrgId, id, ct) ?? throw new NotFoundException(Resource, id);

    public async Task<LeaveRequestDto> ApplyAsync(ApplyLeaveRequest request, CancellationToken ct)
    {
        await applyValidator.EnsureValidAsync(request, ct);
        var employee = Employee(request.EmployeeId);
        var normalized = request with
        {
            LeaveType = request.LeaveType!.Trim().ToLowerInvariant(),
            DayPart = string.IsNullOrWhiteSpace(request.DayPart) ? "full" : request.DayPart.Trim().ToLowerInvariant(),
            Reason = request.Reason!.Trim(),
        };

        var result = await repository.ApplyAsync(OrgId, employee, UserId, normalized, ct);
        return await GetRequestAsync(result.Id ?? throw new BusinessRuleException(result.Message), ct);
    }

    public async Task<LeaveRequestDto> WithdrawAsync(int id, string? employeeId, CancellationToken ct)
    {
        if (!await repository.WithdrawAsync(OrgId, Employee(employeeId), UserId, id, ct))
            throw new NotFoundException(Resource, id);
        return await GetRequestAsync(id, ct);
    }

    public Task<IReadOnlyList<LeaveRequestDto>> GetApprovalsAsync(string? approverId, CancellationToken ct) =>
        List(repository.GetApprovalsAsync(OrgId, Approver(approverId), ct));

    public async Task<LeaveRequestDto> DecideAsync(int id, LeaveDecisionRequest request, CancellationToken ct)
    {
        await decisionValidator.EnsureValidAsync(request, ct);
        if (!await repository.DecideAsync(OrgId, Approver(request.ApproverId), UserId, id, request, ct))
            throw new NotFoundException(Resource, id);
        return await GetRequestAsync(id, ct);
    }

    /// <summary>Authenticated: the token decides who you are. Until login exists, the client passes the employee code.</summary>
    private string Employee(string? fromRequest)
    {
        if (context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)) return context.UserId!;
        return string.IsNullOrWhiteSpace(fromRequest)
            ? throw Invalid("employeeId", "Employee id is required.")
            : fromRequest.Trim();
    }

    private string? OptionalEmployee(string? fromRequest) =>
        context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)
            ? context.UserId
            : string.IsNullOrWhiteSpace(fromRequest) ? null : fromRequest.Trim();

    private string? Approver(string? fromRequest) =>
        context.IsAuthenticated && !string.IsNullOrWhiteSpace(context.UserId)
            ? context.UserId
            : string.IsNullOrWhiteSpace(fromRequest) ? null : fromRequest.Trim();

    private static int Year(int? year)
    {
        var value = year ?? DateTime.Today.Year;
        return value is < 2000 or > 2100 ? throw Invalid("year", "Year must be between 2000 and 2100.") : value;
    }

    private static RequestValidationException Invalid(string field, string message) =>
        new(new Dictionary<string, string[]> { [field] = [message] });

    private static async Task<IReadOnlyList<T>> List<T>(Task<List<T>> rows) => await rows;
}
