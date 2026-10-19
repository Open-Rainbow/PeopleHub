/* Leave module. Also included as section 10 of PeopleHub.sql.
   Run after PeopleHub.sql (needs org.Organization, emp.Employee). Safe to re-run. */
USE PeopleHub;
GO
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- ---------------------------------------------------------------------
-- 10. Leave
--    org.Holiday       company holidays (skipped when counting leave days)
--    lv.LeaveType      leave types + yearly entitlement per organization
--    lv.LeaveRequest   one row per request (Pending/Approved/Rejected/Cancelled)
--    Balance = entitlement - (approved + pending days) in the calendar year.
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
    Code              VARCHAR(20)    NOT NULL,      -- earned | casual | sick | comp-off | loss-of-pay
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

/* GET api/v1/leave/types */
CREATE OR ALTER PROCEDURE dbo.sp_get_leave_types
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Code, Label, ShortCode, [Description], AnnualEntitlement, BackdateDays, MaxConsecutive, DocumentAfterDays, IsPaid
    FROM lv.LeaveType
    WHERE OrganizationId = @OrganizationId AND IsActive = 1
    ORDER BY SortOrder, Id;
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
        t.Code AS LeaveType,
        t.Label,
        t.AnnualEntitlement AS Entitlement,
        CAST(ISNULL(SUM(CASE WHEN r.[Status] = 'Approved' THEN r.[Days] END), 0) AS DECIMAL(5, 1)) AS Used,
        CAST(ISNULL(SUM(CASE WHEN r.[Status] = 'Pending'  THEN r.[Days] END), 0) AS DECIMAL(5, 1)) AS Pending,
        CASE WHEN t.AnnualEntitlement IS NULL THEN NULL
             ELSE CAST(CASE WHEN t.AnnualEntitlement - ISNULL(SUM(CASE WHEN r.[Status] IN ('Approved', 'Pending') THEN r.[Days] END), 0) < 0 THEN 0
                            ELSE t.AnnualEntitlement - ISNULL(SUM(CASE WHEN r.[Status] IN ('Approved', 'Pending') THEN r.[Days] END), 0) END AS DECIMAL(5, 1))
        END AS Available
    FROM lv.LeaveType AS t
    LEFT JOIN lv.LeaveRequest AS r
           ON r.LeaveTypeId = t.Id AND r.EmployeeId = @EmpPk AND r.IsDeleted = 0
          AND r.FromDate >= DATEFROMPARTS(@Year, 1, 1) AND r.FromDate < DATEFROMPARTS(@Year + 1, 1, 1)
    WHERE t.OrganizationId = @OrganizationId AND t.IsActive = 1
    GROUP BY t.Id, t.Code, t.Label, t.AnnualEntitlement, t.SortOrder
    ORDER BY t.SortOrder, t.Id;
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

/* POST api/v1/leave/requests. Every business rule is checked here so no client can skip them. */
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

    DECLARE @TypeId INT, @Label NVARCHAR(50), @Entitlement DECIMAL(5, 1), @Backdate INT, @MaxDays DECIMAL(5, 1);
    SELECT @TypeId = Id, @Label = Label, @Entitlement = AnnualEntitlement, @Backdate = BackdateDays, @MaxDays = MaxConsecutive
    FROM lv.LeaveType
    WHERE OrganizationId = @OrganizationId AND Code = @LeaveType AND IsActive = 1;
    IF @TypeId IS NULL THROW 50202, 'Unknown leave type.', 1;

    IF @ToDate < @FromDate THROW 50203, 'End date must be on or after the start date.', 1;
    IF ISNULL(@DayPart, 'full') <> 'full' AND @FromDate <> @ToDate THROW 50204, 'Half day applies to a single date only.', 1;
    IF DATEDIFF(DAY, @FromDate, @ToDate) > 366 THROW 50205, 'A leave request can cover at most one year.', 1;

    DECLARE @Today DATE = CAST(GETDATE() AS DATE);
    DECLARE @Msg NVARCHAR(400);
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
        DECLARE @Taken DECIMAL(5, 1) = ISNULL((
            SELECT SUM([Days]) FROM lv.LeaveRequest WITH (UPDLOCK, HOLDLOCK)
            WHERE EmployeeId = @EmpPk AND LeaveTypeId = @TypeId AND IsDeleted = 0
              AND [Status] IN ('Pending', 'Approved') AND YEAR(FromDate) = YEAR(@FromDate)), 0);
        IF @Taken + @Days > @Entitlement
        BEGIN
            ROLLBACK TRANSACTION;
            SET @Msg = CONCAT(N'Only ', CAST(@Entitlement - @Taken AS FLOAT), N' ', @Label, N' day(s) left. Shorten the request or choose Loss of Pay.');
            THROW 50210, @Msg, 1;
        END
    END

    DECLARE @ApproverPk INT = (
        SELECT TOP (1) dbo.fn_employee_pk(d.ReportingManager)
        FROM emp.EmploymentDetail AS d
        WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0
        ORDER BY d.Id DESC);

    INSERT lv.LeaveRequest
        (OrganizationId, EmployeeId, LeaveTypeId, FromDate, ToDate, DayPart, [Days], Reason, ApproverEmployeeId, CreatedBy)
    VALUES
        (@OrganizationId, @EmpPk, @TypeId, @FromDate, @ToDate, ISNULL(@DayPart, 'full'), @Days, LTRIM(RTRIM(@Reason)), @ApproverPk, @UserId);

    SET @Id = SCOPE_IDENTITY();
    COMMIT TRANSACTION;

    SET @ResultMessage = CONCAT('Leave request sent for ', CAST(@Days AS FLOAT), CASE WHEN @Days = 1 THEN ' day.' ELSE ' days.' END);
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

PRINT 'Leave module is ready.';
GO
