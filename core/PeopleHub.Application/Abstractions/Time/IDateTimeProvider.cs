namespace PeopleHub.Application.Abstractions.Time;

/// <summary>Testable clock. Never call DateTime.Now in handlers/validators.</summary>
public interface IDateTimeProvider
{
    DateTime UtcNow { get; }

    DateOnly Today { get; }
}
