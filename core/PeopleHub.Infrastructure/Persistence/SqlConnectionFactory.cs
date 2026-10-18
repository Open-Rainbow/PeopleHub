using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace PeopleHub.Infrastructure.Persistence;

public interface ISqlConnectionFactory
{
    Task<SqlConnection> OpenAsync(CancellationToken cancellationToken);
}

internal sealed class SqlConnectionFactory : ISqlConnectionFactory
{
    private readonly string connectionString;

    public SqlConnectionFactory(IConfiguration configuration, IOptions<DatabaseOptions> options)
    {
        var name = options.Value.ConnectionStringName;
        connectionString = configuration.GetConnectionString(name)
            ?? throw new InvalidOperationException($"Connection string '{name}' was not found.");
    }

    public async Task<SqlConnection> OpenAsync(CancellationToken cancellationToken)
    {
        var connection = new SqlConnection(connectionString);
        try
        {
            await connection.OpenAsync(cancellationToken);
            return connection;
        }
        catch
        {
            await connection.DisposeAsync();
            throw;
        }
    }
}
