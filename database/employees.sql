/* ===== SECTION 17: EMPLOYEE DIRECTORY (View Employee screen) ===== */
/* Run after sections 1-16. Safe to run again.
   API: PeopleHub.Server EmployeeDirectoryController (api/v1/employees). Error codes 50901-50905. */

-- ---------------------------------------------------------------------
-- Status history (every status change made from the directory)
-- ---------------------------------------------------------------------
IF OBJECT_ID(N'emp.StatusHistory', N'U') IS NULL
BEGIN
CREATE TABLE emp.StatusHistory
(
    Id            INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_StatusHistory PRIMARY KEY,
    EmployeeId    INT            NOT NULL CONSTRAINT FK_StatusHistory_Employee REFERENCES emp.Employee(Id),
    OldStatus     NVARCHAR(30)   NULL,
    NewStatus     NVARCHAR(30)   NOT NULL,
    Reason        NVARCHAR(500)  NULL,
    EffectiveDate DATE           NULL,
    ChangedAt     DATETIME2(0)   NOT NULL CONSTRAINT DF_StatusHistory_ChangedAt DEFAULT (SYSUTCDATETIME()),
    ChangedBy     NVARCHAR(100)  NULL
);
CREATE INDEX IX_StatusHistory_Employee ON emp.StatusHistory (EmployeeId, ChangedAt DESC);
END
GO

-- ---------------------------------------------------------------------
-- One row per employee: person + latest job + latest contact + manager + team size
-- ---------------------------------------------------------------------
CREATE OR ALTER FUNCTION emp.fn_directory (@OrganizationId INT)
RETURNS TABLE
AS
RETURN
    SELECT e.Id, e.EmployeeCode, e.Salutation, e.FirstName, e.MiddleName, e.LastName, e.FullName, e.PreferredName,
           e.Gender, e.DateOfBirth, e.DateOfJoining, e.MaritalStatus, e.BloodGroup, e.Nationality,
           ISNULL(NULLIF(LTRIM(RTRIM(e.EmployeeStatus)), N''), N'Active') AS Status,
           CAST(CASE WHEN e.EmployeePhoto IS NULL THEN 0 ELSE 1 END AS BIT) AS HasPhoto,
           d.Designation, d.Department, d.BusinessUnit, d.WorkLocation, d.EmployeeType, d.EmploymentStatus,
           d.OfficeEmail, d.PayLevel, d.ShiftTimings, d.WorkSchedule,
           d.ProbationStartDate, d.ProbationEndDate, d.ConfirmationDate,
           d.ManagerCode, m.FullName AS ManagerName,
           d.HrOwnerCode, h.FullName AS HrOwnerName,
           c.PersonalMail, c.AlternateMail, c.MobileNumber, c.AlternateMobile, c.OfficialEmail, c.LinkedinUrl,
           (SELECT COUNT(*)
              FROM emp.EmploymentDetail AS rd
              JOIN emp.Employee AS re ON re.Id = rd.EmployeeId
             WHERE rd.IsDeleted = 0 AND re.IsDeleted = 0 AND re.OrganizationId = e.OrganizationId AND re.Id <> e.Id
               AND LTRIM(RTRIM(rd.ReportingManager)) = e.EmployeeCode
               AND ISNULL(re.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive')) AS DirectReports
    FROM emp.Employee AS e
    OUTER APPLY (SELECT TOP (1) x.Designation, x.Department, x.BusinessUnit, x.WorkLocation, x.EmployeeType, x.EmploymentStatus,
                        x.OfficeEmail, x.PayLevel, x.ShiftTimings, x.WorkSchedule,
                        x.ProbationStartDate, x.ProbationEndDate, x.ConfirmationDate,
                        NULLIF(LTRIM(RTRIM(x.ReportingManager)), N'') AS ManagerCode,
                        NULLIF(LTRIM(RTRIM(x.HrOwner)), N'') AS HrOwnerCode
                 FROM emp.EmploymentDetail AS x
                 WHERE x.EmployeeId = e.Id AND x.IsDeleted = 0
                 ORDER BY x.Id DESC) AS d
    OUTER APPLY (SELECT TOP (1) x.PersonalMail, x.AlternateMail, x.MobileNumber, x.AlternateMobile, x.OfficialEmail, x.LinkedinUrl
                 FROM emp.ContactInfo AS x
                 WHERE x.EmployeeId = e.Id AND x.IsDeleted = 0
                 ORDER BY x.Id DESC) AS c
    LEFT JOIN emp.Employee AS m
           ON m.OrganizationId = e.OrganizationId AND m.IsDeleted = 0 AND m.Id <> e.Id AND m.EmployeeCode = d.ManagerCode
    LEFT JOIN emp.Employee AS h
           ON h.OrganizationId = e.OrganizationId AND h.IsDeleted = 0 AND h.EmployeeCode = d.HrOwnerCode
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0;
GO

/* GET api/v1/employees  Search, filters, sort and paging. TotalCount = all matching rows. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_get_employees
    @OrganizationId INT,
    @Search         NVARCHAR(100) = NULL,
    @Status         NVARCHAR(30)  = NULL,
    @Department     NVARCHAR(30)  = NULL,
    @Location       NVARCHAR(50)  = NULL,
    @EmployeeType   NVARCHAR(20)  = NULL,
    @ManagerCode    VARCHAR(50)   = NULL,
    @JoinedFrom     DATE          = NULL,
    @JoinedTo       DATE          = NULL,
    @IncludeExited  BIT           = 0,
    @SortBy         VARCHAR(20)   = 'name',
    @SortDir        VARCHAR(4)    = 'asc',
    @Page           INT           = 1,
    @PageSize       INT           = 20
AS
BEGIN
    SET NOCOUNT ON;

    SET @Search = NULLIF(LTRIM(RTRIM(@Search)), N'');
    IF @Page IS NULL OR @Page < 1 SET @Page = 1;
    IF @PageSize IS NULL OR @PageSize < 1 SET @PageSize = 20;
    IF @PageSize > 10000 SET @PageSize = 10000;
    SET @SortBy = LOWER(ISNULL(@SortBy, 'name'));
    DECLARE @Desc BIT = CASE WHEN LOWER(@SortDir) = 'desc' THEN 1 ELSE 0 END;
    DECLARE @Like NVARCHAR(400) = N'%' + REPLACE(REPLACE(REPLACE(@Search, N'[', N'[[]'), N'%', N'[%]'), N'_', N'[_]') + N'%';

    SELECT d.Id, d.EmployeeCode, d.FullName, d.PreferredName, d.Designation, d.Department, d.BusinessUnit, d.WorkLocation,
           d.EmployeeType, d.OfficeEmail, d.MobileNumber, d.Status, d.DateOfJoining, d.ManagerCode, d.ManagerName,
           d.DirectReports, d.HasPhoto, COUNT(*) OVER () AS TotalCount
    FROM emp.fn_directory(@OrganizationId) AS d
    WHERE (@Search IS NULL OR d.FullName LIKE @Like OR d.EmployeeCode LIKE @Like OR d.PreferredName LIKE @Like
           OR d.OfficeEmail LIKE @Like OR d.Designation LIKE @Like OR d.MobileNumber LIKE @Like)
      AND (@Status IS NULL OR d.Status = @Status)
      AND (@Status IS NOT NULL OR @IncludeExited = 1 OR d.Status <> N'Exited')
      AND (@Department IS NULL OR d.Department = @Department)
      AND (@Location IS NULL OR d.WorkLocation = @Location)
      AND (@EmployeeType IS NULL OR d.EmployeeType = @EmployeeType)
      AND (@ManagerCode IS NULL OR d.ManagerCode = @ManagerCode)
      AND (@JoinedFrom IS NULL OR d.DateOfJoining >= @JoinedFrom)
      AND (@JoinedTo IS NULL OR d.DateOfJoining <= @JoinedTo)
    ORDER BY
        CASE WHEN @Desc = 0 THEN CASE @SortBy
            WHEN 'code' THEN CAST(d.EmployeeCode AS NVARCHAR(250)) WHEN 'designation' THEN d.Designation
            WHEN 'department' THEN d.Department WHEN 'location' THEN d.WorkLocation WHEN 'status' THEN d.Status
            WHEN 'joined' THEN NULL ELSE d.FullName END END ASC,
        CASE WHEN @Desc = 1 THEN CASE @SortBy
            WHEN 'code' THEN CAST(d.EmployeeCode AS NVARCHAR(250)) WHEN 'designation' THEN d.Designation
            WHEN 'department' THEN d.Department WHEN 'location' THEN d.WorkLocation WHEN 'status' THEN d.Status
            WHEN 'joined' THEN NULL ELSE d.FullName END END DESC,
        CASE WHEN @SortBy = 'joined' AND @Desc = 0 THEN d.DateOfJoining END ASC,
        CASE WHEN @SortBy = 'joined' AND @Desc = 1 THEN d.DateOfJoining END DESC,
        d.FullName, d.Id
    OFFSET (@Page - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY;
END
GO

/* GET api/v1/employees/summary  Numbers for the cards on top of the screen. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_get_summary
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT ISNULL(SUM(CASE WHEN Status <> N'Exited' THEN 1 ELSE 0 END), 0)        AS Total,
           ISNULL(SUM(CASE WHEN Status = N'Active' THEN 1 ELSE 0 END), 0)         AS Active,
           ISNULL(SUM(CASE WHEN Status = N'Onboarding' THEN 1 ELSE 0 END), 0)     AS Onboarding,
           ISNULL(SUM(CASE WHEN Status = N'Probation' THEN 1 ELSE 0 END), 0)      AS Probation,
           ISNULL(SUM(CASE WHEN Status = N'Notice Period' THEN 1 ELSE 0 END), 0)  AS NoticePeriod,
           ISNULL(SUM(CASE WHEN Status = N'On Leave' THEN 1 ELSE 0 END), 0)       AS OnLeave,
           ISNULL(SUM(CASE WHEN Status = N'Inactive' THEN 1 ELSE 0 END), 0)       AS Inactive,
           ISNULL(SUM(CASE WHEN Status = N'Exited' THEN 1 ELSE 0 END), 0)         AS Exited,
           ISNULL(SUM(CASE WHEN Status <> N'Exited'
                            AND DateOfJoining >= DATEADD(DAY, -30, CAST(SYSUTCDATETIME() AS DATE)) THEN 1 ELSE 0 END), 0) AS JoinedLast30Days,
           COUNT(DISTINCT CASE WHEN Status <> N'Exited' THEN Department END)       AS Departments
    FROM emp.fn_directory(@OrganizationId);
END
GO

/* GET api/v1/employees/filters  Values for the filter dropdowns, with counts. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_get_filters
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @D TABLE (Status NVARCHAR(30), Department NVARCHAR(30), WorkLocation NVARCHAR(50), EmployeeType NVARCHAR(20),
                      ManagerCode NVARCHAR(50), ManagerName NVARCHAR(800));
    INSERT @D SELECT Status, Department, WorkLocation, EmployeeType, ManagerCode, ManagerName FROM emp.fn_directory(@OrganizationId);

    SELECT Kind, Value, Label, [Count] FROM (
        SELECT 'department' AS Kind, Department AS Value, Department AS Label, COUNT(*) AS [Count]
        FROM @D WHERE Status <> N'Exited' AND Department IS NOT NULL GROUP BY Department
        UNION ALL
        SELECT 'location', WorkLocation, WorkLocation, COUNT(*)
        FROM @D WHERE Status <> N'Exited' AND WorkLocation IS NOT NULL GROUP BY WorkLocation
        UNION ALL
        SELECT 'type', EmployeeType, EmployeeType, COUNT(*)
        FROM @D WHERE Status <> N'Exited' AND EmployeeType IS NOT NULL GROUP BY EmployeeType
        UNION ALL
        SELECT 'status', Status, Status, COUNT(*) FROM @D GROUP BY Status
        UNION ALL
        SELECT 'manager', ManagerCode, MAX(ManagerName), COUNT(*)
        FROM @D WHERE Status <> N'Exited' AND ManagerCode IS NOT NULL AND ManagerName IS NOT NULL GROUP BY ManagerCode
    ) AS f
    ORDER BY Kind, Label;
END
GO

/* GET api/v1/employees/{code}  Full profile for the side panel (photo as base64). */
CREATE OR ALTER PROCEDURE dbo.sp_dir_get_profile
    @OrganizationId INT,
    @EmployeeCode   VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT d.*, dbo.fn_varbinary_to_base64(e.EmployeePhoto) AS Photo
    FROM emp.fn_directory(@OrganizationId) AS d
    JOIN emp.Employee AS e ON e.Id = d.Id
    WHERE d.EmployeeCode = @EmployeeCode;
END
GO

/* GET api/v1/employees/{code}/status-history  Newest first. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_get_status_history
    @OrganizationId INT,
    @EmployeeCode   VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT h.Id, h.OldStatus, h.NewStatus, h.Reason, h.EffectiveDate, h.ChangedAt, h.ChangedBy
    FROM emp.StatusHistory AS h
    JOIN emp.Employee AS e ON e.Id = h.EmployeeId
    WHERE e.OrganizationId = @OrganizationId AND e.EmployeeCode = @EmployeeCode
    ORDER BY h.ChangedAt DESC, h.Id DESC;
END
GO

/* POST api/v1/employees/{code}/status  @Affected = 0 when the employee does not exist. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_set_status
    @OrganizationId INT,
    @EmployeeCode   VARCHAR(50),
    @Status         NVARCHAR(30),
    @Reason         NVARCHAR(500) = NULL,
    @EffectiveDate  DATE          = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET @Affected = 0;
    SET @Reason = NULLIF(LTRIM(RTRIM(@Reason)), N'');

    IF @Status IS NULL OR @Status NOT IN (N'Onboarding', N'Active', N'Probation', N'Notice Period', N'On Leave', N'Inactive', N'Exited')
        THROW 50901, N'Pick a valid status.', 1;

    DECLARE @Id INT, @Old NVARCHAR(30);
    SELECT @Id = Id, @Old = ISNULL(NULLIF(LTRIM(RTRIM(EmployeeStatus)), N''), N'Active')
    FROM emp.Employee
    WHERE OrganizationId = @OrganizationId AND EmployeeCode = @EmployeeCode AND IsDeleted = 0;
    IF @Id IS NULL RETURN;

    IF @Old = @Status
        THROW 50902, N'The employee already has this status.', 1;
    IF @Status IN (N'Exited', N'Inactive') AND @Reason IS NULL
        THROW 50903, N'Give a reason for this change.', 1;
    IF @Status IN (N'Exited', N'Inactive') AND EXISTS (
        SELECT 1 FROM emp.fn_directory(@OrganizationId) AS t
        WHERE t.ManagerCode = @EmployeeCode AND t.Status NOT IN (N'Exited', N'Inactive'))
        THROW 50904, N'This person still manages a team. Move the team to another manager first.', 1;

    BEGIN TRANSACTION;
    UPDATE emp.Employee
       SET EmployeeStatus = @Status, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    INSERT emp.StatusHistory (EmployeeId, OldStatus, NewStatus, Reason, EffectiveDate, ChangedBy)
    VALUES (@Id, @Old, @Status, @Reason, ISNULL(@EffectiveDate, CAST(SYSUTCDATETIME() AS DATE)), @UserId);
    COMMIT TRANSACTION;

    SET @Affected = 1;
END
GO

/* DELETE api/v1/employees/{code}  Soft delete. Refused while the person manages a team. */
CREATE OR ALTER PROCEDURE dbo.sp_dir_delete
    @OrganizationId INT,
    @EmployeeCode   VARCHAR(50),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET @Affected = 0;

    DECLARE @Id INT, @Old NVARCHAR(30);
    SELECT @Id = Id, @Old = ISNULL(NULLIF(LTRIM(RTRIM(EmployeeStatus)), N''), N'Active')
    FROM emp.Employee
    WHERE OrganizationId = @OrganizationId AND EmployeeCode = @EmployeeCode AND IsDeleted = 0;
    IF @Id IS NULL RETURN;

    IF EXISTS (SELECT 1 FROM emp.fn_directory(@OrganizationId) AS t
               WHERE t.ManagerCode = @EmployeeCode AND t.Status NOT IN (N'Exited', N'Inactive'))
        THROW 50905, N'This person still manages a team. Move the team to another manager first.', 1;

    BEGIN TRANSACTION;
    UPDATE emp.Employee
       SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id;
    INSERT emp.StatusHistory (EmployeeId, OldStatus, NewStatus, Reason, EffectiveDate, ChangedBy)
    VALUES (@Id, @Old, N'Deleted', N'Removed from the directory', CAST(SYSUTCDATETIME() AS DATE), @UserId);
    COMMIT TRANSACTION;

    SET @Affected = 1;
END
GO
