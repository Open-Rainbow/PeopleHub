using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Announcements.Interfaces;
using PeopleHub.Application.Modules.Announcements.Services;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Application.Modules.Employees.AddEmployee.Services;

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

        return services;
    }
}
