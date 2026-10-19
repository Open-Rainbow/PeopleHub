using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Application.Modules.Announcements.Services;
using PeopleHub.Application.Modules.Attendance.Interfaces;
using PeopleHub.Application.Modules.Attendance.Services;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Application.Modules.Employees.AddEmployee.Services;
using PeopleHub.Application.Modules.Holidays.Interfaces;
using PeopleHub.Application.Modules.Holidays.Services;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Application.Modules.Leave.Services;
using PeopleHub.Application.Modules.OrgChart.Interfaces;
using PeopleHub.Application.Modules.OrgChart.Services;
using PeopleHub.Application.Modules.Payroll.Interfaces;
using PeopleHub.Application.Modules.Payroll.Services;
using PeopleHub.Application.Modules.Policies.Interfaces;
using PeopleHub.Application.Modules.Policies.Services;

namespace PeopleHub.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubApplication(this IServiceCollection services)
    {
        // Picks up every validator in this project automatically.
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly, includeInternalTypes: true);

        // Services: one line per module.
        services.AddScoped<IAddEmployeeService, AddEmployeeService>();
        services.AddScoped<IAnnouncementService, AnnouncementService>();
        services.AddScoped<ILeaveService, LeaveService>();
        services.AddScoped<ILeavePolicyService, LeavePolicyService>();
        services.AddScoped<IHolidayService, HolidayService>();
        services.AddScoped<IAttendanceService, AttendanceService>();
        services.AddScoped<IOrgChartService, OrgChartService>();
        services.AddScoped<IPayrollService, PayrollService>();
        services.AddScoped<IPolicyService, PolicyService>();

        return services;
    }
}
