using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Services;

namespace PeopleHub.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubApplication(this IServiceCollection services)
    {
        services.AddScoped<IPersonalInfoService, PersonalInfoService>();

        return services;
    }
}