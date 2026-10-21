/* ===== SECTION 18: ORGANIZATIONS (Super Admin) ===== */
/* Run after sections 1-17. Safe to run again.
   API: PeopleHub.Server OrganizationsController (api/v1/organizations). Error codes 51001-51005.
   - Extra details on org.Organization (address, contact, currency, financial year, tax id ...)
   - A new organization gets the system roles and their default access right away (sp_sec_ensure_defaults)
   - Add Employee now saves the employee in the organization the request is for
   - The "Others" page is removed from the page catalogue */

-- ---------------------------------------------------------------------
-- Extra organization details
-- ---------------------------------------------------------------------
IF COL_LENGTH('org.Organization', 'LegalName') IS NULL               ALTER TABLE org.Organization ADD LegalName NVARCHAR(200) NULL;
IF COL_LENGTH('org.Organization', 'Industry') IS NULL                ALTER TABLE org.Organization ADD Industry NVARCHAR(100) NULL;
IF COL_LENGTH('org.Organization', 'Email') IS NULL                   ALTER TABLE org.Organization ADD Email NVARCHAR(150) NULL;
IF COL_LENGTH('org.Organization', 'Phone') IS NULL                   ALTER TABLE org.Organization ADD Phone NVARCHAR(20) NULL;
IF COL_LENGTH('org.Organization', 'Website') IS NULL                 ALTER TABLE org.Organization ADD Website NVARCHAR(200) NULL;
IF COL_LENGTH('org.Organization', 'AddressLine') IS NULL             ALTER TABLE org.Organization ADD AddressLine NVARCHAR(300) NULL;
IF COL_LENGTH('org.Organization', 'City') IS NULL                    ALTER TABLE org.Organization ADD City NVARCHAR(100) NULL;
IF COL_LENGTH('org.Organization', 'StateProvince') IS NULL           ALTER TABLE org.Organization ADD StateProvince NVARCHAR(100) NULL;
IF COL_LENGTH('org.Organization', 'Pincode') IS NULL                 ALTER TABLE org.Organization ADD Pincode NVARCHAR(12) NULL;
IF COL_LENGTH('org.Organization', 'Currency') IS NULL                ALTER TABLE org.Organization ADD Currency VARCHAR(3) NULL;
IF COL_LENGTH('org.Organization', 'FinancialYearStartMonth') IS NULL ALTER TABLE org.Organization ADD FinancialYearStartMonth TINYINT NULL;
IF COL_LENGTH('org.Organization', 'TaxId') IS NULL                   ALTER TABLE org.Organization ADD TaxId NVARCHAR(30) NULL;
IF COL_LENGTH('org.Organization', 'RegistrationNumber') IS NULL      ALTER TABLE org.Organization ADD RegistrationNumber NVARCHAR(50) NULL;
GO

UPDATE org.Organization
   SET LegalName = ISNULL(LegalName, [Name]),
       Currency = ISNULL(Currency, 'INR'),
       FinancialYearStartMonth = ISNULL(FinancialYearStartMonth, 4),
       City = ISNULL(City, N'Hyderabad'),
       StateProvince = ISNULL(StateProvince, N'Telangana'),
       Email = ISNULL(Email, N'hr@openrainbow.com')
 WHERE Id = 1;
GO

-- ---------------------------------------------------------------------
-- "Others" page removed; "Organizations" page added (Super Admin only, checked by the API too)
-- ---------------------------------------------------------------------
DELETE FROM sec.RolePermission WHERE PageKey = 'others';
DELETE FROM sec.Page WHERE PageKey = 'others';
IF NOT EXISTS (SELECT 1 FROM sec.Page WHERE PageKey = 'organizations')
    INSERT sec.Page (PageKey, Name, ModuleName, Actions, SortOrder)
    VALUES ('organizations', N'Organizations', N'Administration', 'view,create,edit', 98);
GO

-- Super Admin of every organization gets the new page.
DECLARE @OrgSeed INT;
DECLARE org_seed CURSOR LOCAL FAST_FORWARD FOR SELECT Id FROM org.Organization WHERE IsDeleted = 0;
OPEN org_seed;
FETCH NEXT FROM org_seed INTO @OrgSeed;
WHILE @@FETCH_STATUS = 0
BEGIN
    EXEC dbo.sp_sec_ensure_defaults @OrgSeed;
    FETCH NEXT FROM org_seed INTO @OrgSeed;
END
CLOSE org_seed;
DEALLOCATE org_seed;
GO

-- ---------------------------------------------------------------------
-- Organizations with their numbers
-- ---------------------------------------------------------------------
CREATE OR ALTER FUNCTION org.fn_organizations ()
RETURNS TABLE
AS
RETURN
    SELECT o.Id, o.Code, o.[Name], o.LegalName, o.Industry, o.Email, o.Phone, o.Website,
           o.AddressLine, o.City, o.StateProvince, o.Country, o.Pincode, o.TimeZone, o.Currency,
           CAST(o.FinancialYearStartMonth AS INT) AS FinancialYearStartMonth, o.TaxId, o.RegistrationNumber,
           o.IsActive, o.CreatedAt, o.CreatedBy, o.UpdatedAt, o.UpdatedBy,
           (SELECT COUNT(*) FROM emp.Employee AS e
             WHERE e.OrganizationId = o.Id AND e.IsDeleted = 0
               AND ISNULL(e.EmployeeStatus, N'Active') <> N'Exited') AS EmployeeCount,
           (SELECT COUNT(*) FROM sec.Role AS r WHERE r.OrganizationId = o.Id AND r.IsActive = 1) AS RoleCount
    FROM org.Organization AS o
    WHERE o.IsDeleted = 0;
GO

/* GET api/v1/organizations */
CREATE OR ALTER PROCEDURE dbo.sp_orgs_list
    @Search          NVARCHAR(100) = NULL,
    @IncludeInactive BIT           = 1
AS
BEGIN
    SET NOCOUNT ON;
    SET @Search = NULLIF(LTRIM(RTRIM(@Search)), N'');
    DECLARE @Like NVARCHAR(400) = N'%' + REPLACE(REPLACE(REPLACE(@Search, N'[', N'[[]'), N'%', N'[%]'), N'_', N'[_]') + N'%';

    SELECT *
    FROM org.fn_organizations()
    WHERE (@IncludeInactive = 1 OR IsActive = 1)
      AND (@Search IS NULL OR [Name] LIKE @Like OR Code LIKE @Like OR LegalName LIKE @Like OR City LIKE @Like OR Email LIKE @Like)
    ORDER BY IsActive DESC, [Name];
END
GO

/* GET api/v1/organizations/{id} */
CREATE OR ALTER PROCEDURE dbo.sp_orgs_get
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM org.fn_organizations() WHERE Id = @Id;
END
GO

/* POST / PUT api/v1/organizations. New organizations get the system roles and default access.
   @Id = NULL on return when the organization to update does not exist. */
CREATE OR ALTER PROCEDURE dbo.sp_orgs_save
    @Id                      INT           = NULL OUTPUT,
    @Code                    VARCHAR(20),
    @Name                    NVARCHAR(200),
    @LegalName               NVARCHAR(200) = NULL,
    @Industry                NVARCHAR(100) = NULL,
    @Email                   NVARCHAR(150) = NULL,
    @Phone                   NVARCHAR(20)  = NULL,
    @Website                 NVARCHAR(200) = NULL,
    @AddressLine             NVARCHAR(300) = NULL,
    @City                    NVARCHAR(100) = NULL,
    @StateProvince           NVARCHAR(100) = NULL,
    @Country                 NVARCHAR(50)  = NULL,
    @Pincode                 NVARCHAR(12)  = NULL,
    @TimeZone                VARCHAR(50)   = NULL,
    @Currency                VARCHAR(3)    = NULL,
    @FinancialYearStartMonth INT           = NULL,
    @TaxId                   NVARCHAR(30)  = NULL,
    @RegistrationNumber      NVARCHAR(50)  = NULL,
    @UserId                  NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    SET @Code = UPPER(LTRIM(RTRIM(@Code)));
    SET @Name = LTRIM(RTRIM(@Name));

    IF @Id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM org.Organization WHERE Id = @Id AND IsDeleted = 0)
    BEGIN
        SET @Id = NULL;
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM org.Organization WHERE Code = @Code AND (@Id IS NULL OR Id <> @Id))
        THROW 51001, N'Another organization already uses this code.', 1;
    IF EXISTS (SELECT 1 FROM org.Organization WHERE [Name] = @Name AND IsDeleted = 0 AND (@Id IS NULL OR Id <> @Id))
        THROW 51002, N'Another organization already has this name.', 1;
    IF @FinancialYearStartMonth IS NOT NULL AND @FinancialYearStartMonth NOT BETWEEN 1 AND 12
        THROW 51003, N'Financial year must start in a month between 1 and 12.', 1;

    BEGIN TRANSACTION;
    IF @Id IS NULL
    BEGIN
        INSERT org.Organization (Code, [Name], LegalName, Industry, Email, Phone, Website, AddressLine, City, StateProvince,
                                 Country, Pincode, TimeZone, Currency, FinancialYearStartMonth, TaxId, RegistrationNumber, CreatedBy)
        VALUES (@Code, @Name, @LegalName, @Industry, @Email, @Phone, @Website, @AddressLine, @City, @StateProvince,
                @Country, @Pincode, @TimeZone, @Currency, @FinancialYearStartMonth, @TaxId, @RegistrationNumber, @UserId);
        SET @Id = SCOPE_IDENTITY();
        EXEC dbo.sp_sec_ensure_defaults @Id;
    END
    ELSE
    BEGIN
        UPDATE org.Organization
           SET Code = @Code, [Name] = @Name, LegalName = @LegalName, Industry = @Industry, Email = @Email, Phone = @Phone,
               Website = @Website, AddressLine = @AddressLine, City = @City, StateProvince = @StateProvince, Country = @Country,
               Pincode = @Pincode, TimeZone = @TimeZone, Currency = @Currency, FinancialYearStartMonth = @FinancialYearStartMonth,
               TaxId = @TaxId, RegistrationNumber = @RegistrationNumber, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
         WHERE Id = @Id;
    END
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/organizations/{id}/status  At least one organization must stay active. */
CREATE OR ALTER PROCEDURE dbo.sp_orgs_set_status
    @Id       INT,
    @IsActive BIT,
    @UserId   NVARCHAR(100) = NULL,
    @Affected INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET @Affected = 0;
    IF NOT EXISTS (SELECT 1 FROM org.Organization WHERE Id = @Id AND IsDeleted = 0) RETURN;

    IF @IsActive = 0 AND NOT EXISTS (SELECT 1 FROM org.Organization WHERE IsActive = 1 AND IsDeleted = 0 AND Id <> @Id)
        THROW 51004, N'At least one organization must stay active.', 1;

    UPDATE org.Organization SET IsActive = @IsActive, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE Id = @Id;
    SET @Affected = 1;
END
GO

-- ---------------------------------------------------------------------
-- Add Employee: save the new employee in the organization of the request (Super Admin can pick it)
-- ---------------------------------------------------------------------
CREATE OR ALTER PROCEDURE dbo.sp_ins_emp_per_info
    @Id             INT            = NULL OUTPUT,
    @Employee_Id    VARCHAR(50)    = NULL OUTPUT,
    @OperationType  VARCHAR(10)    = NULL,
    @OrganizationId INT            = NULL,
    @Salutation     NVARCHAR(10)   = NULL,
    @FirstName      NVARCHAR(250),
    @MiddleName     NVARCHAR(250)  = NULL,
    @LastName       NVARCHAR(250)  = NULL,
    @PreferredName  NVARCHAR(250)  = NULL,
    @DateOfBirth    DATE           = NULL,
    @DateOfJoining  DATE           = NULL,
    @Gender         NVARCHAR(50)   = NULL,
    @MaritalStatus  NVARCHAR(20)   = NULL,
    @BloodGroup     NVARCHAR(20)   = NULL,
    @Nationality    NVARCHAR(50)   = NULL,
    @PlaceOfBirth   NVARCHAR(100)  = NULL,
    @Religion       NVARCHAR(50)   = NULL,
    @Category       NVARCHAR(100)  = NULL,
    @EmployeePhoto  VARBINARY(MAX) = NULL,
    @ResultMessage  VARCHAR(200)   = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    SET @OrganizationId = ISNULL(@OrganizationId, 1);
    IF NOT EXISTS (SELECT 1 FROM org.Organization WHERE Id = @OrganizationId AND IsDeleted = 0 AND IsActive = 1)
        THROW 51005, 'This organization is not active.', 1;

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
            (OrganizationId, EmployeeCode, Salutation, FirstName, MiddleName, LastName, PreferredName, DateOfBirth, DateOfJoining,
             Gender, MaritalStatus, BloodGroup, Nationality, PlaceOfBirth, Religion, Category, EmployeePhoto)
        VALUES
            (@OrganizationId, @Employee_Id, @Salutation, @FirstName, @MiddleName, @LastName, @PreferredName, @DateOfBirth, @DateOfJoining,
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
