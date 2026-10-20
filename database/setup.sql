-- Setup module (section 16 of PeopleHub.sql). Needs section 1 (org). Re-runnable.
-- ---------------------------------------------------------------------
-- 16. Setup: roles, page permissions and field settings
--    sec.Role              roles per organization (Super Admin, Admin, HR, Manager, Employee + custom roles)
--    sec.Page              every page / feature that can be secured, with the actions it supports
--    sec.RolePermission    what a role may do on a page: view, create, edit, delete, approve, export
--    sec.FormField         form fields discovered by the app (form key = page path, field key = control id)
--    sec.RoleFieldSetting  per role per field: hidden, read-only, required / optional
--    Super Admin is a system role: always full access, cannot be edited or deactivated.
--    THROW 508xx -> API 422.
-- ---------------------------------------------------------------------
IF SCHEMA_ID(N'sec') IS NULL EXEC (N'CREATE SCHEMA sec');
GO

IF OBJECT_ID(N'sec.Role', N'U') IS NULL
BEGIN
CREATE TABLE sec.Role
(
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_SecRole PRIMARY KEY,
    OrganizationId INT           NOT NULL CONSTRAINT FK_SecRole_Organization REFERENCES org.Organization (Id),
    Code           VARCHAR(30)   NOT NULL,
    Name           NVARCHAR(60)  NOT NULL,
    Description    NVARCHAR(200) NULL,
    IsSystem       BIT           NOT NULL CONSTRAINT DF_SecRole_IsSystem DEFAULT (0),
    IsActive       BIT           NOT NULL CONSTRAINT DF_SecRole_IsActive DEFAULT (1),
    SortOrder      INT           NOT NULL CONSTRAINT DF_SecRole_SortOrder DEFAULT (100),
    CreatedAt      DATETIME2(0)  NOT NULL CONSTRAINT DF_SecRole_CreatedAt DEFAULT (SYSUTCDATETIME()),
    CreatedBy      NVARCHAR(100) NULL,
    UpdatedAt      DATETIME2(0)  NULL,
    UpdatedBy      NVARCHAR(100) NULL,
    CONSTRAINT UX_SecRole_Code UNIQUE (OrganizationId, Code)
);
END
GO

IF OBJECT_ID(N'sec.Page', N'U') IS NULL
BEGIN
CREATE TABLE sec.Page
(
    PageKey    VARCHAR(60)  NOT NULL CONSTRAINT PK_SecPage PRIMARY KEY,
    Name       NVARCHAR(80) NOT NULL,
    ModuleName NVARCHAR(40) NOT NULL,
    Actions    VARCHAR(60)  NOT NULL,          -- supported actions, e.g. 'view,create,edit,delete'
    SortOrder  INT          NOT NULL CONSTRAINT DF_SecPage_SortOrder DEFAULT (100),
    IsActive   BIT          NOT NULL CONSTRAINT DF_SecPage_IsActive DEFAULT (1)
);
END
GO

IF OBJECT_ID(N'sec.RolePermission', N'U') IS NULL
BEGIN
CREATE TABLE sec.RolePermission
(
    RoleId     INT           NOT NULL CONSTRAINT FK_SecRolePermission_Role REFERENCES sec.Role (Id),
    PageKey    VARCHAR(60)   NOT NULL CONSTRAINT FK_SecRolePermission_Page REFERENCES sec.Page (PageKey),
    CanView    BIT           NOT NULL CONSTRAINT DF_SecRolePermission_View DEFAULT (0),
    CanCreate  BIT           NOT NULL CONSTRAINT DF_SecRolePermission_Create DEFAULT (0),
    CanEdit    BIT           NOT NULL CONSTRAINT DF_SecRolePermission_Edit DEFAULT (0),
    CanDelete  BIT           NOT NULL CONSTRAINT DF_SecRolePermission_Delete DEFAULT (0),
    CanApprove BIT           NOT NULL CONSTRAINT DF_SecRolePermission_Approve DEFAULT (0),
    CanExport  BIT           NOT NULL CONSTRAINT DF_SecRolePermission_Export DEFAULT (0),
    UpdatedAt  DATETIME2(0)  NOT NULL CONSTRAINT DF_SecRolePermission_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedBy  NVARCHAR(100) NULL,
    CONSTRAINT PK_SecRolePermission PRIMARY KEY (RoleId, PageKey)
);
END
GO

IF OBJECT_ID(N'sec.FormField', N'U') IS NULL
BEGIN
CREATE TABLE sec.FormField
(
    OrganizationId INT           NOT NULL CONSTRAINT FK_SecFormField_Organization REFERENCES org.Organization (Id),
    FormKey        VARCHAR(100)  NOT NULL,     -- page path after the role, e.g. 'add-employee/personal-info'
    FieldKey       VARCHAR(80)   NOT NULL,     -- control id, e.g. 'firstName'
    Label          NVARCHAR(120) NOT NULL,
    SortOrder      INT           NOT NULL CONSTRAINT DF_SecFormField_SortOrder DEFAULT (0),
    FirstSeenAt    DATETIME2(0)  NOT NULL CONSTRAINT DF_SecFormField_FirstSeen DEFAULT (SYSUTCDATETIME()),
    LastSeenAt     DATETIME2(0)  NOT NULL CONSTRAINT DF_SecFormField_LastSeen DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT PK_SecFormField PRIMARY KEY (OrganizationId, FormKey, FieldKey)
);
END
GO

IF OBJECT_ID(N'sec.RoleFieldSetting', N'U') IS NULL
BEGIN
CREATE TABLE sec.RoleFieldSetting
(
    RoleId      INT           NOT NULL CONSTRAINT FK_SecRoleFieldSetting_Role REFERENCES sec.Role (Id),
    FormKey     VARCHAR(100)  NOT NULL,
    FieldKey    VARCHAR(80)   NOT NULL,
    IsHidden    BIT           NOT NULL CONSTRAINT DF_SecRoleFieldSetting_Hidden DEFAULT (0),
    IsReadOnly  BIT           NOT NULL CONSTRAINT DF_SecRoleFieldSetting_ReadOnly DEFAULT (0),
    Requirement VARCHAR(10)   NOT NULL CONSTRAINT DF_SecRoleFieldSetting_Requirement DEFAULT ('Default')
                              CONSTRAINT CK_SecRoleFieldSetting_Requirement CHECK (Requirement IN ('Default', 'Required', 'Optional')),
    UpdatedAt   DATETIME2(0)  NOT NULL CONSTRAINT DF_SecRoleFieldSetting_UpdatedAt DEFAULT (SYSUTCDATETIME()),
    UpdatedBy   NVARCHAR(100) NULL,
    CONSTRAINT PK_SecRoleFieldSetting PRIMARY KEY (RoleId, FormKey, FieldKey)
);
END
GO

-- ---------------------------------------------------------------------
-- Page catalogue (global). Re-running refreshes names / actions and adds new pages.
-- ---------------------------------------------------------------------
MERGE sec.Page AS t
USING (VALUES
    ('dashboard',            N'Dashboard',              N'General',       'view',                                   10),
    ('announcements',        N'View announcements',     N'Announcements', 'view',                                   20),
    ('announcements.manage', N'Manage announcements',   N'Announcements', 'view,create,edit,delete',                21),
    ('apply-leave',          N'Apply leave',            N'Leave',         'view,create,edit,delete',                30),
    ('leave-approval',       N'Leave approval',         N'Leave',         'view,approve,export',                    31),
    ('leave-management',     N'Leave management',       N'Leave',         'view,create,edit,delete,approve,export', 32),
    ('payroll',              N'My payslips & tax',      N'Payroll',       'view,create,export',                     40),
    ('payroll.manage',       N'Payroll processing',     N'Payroll',       'view,create,edit,delete,approve,export', 41),
    ('attendance',           N'Attendance',             N'Attendance',    'view,create,approve,export',             50),
    ('holidays',             N'Holiday calendar',       N'Holidays',      'view',                                   60),
    ('holidays.manage',      N'Manage holidays',        N'Holidays',      'view,create,edit,delete',                61),
    ('org-chart',            N'Org chart',              N'Employees',     'view,edit,export',                       70),
    ('employees.view',       N'View employees',         N'Employees',     'view,export',                            71),
    ('employees.add',        N'Add / edit employee',    N'Employees',     'view,create,edit,delete',                72),
    ('profile',              N'My profile',             N'Employees',     'view,edit',                              73),
    ('edocs',                N'EDocs (offer letters)',  N'Documents',     'view,create,edit,delete,export',         80),
    ('policies',             N'Policies',               N'Documents',     'view,create,edit,delete,export',         81),
    ('others',               N'Others',                 N'General',       'view',                                   90),
    ('setup',                N'Setup (roles & access)', N'Administration','view,create,edit,delete',                99)
) AS s (PageKey, Name, ModuleName, Actions, SortOrder)
ON t.PageKey = s.PageKey
WHEN MATCHED THEN UPDATE SET Name = s.Name, ModuleName = s.ModuleName, Actions = s.Actions, SortOrder = s.SortOrder, IsActive = 1
WHEN NOT MATCHED THEN INSERT (PageKey, Name, ModuleName, Actions, SortOrder) VALUES (s.PageKey, s.Name, s.ModuleName, s.Actions, s.SortOrder);
GO

/* Does the page support the action? */
CREATE OR ALTER FUNCTION sec.fn_supports (@Actions VARCHAR(60), @Action VARCHAR(10))
RETURNS BIT
AS
BEGIN
    RETURN CASE WHEN CHARINDEX(',' + @Action + ',', ',' + @Actions + ',') > 0 THEN 1 ELSE 0 END;
END
GO

/* Creates the system roles and their default access for an organization (only what is missing). */
CREATE OR ALTER PROCEDURE dbo.sp_sec_ensure_defaults
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @New TABLE (Id INT, Code VARCHAR(30));
    INSERT sec.Role (OrganizationId, Code, Name, Description, IsSystem, SortOrder, CreatedBy)
    OUTPUT inserted.Id, inserted.Code INTO @New
    SELECT @OrganizationId, s.Code, s.Name, s.Description, s.IsSystem, s.SortOrder, N'seed'
    FROM (VALUES
        ('superadmin', N'Super Admin', N'Full access to everything, including setup. Cannot be changed.', 1, 10),
        ('admin',      N'Admin',       N'Runs the organization: employees, leave, payroll, policies and setup.', 1, 20),
        ('hr',         N'HR',          N'People operations: employees, leave, attendance, payroll and policies.', 1, 30),
        ('manager',    N'Manager',     N'Approves leave and attendance for their team.', 1, 40),
        ('employee',   N'Employee',    N'Self-service: leave, attendance, payslips, policies.', 1, 50)
    ) AS s (Code, Name, Description, IsSystem, SortOrder)
    WHERE NOT EXISTS (SELECT 1 FROM sec.Role AS r WHERE r.OrganizationId = @OrganizationId AND r.Code = s.Code);

    -- Default grid: role code, page, then view/create/edit/delete/approve/export.
    DECLARE @Defaults TABLE (Code VARCHAR(30), PageKey VARCHAR(60), V BIT, C BIT, E BIT, D BIT, A BIT, X BIT);
    INSERT @Defaults VALUES
    -- Admin: everything
    ('admin','dashboard',1,0,0,0,0,0), ('admin','announcements',1,0,0,0,0,0), ('admin','announcements.manage',1,1,1,1,0,0),
    ('admin','apply-leave',1,1,1,1,0,0), ('admin','leave-approval',1,0,0,0,1,1), ('admin','leave-management',1,1,1,1,1,1),
    ('admin','payroll',1,1,0,0,0,1), ('admin','payroll.manage',1,1,1,1,1,1), ('admin','attendance',1,1,0,0,1,1),
    ('admin','holidays',1,0,0,0,0,0), ('admin','holidays.manage',1,1,1,1,0,0), ('admin','org-chart',1,0,1,0,0,1),
    ('admin','employees.view',1,0,0,0,0,1), ('admin','employees.add',1,1,1,1,0,0), ('admin','profile',1,0,1,0,0,0),
    ('admin','edocs',1,1,1,1,0,1), ('admin','policies',1,1,1,1,0,1), ('admin','others',1,0,0,0,0,0), ('admin','setup',1,1,1,1,0,0),
    -- HR: like admin, no leave approval screen and no setup
    ('hr','dashboard',1,0,0,0,0,0), ('hr','announcements',1,0,0,0,0,0), ('hr','announcements.manage',1,1,1,1,0,0),
    ('hr','apply-leave',1,1,1,1,0,0), ('hr','leave-management',1,1,1,1,1,1),
    ('hr','payroll',1,1,0,0,0,1), ('hr','payroll.manage',1,1,1,1,1,1), ('hr','attendance',1,1,0,0,1,1),
    ('hr','holidays',1,0,0,0,0,0), ('hr','holidays.manage',1,1,1,1,0,0), ('hr','org-chart',1,0,1,0,0,1),
    ('hr','employees.view',1,0,0,0,0,1), ('hr','employees.add',1,1,1,1,0,0), ('hr','profile',1,0,1,0,0,0),
    ('hr','edocs',1,1,1,1,0,1), ('hr','policies',1,1,1,1,0,1), ('hr','others',1,0,0,0,0,0),
    -- Manager: self-service plus approvals for the team
    ('manager','dashboard',1,0,0,0,0,0), ('manager','announcements',1,0,0,0,0,0),
    ('manager','apply-leave',1,1,1,1,0,0), ('manager','leave-approval',1,0,0,0,1,1),
    ('manager','payroll',1,1,0,0,0,0), ('manager','attendance',1,1,0,0,1,1), ('manager','holidays',1,0,0,0,0,0),
    ('manager','org-chart',1,0,0,0,0,0), ('manager','employees.view',1,0,0,0,0,0), ('manager','profile',1,0,1,0,0,0),
    ('manager','policies',1,0,0,0,0,0), ('manager','others',1,0,0,0,0,0),
    -- Employee: self-service
    ('employee','dashboard',1,0,0,0,0,0), ('employee','announcements',1,0,0,0,0,0),
    ('employee','apply-leave',1,1,1,1,0,0), ('employee','payroll',1,1,0,0,0,0), ('employee','attendance',1,1,0,0,0,0),
    ('employee','holidays',1,0,0,0,0,0), ('employee','org-chart',1,0,0,0,0,0), ('employee','profile',1,0,1,0,0,0),
    ('employee','policies',1,0,0,0,0,0), ('employee','others',1,0,0,0,0,0);

    -- Super Admin: every action every page supports.
    INSERT @Defaults
    SELECT 'superadmin', p.PageKey, 1, sec.fn_supports(p.Actions, 'create'), sec.fn_supports(p.Actions, 'edit'),
           sec.fn_supports(p.Actions, 'delete'), sec.fn_supports(p.Actions, 'approve'), sec.fn_supports(p.Actions, 'export')
    FROM sec.Page AS p WHERE p.IsActive = 1;

    -- Defaults only for roles created just now (never overwrite what an admin configured).
    INSERT sec.RolePermission (RoleId, PageKey, CanView, CanCreate, CanEdit, CanDelete, CanApprove, CanExport, UpdatedBy)
    SELECT r.Id, d.PageKey, d.V, d.C, d.E, d.D, d.A, d.X, N'seed'
    FROM @Defaults AS d
    JOIN @New AS r ON r.Code = d.Code
    JOIN sec.Page AS p ON p.PageKey = d.PageKey;

    -- Super Admin always gets new pages.
    INSERT sec.RolePermission (RoleId, PageKey, CanView, CanCreate, CanEdit, CanDelete, CanApprove, CanExport, UpdatedBy)
    SELECT r.Id, d.PageKey, d.V, d.C, d.E, d.D, d.A, d.X, N'seed'
    FROM @Defaults AS d
    JOIN sec.Role AS r ON r.OrganizationId = @OrganizationId AND r.Code = 'superadmin' AND d.Code = 'superadmin'
    WHERE NOT EXISTS (SELECT 1 FROM sec.RolePermission AS x WHERE x.RoleId = r.Id AND x.PageKey = d.PageKey);
END
GO

/* GET api/v1/setup/roles */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_roles
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    EXEC dbo.sp_sec_ensure_defaults @OrganizationId;

    SELECT r.Id, r.Code, r.Name, r.Description, r.IsSystem, r.IsActive, r.SortOrder,
           (SELECT COUNT(*) FROM sec.RolePermission AS p WHERE p.RoleId = r.Id AND p.CanView = 1) AS PageCount,
           (SELECT COUNT(*) FROM sec.RoleFieldSetting AS f WHERE f.RoleId = r.Id) AS FieldRuleCount,
           r.CreatedAt, ISNULL(r.UpdatedAt, r.CreatedAt) AS UpdatedAt, ISNULL(r.UpdatedBy, r.CreatedBy) AS UpdatedBy
    FROM sec.Role AS r
    WHERE r.OrganizationId = @OrganizationId
    ORDER BY r.SortOrder, r.Name;
END
GO

/* POST api/v1/setup/roles  |  PUT api/v1/setup/roles/{id}
   New roles copy the access of @CopyFromRoleId (or start with nothing). System role codes cannot change. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_save_role
    @Id             INT           = NULL OUTPUT,
    @OrganizationId INT,
    @Code           VARCHAR(30),
    @Name           NVARCHAR(60),
    @Description    NVARCHAR(200) = NULL,
    @CopyFromRoleId INT           = NULL,
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    SET @Code = LOWER(LTRIM(RTRIM(@Code)));
    SET @Name = LTRIM(RTRIM(@Name));

    IF EXISTS (SELECT 1 FROM sec.Role WHERE OrganizationId = @OrganizationId AND Code = @Code AND (@Id IS NULL OR Id <> @Id))
        THROW 50801, 'A role with this code already exists.', 1;
    IF EXISTS (SELECT 1 FROM sec.Role WHERE OrganizationId = @OrganizationId AND Name = @Name AND (@Id IS NULL OR Id <> @Id))
        THROW 50802, 'A role with this name already exists.', 1;
    IF @CopyFromRoleId IS NOT NULL AND NOT EXISTS (SELECT 1 FROM sec.Role WHERE Id = @CopyFromRoleId AND OrganizationId = @OrganizationId)
        THROW 50803, 'The role to copy from was not found.', 1;

    BEGIN TRANSACTION;
    IF @Id IS NULL
    BEGIN
        INSERT sec.Role (OrganizationId, Code, Name, Description, IsSystem, SortOrder, CreatedBy)
        VALUES (@OrganizationId, @Code, @Name, NULLIF(LTRIM(RTRIM(@Description)), N''), 0,
                ISNULL((SELECT MAX(SortOrder) FROM sec.Role WHERE OrganizationId = @OrganizationId), 0) + 10, @UserId);
        SET @Id = SCOPE_IDENTITY();

        IF @CopyFromRoleId IS NOT NULL
        BEGIN
            INSERT sec.RolePermission (RoleId, PageKey, CanView, CanCreate, CanEdit, CanDelete, CanApprove, CanExport, UpdatedBy)
            SELECT @Id, PageKey, CanView, CanCreate, CanEdit, CanDelete, CanApprove, CanExport, @UserId
            FROM sec.RolePermission WHERE RoleId = @CopyFromRoleId AND PageKey <> 'setup';

            INSERT sec.RoleFieldSetting (RoleId, FormKey, FieldKey, IsHidden, IsReadOnly, Requirement, UpdatedBy)
            SELECT @Id, FormKey, FieldKey, IsHidden, IsReadOnly, Requirement, @UserId
            FROM sec.RoleFieldSetting WHERE RoleId = @CopyFromRoleId;
        END
    END
    ELSE
    BEGIN
        DECLARE @OldCode VARCHAR(30), @IsSystem BIT;
        SELECT @OldCode = Code, @IsSystem = IsSystem FROM sec.Role WITH (UPDLOCK) WHERE Id = @Id AND OrganizationId = @OrganizationId;
        IF @OldCode IS NULL
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50804, 'Role not found.', 1;
        END
        IF @IsSystem = 1 AND @OldCode <> @Code
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50805, 'Built-in role codes cannot be changed.', 1;
        END
        IF @OldCode = 'superadmin' AND @Name <> (SELECT Name FROM sec.Role WHERE Id = @Id)
        BEGIN
            ROLLBACK TRANSACTION;
            THROW 50806, 'Super Admin cannot be changed.', 1;
        END

        UPDATE sec.Role
        SET Code = @Code, Name = @Name, Description = NULLIF(LTRIM(RTRIM(@Description)), N''), UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
        WHERE Id = @Id;
    END
    COMMIT TRANSACTION;
END
GO

/* POST api/v1/setup/roles/{id}/status  { isActive }  Built-in roles stay active. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_set_role_status
    @OrganizationId INT,
    @Id             INT,
    @IsActive       BIT,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    IF @IsActive = 0 AND EXISTS (SELECT 1 FROM sec.Role WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsSystem = 1)
        THROW 50807, 'Built-in roles cannot be deactivated.', 1;

    UPDATE sec.Role SET IsActive = @IsActive, UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
    WHERE Id = @Id AND OrganizationId = @OrganizationId;
    SET @Affected = @@ROWCOUNT;
END
GO

/* DELETE api/v1/setup/roles/{id}  Custom roles only; their access and field rules go with them. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_delete_role
    @OrganizationId INT,
    @Id             INT,
    @Affected       INT = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    IF EXISTS (SELECT 1 FROM sec.Role WHERE Id = @Id AND OrganizationId = @OrganizationId AND IsSystem = 1)
        THROW 50808, 'Built-in roles cannot be deleted. Deactivate custom roles you no longer need.', 1;

    BEGIN TRANSACTION;
    DELETE FROM sec.RoleFieldSetting WHERE RoleId = @Id AND EXISTS (SELECT 1 FROM sec.Role WHERE Id = @Id AND OrganizationId = @OrganizationId);
    DELETE FROM sec.RolePermission WHERE RoleId = @Id AND EXISTS (SELECT 1 FROM sec.Role WHERE Id = @Id AND OrganizationId = @OrganizationId);
    DELETE FROM sec.Role WHERE Id = @Id AND OrganizationId = @OrganizationId;
    SET @Affected = @@ROWCOUNT;
    COMMIT TRANSACTION;
END
GO

/* GET api/v1/setup/roles/{id}/permissions  One row per page (missing = no access). */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_permissions
    @OrganizationId INT,
    @RoleId         INT
AS
BEGIN
    SET NOCOUNT ON;
    IF NOT EXISTS (SELECT 1 FROM sec.Role WHERE Id = @RoleId AND OrganizationId = @OrganizationId) THROW 50804, 'Role not found.', 1;

    SELECT p.PageKey, p.Name, p.ModuleName, p.Actions, p.SortOrder,
           ISNULL(x.CanView, 0) AS CanView, ISNULL(x.CanCreate, 0) AS CanCreate, ISNULL(x.CanEdit, 0) AS CanEdit,
           ISNULL(x.CanDelete, 0) AS CanDelete, ISNULL(x.CanApprove, 0) AS CanApprove, ISNULL(x.CanExport, 0) AS CanExport
    FROM sec.Page AS p
    LEFT JOIN sec.RolePermission AS x ON x.RoleId = @RoleId AND x.PageKey = p.PageKey
    WHERE p.IsActive = 1
    ORDER BY p.SortOrder, p.Name;
END
GO

/* PUT api/v1/setup/roles/{id}/permissions
   @Items JSON: [{ "pageKey": "leave-approval", "canView": true, "canApprove": true, ... }]
   Replaces the role's grid. Unsupported actions are dropped; any action implies view. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_save_permissions
    @OrganizationId INT,
    @RoleId         INT,
    @Items          NVARCHAR(MAX),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Code VARCHAR(30) = (SELECT Code FROM sec.Role WHERE Id = @RoleId AND OrganizationId = @OrganizationId);
    IF @Code IS NULL THROW 50804, 'Role not found.', 1;
    IF @Code = 'superadmin' THROW 50806, 'Super Admin always has full access and cannot be changed.', 1;
    IF ISJSON(@Items) <> 1 THROW 50809, 'Permissions must be a JSON array.', 1;

    DECLARE @Rows TABLE (PageKey VARCHAR(60) PRIMARY KEY, V BIT, C BIT, E BIT, D BIT, A BIT, X BIT);
    INSERT @Rows
    SELECT j.PageKey,
           CAST(CASE WHEN ISNULL(j.V,0) = 1 OR ISNULL(j.C,0) = 1 OR ISNULL(j.E,0) = 1 OR ISNULL(j.D,0) = 1 OR ISNULL(j.A,0) = 1 OR ISNULL(j.X,0) = 1 THEN 1 ELSE 0 END AS BIT),
           CAST(ISNULL(j.C,0) & sec.fn_supports(p.Actions, 'create') AS BIT),
           CAST(ISNULL(j.E,0) & sec.fn_supports(p.Actions, 'edit') AS BIT),
           CAST(ISNULL(j.D,0) & sec.fn_supports(p.Actions, 'delete') AS BIT),
           CAST(ISNULL(j.A,0) & sec.fn_supports(p.Actions, 'approve') AS BIT),
           CAST(ISNULL(j.X,0) & sec.fn_supports(p.Actions, 'export') AS BIT)
    FROM OPENJSON(@Items) WITH (
        PageKey VARCHAR(60) '$.pageKey', V BIT '$.canView', C BIT '$.canCreate', E BIT '$.canEdit',
        D BIT '$.canDelete', A BIT '$.canApprove', X BIT '$.canExport') AS j
    JOIN sec.Page AS p ON p.PageKey = j.PageKey AND p.IsActive = 1;

    -- Keep at least one way into Setup: Admin cannot lock itself out.
    IF @Code = 'admin' AND NOT EXISTS (SELECT 1 FROM @Rows WHERE PageKey = 'setup' AND E = 1)
        THROW 50810, 'Admin must keep edit access to Setup, otherwise nobody but Super Admin can fix access.', 1;

    BEGIN TRANSACTION;
    DELETE FROM sec.RolePermission WHERE RoleId = @RoleId;
    INSERT sec.RolePermission (RoleId, PageKey, CanView, CanCreate, CanEdit, CanDelete, CanApprove, CanExport, UpdatedBy)
    SELECT @RoleId, PageKey, V, C, E, D, A, X, @UserId FROM @Rows WHERE V = 1;
    UPDATE sec.Role SET UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE Id = @RoleId;
    COMMIT TRANSACTION;
END
GO

/* GET api/v1/setup/my-access  Effective page access of a role code (inactive / unknown role = nothing). */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_access
    @OrganizationId INT,
    @RoleCode       VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;
    EXEC dbo.sp_sec_ensure_defaults @OrganizationId;

    SELECT x.PageKey, x.CanView, x.CanCreate, x.CanEdit, x.CanDelete, x.CanApprove, x.CanExport
    FROM sec.Role AS r
    JOIN sec.RolePermission AS x ON x.RoleId = r.Id
    JOIN sec.Page AS p ON p.PageKey = x.PageKey AND p.IsActive = 1
    WHERE r.OrganizationId = @OrganizationId AND r.Code = LOWER(@RoleCode) AND r.IsActive = 1 AND x.CanView = 1;
END
GO

/* GET api/v1/setup/my-access (field part)  Only fields with a non-default rule. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_field_rules
    @OrganizationId INT,
    @RoleCode       VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT f.FormKey, f.FieldKey, f.IsHidden, f.IsReadOnly, f.Requirement
    FROM sec.Role AS r
    JOIN sec.RoleFieldSetting AS f ON f.RoleId = r.Id
    WHERE r.OrganizationId = @OrganizationId AND r.Code = LOWER(@RoleCode) AND r.IsActive = 1
      AND (f.IsHidden = 1 OR f.IsReadOnly = 1 OR f.Requirement <> 'Default');
END
GO

/* POST api/v1/setup/fields/register  The app reports the labelled controls of a form when it renders.
   @Items JSON: [{ "fieldKey": "firstName", "label": "First Name", "sortOrder": 1 }] */
CREATE OR ALTER PROCEDURE dbo.sp_sec_register_fields
    @OrganizationId INT,
    @FormKey        VARCHAR(100),
    @Items          NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    IF ISJSON(@Items) <> 1 THROW 50809, 'Fields must be a JSON array.', 1;

    MERGE sec.FormField AS t
    USING (
        SELECT DISTINCT LOWER(@FormKey) AS FormKey, j.FieldKey, LEFT(j.Label, 120) AS Label, ISNULL(j.SortOrder, 0) AS SortOrder
        FROM OPENJSON(@Items) WITH (FieldKey VARCHAR(80) '$.fieldKey', Label NVARCHAR(200) '$.label', SortOrder INT '$.sortOrder') AS j
        WHERE NULLIF(LTRIM(RTRIM(j.FieldKey)), '') IS NOT NULL AND NULLIF(LTRIM(RTRIM(j.Label)), N'') IS NOT NULL
    ) AS s
    ON t.OrganizationId = @OrganizationId AND t.FormKey = s.FormKey AND t.FieldKey = s.FieldKey
    WHEN MATCHED THEN UPDATE SET Label = s.Label, SortOrder = s.SortOrder, LastSeenAt = SYSUTCDATETIME()
    WHEN NOT MATCHED THEN INSERT (OrganizationId, FormKey, FieldKey, Label, SortOrder) VALUES (@OrganizationId, s.FormKey, s.FieldKey, s.Label, s.SortOrder);
END
GO

/* GET api/v1/setup/forms  Every form the app has reported, with its field count. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_forms
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT f.FormKey, COUNT(*) AS FieldCount, MAX(f.LastSeenAt) AS LastSeenAt
    FROM sec.FormField AS f
    WHERE f.OrganizationId = @OrganizationId
    GROUP BY f.FormKey
    ORDER BY f.FormKey;
END
GO

/* GET api/v1/setup/roles/{id}/fields?formKey=...  Fields of a form with this role's rule (Default when none). */
CREATE OR ALTER PROCEDURE dbo.sp_sec_get_field_settings
    @OrganizationId INT,
    @RoleId         INT,
    @FormKey        VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    IF NOT EXISTS (SELECT 1 FROM sec.Role WHERE Id = @RoleId AND OrganizationId = @OrganizationId) THROW 50804, 'Role not found.', 1;

    SELECT f.FormKey, f.FieldKey, f.Label, f.SortOrder,
           ISNULL(s.IsHidden, 0) AS IsHidden, ISNULL(s.IsReadOnly, 0) AS IsReadOnly, ISNULL(s.Requirement, 'Default') AS Requirement
    FROM sec.FormField AS f
    LEFT JOIN sec.RoleFieldSetting AS s ON s.RoleId = @RoleId AND s.FormKey = f.FormKey AND s.FieldKey = f.FieldKey
    WHERE f.OrganizationId = @OrganizationId AND f.FormKey = LOWER(@FormKey)
    ORDER BY f.SortOrder, f.Label;
END
GO

/* PUT api/v1/setup/roles/{id}/fields  { formKey, items: [{ fieldKey, isHidden, isReadOnly, requirement }] }
   Replaces this role's rules for the form. Rows left at the defaults are not stored. */
CREATE OR ALTER PROCEDURE dbo.sp_sec_save_field_settings
    @OrganizationId INT,
    @RoleId         INT,
    @FormKey        VARCHAR(100),
    @Items          NVARCHAR(MAX),
    @UserId         NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    DECLARE @Code VARCHAR(30) = (SELECT Code FROM sec.Role WHERE Id = @RoleId AND OrganizationId = @OrganizationId);
    IF @Code IS NULL THROW 50804, 'Role not found.', 1;
    IF @Code = 'superadmin' THROW 50806, 'Super Admin always sees every field and cannot be changed.', 1;
    IF ISJSON(@Items) <> 1 THROW 50809, 'Field settings must be a JSON array.', 1;
    SET @FormKey = LOWER(@FormKey);

    BEGIN TRANSACTION;
    DELETE FROM sec.RoleFieldSetting WHERE RoleId = @RoleId AND FormKey = @FormKey;
    INSERT sec.RoleFieldSetting (RoleId, FormKey, FieldKey, IsHidden, IsReadOnly, Requirement, UpdatedBy)
    SELECT @RoleId, @FormKey, j.FieldKey, ISNULL(j.IsHidden, 0), ISNULL(j.IsReadOnly, 0),
           CASE WHEN ISNULL(j.IsHidden, 0) = 1 THEN 'Default' ELSE ISNULL(NULLIF(j.Requirement, ''), 'Default') END, @UserId
    FROM OPENJSON(@Items) WITH (FieldKey VARCHAR(80) '$.fieldKey', IsHidden BIT '$.isHidden', IsReadOnly BIT '$.isReadOnly',
                                Requirement VARCHAR(10) '$.requirement') AS j
    JOIN sec.FormField AS f ON f.OrganizationId = @OrganizationId AND f.FormKey = @FormKey AND f.FieldKey = j.FieldKey
    WHERE ISNULL(j.IsHidden, 0) = 1 OR ISNULL(j.IsReadOnly, 0) = 1 OR ISNULL(NULLIF(j.Requirement, ''), 'Default') <> 'Default';
    UPDATE sec.Role SET UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId WHERE Id = @RoleId;
    COMMIT TRANSACTION;
END
GO

-- ---------------------------------------------------------------------
-- Seed: system roles and default access for every organization
-- ---------------------------------------------------------------------
DECLARE @SecOrg INT;
DECLARE sec_orgs CURSOR LOCAL FAST_FORWARD FOR SELECT Id FROM org.Organization;
OPEN sec_orgs;
FETCH NEXT FROM sec_orgs INTO @SecOrg;
WHILE @@FETCH_STATUS = 0
BEGIN
    EXEC dbo.sp_sec_ensure_defaults @SecOrg;
    FETCH NEXT FROM sec_orgs INTO @SecOrg;
END
CLOSE sec_orgs;
DEALLOCATE sec_orgs;
GO
