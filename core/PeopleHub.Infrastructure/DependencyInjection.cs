using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Application.Modules.Attendance.Interfaces;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Application.Modules.Holidays.Interfaces;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Application.Modules.OrgChart.Interfaces;
using PeopleHub.Application.Modules.Payroll.Interfaces;
using PeopleHub.Infrastructure.Database;
using PeopleHub.Infrastructure.Modules.Announcements;
using PeopleHub.Infrastructure.Modules.Attendance;
using PeopleHub.Infrastructure.Modules.Employees;
using PeopleHub.Infrastructure.Modules.Holidays;
using PeopleHub.Infrastructure.Modules.Leave;
using PeopleHub.Infrastructure.Modules.OrgChart;
using PeopleHub.Infrastructure.Modules.Payroll;

namespace PeopleHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddSingleton<SqlDb>();

        // Repositories: one line per module.
        services.AddScoped<IAddEmployeeRepository, AddEmployeeRepository>();
        services.AddScoped<IAnnouncementRepository, AnnouncementRepository>();
        services.AddScoped<ILeaveRepository, LeaveRepository>();
        services.AddScoped<ILeavePolicyRepository, LeavePolicyRepository>();
        services.AddScoped<IHolidayRepository, HolidayRepository>();
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IOrgChartRepository, OrgChartRepository>();
        services.AddScoped<IPayrollRepository, PayrollRepository>();

        return services;
    }
}
