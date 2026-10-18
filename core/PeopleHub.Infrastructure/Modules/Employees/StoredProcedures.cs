namespace PeopleHub.Infrastructure.Modules.Employees;

/// <summary>
/// Stored procedure names for Add Employee. Rename here if the DB team uses different names.
///
/// Every step SP except Personal Info has the same signature:
///   @Id            INT           OUTPUT  (null/0 = insert)
///   @Employee_Id   VARCHAR(50)
///   @OperationType VARCHAR(10)           'INS' | 'UPD'
///   @Json          NVARCHAR(MAX)         whole request as camelCase JSON, read with OPENJSON
///   @ResultMessage VARCHAR(200)  OUTPUT
/// </summary>
internal static class StoredProcedures
{
    public const string PersonalInfo = "dbo.sp_ins_emp_per_info";
    public const string ContactInfo = "dbo.sp_save_emp_contact_info";
    public const string FamilyDetails = "dbo.sp_save_emp_family_details";
    public const string JobDetails = "dbo.sp_save_emp_job_details";
    public const string EducationDetails = "dbo.sp_save_emp_education_details";
    public const string Skills = "dbo.sp_save_emp_skills";
    public const string SalaryStructure = "dbo.sp_save_emp_salary_structure";
    public const string IdentityStatutory = "dbo.sp_save_emp_identity_statutory";
    public const string WorkExperience = "dbo.sp_save_emp_work_experience";
    public const string InsuranceDetails = "dbo.sp_save_emp_insurance_details";
    public const string Documents = "dbo.sp_save_emp_documents";
    public const string TempLogin = "dbo.sp_save_emp_temp_login";
    public const string Separation = "dbo.sp_save_emp_separation";
    public const string Assets = "dbo.sp_save_emp_assets";
    public const string ChangeRequestsAudit = "dbo.sp_save_emp_change_requests_audit";
}
