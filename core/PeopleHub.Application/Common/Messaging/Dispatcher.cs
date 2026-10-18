using System.Collections.Concurrent;
using Microsoft.Extensions.DependencyInjection;
using PeopleHub.Application.Abstractions.Messaging;

namespace PeopleHub.Application.Common.Messaging;

/// <summary>
/// Lightweight in-house mediator (MediatR went commercial). Resolves the handler,
/// wraps it in every registered pipeline behavior, runs it.
/// </summary>
internal sealed class Dispatcher(IServiceProvider serviceProvider) : IDispatcher
{
    private static readonly ConcurrentDictionary<Type, object> Wrappers = new();

    public Task<TResponse> SendAsync<TResponse>(
        IRequest<TResponse> request,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);

        var wrapper = (RequestHandlerWrapper<TResponse>)Wrappers.GetOrAdd(
            request.GetType(),
            requestType => Activator.CreateInstance(
                typeof(RequestHandlerWrapperImpl<,>).MakeGenericType(requestType, typeof(TResponse)))!);

        return wrapper.HandleAsync(request, serviceProvider, cancellationToken);
    }
}

internal abstract class RequestHandlerWrapper<TResponse>
{
    public abstract Task<TResponse> HandleAsync(
        IRequest<TResponse> request,
        IServiceProvider serviceProvider,
        CancellationToken cancellationToken);
}

internal sealed class RequestHandlerWrapperImpl<TRequest, TResponse> : RequestHandlerWrapper<TResponse>
    where TRequest : IRequest<TResponse>
{
    public override Task<TResponse> HandleAsync(
        IRequest<TResponse> request,
        IServiceProvider serviceProvider,
        CancellationToken cancellationToken)
    {
        var typedRequest = (TRequest)request;
        var handler = serviceProvider.GetRequiredService<IRequestHandler<TRequest, TResponse>>();
        var behaviors = serviceProvider.GetServices<IPipelineBehavior<TRequest, TResponse>>().ToArray();

        RequestHandlerDelegate<TResponse> pipeline = () => handler.HandleAsync(typedRequest, cancellationToken);

        for (var i = behaviors.Length - 1; i >= 0; i--)
        {
            var behavior = behaviors[i];
            var next = pipeline;
            pipeline = () => behavior.HandleAsync(typedRequest, next, cancellationToken);
        }

        return pipeline();
    }
}
