namespace PeopleHub.Infrastructure.Persistence;

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    public string ConnectionStringName { get; set; } = "PeopleHubDb";

    public int CommandTimeoutSeconds { get; set; } = 30;
}
