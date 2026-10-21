using PeopleHub.Application.Modules.Employees.Directory.Contracts;

namespace PeopleHub.Application.Modules.Employees.Directory.Interfaces;

/// <summary>View Employee screen: search, filter, profile, status changes, delete and export.</summary>
public interface IEmployeeDirectoryService
{
    Task<EmployeePageDto> GetEmployeesAsync(EmployeeQuery query, CancellationToken ct);
    Task<EmployeeSummaryDto> GetSummaryAsync(CancellationToken ct);
    Task<EmployeeFiltersDto> GetFiltersAsync(CancellationToken ct);
    Task<EmployeeProfileDto> GetProfileAsync(string employeeCode, CancellationToken ct);
    Task<IReadOnlyList<EmployeeStatusHistoryDto>> GetStatusHistoryAsync(string employeeCode, CancellationToken ct);
    Task<EmployeeProfileDto> SetStatusAsync(string employeeCode, SetEmployeeStatusRequest request, CancellationToken ct);
    Task DeleteAsync(string employeeCode, CancellationToken ct);
    Task<ExportFileDto> ExportAsync(EmployeeQuery query, CancellationToken ct);
}
