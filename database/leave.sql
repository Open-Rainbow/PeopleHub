-- ---------------------------------------------------------------------
-- 10. Leave
--    org.Holiday       company holidays (skipped when counting leave days)
--    lv.LeaveType      leave types + yearly entitlement per organization
--    lv.LeaveRequest   one row per request (Pending/Approved/Rejected/Cancelled)
--    lv.LeavePolicy    leave policy per year + employment type (Draft / Published / Archived versions)
--    lv.LeavePolicyItem the rules of one policy version, one row per leave type
--    Rules in force = published policy for the employee's employment type, else lv.LeaveType defaults.
--    Balance = allowance + carry forward - (approved + pending days) in the calendar year.
--    Business rules live in dbo.sp_apply_leave (THROW 502xx -> API 422).
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'lv') IS NULL EXEC (N'CREATE SCHEMA lv');
GO

IF OBJECT_ID(N'org.Holiday', N'U') IS NULL
BEGIN
CREATE TABLE org.Holiday
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Holiday PRIMARY KEY,
    OrganizationId INT           NOT NULL CONSTRAINT FK_Holiday_Organization REFERENCES org.Organization (Id),
    HolidayDate    DATE          NOT NULL,
    [Name]         NVARCHAR(100) NOT NULL,
    IsOptional     BIT           NOT NULL CONSTRAINT DF_Holiday_IsOptional DEFAULT (0),
    IsDeleted      BIT           NOT NULL CONSTRAINT DF_Holiday_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)  NOT NULL CONSTRAINT DF_Holiday_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UX_Holiday_Org_Date UNIQUE (OrganizationId, HolidayDate)
);
END
GO

IF OBJECT_ID(N'lv.LeaveType', N'U') IS NULL
BEGIN
CREATE TABLE lv.LeaveType
(
    Id                INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LeaveType PRIMARY KEY,
    OrganizationId    INT            NOT NULL CONSTRAINT FK_LeaveType_Organization REFERENCES org.Organization (Id),
    Code              VARCHAR(20)    NOT NULL,      -- earned | casual | sick | comp-off | loss-of-pay | added in the policy manager
    Label             NVARCHAR(50)   NOT NULL,
    ShortCode         VARCHAR(5)     NOT NULL,
    [Description]     NVARCHAR(200)  NULL,
    AnnualEntitlement DECIMAL(5, 1)  NULL,          -- NULL = no limit (unpaid)
    BackdateDays      INT            NOT NULL CONSTRAINT DF_LeaveType_BackdateDays DEFAULT (0),
    MaxConsecutive    DECIMAL(5, 1)  NULL,
    DocumentAfterDays DECIMAL(5, 1)  NULL,
    IsPaid            BIT            NOT NULL CONSTRAINT DF_LeaveType_IsPaid DEFAULT (1),
    SortOrder         INT            NOT NULL CONSTRAINT DF_LeaveType_SortOrder DEFAULT (0),
    IsActive          BIT            NOT NULL CONSTRAINT DF_LeaveType_IsActive DEFAULT (1),
    CreatedAt         DATETIME2(0)   NOT NULL CONSTRAINT DF_LeaveType_CreatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedAt         DATETIME2(0)   NULL,
    CONSTRAINT UX_LeaveType_Org_Code UNIQUE (OrganizationId, Code)
);
END
GO

IF OBJECT_ID(N'lv.LeaveRequest', N'U') IS NULL
BEGIN
CREATE TABLE lv.LeaveRequest
(
    Id                 INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LeaveRequest PRIMARY KEY,
    OrganizationId     INT            NOT NULL CONSTRAINT FK_LeaveRequest_Organization REFERENCES org.Organization (Id),
    EmployeeId         INT            NOT NULL CONSTRAINT FK_LeaveRequest_Employee REFERENCES emp.Employee (Id),
    LeaveTypeId        INT            NOT NULL CONSTRAINT FK_LeaveRequest_LeaveType REFERENCES lv.LeaveType (Id),
    FromDate           DATE           NOT NULL,
    ToDate             DATE           NOT NULL,
    DayPart            VARCHAR(12)    NOT NULL CONSTRAINT DF_LeaveRequest_DayPart DEFAULT ('full')
                                      CONSTRAINT CK_LeaveRequest_DayPart CHECK (DayPart IN ('full', 'first-half', 'second-half')),
    [Days]             DECIMAL(5, 1)  NOT NULL,
    Reason             NVARCHAR(500)  NOT NULL,
    [Status]           VARCHAR(12)    NOT NULL CONSTRAINT DF_LeaveRequest_Status DEFAULT ('Pending')
                                      CONSTRAINT CK_LeaveRequest_Status CHECK ([Status] IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    ApproverEmployeeId INT            NULL CONSTRAINT FK_LeaveRequest_Approver REFERENCES emp.Employee (Id),
    DecisionNote       NVARCHAR(500)  NULL,
    DecidedAt          DATETIME2(0)   NULL,
    AppliedAt          DATETIME2(0)   NOT NULL CONSTRAINT DF_LeaveRequest_AppliedAt DEFAULT (SYSUTCDATETIME()),
    IsDeleted          BIT            NOT NULL CONSTRAINT DF_LeaveRequest_IsDeleted DEFAULT (0),
    CreatedBy          NVARCHAR(100)  NULL,
    UpdatedAt          DATETIME2(0)   NULL,
    UpdatedBy          NVARCHAR(100)  NULL,
    CONSTRAINT CK_LeaveRequest_Dates CHECK (ToDate >= FromDate),
    CONSTRAINT CK_LeaveRequest_HalfDay CHECK (DayPart = 'full' OR FromDate = ToDate)
);
CREATE INDEX IX_LeaveRequest_Employee ON lv.LeaveRequest (OrganizationId, EmployeeId, FromDate) INCLUDE ([Status], [Days], LeaveTypeId);
CREATE INDEX IX_LeaveRequest_Approver ON lv.LeaveRequest (OrganizationId, ApproverEmployeeId, [Status]);
END
GO

-- Default category for the policy manager (standard | parental | additional).
IF COL_LENGTH(N'lv.LeaveType', N'Category') IS NULL
    ALTER TABLE lv.LeaveType ADD Category VARCHAR(20) NOT NULL CONSTRAINT DF_LeaveType_Category DEFAULT ('standard');
GO

-- Leave policy per year + employment type, versioned:
--   one Draft (being edited) and one Published (in force) at a time; older published versions are Archived.
--   Employees always get the Published version; with no published policy the lv.LeaveType defaults apply.
IF OBJECT_ID(N'lv.LeavePolicy', N'U') IS NULL
BEGIN
CREATE TABLE lv.LeavePolicy
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LeavePolicy PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_LeavePolicy_Organization REFERENCES org.Organization (Id),
    PolicyYear     INT            NOT NULL CONSTRAINT CK_LeavePolicy_Year CHECK (PolicyYear BETWEEN 2000 AND 2100),
    EmploymentType NVARCHAR(50)   NOT NULL,      -- matches ref.LookupValue (EmployeeType) labels, e.g. 'Full Time'
    [Version]      INT            NOT NULL,
    [Status]       VARCHAR(10)    NOT NULL CONSTRAINT CK_LeavePolicy_Status CHECK ([Status] IN ('Draft', 'Published', 'Archived')),
    PublishedAt    DATETIME2(0)   NULL,
    PublishedBy    NVARCHAR(100)  NULL,
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_LeavePolicy_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_LeavePolicy_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL,
    CONSTRAINT UX_LeavePolicy_Version UNIQUE (OrganizationId, PolicyYear, EmploymentType, [Version])
);
-- At most one draft and one published version per year + employment type.
CREATE UNIQUE INDEX UX_LeavePolicy_OneDraft ON lv.LeavePolicy (OrganizationId, PolicyYear, EmploymentType)
    WHERE [Status] = 'Draft' AND IsDeleted = 0;
CREATE UNIQUE INDEX UX_LeavePolicy_OnePublished ON lv.LeavePolicy (OrganizationId, PolicyYear, EmploymentType)
    WHERE [Status] = 'Published' AND IsDeleted = 0;
END
GO

IF OBJECT_ID(N'lv.LeavePolicyItem', N'U') IS NULL
BEGIN
CREATE TABLE lv.LeavePolicyItem
(
    Id                      INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LeavePolicyItem PRIMARY KEY,
    PolicyId                INT            NOT NULL CONSTRAINT FK_LeavePolicyItem_Policy REFERENCES lv.LeavePolicy (Id) ON DELETE CASCADE,
    LeaveTypeId             INT            NOT NULL CONSTRAINT FK_LeavePolicyItem_LeaveType REFERENCES lv.LeaveType (Id),
    Category                VARCHAR(20)    NOT NULL CONSTRAINT CK_LeavePolicyItem_Category CHECK (Category IN ('standard', 'parental', 'additional')),
    AnnualAllowance         DECIMAL(5, 1)  NULL,     -- NULL = no limit (unpaid only)
    CarryForwardDays        DECIMAL(5, 1)  NOT NULL CONSTRAINT DF_LeavePolicyItem_CarryForward DEFAULT (0),
    IsPaid                  BIT            NOT NULL CONSTRAINT DF_LeavePolicyItem_IsPaid DEFAULT (1),
    IsEncashable            BIT            NOT NULL CONSTRAINT DF_LeavePolicyItem_IsEncashable DEFAULT (0),
    MustBeTakenWithinMonths INT            NULL,
    AllowanceBasis          VARCHAR(20)    NOT NULL CONSTRAINT DF_LeavePolicyItem_Basis DEFAULT ('Yearly')
                                           CONSTRAINT CK_LeavePolicyItem_Basis CHECK (AllowanceBasis IN ('Yearly', 'Monthly accrual', 'Pro-rata')),
    ApprovalType            VARCHAR(20)    NOT NULL CONSTRAINT DF_LeavePolicyItem_Approval DEFAULT ('Manager')
                                           CONSTRAINT CK_LeavePolicyItem_Approval CHECK (ApprovalType IN ('Auto', 'Manager', 'HR', 'Manager + HR')),
    CertificateRequired     BIT            NOT NULL CONSTRAINT DF_LeavePolicyItem_Certificate DEFAULT (0),
    CertificateAfterDays    DECIMAL(5, 1)  NULL,
    BackdateDays            INT            NOT NULL CONSTRAINT DF_LeavePolicyItem_Backdate DEFAULT (0),
    MaxConsecutive          DECIMAL(5, 1)  NULL,
    SortOrder               INT            NOT NULL CONSTRAINT DF_LeavePolicyItem_SortOrder DEFAULT (0),
    CONSTRAINT UX_LeavePolicyItem_Type UNIQUE (PolicyId, LeaveTypeId),
    CONSTRAINT CK_LeavePolicyItem_Unlimited CHECK (AnnualAllowance IS NOT NULL OR IsPaid = 0),
    CONSTRAINT CK_LeavePolicyItem_CarryForward CHECK (AnnualAllowance IS NULL OR CarryForwardDays <= AnnualAllowance),
    CONSTRAINT CK_LeavePolicyItem_CertificateDays CHECK (CertificateRequired = 0 OR CertificateAfterDays IS NOT NULL)
);
END
GO

-- Working days between two dates: weekends (Sat/Sun) and company holidays skipped, half day = 0.5.
-- Independent of @@DATEFIRST (1900-01-01 was a Monday).
CREATE OR ALTER FUNCTION lv.fn_working_days
(
    @OrganizationId INT,
    @FromDate       DATE,
    @ToDate         DATE,
    @DayPart        VARCHAR(12)
)
RETURNS TABLE
AS
RETURN
    WITH n AS (
        SELECT TOP (CASE WHEN @ToDate >= @FromDate THEN DATEDIFF(DAY, @FromDate, @ToDate) + 1 ELSE 0 END)
               ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS k
        FROM sys.all_objects
    ),
    d AS (SELECT DATEADD(DAY, k, @FromDate) AS dt FROM n)
    SELECT CAST(COUNT(*) * CASE WHEN @DayPart <> 'full' AND @FromDate = @ToDate THEN 0.5 ELSE 1.0 END AS DECIMAL(5, 1)) AS [Days]
    FROM d
    WHERE DATEDIFF(DAY, '19000101', d.dt) % 7 NOT IN (5, 6)
      AND NOT EXISTS (SELECT 1 FROM org.Holiday h
                      WHERE h.OrganizationId = @OrganizationId AND h.HolidayDate = d.dt
                        AND h.IsDeleted = 0 AND h.IsOptional = 0);
GO

-- Shared shape for request lists.
CREATE OR ALTER FUNCTION lv.fn_leave_requests (@OrganizationId INT)
RETURNS TABLE
AS
RETURN
    SELECT
        r.Id,
        e.EmployeeCode                         AS EmployeeId,
        e.FullName                             AS EmployeeName,
        t.Code                                 AS LeaveType,
        t.Label                                AS LeaveTypeLabel,
        CAST(r.FromDate AS DATETIME2(0))       AS FromDate,
        CAST(r.ToDate AS DATETIME2(0))         AS ToDate,
        r.DayPart,
        r.[Days],
        r.Reason,
        r.[Status],
        a.EmployeeCode                         AS ApproverId,
        a.FullName                             AS ApproverName,
        r.DecisionNote,
        r.DecidedAt,
        r.AppliedAt
    FROM lv.LeaveRequest AS r
    JOIN emp.Employee  AS e ON e.Id = r.EmployeeId
    JOIN lv.LeaveType  AS t ON t.Id = r.LeaveTypeId
    LEFT JOIN emp.Employee AS a ON a.Id = r.ApproverEmployeeId
    WHERE r.OrganizationId = @OrganizationId AND r.IsDeleted = 0;
GO

-- 'Full Time' / 'full-time' / 'FullTime' all compare equal.
CREATE OR ALTER FUNCTION lv.fn_norm_employment_type (@Value NVARCHAR(50))
RETURNS NVARCHAR(50)
AS
BEGIN
    RETURN LOWER(REPLACE(REPLACE(LTRIM(RTRIM(ISNULL(@Value, N''))), N'-', N''), N' ', N''));
END
GO

CREATE OR ALTER FUNCTION lv.fn_employee_type (@EmpPk INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    RETURN ISNULL((SELECT TOP (1) EmployeeType FROM emp.EmploymentDetail
                   WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id DESC), N'Full Time');
END
GO

-- Rules in force for a year + employment type: the published policy, else the lv.LeaveType defaults.
-- IsIncluded = 0 when a published policy exists but leaves this type out.
CREATE OR ALTER FUNCTION lv.fn_policy_rules (@OrganizationId INT, @Year INT, @EmploymentType NVARCHAR(50))
RETURNS TABLE
AS
RETURN
    SELECT
        t.Id AS LeaveTypeId,
        t.Code,
        t.Label,
        t.ShortCode,
        t.[Description],
        COALESCE(i.SortOrder, t.SortOrder) AS SortOrder,
        CAST(CASE WHEN p.Id IS NULL OR i.Id IS NOT NULL THEN 1 ELSE 0 END AS BIT) AS IsIncluded,
        CASE WHEN i.Id IS NOT NULL THEN i.AnnualAllowance ELSE t.AnnualEntitlement END AS Allowance,
        ISNULL(i.CarryForwardDays, 0) AS CarryForwardDays,
        COALESCE(i.BackdateDays, t.BackdateDays) AS BackdateDays,
        CASE WHEN i.Id IS NOT NULL THEN i.MaxConsecutive ELSE t.MaxConsecutive END AS MaxConsecutive,
        CASE WHEN i.Id IS NOT NULL THEN CASE WHEN i.CertificateRequired = 1 THEN i.CertificateAfterDays END
             ELSE t.DocumentAfterDays END AS DocumentAfterDays,
        COALESCE(i.IsPaid, t.IsPaid) AS IsPaid,
        ISNULL(i.ApprovalType, 'Manager') AS ApprovalType
    FROM lv.LeaveType AS t
    LEFT JOIN lv.LeavePolicy AS p
           ON p.OrganizationId = @OrganizationId AND p.PolicyYear = @Year AND p.[Status] = 'Published' AND p.IsDeleted = 0
          AND lv.fn_norm_employment_type(p.EmploymentType) = lv.fn_norm_employment_type(@EmploymentType)
    LEFT JOIN lv.LeavePolicyItem AS i ON i.PolicyId = p.Id AND i.LeaveTypeId = t.Id
    WHERE t.OrganizationId = @OrganizationId AND t.IsActive = 1;
GO

-- Rules for one employee and year, including days carried forward from last year
-- (unused approved balance of last year, capped by this year's CarryForwardDays).
CREATE OR ALTER FUNCTION lv.fn_effective_leave_rules (@OrganizationId INT, @EmpPk INT, @Year INT)
RETURNS TABLE
AS
RETURN
    WITH et AS (SELECT lv.fn_employee_type(@EmpPk) AS EmploymentType),
    cur AS (SELECT r.* FROM et CROSS APPLY lv.fn_policy_rules(@OrganizationId, @Year, et.EmploymentType) AS r),
    prev AS (SELECT r.LeaveTypeId, r.Allowance FROM et CROSS APPLY lv.fn_policy_rules(@OrganizationId, @Year - 1, et.EmploymentType) AS r),
    prevTaken AS (
        SELECT LeaveTypeId, SUM([Days]) AS Taken
        FROM lv.LeaveRequest
        WHERE EmployeeId = @EmpPk AND IsDeleted = 0 AND [Status] = 'Approved'
          AND FromDate >= DATEFROMPARTS(@Year - 1, 1, 1) AND FromDate < DATEFROMPARTS(@Year, 1, 1)
        GROUP BY LeaveTypeId)
    SELECT
        c.*,
        ci.CarryIn,
        CAST(CASE WHEN c.Allowance IS NULL THEN NULL ELSE c.Allowance + ci.CarryIn END AS DECIMAL(6, 1)) AS Entitlement
    FROM cur AS c
    LEFT JOIN prev AS pv ON pv.LeaveTypeId = c.LeaveTypeId
    LEFT JOIN prevTaken AS pt ON pt.LeaveTypeId = c.LeaveTypeId
    CROSS APPLY (SELECT CAST(
        CASE WHEN c.Allowance IS NULL OR c.CarryForwardDays <= 0 OR pv.Allowance IS NULL THEN 0
             WHEN pv.Allowance - ISNULL(pt.Taken, 0) <= 0 THEN 0
             WHEN pv.Allowance - ISNULL(pt.Taken, 0) < c.CarryForwardDays THEN pv.Allowance - ISNULL(pt.Taken, 0)
             ELSE c.CarryForwardDays END AS DECIMAL(5, 1)) AS CarryIn) AS ci;
GO

/* GET api/v1/leave/types?employeeId=&year=
   With an employee: the rules in force for them that year (published policy + carry-forward).
   Without: the organization's leave type catalog. */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_types
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50) = NULL,
    @Year           INT         = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    IF @Employee_Id IS NOT NULL AND @EmpPk IS NULL THROW 50201, 'Employee not found.', 1;

    IF @EmpPk IS NULL
    BEGIN
        SELECT Code, Label, ShortCode, [Description], AnnualEntitlement, CAST(0 AS DECIMAL(5, 1)) AS CarryIn,
               BackdateDays, MaxConsecutive, DocumentAfterDays, IsPaid, 'Manager' AS ApprovalType
        FROM lv.LeaveType
        WHERE OrganizationId = @OrganizationId AND IsActive = 1
        ORDER BY SortOrder, Id;
        RETURN;
    END

    SELECT Code, Label, ShortCode, [Description], Entitlement AS AnnualEntitlement, CarryIn,
           BackdateDays, MaxConsecutive, DocumentAfterDays, IsPaid, ApprovalType
    FROM lv.fn_effective_leave_rules(@OrganizationId, @EmpPk, ISNULL(@Year, YEAR(GETDATE())))
    WHERE IsIncluded = 1
    ORDER BY SortOrder, LeaveTypeId;
END
GO

/* GET api/v1/leave/holidays?year= */
CREATE OR ALTER PROCEDURE dbo.sp_get_holidays
    @OrganizationId INT,
    @Year           INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT CAST(HolidayDate AS DATETIME2(0)) AS [Date], [Name], IsOptional
    FROM org.Holiday
    WHERE OrganizationId = @OrganizationId AND IsDeleted = 0
      AND HolidayDate >= DATEFROMPARTS(@Year, 1, 1) AND HolidayDate < DATEFROMPARTS(@Year + 1, 1, 1)
    ORDER BY HolidayDate;
END
GO

/* GET api/v1/leave/balances?employeeId=&year= */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_balances
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Year           INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50201, 'Employee not found.', 1;

    SELECT
        r.Code AS LeaveType,
        r.Label,
        r.Entitlement,
        r.CarryIn,
        CAST(ISNULL(SUM(CASE WHEN q.[Status] = 'Approved' THEN q.[Days] END), 0) AS DECIMAL(5, 1)) AS Used,
        CAST(ISNULL(SUM(CASE WHEN q.[Status] = 'Pending'  THEN q.[Days] END), 0) AS DECIMAL(5, 1)) AS Pending,
        CASE WHEN r.Entitlement IS NULL THEN NULL
             ELSE CAST(CASE WHEN r.Entitlement - ISNULL(SUM(CASE WHEN q.[Status] IN ('Approved', 'Pending') THEN q.[Days] END), 0) < 0 THEN 0
                            ELSE r.Entitlement - ISNULL(SUM(CASE WHEN q.[Status] IN ('Approved', 'Pending') THEN q.[Days] END), 0) END AS DECIMAL(6, 1))
        END AS Available
    FROM lv.fn_effective_leave_rules(@OrganizationId, @EmpPk, @Year) AS r
    LEFT JOIN lv.LeaveRequest AS q
           ON q.LeaveTypeId = r.LeaveTypeId AND q.EmployeeId = @EmpPk AND q.IsDeleted = 0
          AND q.FromDate >= DATEFROMPARTS(@Year, 1, 1) AND q.FromDate < DATEFROMPARTS(@Year + 1, 1, 1)
    WHERE r.IsIncluded = 1
    GROUP BY r.LeaveTypeId, r.Code, r.Label, r.Entitlement, r.CarryIn, r.SortOrder
    ORDER BY r.SortOrder, r.LeaveTypeId;
END
GO

/* GET api/v1/leave/requests?employeeId=&status= */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_requests
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Status         VARCHAR(12) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM lv.fn_leave_requests(@OrganizationId)
    WHERE EmployeeId = @Employee_Id
      AND (@Status IS NULL OR @Status = 'All' OR [Status] = @Status)
    ORDER BY FromDate DESC, Id DESC;
END
GO

/* GET api/v1/leave/requests/{id} */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_request
    @OrganizationId INT,
    @Id             INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM lv.fn_leave_requests(@OrganizationId) WHERE Id = @Id;
END
GO

/* GET api/v1/leave/approvals?approverId= (NULL = every pending request in the org, for HR) */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_approvals
    @OrganizationId INT,
    @Approver_Id    VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM lv.fn_leave_requests(@OrganizationId)
    WHERE [Status] = 'Pending'
      AND (@Approver_Id IS NULL OR ApproverId = @Approver_Id)
    ORDER BY FromDate, Id;
END
GO

/* POST api/v1/leave/requests. Every business rule is checked here so no client can skip them.
   Rules come from the employee's published leave policy for YEAR(@FromDate) (lv.fn_effective_leave_rules). */
CREATE OR ALTER PROCEDURE dbo.sp_apply_leave
    @Id             INT            = NULL OUTPUT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @LeaveType      VARCHAR(20),
    @FromDate       DATE,
    @ToDate         DATE,
    @DayPart        VARCHAR(12)    = 'full',
    @Reason         NVARCHAR(500),
    @UserId         NVARCHAR(100)  = NULL,
    @ResultMessage  VARCHAR(200)   = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50201, 'Employee not found.', 1;

    DECLARE @TypeId INT, @Label NVARCHAR(50), @Entitlement DECIMAL(6, 1), @Backdate INT, @MaxDays DECIMAL(5, 1),
            @Included BIT, @Approval VARCHAR(20);
    SELECT @TypeId = LeaveTypeId, @Label = Label, @Entitlement = Entitlement, @Backdate = BackdateDays,
           @MaxDays = MaxConsecutive, @Included = IsIncluded, @Approval = ApprovalType
    FROM lv.fn_effective_leave_rules(@OrganizationId, @EmpPk, YEAR(@FromDate))
    WHERE Code = @LeaveType;
    IF @TypeId IS NULL THROW 50202, 'Unknown leave type.', 1;

    DECLARE @Msg NVARCHAR(400);
    IF @Included = 0
    BEGIN
        SET @Msg = CONCAT(@Label, N' is not part of your leave policy for ', YEAR(@FromDate), N'.');
        THROW 50214, @Msg, 1;
    END

    IF @ToDate < @FromDate THROW 50203, 'End date must be on or after the start date.', 1;
    IF ISNULL(@DayPart, 'full') <> 'full' AND @FromDate <> @ToDate THROW 50204, 'Half day applies to a single date only.', 1;
    IF DATEDIFF(DAY, @FromDate, @ToDate) > 366 THROW 50205, 'A leave request can cover at most one year.', 1;

    DECLARE @Today DATE = CAST(GETDATE() AS DATE);
    IF @FromDate < DATEADD(DAY, -@Backdate, @Today)
    BEGIN
        SET @Msg = CASE WHEN @Backdate > 0
                        THEN CONCAT(@Label, N' can start at most ', @Backdate, N' days ago.')
                        ELSE CONCAT(@Label, N' can''t start in the past.') END;
        THROW 50206, @Msg, 1;
    END

    DECLARE @Days DECIMAL(5, 1) = (SELECT [Days] FROM lv.fn_working_days(@OrganizationId, @FromDate, @ToDate, ISNULL(@DayPart, 'full')));
    IF @Days = 0 THROW 50207, 'These dates are all weekends or holidays.', 1;
    IF @MaxDays IS NOT NULL AND @Days > @MaxDays
    BEGIN
        SET @Msg = CONCAT(@Label, N' allows at most ', CAST(@MaxDays AS FLOAT), N' days in one request.');
        THROW 50208, @Msg, 1;
    END

    BEGIN TRANSACTION;

    -- Lock this employee's rows so two parallel submits can't both pass the checks.
    IF EXISTS (SELECT 1 FROM lv.LeaveRequest WITH (UPDLOCK, HOLDLOCK)
               WHERE EmployeeId = @EmpPk AND IsDeleted = 0 AND [Status] IN ('Pending', 'Approved')
                 AND FromDate <= @ToDate AND ToDate >= @FromDate)
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50209, 'These dates overlap another pending or approved leave request.', 1;
    END

    IF @Entitlement IS NOT NULL
    BEGIN
        DECLARE @Taken DECIMAL(6, 1) = ISNULL((
            SELECT SUM([Days]) FROM lv.LeaveRequest WITH (UPDLOCK, HOLDLOCK)
            WHERE EmployeeId = @EmpPk AND LeaveTypeId = @TypeId AND IsDeleted = 0
              AND [Status] IN ('Pending', 'Approved') AND YEAR(FromDate) = YEAR(@FromDate)), 0);
        IF @Taken + @Days > @Entitlement
        BEGIN
            ROLLBACK TRANSACTION;
            SET @Msg = CONCAT(N'Only ', CAST(CASE WHEN @Entitlement - @Taken < 0 THEN 0 ELSE @Entitlement - @Taken END AS FLOAT),
                              N' ', @Label, N' day(s) left. Shorten the request or choose Loss of Pay.');
            THROW 50210, @Msg, 1;
        END
    END

    DECLARE @ApproverPk INT = (
        SELECT TOP (1) dbo.fn_employee_pk(d.ReportingManager)
        FROM emp.EmploymentDetail AS d
        WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0
        ORDER BY d.Id DESC);

    DECLARE @Auto BIT = CASE WHEN @Approval = 'Auto' THEN 1 ELSE 0 END;

    INSERT lv.LeaveRequest
        (OrganizationId, EmployeeId, LeaveTypeId, FromDate, ToDate, DayPart, [Days], Reason, [Status],
         ApproverEmployeeId, DecisionNote, DecidedAt, CreatedBy)
    VALUES
        (@OrganizationId, @EmpPk, @TypeId, @FromDate, @ToDate, ISNULL(@DayPart, 'full'), @Days, LTRIM(RTRIM(@Reason)),
         CASE WHEN @Auto = 1 THEN 'Approved' ELSE 'Pending' END,
         @ApproverPk,
         CASE WHEN @Auto = 1 THEN N'Auto-approved by leave policy' END,
         CASE WHEN @Auto = 1 THEN SYSUTCDATETIME() END,
         @UserId);

    SET @Id = SCOPE_IDENTITY();
    COMMIT TRANSACTION;

    SET @ResultMessage = CONCAT(CASE WHEN @Auto = 1 THEN 'Leave approved for ' ELSE 'Leave request sent for ' END,
                                CAST(@Days AS FLOAT), CASE WHEN @Days = 1 THEN ' day.' ELSE ' days.' END);
END
GO

/* GET api/v1/leave/employment-types */
CREATE OR ALTER PROCEDURE dbo.sp_get_employment_types
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Label AS [Name]
    FROM ref.LookupValue
    WHERE LookupType = 'EmployeeType' AND IsActive = 1
    ORDER BY SortOrder, Id;
END
GO

/* GET api/v1/leave/policies?year=  One row per year + employment type with its published / draft state. */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_policies
    @OrganizationId INT,
    @Year           INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        p.PolicyYear     AS [Year],
        p.EmploymentType,
        MAX(CASE WHEN p.[Status] = 'Published' THEN p.[Version] END)     AS PublishedVersion,
        MAX(CASE WHEN p.[Status] = 'Published' THEN p.PublishedAt END)   AS PublishedAt,
        CAST(MAX(CASE WHEN p.[Status] = 'Draft' THEN 1 ELSE 0 END) AS BIT) AS HasDraft,
        MAX(CASE WHEN p.[Status] = 'Draft' THEN ISNULL(p.UpdatedAt, p.CreatedAt) END) AS DraftUpdatedAt,
        SUM(CASE WHEN p.[Status] = 'Published' THEN (SELECT COUNT(*) FROM lv.LeavePolicyItem i WHERE i.PolicyId = p.Id) ELSE 0 END) AS PublishedItemCount
    FROM lv.LeavePolicy AS p
    WHERE p.OrganizationId = @OrganizationId AND p.IsDeleted = 0 AND p.[Status] IN ('Draft', 'Published')
      AND (@Year IS NULL OR p.PolicyYear = @Year)
    GROUP BY p.PolicyYear, p.EmploymentType
    ORDER BY p.PolicyYear DESC, p.EmploymentType;
END
GO

/* Header of one policy version. @Status NULL = the draft if there is one, else the published version.
   Returns no row when neither exists. */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_policy
    @OrganizationId INT,
    @Year           INT,
    @EmploymentType NVARCHAR(50),
    @Status         VARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Type NVARCHAR(50) = lv.fn_norm_employment_type(@EmploymentType);

    WITH v AS (
        SELECT p.*, lv.fn_norm_employment_type(p.EmploymentType) AS NormType
        FROM lv.LeavePolicy AS p
        WHERE p.OrganizationId = @OrganizationId AND p.PolicyYear = @Year AND p.IsDeleted = 0
          AND p.[Status] IN ('Draft', 'Published'))
    SELECT TOP (1)
        v.Id, v.PolicyYear AS [Year], v.EmploymentType, v.[Version], v.[Status],
        v.PublishedAt, v.PublishedBy, ISNULL(v.UpdatedAt, v.CreatedAt) AS UpdatedAt, ISNULL(v.UpdatedBy, v.CreatedBy) AS UpdatedBy,
        CAST(CASE WHEN EXISTS (SELECT 1 FROM v AS x WHERE x.NormType = @Type AND x.[Status] = 'Published') THEN 1 ELSE 0 END AS BIT) AS HasPublished,
        (SELECT TOP (1) x.[Version] FROM v AS x WHERE x.NormType = @Type AND x.[Status] = 'Published') AS PublishedVersion
    FROM v
    WHERE v.NormType = @Type AND (@Status IS NULL OR v.[Status] = @Status)
    ORDER BY CASE WHEN v.[Status] = 'Draft' THEN 0 ELSE 1 END;
END
GO

/* Items of one policy version. @PolicyId NULL = the organization's leave type defaults (starting point for a new policy). */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_policy_items
    @OrganizationId INT,
    @PolicyId       INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    IF @PolicyId IS NULL
    BEGIN
        SELECT t.Code, t.Label, t.[Description], t.Category,
               t.AnnualEntitlement AS AnnualAllowance, CAST(0 AS DECIMAL(5, 1)) AS CarryForwardDays,
               t.IsPaid, CAST(0 AS BIT) AS IsEncashable, CAST(NULL AS INT) AS MustBeTakenWithinMonths,
               'Yearly' AS AllowanceBasis, 'Manager' AS ApprovalType,
               CAST(CASE WHEN t.DocumentAfterDays IS NULL THEN 0 ELSE 1 END AS BIT) AS CertificateRequired,
               t.DocumentAfterDays AS CertificateAfterDays, t.BackdateDays, t.MaxConsecutive, t.SortOrder
        FROM lv.LeaveType AS t
        WHERE t.OrganizationId = @OrganizationId AND t.IsActive = 1
        ORDER BY t.SortOrder, t.Id;
        RETURN;
    END

    SELECT t.Code, t.Label, t.[Description], i.Category,
           i.AnnualAllowance, i.CarryForwardDays, i.IsPaid, i.IsEncashable, i.MustBeTakenWithinMonths,
           i.AllowanceBasis, i.ApprovalType, i.CertificateRequired, i.CertificateAfterDays,
           i.BackdateDays, i.MaxConsecutive, i.SortOrder
    FROM lv.LeavePolicyItem AS i
    JOIN lv.LeavePolicy AS p ON p.Id = i.PolicyId AND p.OrganizationId = @OrganizationId AND p.IsDeleted = 0
    JOIN lv.LeaveType  AS t ON t.Id = i.LeaveTypeId
    WHERE i.PolicyId = @PolicyId
    ORDER BY i.SortOrder, i.Id;
END
GO

/* PUT api/v1/leave/policies/draft
   @Json = [{ code, label, description, category, annualAllowance, carryForwardDays, isPaid, isEncashable,
              mustBeTakenWithinMonths, allowanceBasis, approvalType, certificateRequired, certificateAfterDays,
              backdateDays, maxConsecutive }]
   Creates the draft version when missing (next version number) and replaces all its items.
   New codes are added to the lv.LeaveType catalog. */
CREATE OR ALTER PROCEDURE dbo.sp_save_leave_policy_draft
    @OrganizationId INT,
    @Year           INT,
    @EmploymentType NVARCHAR(50),
    @Json           NVARCHAR(MAX),
    @UserId         NVARCHAR(100) = NULL,
    @PolicyId       INT           = NULL OUTPUT,
    @ResultMessage  VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF @Json IS NULL OR ISJSON(@Json) = 0 THROW 50221, 'Policy items must be a JSON array.', 1;

    SELECT
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS RowNo,
        LOWER(LTRIM(RTRIM(j.Code)))   AS Code,
        LTRIM(RTRIM(j.Label))         AS Label,
        NULLIF(LTRIM(RTRIM(j.[Description])), N'') AS [Description],
        ISNULL(j.Category, 'standard') AS Category,
        j.AnnualAllowance,
        ISNULL(j.CarryForwardDays, 0) AS CarryForwardDays,
        ISNULL(j.IsPaid, 1)           AS IsPaid,
        ISNULL(j.IsEncashable, 0)     AS IsEncashable,
        j.MustBeTakenWithinMonths,
        ISNULL(j.AllowanceBasis, 'Yearly')  AS AllowanceBasis,
        ISNULL(j.ApprovalType, 'Manager')   AS ApprovalType,
        ISNULL(j.CertificateRequired, 0)    AS CertificateRequired,
        CASE WHEN ISNULL(j.CertificateRequired, 0) = 1 THEN j.CertificateAfterDays END AS CertificateAfterDays,
        ISNULL(j.BackdateDays, 0)     AS BackdateDays,
        j.MaxConsecutive
    INTO #Items
    FROM OPENJSON(@Json) WITH (
        Code                    VARCHAR(20)    '$.code',
        Label                   NVARCHAR(50)   '$.label',
        [Description]           NVARCHAR(200)  '$.description',
        Category                VARCHAR(20)    '$.category',
        AnnualAllowance         DECIMAL(5, 1)  '$.annualAllowance',
        CarryForwardDays        DECIMAL(5, 1)  '$.carryForwardDays',
        IsPaid                  BIT            '$.isPaid',
        IsEncashable            BIT            '$.isEncashable',
        MustBeTakenWithinMonths INT            '$.mustBeTakenWithinMonths',
        AllowanceBasis          VARCHAR(20)    '$.allowanceBasis',
        ApprovalType            VARCHAR(20)    '$.approvalType',
        CertificateRequired     BIT            '$.certificateRequired',
        CertificateAfterDays    DECIMAL(5, 1)  '$.certificateAfterDays',
        BackdateDays            INT            '$.backdateDays',
        MaxConsecutive          DECIMAL(5, 1)  '$.maxConsecutive'
    ) AS j;

    IF EXISTS (SELECT 1 FROM #Items WHERE Code IS NULL OR Code = '' OR Label IS NULL OR Label = N'')
        THROW 50221, 'Every leave type needs a code and a name.', 1;
    IF EXISTS (SELECT Code FROM #Items GROUP BY Code HAVING COUNT(*) > 1)
        THROW 50222, 'The same leave type appears twice in this policy.', 1;

    DECLARE @Type NVARCHAR(50) = LTRIM(RTRIM(@EmploymentType));

    BEGIN TRANSACTION;

    -- Catalog: add new codes, keep names/descriptions in sync.
    UPDATE t
       SET Label = i.Label, [Description] = ISNULL(i.[Description], t.[Description]), Category = i.Category,
           IsActive = 1, UpdatedAt = SYSUTCDATETIME()
    FROM lv.LeaveType AS t
    JOIN #Items AS i ON i.Code = t.Code
    WHERE t.OrganizationId = @OrganizationId;

    INSERT lv.LeaveType (OrganizationId, Code, Label, ShortCode, [Description], AnnualEntitlement, BackdateDays,
                         MaxConsecutive, DocumentAfterDays, IsPaid, SortOrder, Category)
    SELECT @OrganizationId, i.Code, i.Label,
           UPPER(LEFT(REPLACE(i.Code, '-', ''), 3)),
           i.[Description], i.AnnualAllowance, i.BackdateDays, i.MaxConsecutive, i.CertificateAfterDays, i.IsPaid,
           100 + i.RowNo, i.Category
    FROM #Items AS i
    WHERE NOT EXISTS (SELECT 1 FROM lv.LeaveType t WHERE t.OrganizationId = @OrganizationId AND t.Code = i.Code);

    -- Find or create the draft version.
    SELECT @PolicyId = Id
    FROM lv.LeavePolicy WITH (UPDLOCK, HOLDLOCK)
    WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year AND [Status] = 'Draft' AND IsDeleted = 0
      AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@Type);

    IF @PolicyId IS NULL
    BEGIN
        DECLARE @Version INT = ISNULL((
            SELECT MAX([Version]) FROM lv.LeavePolicy WITH (UPDLOCK, HOLDLOCK)
            WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year
              AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@Type)), 0) + 1;

        -- Keep the spelling already used for this employment type.
        SELECT TOP (1) @Type = EmploymentType FROM lv.LeavePolicy
        WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year
          AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@Type);

        INSERT lv.LeavePolicy (OrganizationId, PolicyYear, EmploymentType, [Version], [Status], CreatedBy)
        VALUES (@OrganizationId, @Year, @Type, @Version, 'Draft', @UserId);
        SET @PolicyId = SCOPE_IDENTITY();
    END
    ELSE
        UPDATE lv.LeavePolicy SET UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE Id = @PolicyId;

    DELETE lv.LeavePolicyItem WHERE PolicyId = @PolicyId;

    INSERT lv.LeavePolicyItem (PolicyId, LeaveTypeId, Category, AnnualAllowance, CarryForwardDays, IsPaid, IsEncashable,
                               MustBeTakenWithinMonths, AllowanceBasis, ApprovalType, CertificateRequired,
                               CertificateAfterDays, BackdateDays, MaxConsecutive, SortOrder)
    SELECT @PolicyId, t.Id, i.Category, i.AnnualAllowance, i.CarryForwardDays, i.IsPaid, i.IsEncashable,
           i.MustBeTakenWithinMonths, i.AllowanceBasis, i.ApprovalType, i.CertificateRequired,
           i.CertificateAfterDays, i.BackdateDays, i.MaxConsecutive, i.RowNo
    FROM #Items AS i
    JOIN lv.LeaveType AS t ON t.OrganizationId = @OrganizationId AND t.Code = i.Code;

    COMMIT TRANSACTION;

    DECLARE @Count INT = (SELECT COUNT(*) FROM #Items);
    SET @ResultMessage = CONCAT('Draft saved with ', @Count, CASE WHEN @Count = 1 THEN ' leave type.' ELSE ' leave types.' END);
END
GO

/* POST api/v1/leave/policies/publish  The draft goes live; the previous published version is archived. */
CREATE OR ALTER PROCEDURE dbo.sp_publish_leave_policy
    @OrganizationId INT,
    @Year           INT,
    @EmploymentType NVARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @DraftId INT;
    SELECT @DraftId = Id FROM lv.LeavePolicy
    WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year AND [Status] = 'Draft' AND IsDeleted = 0
      AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@EmploymentType);

    IF @DraftId IS NULL THROW 50223, 'There is no draft to publish. Save a draft first.', 1;
    IF NOT EXISTS (SELECT 1 FROM lv.LeavePolicyItem WHERE PolicyId = @DraftId)
        THROW 50224, 'Add at least one leave type before publishing.', 1;

    BEGIN TRANSACTION;

    UPDATE lv.LeavePolicy
       SET [Status] = 'Archived', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year AND [Status] = 'Published' AND IsDeleted = 0
       AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@EmploymentType);

    UPDATE lv.LeavePolicy
       SET [Status] = 'Published', PublishedAt = SYSUTCDATETIME(), PublishedBy = @UserId,
           UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @DraftId;
    SET @Affected = @@ROWCOUNT;

    COMMIT TRANSACTION;
END
GO

/* POST api/v1/leave/policies/discard  Throws the draft away (published version stays). */
CREATE OR ALTER PROCEDURE dbo.sp_discard_leave_policy_draft
    @OrganizationId INT,
    @Year           INT,
    @EmploymentType NVARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE lv.LeavePolicy
       SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE OrganizationId = @OrganizationId AND PolicyYear = @Year AND [Status] = 'Draft' AND IsDeleted = 0
       AND lv.fn_norm_employment_type(EmploymentType) = lv.fn_norm_employment_type(@EmploymentType);
    SET @Affected = @@ROWCOUNT;
END
GO

/* POST api/v1/leave/policies/copy  { sourceYear, targetYear, employmentType? }
   Creates target-year drafts from the source year's published policy (else its draft).
   Employment types that already have a target-year policy are skipped. */
CREATE OR ALTER PROCEDURE dbo.sp_copy_leave_policy
    @OrganizationId INT,
    @SourceYear     INT,
    @TargetYear     INT,
    @EmploymentType NVARCHAR(50)  = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF @SourceYear = @TargetYear THROW 50225, 'Pick a different year to copy to.', 1;

    -- One source version per employment type: published first, else draft.
    SELECT s.Id, s.EmploymentType
    INTO #Src
    FROM (
        SELECT p.Id, p.EmploymentType,
               ROW_NUMBER() OVER (PARTITION BY lv.fn_norm_employment_type(p.EmploymentType)
                                  ORDER BY CASE WHEN p.[Status] = 'Published' THEN 0 ELSE 1 END) AS rn
        FROM lv.LeavePolicy AS p
        WHERE p.OrganizationId = @OrganizationId AND p.PolicyYear = @SourceYear AND p.IsDeleted = 0
          AND p.[Status] IN ('Draft', 'Published')
          AND (@EmploymentType IS NULL OR lv.fn_norm_employment_type(p.EmploymentType) = lv.fn_norm_employment_type(@EmploymentType))
    ) AS s
    WHERE s.rn = 1
      AND NOT EXISTS (SELECT 1 FROM lv.LeavePolicy t
                      WHERE t.OrganizationId = @OrganizationId AND t.PolicyYear = @TargetYear AND t.IsDeleted = 0
                        AND t.[Status] IN ('Draft', 'Published')
                        AND lv.fn_norm_employment_type(t.EmploymentType) = lv.fn_norm_employment_type(s.EmploymentType));

    IF NOT EXISTS (SELECT 1 FROM #Src)
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM lv.LeavePolicy WHERE OrganizationId = @OrganizationId AND PolicyYear = @SourceYear AND IsDeleted = 0)
        BEGIN
            DECLARE @Msg NVARCHAR(200) = CONCAT(N'There is no ', @SourceYear, N' policy to copy.');
            THROW 50226, @Msg, 1;
        END
        SET @Affected = 0;
        RETURN;
    END

    BEGIN TRANSACTION;

    DECLARE @Map TABLE (SourceId INT, NewId INT);

    MERGE lv.LeavePolicy AS target
    USING (SELECT s.Id, s.EmploymentType,
                  ISNULL((SELECT MAX(x.[Version]) FROM lv.LeavePolicy x
                          WHERE x.OrganizationId = @OrganizationId AND x.PolicyYear = @TargetYear
                            AND lv.fn_norm_employment_type(x.EmploymentType) = lv.fn_norm_employment_type(s.EmploymentType)), 0) + 1 AS NextVersion
           FROM #Src AS s) AS src
    ON 1 = 0
    WHEN NOT MATCHED THEN
        INSERT (OrganizationId, PolicyYear, EmploymentType, [Version], [Status], CreatedBy)
        VALUES (@OrganizationId, @TargetYear, src.EmploymentType, src.NextVersion, 'Draft', @UserId)
    OUTPUT src.Id, inserted.Id INTO @Map (SourceId, NewId);

    INSERT lv.LeavePolicyItem (PolicyId, LeaveTypeId, Category, AnnualAllowance, CarryForwardDays, IsPaid, IsEncashable,
                               MustBeTakenWithinMonths, AllowanceBasis, ApprovalType, CertificateRequired,
                               CertificateAfterDays, BackdateDays, MaxConsecutive, SortOrder)
    SELECT m.NewId, i.LeaveTypeId, i.Category, i.AnnualAllowance, i.CarryForwardDays, i.IsPaid, i.IsEncashable,
           i.MustBeTakenWithinMonths, i.AllowanceBasis, i.ApprovalType, i.CertificateRequired,
           i.CertificateAfterDays, i.BackdateDays, i.MaxConsecutive, i.SortOrder
    FROM @Map AS m
    JOIN lv.LeavePolicyItem AS i ON i.PolicyId = m.SourceId;

    SET @Affected = (SELECT COUNT(*) FROM @Map);
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/leave/requests/{id}/withdraw: pending, or approved and not started yet. */
CREATE OR ALTER PROCEDURE dbo.sp_withdraw_leave
    @Id             INT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    DECLARE @Status VARCHAR(12), @FromDate DATE;
    SELECT @Status = [Status], @FromDate = FromDate
    FROM lv.LeaveRequest
    WHERE Id = @Id AND OrganizationId = @OrganizationId AND EmployeeId = @EmpPk AND IsDeleted = 0;

    IF @Status IS NULL BEGIN SET @Affected = 0; RETURN; END
    IF NOT (@Status = 'Pending' OR (@Status = 'Approved' AND @FromDate > CAST(GETDATE() AS DATE)))
        THROW 50211, 'Only pending requests, or approved ones that have not started, can be withdrawn.', 1;

    UPDATE lv.LeaveRequest
       SET [Status] = 'Cancelled', DecisionNote = N'Withdrawn by employee', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;
END
GO

/* POST api/v1/leave/requests/{id}/decision  { approve, note } */
CREATE OR ALTER PROCEDURE dbo.sp_decide_leave
    @Id             INT,
    @OrganizationId INT,
    @Approve        BIT,
    @Note           NVARCHAR(500) = NULL,
    @Approver_Id    VARCHAR(50)   = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Status VARCHAR(12);
    SELECT @Status = [Status] FROM lv.LeaveRequest
    WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;

    IF @Status IS NULL BEGIN SET @Affected = 0; RETURN; END
    IF @Status <> 'Pending' THROW 50212, 'This request has already been decided.', 1;
    IF @Approve = 0 AND NULLIF(LTRIM(RTRIM(@Note)), N'') IS NULL THROW 50213, 'Add a note when rejecting a request.', 1;

    UPDATE lv.LeaveRequest
       SET [Status] = CASE WHEN @Approve = 1 THEN 'Approved' ELSE 'Rejected' END,
           DecisionNote = NULLIF(LTRIM(RTRIM(@Note)), N''),
           ApproverEmployeeId = ISNULL(dbo.fn_employee_pk(@Approver_Id), ApproverEmployeeId),
           DecidedAt = SYSUTCDATETIME(), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;
END
GO

-- Reference + demo data (only when empty).
IF NOT EXISTS (SELECT 1 FROM lv.LeaveType) AND EXISTS (SELECT 1 FROM org.Organization)
BEGIN
    DECLARE @Org INT = (SELECT MIN(Id) FROM org.Organization);
    INSERT lv.LeaveType (OrganizationId, Code, Label, ShortCode, [Description], AnnualEntitlement, BackdateDays, MaxConsecutive, DocumentAfterDays, IsPaid, SortOrder)
    VALUES
    (@Org, 'earned',      N'Earned Leave', 'EL',  N'Planned time off. Apply in advance.',                                12,   0, 15,   NULL, 1, 1),
    (@Org, 'casual',      N'Casual Leave', 'CL',  N'Short personal errands, up to 3 days at a time.',                    6,    0, 3,    NULL, 1, 2),
    (@Org, 'sick',        N'Sick Leave',   'SL',  N'Illness or medical appointments. Can be applied up to 7 days later.', 6,    7, NULL, 2,    1, 3),
    (@Org, 'comp-off',    N'Comp Off',     'CO',  N'For weekends or holidays you worked.',                               2,    0, 2,    NULL, 1, 4),
    (@Org, 'loss-of-pay', N'Loss of Pay',  'LOP', N'Unpaid leave when other balances are used up.',                      NULL, 0, 30,   NULL, 0, 5);
END
GO

IF NOT EXISTS (SELECT 1 FROM org.Holiday) AND EXISTS (SELECT 1 FROM org.Organization)
BEGIN
    DECLARE @HolOrg INT = (SELECT MIN(Id) FROM org.Organization);
    INSERT org.Holiday (OrganizationId, HolidayDate, [Name]) VALUES
    (@HolOrg, '2026-01-01', N'New Year'),
    (@HolOrg, '2026-01-26', N'Republic Day'),
    (@HolOrg, '2026-03-04', N'Holi'),
    (@HolOrg, '2026-08-15', N'Independence Day'),
    (@HolOrg, '2026-10-02', N'Gandhi Jayanti'),
    (@HolOrg, '2026-10-20', N'Diwali'),
    (@HolOrg, '2026-11-24', N'Guru Nanak Jayanti'),
    (@HolOrg, '2026-12-25', N'Christmas'),
    (@HolOrg, '2027-01-01', N'New Year'),
    (@HolOrg, '2027-01-26', N'Republic Day');
END
GO

-- Catalog additions for the policy manager (safe to re-run: only missing codes are added).
IF EXISTS (SELECT 1 FROM org.Organization)
BEGIN
    DECLARE @CatOrg INT = (SELECT MIN(Id) FROM org.Organization);
    INSERT lv.LeaveType (OrganizationId, Code, Label, ShortCode, [Description], AnnualEntitlement, BackdateDays, MaxConsecutive, DocumentAfterDays, IsPaid, SortOrder, Category)
    SELECT @CatOrg, s.Code, s.Label, s.ShortCode, s.[Description], s.Days, 0, s.MaxDays, s.DocAfter, 1, s.SortOrder, 'parental'
    FROM (VALUES
        ('maternity', N'Maternity Leave', 'ML', N'Paid leave around childbirth or adoption (26 weeks).', CAST(182 AS DECIMAL(5, 1)), CAST(182 AS DECIMAL(5, 1)), CAST(1 AS DECIMAL(5, 1)), 6),
        ('paternity', N'Paternity Leave', 'PL', N'Time off for new fathers, within 3 months of the birth.', CAST(5 AS DECIMAL(5, 1)),   CAST(5 AS DECIMAL(5, 1)),   CAST(NULL AS DECIMAL(5, 1)), 7)
    ) AS s (Code, Label, ShortCode, [Description], Days, MaxDays, DocAfter, SortOrder)
    WHERE NOT EXISTS (SELECT 1 FROM lv.LeaveType t WHERE t.OrganizationId = @CatOrg AND t.Code = s.Code);

    -- First run only (rows nobody has edited yet).
    UPDATE lv.LeaveType SET Category = 'additional'
    WHERE OrganizationId = @CatOrg AND Code IN ('comp-off', 'loss-of-pay') AND Category = 'standard' AND UpdatedAt IS NULL;
END
GO

-- Demo policies: this year's Full Time policy is published, Part Time has a draft in progress.
IF NOT EXISTS (SELECT 1 FROM lv.LeavePolicy) AND EXISTS (SELECT 1 FROM lv.LeaveType)
BEGIN
    DECLARE @PolOrg INT = (SELECT MIN(Id) FROM org.Organization);
    DECLARE @PolYear INT = YEAR(GETDATE());
    DECLARE @FullTime INT, @PartTime INT;

    INSERT lv.LeavePolicy (OrganizationId, PolicyYear, EmploymentType, [Version], [Status], PublishedAt, PublishedBy, CreatedBy)
    VALUES (@PolOrg, @PolYear, N'Full Time', 1, 'Published', SYSUTCDATETIME(), N'seed', N'seed');
    SET @FullTime = SCOPE_IDENTITY();

    INSERT lv.LeavePolicy (OrganizationId, PolicyYear, EmploymentType, [Version], [Status], CreatedBy)
    VALUES (@PolOrg, @PolYear, N'Part Time', 1, 'Draft', N'seed');
    SET @PartTime = SCOPE_IDENTITY();

    INSERT lv.LeavePolicyItem (PolicyId, LeaveTypeId, Category, AnnualAllowance, CarryForwardDays, IsPaid, IsEncashable,
                               MustBeTakenWithinMonths, AllowanceBasis, ApprovalType, CertificateRequired, CertificateAfterDays,
                               BackdateDays, MaxConsecutive, SortOrder)
    SELECT p.PolicyId, t.Id, s.Category, s.Allowance, s.CarryForward, s.IsPaid, s.Encash, s.WithinMonths, s.Basis, s.Approval,
           s.Cert, s.CertAfter, s.Backdate, s.MaxDays, s.SortOrder
    FROM (VALUES
        -- Full Time (published)
        ('FT', 'earned',      'standard',   CAST(12 AS DECIMAL(5,1)),  CAST(5 AS DECIMAL(5,1)), 1, 1, NULL, 'Monthly accrual', 'Manager',      0, CAST(NULL AS DECIMAL(5,1)), 0, CAST(15 AS DECIMAL(5,1)),  1),
        ('FT', 'casual',      'standard',   6,    0, 1, 0, NULL, 'Yearly',          'Manager',      0, NULL, 0, 3,    2),
        ('FT', 'sick',        'standard',   6,    0, 1, 0, NULL, 'Yearly',          'Manager',      1, 2,    7, NULL, 3),
        ('FT', 'maternity',   'parental',   182,  0, 1, 0, NULL, 'Yearly',          'HR',           1, 1,    0, 182,  4),
        ('FT', 'paternity',   'parental',   5,    0, 1, 0, 3,    'Yearly',          'Manager',      0, NULL, 0, 5,    5),
        ('FT', 'comp-off',    'additional', 2,    0, 1, 0, 2,    'Yearly',          'Manager',      0, NULL, 0, 2,    6),
        ('FT', 'loss-of-pay', 'additional', NULL, 0, 0, 0, NULL, 'Yearly',          'Manager + HR', 0, NULL, 0, 30,   7),
        -- Part Time (draft)
        ('PT', 'earned',      'standard',   6,    2, 1, 0, NULL, 'Pro-rata',        'Manager',      0, NULL, 0, 10,   1),
        ('PT', 'casual',      'standard',   3,    0, 1, 0, NULL, 'Yearly',          'Auto',         0, NULL, 0, 2,    2),
        ('PT', 'sick',        'standard',   4,    0, 1, 0, NULL, 'Yearly',          'Manager',      1, 2,    7, NULL, 3),
        ('PT', 'loss-of-pay', 'additional', NULL, 0, 0, 0, NULL, 'Yearly',          'Manager + HR', 0, NULL, 0, 30,   4)
    ) AS s (Policy, Code, Category, Allowance, CarryForward, IsPaid, Encash, WithinMonths, Basis, Approval, Cert, CertAfter, Backdate, MaxDays, SortOrder)
    CROSS APPLY (SELECT CASE s.Policy WHEN 'FT' THEN @FullTime ELSE @PartTime END AS PolicyId) AS p
    JOIN lv.LeaveType AS t ON t.OrganizationId = @PolOrg AND t.Code = s.Code;
END
GO

-- Demo requests for EMP00001 (dates relative to the run date, inserted directly so past dates are allowed).
IF NOT EXISTS (SELECT 1 FROM lv.LeaveRequest)
   AND EXISTS (SELECT 1 FROM lv.LeaveType)
   AND dbo.fn_employee_pk('EMP00001') IS NOT NULL
BEGIN
    DECLARE @SeedOrg INT = (SELECT MIN(Id) FROM org.Organization);
    DECLARE @Emp INT = dbo.fn_employee_pk('EMP00001');
    DECLARE @Mgr INT = dbo.fn_employee_pk('EMP00004');
    DECLARE @T DATE = CAST(GETDATE() AS DATE);

    INSERT lv.LeaveRequest (OrganizationId, EmployeeId, LeaveTypeId, FromDate, ToDate, DayPart, [Days], Reason, [Status], ApproverEmployeeId, DecisionNote, DecidedAt, AppliedAt, CreatedBy)
    SELECT @SeedOrg, @Emp, t.Id, s.FromDate, s.ToDate, 'full',
           (SELECT [Days] FROM lv.fn_working_days(@SeedOrg, s.FromDate, s.ToDate, 'full')),
           s.Reason, s.[Status], @Mgr, s.Note,
           CASE WHEN s.[Status] = 'Pending' THEN NULL ELSE DATEADD(DAY, -1, CAST(s.FromDate AS DATETIME2(0))) END,
           DATEADD(DAY, -7, CAST(s.FromDate AS DATETIME2(0))), N'seed'
    FROM (VALUES
        ('earned', DATEADD(DAY, 32, @T),  DATEADD(DAY, 33, @T),  N'Family function in hometown',    'Pending',  NULL),
        ('sick',   DATEADD(DAY, -9, @T),  DATEADD(DAY, -8, @T),  N'Fever and doctor visit',         'Approved', N'Get well soon'),
        ('casual', DATEADD(DAY, -40, @T), DATEADD(DAY, -40, @T), N'Bank and passport appointment',  'Approved', NULL),
        ('earned', DATEADD(DAY, -75, @T), DATEADD(DAY, -71, @T), N'Vacation with family',           'Approved', N'Enjoy!'),
        ('casual', DATEADD(DAY, -20, @T), DATEADD(DAY, -20, @T), N'Personal work',                  'Rejected', N'Release week, please pick another date')
    ) AS s (Code, FromDate, ToDate, Reason, [Status], Note)
    JOIN lv.LeaveType AS t ON t.OrganizationId = @SeedOrg AND t.Code = s.Code
    WHERE (SELECT [Days] FROM lv.fn_working_days(@SeedOrg, s.FromDate, s.ToDate, 'full')) > 0;
END
GO
