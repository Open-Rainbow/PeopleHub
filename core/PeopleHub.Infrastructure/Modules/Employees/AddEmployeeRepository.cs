using System.Data;
using Dapper;
using PeopleHub.Application.Common.Utilities;
using PeopleHub.Application.Modules.Employees.AddEmployee.Contracts;
using PeopleHub.Application.Modules.Employees.AddEmployee.Interfaces;
using PeopleHub.Infrastructure.Database;

namespace PeopleHub.Infrastructure.Modules.Employees;

/// <summary>One method per Add Employee step, each calls its stored procedure.</summary>
internal sealed class AddEmployeeRepository(SqlDb db) : IAddEmployeeRepository
{
    public async Task<SaveResponse> SavePersonalInfoAsync(PersonalInfoRequest r, CancellationToken cancellationToken)
    {
        var p = new DynamicParameters();
        p.Add("@Id", r.Id, DbType.Int32, ParameterDirection.InputOutput);
        p.Add("@Employee_Id", Clean(r.EmployeeId), DbType.AnsiString, ParameterDirection.InputOutput, 50);
        p.Add("@OperationType", r.Id is null or 0 ? "INS" : "UPD");
        p.Add("@Salutation", Clean(r.Salutation));
        p.Add("@FirstName", Clean(r.FirstName));
        p.Add("@MiddleName", Clean(r.MiddleName));
        p.Add("@LastName", Clean(r.LastName));
        p.Add("@PreferredName", Clean(r.PreferredName));
        p.Add("@DateOfBirth", r.DateOfBirth);
        p.Add("@DateOfJoining", r.DateOfJoining);
        p.Add("@Gender", Clean(r.Gender));
        p.Add("@MaritalStatus", Clean(r.MaritalStatus));
        p.Add("@BloodGroup", Clean(r.BloodGroup));
        p.Add("@Nationality", Clean(r.Nationality));
        p.Add("@PlaceOfBirth", Clean(r.PlaceOfBirth));
        p.Add("@Religion", Clean(r.Religion));
        p.Add("@Category", Clean(r.Category));
        p.Add("@EmployeePhoto", Base64Payload.TryDecode(r.EmployeePhoto), DbType.Binary, size: -1);
        p.Add("@ResultMessage", dbType: DbType.AnsiString, direction: ParameterDirection.Output, size: 200);

        await db.ExecuteAsync("dbo.sp_ins_emp_per_info", p, cancellationToken);

        return new SaveResponse(
            p.Get<int?>("@Id"),
            p.Get<string?>("@Employee_Id") ?? Clean(r.EmployeeId),
            p.Get<string?>("@ResultMessage") ?? "Personal info saved successfully.");
    }

    /// <summary>Empty strings go to the DB as NULL, everything else trimmed.</summary>
    private static string? Clean(string? value) => string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
