using System.Globalization;
using System.Text;
using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Leave.Contracts;
using PeopleHub.Application.Modules.Leave.Interfaces;

namespace PeopleHub.Application.Modules.Leave.Services;

/// <summary>
/// Leaves &amp; WFH dashboard. The database returns plain rows for the period; this service filters
/// (status / search), groups employee balances and builds the CSV report. Charts are drawn on the client.
/// </summary>
public sealed class LeaveAdminService(
    ILeaveAdminRepository repository,
    ILeaveRepository leaveRepository,
    IValidator<LeaveAdminQuery> queryValidator,
    IValidator<LeaveAdminEmployeesQuery> employeesValidator,
    IRequestContext context) : ILeaveAdminService
{
    private int OrgId => context.RequireOrganizationId();

    public async Task<LeaveAdminFiltersDto> GetFiltersAsync(CancellationToken ct)
    {
        var departments = await repository.GetDepartmentsAsync(OrgId, ct);
        var types = await leaveRepository.GetTypesAsync(OrgId, null, null, ct);
        return new LeaveAdminFiltersDto
        {
            Headcount = departments.Sum(d => d.Headcount),
            Departments = departments,
            LeaveTypes = types,
        };
    }

    public async Task<LeaveAdminRequestsResult> GetRequestsAsync(LeaveAdminQuery query, CancellationToken ct)
    {
        await queryValidator.EnsureValidAsync(query, ct);
        var (from, to) = Range(query.From, query.To);
        var department = Clean(query.Department);
        var leaveType = Clean(query.LeaveType)?.ToLowerInvariant();

        var rows = await repository.GetRequestsAsync(OrgId, from, to, department, leaveType, ct);
        var newSince = DateTime.UtcNow.AddHours(-LeaveAdminRules.NewWithinHours);
        foreach (var r in rows) r.IsNew = r.Status == "Pending" && r.AppliedAt >= newSince;

        var status = Clean(query.Status);
        IEnumerable<LeaveAdminRequestDto> items = rows;
        if (status is not null && !status.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            items = status.Equals("New", StringComparison.OrdinalIgnoreCase)
                ? items.Where(r => r.IsNew)
                : items.Where(r => r.Status.Equals(status, StringComparison.OrdinalIgnoreCase));
        }

        var search = Clean(query.Search);
        if (search is not null)
        {
            items = items.Where(r =>
                Has(r.EmployeeName, search) || Has(r.EmployeeId, search) || Has(r.Designation, search)
                || Has(r.Department, search) || Has(r.LeaveTypeLabel, search) || Has(r.Reason, search));
        }

        var departments = await repository.GetDepartmentsAsync(OrgId, ct);
        var today = DateTime.Today;

        return new LeaveAdminRequestsResult
        {
            From = from,
            To = to,
            ReferenceDate = today >= from && today <= to ? today : to,
            Headcount = department is null
                ? departments.Sum(d => d.Headcount)
                : departments.Where(d => d.Department.Equals(department, StringComparison.OrdinalIgnoreCase)).Sum(d => d.Headcount),
            Items = items.ToList(),
        };
    }

    public async Task<IReadOnlyList<LeaveAdminEmployeeDto>> GetEmployeesAsync(LeaveAdminEmployeesQuery query, CancellationToken ct)
    {
        await employeesValidator.EnsureValidAsync(query, ct);
        var (from, to) = Range(query.From, query.To);
        var year = to.Year;
        if (query.IgnorePeriod)
        {
            from = new DateTime(year, 1, 1);
            to = new DateTime(year, 12, 31);
        }

        var rows = await repository.GetBalancesAsync(OrgId, year, from, to, Clean(query.Department), Clean(query.Search), ct);

        return rows
            .GroupBy(r => r.EmployeeId)
            .Select(g =>
            {
                var first = g.First();
                var balances = g.Select(r => new LeaveAdminBalanceDto
                {
                    LeaveType = r.LeaveType,
                    Label = r.Label,
                    Total = r.Entitlement,
                    Used = r.Used,
                    Pending = r.Pending,
                    Left = r.Entitlement is null ? null : Math.Max(r.Entitlement.Value - r.Used - r.Pending, 0),
                }).ToList();

                var counted = balances.Where(b => b.Total is not null && b.LeaveType != LeaveAdminRules.WfhCode).ToList();
                var total = counted.Sum(b => b.Total ?? 0);
                var used = counted.Sum(b => b.Used);
                return new LeaveAdminEmployeeDto
                {
                    EmployeeId = first.EmployeeId,
                    EmployeeName = first.EmployeeName,
                    Designation = first.Designation,
                    Department = first.Department,
                    TotalDays = total,
                    UsedDays = used,
                    PendingDays = counted.Sum(b => b.Pending),
                    AvailableDays = counted.Sum(b => b.Left ?? 0),
                    UtilizationPercent = total > 0 ? (int)Math.Round(used / total * 100, MidpointRounding.AwayFromZero) : 0,
                    Balances = balances,
                };
            })
            .OrderBy(e => e.EmployeeName, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    public async Task<string> ExportRequestsCsvAsync(LeaveAdminQuery query, CancellationToken ct)
    {
        var result = await GetRequestsAsync(query, ct);
        var sb = new StringBuilder();
        sb.AppendLine("Employee ID,Name,Role,Department,Leave type,From,To,Days,Status,Applied on,Reason,Approver,Note");
        foreach (var r in result.Items)
        {
            sb.AppendJoin(',',
                Csv(r.EmployeeId), Csv(r.EmployeeName), Csv(r.Designation), Csv(r.Department), Csv(r.LeaveTypeLabel),
                r.FromDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                r.ToDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                r.Days.ToString(CultureInfo.InvariantCulture),
                Csv(r.IsNew ? "New" : r.Status),
                r.AppliedAt.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                Csv(r.Reason), Csv(r.ApproverName), Csv(r.DecisionNote));
            sb.AppendLine();
        }
        return sb.ToString();
    }

    private static (DateTime From, DateTime To) Range(DateTime? from, DateTime? to)
    {
        var today = DateTime.Today;
        var start = (from ?? to ?? today).Date;
        var end = (to ?? from ?? today).Date;
        return (start, end);
    }

    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static bool Has(string? value, string term) =>
        value is not null && value.Contains(term, StringComparison.OrdinalIgnoreCase);

    /// <summary>Quotes a CSV field and blocks spreadsheet formulas.</summary>
    private static string Csv(string? value)
    {
        var v = value ?? string.Empty;
        if (v.Length > 0 && "=+-@".Contains(v[0])) v = "'" + v;
        return v.IndexOfAny([',', '"', '\n', '\r']) >= 0 ? $"\"{v.Replace("\"", "\"\"")}\"" : v;
    }
}
