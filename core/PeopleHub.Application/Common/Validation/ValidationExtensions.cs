using FluentValidation;
using PeopleHub.Application.Common.Exceptions;

namespace PeopleHub.Application.Common.Validation;

public static class ValidationExtensions
{
    /// <summary>Validates the model and throws a 400 (RequestValidationException) if anything is wrong.</summary>
    public static async Task EnsureValidAsync<T>(this IValidator<T> validator, T model, CancellationToken cancellationToken)
    {
        var result = await validator.ValidateAsync(model, cancellationToken);
        if (result.IsValid)
        {
            return;
        }

        var errors = result.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).Distinct().ToArray());

        throw new RequestValidationException(errors);
    }
}
