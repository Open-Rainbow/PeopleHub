using System.Data;
using Dapper;
using PeopleHub.Application.Modules.Employees.Common;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Commands.SavePersonalInfo;
using PeopleHub.Application.Modules.Employees.PersonalInfo.Interfaces;
using PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.DTAs;
using PeopleHub.Infrastructure.Persistence;

namespace PeopleHub.Infrastructure.Modules.Employees.PersonalInfo.Repositories;

internal sealed class PersonalInfoRepository(IStoredProcedureExecutor executor) : IPersonalInfoRepository
{
    private const string SaveProcedure = "dbo.sp_ins_emp_per_info";

    public async Task<EmployeeSectionSaveResult> SaveAsync(
        SavePersonalInfoCommand command,
        CancellationToken cancellationToken)
    {
        var data = PersonalInfoDta.From(command);
        var p = new DynamicParameters();

        p.Add("@Id", data.Id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@Employee_Id", data.EmployeeId, DbType.AnsiString, ParameterDirection.InputOutput, 50);
        p.Add("@OperationType", data.OperationType, DbType.AnsiString, size: 10);
        p.Add("@Salutation", data.Salutation, DbType.AnsiString, size: 10);
        p.Add("@FirstName", data.FirstName, DbType.AnsiString, size: 250);
        p.Add("@MiddleName", data.MiddleName, DbType.AnsiString, size: 250);
        p.Add("@LastName", data.LastName, DbType.AnsiString, size: 250);
        p.Add("@PreferredName", data.PreferredName, DbType.AnsiString, size: 250);
        p.Add("@DateOfBirth", data.DateOfBirth, DbType.DateTime);
        p.Add("@DateOfJoining", data.DateOfJoining, DbType.DateTime);
        p.Add("@Gender", data.Gender, DbType.AnsiString, size: 50);
        p.Add("@MaritalStatus", data.MaritalStatus, DbType.AnsiString, size: 20);
        p.Add("@BloodGroup", data.BloodGroup, DbType.AnsiString, size: 20);
        p.Add("@Nationality", data.Nationality, DbType.AnsiString, size: 50);
        p.Add("@PlaceOfBirth", data.PlaceOfBirth, DbType.AnsiString, size: 100);
        p.Add("@Religion", data.Religion, DbType.AnsiString, size: 50);
        p.Add("@Category", data.Category, DbType.AnsiString, size: 100);
        p.Add("@EmployeePhoto", data.EmployeePhoto, DbType.Binary, size: -1);
        p.Add("@ResultMessage", null, DbType.AnsiString, ParameterDirection.Output, 200);

        await executor.ExecuteAsync(SaveProcedure, p, cancellationToken);

        return new EmployeeSectionSaveResult(
            p.Get<int?>("@Id"),
            p.Get<string?>("@Employee_Id") ?? data.EmployeeId,
            p.Get<string?>("@ResultMessage") ?? "Personal info saved successfully.");
    }
}
