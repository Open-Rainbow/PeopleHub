using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Application.Modules.Leave.Interfaces;
using PeopleHub.Infrastructure.Database;
using PeopleHub.Infrastructure.Modules.Announcements;
using PeopleHub.Infrastructure.Modules.Employees;
using PeopleHub.Infrastructure.Modules.Leave;

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

        return services;
    }
}
