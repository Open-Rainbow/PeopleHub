using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;
using PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.Repositories;

namespace PeopleHub.Infrastructure.Modules.Employees;

internal static class EmployeesInfrastructure
{
    /// <summary>Register every Add Employee step repository here.</summary>
    public static IServiceCollection AddEmployeesInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IPersonalInfoRepository, PersonalInfoRepository>();

        return services;
    }
}
