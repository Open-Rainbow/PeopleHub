-- Policies module (section 15 of PeopleHub.sql). Needs sections 1-5 (org, emp, helpers). Re-runnable.
-- ---------------------------------------------------------------------
-- 15. Company policies
--    pol.Policy      policy documents (floor / desk management, WFH, IT use, ...): text and/or an attached file
--    pol.PolicyAck   "I have read this" per employee per policy version
--    Admin / HR create, upload, publish, archive. Employees see published policies for everyone or their department,
--    read them, download the file and acknowledge the ones that need it. Publishing a new version asks everyone again.
--    THROW 507xx -> API 422.
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'pol') IS NULL EXEC (N'CREATE SCHEMA pol');
GO

IF OBJECT_ID(N'pol.Policy', N'U') IS NULL
BEGIN
CREATE TABLE pol.Policy
(
    Id              INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Policy PRIMARY KEY,
    OrganizationId  INT            NOT NULL CONSTRAINT FK_Policy_Organization REFERENCES org.Organization (Id),
    Title           NVARCHAR(150)  NOT NULL,
    Category        VARCHAR(30)    NOT NULL,
    Summary         NVARCHAR(500)  NULL,
    Content         NVARCHAR(MAX)  NULL,
    FileName        NVARCHAR(200)  NULL,
    FileContentType VARCHAR(100)   NULL,
    FileSize        INT            NULL,
    FileData        VARBINARY(MAX) NULL,
    Version         INT            NOT NULL CONSTRAINT DF_Policy_Version DEFAULT (1),
    EffectiveFrom   DATE           NULL,
    [Status]        VARCHAR(10)    NOT NULL CONSTRAINT DF_Policy_Status DEFAULT ('Draft')
                                   CONSTRAINT CK_Policy_Status CHECK ([Status] IN ('Draft', 'Published', 'Archived')),
    RequiresAck     BIT            NOT NULL CONSTRAINT DF_Policy_RequiresAck DEFAULT (0),
    Audience        NVARCHAR(50)   NULL,          -- department name; NULL = everyone
    IsPinned        BIT            NOT NULL CONSTRAINT DF_Policy_IsPinned DEFAULT (0),
    PublishedAt     DATETIME2(0)   NULL,
    PublishedBy     NVARCHAR(100)  NULL,
    IsDeleted       BIT            NOT NULL CONSTRAINT DF_Policy_IsDeleted DEFAULT (0),
    CreatedAt       DATETIME2(0)   NOT NULL CONSTRAINT DF_Policy_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy       NVARCHAR(100)  NULL,
    UpdatedAt       DATETIME2(0)   NULL,
    UpdatedBy       NVARCHAR(100)  NULL
);
CREATE INDEX IX_Policy_Org ON pol.Policy (OrganizationId, [Status]) WHERE IsDeleted = 0;
END
GO

IF OBJECT_ID(N'pol.PolicyAck', N'U') IS NULL
BEGIN
CREATE TABLE pol.PolicyAck
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_PolicyAck PRIMARY KEY,
    PolicyId       INT          NOT NULL CONSTRAINT FK_PolicyAck_Policy REFERENCES pol.Policy (Id),
    EmployeeId     INT          NOT NULL CONSTRAINT FK_PolicyAck_Employee REFERENCES emp.Employee (Id),
    Version        INT          NOT NULL,
    AcknowledgedAt DATETIME2(0) NOT NULL CONSTRAINT DF_PolicyAck_At DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT UX_PolicyAck UNIQUE (PolicyId, EmployeeId, Version)
);
END
GO

/* Department of an employee (latest employment record). */
CREATE OR ALTER FUNCTION pol.fn_department (@EmpPk INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    RETURN (SELECT TOP (1) d.Department FROM emp.EmploymentDetail AS d WHERE d.EmployeeId = @EmpPk AND d.IsDeleted = 0 ORDER BY d.Id DESC);
END
GO

/* Active employees a policy is meant for. */
CREATE OR ALTER FUNCTION pol.fn_audience (@OrganizationId INT, @Audience NVARCHAR(50))
RETURNS TABLE
AS
RETURN
    SELECT e.Id AS EmpPk, e.EmployeeCode, e.FullName, pol.fn_department(e.Id) AS Department
    FROM emp.Employee AS e
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0
      AND ISNULL(e.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive')
      AND (@Audience IS NULL OR pol.fn_department(e.Id) = @Audience);
GO

/* GET api/v1/policies  |  GET api/v1/policies/{id}
   @Manage = 0 (employee): published only, for everyone or the employee's department. Content only with @Id. */
CREATE OR ALTER PROCEDURE dbo.sp_pol_get_policies
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50)   = NULL,
    @Manage         BIT           = 0,
    @Status         VARCHAR(10)   = NULL,
    @Category       VARCHAR(30)   = NULL,
    @Search         NVARCHAR(100) = NULL,
    @Id             INT           = NULL
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    IF @Manage = 0 AND @EmpPk IS NULL THROW 50701, 'Employee not found.', 1;
    DECLARE @Dept NVARCHAR(50) = CASE WHEN @EmpPk IS NULL THEN NULL ELSE pol.fn_department(@EmpPk) END;
    DECLARE @Like NVARCHAR(110) = CASE WHEN NULLIF(LTRIM(RTRIM(@Search)), N'') IS NULL THEN NULL ELSE N'%' + LTRIM(RTRIM(@Search)) + N'%' END;

    SELECT p.Id, p.Title, p.Category, p.Summary,
           CASE WHEN @Id IS NOT NULL THEN p.Content END AS Content,
           CAST(CASE WHEN LEN(ISNULL(p.Content, N'')) > 0 THEN 1 ELSE 0 END AS BIT) AS HasContent,
           p.FileName, p.FileContentType, p.FileSize,
           CAST(CASE WHEN p.FileData IS NULL THEN 0 ELSE 1 END AS BIT) AS HasFile,
           p.Version, CAST(p.EffectiveFrom AS DATETIME2(0)) AS EffectiveFrom, p.[Status], p.RequiresAck, p.Audience, p.IsPinned,
           p.PublishedAt, p.PublishedBy, p.CreatedAt, p.CreatedBy, ISNULL(p.UpdatedAt, p.CreatedAt) AS UpdatedAt, p.UpdatedBy,
           a.AcknowledgedAt,
           (SELECT COUNT(*) FROM pol.PolicyAck AS k JOIN pol.fn_audience(@OrganizationId, p.Audience) AS u ON u.EmpPk = k.EmployeeId
            WHERE k.PolicyId = p.Id AND k.Version = p.Version) AS AckCount,
           (SELECT COUNT(*) FROM pol.fn_audience(@OrganizationId, p.Audience)) AS AudienceCount
    FROM pol.Policy AS p
    OUTER APPLY (SELECT TOP (1) k.AcknowledgedAt FROM pol.PolicyAck AS k
                 WHERE k.PolicyId = p.Id AND k.EmployeeId = @EmpPk AND k.Version = p.Version) AS a
    WHERE p.OrganizationId = @OrganizationId AND p.IsDeleted = 0
      AND (@Id IS NULL OR p.Id = @Id)
      AND (@Manage = 1 OR (p.[Status] = 'Published' AND (p.Audience IS NULL OR p.Audience = @Dept)))
      AND (@Status IS NULL OR p.[Status] = @Status)
      AND (@Category IS NULL OR p.Category = @Category)
      AND (@Like IS NULL OR p.Title LIKE @Like OR p.Summary LIKE @Like OR p.FileName LIKE @Like)
    ORDER BY p.IsPinned DESC, CASE p.[Status] WHEN 'Published' THEN 0 WHEN 'Draft' THEN 1 ELSE 2 END,
             ISNULL(p.PublishedAt, p.CreatedAt) DESC;
END
GO

/* GET api/v1/policies/{id}/file */
CREATE OR ALTER PROCEDURE dbo.sp_pol_get_file
    @OrganizationId INT,
    @Id             INT,
    @Employee_Id    VARCHAR(50) = NULL,
    @Manage         BIT         = 0
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = CASE WHEN @Employee_Id IS NULL THEN NULL ELSE dbo.fn_employee_pk(@Employee_Id) END;
    DECLARE @Dept NVARCHAR(50) = CASE WHEN @EmpPk IS NULL THEN NULL ELSE pol.fn_department(@EmpPk) END;

    SELECT p.FileName, p.FileContentType, p.FileData
    FROM pol.Policy AS p
    WHERE p.Id = @Id AND p.OrganizationId = @OrganizationId AND p.IsDeleted = 0 AND p.FileData IS NOT NULL
      AND (@Manage = 1 OR (@EmpPk IS NOT NULL AND p.[Status] = 'Published' AND (p.Audience IS NULL OR p.Audience = @Dept)));
END
GO

/* POST api/v1/policies  |  PUT api/v1/policies/{id}
   @FileAction: keep | replace | remove.  @BumpVersion = 1 on a published policy: new version, everyone acknowledges again. */
CREATE OR ALTER PROCEDURE dbo.sp_pol_save_policy
    @Id              INT            = NULL OUTPUT,
    @OrganizationId  INT,
    @Title           NVARCHAR(150),
    @Category        VARCHAR(30),
    @Summary         NVARCHAR(500)  = NULL,
    @Content         NVARCHAR(MAX)  = NULL,
    @FileAction      VARCHAR(10)    = 'keep',
    @FileName        NVARCHAR(200)  = NULL,
    @FileContentType VARCHAR(100)   = NULL,
    @FileData        VARBINARY(MAX) = NULL,
    @EffectiveFrom   DATE           = NULL,
    @RequiresAck     BIT            = 0,
    @Audience        NVARCHAR(50)   = NULL,
    @IsPinned        BIT            = 0,
    @Publish         BIT            = 0,
    @BumpVersion     BIT            = 0,
    @UserId          NVARCHAR(100)  = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET @Title = LTRIM(RTRIM(@Title));
    SET @Audience = NULLIF(LTRIM(RTRIM(@Audience)), N'');
    SET @Content = NULLIF(LTRIM(RTRIM(@Content)), N'');

    IF EXISTS (SELECT 1 FROM pol.Policy WHERE OrganizationId = @OrganizationId AND IsDeleted = 0 AND Title = @Title AND (@Id IS NULL OR Id <> @Id))
        THROW 50702, 'A policy with this title already exists.', 1;
    IF @Audience IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pol.fn_audience(@OrganizationId, @Audience))
        THROW 50703, 'Nobody works in that department yet.', 1;

    DECLARE @Bytes VARBINARY(MAX) = CASE WHEN @FileAction = 'replace' THEN @FileData END;
    IF @FileAction = 'replace' AND (@Bytes IS NULL OR DATALENGTH(@Bytes) = 0) THROW 50704, 'The uploaded file is empty or unreadable.', 1;

    BEGIN TRANSACTION;
    IF @Id IS NULL
    BEGIN
        IF @Content IS NULL AND @Bytes IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50705, 'Write the policy or attach a file.', 1;
        END
        INSERT pol.Policy (OrganizationId, Title, Category, Summary, Content, FileName, FileContentType, FileSize, FileData, EffectiveFrom,
                           [Status], RequiresAck, Audience, IsPinned, PublishedAt, PublishedBy, CreatedBy)
        VALUES (@OrganizationId, @Title, @Category, NULLIF(LTRIM(RTRIM(@Summary)), N''), @Content,
                CASE WHEN @Bytes IS NULL THEN NULL ELSE @FileName END, CASE WHEN @Bytes IS NULL THEN NULL ELSE @FileContentType END,
                DATALENGTH(@Bytes), @Bytes, @EffectiveFrom,
                CASE WHEN @Publish = 1 THEN 'Published' ELSE 'Draft' END, ISNULL(@RequiresAck, 0), @Audience, ISNULL(@IsPinned, 0),
                CASE WHEN @Publish = 1 THEN SYSUTCDATETIME() END, CASE WHEN @Publish = 1 THEN @UserId END, @UserId);
        SET @Id = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        DECLARE @Status VARCHAR(10);
        SELECT @Status = [Status] FROM pol.Policy WITH (UPDLOCK) WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
        IF @Status IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50706, 'Policy not found.', 1;
        END

        UPDATE pol.Policy
        SET Title = @Title, Category = @Category, Summary = NULLIF(LTRIM(RTRIM(@Summary)), N''), Content = @Content,
            FileName        = CASE @FileAction WHEN 'replace' THEN @FileName WHEN 'remove' THEN NULL ELSE FileName END,
            FileContentType = CASE @FileAction WHEN 'replace' THEN @FileContentType WHEN 'remove' THEN NULL ELSE FileContentType END,
            FileSize        = CASE @FileAction WHEN 'replace' THEN DATALENGTH(@Bytes) WHEN 'remove' THEN NULL ELSE FileSize END,
            FileData        = CASE @FileAction WHEN 'replace' THEN @Bytes WHEN 'remove' THEN NULL ELSE FileData END,
            EffectiveFrom = @EffectiveFrom, RequiresAck = ISNULL(@RequiresAck, 0), Audience = @Audience, IsPinned = ISNULL(@IsPinned, 0),
            Version = CASE WHEN @BumpVersion = 1 AND @Status = 'Published' THEN Version + 1 ELSE Version END,
            [Status] = CASE WHEN @Publish = 1 THEN 'Published' ELSE [Status] END,
            PublishedAt = CASE WHEN @Publish = 1 AND (@Status <> 'Published' OR @BumpVersion = 1) THEN SYSUTCDATETIME() ELSE PublishedAt END,
            PublishedBy = CASE WHEN @Publish = 1 AND (@Status <> 'Published' OR @BumpVersion = 1) THEN @UserId ELSE PublishedBy END,
            UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHERE Id = @Id;

        IF EXISTS (SELECT 1 FROM pol.Policy WHERE Id = @Id AND Content IS NULL AND FileData IS NULL)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50705, 'Write the policy or attach a file.', 1;
        END
    END
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/policies/{id}/status  Draft | Published | Archived */
CREATE OR ALTER PROCEDURE dbo.sp_pol_set_status
    @OrganizationId INT,
    @Id             INT,
    @Status         VARCHAR(10),
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    IF @Status NOT IN ('Draft', 'Published', 'Archived') THROW 50707, 'Status must be Draft, Published or Archived.', 1;

    UPDATE pol.Policy
    SET PublishedAt = CASE WHEN @Status = 'Published' AND [Status] <> 'Published' THEN SYSUTCDATETIME() ELSE PublishedAt END,
        PublishedBy = CASE WHEN @Status = 'Published' AND [Status] <> 'Published' THEN @UserId ELSE PublishedBy END,
        [Status] = @Status, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    SET @Affected = @@ROWCOUNT;
END
GO

/* DELETE api/v1/policies/{id}  Soft delete (acknowledgements stay for audit). */
CREATE OR ALTER PROCEDURE dbo.sp_pol_delete_policy
    @OrganizationId INT,
    @Id             INT,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE pol.Policy SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    SET @Affected = @@ROWCOUNT;
END
GO

/* POST api/v1/policies/{id}/acknowledge  Re-acknowledging the same version is a no-op. */
CREATE OR ALTER PROCEDURE dbo.sp_pol_acknowledge
    @OrganizationId INT,
    @Id             INT,
    @Employee_Id    VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @EmpPk INT = dbo.fn_employee_pk(@Employee_Id);
    IF @EmpPk IS NULL THROW 50701, 'Employee not found.', 1;
    DECLARE @Version INT, @Audience NVARCHAR(50), @Status VARCHAR(10);
    SELECT @Version = Version, @Audience = Audience, @Status = [Status]
    FROM pol.Policy WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    IF @Version IS NULL OR @Status <> 'Published' THROW 50708, 'This policy is not published.', 1;
    IF @Audience IS NOT NULL AND ISNULL(pol.fn_department(@EmpPk), N'') <> @Audience THROW 50709, 'This policy is not for your department.', 1;

    IF NOT EXISTS (SELECT 1 FROM pol.PolicyAck WHERE PolicyId = @Id AND EmployeeId = @EmpPk AND Version = @Version)
        INSERT pol.PolicyAck (PolicyId, EmployeeId, Version) VALUES (@Id, @EmpPk, @Version);
END
GO

/* GET api/v1/policies/{id}/acknowledgements  Everyone in the audience; AcknowledgedAt NULL = still pending. */
CREATE OR ALTER PROCEDURE dbo.sp_pol_get_acknowledgements
    @OrganizationId INT,
    @Id             INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @Version INT, @Audience NVARCHAR(50);
    SELECT @Version = Version, @Audience = Audience FROM pol.Policy WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    IF @Version IS NULL THROW 50706, 'Policy not found.', 1;

    SELECT u.EmployeeCode AS EmployeeId, u.FullName AS EmployeeName, u.Department, k.AcknowledgedAt, @Version AS Version
    FROM pol.fn_audience(@OrganizationId, @Audience) AS u
    LEFT JOIN pol.PolicyAck AS k ON k.PolicyId = @Id AND k.EmployeeId = u.EmpPk AND k.Version = @Version
    ORDER BY CASE WHEN k.AcknowledgedAt IS NULL THEN 0 ELSE 1 END, u.FullName;
END
GO

-- ---------------------------------------------------------------------
-- Seed (demo organization)
-- ---------------------------------------------------------------------
DECLARE @PolOrg INT = (SELECT TOP (1) Id FROM org.Organization ORDER BY Id);
IF @PolOrg IS NOT NULL AND NOT EXISTS (SELECT 1 FROM pol.Policy WHERE OrganizationId = @PolOrg)
BEGIN
    INSERT pol.Policy (OrganizationId, Title, Category, Summary, Content, EffectiveFrom, [Status], RequiresAck, IsPinned, PublishedAt, PublishedBy, CreatedBy)
    VALUES
    (@PolOrg, N'Floor and desk management', 'Workplace',
     N'How desks are allocated, booked and kept on each floor.',
     N'1. Desk allocation
- Floors are split into team zones. Ask Facilities to change your zone.
- Hot desks (marked H) are first come, first served, or bookable a week ahead.

2. Booking a desk
- Book in PeopleHub or at the floor kiosk before 10:00 on the day.
- Bookings not checked in by 11:00 are released.

3. Clean desk
- Clear your desk at the end of every day. Lock laptops and papers in your pedestal.
- Leave the monitor, dock and chair as you found them.

4. Quiet zones and meeting rooms
- Floor 3 east wing is a quiet zone: no calls.
- Meeting rooms are for meetings of 2 or more; release them if plans change.

5. Visitors
- Register visitors at reception. They must be escorted on every floor.

Questions: facilities@openrainbow.com',
     '2026-06-01', 'Published', 1, 1, SYSUTCDATETIME(), N'seed', N'seed'),
    (@PolOrg, N'Work from home', 'HR',
     N'Who can work remotely, how to request it and what is expected.',
     N'- Up to 2 remote days a week after probation, agreed with your manager.
- Mark the day as Remote when you check in.
- Be reachable during core hours (11:00 - 16:00).
- Use the company VPN for all work systems.',
     '2026-04-01', 'Published', 0, 0, SYSUTCDATETIME(), N'seed', N'seed'),
    (@PolOrg, N'Acceptable use of IT assets', 'IT & Security',
     N'Rules for laptops, accounts, passwords and company data.',
     N'- Never share your password or MFA codes.
- Lock your screen when you leave your desk (Win + L).
- Install software only from the company portal.
- Report lost devices to IT within 1 hour.',
     '2026-04-01', 'Published', 1, 0, SYSUTCDATETIME(), N'seed', N'seed'),
    (@PolOrg, N'Travel and expenses', 'Finance',
     N'Draft: limits for travel, stay and meals on business trips.',
     N'Draft under review by Finance.',
     NULL, 'Draft', 0, 0, NULL, NULL, N'seed');

    -- Two people already acknowledged the desk policy.
    INSERT pol.PolicyAck (PolicyId, EmployeeId, Version)
    SELECT p.Id, e.Id, p.Version
    FROM pol.Policy AS p
    JOIN emp.Employee AS e ON e.OrganizationId = @PolOrg AND e.EmployeeCode IN ('EMP00002', 'EMP00004') AND e.IsDeleted = 0
    WHERE p.OrganizationId = @PolOrg AND p.Title = N'Floor and desk management';
END
GO
