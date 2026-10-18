namespace PeopleHub.Application.Common.Exceptions;

/// <summary>Expected failures. Server maps each to a ProblemDetails status code.</summary>
public abstract class AppException(string message) : Exception(message);

/// <summary>400</summary>
public sealed class RequestValidationException(IReadOnlyDictionary<string, string[]> errors)
    : AppException("One or more validation errors occurred.")
{
    public IReadOnlyDictionary<string, string[]> Errors { get; } = errors;
}

/// <summary>403</summary>
public sealed class ForbiddenException(string message) : AppException(message);

/// <summary>404</summary>
public sealed class NotFoundException(string resource, object key)
    : AppException($"{resource} '{key}' was not found.");

/// <summary>409</summary>
public sealed class ConflictException(string message) : AppException(message);

/// <summary>422: request is valid but breaks a business rule (e.g. SP THROW 50000+).</summary>
public sealed class BusinessRuleException(string message) : AppException(message);
