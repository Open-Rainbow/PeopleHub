using System.Globalization;
using System.Text;
using FluentValidation;
using PeopleHub.Application.Abstractions.Context;
using PeopleHub.Application.Common.Exceptions;
using PeopleHub.Application.Common.Validation;
using PeopleHub.Application.Modules.Employees.Directory.Contracts;
using PeopleHub.Application.Modules.Employees.Directory.Interfaces;

namespace PeopleHub.Application.Modules.Employees.Directory.Services;

/// <summary>
/// View Employee screen. Lists employees with search / filters / sort / paging, shows a profile,
/// changes status (with history), removes employees and exports the current list as CSV.
/// </summary>
public sealed class EmployeeDirectoryService(
    IEmployeeDirectoryRepository repository,
    IValidator<EmployeeQuery> queryValidator,
    IValidator<SetEmployeeStatusRequest> statusValidator,
    IRequestContext context) : IEmployeeDirectoryService
{
    private const string Resource = "Employee";

    private int OrgId => context.RequireOrganizationId();
    private string UserId => string.IsNullOrWhiteSpace(context.UserId) ? (context.Role ?? "anonymous") : context.UserId!;

    public async Task<EmployeePageDto> GetEmployeesAsync(EmployeeQuery query, CancellationToken ct)
    {
        await queryValidator.EnsureValidAsync(query, ct);
        var q = Normalize(query);
        var rows = await repository.GetEmployeesAsync(OrgId, q, ct);
        if (rows.Count == 0 && q.Page > 1)
        {
            // Asked for a page past the end (e.g. after a delete): return the first page instead.
            q.Page = 1;
            rows = await repository.GetEmployeesAsync(OrgId, q, ct);
        }
        return new EmployeePageDto(rows, rows.FirstOrDefault()?.TotalCount ?? 0, q.Page, q.PageSize);
    }

    public async Task<EmployeeSummaryDto> GetSummaryAsync(CancellationToken ct) =>
        await repository.GetSummaryAsync(OrgId, ct) ?? new EmployeeSummaryDto();

    public async Task<EmployeeFiltersDto> GetFiltersAsync(CancellationToken ct)
    {
        var all = await repository.GetFiltersAsync(OrgId, ct);
        IReadOnlyList<FilterOptionDto> Of(string kind) => all.Where(f => f.Kind == kind).ToList();
        return new EmployeeFiltersDto(Of("department"), Of("location"), Of("type"), Of("status"), Of("manager"));
    }

    public async Task<EmployeeProfileDto> GetProfileAsync(string employeeCode, CancellationToken ct)
    {
        var code = Code(employeeCode);
        return await repository.GetProfileAsync(OrgId, code, ct) ?? throw new NotFoundException(Resource, code);
    }

    public async Task<IReadOnlyList<EmployeeStatusHistoryDto>> GetStatusHistoryAsync(string employeeCode, CancellationToken ct)
    {
        var code = Code(employeeCode);
        _ = await repository.GetProfileAsync(OrgId, code, ct) ?? throw new NotFoundException(Resource, code);
        return await repository.GetStatusHistoryAsync(OrgId, code, ct);
    }

    public async Task<EmployeeProfileDto> SetStatusAsync(string employeeCode, SetEmployeeStatusRequest request, CancellationToken ct)
    {
        await statusValidator.EnsureValidAsync(request, ct);
        var code = Code(employeeCode);
        var clean = request with
        {
            Status = EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.Statuses, request.Status),
            Reason = string.IsNullOrWhiteSpace(request.Reason) ? null : request.Reason.Trim(),
            EffectiveDate = request.EffectiveDate?.Date,
        };
        if (!await repository.SetStatusAsync(OrgId, code, clean, UserId, ct)) throw new NotFoundException(Resource, code);
        return await GetProfileAsync(code, ct);
    }

    public async Task DeleteAsync(string employeeCode, CancellationToken ct)
    {
        var code = Code(employeeCode);
        if (!await repository.DeleteAsync(OrgId, code, UserId, ct)) throw new NotFoundException(Resource, code);
    }

    public async Task<ExportFileDto> ExportAsync(EmployeeQuery query, CancellationToken ct)
    {
        var check = query.Copy();
        check.Page = 1;
        check.PageSize = EmployeeDirectoryRules.DefaultPageSize;
        await queryValidator.EnsureValidAsync(check, ct);

        var q = Normalize(query);
        q.Page = 1;
        q.PageSize = EmployeeDirectoryRules.ExportMax;
        var rows = await repository.GetEmployeesAsync(OrgId, q, ct);

        var csv = new StringBuilder();
        csv.AppendLine("Employee ID,Name,Designation,Department,Business unit,Location,Type,Status,Date of joining,Manager,Office email,Mobile");
        foreach (var r in rows)
        {
            csv.AppendLine(string.Join(',', new[]
            {
                r.EmployeeCode, r.FullName, r.Designation, r.Department, r.BusinessUnit, r.WorkLocation, r.EmployeeType, r.Status,
                r.DateOfJoining?.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                r.ManagerName is null ? r.ManagerCode : $"{r.ManagerName} ({r.ManagerCode})",
                r.OfficeEmail, r.MobileNumber,
            }.Select(Cell)));
        }

        var bytes = Encoding.UTF8.GetPreamble().Concat(Encoding.UTF8.GetBytes(csv.ToString())).ToArray();
        var name = $"employees-{DateTime.UtcNow:yyyyMMdd-HHmm}.csv";
        return new ExportFileDto(name, "text/csv", bytes);
    }

    // ---- Helpers -------------------------------------------------------------------------------

    private static EmployeeQuery Normalize(EmployeeQuery q) => new()
    {
        Search = EmployeeDirectoryRules.Filter(q.Search, EmployeeDirectoryRules.SearchMax),
        Status = EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.Statuses, EmployeeDirectoryRules.Filter(q.Status, 30)),
        Department = EmployeeDirectoryRules.Filter(q.Department, 30),
        Location = EmployeeDirectoryRules.Filter(q.Location, 50),
        EmployeeType = EmployeeDirectoryRules.Filter(q.EmployeeType, 20),
        ManagerCode = EmployeeDirectoryRules.Filter(q.ManagerCode, 50),
        JoinedFrom = q.JoinedFrom?.Date,
        JoinedTo = q.JoinedTo?.Date,
        IncludeExited = q.IncludeExited,
        SortBy = EmployeeDirectoryRules.Canonical(EmployeeDirectoryRules.SortFields, q.SortBy) ?? "name",
        SortDir = string.Equals(q.SortDir?.Trim(), "desc", StringComparison.OrdinalIgnoreCase) ? "desc" : "asc",
        Page = Math.Max(1, q.Page),
        PageSize = Math.Clamp(q.PageSize, 1, EmployeeDirectoryRules.MaxPageSize),
    };

    private static string Code(string? employeeCode)
    {
        var code = employeeCode?.Trim() ?? "";
        if (!EmployeeDirectoryRules.IsCode(code)) throw new NotFoundException(Resource, code);
        return code.ToUpperInvariant();
    }

    /// <summary>CSV cell: quoted when needed; formula-looking values are prefixed so Excel shows them as text.</summary>
    private static string Cell(string? value)
    {
        var v = value ?? "";
        if (v.Length > 0 && "=+-@".Contains(v[0])) v = "'" + v;
        return v.IndexOfAny([',', '"', '\n', '\r']) >= 0 ? $"\"{v.Replace("\"", "\"\"")}\"" : v;
    }
}
