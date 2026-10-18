namespace PeopleHub.Domain.Common;

/// <summary>Raised when a domain invariant is broken.</summary>
public class DomainException(string message) : Exception(message);
