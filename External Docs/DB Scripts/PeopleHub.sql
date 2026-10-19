/* =====================================================================
   PeopleHub database: one-click setup (SQL Server 2017+)
   ---------------------------------------------------------------------
   Run the whole file in SSMS / Azure Data Studio, or:
     sqlcmd -S edyn-rep-db-01 -E -i database/PeopleHub.sql
   Safe to re-run: tables are created only if missing, procedures are
   CREATE OR ALTER, dummy data is inserted only into an empty database.

   Layout
     org.*  organizations (multi-org ready)
     ref.*  lookup values for every dropdown
     emp.*  employee data, one table per Add Employee section
     sec.*  logins
     dbo.sp_save_emp_*   save procedures used by the API (one per step)
     dbo.sp_get_emp_*    fetch procedures (one per step + list/progress)

   Conventions
     - Every table: Id INT IDENTITY PK, audit columns, soft delete (IsDeleted).
     - emp.Employee.EmployeeCode is the public "EmployeeId" the API uses.
     - List steps are saved as a full sync: rows sent with an id are updated,
       rows without an id are inserted, rows not sent are soft-deleted.
     - Business errors use THROW 50001+ (the API returns them as 422).
   ===================================================================== */

SET NOCOUNT ON;
GO

-- ---------------------------------------------------------------------
-- 0. (Optional) full reset for DEV only. Uncomment to drop everything.
-- ---------------------------------------------------------------------
-- USE master;
-- IF DB_ID(N'PeopleHub') IS NOT NULL
-- BEGIN
--     ALTER DATABASE PeopleHub SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
--     DROP DATABASE PeopleHub;
-- END
-- GO

-- ---------------------------------------------------------------------
-- 1. Database
-- ---------------------------------------------------------------------
USE master;
GO
IF DB_ID(N'PeopleHub') IS NULL
    CREATE DATABASE PeopleHub;
GO
-- OPENJSON needs compatibility level 130+.
IF (SELECT compatibility_level FROM sys.databases WHERE name = N'PeopleHub') < 130
    ALTER DATABASE PeopleHub SET COMPATIBILITY_LEVEL = 130;
GO
USE PeopleHub;
GO
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- ---------------------------------------------------------------------
-- 2. Schemas
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'org') IS NULL EXEC (N'CREATE SCHEMA org');
IF SCHEMA_ID(N'ref') IS NULL EXEC (N'CREATE SCHEMA ref');
IF SCHEMA_ID(N'emp') IS NULL EXEC (N'CREATE SCHEMA emp');
IF SCHEMA_ID(N'sec') IS NULL EXEC (N'CREATE SCHEMA sec');
GO

-- ---------------------------------------------------------------------
-- 3. Core tables
-- ---------------------------------------------------------------------
IF OBJECT_ID(N'org.Organization', N'U') IS NULL
BEGIN
CREATE TABLE org.Organization
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Organization PRIMARY KEY,
    Code           VARCHAR(20)    NOT NULL CONSTRAINT UX_Organization_Code UNIQUE,
    [Name]         NVARCHAR(200)  NOT NULL,
    Country        NVARCHAR(50)   NULL,
    TimeZone       VARCHAR(50)    NULL,
    IsActive       BIT            NOT NULL CONSTRAINT DF_Organization_IsActive DEFAULT (1),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Organization_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Organization_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
END
GO

IF OBJECT_ID(N'ref.LookupValue', N'U') IS NULL
BEGIN
CREATE TABLE ref.LookupValue
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LookupValue PRIMARY KEY,
    LookupType     VARCHAR(50)    NOT NULL,
    Code           NVARCHAR(50)   NOT NULL,
    Label          NVARCHAR(100)  NOT NULL,
    SortOrder      INT            NOT NULL CONSTRAINT DF_LookupValue_SortOrder DEFAULT (0),
    IsActive       BIT            NOT NULL CONSTRAINT DF_LookupValue_IsActive DEFAULT (1),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_LookupValue_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UX_LookupValue_Type_Code UNIQUE (LookupType, Code)
);
END
GO

IF OBJECT_ID(N'emp.EmployeeCodeSeq', N'SO') IS NULL
    CREATE SEQUENCE emp.EmployeeCodeSeq AS INT START WITH 1001 INCREMENT BY 1;
GO

-- Personal Information (step 1) + the root every other table hangs off.
IF OBJECT_ID(N'emp.Employee', N'U') IS NULL
BEGIN
CREATE TABLE emp.Employee
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Employee PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT DF_Employee_OrganizationId DEFAULT (1)
                                  CONSTRAINT FK_Employee_Organization REFERENCES org.Organization(Id),
    EmployeeCode   VARCHAR(50)    NOT NULL,
    [Salutation] NVARCHAR(10) NULL,
    [FirstName] NVARCHAR(250) NOT NULL,
    [MiddleName] NVARCHAR(250) NULL,
    [LastName] NVARCHAR(250) NULL,
    [PreferredName] NVARCHAR(250) NULL,
    [DateOfBirth] DATE NULL,
    [DateOfJoining] DATE NULL,
    [Gender] NVARCHAR(50) NULL,
    [MaritalStatus] NVARCHAR(20) NULL,
    [BloodGroup] NVARCHAR(20) NULL,
    [Nationality] NVARCHAR(50) NULL,
    [PlaceOfBirth] NVARCHAR(100) NULL,
    [Religion] NVARCHAR(50) NULL,
    [Category] NVARCHAR(100) NULL,
    [EmployeePhoto] VARBINARY(MAX) NULL,
    EmployeeStatus NVARCHAR(30)   NOT NULL CONSTRAINT DF_Employee_Status DEFAULT (N'Onboarding'),
    FullName AS (CONCAT_WS(N' ', [FirstName], [MiddleName], [LastName])),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Employee_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Employee_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_Employee_Org_Code ON emp.Employee (OrganizationId, EmployeeCode);
CREATE INDEX IX_Employee_Name ON emp.Employee (FirstName, LastName) WHERE IsDeleted = 0;
END
GO

-- ---------------------------------------------------------------------
-- 4. Section tables (one per Add Employee section)
-- ---------------------------------------------------------------------
IF OBJECT_ID(N'emp.ContactInfo', N'U') IS NULL
BEGIN
CREATE TABLE emp.ContactInfo
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ContactInfo PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_ContactInfo_Employee REFERENCES emp.Employee(Id),
    [PersonalMail] NVARCHAR(100) NOT NULL,
    [AlternateMail] NVARCHAR(100) NULL,
    [MobileNumber] NVARCHAR(15) NOT NULL,
    [AlternateMobile] NVARCHAR(15) NULL,
    [LandlineNumber] NVARCHAR(20) NULL,
    [OfficialEmail] NVARCHAR(100) NULL,
    [LinkedinUrl] NVARCHAR(200) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_ContactInfo_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_ContactInfo_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_ContactInfo_EmployeeId ON emp.ContactInfo (EmployeeId);
END
GO

IF OBJECT_ID(N'emp.Address', N'U') IS NULL
BEGIN
CREATE TABLE emp.Address
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Address PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Address_Employee REFERENCES emp.Employee(Id),
    [AddressType] NVARCHAR(50) NOT NULL,
    [HouseNumber] NVARCHAR(50) NULL,
    [StreetName] NVARCHAR(100) NULL,
    [Landmark] NVARCHAR(100) NULL,
    [Colony] NVARCHAR(100) NULL,
    [Area] NVARCHAR(100) NULL,
    [EffectiveFrom] DATE NULL,
    [EffectiveTo] DATE NULL,
    [AddressProofLink] NVARCHAR(250) NULL,
    [City] NVARCHAR(100) NOT NULL,
    [District] NVARCHAR(100) NULL,
    [StateProvince] NVARCHAR(100) NOT NULL,
    [Country] NVARCHAR(50) NOT NULL,
    [Pincode] NVARCHAR(10) NOT NULL,
    [CheckToggle] BIT NOT NULL CONSTRAINT DF_Address_CheckToggle DEFAULT (0),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Address_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Address_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Address_EmployeeId ON emp.Address (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.EmergencyContact', N'U') IS NULL
BEGIN
CREATE TABLE emp.EmergencyContact
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_EmergencyContact PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_EmergencyContact_Employee REFERENCES emp.Employee(Id),
    [ContactName] NVARCHAR(100) NOT NULL,
    [ContactNumber] NVARCHAR(15) NOT NULL,
    [Relation] NVARCHAR(50) NOT NULL,
    [EmergencyAlternateNumber] NVARCHAR(15) NULL,
    [EmergencyEmail] NVARCHAR(100) NULL,
    [Remarks] NVARCHAR(500) NULL,
    [EmergencyAddress] NVARCHAR(300) NULL,
    [PriorityOrder] BIT NOT NULL CONSTRAINT DF_EmergencyContact_PriorityOrder DEFAULT (0),
    [PrimaryEmergencyContact] BIT NOT NULL CONSTRAINT DF_EmergencyContact_PrimaryEmergencyContact DEFAULT (0),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_EmergencyContact_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_EmergencyContact_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_EmergencyContact_EmployeeId ON emp.EmergencyContact (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.FamilyMember', N'U') IS NULL
BEGIN
CREATE TABLE emp.FamilyMember
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_FamilyMember PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_FamilyMember_Employee REFERENCES emp.Employee(Id),
    [MemberName] NVARCHAR(100) NOT NULL,
    [MemberRelationship] NVARCHAR(50) NOT NULL,
    [MemberGender] NVARCHAR(50) NULL,
    [MemberDateOfBirth] DATE NULL,
    [MemberMaritalStatus] NVARCHAR(50) NULL,
    [MemberOccupation] NVARCHAR(100) NULL,
    [MemberContactNumber] NVARCHAR(20) NULL,
    [LivesWithEmployee] BIT NOT NULL CONSTRAINT DF_FamilyMember_LivesWithEmployee DEFAULT (0),
    [MemberNotes] NVARCHAR(500) NULL,
    [MemberEmail] NVARCHAR(100) NULL,
    [AddressSameAsEmployee] BIT NOT NULL CONSTRAINT DF_FamilyMember_AddressSameAsEmployee DEFAULT (0),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_FamilyMember_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_FamilyMember_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_FamilyMember_EmployeeId ON emp.FamilyMember (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.Dependent', N'U') IS NULL
BEGIN
CREATE TABLE emp.Dependent
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Dependent PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Dependent_Employee REFERENCES emp.Employee(Id),
    [DependentName] NVARCHAR(100) NOT NULL,
    [DependentRelationship] NVARCHAR(50) NOT NULL,
    [DependentDateOfBirth] DATE NOT NULL,
    [DependentGender] NVARCHAR(50) NULL,
    [FinanciallyDependent] BIT NOT NULL CONSTRAINT DF_Dependent_FinanciallyDependent DEFAULT (0),
    [StudentStatus] BIT NOT NULL CONSTRAINT DF_Dependent_StudentStatus DEFAULT (0),
    [DisabilityStatus] BIT NOT NULL CONSTRAINT DF_Dependent_DisabilityStatus DEFAULT (0),
    [DependencyStartDate] DATE NULL,
    [EligibleForBenefits] BIT NOT NULL CONSTRAINT DF_Dependent_EligibleForBenefits DEFAULT (0),
    [DependentRemarks] NVARCHAR(500) NULL,
    [LinkedFamilyRecord] NVARCHAR(500) NULL,
    [MonthlyIncomeOrPension] DECIMAL(18,2) NULL,
    [DependencyEndDate] DATE NULL,
    [ProofDocumentLink] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Dependent_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Dependent_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Dependent_EmployeeId ON emp.Dependent (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.EmploymentDetail', N'U') IS NULL
BEGIN
CREATE TABLE emp.EmploymentDetail
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_EmploymentDetail PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_EmploymentDetail_Employee REFERENCES emp.Employee(Id),
    [OfficeEmail] NVARCHAR(50) NOT NULL,
    [EmploymentStatus] NVARCHAR(50) NOT NULL,
    [EmployeeType] NVARCHAR(20) NOT NULL,
    [Department] NVARCHAR(30) NOT NULL,
    [BusinessUnit] NVARCHAR(50) NULL,
    [Designation] NVARCHAR(30) NOT NULL,
    [PayLevel] NVARCHAR(20) NOT NULL,
    [WorkLocation] NVARCHAR(50) NOT NULL,
    [ReportingManager] NVARCHAR(50) NOT NULL,
    [DottedLineManager] NVARCHAR(50) NULL,
    [ShiftTimings] NVARCHAR(30) NOT NULL,
    [WorkSchedule] NVARCHAR(50) NULL,
    [ProbationStartDate] DATE NULL,
    [ProbationEndDate] DATE NULL,
    [ConfirmationDate] DATE NULL,
    [CostCenter] NVARCHAR(50) NULL,
    [EmployeeCategory] NVARCHAR(50) NULL,
    [HrOwner] NVARCHAR(50) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_EmploymentDetail_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_EmploymentDetail_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_EmploymentDetail_EmployeeId ON emp.EmploymentDetail (EmployeeId);
END
GO

IF OBJECT_ID(N'emp.Education', N'U') IS NULL
BEGIN
CREATE TABLE emp.Education
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Education PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Education_Employee REFERENCES emp.Employee(Id),
    [QualificationLevel] NVARCHAR(50) NOT NULL,
    [DegreeOrCourseName] NVARCHAR(100) NOT NULL,
    [SpecializationOrMajor] NVARCHAR(100) NULL,
    [InstitutionOrCollegeName] NVARCHAR(150) NOT NULL,
    [UniversityOrBoardName] NVARCHAR(150) NULL,
    [ModeOfStudy] NVARCHAR(50) NULL,
    [StartDate] DATE NOT NULL,
    [EndDate] DATE NULL,
    [YearOfPassing] INT NOT NULL,
    [GradePercentageOrCgpa] NVARCHAR(10) NULL,
    [HighestQualificationFlag] NVARCHAR(5) NULL,
    [EducationDocumentLink] NVARCHAR(255) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Education_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Education_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Education_EmployeeId ON emp.Education (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.Certification', N'U') IS NULL
BEGIN
CREATE TABLE emp.Certification
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Certification PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Certification_Employee REFERENCES emp.Employee(Id),
    [CertificationName] NVARCHAR(100) NULL,
    [IssuingOrganization] NVARCHAR(100) NULL,
    [CredentialId] NVARCHAR(100) NULL,
    [IssueDate] DATE NULL,
    [ValidFrom] DATE NULL,
    [ValidTo] DATE NULL,
    [CertificationScoreOrGrade] NVARCHAR(20) NULL,
    [VerificationUrl] NVARCHAR(255) NULL,
    [AttachmentLink] NVARCHAR(255) NULL,
    [ActiveExpiredStatus] NVARCHAR(20) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Certification_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Certification_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Certification_EmployeeId ON emp.Certification (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.Skill', N'U') IS NULL
BEGIN
CREATE TABLE emp.Skill
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Skill PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Skill_Employee REFERENCES emp.Employee(Id),
    [SkillName] NVARCHAR(100) NOT NULL,
    [SkillCategory] NVARCHAR(50) NULL,
    [ProficiencyLevel] NVARCHAR(50) NULL,
    [YearsOfExperience] INT NULL,
    [LastUsedYear] INT NULL,
    [LinkedCertification] NVARCHAR(100) NULL,
    [PrimarySkill] BIT NOT NULL CONSTRAINT DF_Skill_PrimarySkill DEFAULT (0),
    [Remarks] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Skill_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Skill_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Skill_EmployeeId ON emp.Skill (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.BankPayroll', N'U') IS NULL
BEGIN
CREATE TABLE emp.BankPayroll
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_BankPayroll PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_BankPayroll_Employee REFERENCES emp.Employee(Id),
    [PayrollGroup] NVARCHAR(50) NULL,
    [SalaryStructurePlan] NVARCHAR(50) NULL,
    [PayGrade] NVARCHAR(50) NULL,
    [BankName] NVARCHAR(100) NOT NULL,
    [AccountHolderName] NVARCHAR(100) NULL,
    [BankAccountNumber] NVARCHAR(18) NOT NULL,
    [BranchName] NVARCHAR(100) NULL,
    [IfscCode] NVARCHAR(11) NOT NULL,
    [MicrNumber] NVARCHAR(9) NULL,
    [AccountType] NVARCHAR(50) NULL,
    [SalaryPaymentMode] NVARCHAR(50) NULL,
    [TaxRegime] NVARCHAR(50) NULL,
    [PayrollEffectiveFrom] DATE NULL,
    [BankProofLink] NVARCHAR(255) NULL,
    [BankAddress] NVARCHAR(300) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_BankPayroll_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_BankPayroll_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_BankPayroll_EmployeeId ON emp.BankPayroll (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.StatutoryInfo', N'U') IS NULL
BEGIN
CREATE TABLE emp.StatutoryInfo
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_StatutoryInfo PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_StatutoryInfo_Employee REFERENCES emp.Employee(Id),
    [PanNumber] NVARCHAR(10) NULL,
    [AadhaarNumber] NVARCHAR(12) NULL,
    [UanNumber] NVARCHAR(12) NULL,
    [PfAccountNumber] NVARCHAR(22) NULL,
    [EsiNumber] NVARCHAR(17) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_StatutoryInfo_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_StatutoryInfo_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_StatutoryInfo_EmployeeId ON emp.StatutoryInfo (EmployeeId);
END
GO

IF OBJECT_ID(N'emp.IdentityDocument', N'U') IS NULL
BEGIN
CREATE TABLE emp.IdentityDocument
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_IdentityDocument PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_IdentityDocument_Employee REFERENCES emp.Employee(Id),
    [DocumentType] NVARCHAR(50) NOT NULL,
    [DocumentNumber] NVARCHAR(50) NOT NULL,
    [NameOnDocument] NVARCHAR(100) NULL,
    [IssuingAuthority] NVARCHAR(100) NULL,
    [CountryOfIssue] NVARCHAR(50) NULL,
    [PlaceOfIssue] NVARCHAR(100) NULL,
    [IssueDate] DATE NULL,
    [ValidFrom] DATE NULL,
    [ValidTo] DATE NULL,
    [VerificationStatus] NVARCHAR(50) NULL,
    [VerifiedBy] NVARCHAR(50) NULL,
    [FrontAttachLink] NVARCHAR(50) NULL,
    [BackAttachLink] NVARCHAR(50) NULL,
    [IdentificationDocumentRemarks] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_IdentityDocument_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_IdentityDocument_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_IdentityDocument_EmployeeId ON emp.IdentityDocument (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.RepositoryDocument', N'U') IS NULL
BEGIN
CREATE TABLE emp.RepositoryDocument
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_RepositoryDocument PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_RepositoryDocument_Employee REFERENCES emp.Employee(Id),
    [GenericDocumentCategory] NVARCHAR(50) NULL,
    [GenericDocumentName] NVARCHAR(100) NULL,
    [GenericRelatedSection] NVARCHAR(50) NULL,
    [GenericRelatedRecordId] NVARCHAR(50) NULL,
    [GenericFileUpload] NVARCHAR(50) NULL,
    [GenericUploadDate] DATE NULL,
    [GenericValidFrom] DATE NULL,
    [GenericValidTo] DATE NULL,
    [GenericVerificationStatus] NVARCHAR(50) NULL,
    [GenericVerifiedBy] NVARCHAR(50) NULL,
    [GenericRemarks] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_RepositoryDocument_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_RepositoryDocument_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_RepositoryDocument_EmployeeId ON emp.RepositoryDocument (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.WorkExperience', N'U') IS NULL
BEGIN
CREATE TABLE emp.WorkExperience
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_WorkExperience PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_WorkExperience_Employee REFERENCES emp.Employee(Id),
    [EmployerName] NVARCHAR(100) NULL,
    [EmployerLocation] NVARCHAR(100) NULL,
    [Designation] NVARCHAR(100) NULL,
    [EmploymentType] NVARCHAR(50) NULL,
    [StartDate] DATE NOT NULL,
    [EndDate] DATE NULL,
    [TotalExperience] DECIMAL(5,2) NULL,
    [PreviousEmployerPfAccountNumber] NVARCHAR(50) NULL,
    [ManagerName] NVARCHAR(100) NULL,
    [LastDrawnSalary] DECIMAL(18,2) NULL,
    [ReasonForLeaving] NVARCHAR(500) NULL,
    [SkillsUsed] NVARCHAR(500) NULL,
    [ExperienceLetterLink] NVARCHAR(500) NULL,
    [RelievingLetterLink] NVARCHAR(500) NULL,
    [PayslipLink] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_WorkExperience_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_WorkExperience_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_WorkExperience_EmployeeId ON emp.WorkExperience (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.InsurancePolicy', N'U') IS NULL
BEGIN
CREATE TABLE emp.InsurancePolicy
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_InsurancePolicy PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_InsurancePolicy_Employee REFERENCES emp.Employee(Id),
    [BenefitType] NVARCHAR(50) NOT NULL,
    [ProviderName] NVARCHAR(100) NULL,
    [PolicyNumber] NVARCHAR(50) NULL,
    [CoverageStartDate] DATE NULL,
    [CoverageEndDate] DATE NULL,
    [EmployeeCovered] BIT NOT NULL CONSTRAINT DF_InsurancePolicy_EmployeeCovered DEFAULT (0),
    [PremiumSharingType] NVARCHAR(50) NULL,
    [CoverageAmount] DECIMAL(18,2) NULL,
    [PolicyStatus] NVARCHAR(50) NULL,
    [InsuranceRemarks] NVARCHAR(500) NULL,
    [CoveredMemberName] NVARCHAR(100) NULL,
    [CoveredMemberRelationship] NVARCHAR(50) NULL,
    [SumInsuredAllocation] DECIMAL(18,2) NULL,
    [MemberCoverageFrom] DATE NULL,
    [MemberCoverageTo] DATE NULL,
    [LinkedFamilyOrDependentRecord] NVARCHAR(50) NULL,
    [InsuranceCardProofLink] NVARCHAR(50) NULL,
    [CoveredUnderPolicy] BIT NOT NULL CONSTRAINT DF_InsurancePolicy_CoveredUnderPolicy DEFAULT (0),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_InsurancePolicy_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_InsurancePolicy_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_InsurancePolicy_EmployeeId ON emp.InsurancePolicy (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.Nominee', N'U') IS NULL
BEGIN
CREATE TABLE emp.Nominee
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Nominee PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Nominee_Employee REFERENCES emp.Employee(Id),
    [NomineeBenefitType] NVARCHAR(50) NOT NULL,
    [NomineeName] NVARCHAR(100) NOT NULL,
    [NomineeRelationship] NVARCHAR(50) NOT NULL,
    [NomineeDateOfBirth] DATE NULL,
    [NomineeContactNumber] NVARCHAR(20) NULL,
    [SharePercentage] DECIMAL(5,2) NOT NULL,
    [NomineePriority] INT NULL,
    [NomineeEffectiveFrom] DATE NULL,
    [NomineeEffectiveTo] DATE NULL,
    [MinorFlag] BIT NOT NULL CONSTRAINT DF_Nominee_MinorFlag DEFAULT (0),
    [GuardianName] NVARCHAR(100) NULL,
    [NomineeActive] BIT NOT NULL CONSTRAINT DF_Nominee_NomineeActive DEFAULT (0),
    [NomineeBankName] NVARCHAR(100) NULL,
    [NomineeAccountNumber] NVARCHAR(18) NULL,
    [NomineeIfscCode] NVARCHAR(11) NULL,
    [NomineeAadhaarNumber] NVARCHAR(12) NULL,
    [NomineePanNumber] NVARCHAR(10) NULL,
    [LinkedFamilyOrDependentRecord] NVARCHAR(50) NULL,
    [ProofDocumentLink] NVARCHAR(255) NULL,
    [Address] NVARCHAR(300) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Nominee_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Nominee_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Nominee_EmployeeId ON emp.Nominee (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.Separation', N'U') IS NULL
BEGIN
CREATE TABLE emp.Separation
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Separation PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Separation_Employee REFERENCES emp.Employee(Id),
    [SeparationType] NVARCHAR(50) NOT NULL,
    [SeparationStatus] NVARCHAR(50) NOT NULL,
    [ExitReason] NVARCHAR(100) NOT NULL,
    [InitiationDate] DATE NOT NULL,
    [ResignationDate] DATE NULL,
    [NoticeStartDate] DATE NULL,
    [NoticeEndDate] DATE NULL,
    [ProposedLastWorkingDay] DATE NULL,
    [FinalLastWorkingDay] DATE NOT NULL,
    [RehireEligible] BIT NOT NULL CONSTRAINT DF_Separation_RehireEligible DEFAULT (0),
    [AttritionCategory] NVARCHAR(50) NULL,
    [ManagerClearanceStatus] NVARCHAR(50) NULL,
    [HrClearanceStatus] NVARCHAR(50) NULL,
    [ExitInterviewRequired] BIT NOT NULL CONSTRAINT DF_Separation_ExitInterviewRequired DEFAULT (0),
    [ExitInterviewStatus] NVARCHAR(50) NULL,
    [KnowledgeTransferRequired] BIT NOT NULL CONSTRAINT DF_Separation_KnowledgeTransferRequired DEFAULT (0),
    [KnowledgeTransferStatus] NVARCHAR(50) NULL,
    [LeaveBalanceAtExit] DECIMAL(6,2) NULL,
    [GratuityEligible] BIT NOT NULL CONSTRAINT DF_Separation_GratuityEligible DEFAULT (0),
    [FinalSettlementStatus] NVARCHAR(50) NULL,
    [OfficialEmailDisableDate] DATE NULL,
    [ApplicationAccessRevokeStatus] NVARCHAR(50) NULL,
    [DetailedExitRemarks] NVARCHAR(1000) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Separation_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Separation_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_Separation_EmployeeId ON emp.Separation (EmployeeId);
END
GO

IF OBJECT_ID(N'emp.SystemAccess', N'U') IS NULL
BEGIN
CREATE TABLE emp.SystemAccess
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SystemAccess PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_SystemAccess_Employee REFERENCES emp.Employee(Id),
    [ApplicationOrSystemName] NVARCHAR(150) NOT NULL,
    [UsernameOrLoginId] NVARCHAR(100) NOT NULL,
    [RoleOrAccessProfile] NVARCHAR(100) NULL,
    [AccessStartDate] DATE NULL,
    [AccessEndDate] DATE NULL,
    [AccountStatus] NVARCHAR(50) NULL,
    [PasswordSetupRequired] BIT NOT NULL CONSTRAINT DF_SystemAccess_PasswordSetupRequired DEFAULT (0),
    [TemporaryPasswordIssuedFlag] BIT NOT NULL CONSTRAINT DF_SystemAccess_TemporaryPasswordIssuedFlag DEFAULT (0),
    [PasswordResetRequired] BIT NOT NULL CONSTRAINT DF_SystemAccess_PasswordResetRequired DEFAULT (0),
    [MfaEnabled] BIT NOT NULL CONSTRAINT DF_SystemAccess_MfaEnabled DEFAULT (0),
    [LastLogin] DATE NULL,
    [AccessApprovalReference] NVARCHAR(100) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_SystemAccess_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_SystemAccess_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_SystemAccess_EmployeeId ON emp.SystemAccess (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.AssetAssignment', N'U') IS NULL
BEGIN
CREATE TABLE emp.AssetAssignment
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_AssetAssignment PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_AssetAssignment_Employee REFERENCES emp.Employee(Id),
    [AssetAssignmentId] NVARCHAR(50) NULL,
    [AssetType] NVARCHAR(50) NOT NULL,
    [AssetCategory] NVARCHAR(50) NULL,
    [AssetName] NVARCHAR(150) NOT NULL,
    [AssetSerialNumber] NVARCHAR(100) NULL,
    [MakeBrand] NVARCHAR(100) NULL,
    [Model] NVARCHAR(100) NULL,
    [ConfigurationDetails] NVARCHAR(1000) NULL,
    [TagNumber] NVARCHAR(100) NULL,
    [OwnershipType] NVARCHAR(50) NULL,
    [IssuedDate] DATE NOT NULL,
    [IssuedBy] NVARCHAR(150) NULL,
    [IssueLocation] NVARCHAR(150) NULL,
    [EmployeeAcknowledgement] BIT NOT NULL CONSTRAINT DF_AssetAssignment_EmployeeAcknowledgement DEFAULT (0),
    [AcknowledgementDate] DATE NULL,
    [AssetConditionAtIssue] NVARCHAR(50) NULL,
    [WarrantyStartDate] DATE NULL,
    [WarrantyEndDate] DATE NULL,
    [InsuranceCovered] BIT NOT NULL CONSTRAINT DF_AssetAssignment_InsuranceCovered DEFAULT (0),
    [AssetValue] DECIMAL(18,2) NULL,
    [SecurityDepositApplicable] BIT NOT NULL CONSTRAINT DF_AssetAssignment_SecurityDepositApplicable DEFAULT (0),
    [DepositAmount] DECIMAL(18,2) NULL,
    [AssetRemarks] NVARCHAR(500) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_AssetAssignment_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_AssetAssignment_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_AssetAssignment_EmployeeId ON emp.AssetAssignment (EmployeeId) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'emp.ChangeRequestAudit', N'U') IS NULL
BEGIN
CREATE TABLE emp.ChangeRequestAudit
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ChangeRequestAudit PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_ChangeRequestAudit_Employee REFERENCES emp.Employee(Id),
    [ChangeRequestType] NVARCHAR(100) NULL,
    [RequestedBy] NVARCHAR(100) NULL,
    [AuditReference] NVARCHAR(100) NULL,
    [AuditRemarks] NVARCHAR(1000) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_ChangeRequestAudit_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_ChangeRequestAudit_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_ChangeRequestAudit_EmployeeId ON emp.ChangeRequestAudit (EmployeeId) WHERE IsDeleted = 0;
END
GO

-- Employee Documents (step 11): one row per document type.
IF OBJECT_ID(N'emp.EmployeeDocument', N'U') IS NULL
BEGIN
CREATE TABLE emp.EmployeeDocument
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_EmployeeDocument PRIMARY KEY,
    EmployeeId     INT            NOT NULL CONSTRAINT FK_EmployeeDocument_Employee REFERENCES emp.Employee(Id),
    DocumentType   VARCHAR(50)    NOT NULL,   -- PHOTO, PAN, AADHAAR, PASSPORT, BANK_STATEMENTS_6M, PAYSLIPS_3M, EXPERIENCE_LETTER, RELIEVING_LETTER, OFFER_LETTER
    DocumentNumber NVARCHAR(50)   NULL,
    ContentType    VARCHAR(100)   NULL,
    FileSizeBytes  INT            NULL,
    FileContent    VARBINARY(MAX) NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_EmployeeDocument_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_EmployeeDocument_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_EmployeeDocument_Type ON emp.EmployeeDocument (EmployeeId, DocumentType) WHERE IsDeleted = 0;
END
GO

-- System Access / temporary login (step 12). Password is hashed by the API (PBKDF2).
IF OBJECT_ID(N'sec.UserLogin', N'U') IS NULL
BEGIN
CREATE TABLE sec.UserLogin
(
    Id                 INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_UserLogin PRIMARY KEY,
    EmployeeId         INT            NOT NULL CONSTRAINT FK_UserLogin_Employee REFERENCES emp.Employee(Id),
    Username           NVARCHAR(50)   NOT NULL,
    PasswordHash       NVARCHAR(256)  NOT NULL,
    IsTemporary        BIT            NOT NULL CONSTRAINT DF_UserLogin_IsTemporary DEFAULT (1),
    MustChangePassword BIT            NOT NULL CONSTRAINT DF_UserLogin_MustChange DEFAULT (1),
    FailedAttempts     INT            NOT NULL CONSTRAINT DF_UserLogin_Failed DEFAULT (0),
    IsLocked           BIT            NOT NULL CONSTRAINT DF_UserLogin_IsLocked DEFAULT (0),
    LastLoginAt        DATETIME2(0)   NULL,
    IsDeleted          BIT            NOT NULL CONSTRAINT DF_UserLogin_IsDeleted DEFAULT (0),
    CreatedAt          DATETIME2(0)   NOT NULL CONSTRAINT DF_UserLogin_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy          NVARCHAR(100)  NULL,
    UpdatedAt          DATETIME2(0)   NULL,
    UpdatedBy          NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_UserLogin_EmployeeId ON sec.UserLogin (EmployeeId);
CREATE UNIQUE INDEX UX_UserLogin_Username ON sec.UserLogin (Username);
END
GO

-- ---------------------------------------------------------------------
-- 5. Helper functions
-- ---------------------------------------------------------------------
-- Public employee code (EMP01001) -> internal key. NULL when not found.
CREATE OR ALTER FUNCTION dbo.fn_employee_pk (@EmployeeCode VARCHAR(50))
RETURNS INT
AS
BEGIN
    RETURN (SELECT TOP (1) Id FROM emp.Employee
            WHERE EmployeeCode = @EmployeeCode AND IsDeleted = 0
            ORDER BY Id);
END
GO

-- Base64 or data-URI string -> bytes.
CREATE OR ALTER FUNCTION dbo.fn_base64_to_varbinary (@Value NVARCHAR(MAX))
RETURNS VARBINARY(MAX)
AS
BEGIN
    IF @Value IS NULL OR LTRIM(RTRIM(@Value)) = N'' RETURN NULL;
    DECLARE @i INT = CHARINDEX(N'base64,', @Value);
    IF @i > 0 SET @Value = SUBSTRING(@Value, @i + 7, LEN(@Value));
    RETURN CAST(N'' AS XML).value('xs:base64Binary(sql:variable("@Value"))', 'VARBINARY(MAX)');
END
GO

-- Bytes -> base64 string (for returning files/photos to the API).
CREATE OR ALTER FUNCTION dbo.fn_varbinary_to_base64 (@Value VARBINARY(MAX))
RETURNS VARCHAR(MAX)
AS
BEGIN
    IF @Value IS NULL RETURN NULL;
    RETURN CAST(N'' AS XML).value('xs:base64Binary(sql:variable("@Value"))', 'VARCHAR(MAX)');
END
GO

-- "data:application/pdf;base64,...." -> "application/pdf". NULL for raw base64.
CREATE OR ALTER FUNCTION dbo.fn_data_uri_content_type (@Value NVARCHAR(MAX))
RETURNS VARCHAR(100)
AS
BEGIN
    IF @Value IS NULL OR LEFT(@Value, 5) <> N'data:' RETURN NULL;
    DECLARE @semi INT = CHARINDEX(N';', @Value);
    IF @semi = 0 RETURN NULL;
    RETURN CAST(SUBSTRING(@Value, 6, @semi - 6) AS VARCHAR(100));
END
GO

-- ---------------------------------------------------------------------
-- 6. Save procedures (called by AddEmployeeRepository)
-- ---------------------------------------------------------------------
-- Personal Information: creates the employee and returns its code.
CREATE OR ALTER PROCEDURE dbo.sp_ins_emp_per_info
    @Id            INT            = NULL OUTPUT,
    @Employee_Id   VARCHAR(50)    = NULL OUTPUT,
    @OperationType VARCHAR(10)    = NULL,
    @Salutation    NVARCHAR(10)   = NULL,
    @FirstName     NVARCHAR(250),
    @MiddleName    NVARCHAR(250)  = NULL,
    @LastName      NVARCHAR(250)  = NULL,
    @PreferredName NVARCHAR(250)  = NULL,
    @DateOfBirth   DATE           = NULL,
    @DateOfJoining DATE           = NULL,
    @Gender        NVARCHAR(50)   = NULL,
    @MaritalStatus NVARCHAR(20)   = NULL,
    @BloodGroup    NVARCHAR(20)   = NULL,
    @Nationality   NVARCHAR(50)   = NULL,
    @PlaceOfBirth  NVARCHAR(100)  = NULL,
    @Religion      NVARCHAR(50)   = NULL,
    @Category      NVARCHAR(100)  = NULL,
    @EmployeePhoto VARBINARY(MAX) = NULL,
    @ResultMessage VARCHAR(200)   = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    -- Re-saving with a known code updates that employee instead of failing.
    IF ISNULL(@Id, 0) = 0 AND @Employee_Id IS NOT NULL
        SET @Id = dbo.fn_employee_pk(@Employee_Id);

    IF ISNULL(@Id, 0) = 0
    BEGIN
        IF @Employee_Id IS NULL
        BEGIN
            DECLARE @Seq INT = NEXT VALUE FOR emp.EmployeeCodeSeq;
            SET @Employee_Id = CONCAT('EMP', FORMAT(@Seq, '00000'));
        END

        INSERT emp.Employee
            (EmployeeCode, Salutation, FirstName, MiddleName, LastName, PreferredName, DateOfBirth, DateOfJoining,
             Gender, MaritalStatus, BloodGroup, Nationality, PlaceOfBirth, Religion, Category, EmployeePhoto)
        VALUES
            (@Employee_Id, @Salutation, @FirstName, @MiddleName, @LastName, @PreferredName, @DateOfBirth, @DateOfJoining,
             @Gender, @MaritalStatus, @BloodGroup, @Nationality, @PlaceOfBirth, @Religion, @Category, @EmployeePhoto);

        SET @Id = SCOPE_IDENTITY();
        SET @ResultMessage = 'Employee created successfully.';
        RETURN;
    END

    UPDATE emp.Employee SET
        EmployeeCode  = COALESCE(@Employee_Id, EmployeeCode),
        Salutation    = @Salutation,
        FirstName     = @FirstName,
        MiddleName    = @MiddleName,
        LastName      = @LastName,
        PreferredName = @PreferredName,
        DateOfBirth   = @DateOfBirth,
        DateOfJoining = @DateOfJoining,
        Gender        = @Gender,
        MaritalStatus = @MaritalStatus,
        BloodGroup    = @BloodGroup,
        Nationality   = @Nationality,
        PlaceOfBirth  = @PlaceOfBirth,
        Religion      = @Religion,
        Category      = @Category,
        EmployeePhoto = COALESCE(@EmployeePhoto, EmployeePhoto),  -- keep the old photo when none is sent
        UpdatedAt     = SYSUTCDATETIME()
    WHERE Id = @Id AND IsDeleted = 0;

    IF @@ROWCOUNT = 0 THROW 50001, 'Employee not found.', 1;

    SELECT @Employee_Id = EmployeeCode FROM emp.Employee WHERE Id = @Id;
    SET @ResultMessage = 'Personal information updated successfully.';
END
GO
-- Contact Details
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_contact_info
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    SELECT * INTO #ContactInfo FROM OPENJSON(@Json) WITH (
        [PersonalMail] NVARCHAR(100) '$.personalMail',
        [AlternateMail] NVARCHAR(100) '$.alternateMail',
        [MobileNumber] NVARCHAR(15) '$.mobileNumber',
        [AlternateMobile] NVARCHAR(15) '$.alternateMobile',
        [LandlineNumber] NVARCHAR(20) '$.landlineNumber',
        [OfficialEmail] NVARCHAR(100) '$.officialEmail',
        [LinkedinUrl] NVARCHAR(200) '$.linkedinUrl'
    ) AS j;

    IF EXISTS (SELECT 1 FROM emp.ContactInfo WHERE EmployeeId = @EmpPk)
    BEGIN
    UPDATE t SET
        t.[PersonalMail] = r.[PersonalMail],
        t.[AlternateMail] = r.[AlternateMail],
        t.[MobileNumber] = r.[MobileNumber],
        t.[AlternateMobile] = r.[AlternateMobile],
        t.[LandlineNumber] = r.[LandlineNumber],
        t.[OfficialEmail] = r.[OfficialEmail],
        t.[LinkedinUrl] = r.[LinkedinUrl],
        t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.ContactInfo AS t CROSS JOIN #ContactInfo AS r
    WHERE t.EmployeeId = @EmpPk;
    END
    ELSE
    BEGIN
    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [AlternateMail], [MobileNumber], [AlternateMobile], [LandlineNumber], [OfficialEmail], [LinkedinUrl])
    SELECT @EmpPk, r.[PersonalMail], r.[AlternateMail], r.[MobileNumber], r.[AlternateMobile], r.[LandlineNumber], r.[OfficialEmail], r.[LinkedinUrl] FROM #ContactInfo AS r;
    END

    SELECT @Id = Id FROM emp.ContactInfo WHERE EmployeeId = @EmpPk;

    -- Address: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Address FROM OPENJSON(@Json, '$.addresses') WITH (
        Id INT '$.id',
        [AddressType] NVARCHAR(50) '$.addressType',
        [HouseNumber] NVARCHAR(50) '$.houseNumber',
        [StreetName] NVARCHAR(100) '$.streetName',
        [Landmark] NVARCHAR(100) '$.landmark',
        [Colony] NVARCHAR(100) '$.colony',
        [Area] NVARCHAR(100) '$.area',
        [EffectiveFrom] DATETIMEOFFSET '$.effectiveFrom',
        [EffectiveTo] DATETIMEOFFSET '$.effectiveTo',
        [AddressProofLink] NVARCHAR(250) '$.addressProofLink',
        [City] NVARCHAR(100) '$.city',
        [District] NVARCHAR(100) '$.district',
        [StateProvince] NVARCHAR(100) '$.stateProvince',
        [Country] NVARCHAR(50) '$.country',
        [Pincode] NVARCHAR(10) '$.pincode',
        [CheckToggle] BIT '$.checkToggle'
    ) AS j;

    UPDATE emp.Address SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Address WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[AddressType] = r.[AddressType],
            t.[HouseNumber] = r.[HouseNumber],
            t.[StreetName] = r.[StreetName],
            t.[Landmark] = r.[Landmark],
            t.[Colony] = r.[Colony],
            t.[Area] = r.[Area],
            t.[EffectiveFrom] = r.[EffectiveFrom],
            t.[EffectiveTo] = r.[EffectiveTo],
            t.[AddressProofLink] = r.[AddressProofLink],
            t.[City] = r.[City],
            t.[District] = r.[District],
            t.[StateProvince] = r.[StateProvince],
            t.[Country] = r.[Country],
            t.[Pincode] = r.[Pincode],
            t.[CheckToggle] = ISNULL(r.[CheckToggle], 0),
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Address AS t JOIN #Address AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Landmark], [Colony], [Area], [EffectiveFrom], [EffectiveTo], [AddressProofLink], [City], [District], [StateProvince], [Country], [Pincode], [CheckToggle])
    SELECT @EmpPk, r.[AddressType], r.[HouseNumber], r.[StreetName], r.[Landmark], r.[Colony], r.[Area], r.[EffectiveFrom], r.[EffectiveTo], r.[AddressProofLink], r.[City], r.[District], r.[StateProvince], r.[Country], r.[Pincode], ISNULL(r.[CheckToggle], 0)
    FROM #Address AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Address AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- EmergencyContact: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #EmergencyContact FROM OPENJSON(@Json, '$.emergencyContacts') WITH (
        Id INT '$.id',
        [ContactName] NVARCHAR(100) '$.contactName',
        [ContactNumber] NVARCHAR(15) '$.contactNumber',
        [Relation] NVARCHAR(50) '$.relation',
        [EmergencyAlternateNumber] NVARCHAR(15) '$.emergencyAlternateNumber',
        [EmergencyEmail] NVARCHAR(100) '$.emergencyEmail',
        [Remarks] NVARCHAR(500) '$.remarks',
        [EmergencyAddress] NVARCHAR(300) '$.emergencyAddress',
        [PriorityOrder] BIT '$.priorityOrder',
        [PrimaryEmergencyContact] BIT '$.primaryEmergencyContact'
    ) AS j;

    UPDATE emp.EmergencyContact SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #EmergencyContact WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[ContactName] = r.[ContactName],
            t.[ContactNumber] = r.[ContactNumber],
            t.[Relation] = r.[Relation],
            t.[EmergencyAlternateNumber] = r.[EmergencyAlternateNumber],
            t.[EmergencyEmail] = r.[EmergencyEmail],
            t.[Remarks] = r.[Remarks],
            t.[EmergencyAddress] = r.[EmergencyAddress],
            t.[PriorityOrder] = ISNULL(r.[PriorityOrder], 0),
            t.[PrimaryEmergencyContact] = ISNULL(r.[PrimaryEmergencyContact], 0),
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.EmergencyContact AS t JOIN #EmergencyContact AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyAlternateNumber], [EmergencyEmail], [Remarks], [EmergencyAddress], [PriorityOrder], [PrimaryEmergencyContact])
    SELECT @EmpPk, r.[ContactName], r.[ContactNumber], r.[Relation], r.[EmergencyAlternateNumber], r.[EmergencyEmail], r.[Remarks], r.[EmergencyAddress], ISNULL(r.[PriorityOrder], 0), ISNULL(r.[PrimaryEmergencyContact], 0)
    FROM #EmergencyContact AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.EmergencyContact AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Contact Details saved successfully.';
END
GO

-- Family and Dependents
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_family_details
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- FamilyMember: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #FamilyMember FROM OPENJSON(@Json, '$.familyMembers') WITH (
        Id INT '$.id',
        [MemberName] NVARCHAR(100) '$.memberName',
        [MemberRelationship] NVARCHAR(50) '$.memberRelationship',
        [MemberGender] NVARCHAR(50) '$.memberGender',
        [MemberDateOfBirth] DATETIMEOFFSET '$.memberDateOfBirth',
        [MemberMaritalStatus] NVARCHAR(50) '$.memberMaritalStatus',
        [MemberOccupation] NVARCHAR(100) '$.memberOccupation',
        [MemberContactNumber] NVARCHAR(20) '$.memberContactNumber',
        [LivesWithEmployee] BIT '$.livesWithEmployee',
        [MemberNotes] NVARCHAR(500) '$.memberNotes',
        [MemberEmail] NVARCHAR(100) '$.memberEmail',
        [AddressSameAsEmployee] BIT '$.addressSameAsEmployee'
    ) AS j;

    UPDATE emp.FamilyMember SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #FamilyMember WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[MemberName] = r.[MemberName],
            t.[MemberRelationship] = r.[MemberRelationship],
            t.[MemberGender] = r.[MemberGender],
            t.[MemberDateOfBirth] = r.[MemberDateOfBirth],
            t.[MemberMaritalStatus] = r.[MemberMaritalStatus],
            t.[MemberOccupation] = r.[MemberOccupation],
            t.[MemberContactNumber] = r.[MemberContactNumber],
            t.[LivesWithEmployee] = ISNULL(r.[LivesWithEmployee], 0),
            t.[MemberNotes] = r.[MemberNotes],
            t.[MemberEmail] = r.[MemberEmail],
            t.[AddressSameAsEmployee] = ISNULL(r.[AddressSameAsEmployee], 0),
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.FamilyMember AS t JOIN #FamilyMember AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberMaritalStatus], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [MemberNotes], [MemberEmail], [AddressSameAsEmployee])
    SELECT @EmpPk, r.[MemberName], r.[MemberRelationship], r.[MemberGender], r.[MemberDateOfBirth], r.[MemberMaritalStatus], r.[MemberOccupation], r.[MemberContactNumber], ISNULL(r.[LivesWithEmployee], 0), r.[MemberNotes], r.[MemberEmail], ISNULL(r.[AddressSameAsEmployee], 0)
    FROM #FamilyMember AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.FamilyMember AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- Dependent: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Dependent FROM OPENJSON(@Json, '$.dependents') WITH (
        Id INT '$.id',
        [DependentName] NVARCHAR(100) '$.dependentName',
        [DependentRelationship] NVARCHAR(50) '$.dependentRelationship',
        [DependentDateOfBirth] DATETIMEOFFSET '$.dependentDateOfBirth',
        [DependentGender] NVARCHAR(50) '$.dependentGender',
        [FinanciallyDependent] BIT '$.financiallyDependent',
        [StudentStatus] BIT '$.studentStatus',
        [DisabilityStatus] BIT '$.disabilityStatus',
        [DependencyStartDate] DATETIMEOFFSET '$.dependencyStartDate',
        [EligibleForBenefits] BIT '$.eligibleForBenefits',
        [DependentRemarks] NVARCHAR(500) '$.dependentRemarks',
        [LinkedFamilyRecord] NVARCHAR(500) '$.linkedFamilyRecord',
        [MonthlyIncomeOrPension] DECIMAL(18,2) '$.monthlyIncomeOrPension',
        [DependencyEndDate] DATETIMEOFFSET '$.dependencyEndDate',
        [ProofDocumentLink] NVARCHAR(500) '$.proofDocumentLink'
    ) AS j;

    UPDATE emp.Dependent SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Dependent WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[DependentName] = r.[DependentName],
            t.[DependentRelationship] = r.[DependentRelationship],
            t.[DependentDateOfBirth] = r.[DependentDateOfBirth],
            t.[DependentGender] = r.[DependentGender],
            t.[FinanciallyDependent] = ISNULL(r.[FinanciallyDependent], 0),
            t.[StudentStatus] = ISNULL(r.[StudentStatus], 0),
            t.[DisabilityStatus] = ISNULL(r.[DisabilityStatus], 0),
            t.[DependencyStartDate] = r.[DependencyStartDate],
            t.[EligibleForBenefits] = ISNULL(r.[EligibleForBenefits], 0),
            t.[DependentRemarks] = r.[DependentRemarks],
            t.[LinkedFamilyRecord] = r.[LinkedFamilyRecord],
            t.[MonthlyIncomeOrPension] = r.[MonthlyIncomeOrPension],
            t.[DependencyEndDate] = r.[DependencyEndDate],
            t.[ProofDocumentLink] = r.[ProofDocumentLink],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Dependent AS t JOIN #Dependent AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Dependent (EmployeeId, [DependentName], [DependentRelationship], [DependentDateOfBirth], [DependentGender], [FinanciallyDependent], [StudentStatus], [DisabilityStatus], [DependencyStartDate], [EligibleForBenefits], [DependentRemarks], [LinkedFamilyRecord], [MonthlyIncomeOrPension], [DependencyEndDate], [ProofDocumentLink])
    SELECT @EmpPk, r.[DependentName], r.[DependentRelationship], r.[DependentDateOfBirth], r.[DependentGender], ISNULL(r.[FinanciallyDependent], 0), ISNULL(r.[StudentStatus], 0), ISNULL(r.[DisabilityStatus], 0), r.[DependencyStartDate], ISNULL(r.[EligibleForBenefits], 0), r.[DependentRemarks], r.[LinkedFamilyRecord], r.[MonthlyIncomeOrPension], r.[DependencyEndDate], r.[ProofDocumentLink]
    FROM #Dependent AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Dependent AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Family and Dependents saved successfully.';
END
GO

-- Employment Details
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_job_details
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    SELECT * INTO #EmploymentDetail FROM OPENJSON(@Json) WITH (
        [OfficeEmail] NVARCHAR(50) '$.officeEmail',
        [EmploymentStatus] NVARCHAR(50) '$.employmentStatus',
        [EmployeeType] NVARCHAR(20) '$.employeeType',
        [Department] NVARCHAR(30) '$.department',
        [BusinessUnit] NVARCHAR(50) '$.businessUnit',
        [Designation] NVARCHAR(30) '$.designation',
        [PayLevel] NVARCHAR(20) '$.payLevel',
        [WorkLocation] NVARCHAR(50) '$.workLocation',
        [ReportingManager] NVARCHAR(50) '$.reportingManager',
        [DottedLineManager] NVARCHAR(50) '$.dottedLineManager',
        [ShiftTimings] NVARCHAR(30) '$.shiftTimings',
        [WorkSchedule] NVARCHAR(50) '$.workSchedule',
        [ProbationStartDate] DATETIMEOFFSET '$.probationStartDate',
        [ProbationEndDate] DATETIMEOFFSET '$.probationEndDate',
        [ConfirmationDate] DATETIMEOFFSET '$.confirmationDate',
        [CostCenter] NVARCHAR(50) '$.costCenter',
        [EmployeeCategory] NVARCHAR(50) '$.employeeCategory',
        [HrOwner] NVARCHAR(50) '$.hrOwner'
    ) AS j;

    IF EXISTS (SELECT 1 FROM emp.EmploymentDetail WHERE EmployeeId = @EmpPk)
    BEGIN
    UPDATE t SET
        t.[OfficeEmail] = r.[OfficeEmail],
        t.[EmploymentStatus] = r.[EmploymentStatus],
        t.[EmployeeType] = r.[EmployeeType],
        t.[Department] = r.[Department],
        t.[BusinessUnit] = r.[BusinessUnit],
        t.[Designation] = r.[Designation],
        t.[PayLevel] = r.[PayLevel],
        t.[WorkLocation] = r.[WorkLocation],
        t.[ReportingManager] = r.[ReportingManager],
        t.[DottedLineManager] = r.[DottedLineManager],
        t.[ShiftTimings] = r.[ShiftTimings],
        t.[WorkSchedule] = r.[WorkSchedule],
        t.[ProbationStartDate] = r.[ProbationStartDate],
        t.[ProbationEndDate] = r.[ProbationEndDate],
        t.[ConfirmationDate] = r.[ConfirmationDate],
        t.[CostCenter] = r.[CostCenter],
        t.[EmployeeCategory] = r.[EmployeeCategory],
        t.[HrOwner] = r.[HrOwner],
        t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.EmploymentDetail AS t CROSS JOIN #EmploymentDetail AS r
    WHERE t.EmployeeId = @EmpPk;
    END
    ELSE
    BEGIN
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [DottedLineManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [ProbationEndDate], [ConfirmationDate], [CostCenter], [EmployeeCategory], [HrOwner])
    SELECT @EmpPk, r.[OfficeEmail], r.[EmploymentStatus], r.[EmployeeType], r.[Department], r.[BusinessUnit], r.[Designation], r.[PayLevel], r.[WorkLocation], r.[ReportingManager], r.[DottedLineManager], r.[ShiftTimings], r.[WorkSchedule], r.[ProbationStartDate], r.[ProbationEndDate], r.[ConfirmationDate], r.[CostCenter], r.[EmployeeCategory], r.[HrOwner] FROM #EmploymentDetail AS r;
    END

    SELECT @Id = Id FROM emp.EmploymentDetail WHERE EmployeeId = @EmpPk;

    -- Date of joining lives on emp.Employee (single source of truth).
    UPDATE e SET e.DateOfJoining = j.DateOfJoining, e.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Employee AS e CROSS APPLY OPENJSON(@Json) WITH (DateOfJoining DATETIMEOFFSET '$.dateOfJoining') AS j
    WHERE e.Id = @EmpPk AND j.DateOfJoining IS NOT NULL;
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Employment Details saved successfully.';
END
GO

-- Education Details
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_education_details
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- Education: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Education FROM OPENJSON(@Json, '$.educations') WITH (
        Id INT '$.id',
        [QualificationLevel] NVARCHAR(50) '$.qualificationLevel',
        [DegreeOrCourseName] NVARCHAR(100) '$.degreeOrCourseName',
        [SpecializationOrMajor] NVARCHAR(100) '$.specializationOrMajor',
        [InstitutionOrCollegeName] NVARCHAR(150) '$.institutionOrCollegeName',
        [UniversityOrBoardName] NVARCHAR(150) '$.universityOrBoardName',
        [ModeOfStudy] NVARCHAR(50) '$.modeOfStudy',
        [StartDate] DATETIMEOFFSET '$.startDate',
        [EndDate] DATETIMEOFFSET '$.endDate',
        [YearOfPassing] INT '$.yearOfPassing',
        [GradePercentageOrCgpa] NVARCHAR(10) '$.gradePercentageOrCgpa',
        [HighestQualificationFlag] NVARCHAR(5) '$.highestQualificationFlag',
        [EducationDocumentLink] NVARCHAR(255) '$.educationDocumentLink'
    ) AS j;

    UPDATE emp.Education SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Education WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[QualificationLevel] = r.[QualificationLevel],
            t.[DegreeOrCourseName] = r.[DegreeOrCourseName],
            t.[SpecializationOrMajor] = r.[SpecializationOrMajor],
            t.[InstitutionOrCollegeName] = r.[InstitutionOrCollegeName],
            t.[UniversityOrBoardName] = r.[UniversityOrBoardName],
            t.[ModeOfStudy] = r.[ModeOfStudy],
            t.[StartDate] = r.[StartDate],
            t.[EndDate] = r.[EndDate],
            t.[YearOfPassing] = r.[YearOfPassing],
            t.[GradePercentageOrCgpa] = r.[GradePercentageOrCgpa],
            t.[HighestQualificationFlag] = r.[HighestQualificationFlag],
            t.[EducationDocumentLink] = r.[EducationDocumentLink],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Education AS t JOIN #Education AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag], [EducationDocumentLink])
    SELECT @EmpPk, r.[QualificationLevel], r.[DegreeOrCourseName], r.[SpecializationOrMajor], r.[InstitutionOrCollegeName], r.[UniversityOrBoardName], r.[ModeOfStudy], r.[StartDate], r.[EndDate], r.[YearOfPassing], r.[GradePercentageOrCgpa], r.[HighestQualificationFlag], r.[EducationDocumentLink]
    FROM #Education AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Education AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- Certification: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Certification FROM OPENJSON(@Json, '$.certifications') WITH (
        Id INT '$.id',
        [CertificationName] NVARCHAR(100) '$.certificationName',
        [IssuingOrganization] NVARCHAR(100) '$.issuingOrganization',
        [CredentialId] NVARCHAR(100) '$.credentialId',
        [IssueDate] DATETIMEOFFSET '$.issueDate',
        [ValidFrom] DATETIMEOFFSET '$.validFrom',
        [ValidTo] DATETIMEOFFSET '$.validTo',
        [CertificationScoreOrGrade] NVARCHAR(20) '$.certificationScoreOrGrade',
        [VerificationUrl] NVARCHAR(255) '$.verificationUrl',
        [AttachmentLink] NVARCHAR(255) '$.attachmentLink',
        [ActiveExpiredStatus] NVARCHAR(20) '$.activeExpiredStatus'
    ) AS j;

    UPDATE emp.Certification SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Certification WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[CertificationName] = r.[CertificationName],
            t.[IssuingOrganization] = r.[IssuingOrganization],
            t.[CredentialId] = r.[CredentialId],
            t.[IssueDate] = r.[IssueDate],
            t.[ValidFrom] = r.[ValidFrom],
            t.[ValidTo] = r.[ValidTo],
            t.[CertificationScoreOrGrade] = r.[CertificationScoreOrGrade],
            t.[VerificationUrl] = r.[VerificationUrl],
            t.[AttachmentLink] = r.[AttachmentLink],
            t.[ActiveExpiredStatus] = r.[ActiveExpiredStatus],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Certification AS t JOIN #Certification AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Certification (EmployeeId, [CertificationName], [IssuingOrganization], [CredentialId], [IssueDate], [ValidFrom], [ValidTo], [CertificationScoreOrGrade], [VerificationUrl], [AttachmentLink], [ActiveExpiredStatus])
    SELECT @EmpPk, r.[CertificationName], r.[IssuingOrganization], r.[CredentialId], r.[IssueDate], r.[ValidFrom], r.[ValidTo], r.[CertificationScoreOrGrade], r.[VerificationUrl], r.[AttachmentLink], r.[ActiveExpiredStatus]
    FROM #Certification AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Certification AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Education Details saved successfully.';
END
GO

-- Skills and Competencies
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_skills
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- Skill: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Skill FROM OPENJSON(@Json, '$.skills') WITH (
        Id INT '$.id',
        [SkillName] NVARCHAR(100) '$.skillName',
        [SkillCategory] NVARCHAR(50) '$.skillCategory',
        [ProficiencyLevel] NVARCHAR(50) '$.proficiencyLevel',
        [YearsOfExperience] INT '$.yearsOfExperience',
        [LastUsedYear] INT '$.lastUsedYear',
        [LinkedCertification] NVARCHAR(100) '$.linkedCertification',
        [PrimarySkill] BIT '$.primarySkill',
        [Remarks] NVARCHAR(500) '$.remarks'
    ) AS j;

    UPDATE emp.Skill SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Skill WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[SkillName] = r.[SkillName],
            t.[SkillCategory] = r.[SkillCategory],
            t.[ProficiencyLevel] = r.[ProficiencyLevel],
            t.[YearsOfExperience] = r.[YearsOfExperience],
            t.[LastUsedYear] = r.[LastUsedYear],
            t.[LinkedCertification] = r.[LinkedCertification],
            t.[PrimarySkill] = ISNULL(r.[PrimarySkill], 0),
            t.[Remarks] = r.[Remarks],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Skill AS t JOIN #Skill AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [LinkedCertification], [PrimarySkill], [Remarks])
    SELECT @EmpPk, r.[SkillName], r.[SkillCategory], r.[ProficiencyLevel], r.[YearsOfExperience], r.[LastUsedYear], r.[LinkedCertification], ISNULL(r.[PrimarySkill], 0), r.[Remarks]
    FROM #Skill AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Skill AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Skills and Competencies saved successfully.';
END
GO

-- Compensation, Payroll and Bank
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_salary_structure
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- BankPayroll: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #BankPayroll FROM OPENJSON(@Json, '$.salaryStructures') WITH (
        Id INT '$.id',
        [PayrollGroup] NVARCHAR(50) '$.payrollGroup',
        [SalaryStructurePlan] NVARCHAR(50) '$.salaryStructurePlan',
        [PayGrade] NVARCHAR(50) '$.payGrade',
        [BankName] NVARCHAR(100) '$.bankName',
        [AccountHolderName] NVARCHAR(100) '$.accountHolderName',
        [BankAccountNumber] NVARCHAR(18) '$.bankAccountNumber',
        [BranchName] NVARCHAR(100) '$.branchName',
        [IfscCode] NVARCHAR(11) '$.ifscCode',
        [MicrNumber] NVARCHAR(9) '$.micrNumber',
        [AccountType] NVARCHAR(50) '$.accountType',
        [SalaryPaymentMode] NVARCHAR(50) '$.salaryPaymentMode',
        [TaxRegime] NVARCHAR(50) '$.taxRegime',
        [PayrollEffectiveFrom] DATETIMEOFFSET '$.payrollEffectiveFrom',
        [BankProofLink] NVARCHAR(255) '$.bankProofLink',
        [BankAddress] NVARCHAR(300) '$.bankAddress'
    ) AS j;

    UPDATE emp.BankPayroll SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #BankPayroll WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[PayrollGroup] = r.[PayrollGroup],
            t.[SalaryStructurePlan] = r.[SalaryStructurePlan],
            t.[PayGrade] = r.[PayGrade],
            t.[BankName] = r.[BankName],
            t.[AccountHolderName] = r.[AccountHolderName],
            t.[BankAccountNumber] = r.[BankAccountNumber],
            t.[BranchName] = r.[BranchName],
            t.[IfscCode] = r.[IfscCode],
            t.[MicrNumber] = r.[MicrNumber],
            t.[AccountType] = r.[AccountType],
            t.[SalaryPaymentMode] = r.[SalaryPaymentMode],
            t.[TaxRegime] = r.[TaxRegime],
            t.[PayrollEffectiveFrom] = r.[PayrollEffectiveFrom],
            t.[BankProofLink] = r.[BankProofLink],
            t.[BankAddress] = r.[BankAddress],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.BankPayroll AS t JOIN #BankPayroll AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [MicrNumber], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom], [BankProofLink], [BankAddress])
    SELECT @EmpPk, r.[PayrollGroup], r.[SalaryStructurePlan], r.[PayGrade], r.[BankName], r.[AccountHolderName], r.[BankAccountNumber], r.[BranchName], r.[IfscCode], r.[MicrNumber], r.[AccountType], r.[SalaryPaymentMode], r.[TaxRegime], r.[PayrollEffectiveFrom], r.[BankProofLink], r.[BankAddress]
    FROM #BankPayroll AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.BankPayroll AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Compensation, Payroll and Bank saved successfully.';
END
GO

-- Identity and Statutory
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_identity_statutory
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    SELECT * INTO #StatutoryInfo FROM OPENJSON(@Json) WITH (
        [PanNumber] NVARCHAR(10) '$.panNumber',
        [AadhaarNumber] NVARCHAR(12) '$.aadhaarNumber',
        [UanNumber] NVARCHAR(12) '$.uanNumber',
        [PfAccountNumber] NVARCHAR(22) '$.pfAccountNumber',
        [EsiNumber] NVARCHAR(17) '$.esiNumber'
    ) AS j;

    IF EXISTS (SELECT 1 FROM emp.StatutoryInfo WHERE EmployeeId = @EmpPk)
    BEGIN
    UPDATE t SET
        t.[PanNumber] = r.[PanNumber],
        t.[AadhaarNumber] = r.[AadhaarNumber],
        t.[UanNumber] = r.[UanNumber],
        t.[PfAccountNumber] = r.[PfAccountNumber],
        t.[EsiNumber] = r.[EsiNumber],
        t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.StatutoryInfo AS t CROSS JOIN #StatutoryInfo AS r
    WHERE t.EmployeeId = @EmpPk;
    END
    ELSE
    BEGIN
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber], [EsiNumber])
    SELECT @EmpPk, r.[PanNumber], r.[AadhaarNumber], r.[UanNumber], r.[PfAccountNumber], r.[EsiNumber] FROM #StatutoryInfo AS r;
    END

    SELECT @Id = Id FROM emp.StatutoryInfo WHERE EmployeeId = @EmpPk;

    -- IdentityDocument: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #IdentityDocument FROM OPENJSON(@Json, '$.identityDocuments') WITH (
        Id INT '$.id',
        [DocumentType] NVARCHAR(50) '$.documentType',
        [DocumentNumber] NVARCHAR(50) '$.documentNumber',
        [NameOnDocument] NVARCHAR(100) '$.nameOnDocument',
        [IssuingAuthority] NVARCHAR(100) '$.issuingAuthority',
        [CountryOfIssue] NVARCHAR(50) '$.countryOfIssue',
        [PlaceOfIssue] NVARCHAR(100) '$.placeOfIssue',
        [IssueDate] DATETIMEOFFSET '$.issueDate',
        [ValidFrom] DATETIMEOFFSET '$.validFrom',
        [ValidTo] DATETIMEOFFSET '$.validTo',
        [VerificationStatus] NVARCHAR(50) '$.verificationStatus',
        [VerifiedBy] NVARCHAR(50) '$.verifiedBy',
        [FrontAttachLink] NVARCHAR(50) '$.frontAttachLink',
        [BackAttachLink] NVARCHAR(50) '$.backAttachLink',
        [IdentificationDocumentRemarks] NVARCHAR(500) '$.identificationDocumentRemarks'
    ) AS j;

    UPDATE emp.IdentityDocument SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #IdentityDocument WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[DocumentType] = r.[DocumentType],
            t.[DocumentNumber] = r.[DocumentNumber],
            t.[NameOnDocument] = r.[NameOnDocument],
            t.[IssuingAuthority] = r.[IssuingAuthority],
            t.[CountryOfIssue] = r.[CountryOfIssue],
            t.[PlaceOfIssue] = r.[PlaceOfIssue],
            t.[IssueDate] = r.[IssueDate],
            t.[ValidFrom] = r.[ValidFrom],
            t.[ValidTo] = r.[ValidTo],
            t.[VerificationStatus] = r.[VerificationStatus],
            t.[VerifiedBy] = r.[VerifiedBy],
            t.[FrontAttachLink] = r.[FrontAttachLink],
            t.[BackAttachLink] = r.[BackAttachLink],
            t.[IdentificationDocumentRemarks] = r.[IdentificationDocumentRemarks],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.IdentityDocument AS t JOIN #IdentityDocument AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [PlaceOfIssue], [IssueDate], [ValidFrom], [ValidTo], [VerificationStatus], [VerifiedBy], [FrontAttachLink], [BackAttachLink], [IdentificationDocumentRemarks])
    SELECT @EmpPk, r.[DocumentType], r.[DocumentNumber], r.[NameOnDocument], r.[IssuingAuthority], r.[CountryOfIssue], r.[PlaceOfIssue], r.[IssueDate], r.[ValidFrom], r.[ValidTo], r.[VerificationStatus], r.[VerifiedBy], r.[FrontAttachLink], r.[BackAttachLink], r.[IdentificationDocumentRemarks]
    FROM #IdentityDocument AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.IdentityDocument AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- RepositoryDocument: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #RepositoryDocument FROM OPENJSON(@Json, '$.documentRepository') WITH (
        Id INT '$.id',
        [GenericDocumentCategory] NVARCHAR(50) '$.genericDocumentCategory',
        [GenericDocumentName] NVARCHAR(100) '$.genericDocumentName',
        [GenericRelatedSection] NVARCHAR(50) '$.genericRelatedSection',
        [GenericRelatedRecordId] NVARCHAR(50) '$.genericRelatedRecordId',
        [GenericFileUpload] NVARCHAR(50) '$.genericFileUpload',
        [GenericUploadDate] DATETIMEOFFSET '$.genericUploadDate',
        [GenericValidFrom] DATETIMEOFFSET '$.genericValidFrom',
        [GenericValidTo] DATETIMEOFFSET '$.genericValidTo',
        [GenericVerificationStatus] NVARCHAR(50) '$.genericVerificationStatus',
        [GenericVerifiedBy] NVARCHAR(50) '$.genericVerifiedBy',
        [GenericRemarks] NVARCHAR(500) '$.genericRemarks'
    ) AS j;

    UPDATE emp.RepositoryDocument SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #RepositoryDocument WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[GenericDocumentCategory] = r.[GenericDocumentCategory],
            t.[GenericDocumentName] = r.[GenericDocumentName],
            t.[GenericRelatedSection] = r.[GenericRelatedSection],
            t.[GenericRelatedRecordId] = r.[GenericRelatedRecordId],
            t.[GenericFileUpload] = r.[GenericFileUpload],
            t.[GenericUploadDate] = r.[GenericUploadDate],
            t.[GenericValidFrom] = r.[GenericValidFrom],
            t.[GenericValidTo] = r.[GenericValidTo],
            t.[GenericVerificationStatus] = r.[GenericVerificationStatus],
            t.[GenericVerifiedBy] = r.[GenericVerifiedBy],
            t.[GenericRemarks] = r.[GenericRemarks],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.RepositoryDocument AS t JOIN #RepositoryDocument AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.RepositoryDocument (EmployeeId, [GenericDocumentCategory], [GenericDocumentName], [GenericRelatedSection], [GenericRelatedRecordId], [GenericFileUpload], [GenericUploadDate], [GenericValidFrom], [GenericValidTo], [GenericVerificationStatus], [GenericVerifiedBy], [GenericRemarks])
    SELECT @EmpPk, r.[GenericDocumentCategory], r.[GenericDocumentName], r.[GenericRelatedSection], r.[GenericRelatedRecordId], r.[GenericFileUpload], r.[GenericUploadDate], r.[GenericValidFrom], r.[GenericValidTo], r.[GenericVerificationStatus], r.[GenericVerifiedBy], r.[GenericRemarks]
    FROM #RepositoryDocument AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.RepositoryDocument AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Identity and Statutory saved successfully.';
END
GO

-- Previous Employment
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_work_experience
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- WorkExperience: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #WorkExperience FROM OPENJSON(@Json, '$.workExperiences') WITH (
        Id INT '$.id',
        [EmployerName] NVARCHAR(100) '$.employerName',
        [EmployerLocation] NVARCHAR(100) '$.employerLocation',
        [Designation] NVARCHAR(100) '$.designation',
        [EmploymentType] NVARCHAR(50) '$.employmentType',
        [StartDate] DATETIMEOFFSET '$.startDate',
        [EndDate] DATETIMEOFFSET '$.endDate',
        [TotalExperience] DECIMAL(5,2) '$.totalExperience',
        [PreviousEmployerPfAccountNumber] NVARCHAR(50) '$.previousEmployerPfAccountNumber',
        [ManagerName] NVARCHAR(100) '$.managerName',
        [LastDrawnSalary] DECIMAL(18,2) '$.lastDrawnSalary',
        [ReasonForLeaving] NVARCHAR(500) '$.reasonForLeaving',
        [SkillsUsed] NVARCHAR(500) '$.skillsUsed',
        [ExperienceLetterLink] NVARCHAR(500) '$.experienceLetterLink',
        [RelievingLetterLink] NVARCHAR(500) '$.relievingLetterLink',
        [PayslipLink] NVARCHAR(500) '$.payslipLink'
    ) AS j;

    UPDATE emp.WorkExperience SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #WorkExperience WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[EmployerName] = r.[EmployerName],
            t.[EmployerLocation] = r.[EmployerLocation],
            t.[Designation] = r.[Designation],
            t.[EmploymentType] = r.[EmploymentType],
            t.[StartDate] = r.[StartDate],
            t.[EndDate] = r.[EndDate],
            t.[TotalExperience] = r.[TotalExperience],
            t.[PreviousEmployerPfAccountNumber] = r.[PreviousEmployerPfAccountNumber],
            t.[ManagerName] = r.[ManagerName],
            t.[LastDrawnSalary] = r.[LastDrawnSalary],
            t.[ReasonForLeaving] = r.[ReasonForLeaving],
            t.[SkillsUsed] = r.[SkillsUsed],
            t.[ExperienceLetterLink] = r.[ExperienceLetterLink],
            t.[RelievingLetterLink] = r.[RelievingLetterLink],
            t.[PayslipLink] = r.[PayslipLink],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.WorkExperience AS t JOIN #WorkExperience AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.WorkExperience (EmployeeId, [EmployerName], [EmployerLocation], [Designation], [EmploymentType], [StartDate], [EndDate], [TotalExperience], [PreviousEmployerPfAccountNumber], [ManagerName], [LastDrawnSalary], [ReasonForLeaving], [SkillsUsed], [ExperienceLetterLink], [RelievingLetterLink], [PayslipLink])
    SELECT @EmpPk, r.[EmployerName], r.[EmployerLocation], r.[Designation], r.[EmploymentType], r.[StartDate], r.[EndDate], r.[TotalExperience], r.[PreviousEmployerPfAccountNumber], r.[ManagerName], r.[LastDrawnSalary], r.[ReasonForLeaving], r.[SkillsUsed], r.[ExperienceLetterLink], r.[RelievingLetterLink], r.[PayslipLink]
    FROM #WorkExperience AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.WorkExperience AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Previous Employment saved successfully.';
END
GO

-- Insurance and Benefits
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_insurance_details
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- InsurancePolicy: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #InsurancePolicy FROM OPENJSON(@Json) WITH (
        Id INT '$.policy.id',
        [BenefitType] NVARCHAR(50) '$.policy.benefitType',
        [ProviderName] NVARCHAR(100) '$.policy.providerName',
        [PolicyNumber] NVARCHAR(50) '$.policy.policyNumber',
        [CoverageStartDate] DATETIMEOFFSET '$.policy.coverageStartDate',
        [CoverageEndDate] DATETIMEOFFSET '$.policy.coverageEndDate',
        [EmployeeCovered] BIT '$.policy.employeeCovered',
        [PremiumSharingType] NVARCHAR(50) '$.policy.premiumSharingType',
        [CoverageAmount] DECIMAL(18,2) '$.policy.coverageAmount',
        [PolicyStatus] NVARCHAR(50) '$.policy.policyStatus',
        [InsuranceRemarks] NVARCHAR(500) '$.policy.insuranceRemarks',
        [CoveredMemberName] NVARCHAR(100) '$.policy.coveredMemberName',
        [CoveredMemberRelationship] NVARCHAR(50) '$.policy.coveredMemberRelationship',
        [SumInsuredAllocation] DECIMAL(18,2) '$.policy.sumInsuredAllocation',
        [MemberCoverageFrom] DATETIMEOFFSET '$.policy.memberCoverageFrom',
        [MemberCoverageTo] DATETIMEOFFSET '$.policy.memberCoverageTo',
        [LinkedFamilyOrDependentRecord] NVARCHAR(50) '$.policy.linkedFamilyOrDependentRecord',
        [InsuranceCardProofLink] NVARCHAR(50) '$.policy.insuranceCardProofLink',
        [CoveredUnderPolicy] BIT '$.policy.coveredUnderPolicy'
    ) AS j;

    UPDATE emp.InsurancePolicy SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #InsurancePolicy WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[BenefitType] = r.[BenefitType],
            t.[ProviderName] = r.[ProviderName],
            t.[PolicyNumber] = r.[PolicyNumber],
            t.[CoverageStartDate] = r.[CoverageStartDate],
            t.[CoverageEndDate] = r.[CoverageEndDate],
            t.[EmployeeCovered] = ISNULL(r.[EmployeeCovered], 0),
            t.[PremiumSharingType] = r.[PremiumSharingType],
            t.[CoverageAmount] = r.[CoverageAmount],
            t.[PolicyStatus] = r.[PolicyStatus],
            t.[InsuranceRemarks] = r.[InsuranceRemarks],
            t.[CoveredMemberName] = r.[CoveredMemberName],
            t.[CoveredMemberRelationship] = r.[CoveredMemberRelationship],
            t.[SumInsuredAllocation] = r.[SumInsuredAllocation],
            t.[MemberCoverageFrom] = r.[MemberCoverageFrom],
            t.[MemberCoverageTo] = r.[MemberCoverageTo],
            t.[LinkedFamilyOrDependentRecord] = r.[LinkedFamilyOrDependentRecord],
            t.[InsuranceCardProofLink] = r.[InsuranceCardProofLink],
            t.[CoveredUnderPolicy] = ISNULL(r.[CoveredUnderPolicy], 0),
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.InsurancePolicy AS t JOIN #InsurancePolicy AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [InsuranceRemarks], [CoveredMemberName], [CoveredMemberRelationship], [SumInsuredAllocation], [MemberCoverageFrom], [MemberCoverageTo], [LinkedFamilyOrDependentRecord], [InsuranceCardProofLink], [CoveredUnderPolicy])
    SELECT @EmpPk, r.[BenefitType], r.[ProviderName], r.[PolicyNumber], r.[CoverageStartDate], r.[CoverageEndDate], ISNULL(r.[EmployeeCovered], 0), r.[PremiumSharingType], r.[CoverageAmount], r.[PolicyStatus], r.[InsuranceRemarks], r.[CoveredMemberName], r.[CoveredMemberRelationship], r.[SumInsuredAllocation], r.[MemberCoverageFrom], r.[MemberCoverageTo], r.[LinkedFamilyOrDependentRecord], r.[InsuranceCardProofLink], ISNULL(r.[CoveredUnderPolicy], 0)
    FROM #InsurancePolicy AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.InsurancePolicy AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- Nominee: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #Nominee FROM OPENJSON(@Json) WITH (
        Id INT '$.nominee.id',
        [NomineeBenefitType] NVARCHAR(50) '$.nominee.nomineeBenefitType',
        [NomineeName] NVARCHAR(100) '$.nominee.nomineeName',
        [NomineeRelationship] NVARCHAR(50) '$.nominee.nomineeRelationship',
        [NomineeDateOfBirth] DATETIMEOFFSET '$.nominee.nomineeDateOfBirth',
        [NomineeContactNumber] NVARCHAR(20) '$.nominee.nomineeContactNumber',
        [SharePercentage] DECIMAL(5,2) '$.nominee.sharePercentage',
        [NomineePriority] INT '$.nominee.nomineePriority',
        [NomineeEffectiveFrom] DATETIMEOFFSET '$.nominee.nomineeEffectiveFrom',
        [NomineeEffectiveTo] DATETIMEOFFSET '$.nominee.nomineeEffectiveTo',
        [MinorFlag] BIT '$.nominee.minorFlag',
        [GuardianName] NVARCHAR(100) '$.nominee.guardianName',
        [NomineeActive] BIT '$.nominee.nomineeActive',
        [NomineeBankName] NVARCHAR(100) '$.nominee.nomineeBankName',
        [NomineeAccountNumber] NVARCHAR(18) '$.nominee.nomineeAccountNumber',
        [NomineeIfscCode] NVARCHAR(11) '$.nominee.nomineeIfscCode',
        [NomineeAadhaarNumber] NVARCHAR(12) '$.nominee.nomineeAadhaarNumber',
        [NomineePanNumber] NVARCHAR(10) '$.nominee.nomineePanNumber',
        [LinkedFamilyOrDependentRecord] NVARCHAR(50) '$.nominee.linkedFamilyOrDependentRecord',
        [ProofDocumentLink] NVARCHAR(255) '$.nominee.proofDocumentLink',
        [Address] NVARCHAR(300) '$.nominee.address'
    ) AS j;

    UPDATE emp.Nominee SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #Nominee WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[NomineeBenefitType] = r.[NomineeBenefitType],
            t.[NomineeName] = r.[NomineeName],
            t.[NomineeRelationship] = r.[NomineeRelationship],
            t.[NomineeDateOfBirth] = r.[NomineeDateOfBirth],
            t.[NomineeContactNumber] = r.[NomineeContactNumber],
            t.[SharePercentage] = r.[SharePercentage],
            t.[NomineePriority] = r.[NomineePriority],
            t.[NomineeEffectiveFrom] = r.[NomineeEffectiveFrom],
            t.[NomineeEffectiveTo] = r.[NomineeEffectiveTo],
            t.[MinorFlag] = ISNULL(r.[MinorFlag], 0),
            t.[GuardianName] = r.[GuardianName],
            t.[NomineeActive] = ISNULL(r.[NomineeActive], 0),
            t.[NomineeBankName] = r.[NomineeBankName],
            t.[NomineeAccountNumber] = r.[NomineeAccountNumber],
            t.[NomineeIfscCode] = r.[NomineeIfscCode],
            t.[NomineeAadhaarNumber] = r.[NomineeAadhaarNumber],
            t.[NomineePanNumber] = r.[NomineePanNumber],
            t.[LinkedFamilyOrDependentRecord] = r.[LinkedFamilyOrDependentRecord],
            t.[ProofDocumentLink] = r.[ProofDocumentLink],
            t.[Address] = r.[Address],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Nominee AS t JOIN #Nominee AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [NomineeContactNumber], [SharePercentage], [NomineePriority], [NomineeEffectiveFrom], [NomineeEffectiveTo], [MinorFlag], [GuardianName], [NomineeActive], [NomineeBankName], [NomineeAccountNumber], [NomineeIfscCode], [NomineeAadhaarNumber], [NomineePanNumber], [LinkedFamilyOrDependentRecord], [ProofDocumentLink], [Address])
    SELECT @EmpPk, r.[NomineeBenefitType], r.[NomineeName], r.[NomineeRelationship], r.[NomineeDateOfBirth], r.[NomineeContactNumber], r.[SharePercentage], r.[NomineePriority], r.[NomineeEffectiveFrom], r.[NomineeEffectiveTo], ISNULL(r.[MinorFlag], 0), r.[GuardianName], ISNULL(r.[NomineeActive], 0), r.[NomineeBankName], r.[NomineeAccountNumber], r.[NomineeIfscCode], r.[NomineeAadhaarNumber], r.[NomineePanNumber], r.[LinkedFamilyOrDependentRecord], r.[ProofDocumentLink], r.[Address]
    FROM #Nominee AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.Nominee AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    SELECT @Id = MAX(Id) FROM emp.InsurancePolicy WHERE EmployeeId = @EmpPk AND IsDeleted = 0;
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Insurance and Benefits saved successfully.';
END
GO

-- Separation and Exit
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_separation
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    SELECT * INTO #Separation FROM OPENJSON(@Json) WITH (
        [SeparationType] NVARCHAR(50) '$.separationType',
        [SeparationStatus] NVARCHAR(50) '$.separationStatus',
        [ExitReason] NVARCHAR(100) '$.exitReason',
        [InitiationDate] DATETIMEOFFSET '$.initiationDate',
        [ResignationDate] DATETIMEOFFSET '$.resignationDate',
        [NoticeStartDate] DATETIMEOFFSET '$.noticeStartDate',
        [NoticeEndDate] DATETIMEOFFSET '$.noticeEndDate',
        [ProposedLastWorkingDay] DATETIMEOFFSET '$.proposedLastWorkingDay',
        [FinalLastWorkingDay] DATETIMEOFFSET '$.finalLastWorkingDay',
        [RehireEligible] BIT '$.rehireEligible',
        [AttritionCategory] NVARCHAR(50) '$.attritionCategory',
        [ManagerClearanceStatus] NVARCHAR(50) '$.managerClearanceStatus',
        [HrClearanceStatus] NVARCHAR(50) '$.hrClearanceStatus',
        [ExitInterviewRequired] BIT '$.exitInterviewRequired',
        [ExitInterviewStatus] NVARCHAR(50) '$.exitInterviewStatus',
        [KnowledgeTransferRequired] BIT '$.knowledgeTransferRequired',
        [KnowledgeTransferStatus] NVARCHAR(50) '$.knowledgeTransferStatus',
        [LeaveBalanceAtExit] DECIMAL(6,2) '$.leaveBalanceAtExit',
        [GratuityEligible] BIT '$.gratuityEligible',
        [FinalSettlementStatus] NVARCHAR(50) '$.finalSettlementStatus',
        [OfficialEmailDisableDate] DATETIMEOFFSET '$.officialEmailDisableDate',
        [ApplicationAccessRevokeStatus] NVARCHAR(50) '$.applicationAccessRevokeStatus',
        [DetailedExitRemarks] NVARCHAR(1000) '$.detailedExitRemarks'
    ) AS j;

    IF EXISTS (SELECT 1 FROM emp.Separation WHERE EmployeeId = @EmpPk)
    BEGIN
    UPDATE t SET
        t.[SeparationType] = r.[SeparationType],
        t.[SeparationStatus] = r.[SeparationStatus],
        t.[ExitReason] = r.[ExitReason],
        t.[InitiationDate] = r.[InitiationDate],
        t.[ResignationDate] = r.[ResignationDate],
        t.[NoticeStartDate] = r.[NoticeStartDate],
        t.[NoticeEndDate] = r.[NoticeEndDate],
        t.[ProposedLastWorkingDay] = r.[ProposedLastWorkingDay],
        t.[FinalLastWorkingDay] = r.[FinalLastWorkingDay],
        t.[RehireEligible] = ISNULL(r.[RehireEligible], 0),
        t.[AttritionCategory] = r.[AttritionCategory],
        t.[ManagerClearanceStatus] = r.[ManagerClearanceStatus],
        t.[HrClearanceStatus] = r.[HrClearanceStatus],
        t.[ExitInterviewRequired] = ISNULL(r.[ExitInterviewRequired], 0),
        t.[ExitInterviewStatus] = r.[ExitInterviewStatus],
        t.[KnowledgeTransferRequired] = ISNULL(r.[KnowledgeTransferRequired], 0),
        t.[KnowledgeTransferStatus] = r.[KnowledgeTransferStatus],
        t.[LeaveBalanceAtExit] = r.[LeaveBalanceAtExit],
        t.[GratuityEligible] = ISNULL(r.[GratuityEligible], 0),
        t.[FinalSettlementStatus] = r.[FinalSettlementStatus],
        t.[OfficialEmailDisableDate] = r.[OfficialEmailDisableDate],
        t.[ApplicationAccessRevokeStatus] = r.[ApplicationAccessRevokeStatus],
        t.[DetailedExitRemarks] = r.[DetailedExitRemarks],
        t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Separation AS t CROSS JOIN #Separation AS r
    WHERE t.EmployeeId = @EmpPk;
    END
    ELSE
    BEGIN
    INSERT emp.Separation (EmployeeId, [SeparationType], [SeparationStatus], [ExitReason], [InitiationDate], [ResignationDate], [NoticeStartDate], [NoticeEndDate], [ProposedLastWorkingDay], [FinalLastWorkingDay], [RehireEligible], [AttritionCategory], [ManagerClearanceStatus], [HrClearanceStatus], [ExitInterviewRequired], [ExitInterviewStatus], [KnowledgeTransferRequired], [KnowledgeTransferStatus], [LeaveBalanceAtExit], [GratuityEligible], [FinalSettlementStatus], [OfficialEmailDisableDate], [ApplicationAccessRevokeStatus], [DetailedExitRemarks])
    SELECT @EmpPk, r.[SeparationType], r.[SeparationStatus], r.[ExitReason], r.[InitiationDate], r.[ResignationDate], r.[NoticeStartDate], r.[NoticeEndDate], r.[ProposedLastWorkingDay], r.[FinalLastWorkingDay], ISNULL(r.[RehireEligible], 0), r.[AttritionCategory], r.[ManagerClearanceStatus], r.[HrClearanceStatus], ISNULL(r.[ExitInterviewRequired], 0), r.[ExitInterviewStatus], ISNULL(r.[KnowledgeTransferRequired], 0), r.[KnowledgeTransferStatus], r.[LeaveBalanceAtExit], ISNULL(r.[GratuityEligible], 0), r.[FinalSettlementStatus], r.[OfficialEmailDisableDate], r.[ApplicationAccessRevokeStatus], r.[DetailedExitRemarks] FROM #Separation AS r;
    END

    SELECT @Id = Id FROM emp.Separation WHERE EmployeeId = @EmpPk;
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Separation and Exit saved successfully.';
END
GO

-- Assets and Compliance
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_assets
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    -- SystemAccess: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #SystemAccess FROM OPENJSON(@Json, '$.systemAccess') WITH (
        Id INT '$.id',
        [ApplicationOrSystemName] NVARCHAR(150) '$.applicationOrSystemName',
        [UsernameOrLoginId] NVARCHAR(100) '$.usernameOrLoginId',
        [RoleOrAccessProfile] NVARCHAR(100) '$.roleOrAccessProfile',
        [AccessStartDate] DATETIMEOFFSET '$.accessStartDate',
        [AccessEndDate] DATETIMEOFFSET '$.accessEndDate',
        [AccountStatus] NVARCHAR(50) '$.accountStatus',
        [PasswordSetupRequired] BIT '$.passwordSetupRequired',
        [TemporaryPasswordIssuedFlag] BIT '$.temporaryPasswordIssuedFlag',
        [PasswordResetRequired] BIT '$.passwordResetRequired',
        [MfaEnabled] BIT '$.mfaEnabled',
        [LastLogin] DATETIMEOFFSET '$.lastLogin',
        [AccessApprovalReference] NVARCHAR(100) '$.accessApprovalReference'
    ) AS j;

    UPDATE emp.SystemAccess SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #SystemAccess WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[ApplicationOrSystemName] = r.[ApplicationOrSystemName],
            t.[UsernameOrLoginId] = r.[UsernameOrLoginId],
            t.[RoleOrAccessProfile] = r.[RoleOrAccessProfile],
            t.[AccessStartDate] = r.[AccessStartDate],
            t.[AccessEndDate] = r.[AccessEndDate],
            t.[AccountStatus] = r.[AccountStatus],
            t.[PasswordSetupRequired] = ISNULL(r.[PasswordSetupRequired], 0),
            t.[TemporaryPasswordIssuedFlag] = ISNULL(r.[TemporaryPasswordIssuedFlag], 0),
            t.[PasswordResetRequired] = ISNULL(r.[PasswordResetRequired], 0),
            t.[MfaEnabled] = ISNULL(r.[MfaEnabled], 0),
            t.[LastLogin] = r.[LastLogin],
            t.[AccessApprovalReference] = r.[AccessApprovalReference],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.SystemAccess AS t JOIN #SystemAccess AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccessEndDate], [AccountStatus], [PasswordSetupRequired], [TemporaryPasswordIssuedFlag], [PasswordResetRequired], [MfaEnabled], [LastLogin], [AccessApprovalReference])
    SELECT @EmpPk, r.[ApplicationOrSystemName], r.[UsernameOrLoginId], r.[RoleOrAccessProfile], r.[AccessStartDate], r.[AccessEndDate], r.[AccountStatus], ISNULL(r.[PasswordSetupRequired], 0), ISNULL(r.[TemporaryPasswordIssuedFlag], 0), ISNULL(r.[PasswordResetRequired], 0), ISNULL(r.[MfaEnabled], 0), r.[LastLogin], r.[AccessApprovalReference]
    FROM #SystemAccess AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.SystemAccess AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- AssetAssignment: rows missing from the request are soft-deleted, rows with an id are updated, the rest inserted.
    SELECT * INTO #AssetAssignment FROM OPENJSON(@Json, '$.assets') WITH (
        Id INT '$.id',
        [AssetAssignmentId] NVARCHAR(50) '$.assetAssignmentId',
        [AssetType] NVARCHAR(50) '$.assetType',
        [AssetCategory] NVARCHAR(50) '$.assetCategory',
        [AssetName] NVARCHAR(150) '$.assetName',
        [AssetSerialNumber] NVARCHAR(100) '$.assetSerialNumber',
        [MakeBrand] NVARCHAR(100) '$.makeBrand',
        [Model] NVARCHAR(100) '$.model',
        [ConfigurationDetails] NVARCHAR(1000) '$.configurationDetails',
        [TagNumber] NVARCHAR(100) '$.tagNumber',
        [OwnershipType] NVARCHAR(50) '$.ownershipType',
        [IssuedDate] DATETIMEOFFSET '$.issuedDate',
        [IssuedBy] NVARCHAR(150) '$.issuedBy',
        [IssueLocation] NVARCHAR(150) '$.issueLocation',
        [EmployeeAcknowledgement] BIT '$.employeeAcknowledgement',
        [AcknowledgementDate] DATETIMEOFFSET '$.acknowledgementDate',
        [AssetConditionAtIssue] NVARCHAR(50) '$.assetConditionAtIssue',
        [WarrantyStartDate] DATETIMEOFFSET '$.warrantyStartDate',
        [WarrantyEndDate] DATETIMEOFFSET '$.warrantyEndDate',
        [InsuranceCovered] BIT '$.insuranceCovered',
        [AssetValue] DECIMAL(18,2) '$.assetValue',
        [SecurityDepositApplicable] BIT '$.securityDepositApplicable',
        [DepositAmount] DECIMAL(18,2) '$.depositAmount',
        [AssetRemarks] NVARCHAR(500) '$.assetRemarks'
    ) AS j;

    UPDATE emp.AssetAssignment SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
      AND Id NOT IN (SELECT Id FROM #AssetAssignment WHERE Id IS NOT NULL);

    UPDATE t SET
            t.[AssetAssignmentId] = r.[AssetAssignmentId],
            t.[AssetType] = r.[AssetType],
            t.[AssetCategory] = r.[AssetCategory],
            t.[AssetName] = r.[AssetName],
            t.[AssetSerialNumber] = r.[AssetSerialNumber],
            t.[MakeBrand] = r.[MakeBrand],
            t.[Model] = r.[Model],
            t.[ConfigurationDetails] = r.[ConfigurationDetails],
            t.[TagNumber] = r.[TagNumber],
            t.[OwnershipType] = r.[OwnershipType],
            t.[IssuedDate] = r.[IssuedDate],
            t.[IssuedBy] = r.[IssuedBy],
            t.[IssueLocation] = r.[IssueLocation],
            t.[EmployeeAcknowledgement] = ISNULL(r.[EmployeeAcknowledgement], 0),
            t.[AcknowledgementDate] = r.[AcknowledgementDate],
            t.[AssetConditionAtIssue] = r.[AssetConditionAtIssue],
            t.[WarrantyStartDate] = r.[WarrantyStartDate],
            t.[WarrantyEndDate] = r.[WarrantyEndDate],
            t.[InsuranceCovered] = ISNULL(r.[InsuranceCovered], 0),
            t.[AssetValue] = r.[AssetValue],
            t.[SecurityDepositApplicable] = ISNULL(r.[SecurityDepositApplicable], 0),
            t.[DepositAmount] = r.[DepositAmount],
            t.[AssetRemarks] = r.[AssetRemarks],
            t.IsDeleted = 0,
            t.UpdatedAt = SYSUTCDATETIME()
    FROM emp.AssetAssignment AS t JOIN #AssetAssignment AS r ON r.Id = t.Id
    WHERE t.EmployeeId = @EmpPk;

    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [ConfigurationDetails], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable], [DepositAmount], [AssetRemarks])
    SELECT @EmpPk, r.[AssetAssignmentId], r.[AssetType], r.[AssetCategory], r.[AssetName], r.[AssetSerialNumber], r.[MakeBrand], r.[Model], r.[ConfigurationDetails], r.[TagNumber], r.[OwnershipType], r.[IssuedDate], r.[IssuedBy], r.[IssueLocation], ISNULL(r.[EmployeeAcknowledgement], 0), r.[AcknowledgementDate], r.[AssetConditionAtIssue], r.[WarrantyStartDate], r.[WarrantyEndDate], ISNULL(r.[InsuranceCovered], 0), r.[AssetValue], ISNULL(r.[SecurityDepositApplicable], 0), r.[DepositAmount], r.[AssetRemarks]
    FROM #AssetAssignment AS r
    WHERE r.Id IS NULL OR r.Id = 0
       OR NOT EXISTS (SELECT 1 FROM emp.AssetAssignment AS x WHERE x.Id = r.Id AND x.EmployeeId = @EmpPk);

    -- Server-generated asset assignment ids, e.g. AST000001.
    UPDATE emp.AssetAssignment SET AssetAssignmentId = CONCAT('AST', FORMAT(Id, '000000'))
    WHERE EmployeeId = @EmpPk AND AssetAssignmentId IS NULL;
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Assets and Compliance saved successfully.';
END
GO

-- Change Requests and Audit
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_change_requests_audit
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,   -- kept for the API contract; saves are upserts
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    BEGIN TRANSACTION;
    SELECT * INTO #ChangeRequestAudit FROM OPENJSON(@Json) WITH (
        [ChangeRequestType] NVARCHAR(100) '$.changeRequestType',
        [RequestedBy] NVARCHAR(100) '$.requestedBy',
        [AuditReference] NVARCHAR(100) '$.auditReference',
        [AuditRemarks] NVARCHAR(1000) '$.auditRemarks'
    ) AS j;

    IF ISNULL(@Id, 0) > 0
    BEGIN
        UPDATE t SET
            t.[ChangeRequestType] = r.[ChangeRequestType],
        t.[RequestedBy] = r.[RequestedBy],
        t.[AuditReference] = r.[AuditReference],
        t.[AuditRemarks] = r.[AuditRemarks],
            t.UpdatedAt = SYSUTCDATETIME()
        FROM emp.ChangeRequestAudit AS t CROSS JOIN #ChangeRequestAudit AS r
        WHERE t.Id = @Id AND t.EmployeeId = @EmpPk;
        IF @@ROWCOUNT = 0 THROW 50003, 'Record not found for this employee.', 1;
    END
    ELSE
    BEGIN
        INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks])
        SELECT @EmpPk, r.[ChangeRequestType], r.[RequestedBy], r.[AuditReference], r.[AuditRemarks] FROM #ChangeRequestAudit AS r;
        SET @Id = SCOPE_IDENTITY();
    END
    COMMIT TRANSACTION;
    SET @ResultMessage = 'Change Requests and Audit saved successfully.';
END
GO

-- Employee Documents: numbers + files, one row per document type.
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_documents
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    SELECT d.DocumentType, d.DocumentNumber, d.Payload
    INTO #Docs
    FROM OPENJSON(@Json) WITH (
        EmployeePhoto             NVARCHAR(MAX) '$.employeePhoto',
        EmployeePanNumber         NVARCHAR(50)  '$.employeePanNumber',
        EmployeePan               NVARCHAR(MAX) '$.employeePan',
        EmployeeAadhaarNumber     NVARCHAR(50)  '$.employeeAadhaarNumber',
        EmployeeAadhaar           NVARCHAR(MAX) '$.employeeAadhaar',
        EmployeePassportNumber    NVARCHAR(50)  '$.employeePassportNumber',
        EmployeePassport          NVARCHAR(MAX) '$.employeePassport',
        Last6MonthsBankStatements NVARCHAR(MAX) '$.last6MonthsBankStatements',
        Last3MonthsPayslips       NVARCHAR(MAX) '$.last3MonthsPayslips',
        ExperienceLetter          NVARCHAR(MAX) '$.experienceLetter',
        RelievingLetter           NVARCHAR(MAX) '$.relievingLetter',
        OfferLetter               NVARCHAR(MAX) '$.offerLetter'
    ) AS j
    CROSS APPLY (VALUES
        ('PHOTO',              CAST(NULL AS NVARCHAR(50)), j.EmployeePhoto),
        ('PAN',                j.EmployeePanNumber,        j.EmployeePan),
        ('AADHAAR',            j.EmployeeAadhaarNumber,    j.EmployeeAadhaar),
        ('PASSPORT',           j.EmployeePassportNumber,   j.EmployeePassport),
        ('BANK_STATEMENTS_6M', NULL,                       j.Last6MonthsBankStatements),
        ('PAYSLIPS_3M',        NULL,                       j.Last3MonthsPayslips),
        ('EXPERIENCE_LETTER',  NULL,                       j.ExperienceLetter),
        ('RELIEVING_LETTER',   NULL,                       j.RelievingLetter),
        ('OFFER_LETTER',       NULL,                       j.OfferLetter)
    ) AS d (DocumentType, DocumentNumber, Payload)
    WHERE d.Payload IS NOT NULL OR d.DocumentNumber IS NOT NULL;

    BEGIN TRANSACTION;

    UPDATE t SET
        t.DocumentNumber = COALESCE(d.DocumentNumber, t.DocumentNumber),
        t.ContentType    = COALESCE(dbo.fn_data_uri_content_type(d.Payload), t.ContentType),
        t.FileContent    = COALESCE(dbo.fn_base64_to_varbinary(d.Payload), t.FileContent),
        t.FileSizeBytes  = COALESCE(DATALENGTH(dbo.fn_base64_to_varbinary(d.Payload)), t.FileSizeBytes),
        t.UpdatedAt      = SYSUTCDATETIME()
    FROM emp.EmployeeDocument AS t
    JOIN #Docs AS d ON d.DocumentType = t.DocumentType
    WHERE t.EmployeeId = @EmpPk AND t.IsDeleted = 0;

    INSERT emp.EmployeeDocument (EmployeeId, DocumentType, DocumentNumber, ContentType, FileSizeBytes, FileContent)
    SELECT @EmpPk, d.DocumentType, d.DocumentNumber,
           dbo.fn_data_uri_content_type(d.Payload),
           DATALENGTH(dbo.fn_base64_to_varbinary(d.Payload)),
           dbo.fn_base64_to_varbinary(d.Payload)
    FROM #Docs AS d
    WHERE NOT EXISTS (SELECT 1 FROM emp.EmployeeDocument AS x
                      WHERE x.EmployeeId = @EmpPk AND x.DocumentType = d.DocumentType AND x.IsDeleted = 0);

    -- Keep the profile photo in sync with the PHOTO document.
    UPDATE e SET e.EmployeePhoto = d.FileContent, e.UpdatedAt = SYSUTCDATETIME()
    FROM emp.Employee AS e
    JOIN emp.EmployeeDocument AS d ON d.EmployeeId = e.Id AND d.DocumentType = 'PHOTO' AND d.IsDeleted = 0
    WHERE e.Id = @EmpPk AND EXISTS (SELECT 1 FROM #Docs WHERE DocumentType = 'PHOTO' AND Payload IS NOT NULL);

    COMMIT TRANSACTION;

    SELECT @Id = MIN(Id) FROM emp.EmployeeDocument WHERE EmployeeId = @EmpPk AND IsDeleted = 0;
    SET @ResultMessage = 'Employee documents saved successfully.';
END
GO

-- System Access: temporary login (password already hashed by the API).
CREATE OR ALTER PROCEDURE dbo.sp_save_emp_temp_login
    @Id            INT           = NULL OUTPUT,
    @Employee_Id   VARCHAR(50),
    @OperationType VARCHAR(10)   = NULL,
    @Json          NVARCHAR(MAX),
    @ResultMessage VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found. Save Personal Information first.', 1;
    IF ISJSON(@Json) = 0 THROW 50002, 'Request body is not valid JSON.', 1;

    DECLARE @Username NVARCHAR(50), @PasswordHash NVARCHAR(256);
    SELECT @Username = j.Username, @PasswordHash = j.PasswordHash
    FROM OPENJSON(@Json) WITH (
        Username     NVARCHAR(50)  '$.temporaryUsername',
        PasswordHash NVARCHAR(256) '$.temporaryPassword'
    ) AS j;

    IF EXISTS (SELECT 1 FROM sec.UserLogin WHERE Username = @Username AND EmployeeId <> @EmpPk)
        THROW 50004, 'This username is already taken.', 1;

    IF EXISTS (SELECT 1 FROM sec.UserLogin WHERE EmployeeId = @EmpPk)
        UPDATE sec.UserLogin SET
            Username = @Username, PasswordHash = @PasswordHash,
            IsTemporary = 1, MustChangePassword = 1, FailedAttempts = 0, IsLocked = 0, IsDeleted = 0,
            UpdatedAt = SYSUTCDATETIME()
        WHERE EmployeeId = @EmpPk;
    ELSE
        INSERT sec.UserLogin (EmployeeId, Username, PasswordHash) VALUES (@EmpPk, @Username, @PasswordHash);

    SELECT @Id = Id FROM sec.UserLogin WHERE EmployeeId = @EmpPk;
    SET @ResultMessage = 'Temporary login saved successfully.';
END
GO

-- ---------------------------------------------------------------------
-- 7. Fetch procedures
-- ---------------------------------------------------------------------
-- Personal Information (photo returned as base64).
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_personal_info
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, EmployeeCode AS EmployeeId, Salutation, FirstName, MiddleName, LastName, PreferredName,
           DateOfBirth, DateOfJoining, Gender, MaritalStatus, BloodGroup, Nationality, PlaceOfBirth,
           Religion, Category, dbo.fn_varbinary_to_base64(EmployeePhoto) AS EmployeePhoto,
           EmployeeStatus, FullName
    FROM emp.Employee
    WHERE EmployeeCode = @Employee_Id AND IsDeleted = 0;

    IF @@ROWCOUNT = 0 THROW 50001, 'Employee not found.', 1;
END
GO

-- Employee Documents: metadata only. Use sp_get_emp_document_file for the bytes.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_documents
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, DocumentType, DocumentNumber, ContentType, FileSizeBytes,
           COALESCE(UpdatedAt, CreatedAt) AS UploadedAt
    FROM emp.EmployeeDocument
    WHERE EmployeeId = @EmpPk AND IsDeleted = 0
    ORDER BY DocumentType;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_get_emp_document_file
    @Employee_Id  VARCHAR(50),
    @DocumentType VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT d.DocumentType, d.ContentType, d.FileSizeBytes, d.FileContent
    FROM emp.EmployeeDocument AS d
    WHERE d.EmployeeId = dbo.fn_employee_pk(@Employee_Id) AND d.DocumentType = @DocumentType AND d.IsDeleted = 0;
END
GO

-- System Access: never returns the password hash.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_temp_login
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT l.Id, @Employee_Id AS EmployeeId, l.Username AS TemporaryUsername,
           l.IsTemporary, l.MustChangePassword, l.IsLocked, l.LastLoginAt
    FROM sec.UserLogin AS l
    WHERE l.EmployeeId = dbo.fn_employee_pk(@Employee_Id) AND l.IsDeleted = 0;
END
GO

-- Employee list with search + paging (TotalCount on every row).
CREATE OR ALTER PROCEDURE dbo.sp_get_employee_list
    @Search         NVARCHAR(100) = NULL,
    @EmployeeStatus NVARCHAR(30)  = NULL,
    @Department     NVARCHAR(30)  = NULL,
    @Page           INT           = 1,
    @PageSize       INT           = 20
AS
BEGIN
    SET NOCOUNT ON;
    SET @Page = IIF(@Page < 1, 1, @Page);
    SET @PageSize = IIF(@PageSize NOT BETWEEN 1 AND 200, 20, @PageSize);

    SELECT e.Id, e.EmployeeCode AS EmployeeId, e.FullName, e.EmployeeStatus, e.DateOfJoining,
           j.Department, j.Designation, j.WorkLocation, j.ReportingManager,
           COALESCE(j.OfficeEmail, c.OfficialEmail, c.PersonalMail) AS Email, c.MobileNumber,
           COUNT(*) OVER () AS TotalCount
    FROM emp.Employee AS e
    LEFT JOIN emp.EmploymentDetail AS j ON j.EmployeeId = e.Id AND j.IsDeleted = 0
    LEFT JOIN emp.ContactInfo AS c ON c.EmployeeId = e.Id AND c.IsDeleted = 0
    WHERE e.IsDeleted = 0
      AND (@EmployeeStatus IS NULL OR e.EmployeeStatus = @EmployeeStatus)
      AND (@Department IS NULL OR j.Department = @Department)
      AND (@Search IS NULL
           OR e.EmployeeCode LIKE CONCAT('%', @Search, '%')
           OR e.FullName LIKE CONCAT('%', @Search, '%')
           OR j.OfficeEmail LIKE CONCAT('%', @Search, '%')
           OR c.MobileNumber LIKE CONCAT('%', @Search, '%'))
    ORDER BY e.Id DESC
    OFFSET (@Page - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY;
END
GO

-- Wizard progress: which Add Employee sections already have data.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_onboarding_progress
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @E INT = dbo.fn_employee_pk(@Employee_Id);
    IF @E IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT 1 AS StepNo, 'personal-info' AS Step, CAST(1 AS BIT) AS IsCompleted
    UNION ALL
    SELECT 2 AS StepNo, 'contact-info' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.ContactInfo WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 3 AS StepNo, 'family-details' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.FamilyMember WHERE EmployeeId = @E AND IsDeleted = 0) OR EXISTS (SELECT 1 FROM emp.Dependent WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 4 AS StepNo, 'job-details' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.EmploymentDetail WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 5 AS StepNo, 'education-details' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.Education WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 6 AS StepNo, 'skills' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.Skill WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 7 AS StepNo, 'salary-structure' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.BankPayroll WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 8 AS StepNo, 'identity-statutory' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.StatutoryInfo WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 9 AS StepNo, 'work-experience' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.WorkExperience WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 10 AS StepNo, 'insurance-details' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.InsurancePolicy WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 11 AS StepNo, 'documents' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.EmployeeDocument WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 12 AS StepNo, 'temp-login' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM sec.UserLogin WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 13 AS StepNo, 'separation' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.Separation WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 14 AS StepNo, 'assets' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.AssetAssignment WHERE EmployeeId = @E AND IsDeleted = 0) OR EXISTS (SELECT 1 FROM emp.SystemAccess WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    UNION ALL
    SELECT 15 AS StepNo, 'change-requests-audit' AS Step, CAST(CASE WHEN EXISTS (SELECT 1 FROM emp.ChangeRequestAudit WHERE EmployeeId = @E AND IsDeleted = 0) THEN 1 ELSE 0 END AS BIT) AS IsCompleted
    ORDER BY StepNo;
END
GO

-- Dropdown values. NULL = every type.
CREATE OR ALTER PROCEDURE dbo.sp_get_lookups
    @LookupType VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT LookupType, Code AS [Value], Label, SortOrder
    FROM ref.LookupValue
    WHERE IsActive = 1 AND (@LookupType IS NULL OR LookupType = @LookupType)
    ORDER BY LookupType, SortOrder, Label;
END
GO

-- Soft delete an employee (all section data stays for audit).
CREATE OR ALTER PROCEDURE dbo.sp_delete_employee
    @Employee_Id   VARCHAR(50),
    @ResultMessage VARCHAR(200) = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE emp.Employee SET IsDeleted = 1, EmployeeStatus = N'Deleted', UpdatedAt = SYSUTCDATETIME()
    WHERE EmployeeCode = @Employee_Id AND IsDeleted = 0;

    IF @@ROWCOUNT = 0 THROW 50001, 'Employee not found.', 1;
    SET @ResultMessage = 'Employee deleted successfully.';
END
GO

-- Contact Details: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_contact_info
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [PersonalMail], [AlternateMail], [MobileNumber], [AlternateMobile], [LandlineNumber], [OfficialEmail], [LinkedinUrl]
    FROM emp.ContactInfo WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [AddressType], [HouseNumber], [StreetName], [Landmark], [Colony], [Area], [EffectiveFrom], [EffectiveTo], [AddressProofLink], [City], [District], [StateProvince], [Country], [Pincode], [CheckToggle]
    FROM emp.Address WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyAlternateNumber], [EmergencyEmail], [Remarks], [EmergencyAddress], [PriorityOrder], [PrimaryEmergencyContact]
    FROM emp.EmergencyContact WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Family and Dependents: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_family_details
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberMaritalStatus], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [MemberNotes], [MemberEmail], [AddressSameAsEmployee]
    FROM emp.FamilyMember WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [DependentName], [DependentRelationship], [DependentDateOfBirth], [DependentGender], [FinanciallyDependent], [StudentStatus], [DisabilityStatus], [DependencyStartDate], [EligibleForBenefits], [DependentRemarks], [LinkedFamilyRecord], [MonthlyIncomeOrPension], [DependencyEndDate], [ProofDocumentLink]
    FROM emp.Dependent WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Employment Details: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_job_details
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT d.Id, @Employee_Id AS EmployeeId, e.DateOfJoining, d.[OfficeEmail], d.[EmploymentStatus], d.[EmployeeType], d.[Department], d.[BusinessUnit], d.[Designation], d.[PayLevel], d.[WorkLocation], d.[ReportingManager], d.[DottedLineManager], d.[ShiftTimings], d.[WorkSchedule], d.[ProbationStartDate], d.[ProbationEndDate], d.[ConfirmationDate], d.[CostCenter], d.[EmployeeCategory], d.[HrOwner]
    FROM emp.EmploymentDetail AS d JOIN emp.Employee AS e ON e.Id = d.EmployeeId
    WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0;
END
GO

-- Education Details: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_education_details
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag], [EducationDocumentLink]
    FROM emp.Education WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [CertificationName], [IssuingOrganization], [CredentialId], [IssueDate], [ValidFrom], [ValidTo], [CertificationScoreOrGrade], [VerificationUrl], [AttachmentLink], [ActiveExpiredStatus]
    FROM emp.Certification WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Skills and Competencies: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_skills
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [LinkedCertification], [PrimarySkill], [Remarks]
    FROM emp.Skill WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Compensation, Payroll and Bank: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_salary_structure
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [MicrNumber], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom], [BankProofLink], [BankAddress]
    FROM emp.BankPayroll WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Identity and Statutory: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_identity_statutory
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber], [EsiNumber]
    FROM emp.StatutoryInfo WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [PlaceOfIssue], [IssueDate], [ValidFrom], [ValidTo], [VerificationStatus], [VerifiedBy], [FrontAttachLink], [BackAttachLink], [IdentificationDocumentRemarks]
    FROM emp.IdentityDocument WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [GenericDocumentCategory], [GenericDocumentName], [GenericRelatedSection], [GenericRelatedRecordId], [GenericFileUpload], [GenericUploadDate], [GenericValidFrom], [GenericValidTo], [GenericVerificationStatus], [GenericVerifiedBy], [GenericRemarks]
    FROM emp.RepositoryDocument WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Previous Employment: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_work_experience
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [EmployerName], [EmployerLocation], [Designation], [EmploymentType], [StartDate], [EndDate], [TotalExperience], [PreviousEmployerPfAccountNumber], [ManagerName], [LastDrawnSalary], [ReasonForLeaving], [SkillsUsed], [ExperienceLetterLink], [RelievingLetterLink], [PayslipLink]
    FROM emp.WorkExperience WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Insurance and Benefits: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_insurance_details
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [InsuranceRemarks], [CoveredMemberName], [CoveredMemberRelationship], [SumInsuredAllocation], [MemberCoverageFrom], [MemberCoverageTo], [LinkedFamilyOrDependentRecord], [InsuranceCardProofLink], [CoveredUnderPolicy]
    FROM emp.InsurancePolicy WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [NomineeContactNumber], [SharePercentage], [NomineePriority], [NomineeEffectiveFrom], [NomineeEffectiveTo], [MinorFlag], [GuardianName], [NomineeActive], [NomineeBankName], [NomineeAccountNumber], [NomineeIfscCode], [NomineeAadhaarNumber], [NomineePanNumber], [LinkedFamilyOrDependentRecord], [ProofDocumentLink], [Address]
    FROM emp.Nominee WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Separation and Exit: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_separation
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [SeparationType], [SeparationStatus], [ExitReason], [InitiationDate], [ResignationDate], [NoticeStartDate], [NoticeEndDate], [ProposedLastWorkingDay], [FinalLastWorkingDay], [RehireEligible], [AttritionCategory], [ManagerClearanceStatus], [HrClearanceStatus], [ExitInterviewRequired], [ExitInterviewStatus], [KnowledgeTransferRequired], [KnowledgeTransferStatus], [LeaveBalanceAtExit], [GratuityEligible], [FinalSettlementStatus], [OfficialEmailDisableDate], [ApplicationAccessRevokeStatus], [DetailedExitRemarks]
    FROM emp.Separation WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Assets and Compliance: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_assets
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccessEndDate], [AccountStatus], [PasswordSetupRequired], [TemporaryPasswordIssuedFlag], [PasswordResetRequired], [MfaEnabled], [LastLogin], [AccessApprovalReference]
    FROM emp.SystemAccess WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;

    SELECT Id, @Employee_Id AS EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [ConfigurationDetails], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable], [DepositAmount], [AssetRemarks]
    FROM emp.AssetAssignment WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- Change Requests and Audit: one result set per table, columns match the API contract.
CREATE OR ALTER PROCEDURE dbo.sp_get_emp_change_requests_audit
    @Employee_Id VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50001, 'Employee not found.', 1;

    SELECT Id, @Employee_Id AS EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]
    FROM emp.ChangeRequestAudit WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id;
END
GO

-- ---------------------------------------------------------------------
-- 8. Reference + dummy data (only into an empty database)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM org.Organization)
BEGIN
    SET IDENTITY_INSERT org.Organization ON;
    INSERT org.Organization (Id, Code, [Name], Country, TimeZone) VALUES (1, 'OR', N'Open Rainbow', N'India', 'India Standard Time');
    SET IDENTITY_INSERT org.Organization OFF;
END
GO

IF NOT EXISTS (SELECT 1 FROM ref.LookupValue)
BEGIN
    INSERT ref.LookupValue (LookupType, Code, Label, SortOrder) VALUES
    ('Salutation', N'Mr', N'Mr', 1),
    ('Salutation', N'Ms', N'Ms', 2),
    ('Salutation', N'Mrs', N'Mrs', 3),
    ('Salutation', N'Dr', N'Dr', 4),
    ('Salutation', N'Prof', N'Prof', 5),
    ('Gender', N'Male', N'Male', 1),
    ('Gender', N'Female', N'Female', 2),
    ('Gender', N'Other', N'Other', 3),
    ('Gender', N'Prefer not to say', N'Prefer not to say', 4),
    ('MaritalStatus', N'Single', N'Single', 1),
    ('MaritalStatus', N'Married', N'Married', 2),
    ('MaritalStatus', N'Divorced', N'Divorced', 3),
    ('MaritalStatus', N'Widowed', N'Widowed', 4),
    ('BloodGroup', N'A+', N'A+', 1),
    ('BloodGroup', N'A-', N'A-', 2),
    ('BloodGroup', N'B+', N'B+', 3),
    ('BloodGroup', N'B-', N'B-', 4),
    ('BloodGroup', N'AB+', N'AB+', 5),
    ('BloodGroup', N'AB-', N'AB-', 6),
    ('BloodGroup', N'O+', N'O+', 7),
    ('BloodGroup', N'O-', N'O-', 8),
    ('Nationality', N'Indian', N'Indian', 1),
    ('Nationality', N'Bulgarian', N'Bulgarian', 2),
    ('Nationality', N'American', N'American', 3),
    ('Nationality', N'British', N'British', 4),
    ('Nationality', N'Other', N'Other', 5),
    ('Country', N'India', N'India', 1),
    ('Country', N'Bulgaria', N'Bulgaria', 2),
    ('Country', N'United States', N'United States', 3),
    ('Country', N'United Kingdom', N'United Kingdom', 4),
    ('Category', N'General', N'General', 1),
    ('Category', N'OBC', N'OBC', 2),
    ('Category', N'SC', N'SC', 3),
    ('Category', N'ST', N'ST', 4),
    ('Category', N'EWS', N'EWS', 5),
    ('Religion', N'Hindu', N'Hindu', 1),
    ('Religion', N'Muslim', N'Muslim', 2),
    ('Religion', N'Christian', N'Christian', 3),
    ('Religion', N'Sikh', N'Sikh', 4),
    ('Religion', N'Buddhist', N'Buddhist', 5),
    ('Religion', N'Jain', N'Jain', 6),
    ('Religion', N'Other', N'Other', 7),
    ('Relationship', N'Father', N'Father', 1),
    ('Relationship', N'Mother', N'Mother', 2),
    ('Relationship', N'Spouse', N'Spouse', 3),
    ('Relationship', N'Son', N'Son', 4),
    ('Relationship', N'Daughter', N'Daughter', 5),
    ('Relationship', N'Brother', N'Brother', 6),
    ('Relationship', N'Sister', N'Sister', 7),
    ('Relationship', N'Friend', N'Friend', 8),
    ('Relationship', N'Other', N'Other', 9),
    ('AddressType', N'Current', N'Current', 1),
    ('AddressType', N'Permanent', N'Permanent', 2),
    ('AddressType', N'Office', N'Office', 3),
    ('AddressType', N'Other', N'Other', 4),
    ('Department', N'Engineering', N'Engineering', 1),
    ('Department', N'HR', N'HR', 2),
    ('Department', N'Finance', N'Finance', 3),
    ('Department', N'Sales', N'Sales', 4),
    ('Department', N'Support', N'Support', 5),
    ('Department', N'Operations', N'Operations', 6),
    ('BusinessUnit', N'Product', N'Product', 1),
    ('BusinessUnit', N'Services', N'Services', 2),
    ('BusinessUnit', N'Corporate', N'Corporate', 3),
    ('EmployeeType', N'Full Time', N'Full Time', 1),
    ('EmployeeType', N'Part Time', N'Part Time', 2),
    ('EmployeeType', N'Contract', N'Contract', 3),
    ('EmployeeType', N'Intern', N'Intern', 4),
    ('EmployeeCategory', N'Staff', N'Staff', 1),
    ('EmployeeCategory', N'Management', N'Management', 2),
    ('EmployeeCategory', N'Executive', N'Executive', 3),
    ('EmploymentStatus', N'Probation', N'Probation', 1),
    ('EmploymentStatus', N'Confirmed', N'Confirmed', 2),
    ('EmploymentStatus', N'Notice Period', N'Notice Period', 3),
    ('EmploymentStatus', N'Exited', N'Exited', 4),
    ('WorkLocation', N'Hyderabad', N'Hyderabad', 1),
    ('WorkLocation', N'Bengaluru', N'Bengaluru', 2),
    ('WorkLocation', N'Sofia', N'Sofia', 3),
    ('WorkLocation', N'Remote', N'Remote', 4),
    ('ShiftTimings', N'General (09:00-18:00)', N'General (09:00-18:00)', 1),
    ('ShiftTimings', N'Morning (06:00-15:00)', N'Morning (06:00-15:00)', 2),
    ('ShiftTimings', N'Night (21:00-06:00)', N'Night (21:00-06:00)', 3),
    ('WorkSchedule', N'5 Days', N'5 Days', 1),
    ('WorkSchedule', N'6 Days', N'6 Days', 2),
    ('WorkSchedule', N'Flexible', N'Flexible', 3),
    ('PayLevel', N'L1', N'L1', 1),
    ('PayLevel', N'L2', N'L2', 2),
    ('PayLevel', N'L3', N'L3', 3),
    ('PayLevel', N'L4', N'L4', 4),
    ('PayLevel', N'L5', N'L5', 5),
    ('CostCenter', N'CC-ENG', N'CC-ENG', 1),
    ('CostCenter', N'CC-HR', N'CC-HR', 2),
    ('CostCenter', N'CC-FIN', N'CC-FIN', 3),
    ('CostCenter', N'CC-SAL', N'CC-SAL', 4),
    ('QualificationLevel', N'10th', N'10th', 1),
    ('QualificationLevel', N'12th', N'12th', 2),
    ('QualificationLevel', N'Diploma', N'Diploma', 3),
    ('QualificationLevel', N'Bachelor', N'Bachelor', 4),
    ('QualificationLevel', N'Master', N'Master', 5),
    ('QualificationLevel', N'Doctorate', N'Doctorate', 6),
    ('ModeOfStudy', N'Full Time', N'Full Time', 1),
    ('ModeOfStudy', N'Part Time', N'Part Time', 2),
    ('ModeOfStudy', N'Distance', N'Distance', 3),
    ('SkillCategory', N'Technical', N'Technical', 1),
    ('SkillCategory', N'Soft Skill', N'Soft Skill', 2),
    ('SkillCategory', N'Domain', N'Domain', 3),
    ('SkillCategory', N'Tool', N'Tool', 4),
    ('ProficiencyLevel', N'Beginner', N'Beginner', 1),
    ('ProficiencyLevel', N'Intermediate', N'Intermediate', 2),
    ('ProficiencyLevel', N'Advanced', N'Advanced', 3),
    ('ProficiencyLevel', N'Expert', N'Expert', 4),
    ('AccountType', N'Savings', N'Savings', 1),
    ('AccountType', N'Current', N'Current', 2),
    ('AccountType', N'Salary', N'Salary', 3),
    ('SalaryPaymentMode', N'Bank Transfer', N'Bank Transfer', 1),
    ('SalaryPaymentMode', N'Cheque', N'Cheque', 2),
    ('SalaryPaymentMode', N'Cash', N'Cash', 3),
    ('TaxRegime', N'Old', N'Old', 1),
    ('TaxRegime', N'New', N'New', 2),
    ('PayrollGroup', N'Monthly', N'Monthly', 1),
    ('PayrollGroup', N'Weekly', N'Weekly', 2),
    ('IdentityDocumentType', N'PAN', N'PAN', 1),
    ('IdentityDocumentType', N'Aadhaar', N'Aadhaar', 2),
    ('IdentityDocumentType', N'Passport', N'Passport', 3),
    ('IdentityDocumentType', N'Driving Licence', N'Driving Licence', 4),
    ('IdentityDocumentType', N'Voter ID', N'Voter ID', 5),
    ('VerificationStatus', N'Pending', N'Pending', 1),
    ('VerificationStatus', N'Verified', N'Verified', 2),
    ('VerificationStatus', N'Rejected', N'Rejected', 3),
    ('BenefitType', N'Health', N'Health', 1),
    ('BenefitType', N'Life', N'Life', 2),
    ('BenefitType', N'Accident', N'Accident', 3),
    ('BenefitType', N'Gratuity', N'Gratuity', 4),
    ('BenefitType', N'PF', N'PF', 5),
    ('PremiumSharingType', N'Employer Paid', N'Employer Paid', 1),
    ('PremiumSharingType', N'Employee Paid', N'Employee Paid', 2),
    ('PremiumSharingType', N'Shared', N'Shared', 3),
    ('PolicyStatus', N'Active', N'Active', 1),
    ('PolicyStatus', N'Expired', N'Expired', 2),
    ('PolicyStatus', N'Cancelled', N'Cancelled', 3),
    ('SeparationType', N'Resignation', N'Resignation', 1),
    ('SeparationType', N'Termination', N'Termination', 2),
    ('SeparationType', N'Retirement', N'Retirement', 3),
    ('SeparationType', N'Absconding', N'Absconding', 4),
    ('SeparationType', N'End of Contract', N'End of Contract', 5),
    ('SeparationStatus', N'Initiated', N'Initiated', 1),
    ('SeparationStatus', N'In Progress', N'In Progress', 2),
    ('SeparationStatus', N'Completed', N'Completed', 3),
    ('SeparationStatus', N'Withdrawn', N'Withdrawn', 4),
    ('ClearanceStatus', N'Pending', N'Pending', 1),
    ('ClearanceStatus', N'Cleared', N'Cleared', 2),
    ('ClearanceStatus', N'Not Applicable', N'Not Applicable', 3),
    ('AssetType', N'Laptop', N'Laptop', 1),
    ('AssetType', N'Desktop', N'Desktop', 2),
    ('AssetType', N'Monitor', N'Monitor', 3),
    ('AssetType', N'Mobile', N'Mobile', 4),
    ('AssetType', N'Access Card', N'Access Card', 5),
    ('AssetType', N'Headset', N'Headset', 6),
    ('AssetCategory', N'IT', N'IT', 1),
    ('AssetCategory', N'Facility', N'Facility', 2),
    ('AssetCategory', N'Other', N'Other', 3),
    ('AssetCondition', N'New', N'New', 1),
    ('AssetCondition', N'Good', N'Good', 2),
    ('AssetCondition', N'Fair', N'Fair', 3),
    ('AssetCondition', N'Damaged', N'Damaged', 4),
    ('OwnershipType', N'Company Owned', N'Company Owned', 1),
    ('OwnershipType', N'Leased', N'Leased', 2),
    ('OwnershipType', N'BYOD', N'BYOD', 3),
    ('AccountStatus', N'Active', N'Active', 1),
    ('AccountStatus', N'Disabled', N'Disabled', 2),
    ('AccountStatus', N'Locked', N'Locked', 3),
    ('EmploymentTypePrevious', N'Full Time', N'Full Time', 1),
    ('EmploymentTypePrevious', N'Part Time', N'Part Time', 2),
    ('EmploymentTypePrevious', N'Contract', N'Contract', 3),
    ('EmploymentTypePrevious', N'Internship', N'Internship', 4);
END
GO
IF NOT EXISTS (SELECT 1 FROM emp.Employee)
BEGIN
    INSERT emp.Employee (EmployeeCode, Salutation, FirstName, MiddleName, LastName, DateOfBirth, DateOfJoining, Gender, MaritalStatus, BloodGroup, Nationality, PlaceOfBirth, Religion, Category, EmployeeStatus) VALUES
    ('EMP00001', N'Mr', N'Venkat', NULL, N'Jangili', '1995-05-10', '2021-06-01', N'Male', N'Married', N'O+', N'Indian', N'Hyderabad', N'Hindu', N'General', N'Active'),
    ('EMP00002', N'Ms', N'Polly', NULL, N'Polineni', '1998-11-21', '2023-02-15', N'Female', N'Single', N'A+', N'Indian', N'Vijayawada', N'Hindu', N'General', N'Active'),
    ('EMP00003', N'Mr', N'Ethan', NULL, N'Sarvigari', '1999-03-02', '2024-07-01', N'Male', N'Single', N'B+', N'Indian', N'Guntur', N'Christian', N'OBC', N'Active'),
    ('EMP00004', N'Mrs', N'Dharani', NULL, N'Vedantham', '1990-08-14', '2019-01-07', N'Female', N'Married', N'AB+', N'Indian', N'Chennai', N'Hindu', N'General', N'Active'),
    ('EMP00005', N'Mr', N'Gani', N'Kumar', N'Pradhan', '1996-12-30', '2022-09-12', N'Male', N'Single', N'O-', N'Indian', N'Bhubaneswar', N'Hindu', N'General', N'Notice Period');

    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], [LinkedinUrl]) SELECT Id, N'venkat.jangili@gmail.com', N'9876500001', N'venkat.jangili@openrainbow.com', N'https://linkedin.com/in/venkat-jangili' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Area], [City], [District], [StateProvince], [Country], [Pincode], [EffectiveFrom], [CheckToggle]) SELECT Id, N'Current', N'101-A', N'Road No. 1', N'Madhapur', N'Hyderabad', N'Hyderabad', N'Telangana', N'India', N'500081', N'2021-06-01', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [City], [District], [StateProvince], [Country], [Pincode], [CheckToggle]) SELECT Id, N'Permanent', N'7-12', N'Temple Street', N'Nellore', N'Nellore', N'Andhra Pradesh', N'India', N'524001', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyEmail], [PriorityOrder], [PrimaryEmergencyContact]) SELECT Id, N'Ramesh Jangili', N'9848000001', N'Father', NULL, 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [CostCenter], [EmployeeCategory], [HrOwner]) SELECT Id, N'venkat.jangili@openrainbow.com', N'Confirmed', N'Full Time', N'Engineering', N'Product', N'Web Developer', N'L3', N'Hyderabad', N'EMP00004', N'General (09:00-18:00)', N'5 Days', N'2021-06-01', N'CC-ENG', N'Staff', N'EMP00004' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag]) SELECT Id, N'Bachelor', N'B.Tech', N'Computer Science', N'JNTU College of Engineering', N'JNTU', N'Full Time', N'2013-07-01', N'2017-05-31', 2017, N'8.1', N'Yes' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'Angular', N'Technical', N'Advanced', 3, 2026, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'C#', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'SQL Server', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom]) SELECT Id, N'Monthly', N'Standard', N'G1', N'HDFC Bank', N'Venkat Jangili', N'50100123450001', N'Madhapur', N'HDFC0001234', N'Salary', N'Bank Transfer', N'New', N'2021-06-01' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber]) SELECT Id, N'ABCDE1231F', N'234567890001', N'100123450001', N'TS/HYD/12345/000/0000001' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [VerificationStatus]) SELECT Id, N'PAN', N'ABCDE1231F', N'Venkat Jangili', N'Income Tax Department', N'India', N'Verified' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [AddressSameAsEmployee]) SELECT Id, N'Ramesh Jangili', N'Father', N'Male', N'1965-01-15', N'Retired', N'9848000001', 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Dependent (EmployeeId, [DependentName], [DependentRelationship], [DependentDateOfBirth], [DependentGender], [FinanciallyDependent], [EligibleForBenefits], [DependencyStartDate]) SELECT Id, N'Spouse of Venkat', N'Spouse', N'1994-04-04', N'Female', 1, 1, N'2021-06-01' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.WorkExperience (EmployeeId, [EmployerName], [EmployerLocation], [Designation], [EmploymentType], [StartDate], [EndDate], [TotalExperience], [ManagerName], [LastDrawnSalary], [ReasonForLeaving]) SELECT Id, N'Infosys', N'Hyderabad', N'Software Engineer', N'Full Time', N'2017-07-01', N'2021-05-28', 3.9, N'Suresh K', 650000, N'Career growth' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [CoveredUnderPolicy]) SELECT Id, N'Health', N'Star Health', N'SH-2026-0001', N'2026-04-01', N'2027-03-31', 1, N'Employer Paid', 500000, N'Active', 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [SharePercentage], [NomineePriority], [NomineeActive], [MinorFlag]) SELECT Id, N'Health', N'Ramesh Jangili', N'Father', N'1965-01-15', 100, 1, 1, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccountStatus], [PasswordSetupRequired], [MfaEnabled]) SELECT Id, N'PeopleHub', N'venkat.jangili', N'Employee', N'2021-06-01', N'Active', 0, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable]) SELECT Id, N'AST000001', N'Laptop', N'IT', N'Dell Latitude 5440', N'DL5440-0001', N'Dell', N'Latitude 5440', N'OR-IT-0001', N'Company Owned', N'2021-06-01', N'IT Desk', N'Hyderabad', 1, N'2021-06-01', N'New', N'2024-01-01', N'2027-01-01', 1, 85000, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]) SELECT Id, N'Onboarding', N'EMP00004', N'ONB-EMP00001', N'Created from seed data.' FROM emp.Employee WHERE EmployeeCode = 'EMP00001';
    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], [LinkedinUrl]) SELECT Id, N'polly.polineni@gmail.com', N'9876500002', N'polly.polineni@openrainbow.com', N'https://linkedin.com/in/polly-polineni' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Area], [City], [District], [StateProvince], [Country], [Pincode], [EffectiveFrom], [CheckToggle]) SELECT Id, N'Current', N'102-A', N'Road No. 2', N'Madhapur', N'Hyderabad', N'Hyderabad', N'Telangana', N'India', N'500032', N'2023-02-15', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyEmail], [PriorityOrder], [PrimaryEmergencyContact]) SELECT Id, N'Ramesh Polineni', N'9848000002', N'Father', NULL, 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [CostCenter], [EmployeeCategory], [HrOwner]) SELECT Id, N'polly.polineni@openrainbow.com', N'Confirmed', N'Full Time', N'Engineering', N'Product', N'Junior Web Developer', N'L4', N'Hyderabad', N'EMP00004', N'General (09:00-18:00)', N'5 Days', N'2023-02-15', N'CC-ENG', N'Staff', N'EMP00004' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag]) SELECT Id, N'Bachelor', N'B.Tech', N'Computer Science', N'JNTU College of Engineering', N'JNTU', N'Full Time', N'2016-07-01', N'2020-05-31', 2020, N'8.1', N'Yes' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'Angular', N'Technical', N'Advanced', 3, 2026, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'C#', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'SQL Server', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom]) SELECT Id, N'Monthly', N'Standard', N'G2', N'HDFC Bank', N'Polly Polineni', N'50100123450002', N'Madhapur', N'HDFC0001234', N'Salary', N'Bank Transfer', N'New', N'2023-02-15' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber]) SELECT Id, N'ABCDE1232F', N'234567890002', N'100123450002', N'TS/HYD/12345/000/0000002' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [VerificationStatus]) SELECT Id, N'PAN', N'ABCDE1232F', N'Polly Polineni', N'Income Tax Department', N'India', N'Verified' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [AddressSameAsEmployee]) SELECT Id, N'Ramesh Polineni', N'Father', N'Male', N'1965-01-15', N'Retired', N'9848000002', 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [CoveredUnderPolicy]) SELECT Id, N'Health', N'Star Health', N'SH-2026-0002', N'2026-04-01', N'2027-03-31', 1, N'Employer Paid', 500000, N'Active', 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [SharePercentage], [NomineePriority], [NomineeActive], [MinorFlag]) SELECT Id, N'Health', N'Ramesh Polineni', N'Father', N'1965-01-15', 100, 1, 1, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccountStatus], [PasswordSetupRequired], [MfaEnabled]) SELECT Id, N'PeopleHub', N'polly.polineni', N'Employee', N'2023-02-15', N'Active', 0, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable]) SELECT Id, N'AST000002', N'Laptop', N'IT', N'Dell Latitude 5440', N'DL5440-0002', N'Dell', N'Latitude 5440', N'OR-IT-0002', N'Company Owned', N'2023-02-15', N'IT Desk', N'Hyderabad', 1, N'2023-02-15', N'New', N'2024-01-01', N'2027-01-01', 1, 85000, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]) SELECT Id, N'Onboarding', N'EMP00004', N'ONB-EMP00002', N'Created from seed data.' FROM emp.Employee WHERE EmployeeCode = 'EMP00002';
    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], [LinkedinUrl]) SELECT Id, N'ethan.sarvigari@gmail.com', N'9876500003', N'ethan.sarvigari@openrainbow.com', N'https://linkedin.com/in/ethan-sarvigari' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Area], [City], [District], [StateProvince], [Country], [Pincode], [EffectiveFrom], [CheckToggle]) SELECT Id, N'Current', N'103-A', N'Road No. 3', N'Whitefield', N'Bengaluru', N'Bengaluru', N'Karnataka', N'India', N'560037', N'2024-07-01', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyEmail], [PriorityOrder], [PrimaryEmergencyContact]) SELECT Id, N'Ramesh Sarvigari', N'9848000003', N'Father', NULL, 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [CostCenter], [EmployeeCategory], [HrOwner]) SELECT Id, N'ethan.sarvigari@openrainbow.com', N'Probation', N'Full Time', N'Engineering', N'Product', N'Junior Web Developer', N'L2', N'Bengaluru', N'EMP00004', N'General (09:00-18:00)', N'5 Days', N'2024-07-01', N'CC-ENG', N'Staff', N'EMP00004' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag]) SELECT Id, N'Bachelor', N'B.Tech', N'Computer Science', N'JNTU College of Engineering', N'JNTU', N'Full Time', N'2017-07-01', N'2021-05-31', 2021, N'8.1', N'Yes' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'Angular', N'Technical', N'Advanced', 3, 2026, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'C#', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'SQL Server', N'Technical', N'Intermediate', 2, 2026, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom]) SELECT Id, N'Monthly', N'Standard', N'G3', N'HDFC Bank', N'Ethan Sarvigari', N'50100123450003', N'Madhapur', N'HDFC0001234', N'Salary', N'Bank Transfer', N'New', N'2024-07-01' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber]) SELECT Id, N'ABCDE1233F', N'234567890003', N'100123450003', N'TS/HYD/12345/000/0000003' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [VerificationStatus]) SELECT Id, N'PAN', N'ABCDE1233F', N'Ethan Sarvigari', N'Income Tax Department', N'India', N'Verified' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [AddressSameAsEmployee]) SELECT Id, N'Ramesh Sarvigari', N'Father', N'Male', N'1965-01-15', N'Retired', N'9848000003', 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [CoveredUnderPolicy]) SELECT Id, N'Health', N'Star Health', N'SH-2026-0003', N'2026-04-01', N'2027-03-31', 1, N'Employer Paid', 500000, N'Active', 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [SharePercentage], [NomineePriority], [NomineeActive], [MinorFlag]) SELECT Id, N'Health', N'Ramesh Sarvigari', N'Father', N'1965-01-15', 100, 1, 1, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccountStatus], [PasswordSetupRequired], [MfaEnabled]) SELECT Id, N'PeopleHub', N'ethan.sarvigari', N'Employee', N'2024-07-01', N'Active', 0, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable]) SELECT Id, N'AST000003', N'Laptop', N'IT', N'Dell Latitude 5440', N'DL5440-0003', N'Dell', N'Latitude 5440', N'OR-IT-0003', N'Company Owned', N'2024-07-01', N'IT Desk', N'Bengaluru', 1, N'2024-07-01', N'New', N'2024-01-01', N'2027-01-01', 1, 85000, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]) SELECT Id, N'Onboarding', N'EMP00004', N'ONB-EMP00003', N'Created from seed data.' FROM emp.Employee WHERE EmployeeCode = 'EMP00003';
    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], [LinkedinUrl]) SELECT Id, N'dharani.vedantham@gmail.com', N'9876500004', N'dharani.vedantham@openrainbow.com', N'https://linkedin.com/in/dharani-vedantham' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Area], [City], [District], [StateProvince], [Country], [Pincode], [EffectiveFrom], [CheckToggle]) SELECT Id, N'Current', N'104-A', N'Road No. 4', N'Madhapur', N'Hyderabad', N'Hyderabad', N'Telangana', N'India', N'500034', N'2019-01-07', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyEmail], [PriorityOrder], [PrimaryEmergencyContact]) SELECT Id, N'Ramesh Vedantham', N'9848000004', N'Father', NULL, 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [CostCenter], [EmployeeCategory], [HrOwner]) SELECT Id, N'dharani.vedantham@openrainbow.com', N'Confirmed', N'Full Time', N'HR', N'Product', N'HR Manager', N'L3', N'Hyderabad', N'EMP00001', N'General (09:00-18:00)', N'5 Days', N'2019-01-07', N'CC-HR', N'Staff', N'EMP00004' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag]) SELECT Id, N'Bachelor', N'B.Tech', N'Computer Science', N'JNTU College of Engineering', N'JNTU', N'Full Time', N'2008-07-01', N'2012-05-31', 2012, N'8.1', N'Yes' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'Excel', N'Technical', N'Advanced', 3, 2026, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom]) SELECT Id, N'Monthly', N'Standard', N'G4', N'HDFC Bank', N'Dharani Vedantham', N'50100123450004', N'Madhapur', N'HDFC0001234', N'Salary', N'Bank Transfer', N'New', N'2019-01-07' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber]) SELECT Id, N'ABCDE1234F', N'234567890004', N'100123450004', N'TS/HYD/12345/000/0000004' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [VerificationStatus]) SELECT Id, N'PAN', N'ABCDE1234F', N'Dharani Vedantham', N'Income Tax Department', N'India', N'Verified' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [AddressSameAsEmployee]) SELECT Id, N'Ramesh Vedantham', N'Father', N'Male', N'1965-01-15', N'Retired', N'9848000004', 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.Dependent (EmployeeId, [DependentName], [DependentRelationship], [DependentDateOfBirth], [DependentGender], [FinanciallyDependent], [EligibleForBenefits], [DependencyStartDate]) SELECT Id, N'Spouse of Dharani', N'Spouse', N'1994-04-04', N'Male', 1, 1, N'2019-01-07' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.WorkExperience (EmployeeId, [EmployerName], [EmployerLocation], [Designation], [EmploymentType], [StartDate], [EndDate], [TotalExperience], [ManagerName], [LastDrawnSalary], [ReasonForLeaving]) SELECT Id, N'Wipro', N'Hyderabad', N'HR Executive', N'Full Time', N'2013-06-01', N'2018-12-31', 5.6, N'Suresh K', 540000, N'Career growth' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [CoveredUnderPolicy]) SELECT Id, N'Health', N'Star Health', N'SH-2026-0004', N'2026-04-01', N'2027-03-31', 1, N'Employer Paid', 500000, N'Active', 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [SharePercentage], [NomineePriority], [NomineeActive], [MinorFlag]) SELECT Id, N'Health', N'Ramesh Vedantham', N'Father', N'1965-01-15', 100, 1, 1, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccountStatus], [PasswordSetupRequired], [MfaEnabled]) SELECT Id, N'PeopleHub', N'dharani.vedantham', N'HR Admin', N'2019-01-07', N'Active', 0, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable]) SELECT Id, N'AST000004', N'Laptop', N'IT', N'Dell Latitude 5440', N'DL5440-0004', N'Dell', N'Latitude 5440', N'OR-IT-0004', N'Company Owned', N'2019-01-07', N'IT Desk', N'Hyderabad', 1, N'2019-01-07', N'New', N'2024-01-01', N'2027-01-01', 1, 85000, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]) SELECT Id, N'Onboarding', N'EMP00004', N'ONB-EMP00004', N'Created from seed data.' FROM emp.Employee WHERE EmployeeCode = 'EMP00004';
    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], [LinkedinUrl]) SELECT Id, N'gani.pradhan@gmail.com', N'9876500005', N'gani.pradhan@openrainbow.com', N'https://linkedin.com/in/gani-pradhan' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.Address (EmployeeId, [AddressType], [HouseNumber], [StreetName], [Area], [City], [District], [StateProvince], [Country], [Pincode], [EffectiveFrom], [CheckToggle]) SELECT Id, N'Current', N'105-A', N'Road No. 5', N'Whitefield', N'Bengaluru', N'Bengaluru', N'Karnataka', N'India', N'560103', N'2022-09-12', 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.EmergencyContact (EmployeeId, [ContactName], [ContactNumber], [Relation], [EmergencyEmail], [PriorityOrder], [PrimaryEmergencyContact]) SELECT Id, N'Ramesh Pradhan', N'9848000005', N'Father', NULL, 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [ProbationStartDate], [CostCenter], [EmployeeCategory], [HrOwner]) SELECT Id, N'gani.pradhan@openrainbow.com', N'Notice Period', N'Full Time', N'Finance', N'Product', N'Accountant', N'L4', N'Bengaluru', N'EMP00004', N'General (09:00-18:00)', N'5 Days', N'2022-09-12', N'CC-HR', N'Staff', N'EMP00004' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.Education (EmployeeId, [QualificationLevel], [DegreeOrCourseName], [SpecializationOrMajor], [InstitutionOrCollegeName], [UniversityOrBoardName], [ModeOfStudy], [StartDate], [EndDate], [YearOfPassing], [GradePercentageOrCgpa], [HighestQualificationFlag]) SELECT Id, N'Bachelor', N'B.Tech', N'Computer Science', N'JNTU College of Engineering', N'JNTU', N'Full Time', N'2014-07-01', N'2018-05-31', 2018, N'8.1', N'Yes' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.Skill (EmployeeId, [SkillName], [SkillCategory], [ProficiencyLevel], [YearsOfExperience], [LastUsedYear], [PrimarySkill]) SELECT Id, N'Excel', N'Technical', N'Advanced', 3, 2026, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.BankPayroll (EmployeeId, [PayrollGroup], [SalaryStructurePlan], [PayGrade], [BankName], [AccountHolderName], [BankAccountNumber], [BranchName], [IfscCode], [AccountType], [SalaryPaymentMode], [TaxRegime], [PayrollEffectiveFrom]) SELECT Id, N'Monthly', N'Standard', N'G5', N'HDFC Bank', N'Gani Pradhan', N'50100123450005', N'Madhapur', N'HDFC0001234', N'Salary', N'Bank Transfer', N'New', N'2022-09-12' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.StatutoryInfo (EmployeeId, [PanNumber], [AadhaarNumber], [UanNumber], [PfAccountNumber]) SELECT Id, N'ABCDE1235F', N'234567890005', N'100123450005', N'TS/HYD/12345/000/0000005' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.IdentityDocument (EmployeeId, [DocumentType], [DocumentNumber], [NameOnDocument], [IssuingAuthority], [CountryOfIssue], [VerificationStatus]) SELECT Id, N'PAN', N'ABCDE1235F', N'Gani Pradhan', N'Income Tax Department', N'India', N'Verified' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.FamilyMember (EmployeeId, [MemberName], [MemberRelationship], [MemberGender], [MemberDateOfBirth], [MemberOccupation], [MemberContactNumber], [LivesWithEmployee], [AddressSameAsEmployee]) SELECT Id, N'Ramesh Pradhan', N'Father', N'Male', N'1965-01-15', N'Retired', N'9848000005', 1, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.InsurancePolicy (EmployeeId, [BenefitType], [ProviderName], [PolicyNumber], [CoverageStartDate], [CoverageEndDate], [EmployeeCovered], [PremiumSharingType], [CoverageAmount], [PolicyStatus], [CoveredUnderPolicy]) SELECT Id, N'Health', N'Star Health', N'SH-2026-0005', N'2026-04-01', N'2027-03-31', 1, N'Employer Paid', 500000, N'Active', 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.Nominee (EmployeeId, [NomineeBenefitType], [NomineeName], [NomineeRelationship], [NomineeDateOfBirth], [SharePercentage], [NomineePriority], [NomineeActive], [MinorFlag]) SELECT Id, N'Health', N'Ramesh Pradhan', N'Father', N'1965-01-15', 100, 1, 1, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.SystemAccess (EmployeeId, [ApplicationOrSystemName], [UsernameOrLoginId], [RoleOrAccessProfile], [AccessStartDate], [AccountStatus], [PasswordSetupRequired], [MfaEnabled]) SELECT Id, N'PeopleHub', N'gani.pradhan', N'Employee', N'2022-09-12', N'Active', 0, 1 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.AssetAssignment (EmployeeId, [AssetAssignmentId], [AssetType], [AssetCategory], [AssetName], [AssetSerialNumber], [MakeBrand], [Model], [TagNumber], [OwnershipType], [IssuedDate], [IssuedBy], [IssueLocation], [EmployeeAcknowledgement], [AcknowledgementDate], [AssetConditionAtIssue], [WarrantyStartDate], [WarrantyEndDate], [InsuranceCovered], [AssetValue], [SecurityDepositApplicable]) SELECT Id, N'AST000005', N'Laptop', N'IT', N'Dell Latitude 5440', N'DL5440-0005', N'Dell', N'Latitude 5440', N'OR-IT-0005', N'Company Owned', N'2022-09-12', N'IT Desk', N'Bengaluru', 1, N'2022-09-12', N'New', N'2024-01-01', N'2027-01-01', 1, 85000, 0 FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.Separation (EmployeeId, [SeparationType], [SeparationStatus], [ExitReason], [InitiationDate], [ResignationDate], [NoticeStartDate], [NoticeEndDate], [ProposedLastWorkingDay], [FinalLastWorkingDay], [RehireEligible], [AttritionCategory], [ManagerClearanceStatus], [HrClearanceStatus], [ExitInterviewRequired], [ExitInterviewStatus], [KnowledgeTransferRequired], [KnowledgeTransferStatus], [LeaveBalanceAtExit], [GratuityEligible], [FinalSettlementStatus]) SELECT Id, N'Resignation', N'In Progress', N'Higher studies', N'2026-10-01', N'2026-10-01', N'2026-10-01', N'2026-12-30', N'2026-12-30', N'2026-12-30', 1, N'Voluntary', N'Pending', N'Pending', 1, N'Pending', 1, N'In Progress', 6.5, 0, N'Pending' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
    INSERT emp.ChangeRequestAudit (EmployeeId, [ChangeRequestType], [RequestedBy], [AuditReference], [AuditRemarks]) SELECT Id, N'Onboarding', N'EMP00004', N'ONB-EMP00005', N'Created from seed data.' FROM emp.Employee WHERE EmployeeCode = 'EMP00005';
END
GO

PRINT 'PeopleHub database is ready.';
GO
