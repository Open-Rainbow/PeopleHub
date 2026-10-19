-- Attendance module (section 12 of PeopleHub.sql). Needs sections 1-11 (org, emp, lv, org.Holiday). Re-runnable.
-- ---------------------------------------------------------------------
-- 12. Attendance
--    att.Policy                 shift start, grace, full/half day hours, time zone (one row per organization)
--    att.AttendanceRecord       one row per employee per day (check in / check out)
--    att.RegularizationRequest  "I forgot to check in/out" requests, approved by manager / HR
--    Day status = record if any, else weekend / holiday / approved leave / absent (att.fn_days).
--    THROW 504xx -> API 422.
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'att') IS NULL EXEC (N'CREATE SCHEMA att');
GO

IF OBJECT_ID(N'att.Policy', N'U') IS NULL
BEGIN
CREATE TABLE att.Policy
(
    OrganizationId    INT           NOT NULL CONSTRAINT PK_AttPolicy PRIMARY KEY
                                    CONSTRAINT FK_AttPolicy_Organization REFERENCES org.Organization (Id),
    ShiftStart        TIME(0)       NOT NULL CONSTRAINT DF_AttPolicy_ShiftStart DEFAULT ('09:30'),
    ShiftEnd          TIME(0)       NOT NULL CONSTRAINT DF_AttPolicy_ShiftEnd DEFAULT ('18:30'),
    GraceMinutes      INT           NOT NULL CONSTRAINT DF_AttPolicy_Grace DEFAULT (15),
    FullDayHours      DECIMAL(4, 2) NOT NULL CONSTRAINT DF_AttPolicy_FullDay DEFAULT (8),
    HalfDayHours      DECIMAL(4, 2) NOT NULL CONSTRAINT DF_AttPolicy_HalfDay DEFAULT (4),
    RegularizeDays    INT           NOT NULL CONSTRAINT DF_AttPolicy_RegularizeDays DEFAULT (30),
    TimeZone          NVARCHAR(64)  NOT NULL CONSTRAINT DF_AttPolicy_TimeZone DEFAULT (N'India Standard Time'),
    UpdatedAt         DATETIME2(0)  NULL,
    UpdatedBy         NVARCHAR(100) NULL
);
END
GO

IF OBJECT_ID(N'att.AttendanceRecord', N'U') IS NULL
BEGIN
CREATE TABLE att.AttendanceRecord
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_AttendanceRecord PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_AttendanceRecord_Organization REFERENCES org.Organization (Id),
    EmployeeId     INT            NOT NULL CONSTRAINT FK_AttendanceRecord_Employee REFERENCES emp.Employee (Id),
    WorkDate       DATE           NOT NULL,
    CheckInAt      DATETIME2(0)   NOT NULL,      -- organization local time (att.Policy.TimeZone)
    CheckOutAt     DATETIME2(0)   NULL,
    WorkMode       VARCHAR(10)    NOT NULL CONSTRAINT DF_AttendanceRecord_Mode DEFAULT ('Office')
                                  CONSTRAINT CK_AttendanceRecord_Mode CHECK (WorkMode IN ('Office', 'Remote')),
    [Source]       VARCHAR(12)    NOT NULL CONSTRAINT DF_AttendanceRecord_Source DEFAULT ('Web')
                                  CONSTRAINT CK_AttendanceRecord_Source CHECK ([Source] IN ('Web', 'Regularized', 'Seed')),
    Note           NVARCHAR(200)  NULL,
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_AttendanceRecord_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL,
    CONSTRAINT UX_AttendanceRecord_Day UNIQUE (EmployeeId, WorkDate),
    CONSTRAINT CK_AttendanceRecord_Times CHECK (CheckOutAt IS NULL OR CheckOutAt > CheckInAt)
);
CREATE INDEX IX_AttendanceRecord_OrgDate ON att.AttendanceRecord (OrganizationId, WorkDate) INCLUDE (EmployeeId, CheckInAt, CheckOutAt, WorkMode);
END
GO

IF OBJECT_ID(N'att.RegularizationRequest', N'U') IS NULL
BEGIN
CREATE TABLE att.RegularizationRequest
(
    Id                 INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_RegularizationRequest PRIMARY KEY,
    OrganizationId     INT            NOT NULL CONSTRAINT FK_Regularization_Organization REFERENCES org.Organization (Id),
    EmployeeId         INT            NOT NULL CONSTRAINT FK_Regularization_Employee REFERENCES emp.Employee (Id),
    WorkDate           DATE           NOT NULL,
    CheckIn            TIME(0)        NOT NULL,
    CheckOut           TIME(0)        NOT NULL,
    WorkMode           VARCHAR(10)    NOT NULL CONSTRAINT DF_Regularization_Mode DEFAULT ('Office')
                                      CONSTRAINT CK_Regularization_Mode CHECK (WorkMode IN ('Office', 'Remote')),
    Reason             NVARCHAR(300)  NOT NULL,
    [Status]           VARCHAR(10)    NOT NULL CONSTRAINT DF_Regularization_Status DEFAULT ('Pending')
                                      CONSTRAINT CK_Regularization_Status CHECK ([Status] IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    ApproverEmployeeId INT            NULL CONSTRAINT FK_Regularization_Approver REFERENCES emp.Employee (Id),
    DecisionNote       NVARCHAR(300)  NULL,
    DecidedAt          DATETIME2(0)   NULL,
    CreatedAt          DATETIME2(0)   NOT NULL CONSTRAINT DF_Regularization_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy          NVARCHAR(100)  NULL,
    UpdatedAt          DATETIME2(0)   NULL,
    UpdatedBy          NVARCHAR(100)  NULL,
    CONSTRAINT CK_Regularization_Times CHECK (CheckOut > CheckIn)
);
CREATE INDEX IX_Regularization_Org ON att.RegularizationRequest (OrganizationId, [Status], WorkDate);
END
GO

-- Organization local time (attendance is recorded in the office's time zone, not the SQL Server's).
CREATE OR ALTER FUNCTION att.fn_now (@OrganizationId INT)
RETURNS DATETIME2(0)
AS
BEGIN
    DECLARE @Tz NVARCHAR(64) = ISNULL((SELECT TimeZone FROM att.Policy WHERE OrganizationId = @OrganizationId), N'India Standard Time');
    RETURN CAST(SYSDATETIMEOFFSET() AT TIME ZONE @Tz AS DATETIME2(0));
END
GO

/* Status of every day in a range for one employee.
   Status: Present | Half day | Short day | Working | Missed check-out | On leave | Holiday | Weekend
           | Not checked in | Absent | Upcoming */
CREATE OR ALTER FUNCTION att.fn_days (@OrganizationId INT, @EmpPk INT, @From DATE, @To DATE)
RETURNS TABLE
AS
RETURN
    WITH p AS (
        SELECT ISNULL(MAX(ShiftStart), '09:30') AS ShiftStart, ISNULL(MAX(GraceMinutes), 15) AS GraceMinutes,
               ISNULL(MAX(FullDayHours), 8) AS FullDayHours, ISNULL(MAX(HalfDayHours), 4) AS HalfDayHours,
               CAST(att.fn_now(@OrganizationId) AS DATE) AS Today
        FROM att.Policy WHERE OrganizationId = @OrganizationId),
    n AS (
        SELECT TOP (CASE WHEN @To >= @From THEN DATEDIFF(DAY, @From, @To) + 1 ELSE 0 END)
               ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) - 1 AS k
        FROM sys.all_objects),
    d AS (SELECT DATEADD(DAY, k, @From) AS WorkDate FROM n)
    SELECT
        d.WorkDate,
        CASE
            WHEN r.Id IS NOT NULL AND r.CheckOutAt IS NULL AND d.WorkDate = p.Today THEN 'Working'
            WHEN r.Id IS NOT NULL AND r.CheckOutAt IS NULL THEN 'Missed check-out'
            WHEN r.Id IS NOT NULL AND m.Minutes >= p.FullDayHours * 60 THEN 'Present'
            WHEN r.Id IS NOT NULL AND m.Minutes >= p.HalfDayHours * 60 THEN 'Half day'
            WHEN r.Id IS NOT NULL THEN 'Short day'
            WHEN DATEDIFF(DAY, '19000101', d.WorkDate) % 7 IN (5, 6) THEN 'Weekend'
            WHEN h.Id IS NOT NULL THEN 'Holiday'
            WHEN l.Id IS NOT NULL THEN 'On leave'
            WHEN d.WorkDate > p.Today THEN 'Upcoming'
            WHEN d.WorkDate = p.Today THEN 'Not checked in'
            ELSE 'Absent'
        END AS [Status],
        CAST(CASE WHEN r.Id IS NOT NULL
                       AND CAST(r.CheckInAt AS TIME(0)) > DATEADD(MINUTE, p.GraceMinutes, p.ShiftStart) THEN 1 ELSE 0 END AS BIT) AS IsLate,
        r.CheckInAt,
        r.CheckOutAt,
        m.Minutes AS WorkedMinutes,
        r.WorkMode,
        r.[Source],
        r.Note,
        h.[Name] AS HolidayName,
        lt.Label AS LeaveType,
        CAST(CASE WHEN l.Id IS NOT NULL AND l.DayPart <> 'full' THEN 1 ELSE 0 END AS BIT) AS IsHalfDayLeave
    FROM d
    CROSS JOIN p
    LEFT JOIN att.AttendanceRecord AS r ON r.EmployeeId = @EmpPk AND r.WorkDate = d.WorkDate
    OUTER APPLY (SELECT CASE WHEN r.CheckOutAt IS NOT NULL THEN DATEDIFF(MINUTE, r.CheckInAt, r.CheckOutAt)
                             WHEN r.Id IS NOT NULL AND d.WorkDate = p.Today THEN DATEDIFF(MINUTE, r.CheckInAt, att.fn_now(@OrganizationId))
                        END AS Minutes) AS m
    LEFT JOIN org.Holiday AS h ON h.OrganizationId = @OrganizationId AND h.HolidayDate = d.WorkDate AND h.IsDeleted = 0 AND h.IsOptional = 0
    OUTER APPLY (SELECT TOP (1) q.Id, q.LeaveTypeId, q.DayPart FROM lv.LeaveRequest AS q
                 WHERE q.EmployeeId = @EmpPk AND q.IsDeleted = 0 AND q.[Status] = 'Approved'
                   AND d.WorkDate BETWEEN q.FromDate AND q.ToDate) AS l
    LEFT JOIN lv.LeaveType AS lt ON lt.Id = l.LeaveTypeId;
GO

/* GET api/v1/attendance/policy */
CREATE OR ALTER PROCEDURE dbo.sp_att_get_policy
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT CONVERT(VARCHAR(5), ShiftStart, 108) AS ShiftStart, CONVERT(VARCHAR(5), ShiftEnd, 108) AS ShiftEnd,
           GraceMinutes, FullDayHours, HalfDayHours, RegularizeDays, TimeZone,
           att.fn_now(@OrganizationId) AS ServerNow
    FROM att.Policy WHERE OrganizationId = @OrganizationId;
END
GO

/* GET api/v1/attendance/days?employeeId=&from=&to=  (max 93 days) */
CREATE OR ALTER PROCEDURE dbo.sp_att_get_days
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @From           DATE,
    @To             DATE
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50401, 'Employee not found.', 1;
    IF @To < @From OR DATEDIFF(DAY, @From, @To) > 92 THROW 50402, 'Pick a range of up to 3 months.', 1;

    SELECT CAST(WorkDate AS DATETIME2(0)) AS [Date], [Status], IsLate, CheckInAt, CheckOutAt, WorkedMinutes,
           WorkMode, [Source], Note, HolidayName, LeaveType, IsHalfDayLeave
    FROM att.fn_days(@OrganizationId, @EmpPk, @From, @To)
    ORDER BY WorkDate;
END
GO

/* POST api/v1/attendance/check-in  { employeeId, workMode, note }. Returns today's row. */
CREATE OR ALTER PROCEDURE dbo.sp_att_check_in
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @WorkMode       VARCHAR(10)   = 'Office',
    @Note           NVARCHAR(200) = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @ResultMessage  VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50401, 'Employee not found.', 1;
    IF ISNULL(@WorkMode, 'Office') NOT IN ('Office', 'Remote') THROW 50403, 'Work mode must be Office or Remote.', 1;

    DECLARE @Now DATETIME2(0) = att.fn_now(@OrganizationId);
    DECLARE @Today DATE = CAST(@Now AS DATE);

    BEGIN TRANSACTION;
    IF EXISTS (SELECT 1 FROM att.AttendanceRecord WITH (UPDLOCK, HOLDLOCK) WHERE EmployeeId = @EmpPk AND WorkDate = @Today)
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50404, 'You have already checked in today.', 1;
    END

    INSERT att.AttendanceRecord (OrganizationId, EmployeeId, WorkDate, CheckInAt, WorkMode, Note, CreatedBy)
    VALUES (@OrganizationId, @EmpPk, @Today, @Now, ISNULL(@WorkMode, 'Office'), NULLIF(LTRIM(RTRIM(@Note)), N''), @UserId);
    COMMIT TRANSACTION;

    SET @ResultMessage = CONCAT('Checked in at ', CONVERT(VARCHAR(5), CAST(@Now AS TIME), 108), '.');
    SELECT CAST(WorkDate AS DATETIME2(0)) AS [Date], [Status], IsLate, CheckInAt, CheckOutAt, WorkedMinutes,
           WorkMode, [Source], Note, HolidayName, LeaveType, IsHalfDayLeave
    FROM att.fn_days(@OrganizationId, @EmpPk, CAST(@Now AS DATE), CAST(@Now AS DATE));
END
GO

/* POST api/v1/attendance/check-out  { employeeId, note }. Returns today's row. */
CREATE OR ALTER PROCEDURE dbo.sp_att_check_out
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Note           NVARCHAR(200) = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @ResultMessage  VARCHAR(200)  = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50401, 'Employee not found.', 1;

    DECLARE @Now DATETIME2(0) = att.fn_now(@OrganizationId);
    DECLARE @Id INT, @Out DATETIME2(0), @In DATETIME2(0);
    SELECT @Id = Id, @Out = CheckOutAt, @In = CheckInAt
    FROM att.AttendanceRecord WHERE EmployeeId = @EmpPk AND WorkDate = CAST(@Now AS DATE);

    IF @Id IS NULL THROW 50405, 'Check in first.', 1;
    IF @Out IS NOT NULL THROW 50406, 'You have already checked out today.', 1;
    IF @Now <= @In THROW 50407, 'Check-out must be after check-in.', 1;

    UPDATE att.AttendanceRecord
       SET CheckOutAt = @Now,
           Note = COALESCE(NULLIF(LTRIM(RTRIM(@Note)), N''), Note),
           UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;

    DECLARE @Minutes INT = DATEDIFF(MINUTE, @In, @Now);
    SET @ResultMessage = CONCAT('Checked out. ', @Minutes / 60, 'h ', @Minutes % 60, 'm today.');
    SELECT CAST(WorkDate AS DATETIME2(0)) AS [Date], [Status], IsLate, CheckInAt, CheckOutAt, WorkedMinutes,
           WorkMode, [Source], Note, HolidayName, LeaveType, IsHalfDayLeave
    FROM att.fn_days(@OrganizationId, @EmpPk, CAST(@Now AS DATE), CAST(@Now AS DATE));
END
GO

/* GET api/v1/attendance/team?date=&search=  Everyone's status for one day (HR / managers). */
CREATE OR ALTER PROCEDURE dbo.sp_att_get_team_day
    @OrganizationId INT,
    @Date           DATE,
    @Search         NVARCHAR(100) = NULL,
    @Manager_Id     VARCHAR(50)   = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Q NVARCHAR(102) = CASE WHEN NULLIF(LTRIM(RTRIM(@Search)), N'') IS NULL THEN NULL ELSE CONCAT(N'%', LTRIM(RTRIM(@Search)), N'%') END;

    SELECT e.EmployeeCode AS EmployeeId, e.FullName AS EmployeeName, d.Department, d.Designation,
           x.[Status], x.IsLate, x.CheckInAt, x.CheckOutAt, x.WorkedMinutes, x.WorkMode, x.[Source], x.LeaveType, x.HolidayName
    FROM emp.Employee AS e
    OUTER APPLY (SELECT TOP (1) Department, Designation, ReportingManager FROM emp.EmploymentDetail
                 WHERE EmployeeId = e.Id AND IsDeleted = 0 ORDER BY Id DESC) AS d
    CROSS APPLY att.fn_days(@OrganizationId, e.Id, @Date, @Date) AS x
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0
      AND ISNULL(e.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive')
      AND (@Manager_Id IS NULL OR d.ReportingManager = @Manager_Id)
      AND (@Q IS NULL OR e.FullName LIKE @Q OR e.EmployeeCode LIKE @Q OR d.Department LIKE @Q)
    ORDER BY e.FullName;
END
GO

/* GET api/v1/attendance/trend?from=&to=  Daily counts across the organization (max 62 days). */
CREATE OR ALTER PROCEDURE dbo.sp_att_get_trend
    @OrganizationId INT,
    @From           DATE,
    @To             DATE
AS
BEGIN
    SET NOCOUNT ON;
    IF @To < @From OR DATEDIFF(DAY, @From, @To) > 61 THROW 50402, 'Pick a range of up to 2 months.', 1;

    SELECT CAST(x.WorkDate AS DATETIME2(0)) AS [Date],
           SUM(CASE WHEN x.[Status] IN ('Present', 'Half day', 'Short day', 'Working', 'Missed check-out') THEN 1 ELSE 0 END) AS Present,
           SUM(CASE WHEN x.IsLate = 1 THEN 1 ELSE 0 END) AS Late,
           SUM(CASE WHEN x.WorkMode = 'Remote' THEN 1 ELSE 0 END) AS Remote,
           SUM(CASE WHEN x.[Status] = 'On leave' THEN 1 ELSE 0 END) AS OnLeave,
           SUM(CASE WHEN x.[Status] IN ('Absent', 'Not checked in') THEN 1 ELSE 0 END) AS Absent,
           CAST(MAX(CASE WHEN x.[Status] IN ('Weekend', 'Holiday') THEN 1 ELSE 0 END) AS BIT) AS IsOffDay
    FROM emp.Employee AS e
    CROSS APPLY att.fn_days(@OrganizationId, e.Id, @From, @To) AS x
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0
      AND ISNULL(e.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive')
    GROUP BY x.WorkDate
    ORDER BY x.WorkDate;
END
GO

-- Shared shape for regularization lists.
CREATE OR ALTER FUNCTION att.fn_regularizations (@OrganizationId INT)
RETURNS TABLE
AS
RETURN
    SELECT q.Id, e.EmployeeCode AS EmployeeId, e.FullName AS EmployeeName,
           CAST(q.WorkDate AS DATETIME2(0)) AS WorkDate,
           CONVERT(VARCHAR(5), q.CheckIn, 108) AS CheckIn, CONVERT(VARCHAR(5), q.CheckOut, 108) AS CheckOut,
           q.WorkMode, q.Reason, q.[Status], a.EmployeeCode AS ApproverId, a.FullName AS ApproverName,
           q.DecisionNote, q.DecidedAt, q.CreatedAt AS RequestedAt
    FROM att.RegularizationRequest AS q
    JOIN emp.Employee AS e ON e.Id = q.EmployeeId
    LEFT JOIN emp.Employee AS a ON a.Id = q.ApproverEmployeeId
    WHERE q.OrganizationId = @OrganizationId;
GO

/* GET api/v1/attendance/regularizations?employeeId=&status= */
CREATE OR ALTER PROCEDURE dbo.sp_att_get_regularizations
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50) = NULL,
    @Status         VARCHAR(10) = NULL,
    @Id             INT         = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, EmployeeId, EmployeeName, WorkDate, CheckIn, CheckOut, WorkMode, Reason, [Status],
           ApproverId, ApproverName, DecisionNote, DecidedAt, RequestedAt
    FROM att.fn_regularizations(@OrganizationId)
    WHERE (@Id IS NULL OR Id = @Id)
      AND (@Employee_Id IS NULL OR EmployeeId = @Employee_Id)
      AND (@Status IS NULL OR [Status] = @Status)
    ORDER BY CASE WHEN [Status] = 'Pending' THEN 0 ELSE 1 END, WorkDate DESC, Id DESC;
END
GO

/* POST api/v1/attendance/regularizations  { employeeId, workDate, checkIn, checkOut, workMode, reason } */
CREATE OR ALTER PROCEDURE dbo.sp_att_request_regularization
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @WorkDate       DATE,
    @CheckIn        TIME(0),
    @CheckOut       TIME(0),
    @WorkMode       VARCHAR(10)   = 'Office',
    @Reason         NVARCHAR(300),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50401, 'Employee not found.', 1;

    DECLARE @Today DATE = CAST(att.fn_now(@OrganizationId) AS DATE);
    DECLARE @Window INT = ISNULL((SELECT RegularizeDays FROM att.Policy WHERE OrganizationId = @OrganizationId), 30);
    DECLARE @Msg NVARCHAR(300);

    IF @WorkDate > @Today THROW 50408, 'You can only correct today or past days.', 1;
    IF @WorkDate < DATEADD(DAY, -@Window, @Today)
    BEGIN
        SET @Msg = CONCAT(N'Corrections are allowed for the last ', @Window, N' days only.');
        THROW 50409, @Msg, 1;
    END
    IF @CheckOut <= @CheckIn THROW 50410, 'Check-out must be after check-in.', 1;
    IF @WorkDate = @Today AND @CheckOut > CAST(att.fn_now(@OrganizationId) AS TIME(0))
        THROW 50411, 'Check-out time is still in the future.', 1;

    BEGIN TRANSACTION;
    IF EXISTS (SELECT 1 FROM att.RegularizationRequest WITH (UPDLOCK, HOLDLOCK)
               WHERE EmployeeId = @EmpPk AND WorkDate = @WorkDate AND [Status] = 'Pending')
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50412, 'There is already a pending correction for this day.', 1;
    END

    DECLARE @ApproverPk INT = (SELECT TOP (1) dbo.fn_employee_pk(d.ReportingManager) FROM emp.EmploymentDetail AS d
                               WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0 ORDER BY d.Id DESC);

    INSERT att.RegularizationRequest (OrganizationId, EmployeeId, WorkDate, CheckIn, CheckOut, WorkMode, Reason, ApproverEmployeeId, CreatedBy)
    VALUES (@OrganizationId, @EmpPk, @WorkDate, @CheckIn, @CheckOut, ISNULL(@WorkMode, 'Office'), LTRIM(RTRIM(@Reason)), @ApproverPk, @UserId);
    SET @Id = SCOPE_IDENTITY();
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/attendance/regularizations/{id}/decision  { approve, note }. Approving writes the attendance record. */
CREATE OR ALTER PROCEDURE dbo.sp_att_decide_regularization
    @Id             INT,
    @OrganizationId INT,
    @Approve        BIT,
    @Note           NVARCHAR(300) = NULL,
    @Approver_Id    VARCHAR(50)   = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Status VARCHAR(10), @EmpPk INT, @WorkDate DATE, @In TIME(0), @Out TIME(0), @Mode VARCHAR(10), @Reason NVARCHAR(300);
    SELECT @Status = [Status], @EmpPk = EmployeeId, @WorkDate = WorkDate, @In = CheckIn, @Out = CheckOut, @Mode = WorkMode, @Reason = Reason
    FROM att.RegularizationRequest WHERE Id = @Id AND OrganizationId = @OrganizationId;

    IF @Status IS NULL BEGIN SET @Affected = 0; RETURN; END
    IF @Status <> 'Pending' THROW 50413, 'This request has already been decided.', 1;
    IF @Approve = 0 AND NULLIF(LTRIM(RTRIM(@Note)), N'') IS NULL THROW 50414, 'Add a note when rejecting a request.', 1;

    BEGIN TRANSACTION;
    UPDATE att.RegularizationRequest
       SET [Status] = CASE WHEN @Approve = 1 THEN 'Approved' ELSE 'Rejected' END,
           DecisionNote = NULLIF(LTRIM(RTRIM(@Note)), N''),
           ApproverEmployeeId = ISNULL(dbo.fn_employee_pk(@Approver_Id), ApproverEmployeeId),
           DecidedAt = SYSUTCDATETIME(), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;

    IF @Approve = 1
    BEGIN
        DECLARE @InAt DATETIME2(0) = DATEADD(SECOND, DATEDIFF(SECOND, '00:00', @In), CAST(@WorkDate AS DATETIME2(0)));
        DECLARE @OutAt DATETIME2(0) = DATEADD(SECOND, DATEDIFF(SECOND, '00:00', @Out), CAST(@WorkDate AS DATETIME2(0)));
        MERGE att.AttendanceRecord AS t
        USING (SELECT @EmpPk AS EmployeeId, @WorkDate AS WorkDate) AS s
        ON t.EmployeeId = s.EmployeeId AND t.WorkDate = s.WorkDate
        WHEN MATCHED THEN
            UPDATE SET CheckInAt = @InAt, CheckOutAt = @OutAt, WorkMode = @Mode, [Source] = 'Regularized',
                       Note = LEFT(CONCAT(N'Corrected: ', @Reason), 200), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHEN NOT MATCHED THEN
            INSERT (OrganizationId, EmployeeId, WorkDate, CheckInAt, CheckOutAt, WorkMode, [Source], Note, CreatedBy)
            VALUES (@OrganizationId, @EmpPk, @WorkDate, @InAt, @OutAt, @Mode, 'Regularized', LEFT(CONCAT(N'Corrected: ', @Reason), 200), @UserId);
    END
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/attendance/regularizations/{id}/cancel  (employee withdraws a pending request) */
CREATE OR ALTER PROCEDURE dbo.sp_att_cancel_regularization
    @Id             INT,
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    DECLARE @Status VARCHAR(10) = (SELECT [Status] FROM att.RegularizationRequest
                                   WHERE Id = @Id AND OrganizationId = @OrganizationId AND EmployeeId = @EmpPk);
    IF @Status IS NULL BEGIN SET @Affected = 0; RETURN; END
    IF @Status <> 'Pending' THROW 50415, 'Only pending requests can be withdrawn.', 1;

    UPDATE att.RegularizationRequest
       SET [Status] = 'Cancelled', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    SET @Affected = @@ROWCOUNT;
END
GO

-- Policy row + demo data: last 30 days for the 5 seeded employees (only when there are no records yet).
IF EXISTS (SELECT 1 FROM org.Organization)
    INSERT att.Policy (OrganizationId)
    SELECT o.Id FROM org.Organization AS o WHERE NOT EXISTS (SELECT 1 FROM att.Policy p WHERE p.OrganizationId = o.Id);
GO

IF NOT EXISTS (SELECT 1 FROM att.AttendanceRecord) AND dbo.fn_employee_pk('EMP00001') IS NOT NULL
BEGIN
    DECLARE @AttOrg INT = (SELECT MIN(Id) FROM org.Organization);
    DECLARE @AttToday DATE = CAST(att.fn_now(@AttOrg) AS DATE);

    WITH n AS (SELECT TOP (30) ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS k FROM sys.all_objects),
    days AS (SELECT DATEADD(DAY, -k, @AttToday) AS WorkDate, k FROM n),
    emps AS (SELECT Id, EmployeeCode, ROW_NUMBER() OVER (ORDER BY EmployeeCode) AS e
             FROM emp.Employee WHERE OrganizationId = @AttOrg AND IsDeleted = 0 AND EmployeeCode BETWEEN 'EMP00001' AND 'EMP00005'),
    pl AS (
        SELECT emps.Id AS EmployeeId, days.WorkDate,
               -- deterministic variety: minutes after 09:00 for check-in, worked minutes, remote days, a few gaps
               ((emps.e * 37 + days.k * 11) % 50) AS InOffset,
               480 + ((emps.e * 13 + days.k * 7) % 90) AS Worked,
               CASE WHEN (emps.e + days.k) % 5 = 0 THEN 'Remote' ELSE 'Office' END AS WorkMode,
               CASE WHEN (emps.e * 3 + days.k) % 17 = 0 THEN 1 ELSE 0 END AS Skip,
               CASE WHEN (emps.e + days.k) % 13 = 0 THEN 1 ELSE 0 END AS ShortDay,
               CASE WHEN emps.EmployeeCode = 'EMP00001' AND days.k = 3 THEN 1 ELSE 0 END AS MissedOut
        FROM emps CROSS JOIN days
        WHERE DATEDIFF(DAY, '19000101', days.WorkDate) % 7 NOT IN (5, 6)
          AND NOT EXISTS (SELECT 1 FROM org.Holiday h WHERE h.OrganizationId = @AttOrg AND h.HolidayDate = days.WorkDate AND h.IsDeleted = 0 AND h.IsOptional = 0)
          AND NOT EXISTS (SELECT 1 FROM lv.LeaveRequest q WHERE q.EmployeeId = emps.Id AND q.IsDeleted = 0 AND q.[Status] = 'Approved'
                                                          AND days.WorkDate BETWEEN q.FromDate AND q.ToDate))
    INSERT att.AttendanceRecord (OrganizationId, EmployeeId, WorkDate, CheckInAt, CheckOutAt, WorkMode, [Source], CreatedBy)
    SELECT @AttOrg, EmployeeId, WorkDate,
           DATEADD(MINUTE, 540 + InOffset, CAST(WorkDate AS DATETIME2(0))),
           CASE WHEN MissedOut = 1 THEN NULL
                ELSE DATEADD(MINUTE, 540 + InOffset + CASE WHEN ShortDay = 1 THEN 300 ELSE Worked END, CAST(WorkDate AS DATETIME2(0))) END,
           WorkMode, 'Seed', N'seed'
    FROM pl WHERE Skip = 0;

    -- A pending correction for the day EMP00001 forgot to check out.
    INSERT att.RegularizationRequest (OrganizationId, EmployeeId, WorkDate, CheckIn, CheckOut, WorkMode, Reason, ApproverEmployeeId, CreatedBy)
    SELECT @AttOrg, r.EmployeeId, r.WorkDate, CAST(r.CheckInAt AS TIME(0)), '18:45', r.WorkMode,
           N'Forgot to check out before leaving.', dbo.fn_employee_pk('EMP00004'), N'seed'
    FROM att.AttendanceRecord AS r
    WHERE r.EmployeeId = dbo.fn_employee_pk('EMP00001') AND r.CheckOutAt IS NULL AND r.WorkDate < @AttToday;
END
GO
