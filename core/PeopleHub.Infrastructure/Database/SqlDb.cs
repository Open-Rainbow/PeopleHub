using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PeopleHub.Application.Common.Exceptions;

namespace PeopleHub.Infrastructure.Database;

/// <summary>
/// The only class that talks to SQL Server. Repositories just call
/// ExecuteAsync / QueryAsync with a stored procedure name and parameters.
/// </summary>
public sealed class SqlDb(IConfiguration configuration)
{
    private const int TimeoutSeconds = 30;

    private readonly string connectionString = configuration.GetConnectionString("PeopleHubDb")
        ?? throw new InvalidOperationException("Connection string 'PeopleHubDb' is missing.");

    /// <summary>Runs a stored procedure that saves data (read output params from <paramref name="parameters"/> afterwards).</summary>
    public async Task ExecuteAsync(string procedure, DynamicParameters parameters, CancellationToken cancellationToken)
    {
        try
        {
            await using var connection = new SqlConnection(connectionString);
            await connection.ExecuteAsync(Command(procedure, parameters, cancellationToken));
        }
        catch (SqlException ex) when (ToAppException(ex) is { } friendly)
        {
            throw friendly;
        }
    }

    /// <summary>Runs a stored procedure that returns rows.</summary>
    public async Task<List<T>> QueryAsync<T>(string procedure, object? parameters, CancellationToken cancellationToken)
    {
        try
        {
            await using var connection = new SqlConnection(connectionString);
            var rows = await connection.QueryAsync<T>(Command(procedure, parameters, cancellationToken));
            return rows.AsList();
        }
        catch (SqlException ex) when (ToAppException(ex) is { } friendly)
        {
            throw friendly;
        }
    }

    private static CommandDefinition Command(string procedure, object? parameters, CancellationToken cancellationToken) =>
        new(procedure, parameters, commandTimeout: TimeoutSeconds, commandType: CommandType.StoredProcedure, cancellationToken: cancellationToken);

    /// <summary>Known SQL errors become clean API errors; anything else stays a 500.</summary>
    private static Exception? ToAppException(SqlException ex) => ex.Number switch
    {
        2627 or 2601 => new ConflictException("A record with the same value already exists."),
        547 => new ConflictException("This record is linked to other data."),
        >= 50000 => new BusinessRuleException(ex.Message), // SP: THROW 50001, 'message', 1;
        _ => null,
    };
}
