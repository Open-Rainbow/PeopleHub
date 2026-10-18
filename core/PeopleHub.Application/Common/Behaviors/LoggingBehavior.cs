using System.Diagnostics;
using Microsoft.Extensions.Logging;
using PeopleHub.Application.Abstractions.Messaging;
using PeopleHub.Application.Common.Exceptions;

namespace PeopleHub.Application.Common.Behaviors;

/// <summary>Logs request name + duration. Never logs payloads (PII).</summary>
internal sealed class LoggingBehavior<TRequest, TResponse>(
    ILogger<LoggingBehavior<TRequest, TResponse>> logger)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    public async Task<TResponse> HandleAsync(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var started = Stopwatch.GetTimestamp();

        try
        {
            var response = await next();
            logger.LogInformation(
                "Handled {RequestName} in {ElapsedMs:0.0} ms",
                requestName,
                Stopwatch.GetElapsedTime(started).TotalMilliseconds);
            return response;
        }
        catch (AppException ex)
        {
            logger.LogInformation(
                "{RequestName} rejected: {Reason}",
                requestName,
                ex.GetType().Name);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(
                ex,
                "{RequestName} failed after {ElapsedMs:0.0} ms",
                requestName,
                Stopwatch.GetElapsedTime(started).TotalMilliseconds);
            throw;
        }
    }
}
