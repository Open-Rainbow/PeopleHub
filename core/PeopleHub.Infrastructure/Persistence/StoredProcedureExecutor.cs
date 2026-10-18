using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PeopleHub.Application.Common.Exceptions;

namespace PeopleHub.Infrastructure.Persistence;

/// <summary>
/// The only place that talks to SQL Server. Every repository goes through this,
/// so timeouts, cancellation and SQL error mapping are consistent everywhere.
/// </summary>
public interface IStoredProcedureExecutor
{
    Task<int> ExecuteAsync(string procedure, object? parameters, CancellationToken cancellationToken);

    Task<IReadOnlyList<T>> QueryAsync<T>(string procedure, object? parameters, CancellationToken cancellationToken);

    Task<T?> QuerySingleOrDefaultAsync<T>(string procedure, object? parameters, CancellationToken cancellationToken);
}

internal sealed class StoredProcedureExecutor(
    ISqlConnectionFactory connectionFactory,
    IOptions<DatabaseOptions> options,
    ILogger<StoredProcedureExecutor> logger) : IStoredProcedureExecutor
{
    // SQL Server error numbers
    private const int UniqueConstraint = 2627;
    private const int UniqueIndex = 2601;
    private const int ForeignKey = 547;
    private const int UserDefinedErrorStart = 50000; // THROW 50001, 'message', 1;

    public Task<int> ExecuteAsync(string procedure, object? parameters, CancellationToken cancellationToken) =>
        RunAsync(procedure, parameters, (connection, command) => connection.ExecuteAsync(command), cancellationToken);

    public Task<IReadOnlyList<T>> QueryAsync<T>(string procedure, object? parameters, CancellationToken cancellationToken) =>
        RunAsync<IReadOnlyList<T>>(
            procedure,
            parameters,
            async (connection, command) => (await connection.QueryAsync<T>(command)).AsList(),
            cancellationToken);

    public Task<T?> QuerySingleOrDefaultAsync<T>(string procedure, object? parameters, CancellationToken cancellationToken) =>
        RunAsync(procedure, parameters, (connection, command) => connection.QuerySingleOrDefaultAsync<T>(command), cancellationToken);

    private async Task<TResult> RunAsync<TResult>(
        string procedure,
        object? parameters,
        Func<SqlConnection, CommandDefinition, Task<TResult>> action,
        CancellationToken cancellationToken)
    {
        var command = new CommandDefinition(
            procedure,
            parameters,
            commandTimeout: options.Value.CommandTimeoutSeconds,
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        try
        {
            await using var connection = await connectionFactory.OpenAsync(cancellationToken);
            return await action(connection, command);
        }
        catch (SqlException ex) when (ex.Number is UniqueConstraint or UniqueIndex)
        {
            logger.LogWarning("{Procedure} hit a unique constraint ({Number})", procedure, ex.Number);
            throw new ConflictException("A record with the same unique value already exists.");
        }
        catch (SqlException ex) when (ex.Number is ForeignKey)
        {
            logger.LogWarning("{Procedure} hit a foreign key constraint", procedure);
            throw new ConflictException("The operation conflicts with related data.");
        }
        catch (SqlException ex) when (ex.Number >= UserDefinedErrorStart)
        {
            // Business errors raised by the SP with THROW are safe to surface.
            throw new BusinessRuleException(ex.Message);
        }
    }
}
