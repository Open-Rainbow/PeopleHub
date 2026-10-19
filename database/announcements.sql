/* Announcements module. Also included as section 9 of PeopleHub.sql.
   Run after PeopleHub.sql (needs org.Organization). Safe to re-run. */
USE PeopleHub;
GO
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

-- ---------------------------------------------------------------------
-- 9. Announcements
--    ann.Announcement      one row per announcement (per organization)
--    ann.AnnouncementRead  who has read what (one row per user + announcement)
--    Status is never stored: Scheduled (publish in future), Expired (expiry
--    in past) or Active, always computed against today's date.
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'ann') IS NULL EXEC (N'CREATE SCHEMA ann');
GO

IF OBJECT_ID(N'ann.Announcement', N'U') IS NULL
BEGIN
CREATE TABLE ann.Announcement
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Announcement PRIMARY KEY,
    OrganizationId INT            NOT NULL CONSTRAINT FK_Announcement_Organization REFERENCES org.Organization (Id),
    Title          NVARCHAR(120)  NOT NULL,
    [Description]  NVARCHAR(2000) NOT NULL,
    [Priority]     VARCHAR(10)    NOT NULL CONSTRAINT DF_Announcement_Priority DEFAULT ('Medium')
                                  CONSTRAINT CK_Announcement_Priority CHECK ([Priority] IN ('High', 'Medium', 'Low')),
    Category       NVARCHAR(50)   NOT NULL CONSTRAINT DF_Announcement_Category DEFAULT (N'General'),
    Department     NVARCHAR(100)  NOT NULL CONSTRAINT DF_Announcement_Department DEFAULT (N'All Departments'),
    TargetAudience NVARCHAR(50)   NOT NULL CONSTRAINT DF_Announcement_TargetAudience DEFAULT (N'All Employees'),
    PublishOn      DATE           NOT NULL,
    ExpiresOn      DATE           NOT NULL,
    IsPinned       BIT            NOT NULL CONSTRAINT DF_Announcement_IsPinned DEFAULT (0),
    PostedBy       NVARCHAR(100)  NOT NULL CONSTRAINT DF_Announcement_PostedBy DEFAULT (N'HR Team'),
    IsDeleted      BIT            NOT NULL CONSTRAINT DF_Announcement_IsDeleted DEFAULT (0),
    CreatedAt      DATETIME2(0)   NOT NULL CONSTRAINT DF_Announcement_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100)  NULL,
    UpdatedAt      DATETIME2(0)   NULL,
    UpdatedBy      NVARCHAR(100)  NULL,
    CONSTRAINT CK_Announcement_Dates CHECK (ExpiresOn >= PublishOn)
);
CREATE INDEX IX_Announcement_Org_Dates
    ON ann.Announcement (OrganizationId, IsDeleted, PublishOn, ExpiresOn)
    INCLUDE (IsPinned, [Priority]);
END
GO

IF OBJECT_ID(N'ann.AnnouncementRead', N'U') IS NULL
BEGIN
CREATE TABLE ann.AnnouncementRead
(
    AnnouncementId INT           NOT NULL CONSTRAINT FK_AnnouncementRead_Announcement REFERENCES ann.Announcement (Id),
    UserId         NVARCHAR(100) NOT NULL,
    ReadAt         DATETIME2(0)  NOT NULL CONSTRAINT DF_AnnouncementRead_ReadAt DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT PK_AnnouncementRead PRIMARY KEY (AnnouncementId, UserId)
);
CREATE INDEX IX_AnnouncementRead_User ON ann.AnnouncementRead (UserId) INCLUDE (AnnouncementId);
END
GO

-- Shared shape for list + single fetch (inline TVF, so filters are pushed down).
CREATE OR ALTER FUNCTION ann.fn_announcements (@OrganizationId INT, @UserId NVARCHAR(100))
RETURNS TABLE
AS
RETURN
    SELECT
        a.Id,
        a.Title,
        a.[Description],
        a.[Priority],
        a.Category,
        a.Department,
        a.TargetAudience,
        CAST(a.PublishOn AS DATETIME2(0)) AS PublishOn,
        CAST(a.ExpiresOn AS DATETIME2(0)) AS ExpiresOn,
        a.IsPinned,
        a.PostedBy,
        CASE
            WHEN a.PublishOn > CAST(GETDATE() AS DATE) THEN 'Scheduled'
            WHEN a.ExpiresOn < CAST(GETDATE() AS DATE) THEN 'Expired'
            ELSE 'Active'
        END AS [Status],
        CAST(CASE WHEN EXISTS (SELECT 1 FROM ann.AnnouncementRead r
                               WHERE r.AnnouncementId = a.Id AND r.UserId = @UserId) THEN 1 ELSE 0 END AS BIT) AS IsRead,
        (SELECT COUNT(*) FROM ann.AnnouncementRead r WHERE r.AnnouncementId = a.Id) AS ReadCount,
        a.CreatedAt,
        a.UpdatedAt
    FROM ann.Announcement AS a
    WHERE a.OrganizationId = @OrganizationId
      AND a.IsDeleted = 0;
GO

/* GET api/v1/announcements
   @Status: All | Active | Scheduled | Expired. Pinned first, then newest. */
CREATE OR ALTER PROCEDURE dbo.sp_get_announcements
    @OrganizationId   INT,
    @UserId           NVARCHAR(100),
    @Status           VARCHAR(20)   = 'All',
    @Search           NVARCHAR(100) = NULL,
    @IncludeScheduled BIT           = 1
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Like NVARCHAR(110) = CASE WHEN NULLIF(LTRIM(RTRIM(@Search)), N'') IS NULL THEN NULL
                                       ELSE N'%' + LTRIM(RTRIM(@Search)) + N'%' END;

    SELECT *
    FROM ann.fn_announcements(@OrganizationId, @UserId) AS a
    WHERE (ISNULL(@Status, 'All') = 'All' OR a.[Status] = @Status)
      AND (@IncludeScheduled = 1 OR a.[Status] <> 'Scheduled')
      AND (@Like IS NULL
           OR a.Title LIKE @Like
           OR a.[Description] LIKE @Like
           OR a.PostedBy LIKE @Like
           OR a.Category LIKE @Like
           OR a.Department LIKE @Like
           OR a.TargetAudience LIKE @Like)
    ORDER BY a.IsPinned DESC, a.PublishOn DESC, a.Id DESC;
END
GO

/* GET api/v1/announcements/{id} */
CREATE OR ALTER PROCEDURE dbo.sp_get_announcement
    @OrganizationId INT,
    @UserId         NVARCHAR(100),
    @Id             INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM ann.fn_announcements(@OrganizationId, @UserId) WHERE Id = @Id;
END
GO

/* GET api/v1/announcements/summary (Unread counts only Active announcements) */
CREATE OR ALTER PROCEDURE dbo.sp_get_announcement_summary
    @OrganizationId INT,
    @UserId         NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        COUNT(*)                                                                  AS Total,
        ISNULL(SUM(CASE WHEN [Status] = 'Active' THEN 1 ELSE 0 END), 0)               AS Active,
        ISNULL(SUM(CASE WHEN [Status] = 'Scheduled' THEN 1 ELSE 0 END), 0)            AS Scheduled,
        ISNULL(SUM(CASE WHEN [Status] = 'Expired' THEN 1 ELSE 0 END), 0)              AS Expired,
        ISNULL(SUM(CASE WHEN [Status] = 'Active' AND IsRead = 0 THEN 1 ELSE 0 END), 0) AS Unread
    FROM ann.fn_announcements(@OrganizationId, @UserId);
END
GO

/* POST (insert, @Id NULL) and PUT (update) api/v1/announcements.
   Update of a missing/deleted row returns @Id = NULL (the API turns it into 404). */
CREATE OR ALTER PROCEDURE dbo.sp_save_announcement
    @Id             INT            = NULL OUTPUT,
    @OrganizationId INT,
    @Title          NVARCHAR(120),
    @Description    NVARCHAR(2000),
    @Priority       VARCHAR(10),
    @Category       NVARCHAR(50),
    @Department     NVARCHAR(100),
    @TargetAudience NVARCHAR(50),
    @PublishOn      DATE,
    @ExpiresOn      DATE,
    @IsPinned       BIT            = 0,
    @PostedBy       NVARCHAR(100)  = NULL,
    @UserId         NVARCHAR(100)  = NULL,
    @ResultMessage  VARCHAR(200)   = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    IF NOT EXISTS (SELECT 1 FROM org.Organization WHERE Id = @OrganizationId AND IsDeleted = 0)
        THROW 50101, 'Organization not found.', 1;
    IF NULLIF(LTRIM(RTRIM(@Title)), N'') IS NULL OR NULLIF(LTRIM(RTRIM(@Description)), N'') IS NULL
        THROW 50102, 'Title and description are required.', 1;
    IF @Priority NOT IN ('High', 'Medium', 'Low')
        THROW 50103, 'Priority must be High, Medium or Low.', 1;
    IF @PublishOn IS NULL OR @ExpiresOn IS NULL OR @ExpiresOn < @PublishOn
        THROW 50104, 'Expiry date must be on or after the publish date.', 1;

    IF ISNULL(@Id, 0) = 0
    BEGIN
        INSERT ann.Announcement
            (OrganizationId, Title, [Description], [Priority], Category, Department, TargetAudience,
             PublishOn, ExpiresOn, IsPinned, PostedBy, CreatedBy)
        VALUES
            (@OrganizationId, LTRIM(RTRIM(@Title)), LTRIM(RTRIM(@Description)), @Priority,
             ISNULL(@Category, N'General'), ISNULL(@Department, N'All Departments'), ISNULL(@TargetAudience, N'All Employees'),
             @PublishOn, @ExpiresOn, ISNULL(@IsPinned, 0), ISNULL(NULLIF(LTRIM(RTRIM(@PostedBy)), N''), N'HR Team'), @UserId);

        SET @Id = SCOPE_IDENTITY();
        SET @ResultMessage = CASE WHEN @PublishOn > CAST(GETDATE() AS DATE)
                                  THEN 'Announcement scheduled successfully.'
                                  ELSE 'Announcement published successfully.' END;
        RETURN;
    END

    UPDATE ann.Announcement SET
        Title          = LTRIM(RTRIM(@Title)),
        [Description]  = LTRIM(RTRIM(@Description)),
        [Priority]     = @Priority,
        Category       = ISNULL(@Category, Category),
        Department     = ISNULL(@Department, Department),
        TargetAudience = ISNULL(@TargetAudience, TargetAudience),
        PublishOn      = @PublishOn,
        ExpiresOn      = @ExpiresOn,
        IsPinned       = ISNULL(@IsPinned, IsPinned),
        PostedBy       = ISNULL(NULLIF(LTRIM(RTRIM(@PostedBy)), N''), PostedBy),
        UpdatedAt      = SYSUTCDATETIME(),
        UpdatedBy      = @UserId
    WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;

    IF @@ROWCOUNT = 0
    BEGIN
        SET @Id = NULL;
        SET @ResultMessage = 'Announcement not found.';
        RETURN;
    END

    SET @ResultMessage = 'Announcement updated successfully.';
END
GO

/* PATCH api/v1/announcements/{id}/pin */
CREATE OR ALTER PROCEDURE dbo.sp_set_announcement_pin
    @Id             INT,
    @OrganizationId INT,
    @IsPinned       BIT,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE ann.Announcement
       SET IsPinned = @IsPinned, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    SET @Affected = @@ROWCOUNT;
END
GO

/* DELETE api/v1/announcements/{id} (soft delete) */
CREATE OR ALTER PROCEDURE dbo.sp_delete_announcement
    @Id             INT,
    @OrganizationId INT,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE ann.Announcement
       SET IsDeleted = 1, IsPinned = 0, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    SET @Affected = @@ROWCOUNT;
END
GO

/* POST api/v1/announcements/read  body { "ids": [1,2,3] }. Idempotent. */
CREATE OR ALTER PROCEDURE dbo.sp_mark_announcements_read
    @OrganizationId INT,
    @UserId         NVARCHAR(100),
    @IdsJson        NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    IF ISJSON(@IdsJson) = 0 THROW 50105, 'Ids must be a JSON array.', 1;

    INSERT ann.AnnouncementRead (AnnouncementId, UserId)
    SELECT DISTINCT a.Id, @UserId
    FROM OPENJSON(@IdsJson) WITH (Id INT '$') AS j
    JOIN ann.Announcement AS a
      ON a.Id = j.Id AND a.OrganizationId = @OrganizationId AND a.IsDeleted = 0
    WHERE NOT EXISTS (SELECT 1 FROM ann.AnnouncementRead r WHERE r.AnnouncementId = a.Id AND r.UserId = @UserId);
END
GO

-- Demo announcements (only when the table is empty). Dates are relative to the day the script runs.
IF NOT EXISTS (SELECT 1 FROM ann.Announcement)
   AND EXISTS (SELECT 1 FROM org.Organization)
BEGIN
    DECLARE @Org INT = (SELECT MIN(Id) FROM org.Organization);
    DECLARE @Today DATE = CAST(GETDATE() AS DATE);

    INSERT ann.Announcement (OrganizationId, Title, [Description], [Priority], Category, Department, TargetAudience, PublishOn, ExpiresOn, IsPinned, PostedBy, CreatedBy)
    VALUES
    (@Org, N'Diwali celebrations and office closure',
     N'Join us for Diwali celebrations in the cafeteria on Friday at 4 PM: sweets, rangoli and a team photo.' + CHAR(10) + CHAR(10) + N'The office will stay closed on the following Monday. Emergency support rotations are shared with team leads.',
     'High', N'Celebration', N'All Departments', N'All Employees', DATEADD(DAY, -1, @Today), DATEADD(DAY, 10, @Today), 1, N'HR Team', N'seed'),
    (@Org, N'Updated leave policy for 2027',
     N'The 2027 leave policy is live. Highlights: 2 extra wellness days, carry-forward raised to 10 days, and paternity leave extended to 4 weeks. Please read the full policy in the HR portal before 30 November.',
     'High', N'Policy', N'All Departments', N'All Employees', DATEADD(DAY, -3, @Today), DATEADD(DAY, 40, @Today), 1, N'HR Team', N'seed'),
    (@Org, N'VPN maintenance this Saturday',
     N'The corporate VPN will be unavailable on Saturday between 10 PM and 2 AM IST for a firmware upgrade. Save your work and disconnect before the window starts.',
     'Medium', N'IT & Systems', N'Engineering', N'All Employees', @Today, DATEADD(DAY, 5, @Today), 0, N'IT Helpdesk', N'seed'),
    (@Org, N'Welcome our new joiners',
     N'Please welcome the new members who joined the web team this week. Onboarding buddies have been assigned. Say hi on the team channel!',
     'Low', N'General', N'Engineering', N'All Employees', DATEADD(DAY, -2, @Today), DATEADD(DAY, 12, @Today), 0, N'Engineering Office', N'seed'),
    (@Org, N'Quarterly town hall',
     N'Our Q4 town hall is on the last Thursday of the month at 5 PM IST. Submit your questions for the leadership team using the form in the HR portal.',
     'Medium', N'Event', N'All Departments', N'All Employees', DATEADD(DAY, 4, @Today), DATEADD(DAY, 20, @Today), 0, N'Leadership Office', N'seed'),
    (@Org, N'Manager training: giving effective feedback',
     N'A 2-hour workshop for people managers on structured feedback and growth conversations. Seats are limited to 25. Register by Wednesday.',
     'Low', N'Training', N'All Departments', N'Managers', DATEADD(DAY, -6, @Today), DATEADD(DAY, 2, @Today), 0, N'L&D Team', N'seed'),
    (@Org, N'Submit investment declarations',
     N'Submit your tax investment declarations for this financial year so that the correct TDS is applied from next month''s payroll.',
     'High', N'HR', N'Finance', N'All Employees', DATEADD(DAY, -25, @Today), DATEADD(DAY, -5, @Today), 0, N'Payroll Team', N'seed'),
    (@Org, N'Independence Day flag hoisting',
     N'Flag hoisting at 9 AM in the main lobby, followed by breakfast for everyone.',
     'Low', N'Holiday', N'All Departments', N'All Employees', DATEADD(DAY, -70, @Today), DATEADD(DAY, -64, @Today), 0, N'HR Team', N'seed');
END
GO

PRINT 'Announcements module is ready.';
GO
