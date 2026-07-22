using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;
using PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.Repositories;

namespace PeopleHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<IPersonalInfoRepository>(_ =>
            new PersonalInfoRepository(configuration));

        return services;
    }
}