namespace PeopleHub.Application.Abstractions.Messaging;

/// <summary>Marker for anything the dispatcher can send.</summary>
public interface IRequest<TResponse>;

/// <summary>Changes state. One handler per command.</summary>
public interface ICommand<TResponse> : IRequest<TResponse>;

/// <summary>Reads state, never changes it.</summary>
public interface IQuery<TResponse> : IRequest<TResponse>;

public interface IRequestHandler<in TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    Task<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken);
}

public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, TResponse>
    where TCommand : ICommand<TResponse>;

public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, TResponse>
    where TQuery : IQuery<TResponse>;

public delegate Task<TResponse> RequestHandlerDelegate<TResponse>();

/// <summary>Cross-cutting step that wraps every handler (logging, validation, ...).</summary>
public interface IPipelineBehavior<in TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    Task<TResponse> HandleAsync(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken);
}

/// <summary>Single entry point controllers/jobs use to run a use case.</summary>
public interface IDispatcher
{
    Task<TResponse> SendAsync<TResponse>(
        IRequest<TResponse> request,
        CancellationToken cancellationToken = default);
}
