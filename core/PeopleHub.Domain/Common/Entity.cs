namespace PeopleHub.Domain.Common;

/// <summary>Base type for anything with identity.</summary>
public abstract class Entity<TId>
    where TId : notnull
{
    public TId Id { get; protected set; } = default!;
}

/// <summary>Entity that tracks who/when created and last changed it.</summary>
public abstract class AuditableEntity<TId> : Entity<TId>
    where TId : notnull
{
    public DateTime CreatedAtUtc { get; protected set; }

    public string? CreatedBy { get; protected set; }

    public DateTime? UpdatedAtUtc { get; protected set; }

    public string? UpdatedBy { get; protected set; }
}

/// <summary>Marks data that always belongs to exactly one organization.</summary>
public interface IOrganizationScoped
{
    int OrganizationId { get; }
}
