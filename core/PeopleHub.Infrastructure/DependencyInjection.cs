using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Abstractions.Time;
using PeopleHub.Infrastructure.Modules.Employees;
using PeopleHub.Infrastructure.Persistence;
using PeopleHub.Infrastructure.Time;

namespace PeopleHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<DatabaseOptions>(configuration.GetSection(DatabaseOptions.SectionName));

        services.AddSingleton<IDateTimeProvider, SystemDateTimeProvider>();
        services.AddSingleton<ISqlConnectionFactory, SqlConnectionFactory>();
        services.AddScoped<IStoredProcedureExecutor, StoredProcedureExecutor>();

        // One line per module keeps this file tiny as modules grow.
        services.AddEmployeesInfrastructure();

        return services;
    }
}
