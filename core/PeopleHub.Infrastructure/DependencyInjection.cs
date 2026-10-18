using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Infrastructure.Database;
using PeopleHub.Infrastructure.Modules.Employees;

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

        return services;
    }
}
