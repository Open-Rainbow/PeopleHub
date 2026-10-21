using PeopleHub.Application.Modules.Employees.Directory.Contracts;

namespace PeopleHub.Application.Modules.Employees.Directory.Interfaces;

/// <summary>One method per directory stored procedure (database/employees.sql).</summary>
public interface IEmployeeDirectoryRepository
{
    Task<List<EmployeeListItemDto>> GetEmployeesAsync(int organizationId, EmployeeQuery query, CancellationToken ct);
    Task<EmployeeSummaryDto?> GetSummaryAsync(int organizationId, CancellationToken ct);
    Task<List<FilterOptionDto>> GetFiltersAsync(int organizationId, CancellationToken ct);
    Task<EmployeeProfileDto?> GetProfileAsync(int organizationId, string employeeCode, CancellationToken ct);
    Task<List<EmployeeStatusHistoryDto>> GetStatusHistoryAsync(int organizationId, string employeeCode, CancellationToken ct);
    Task<bool> SetStatusAsync(int organizationId, string employeeCode, SetEmployeeStatusRequest request, string userId, CancellationToken ct);
    Task<bool> DeleteAsync(int organizationId, string employeeCode, string userId, CancellationToken ct);
}
