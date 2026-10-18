using PeopleHub.Application.Abstractions.Context;

namespace PeopleHub.Worker.Context;

/// <summary>
/// Request context for background jobs. Create a DI scope per job and call
/// UseOrganization(...) before dispatching commands for that organization.
/// </summary>
public sealed class WorkerRequestContext : IRequestContext
{
    public string? UserId => "system";

    public int? OrganizationId { get; private set; }

    public string CorrelationId { get; } = Guid.NewGuid().ToString("N");

    public bool IsAuthenticated => false;

    public void UseOrganization(int organizationId) => OrganizationId = organizationId;
}
