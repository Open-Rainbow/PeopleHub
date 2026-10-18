using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Abstractions.Messaging;
using PeopleHub.Application.Common.Behaviors;
using PeopleHub.Application.Common.Messaging;

namespace PeopleHub.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddPeopleHubApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;

        services.AddScoped<IDispatcher, Dispatcher>();
        services.AddRequestHandlers(assembly);

        // Pipeline order = registration order (first is outermost).
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
        services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        services.AddValidatorsFromAssembly(assembly, ServiceLifetime.Scoped, includeInternalTypes: true);

        return services;
    }

    /// <summary>Registers every closed IRequestHandler&lt;,&gt; found in the assembly.</summary>
    public static IServiceCollection AddRequestHandlers(this IServiceCollection services, Assembly assembly)
    {
        var handlerInterface = typeof(IRequestHandler<,>);

        var registrations = assembly.GetTypes()
            .Where(type => type is { IsAbstract: false, IsInterface: false, IsGenericTypeDefinition: false })
            .SelectMany(type => type.GetInterfaces()
                .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == handlerInterface)
                .Select(i => (Service: i, Implementation: type)));

        foreach (var (service, implementation) in registrations)
        {
            services.AddScoped(service, implementation);
        }

        return services;
    }
}
