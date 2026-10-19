-- Payroll module (section 14 of PeopleHub.sql). Needs sections 1-3 (org, emp), 10 (leave) and 12 (attendance). Re-runnable.
-- ---------------------------------------------------------------------
-- 14. Payroll
--    pay.Settings            PF / ESI / PT / TDS switches and rates (one row per organization)
--    pay.Component           salary components (Basic, HRA, ...) and how each is derived from CTC
--    pay.PtSlab              professional tax slabs per state
--    pay.SalaryRevision      employee CTC history (effective dated)
--    pay.PayrollRun          one run per month: Draft -> Processed -> Locked -> Published
--    pay.RunAdjustment       one-off earnings / deductions for a run (bonus, arrears, advance recovery)
--    pay.RunLop              HR override of loss-of-pay days for a run
--    pay.Payslip             computed payslip (lines kept as JSON)
--    pay.TaxDeclaration(+Item) employee investment declarations per financial year (old regime)
--    pay.Reimbursement       expense claims, paid with the next published run
--    The money maths (structure split, LOP, PF, ESI, PT, TDS) lives in the API (PayrollCalculator);
--    SQL stores data, collects run inputs and enforces the run state machine.
--    THROW 506xx -> API 422.
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'pay') IS NULL EXEC (N'CREATE SCHEMA pay');
GO

IF OBJECT_ID(N'pay.Settings', N'U') IS NULL
BEGIN
CREATE TABLE pay.Settings
(
    OrganizationId    INT            NOT NULL CONSTRAINT PK_PaySettings PRIMARY KEY
                                     CONSTRAINT FK_PaySettings_Organization REFERENCES org.Organization (Id),
    PfEnabled         BIT            NOT NULL CONSTRAINT DF_PaySettings_PfEnabled DEFAULT (1),
    PfRate            DECIMAL(5, 2)  NOT NULL CONSTRAINT DF_PaySettings_PfRate DEFAULT (12),
    PfWageCeiling     DECIMAL(12, 2) NOT NULL CONSTRAINT DF_PaySettings_PfCeiling DEFAULT (15000),
    PfCapAtCeiling    BIT            NOT NULL CONSTRAINT DF_PaySettings_PfCap DEFAULT (1),
    EsiEnabled        BIT            NOT NULL CONSTRAINT DF_PaySettings_EsiEnabled DEFAULT (1),
    EsiEmployeeRate   DECIMAL(5, 2)  NOT NULL CONSTRAINT DF_PaySettings_EsiEe DEFAULT (0.75),
    EsiEmployerRate   DECIMAL(5, 2)  NOT NULL CONSTRAINT DF_PaySettings_EsiEr DEFAULT (3.25),
    EsiWageLimit      DECIMAL(12, 2) NOT NULL CONSTRAINT DF_PaySettings_EsiLimit DEFAULT (21000),
    PtEnabled         BIT            NOT NULL CONSTRAINT DF_PaySettings_PtEnabled DEFAULT (1),
    PtState           NVARCHAR(50)   NOT NULL CONSTRAINT DF_PaySettings_PtState DEFAULT (N'Telangana'),
    TdsEnabled        BIT            NOT NULL CONSTRAINT DF_PaySettings_TdsEnabled DEFAULT (1),
    DefaultRegime     VARCHAR(3)     NOT NULL CONSTRAINT DF_PaySettings_Regime DEFAULT ('New')
                                     CONSTRAINT CK_PaySettings_Regime CHECK (DefaultRegime IN ('New', 'Old')),
    LopFromAttendance BIT            NOT NULL CONSTRAINT DF_PaySettings_LopAtt DEFAULT (0),
    PayDay            INT            NOT NULL CONSTRAINT DF_PaySettings_PayDay DEFAULT (1)
                                     CONSTRAINT CK_PaySettings_PayDay CHECK (PayDay BETWEEN 1 AND 28),
    UpdatedAt         DATETIME2(0)   NULL,
    UpdatedBy         NVARCHAR(100)  NULL
);
END
GO

IF OBJECT_ID(N'pay.Component', N'U') IS NULL
BEGIN
CREATE TABLE pay.Component
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_PayComponent PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_PayComponent_Organization REFERENCES org.Organization (Id),
    Code           VARCHAR(20)    NOT NULL,
    [Name]         NVARCHAR(60)   NOT NULL,
    CalcType       VARCHAR(10)    NOT NULL CONSTRAINT CK_PayComponent_CalcType CHECK (CalcType IN ('PctCtc', 'PctBasic', 'Fixed', 'Balance')),
    [Value]        DECIMAL(12, 2) NOT NULL CONSTRAINT DF_PayComponent_Value DEFAULT (0),
    IsTaxable      BIT            NOT NULL CONSTRAINT DF_PayComponent_Taxable DEFAULT (1),
    IsProrated     BIT            NOT NULL CONSTRAINT DF_PayComponent_Prorated DEFAULT (1),
    SortOrder      INT            NOT NULL CONSTRAINT DF_PayComponent_Sort DEFAULT (0),
    IsActive       BIT            NOT NULL CONSTRAINT DF_PayComponent_Active DEFAULT (1),
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL,
    CONSTRAINT UX_PayComponent_Org_Code UNIQUE (OrganizationId, Code)
);
END
GO

IF OBJECT_ID(N'pay.PtSlab', N'U') IS NULL
BEGIN
CREATE TABLE pay.PtSlab
(
    Id         INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_PtSlab PRIMARY KEY,
    [State]    NVARCHAR(50)   NOT NULL,
    FromAmount DECIMAL(12, 2) NOT NULL,
    ToAmount   DECIMAL(12, 2) NULL,          -- NULL = no upper limit
    Amount     DECIMAL(8, 2)  NOT NULL
);
CREATE INDEX IX_PtSlab_State ON pay.PtSlab ([State], FromAmount);
END
GO

IF OBJECT_ID(N'pay.SalaryRevision', N'U') IS NULL
BEGIN
CREATE TABLE pay.SalaryRevision
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SalaryRevision PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_SalaryRevision_Organization REFERENCES org.Organization (Id),
    EmployeeId     INT            NOT NULL CONSTRAINT FK_SalaryRevision_Employee REFERENCES emp.Employee (Id),
    AnnualCtc      DECIMAL(14, 2) NOT NULL CONSTRAINT CK_SalaryRevision_Ctc CHECK (AnnualCtc > 0),
    EffectiveFrom  DATE           NOT NULL,
    PfApplicable   BIT            NOT NULL CONSTRAINT DF_SalaryRevision_Pf DEFAULT (1),
    Reason         NVARCHAR(200)  NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_SalaryRevision_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_SalaryRevision_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_SalaryRevision_Emp_Date ON pay.SalaryRevision (EmployeeId, EffectiveFrom) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'pay.PayrollRun', N'U') IS NULL
BEGIN
CREATE TABLE pay.PayrollRun
(
    Id              INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_PayrollRun PRIMARY KEY,
    OrganizationId  INT            NOT NULL CONSTRAINT FK_PayrollRun_Organization REFERENCES org.Organization (Id),
    PeriodYear      INT            NOT NULL,
    PeriodMonth     INT            NOT NULL CONSTRAINT CK_PayrollRun_Month CHECK (PeriodMonth BETWEEN 1 AND 12),
    [Status]        VARCHAR(10)    NOT NULL CONSTRAINT DF_PayrollRun_Status DEFAULT ('Draft')
                                   CONSTRAINT CK_PayrollRun_Status CHECK ([Status] IN ('Draft', 'Processed', 'Locked', 'Published')),
    Employees       INT            NOT NULL CONSTRAINT DF_PayrollRun_Employees DEFAULT (0),
    Gross           DECIMAL(16, 2) NOT NULL CONSTRAINT DF_PayrollRun_Gross DEFAULT (0),
    Deductions      DECIMAL(16, 2) NOT NULL CONSTRAINT DF_PayrollRun_Deductions DEFAULT (0),
    Reimbursements  DECIMAL(16, 2) NOT NULL CONSTRAINT DF_PayrollRun_Reimb DEFAULT (0),
    NetPay          DECIMAL(16, 2) NOT NULL CONSTRAINT DF_PayrollRun_Net DEFAULT (0),
    EmployerCost    DECIMAL(16, 2) NOT NULL CONSTRAINT DF_PayrollRun_Cost DEFAULT (0),
    Note            NVARCHAR(300)  NULL,
    ProcessedAt     DATETIME2(0)   NULL,
    ProcessedBy     NVARCHAR(100)  NULL,
    LockedAt        DATETIME2(0)   NULL,
    LockedBy        NVARCHAR(100)  NULL,
    PublishedAt     DATETIME2(0)   NULL,
    PublishedBy     NVARCHAR(100)  NULL,
    IsDeleted       BIT            NOT NULL CONSTRAINT DF_PayrollRun_IsDeleted DEFAULT (0),
    CreatedAt       DATETIME2(0)   NOT NULL CONSTRAINT DF_PayrollRun_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy       NVARCHAR(100)  NULL
);
CREATE UNIQUE INDEX UX_PayrollRun_Period ON pay.PayrollRun (OrganizationId, PeriodYear, PeriodMonth) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'pay.RunAdjustment', N'U') IS NULL
BEGIN
CREATE TABLE pay.RunAdjustment
(
    Id         INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_RunAdjustment PRIMARY KEY,
    RunId      INT            NOT NULL CONSTRAINT FK_RunAdjustment_Run REFERENCES pay.PayrollRun (Id),
    EmployeeId INT            NOT NULL CONSTRAINT FK_RunAdjustment_Employee REFERENCES emp.Employee (Id),
    Kind       VARCHAR(10)    NOT NULL CONSTRAINT CK_RunAdjustment_Kind CHECK (Kind IN ('Earning', 'Deduction')),
    Label      NVARCHAR(60)   NOT NULL,
    Amount     DECIMAL(12, 2) NOT NULL CONSTRAINT CK_RunAdjustment_Amount CHECK (Amount > 0),
    IsTaxable  BIT            NOT NULL CONSTRAINT DF_RunAdjustment_Taxable DEFAULT (1),
    CreatedAt  DATETIME2(0)   NOT NULL CONSTRAINT DF_RunAdjustment_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy  NVARCHAR(100)  NULL
);
CREATE INDEX IX_RunAdjustment_Run ON pay.RunAdjustment (RunId, EmployeeId);
END
GO

IF OBJECT_ID(N'pay.RunLop', N'U') IS NULL
BEGIN
CREATE TABLE pay.RunLop
(
    RunId      INT           NOT NULL CONSTRAINT FK_RunLop_Run REFERENCES pay.PayrollRun (Id),
    EmployeeId INT           NOT NULL CONSTRAINT FK_RunLop_Employee REFERENCES emp.Employee (Id),
    LopDays    DECIMAL(4, 1) NOT NULL CONSTRAINT CK_RunLop_Days CHECK (LopDays BETWEEN 0 AND 31),
    Reason     NVARCHAR(200) NULL,
    UpdatedAt  DATETIME2(0)  NOT NULL CONSTRAINT DF_RunLop_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedBy  NVARCHAR(100) NULL,
    CONSTRAINT PK_RunLop PRIMARY KEY (RunId, EmployeeId)
);
END
GO

IF OBJECT_ID(N'pay.Payslip', N'U') IS NULL
BEGIN
CREATE TABLE pay.Payslip
(
    Id              INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Payslip PRIMARY KEY,
    RunId           INT            NOT NULL CONSTRAINT FK_Payslip_Run REFERENCES pay.PayrollRun (Id),
    EmployeeId      INT            NOT NULL CONSTRAINT FK_Payslip_Employee REFERENCES emp.Employee (Id),
    EmployeeCode    VARCHAR(50)    NOT NULL,
    EmployeeName    NVARCHAR(300)  NOT NULL,
    Department      NVARCHAR(50)   NULL,
    Designation     NVARCHAR(50)   NULL,
    Pan             NVARCHAR(10)   NULL,
    Uan             NVARCHAR(12)   NULL,
    BankName        NVARCHAR(100)  NULL,
    BankAccount     NVARCHAR(18)   NULL,
    Ifsc            NVARCHAR(11)   NULL,
    TaxRegime       VARCHAR(3)     NOT NULL,
    DaysInMonth     INT            NOT NULL,
    PaidDays        DECIMAL(4, 1)  NOT NULL,
    LopDays         DECIMAL(4, 1)  NOT NULL,
    AnnualCtc       DECIMAL(14, 2) NOT NULL,
    Gross           DECIMAL(12, 2) NOT NULL,
    TotalDeductions DECIMAL(12, 2) NOT NULL,
    Reimbursements  DECIMAL(12, 2) NOT NULL,
    NetPay          DECIMAL(12, 2) NOT NULL,
    EmployeePf      DECIMAL(12, 2) NOT NULL,
    EmployerPf      DECIMAL(12, 2) NOT NULL,
    EmployeeEsi     DECIMAL(12, 2) NOT NULL,
    EmployerEsi     DECIMAL(12, 2) NOT NULL,
    ProfessionalTax DECIMAL(12, 2) NOT NULL,
    Tds             DECIMAL(12, 2) NOT NULL,
    TaxableGross    DECIMAL(12, 2) NOT NULL,      -- this month's taxable earnings (YTD basis for TDS)
    ProjectedTaxable DECIMAL(14, 2) NOT NULL,     -- projected annual taxable income used for TDS
    AnnualTax       DECIMAL(14, 2) NOT NULL,
    LinesJson       NVARCHAR(MAX)  NOT NULL CONSTRAINT CK_Payslip_LinesJson CHECK (ISJSON(LinesJson) = 1),
    Warnings        NVARCHAR(500)  NULL,
    CreatedAt       DATETIME2(0)   NOT NULL CONSTRAINT DF_Payslip_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UX_Payslip_Run_Emp UNIQUE (RunId, EmployeeId)
);
CREATE INDEX IX_Payslip_Employee ON pay.Payslip (EmployeeId) INCLUDE (RunId, NetPay, Gross, Tds);
END
GO

IF OBJECT_ID(N'pay.TaxDeclaration', N'U') IS NULL
BEGIN
CREATE TABLE pay.TaxDeclaration
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_TaxDeclaration PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_TaxDeclaration_Organization REFERENCES org.Organization (Id),
    EmployeeId     INT            NOT NULL CONSTRAINT FK_TaxDeclaration_Employee REFERENCES emp.Employee (Id),
    FinancialYear  INT            NOT NULL,      -- start year: 2026 = FY 2026-27 (Apr 2026 - Mar 2027)
    Regime         VARCHAR(3)     NOT NULL CONSTRAINT CK_TaxDeclaration_Regime CHECK (Regime IN ('New', 'Old')),
    [Status]       VARCHAR(10)    NOT NULL CONSTRAINT DF_TaxDeclaration_Status DEFAULT ('Draft')
                                  CONSTRAINT CK_TaxDeclaration_Status CHECK ([Status] IN ('Draft', 'Submitted', 'Approved', 'Rejected')),
    SubmittedAt    DATETIME2(0)   NULL,
    DecidedAt      DATETIME2(0)   NULL,
    DecidedBy      VARCHAR(50)    NULL,
    DecisionNote   NVARCHAR(300)  NULL,
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_TaxDeclaration_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL,
    CONSTRAINT UX_TaxDeclaration_Emp_Fy UNIQUE (EmployeeId, FinancialYear)
);
END
GO

IF OBJECT_ID(N'pay.TaxDeclarationItem', N'U') IS NULL
BEGIN
CREATE TABLE pay.TaxDeclarationItem
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_TaxDeclarationItem PRIMARY KEY,
    DeclarationId  INT            NOT NULL CONSTRAINT FK_TaxDeclarationItem_Declaration REFERENCES pay.TaxDeclaration (Id) ON DELETE CASCADE,
    Section        VARCHAR(20)    NOT NULL,      -- 80C | 80D | 80CCD1B | 24B | HRA | OTHER
    [Description]  NVARCHAR(100)  NOT NULL,
    Amount         DECIMAL(12, 2) NOT NULL CONSTRAINT CK_TaxDeclarationItem_Amount CHECK (Amount >= 0),
    ApprovedAmount DECIMAL(12, 2) NULL
);
CREATE INDEX IX_TaxDeclarationItem_Declaration ON pay.TaxDeclarationItem (DeclarationId);
END
GO

IF OBJECT_ID(N'pay.Reimbursement', N'U') IS NULL
BEGIN
CREATE TABLE pay.Reimbursement
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Reimbursement PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_Reimbursement_Organization REFERENCES org.Organization (Id),
    EmployeeId     INT            NOT NULL CONSTRAINT FK_Reimbursement_Employee REFERENCES emp.Employee (Id),
    Category       VARCHAR(20)    NOT NULL,
    ClaimDate      DATE           NOT NULL,
    Amount         DECIMAL(12, 2) NOT NULL CONSTRAINT CK_Reimbursement_Amount CHECK (Amount > 0),
    [Description]  NVARCHAR(300)  NOT NULL,
    BillNumber     NVARCHAR(50)   NULL,
    [Status]       VARCHAR(10)    NOT NULL CONSTRAINT DF_Reimbursement_Status DEFAULT ('Pending')
                                  CONSTRAINT CK_Reimbursement_Status CHECK ([Status] IN ('Pending', 'Approved', 'Rejected', 'Paid', 'Cancelled')),
    ApproverCode   VARCHAR(50)    NULL,
    DecisionNote   NVARCHAR(300)  NULL,
    DecidedAt      DATETIME2(0)   NULL,
    PaidRunId      INT            NULL CONSTRAINT FK_Reimbursement_Run REFERENCES pay.PayrollRun (Id),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Reimbursement_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL
);
CREATE INDEX IX_Reimbursement_Org ON pay.Reimbursement (OrganizationId, [Status], EmployeeId);
END
GO

-- ---------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------
/* FY start year for a date (April - March). */
CREATE OR ALTER FUNCTION pay.fn_fy (@Date DATE)
RETURNS INT
AS
BEGIN
    RETURN CASE WHEN MONTH(@Date) >= 4 THEN YEAR(@Date) ELSE YEAR(@Date) - 1 END;
END
GO

/* Active employees with the CTC revision effective on @AsOf. */
CREATE OR ALTER FUNCTION pay.fn_current_salary (@OrganizationId INT, @AsOf DATE)
RETURNS TABLE
AS
RETURN
    SELECT e.Id AS EmpPk, e.EmployeeCode, e.FullName, e.DateOfJoining, e.EmployeeStatus,
           d.Department, d.Designation, d.WorkLocation,
           r.Id AS RevisionId, r.AnnualCtc, r.EffectiveFrom, r.PfApplicable
    FROM emp.Employee AS e
    OUTER APPLY (SELECT TOP (1) x.Department, x.Designation, x.WorkLocation FROM emp.EmploymentDetail AS x
                 WHERE x.EmployeeId = e.Id AND x.IsDeleted = 0 ORDER BY x.Id DESC) AS d
    OUTER APPLY (SELECT TOP (1) s.Id, s.AnnualCtc, s.EffectiveFrom, s.PfApplicable FROM pay.SalaryRevision AS s
                 WHERE s.EmployeeId = e.Id AND s.IsDeleted = 0 AND s.EffectiveFrom <= @AsOf
                 ORDER BY s.EffectiveFrom DESC, s.Id DESC) AS r
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0
      AND ISNULL(e.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive');
GO

/* Tax regime for an employee in a FY: declaration > employee bank/payroll record > organization default. */
CREATE OR ALTER FUNCTION pay.fn_regime (@OrganizationId INT, @EmpPk INT, @Fy INT)
RETURNS VARCHAR(3)
AS
BEGIN
    DECLARE @R VARCHAR(3) = (SELECT TOP (1) Regime FROM pay.TaxDeclaration WHERE EmployeeId = @EmpPk AND FinancialYear = @Fy);
    IF @R IS NULL
        SET @R = (SELECT TOP (1) CASE WHEN b.TaxRegime LIKE N'Old%' THEN 'Old' WHEN b.TaxRegime LIKE N'New%' THEN 'New' END
                  FROM emp.BankPayroll AS b WHERE b.EmployeeId = @EmpPk AND b.IsDeleted = 0 ORDER BY b.Id DESC);
    RETURN ISNULL(@R, ISNULL((SELECT DefaultRegime FROM pay.Settings WHERE OrganizationId = @OrganizationId), 'New'));
END
GO

/* Moving a run back to Draft when its inputs change (structures, adjustments, LOP). Locked / published runs never change. */
CREATE OR ALTER PROCEDURE pay.sp_mark_stale
    @RunId INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE pay.PayrollRun SET [Status] = 'Draft' WHERE Id = @RunId AND [Status] = 'Processed';
END
GO

/* Throws when a run can no longer change. */
CREATE OR ALTER PROCEDURE pay.sp_assert_editable
    @OrganizationId INT,
    @RunId          INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Status VARCHAR(10) = (SELECT [Status] FROM pay.PayrollRun WHERE Id = @RunId AND OrganizationId = @OrganizationId AND IsDeleted = 0);
    IF @Status IS NULL THROW 50601, 'Payroll run not found.', 1;
    IF @Status IN ('Locked', 'Published') THROW 50602, 'This payroll run is locked. Unlock it before making changes.', 1;
END
GO

-- ---------------------------------------------------------------------
-- Settings and components
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/settings */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_settings
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    IF NOT EXISTS (SELECT 1 FROM pay.Settings WHERE OrganizationId = @OrganizationId)
        INSERT pay.Settings (OrganizationId) VALUES (@OrganizationId);

    SELECT PfEnabled, PfRate, PfWageCeiling, PfCapAtCeiling, EsiEnabled, EsiEmployeeRate, EsiEmployerRate, EsiWageLimit,
           PtEnabled, PtState, TdsEnabled, DefaultRegime, LopFromAttendance, PayDay, UpdatedAt, UpdatedBy
    FROM pay.Settings WHERE OrganizationId = @OrganizationId;
END
GO

/* PUT api/v1/payroll/settings */
CREATE OR ALTER PROCEDURE dbo.sp_pay_save_settings
    @OrganizationId    INT,
    @PfEnabled         BIT,
    @PfRate            DECIMAL(5, 2),
    @PfWageCeiling     DECIMAL(12, 2),
    @PfCapAtCeiling    BIT,
    @EsiEnabled        BIT,
    @EsiEmployeeRate   DECIMAL(5, 2),
    @EsiEmployerRate   DECIMAL(5, 2),
    @EsiWageLimit      DECIMAL(12, 2),
    @PtEnabled         BIT,
    @PtState           NVARCHAR(50),
    @TdsEnabled        BIT,
    @DefaultRegime     VARCHAR(3),
    @LopFromAttendance BIT,
    @PayDay            INT,
    @UserId            NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    IF @PtEnabled = 1 AND NOT EXISTS (SELECT 1 FROM pay.PtSlab WHERE [State] = @PtState)
        THROW 50603, 'There are no professional tax slabs for that state.', 1;

    MERGE pay.Settings AS t
    USING (SELECT @OrganizationId AS OrganizationId) AS s ON t.OrganizationId = s.OrganizationId
    WHEN MATCHED THEN UPDATE SET
        PfEnabled = @PfEnabled, PfRate = @PfRate, PfWageCeiling = @PfWageCeiling, PfCapAtCeiling = @PfCapAtCeiling,
        EsiEnabled = @EsiEnabled, EsiEmployeeRate = @EsiEmployeeRate, EsiEmployerRate = @EsiEmployerRate, EsiWageLimit = @EsiWageLimit,
        PtEnabled = @PtEnabled, PtState = @PtState, TdsEnabled = @TdsEnabled, DefaultRegime = @DefaultRegime,
        LopFromAttendance = @LopFromAttendance, PayDay = @PayDay, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHEN NOT MATCHED THEN INSERT (OrganizationId, PfEnabled, PfRate, PfWageCeiling, PfCapAtCeiling, EsiEnabled, EsiEmployeeRate,
        EsiEmployerRate, EsiWageLimit, PtEnabled, PtState, TdsEnabled, DefaultRegime, LopFromAttendance, PayDay, UpdatedAt, UpdatedBy)
        VALUES (@OrganizationId, @PfEnabled, @PfRate, @PfWageCeiling, @PfCapAtCeiling, @EsiEnabled, @EsiEmployeeRate,
        @EsiEmployerRate, @EsiWageLimit, @PtEnabled, @PtState, @TdsEnabled, @DefaultRegime, @LopFromAttendance, @PayDay, SYSUTCDATETIME(), @UserId);

    -- Settings feed every calculation: open runs must be processed again.
    UPDATE pay.PayrollRun SET [Status] = 'Draft' WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0;

    EXEC dbo.sp_pay_get_settings @OrganizationId = @OrganizationId;
END
GO

/* GET api/v1/payroll/components */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_components
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Code, [Name], CalcType, [Value], IsTaxable, IsProrated, SortOrder
    FROM pay.Component WHERE OrganizationId = @OrganizationId AND IsActive = 1
    ORDER BY SortOrder, Id;
END
GO

/* PUT api/v1/payroll/components  @Json = [{code,name,calcType,value,isTaxable,isProrated}] in display order.
   Missing codes are deactivated (history on payslips keeps their names). */
CREATE OR ALTER PROCEDURE dbo.sp_pay_save_components
    @OrganizationId INT,
    @Json           NVARCHAR(MAX),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    IF ISJSON(@Json) <> 1 THROW 50604, 'Components are not valid JSON.', 1;

    DECLARE @In TABLE (Code VARCHAR(20) PRIMARY KEY, [Name] NVARCHAR(60), CalcType VARCHAR(10), [Value] DECIMAL(12, 2),
                       IsTaxable BIT, IsProrated BIT, SortOrder INT);
    INSERT @In
    SELECT UPPER(LTRIM(RTRIM(j.code))), LTRIM(RTRIM(j.[name])), j.calcType, ISNULL(j.[value], 0), ISNULL(j.isTaxable, 1), ISNULL(j.isProrated, 1),
           CAST(k.[key] AS INT) * 10
    FROM OPENJSON(@Json) AS k
    CROSS APPLY OPENJSON(k.[value]) WITH (code VARCHAR(20), [name] NVARCHAR(60), calcType VARCHAR(10), [value] DECIMAL(12, 2),
                                          isTaxable BIT, isProrated BIT) AS j;

    IF NOT EXISTS (SELECT 1 FROM @In WHERE Code = 'BASIC') THROW 50605, 'A BASIC component is required.', 1;
    IF (SELECT COUNT(*) FROM @In WHERE CalcType = 'Balance') <> 1 THROW 50606, 'Exactly one component must take the balance.', 1;

    BEGIN TRANSACTION;
    UPDATE c SET [Name] = i.[Name], CalcType = i.CalcType, [Value] = i.[Value], IsTaxable = i.IsTaxable, IsProrated = i.IsProrated,
                 SortOrder = i.SortOrder, IsActive = 1, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    FROM pay.Component AS c JOIN @In AS i ON i.Code = c.Code
    WHERE c.OrganizationId = @OrganizationId;

    INSERT pay.Component (OrganizationId, Code, [Name], CalcType, [Value], IsTaxable, IsProrated, SortOrder, UpdatedAt, UpdatedBy)
    SELECT @OrganizationId, i.Code, i.[Name], i.CalcType, i.[Value], i.IsTaxable, i.IsProrated, i.SortOrder, SYSUTCDATETIME(), @UserId
    FROM @In AS i
    WHERE NOT EXISTS (SELECT 1 FROM pay.Component AS c WHERE c.OrganizationId = @OrganizationId AND c.Code = i.Code);

    UPDATE pay.Component SET IsActive = 0, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE OrganizationId = @OrganizationId AND IsActive = 1 AND Code NOT IN (SELECT Code FROM @In);

    UPDATE pay.PayrollRun SET [Status] = 'Draft' WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0;
    COMMIT TRANSACTION;

    EXEC dbo.sp_pay_get_components @OrganizationId = @OrganizationId;
END
GO

/* GET api/v1/payroll/pt-slabs?state= */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_pt_slabs
    @State NVARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT [State], FromAmount, ToAmount, Amount FROM pay.PtSlab
    WHERE @State IS NULL OR [State] = @State
    ORDER BY [State], FromAmount;
END
GO

-- ---------------------------------------------------------------------
-- Salary structures
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/structures?search=  Every active employee with their current CTC (NULL = no structure yet). */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_structures
    @OrganizationId INT,
    @Search         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Today DATE = CAST(att.fn_now(@OrganizationId) AS DATE);
    DECLARE @Like NVARCHAR(110) = CASE WHEN NULLIF(LTRIM(RTRIM(@Search)), N'') IS NULL THEN NULL ELSE N'%' + LTRIM(RTRIM(@Search)) + N'%' END;

    SELECT s.EmployeeCode AS EmployeeId, s.FullName AS EmployeeName, s.Department, s.Designation, s.WorkLocation,
           CAST(s.DateOfJoining AS DATETIME2(0)) AS DateOfJoining,
           s.AnnualCtc, CAST(s.EffectiveFrom AS DATETIME2(0)) AS EffectiveFrom, ISNULL(s.PfApplicable, 1) AS PfApplicable,
           pay.fn_regime(@OrganizationId, s.EmpPk, pay.fn_fy(@Today)) AS TaxRegime,
           (SELECT COUNT(*) FROM pay.SalaryRevision AS r WHERE r.EmployeeId = s.EmpPk AND r.IsDeleted = 0) AS Revisions,
           (SELECT TOP (1) CAST(r.EffectiveFrom AS DATETIME2(0)) FROM pay.SalaryRevision AS r
            WHERE r.EmployeeId = s.EmpPk AND r.IsDeleted = 0 AND r.EffectiveFrom > @Today ORDER BY r.EffectiveFrom) AS UpcomingFrom
    FROM pay.fn_current_salary(@OrganizationId, @Today) AS s
    WHERE @Like IS NULL OR s.FullName LIKE @Like OR s.EmployeeCode LIKE @Like OR s.Department LIKE @Like OR s.Designation LIKE @Like
    ORDER BY CASE WHEN s.AnnualCtc IS NULL THEN 0 ELSE 1 END, s.FullName;
END
GO

/* GET api/v1/payroll/structures/{employeeId}/revisions  Newest first. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_revisions
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;

    SELECT r.Id, @Employee_Id AS EmployeeId, r.AnnualCtc, CAST(r.EffectiveFrom AS DATETIME2(0)) AS EffectiveFrom,
           r.PfApplicable, r.Reason, r.CreatedAt, r.CreatedBy
    FROM pay.SalaryRevision AS r
    WHERE r.EmployeeId = @EmpPk AND r.OrganizationId = @OrganizationId AND r.IsDeleted = 0
    ORDER BY r.EffectiveFrom DESC, r.Id DESC;
END
GO

/* POST api/v1/payroll/structures/{employeeId}/revisions  New CTC from a date. Same date = replace. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_save_revision
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @AnnualCtc      DECIMAL(14, 2),
    @EffectiveFrom  DATE,
    @PfApplicable   BIT           = 1,
    @Reason         NVARCHAR(200) = NULL,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;
    IF @AnnualCtc <= 0 THROW 50608, 'CTC must be more than zero.', 1;

    -- A revision may not change a month whose payroll is already locked or published.
    IF EXISTS (SELECT 1 FROM pay.PayrollRun AS r
               WHERE r.OrganizationId = @OrganizationId AND r.IsDeleted = 0 AND r.[Status] IN ('Locked', 'Published')
                 AND EOMONTH(DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1)) >= @EffectiveFrom)
        THROW 50609, 'Payroll is already locked for that month. Pick a later effective date.', 1;

    BEGIN TRANSACTION;
    UPDATE pay.SalaryRevision SET IsDeleted = 1
    WHERE EmployeeId = @EmpPk AND EffectiveFrom = @EffectiveFrom AND IsDeleted = 0;

    INSERT pay.SalaryRevision (OrganizationId, EmployeeId, AnnualCtc, EffectiveFrom, PfApplicable, Reason, CreatedBy)
    VALUES (@OrganizationId, @EmpPk, @AnnualCtc, @EffectiveFrom, ISNULL(@PfApplicable, 1), NULLIF(LTRIM(RTRIM(@Reason)), N''), @UserId);
    SET @Id = SCOPE_IDENTITY();

    UPDATE pay.PayrollRun SET [Status] = 'Draft'
    WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0
      AND EOMONTH(DATEFROMPARTS(PeriodYear, PeriodMonth, 1)) >= @EffectiveFrom;
    COMMIT TRANSACTION;
END
GO

-- ---------------------------------------------------------------------
-- Payroll runs
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/runs?year=  Newest first. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_runs
    @OrganizationId INT,
    @Year           INT = NULL,
    @Id             INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT r.Id, r.PeriodYear AS [Year], r.PeriodMonth AS [Month], r.[Status], r.Employees, r.Gross, r.Deductions,
           r.Reimbursements, r.NetPay, r.EmployerCost, r.Note, r.ProcessedAt, r.ProcessedBy, r.LockedAt, r.LockedBy,
           r.PublishedAt, r.PublishedBy, r.CreatedAt, r.CreatedBy,
           CAST(DATEADD(DAY, ISNULL(s.PayDay, 1) - 1, DATEADD(MONTH, 1, DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1))) AS DATETIME2(0)) AS PayDate,
           (SELECT COUNT(*) FROM pay.RunAdjustment AS a WHERE a.RunId = r.Id) AS Adjustments
    FROM pay.PayrollRun AS r
    LEFT JOIN pay.Settings AS s ON s.OrganizationId = r.OrganizationId
    WHERE r.OrganizationId = @OrganizationId AND r.IsDeleted = 0
      AND (@Year IS NULL OR r.PeriodYear = @Year)
      AND (@Id IS NULL OR r.Id = @Id)
    ORDER BY r.PeriodYear DESC, r.PeriodMonth DESC;
END
GO

/* POST api/v1/payroll/runs  {year, month} */
CREATE OR ALTER PROCEDURE dbo.sp_pay_create_run
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Year           INT,
    @Month          INT,
    @Note           NVARCHAR(300) = NULL,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Today DATE = CAST(att.fn_now(@OrganizationId) AS DATE);
    IF @Month NOT BETWEEN 1 AND 12 OR @Year NOT BETWEEN 2000 AND 2100 THROW 50610, 'Pick a valid month.', 1;
    IF DATEFROMPARTS(@Year, @Month, 1) > DATEFROMPARTS(YEAR(@Today), MONTH(@Today), 1)
        THROW 50611, 'You can only run payroll for the current or a past month.', 1;

    BEGIN TRANSACTION;
    IF EXISTS (SELECT 1 FROM pay.PayrollRun WITH (UPDLOCK, HOLDLOCK)
               WHERE OrganizationId = @OrganizationId AND PeriodYear = @Year AND PeriodMonth = @Month AND IsDeleted = 0)
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50612, 'A payroll run for this month already exists.', 1;
    END

    INSERT pay.PayrollRun (OrganizationId, PeriodYear, PeriodMonth, Note, CreatedBy)
    VALUES (@OrganizationId, @Year, @Month, NULLIF(LTRIM(RTRIM(@Note)), N''), @UserId);
    SET @Id = SCOPE_IDENTITY();
    COMMIT TRANSACTION;
END
GO

/* DELETE api/v1/payroll/runs/{id}  Only while not locked. Releases reimbursements. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_delete_run
    @OrganizationId INT,
    @RunId          INT,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;

    BEGIN TRANSACTION;
    UPDATE pay.Reimbursement SET PaidRunId = NULL, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE PaidRunId = @RunId;
    DELETE pay.Payslip WHERE RunId = @RunId;
    DELETE pay.RunAdjustment WHERE RunId = @RunId;
    DELETE pay.RunLop WHERE RunId = @RunId;
    UPDATE pay.PayrollRun SET IsDeleted = 1 WHERE Id = @RunId;
    COMMIT TRANSACTION;
END
GO

/* Inputs for the calculator: one row per employee who is paid in the run month. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_run_inputs
    @OrganizationId INT,
    @RunId          INT
AS
BEGIN
    SET NOCOUNT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;

    DECLARE @Y INT, @M INT;
    SELECT @Y = PeriodYear, @M = PeriodMonth FROM pay.PayrollRun WHERE Id = @RunId;
    DECLARE @Start DATE = DATEFROMPARTS(@Y, @M, 1);
    DECLARE @End DATE = EOMONTH(@Start);
    DECLARE @Today DATE = CAST(att.fn_now(@OrganizationId) AS DATE);
    DECLARE @AttEnd DATE = CASE WHEN @End < @Today THEN @End ELSE DATEADD(DAY, -1, @Today) END;
    DECLARE @Fy INT = pay.fn_fy(@Start);
    DECLARE @FyStart DATE = DATEFROMPARTS(@Fy, 4, 1);
    DECLARE @LopAtt BIT = ISNULL((SELECT LopFromAttendance FROM pay.Settings WHERE OrganizationId = @OrganizationId), 0);

    SELECT
        s.EmployeeCode AS EmployeeId,
        s.FullName AS EmployeeName,
        s.Department,
        s.Designation,
        s.WorkLocation,
        st.PanNumber AS Pan,
        st.UanNumber AS Uan,
        b.BankName,
        b.BankAccountNumber AS BankAccount,
        b.IfscCode AS Ifsc,
        pay.fn_regime(@OrganizationId, s.EmpPk, @Fy) AS TaxRegime,
        s.AnnualCtc,
        s.PfApplicable,
        DAY(@End) AS DaysInMonth,
        -- Not yet joined on these days: unpaid.
        CAST(CASE WHEN s.DateOfJoining > @Start THEN DATEDIFF(DAY, @Start, s.DateOfJoining) ELSE 0 END AS DECIMAL(4, 1)) AS PreJoinDays,
        ISNULL(lop.UnpaidLeaveDays, 0) AS UnpaidLeaveDays,
        CASE WHEN @LopAtt = 1 THEN ISNULL(lop.AbsentDays, 0) ELSE 0 END AS AbsentDays,
        o.LopDays AS LopOverride,
        o.Reason AS LopReason,
        (SELECT a.Id, a.Kind AS kind, a.Label AS label, a.Amount AS amount, a.IsTaxable AS isTaxable
         FROM pay.RunAdjustment AS a WHERE a.RunId = @RunId AND a.EmployeeId = s.EmpPk FOR JSON PATH) AS AdjustmentsJson,
        (SELECT c.Id AS id, c.Category AS category, c.Amount AS amount
         FROM pay.Reimbursement AS c
         WHERE c.EmployeeId = s.EmpPk AND c.OrganizationId = @OrganizationId
           AND c.[Status] = 'Approved' AND (c.PaidRunId IS NULL OR c.PaidRunId = @RunId) AND c.ClaimDate <= @End
         FOR JSON PATH) AS ReimbursementsJson,
        (SELECT i.Section AS section, ISNULL(i.ApprovedAmount, i.Amount) AS amount
         FROM pay.TaxDeclaration AS d JOIN pay.TaxDeclarationItem AS i ON i.DeclarationId = d.Id
         WHERE d.EmployeeId = s.EmpPk AND d.FinancialYear = @Fy AND d.[Status] IN ('Submitted', 'Approved')
         FOR JSON PATH) AS DeclarationsJson,
        ISNULL(y.TaxableGross, 0) AS YtdTaxable,
        ISNULL(y.Tds, 0) AS YtdTds,
        ISNULL(y.EmployeePf, 0) AS YtdPf,
        ISNULL(y.ProfessionalTax, 0) AS YtdPt,
        ISNULL(y.Months, 0) AS YtdMonths
    FROM pay.fn_current_salary(@OrganizationId, @End) AS s
    OUTER APPLY (SELECT TOP (1) x.PanNumber, x.UanNumber FROM emp.StatutoryInfo AS x WHERE x.EmployeeId = s.EmpPk AND x.IsDeleted = 0 ORDER BY x.Id DESC) AS st
    OUTER APPLY (SELECT TOP (1) x.BankName, x.BankAccountNumber, x.IfscCode FROM emp.BankPayroll AS x WHERE x.EmployeeId = s.EmpPk AND x.IsDeleted = 0 ORDER BY x.Id DESC) AS b
    LEFT JOIN pay.RunLop AS o ON o.RunId = @RunId AND o.EmployeeId = s.EmpPk
    OUTER APPLY (
        SELECT SUM(CASE WHEN f.[Status] = 'Absent' THEN 1.0 WHEN f.[Status] IN ('Half day', 'Short day') THEN 0.5 ELSE 0 END) AS AbsentDays,
               SUM(CASE WHEN f.[Status] = 'On leave' AND lt.IsPaid = 0 THEN CASE WHEN f.IsHalfDayLeave = 1 THEN 0.5 ELSE 1.0 END ELSE 0 END) AS UnpaidLeaveDays
        FROM att.fn_days(@OrganizationId, s.EmpPk,
                         CASE WHEN s.DateOfJoining > @Start THEN s.DateOfJoining ELSE @Start END,
                         @End) AS f
        LEFT JOIN lv.LeaveType AS lt ON lt.OrganizationId = @OrganizationId AND lt.Label = f.LeaveType
        WHERE f.WorkDate <= @End AND (f.[Status] <> 'Absent' OR f.WorkDate <= @AttEnd)
    ) AS lop
    OUTER APPLY (
        SELECT SUM(p.TaxableGross) AS TaxableGross, SUM(p.Tds) AS Tds, SUM(p.EmployeePf) AS EmployeePf,
               SUM(p.ProfessionalTax) AS ProfessionalTax, COUNT(*) AS Months
        FROM pay.Payslip AS p JOIN pay.PayrollRun AS r ON r.Id = p.RunId
        WHERE p.EmployeeId = s.EmpPk AND r.OrganizationId = @OrganizationId AND r.IsDeleted = 0 AND r.Id <> @RunId
          AND r.[Status] IN ('Locked', 'Published')
          AND DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1) >= @FyStart
          AND DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1) < @Start
    ) AS y
    WHERE s.AnnualCtc IS NOT NULL AND (s.DateOfJoining IS NULL OR s.DateOfJoining <= @End)
    ORDER BY s.FullName;
END
GO

/* POST api/v1/payroll/runs/{id}/process  Stores the calculator's payslips. @Json = [{employeeId, ..., lines:[...], reimbursementIds:[...]}] */
CREATE OR ALTER PROCEDURE dbo.sp_pay_save_run_results
    @OrganizationId INT,
    @RunId          INT,
    @Json           NVARCHAR(MAX),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;
    IF ISJSON(@Json) <> 1 THROW 50613, 'Payslips are not valid JSON.', 1;

    BEGIN TRANSACTION;
    UPDATE pay.Reimbursement SET PaidRunId = NULL WHERE PaidRunId = @RunId;
    DELETE pay.Payslip WHERE RunId = @RunId;

    INSERT pay.Payslip (RunId, EmployeeId, EmployeeCode, EmployeeName, Department, Designation, Pan, Uan, BankName, BankAccount, Ifsc,
                        TaxRegime, DaysInMonth, PaidDays, LopDays, AnnualCtc, Gross, TotalDeductions, Reimbursements, NetPay,
                        EmployeePf, EmployerPf, EmployeeEsi, EmployerEsi, ProfessionalTax, Tds, TaxableGross, ProjectedTaxable, AnnualTax,
                        LinesJson, Warnings)
    SELECT @RunId, e.Id, j.employeeId, j.employeeName, j.department, j.designation, j.pan, j.uan, j.bankName, j.bankAccount, j.ifsc,
           j.taxRegime, j.daysInMonth, j.paidDays, j.lopDays, j.annualCtc, j.gross, j.totalDeductions, j.reimbursements, j.netPay,
           j.employeePf, j.employerPf, j.employeeEsi, j.employerEsi, j.professionalTax, j.tds, j.taxableGross, j.projectedTaxable, j.annualTax,
           ISNULL(j.lines, N'[]'), NULLIF(j.warnings, N'')
    FROM OPENJSON(@Json) WITH (
        employeeId VARCHAR(50), employeeName NVARCHAR(300), department NVARCHAR(50), designation NVARCHAR(50), pan NVARCHAR(10),
        uan NVARCHAR(12), bankName NVARCHAR(100), bankAccount NVARCHAR(18), ifsc NVARCHAR(11), taxRegime VARCHAR(3),
        daysInMonth INT, paidDays DECIMAL(4, 1), lopDays DECIMAL(4, 1), annualCtc DECIMAL(14, 2), gross DECIMAL(12, 2),
        totalDeductions DECIMAL(12, 2), reimbursements DECIMAL(12, 2), netPay DECIMAL(12, 2), employeePf DECIMAL(12, 2),
        employerPf DECIMAL(12, 2), employeeEsi DECIMAL(12, 2), employerEsi DECIMAL(12, 2), professionalTax DECIMAL(12, 2),
        tds DECIMAL(12, 2), taxableGross DECIMAL(12, 2), projectedTaxable DECIMAL(14, 2), annualTax DECIMAL(14, 2),
        lines NVARCHAR(MAX) AS JSON, warnings NVARCHAR(500)) AS j
    JOIN emp.Employee AS e ON e.EmployeeCode = j.employeeId AND e.OrganizationId = @OrganizationId AND e.IsDeleted = 0;

    UPDATE c SET PaidRunId = @RunId, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    FROM pay.Reimbursement AS c
    JOIN (SELECT CAST(r.[value] AS INT) AS Id
          FROM OPENJSON(@Json) WITH (reimbursementIds NVARCHAR(MAX) AS JSON) AS j
          CROSS APPLY OPENJSON(j.reimbursementIds) AS r) AS x ON x.Id = c.Id
    WHERE c.OrganizationId = @OrganizationId AND c.[Status] = 'Approved' AND c.PaidRunId IS NULL;

    UPDATE r SET [Status] = 'Processed', ProcessedAt = SYSUTCDATETIME(), ProcessedBy = @UserId,
                 Employees = t.Employees, Gross = t.Gross, Deductions = t.Deductions, Reimbursements = t.Reimbursements,
                 NetPay = t.NetPay, EmployerCost = t.EmployerCost
    FROM pay.PayrollRun AS r
    CROSS APPLY (SELECT COUNT(*) AS Employees, ISNULL(SUM(Gross), 0) AS Gross, ISNULL(SUM(TotalDeductions), 0) AS Deductions,
                        ISNULL(SUM(Reimbursements), 0) AS Reimbursements, ISNULL(SUM(NetPay), 0) AS NetPay,
                        ISNULL(SUM(Gross + EmployerPf + EmployerEsi + Reimbursements), 0) AS EmployerCost
                 FROM pay.Payslip WHERE RunId = @RunId) AS t
    WHERE r.Id = @RunId;
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/payroll/runs/{id}/{lock|unlock|publish}
   Processed -> Locked -> Published. Unlock: Locked -> Processed. Published is final. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_set_run_status
    @OrganizationId INT,
    @RunId          INT,
    @Action         VARCHAR(10),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Status VARCHAR(10) = (SELECT [Status] FROM pay.PayrollRun WHERE Id = @RunId AND OrganizationId = @OrganizationId AND IsDeleted = 0);
    IF @Status IS NULL THROW 50601, 'Payroll run not found.', 1;

    BEGIN TRANSACTION;
    IF @Action = 'lock'
    BEGIN
        IF @Status <> 'Processed' THROW 50614, 'Process the payroll before locking it.', 1;
        IF NOT EXISTS (SELECT 1 FROM pay.Payslip WHERE RunId = @RunId) THROW 50615, 'There are no payslips in this run.', 1;
        UPDATE pay.PayrollRun SET [Status] = 'Locked', LockedAt = SYSUTCDATETIME(), LockedBy = @UserId WHERE Id = @RunId;
    END
    ELSE IF @Action = 'unlock'
    BEGIN
        IF @Status <> 'Locked' THROW 50616, 'Only a locked run can be unlocked.', 1;
        IF EXISTS (SELECT 1 FROM pay.PayrollRun AS l JOIN pay.PayrollRun AS r ON r.Id = @RunId
                   WHERE l.OrganizationId = @OrganizationId AND l.IsDeleted = 0 AND l.[Status] IN ('Locked', 'Published')
                     AND DATEFROMPARTS(l.PeriodYear, l.PeriodMonth, 1) > DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1))
            THROW 50617, 'A later month is already locked. Unlock that one first.', 1;
        UPDATE pay.PayrollRun SET [Status] = 'Processed', LockedAt = NULL, LockedBy = NULL WHERE Id = @RunId;
    END
    ELSE IF @Action = 'publish'
    BEGIN
        IF @Status <> 'Locked' THROW 50618, 'Lock the payroll before publishing payslips.', 1;
        UPDATE pay.PayrollRun SET [Status] = 'Published', PublishedAt = SYSUTCDATETIME(), PublishedBy = @UserId WHERE Id = @RunId;
        UPDATE pay.Reimbursement SET [Status] = 'Paid', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHERE PaidRunId = @RunId AND [Status] = 'Approved';
    END
    ELSE
        THROW 50619, 'Unknown action.', 1;
    COMMIT TRANSACTION;
END
GO

/* GET api/v1/payroll/runs/{id}/adjustments */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_adjustments
    @OrganizationId INT,
    @RunId          INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT a.Id, a.RunId, e.EmployeeCode AS EmployeeId, e.FullName AS EmployeeName, a.Kind, a.Label, a.Amount, a.IsTaxable, a.CreatedAt, a.CreatedBy
    FROM pay.RunAdjustment AS a
    JOIN pay.PayrollRun AS r ON r.Id = a.RunId AND r.OrganizationId = @OrganizationId
    JOIN emp.Employee AS e ON e.Id = a.EmployeeId
    WHERE a.RunId = @RunId
    ORDER BY e.FullName, a.Id;
END
GO

/* POST api/v1/payroll/runs/{id}/adjustments */
CREATE OR ALTER PROCEDURE dbo.sp_pay_add_adjustment
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @RunId          INT,
    @Employee_Id    VARCHAR(50),
    @Kind           VARCHAR(10),
    @Label          NVARCHAR(60),
    @Amount         DECIMAL(12, 2),
    @IsTaxable      BIT           = 1,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;

    INSERT pay.RunAdjustment (RunId, EmployeeId, Kind, Label, Amount, IsTaxable, CreatedBy)
    VALUES (@RunId, @EmpPk, @Kind, LTRIM(RTRIM(@Label)), @Amount, CASE WHEN @Kind = 'Deduction' THEN 0 ELSE ISNULL(@IsTaxable, 1) END, @UserId);
    SET @Id = SCOPE_IDENTITY();
    EXEC pay.sp_mark_stale @RunId = @RunId;
END
GO

/* DELETE api/v1/payroll/runs/{id}/adjustments/{adjustmentId} */
CREATE OR ALTER PROCEDURE dbo.sp_pay_delete_adjustment
    @OrganizationId INT,
    @RunId          INT,
    @AdjustmentId   INT,
    @Affected       INT = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;
    DELETE pay.RunAdjustment WHERE Id = @AdjustmentId AND RunId = @RunId;
    SET @Affected = @@ROWCOUNT;
    IF @Affected > 0 EXEC pay.sp_mark_stale @RunId = @RunId;
END
GO

/* PUT api/v1/payroll/runs/{id}/lop/{employeeId}  @LopDays NULL = back to the calculated value. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_set_lop
    @OrganizationId INT,
    @RunId          INT,
    @Employee_Id    VARCHAR(50),
    @LopDays        DECIMAL(4, 1) = NULL,
    @Reason         NVARCHAR(200) = NULL,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    EXEC pay.sp_assert_editable @OrganizationId = @OrganizationId, @RunId = @RunId;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;
    DECLARE @Days INT = (SELECT DAY(EOMONTH(DATEFROMPARTS(PeriodYear, PeriodMonth, 1))) FROM pay.PayrollRun WHERE Id = @RunId);
    IF @LopDays > @Days THROW 50620, 'Loss-of-pay days cannot exceed the days in the month.', 1;

    IF @LopDays IS NULL
        DELETE pay.RunLop WHERE RunId = @RunId AND EmployeeId = @EmpPk;
    ELSE
        MERGE pay.RunLop AS t
        USING (SELECT @RunId AS RunId, @EmpPk AS EmployeeId) AS s ON t.RunId = s.RunId AND t.EmployeeId = s.EmployeeId
        WHEN MATCHED THEN UPDATE SET LopDays = @LopDays, Reason = NULLIF(LTRIM(RTRIM(@Reason)), N''), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHEN NOT MATCHED THEN INSERT (RunId, EmployeeId, LopDays, Reason, UpdatedBy) VALUES (@RunId, @EmpPk, @LopDays, NULLIF(LTRIM(RTRIM(@Reason)), N''), @UserId);

    EXEC pay.sp_mark_stale @RunId = @RunId;
END
GO

-- ---------------------------------------------------------------------
-- Payslips
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/runs/{id}/payslips  |  GET api/v1/payroll/payslips?employeeId=  |  GET api/v1/payroll/payslips/{id}
   @PublishedOnly = 1 for employees. YTD = same FY, up to this month, locked/published runs + this one. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_payslips
    @OrganizationId INT,
    @RunId          INT         = NULL,
    @Employee_Id    VARCHAR(50) = NULL,
    @Id             INT         = NULL,
    @PublishedOnly  BIT         = 0
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    IF @Employee_Id IS NOT NULL AND @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;

    SELECT p.Id, p.RunId, r.PeriodYear AS [Year], r.PeriodMonth AS [Month], r.[Status] AS RunStatus,
           CAST(DATEADD(DAY, ISNULL(s.PayDay, 1) - 1, DATEADD(MONTH, 1, DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1))) AS DATETIME2(0)) AS PayDate,
           p.EmployeeCode AS EmployeeId, p.EmployeeName, p.Department, p.Designation, p.Pan, p.Uan, p.BankName,
           CASE WHEN LEN(p.BankAccount) > 4 THEN REPLICATE('X', LEN(p.BankAccount) - 4) + RIGHT(p.BankAccount, 4) ELSE p.BankAccount END AS BankAccount,
           p.Ifsc, p.TaxRegime, p.DaysInMonth, p.PaidDays, p.LopDays, p.AnnualCtc, p.Gross, p.TotalDeductions, p.Reimbursements, p.NetPay,
           p.EmployeePf, p.EmployerPf, p.EmployeeEsi, p.EmployerEsi, p.ProfessionalTax, p.Tds, p.TaxableGross, p.ProjectedTaxable, p.AnnualTax,
           p.LinesJson, p.Warnings,
           y.YtdGross, y.YtdDeductions, y.YtdNet, y.YtdTds, y.YtdPf
    FROM pay.Payslip AS p
    JOIN pay.PayrollRun AS r ON r.Id = p.RunId AND r.OrganizationId = @OrganizationId AND r.IsDeleted = 0
    LEFT JOIN pay.Settings AS s ON s.OrganizationId = r.OrganizationId
    OUTER APPLY (
        SELECT SUM(q.Gross) AS YtdGross, SUM(q.TotalDeductions) AS YtdDeductions, SUM(q.NetPay) AS YtdNet, SUM(q.Tds) AS YtdTds, SUM(q.EmployeePf) AS YtdPf
        FROM pay.Payslip AS q JOIN pay.PayrollRun AS x ON x.Id = q.RunId AND x.IsDeleted = 0
        WHERE q.EmployeeId = p.EmployeeId
          AND (x.Id = r.Id OR x.[Status] IN ('Locked', 'Published'))
          AND DATEFROMPARTS(x.PeriodYear, x.PeriodMonth, 1) BETWEEN DATEFROMPARTS(pay.fn_fy(DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1)), 4, 1)
                                                               AND DATEFROMPARTS(r.PeriodYear, r.PeriodMonth, 1)
    ) AS y
    WHERE (@RunId IS NULL OR p.RunId = @RunId)
      AND (@EmpPk IS NULL OR p.EmployeeId = @EmpPk)
      AND (@Id IS NULL OR p.Id = @Id)
      AND (@PublishedOnly = 0 OR r.[Status] = 'Published')
    ORDER BY r.PeriodYear DESC, r.PeriodMonth DESC, p.EmployeeName;
END
GO

-- ---------------------------------------------------------------------
-- Tax declarations
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/declarations?employeeId=&fy=&status= */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_declarations
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50) = NULL,
    @Fy             INT,
    @Status         VARCHAR(10) = NULL,
    @Id             INT         = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    IF @Employee_Id IS NOT NULL AND @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;

    SELECT d.Id, e.EmployeeCode AS EmployeeId, e.FullName AS EmployeeName, d.FinancialYear, d.Regime, d.[Status],
           d.SubmittedAt, d.DecidedAt, d.DecidedBy, d.DecisionNote, ISNULL(d.UpdatedAt, d.CreatedAt) AS UpdatedAt,
           (SELECT SUM(i.Amount) FROM pay.TaxDeclarationItem AS i WHERE i.DeclarationId = d.Id) AS TotalDeclared,
           (SELECT i.Id AS id, i.Section AS section, i.[Description] AS [description], i.Amount AS amount, i.ApprovedAmount AS approvedAmount
            FROM pay.TaxDeclarationItem AS i WHERE i.DeclarationId = d.Id ORDER BY i.Id FOR JSON PATH) AS ItemsJson
    FROM pay.TaxDeclaration AS d
    JOIN emp.Employee AS e ON e.Id = d.EmployeeId
    WHERE d.OrganizationId = @OrganizationId AND d.FinancialYear = @Fy
      AND (@EmpPk IS NULL OR d.EmployeeId = @EmpPk)
      AND (@Status IS NULL OR d.[Status] = @Status)
      AND (@Id IS NULL OR d.Id = @Id)
    ORDER BY CASE d.[Status] WHEN 'Submitted' THEN 0 ELSE 1 END, e.FullName;
END
GO

/* PUT api/v1/payroll/declarations  Saves the employee's declaration for a FY (replaces items). @Submit = 1 sends it to HR. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_save_declaration
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Fy             INT,
    @Regime         VARCHAR(3),
    @ItemsJson      NVARCHAR(MAX),
    @Submit         BIT           = 0,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;
    IF ISJSON(@ItemsJson) <> 1 THROW 50621, 'Declaration items are not valid JSON.', 1;
    DECLARE @CurrentFy INT = pay.fn_fy(CAST(att.fn_now(@OrganizationId) AS DATE));
    IF @Fy NOT BETWEEN @CurrentFy - 1 AND @CurrentFy + 1 THROW 50622, 'Declarations are open for the current financial year only.', 1;

    BEGIN TRANSACTION;
    DECLARE @Status VARCHAR(10);
    SELECT @Id = Id, @Status = [Status] FROM pay.TaxDeclaration WITH (UPDLOCK, HOLDLOCK) WHERE EmployeeId = @EmpPk AND FinancialYear = @Fy;
    IF @Status = 'Approved'
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50623, 'This declaration is already approved. Ask HR to reopen it.', 1;
    END

    IF @Id IS NULL
    BEGIN
        INSERT pay.TaxDeclaration (OrganizationId, EmployeeId, FinancialYear, Regime, [Status], SubmittedAt, UpdatedBy)
        VALUES (@OrganizationId, @EmpPk, @Fy, @Regime, CASE WHEN @Submit = 1 THEN 'Submitted' ELSE 'Draft' END,
                CASE WHEN @Submit = 1 THEN SYSUTCDATETIME() END, @UserId);
        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
        UPDATE pay.TaxDeclaration
        SET Regime = @Regime,
            [Status] = CASE WHEN @Submit = 1 THEN 'Submitted' ELSE 'Draft' END,
            SubmittedAt = CASE WHEN @Submit = 1 THEN SYSUTCDATETIME() ELSE SubmittedAt END,
            DecidedAt = NULL, DecidedBy = NULL, DecisionNote = NULL,
            UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHERE Id = @Id;

    DELETE pay.TaxDeclarationItem WHERE DeclarationId = @Id;
    INSERT pay.TaxDeclarationItem (DeclarationId, Section, [Description], Amount)
    SELECT @Id, UPPER(LTRIM(RTRIM(j.section))), LTRIM(RTRIM(j.[description])), j.amount
    FROM OPENJSON(@ItemsJson) WITH (section VARCHAR(20), [description] NVARCHAR(100), amount DECIMAL(12, 2)) AS j
    WHERE j.amount > 0;

    -- Regime / deductions change TDS for open runs of that FY.
    UPDATE pay.PayrollRun SET [Status] = 'Draft'
    WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0
      AND pay.fn_fy(DATEFROMPARTS(PeriodYear, PeriodMonth, 1)) = @Fy;
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/payroll/declarations/{id}/decision  Approve (optionally with lower approved amounts) or reject (note required). */
CREATE OR ALTER PROCEDURE dbo.sp_pay_decide_declaration
    @OrganizationId INT,
    @Id             INT,
    @Approve        BIT,
    @Note           NVARCHAR(300) = NULL,
    @ApprovedJson   NVARCHAR(MAX) = NULL,     -- [{id, approvedAmount}]
    @Approver_Id    VARCHAR(50)   = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Status VARCHAR(10), @Fy INT;
    SELECT @Status = [Status], @Fy = FinancialYear FROM pay.TaxDeclaration WHERE Id = @Id AND OrganizationId = @OrganizationId;
    SET @Affected = 0;
    IF @Status IS NULL RETURN;
    IF @Status <> 'Submitted' THROW 50624, 'Only a submitted declaration can be approved or rejected.', 1;

    BEGIN TRANSACTION;
    UPDATE i SET ApprovedAmount = CASE WHEN @Approve = 0 THEN NULL
                                       ELSE CASE WHEN a.approvedAmount IS NULL THEN i.Amount
                                                 WHEN a.approvedAmount > i.Amount THEN i.Amount
                                                 WHEN a.approvedAmount < 0 THEN 0 ELSE a.approvedAmount END END
    FROM pay.TaxDeclarationItem AS i
    LEFT JOIN OPENJSON(ISNULL(@ApprovedJson, N'[]')) WITH (id INT, approvedAmount DECIMAL(12, 2)) AS a ON a.id = i.Id
    WHERE i.DeclarationId = @Id;

    UPDATE pay.TaxDeclaration
    SET [Status] = CASE WHEN @Approve = 1 THEN 'Approved' ELSE 'Rejected' END,
        DecidedAt = SYSUTCDATETIME(), DecidedBy = @Approver_Id, DecisionNote = NULLIF(LTRIM(RTRIM(@Note)), N''),
        UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;

    UPDATE pay.PayrollRun SET [Status] = 'Draft'
    WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0
      AND pay.fn_fy(DATEFROMPARTS(PeriodYear, PeriodMonth, 1)) = @Fy;
    COMMIT TRANSACTION;
END
GO

-- ---------------------------------------------------------------------
-- Reimbursements
-- ---------------------------------------------------------------------
/* GET api/v1/payroll/reimbursements?employeeId=&status= */
CREATE OR ALTER PROCEDURE dbo.sp_pay_get_reimbursements
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50) = NULL,
    @Status         VARCHAR(10) = NULL,
    @Id             INT         = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    IF @Employee_Id IS NOT NULL AND @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;

    SELECT c.Id, e.EmployeeCode AS EmployeeId, e.FullName AS EmployeeName, c.Category, CAST(c.ClaimDate AS DATETIME2(0)) AS ClaimDate,
           c.Amount, c.[Description], c.BillNumber, c.[Status], c.ApproverCode AS ApproverId, a.FullName AS ApproverName,
           c.DecisionNote, c.DecidedAt, c.PaidRunId,
           CASE WHEN r.Id IS NULL THEN NULL ELSE CONCAT(r.PeriodYear, '-', RIGHT('0' + CAST(r.PeriodMonth AS VARCHAR(2)), 2)) END AS PaidInPeriod,
           c.CreatedAt AS RequestedAt
    FROM pay.Reimbursement AS c
    JOIN emp.Employee AS e ON e.Id = c.EmployeeId
    LEFT JOIN emp.Employee AS a ON a.EmployeeCode = c.ApproverCode AND a.IsDeleted = 0
    LEFT JOIN pay.PayrollRun AS r ON r.Id = c.PaidRunId
    WHERE c.OrganizationId = @OrganizationId
      AND (@EmpPk IS NULL OR c.EmployeeId = @EmpPk)
      AND (@Status IS NULL OR c.[Status] = @Status)
      AND (@Id IS NULL OR c.Id = @Id)
    ORDER BY CASE c.[Status] WHEN 'Pending' THEN 0 ELSE 1 END, c.ClaimDate DESC, c.Id DESC;
END
GO

/* POST api/v1/payroll/reimbursements */
CREATE OR ALTER PROCEDURE dbo.sp_pay_claim_reimbursement
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Category       VARCHAR(20),
    @ClaimDate      DATE,
    @Amount         DECIMAL(12, 2),
    @Description    NVARCHAR(300),
    @BillNumber     NVARCHAR(50)  = NULL,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50607, 'Employee not found.', 1;
    DECLARE @Today DATE = CAST(att.fn_now(@OrganizationId) AS DATE);
    IF @ClaimDate > @Today THROW 50625, 'The bill date cannot be in the future.', 1;
    IF @ClaimDate < DATEADD(DAY, -90, @Today) THROW 50626, 'Bills older than 90 days cannot be claimed.', 1;
    IF NULLIF(LTRIM(RTRIM(@BillNumber)), N'') IS NOT NULL
       AND EXISTS (SELECT 1 FROM pay.Reimbursement WHERE EmployeeId = @EmpPk AND BillNumber = LTRIM(RTRIM(@BillNumber))
                   AND [Status] NOT IN ('Rejected', 'Cancelled'))
        THROW 50627, 'You have already claimed this bill.', 1;

    DECLARE @ApproverCode VARCHAR(50) = (SELECT TOP (1) NULLIF(LTRIM(RTRIM(d.ReportingManager)), N'') FROM emp.EmploymentDetail AS d
                                         WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0 ORDER BY d.Id DESC);

    INSERT pay.Reimbursement (OrganizationId, EmployeeId, Category, ClaimDate, Amount, [Description], BillNumber, ApproverCode, CreatedBy)
    VALUES (@OrganizationId, @EmpPk, @Category, @ClaimDate, @Amount, LTRIM(RTRIM(@Description)), NULLIF(LTRIM(RTRIM(@BillNumber)), N''), @ApproverCode, @UserId);
    SET @Id = SCOPE_IDENTITY();
END
GO

/* POST api/v1/payroll/reimbursements/{id}/decision */
CREATE OR ALTER PROCEDURE dbo.sp_pay_decide_reimbursement
    @OrganizationId INT,
    @Id             INT,
    @Approve        BIT,
    @Note           NVARCHAR(300) = NULL,
    @Approver_Id    VARCHAR(50)   = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Status VARCHAR(10) = (SELECT [Status] FROM pay.Reimbursement WHERE Id = @Id AND OrganizationId = @OrganizationId);
    SET @Affected = 0;
    IF @Status IS NULL RETURN;
    IF @Status <> 'Pending' THROW 50628, 'This claim has already been decided.', 1;

    UPDATE pay.Reimbursement
    SET [Status] = CASE WHEN @Approve = 1 THEN 'Approved' ELSE 'Rejected' END,
        ApproverCode = ISNULL(@Approver_Id, ApproverCode), DecisionNote = NULLIF(LTRIM(RTRIM(@Note)), N''),
        DecidedAt = SYSUTCDATETIME(), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;

    -- An approved claim joins the next open run.
    IF @Approve = 1
        UPDATE pay.PayrollRun SET [Status] = 'Draft'
        WHERE OrganizationId = @OrganizationId AND [Status] = 'Processed' AND IsDeleted = 0;
END
GO

/* POST api/v1/payroll/reimbursements/{id}/cancel  Employee withdraws a pending claim. */
CREATE OR ALTER PROCEDURE dbo.sp_pay_cancel_reimbursement
    @OrganizationId INT,
    @Id             INT,
    @Employee_Id    VARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    DECLARE @Status VARCHAR(10) = (SELECT [Status] FROM pay.Reimbursement WHERE Id = @Id AND OrganizationId = @OrganizationId AND EmployeeId = @EmpPk);
    SET @Affected = 0;
    IF @Status IS NULL RETURN;
    IF @Status <> 'Pending' THROW 50629, 'Only a pending claim can be withdrawn.', 1;

    UPDATE pay.Reimbursement SET [Status] = 'Cancelled', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;
END
GO

-- ---------------------------------------------------------------------
-- Seed (demo organization)
-- ---------------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM pay.PtSlab)
BEGIN
    INSERT pay.PtSlab ([State], FromAmount, ToAmount, Amount) VALUES
        (N'Telangana',      0,     15000, 0),   (N'Telangana',      15000.01, 20000, 150), (N'Telangana',      20000.01, NULL, 200),
        (N'Andhra Pradesh', 0,     15000, 0),   (N'Andhra Pradesh', 15000.01, 20000, 150), (N'Andhra Pradesh', 20000.01, NULL, 200),
        (N'Karnataka',      0,     24999, 0),   (N'Karnataka',      24999.01, NULL, 200),
        (N'Tamil Nadu',     0,     21000, 0),   (N'Tamil Nadu',     21000.01, 30000, 135), (N'Tamil Nadu',     30000.01, 45000, 315),
        (N'Tamil Nadu',     45000.01, 60000, 690), (N'Tamil Nadu',  60000.01, 75000, 1025), (N'Tamil Nadu',    75000.01, NULL, 1250),
        (N'Maharashtra',    0,     7500, 0),    (N'Maharashtra',    7500.01, 10000, 175),  (N'Maharashtra',    10000.01, NULL, 200),
        (N'West Bengal',    0,     10000, 0),   (N'West Bengal',    10000.01, 15000, 110), (N'West Bengal',    15000.01, 25000, 130),
        (N'West Bengal',    25000.01, 40000, 150), (N'West Bengal', 40000.01, NULL, 200);
END
GO

DECLARE @PayOrg INT = (SELECT TOP (1) Id FROM org.Organization ORDER BY Id);
IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.Settings WHERE OrganizationId = @PayOrg)
    INSERT pay.Settings (OrganizationId, UpdatedBy) VALUES (@PayOrg, N'seed');

IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.Component WHERE OrganizationId = @PayOrg)
    INSERT pay.Component (OrganizationId, Code, [Name], CalcType, [Value], IsTaxable, IsProrated, SortOrder, UpdatedBy) VALUES
        (@PayOrg, 'BASIC',   N'Basic salary',          'PctCtc',   40,   1, 1, 10, N'seed'),
        (@PayOrg, 'HRA',     N'House rent allowance',  'PctBasic', 40,   1, 1, 20, N'seed'),
        (@PayOrg, 'CONV',    N'Conveyance allowance',  'Fixed',    1600, 1, 1, 30, N'seed'),
        (@PayOrg, 'MEDICAL', N'Medical allowance',     'Fixed',    1250, 1, 1, 40, N'seed'),
        (@PayOrg, 'SPECIAL', N'Special allowance',     'Balance',  0,    1, 1, 50, N'seed');

IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.SalaryRevision WHERE OrganizationId = @PayOrg)
BEGIN
    INSERT pay.SalaryRevision (OrganizationId, EmployeeId, AnnualCtc, EffectiveFrom, PfApplicable, Reason, CreatedBy)
    SELECT @PayOrg, e.Id, v.Ctc, v.Since, v.Pf, v.Reason, N'seed'
    FROM (VALUES
        ('EMP00001',  780000, '2025-04-01', 1, N'Annual revision 2025'),
        ('EMP00001',  900000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00002',  480000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00003',  264000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00004', 1500000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00005',  600000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00006', 4800000, '2026-04-01', 0, N'Annual revision 2026'),
        ('EMP00007', 2400000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00008', 3600000, '2026-04-01', 1, N'Annual revision 2026'),
        ('EMP00009', 1800000, '2026-04-01', 1, N'Annual revision 2026')
    ) AS v (Code, Ctc, Since, Pf, Reason)
    JOIN emp.Employee AS e ON e.EmployeeCode = v.Code AND e.OrganizationId = @PayOrg AND e.IsDeleted = 0;
END

-- Two open runs so HR can process / lock / publish right away (payslips are computed by the API).
IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.PayrollRun WHERE OrganizationId = @PayOrg)
    INSERT pay.PayrollRun (OrganizationId, PeriodYear, PeriodMonth, Note, CreatedBy) VALUES
        (@PayOrg, 2026, 8, N'August 2026 payroll', N'seed'),
        (@PayOrg, 2026, 9, N'September 2026 payroll', N'seed');

IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.TaxDeclaration WHERE OrganizationId = @PayOrg)
BEGIN
    INSERT pay.TaxDeclaration (OrganizationId, EmployeeId, FinancialYear, Regime, [Status], SubmittedAt, UpdatedBy)
    SELECT @PayOrg, e.Id, 2026, 'Old', 'Submitted', SYSUTCDATETIME(), N'seed'
    FROM emp.Employee AS e WHERE e.EmployeeCode = 'EMP00004' AND e.OrganizationId = @PayOrg AND e.IsDeleted = 0;

    INSERT pay.TaxDeclarationItem (DeclarationId, Section, [Description], Amount)
    SELECT d.Id, v.Section, v.Descr, v.Amount
    FROM pay.TaxDeclaration AS d
    JOIN emp.Employee AS e ON e.Id = d.EmployeeId AND e.EmployeeCode = 'EMP00004'
    CROSS JOIN (VALUES ('80C', N'PPF + ELSS', 100000.00), ('80D', N'Health insurance (family)', 25000.00),
                       ('HRA', N'Rent paid (annual)', 300000.00), ('80CCD1B', N'NPS', 50000.00)) AS v (Section, Descr, Amount)
    WHERE d.FinancialYear = 2026;
END

IF @PayOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pay.Reimbursement WHERE OrganizationId = @PayOrg)
BEGIN
    DECLARE @PayToday DATE = CAST(att.fn_now(@PayOrg) AS DATE);
    INSERT pay.Reimbursement (OrganizationId, EmployeeId, Category, ClaimDate, Amount, [Description], BillNumber, [Status], ApproverCode, DecidedAt, CreatedBy)
    SELECT @PayOrg, e.Id, v.Category, DATEADD(DAY, -v.Ago, @PayToday), v.Amount, v.Descr, v.Bill, v.[Status], v.Approver,
           CASE WHEN v.[Status] = 'Pending' THEN NULL ELSE SYSUTCDATETIME() END, N'seed'
    FROM (VALUES
        ('EMP00001', 'Internet', 12, 999.00,  N'Home broadband - September', N'ACT-0925',  'Pending',  'EMP00004'),
        ('EMP00001', 'Travel',   40, 2450.00, N'Client visit cab fare',       N'UBR-88213', 'Approved', 'EMP00004'),
        ('EMP00002', 'Meal',     8,  640.00,  N'Team lunch (release night)',  N'SWG-55102', 'Pending',  'EMP00004')
    ) AS v (Code, Category, Ago, Amount, Descr, Bill, [Status], Approver)
    JOIN emp.Employee AS e ON e.EmployeeCode = v.Code AND e.OrganizationId = @PayOrg AND e.IsDeleted = 0;
END
GO
