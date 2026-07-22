using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using PeopleHub.Application.Modules.Employees.PersonalInfo.DTOs;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;
using PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.DTAs;

namespace PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.Repositories;

public sealed class PersonalInfoRepository : IPersonalInfoRepository
{
    private const string StoredProcedureName = "dbo.sp_ins_emp_per_info";
    private readonly string connectionString;

    public PersonalInfoRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("PeopleHubDb")
            ?? throw new InvalidOperationException(
                "Connection string 'PeopleHubDb' was not found.");
    }

    public async Task<PersonalInfoSaveResponseDto> SaveAsync(
        PersonalInfoSaveRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var data = PersonalInfoDta.From(request);

        await using var connection = new SqlConnection(connectionString);
        await using var command = new SqlCommand(StoredProcedureName, connection)
        {
            CommandType = CommandType.StoredProcedure,
        };

        AddOutputInt(command, "@Id", data.Id);
        AddOutputString(command, "@Employee_Id", data.EmployeeId, 50);
        AddInputString(command, "@OperationType", data.OperationType, 10);
        AddInputString(command, "@Salutation", data.Salutation, 10);
        AddInputString(command, "@FirstName", data.FirstName, 250);
        AddInputString(command, "@MiddleName", data.MiddleName, 250);
        AddInputString(command, "@LastName", data.LastName, 250);
        AddInputString(command, "@PreferredName", data.PreferredName, 250);
        AddInputDateTime(command, "@DateOfBirth", data.DateOfBirth);
        AddInputDateTime(command, "@DateOfJoining", data.DateOfJoining);
        AddInputString(command, "@Gender", data.Gender, 50);
        AddInputString(command, "@MaritalStatus", data.MaritalStatus, 20);
        AddInputString(command, "@BloodGroup", data.BloodGroup, 20);
        AddInputString(command, "@Nationality", data.Nationality, 50);
        AddInputString(command, "@PlaceOfBirth", data.PlaceOfBirth, 100);
        AddInputString(command, "@Religion", data.Religion, 50);
        AddInputString(command, "@Category", data.Category, 100);
        AddInputBinary(command, "@EmployeePhoto", data.EmployeePhoto);
        AddOutputString(command, "@ResultMessage", null, 200);

        await connection.OpenAsync(cancellationToken);
        await command.ExecuteNonQueryAsync(cancellationToken);

        var savedIdValue = command.Parameters["@Id"].Value;
        int? savedId = savedIdValue == DBNull.Value
            ? null
            : Convert.ToInt32(savedIdValue);

        var savedEmployeeId = command.Parameters["@Employee_Id"].Value as string;
        var message = command.Parameters["@ResultMessage"].Value as string;

        return new PersonalInfoSaveResponseDto
        {
            Id = savedId,
            EmployeeId = savedEmployeeId ?? data.EmployeeId,
            Message = message ?? "Personal info saved successfully.",
        };
    }

    private static void AddInputString(
        SqlCommand command,
        string parameterName,
        string? value,
        int size)
    {
        command.Parameters.Add(new SqlParameter(parameterName, SqlDbType.VarChar, size)
        {
            Value = value is null ? DBNull.Value : value,
        });
    }

    private static void AddOutputString(
        SqlCommand command,
        string parameterName,
        string? value,
        int size)
    {
        command.Parameters.Add(new SqlParameter(parameterName, SqlDbType.VarChar, size)
        {
            Direction = ParameterDirection.InputOutput,
            Value = value is null ? DBNull.Value : value,
        });
    }

    private static void AddOutputInt(SqlCommand command, string parameterName, int? value)
    {
        command.Parameters.Add(new SqlParameter(parameterName, SqlDbType.Int)
        {
            Direction = ParameterDirection.InputOutput,
            Value = value is null ? DBNull.Value : value,
        });
    }

    private static void AddInputDateTime(SqlCommand command, string parameterName, DateTime? value)
    {
        command.Parameters.Add(new SqlParameter(parameterName, SqlDbType.DateTime)
        {
            Value = value is null ? DBNull.Value : value,
        });
    }

    private static void AddInputBinary(SqlCommand command, string parameterName, byte[]? value)
    {
        command.Parameters.Add(new SqlParameter(parameterName, SqlDbType.VarBinary, -1)
        {
            Value = value is null ? DBNull.Value : value,
        });
    }
}