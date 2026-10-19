-- ---------------------------------------------------------------------
-- 11. Holidays (HR holiday calendar)
--    Extends org.Holiday (section 10) with type, description and audit columns.
--    Leave counting (lv.fn_working_days) skips every non-optional holiday.
--    THROW 503xx -> API 422.
-- ---------------------------------------------------------------------
IF COL_LENGTH(N'org.Holiday', N'HolidayType') IS NULL
    ALTER TABLE org.Holiday ADD HolidayType VARCHAR(20) NOT NULL CONSTRAINT DF_Holiday_Type DEFAULT ('Public')
        CONSTRAINT CK_Holiday_Type CHECK (HolidayType IN ('Public', 'Festival', 'Regional', 'Company'));
GO
IF COL_LENGTH(N'org.Holiday', N'Description') IS NULL
    ALTER TABLE org.Holiday ADD [Description] NVARCHAR(200) NULL;
GO
IF COL_LENGTH(N'org.Holiday', N'CreatedBy') IS NULL
    ALTER TABLE org.Holiday ADD CreatedBy NVARCHAR(100) NULL, UpdatedAt DATETIME2(0) NULL, UpdatedBy NVARCHAR(100) NULL;
GO

/* GET api/v1/holidays?year=  (Id + type + description; leave keeps using sp_get_holidays) */
CREATE OR ALTER PROCEDURE dbo.sp_get_holiday_list
    @OrganizationId INT,
    @Year           INT,
    @Id             INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, CAST(HolidayDate AS DATETIME2(0)) AS [Date], [Name], HolidayType AS [Type], IsOptional, [Description]
    FROM org.Holiday
    WHERE OrganizationId = @OrganizationId AND IsDeleted = 0
      AND (@Id IS NOT NULL AND Id = @Id
           OR @Id IS NULL AND HolidayDate >= DATEFROMPARTS(@Year, 1, 1) AND HolidayDate < DATEFROMPARTS(@Year + 1, 1, 1))
    ORDER BY HolidayDate;
END
GO

/* POST api/v1/holidays (@Id NULL) and PUT api/v1/holidays/{id}.
   A date can hold one holiday. Re-adding a date that was deleted brings that row back. */
CREATE OR ALTER PROCEDURE dbo.sp_save_holiday
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @HolidayDate    DATE,
    @Name           NVARCHAR(100),
    @HolidayType    VARCHAR(20)   = 'Public',
    @IsOptional     BIT           = 0,
    @Description    NVARCHAR(200) = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @Msg NVARCHAR(300);
    SET @Name = LTRIM(RTRIM(@Name));
    SET @Description = NULLIF(LTRIM(RTRIM(@Description)), N'');
    IF @Name IS NULL OR LEN(@Name) < 2 THROW 50301, 'Give the holiday a name.', 1;
    IF @HolidayType NOT IN ('Public', 'Festival', 'Regional', 'Company') THROW 50302, 'Unknown holiday type.', 1;

    BEGIN TRANSACTION;

    DECLARE @ClashId INT, @ClashDeleted BIT, @ClashName NVARCHAR(100);
    SELECT @ClashId = Id, @ClashDeleted = IsDeleted, @ClashName = [Name]
    FROM org.Holiday WITH (UPDLOCK, HOLDLOCK)
    WHERE OrganizationId = @OrganizationId AND HolidayDate = @HolidayDate AND (@Id IS NULL OR Id <> @Id);

    IF @ClashId IS NOT NULL AND @ClashDeleted = 0
    BEGIN
        ROLLBACK TRANSACTION;
        SET @Msg = CONCAT(N'', FORMAT(@HolidayDate, 'd MMM yyyy'), N' is already a holiday (', @ClashName, N').');
        THROW 50303, @Msg, 1;
    END

    IF @Id IS NULL
    BEGIN
        IF @ClashId IS NOT NULL
        BEGIN
            -- Revive the deleted row (the date is unique per organization).
            UPDATE org.Holiday
               SET [Name] = @Name, HolidayType = @HolidayType, IsOptional = ISNULL(@IsOptional, 0), [Description] = @Description,
                   IsDeleted = 0, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
             WHERE Id = @ClashId;
            SET @Id = @ClashId;
        END
        ELSE
        BEGIN
            INSERT org.Holiday (OrganizationId, HolidayDate, [Name], HolidayType, IsOptional, [Description], CreatedBy)
            VALUES (@OrganizationId, @HolidayDate, @Name, @HolidayType, ISNULL(@IsOptional, 0), @Description, @UserId);
            SET @Id = SCOPE_IDENTITY();
        END
        SET @Affected = 1;
    END
    ELSE
    BEGIN
        IF @ClashId IS NOT NULL
            -- Moving onto a date whose deleted row still exists: drop that leftover row.
            DELETE org.Holiday WHERE Id = @ClashId AND IsDeleted = 1;

        UPDATE org.Holiday
           SET HolidayDate = @HolidayDate, [Name] = @Name, HolidayType = @HolidayType, IsOptional = ISNULL(@IsOptional, 0),
               [Description] = @Description, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
         WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
        SET @Affected = @@ROWCOUNT;
    END

    COMMIT TRANSACTION;
END
GO

/* DELETE api/v1/holidays/{id} (soft delete) */
CREATE OR ALTER PROCEDURE dbo.sp_delete_holiday
    @Id             INT,
    @OrganizationId INT,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE org.Holiday
       SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsDeleted = 0;
    SET @Affected = @@ROWCOUNT;
END
GO

-- Types + descriptions for the seeded holidays (only rows nobody has edited).
UPDATE h
   SET HolidayType = s.HolidayType, [Description] = s.[Description]
FROM org.Holiday AS h
JOIN (VALUES
    (N'New Year',           'Company',  N'First day of the year.'),
    (N'Republic Day',       'Public',   N'National holiday.'),
    (N'Holi',               'Festival', N'Festival of colours.'),
    (N'Independence Day',   'Public',   N'National holiday.'),
    (N'Gandhi Jayanti',     'Public',   N'National holiday.'),
    (N'Dussehra',           'Festival', N'Vijayadashami.'),
    (N'Diwali',             'Festival', N'Festival of lights.'),
    (N'Guru Nanak Jayanti', 'Festival', N'Guru Nanak''s birthday.'),
    (N'Christmas',          'Festival', N'Christmas Day.')
) AS s ([Name], HolidayType, [Description]) ON s.[Name] = h.[Name]
WHERE h.UpdatedAt IS NULL AND h.[Description] IS NULL;
GO
