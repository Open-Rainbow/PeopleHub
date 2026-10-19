-- Org chart module (section 13 of PeopleHub.sql). Needs sections 1-3 (org, emp). Re-runnable.
-- ---------------------------------------------------------------------
-- 13. Org chart
--    Built from emp.Employee + emp.EmploymentDetail.ReportingManager (employee code).
--    No new tables. Cycles and missing managers are handled: such people become roots.
--    THROW 505xx -> API 422.
-- ---------------------------------------------------------------------

/* Active employees with their (valid) manager. A manager is valid when it is another active employee
   of the same organization. */
CREATE OR ALTER FUNCTION org.fn_reporting_lines (@OrganizationId INT)
RETURNS TABLE
AS
RETURN
    SELECT e.Id AS EmpPk, e.EmployeeCode, m.Id AS ManagerPk, m.EmployeeCode AS ManagerCode
    FROM emp.Employee AS e
    OUTER APPLY (SELECT TOP (1) d.ReportingManager FROM emp.EmploymentDetail AS d
                 WHERE d.EmployeeId = e.Id AND d.IsDeleted = 0 ORDER BY d.Id DESC) AS d
    LEFT JOIN emp.Employee AS m
           ON m.EmployeeCode = NULLIF(LTRIM(RTRIM(d.ReportingManager)), N'')
          AND m.OrganizationId = e.OrganizationId AND m.IsDeleted = 0 AND m.Id <> e.Id
          AND ISNULL(m.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive')
    WHERE e.OrganizationId = @OrganizationId AND e.IsDeleted = 0
      AND ISNULL(e.EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive');
GO

/* GET api/v1/org-chart  Flat list; the client builds the tree. ManagerId is NULL for roots
   (no manager, unknown manager, or a manager loop that would never reach the top). */
CREATE OR ALTER PROCEDURE dbo.sp_org_get_chart
    @OrganizationId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Lines TABLE (EmpPk INT PRIMARY KEY, EmployeeCode VARCHAR(50), ManagerPk INT NULL);
    INSERT @Lines SELECT EmpPk, EmployeeCode, ManagerPk FROM org.fn_reporting_lines(@OrganizationId);

    -- Walk up from everyone; anyone whose chain revisits a node is part of (or below) a loop.
    DECLARE @Up TABLE (EmpPk INT, AncestorPk INT, Depth INT, PRIMARY KEY (EmpPk, AncestorPk));
    WITH up AS (
        SELECT l.EmpPk, l.ManagerPk AS AncestorPk, 1 AS Depth
        FROM @Lines AS l WHERE l.ManagerPk IS NOT NULL
        UNION ALL
        SELECT u.EmpPk, l.ManagerPk, u.Depth + 1
        FROM up AS u
        JOIN @Lines AS l ON l.EmpPk = u.AncestorPk
        WHERE l.ManagerPk IS NOT NULL AND u.Depth < 50 AND l.ManagerPk <> u.EmpPk
    )
    INSERT @Up (EmpPk, AncestorPk, Depth)
    SELECT EmpPk, AncestorPk, MIN(Depth) FROM up GROUP BY EmpPk, AncestorPk
    OPTION (MAXRECURSION 60);

    -- Loop members: someone is their own ancestor (stopped by l.ManagerPk <> u.EmpPk, so detect via manager link).
    DECLARE @Loop TABLE (EmpPk INT PRIMARY KEY);
    INSERT @Loop
    SELECT l.EmpPk FROM @Lines AS l
    WHERE l.ManagerPk IS NOT NULL
      AND EXISTS (SELECT 1 FROM @Up AS u WHERE u.EmpPk = l.ManagerPk AND u.AncestorPk = l.EmpPk);

    -- Break each loop at its member with the lowest employee code (that person becomes a root).
    DECLARE @Break TABLE (EmpPk INT PRIMARY KEY);
    INSERT @Break
    SELECT x.EmpPk FROM @Loop AS x
    JOIN @Lines AS l ON l.EmpPk = x.EmpPk
    WHERE NOT EXISTS (
        SELECT 1 FROM @Loop AS y JOIN @Lines AS ly ON ly.EmpPk = y.EmpPk
        WHERE ly.EmployeeCode < l.EmployeeCode
          AND EXISTS (SELECT 1 FROM @Up AS u WHERE u.EmpPk = x.EmpPk AND u.AncestorPk = y.EmpPk));

    UPDATE l SET ManagerPk = NULL FROM @Lines AS l JOIN @Break AS b ON b.EmpPk = l.EmpPk;

    -- Clean descendant counts on the fixed tree.
    DECLARE @Below TABLE (AncestorPk INT, EmpPk INT, PRIMARY KEY (AncestorPk, EmpPk));
    WITH down AS (
        SELECT l.ManagerPk AS AncestorPk, l.EmpPk, 1 AS Depth FROM @Lines AS l WHERE l.ManagerPk IS NOT NULL
        UNION ALL
        SELECT d.AncestorPk, l.EmpPk, d.Depth + 1
        FROM down AS d JOIN @Lines AS l ON l.ManagerPk = d.EmpPk
        WHERE d.Depth < 50
    )
    INSERT @Below SELECT DISTINCT AncestorPk, EmpPk FROM down OPTION (MAXRECURSION 60);

    SELECT e.EmployeeCode AS EmployeeId,
           e.FullName AS EmployeeName,
           NULLIF(e.PreferredName, N'') AS PreferredName,
           d.Designation, d.Department, d.WorkLocation, d.EmployeeType, d.EmploymentStatus,
           e.EmployeeStatus,
           m.EmployeeCode AS ManagerId,
           NULLIF(LTRIM(RTRIM(d.DottedLineManager)), N'') AS DottedLineManagerId,
           COALESCE(NULLIF(c.OfficialEmail, N''), NULLIF(d.OfficeEmail, N'')) AS Email,
           c.MobileNumber AS Mobile,
           CAST(e.DateOfJoining AS DATETIME2(0)) AS DateOfJoining,
           (SELECT COUNT(*) FROM @Lines AS r WHERE r.ManagerPk = l.EmpPk) AS DirectReports,
           (SELECT COUNT(*) FROM @Below AS b WHERE b.AncestorPk = l.EmpPk) AS TotalReports,
           CAST(CASE WHEN br.EmpPk IS NOT NULL THEN 1 ELSE 0 END AS BIT) AS InLoop
    FROM @Lines AS l
    JOIN emp.Employee AS e ON e.Id = l.EmpPk
    LEFT JOIN emp.Employee AS m ON m.Id = l.ManagerPk
    OUTER APPLY (SELECT TOP (1) Designation, Department, WorkLocation, EmployeeType, EmploymentStatus,
                                DottedLineManager, OfficeEmail
                 FROM emp.EmploymentDetail WHERE EmployeeId = e.Id AND IsDeleted = 0 ORDER BY Id DESC) AS d
    OUTER APPLY (SELECT TOP (1) OfficialEmail, MobileNumber FROM emp.ContactInfo
                 WHERE EmployeeId = e.Id AND IsDeleted = 0 ORDER BY Id DESC) AS c
    LEFT JOIN @Break AS br ON br.EmpPk = l.EmpPk
    ORDER BY e.FullName;
END
GO

/* PUT api/v1/org-chart/{employeeId}/manager  { managerId }  (null = top of the chart) */
CREATE OR ALTER PROCEDURE dbo.sp_org_set_manager
    @OrganizationId INT,
    @Employee_Id    VARCHAR(50),
    @Manager_Id     VARCHAR(50)   = NULL,
    @UserId         NVARCHAR(100) = NULL,
    @Affected       INT           = NULL OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @EmpPk INT = (SELECT Id FROM emp.Employee
                          WHERE EmployeeCode = @Employee_Id AND OrganizationId = @OrganizationId AND IsDeleted = 0);
    IF @EmpPk IS NULL BEGIN SET @Affected = 0; RETURN; END

    SET @Manager_Id = NULLIF(LTRIM(RTRIM(@Manager_Id)), '');
    DECLARE @MgrPk INT = NULL;
    IF @Manager_Id IS NOT NULL
    BEGIN
        IF @Manager_Id = @Employee_Id THROW 50501, 'Someone cannot report to themselves.', 1;
        SET @MgrPk = (SELECT Id FROM emp.Employee
                      WHERE EmployeeCode = @Manager_Id AND OrganizationId = @OrganizationId AND IsDeleted = 0
                        AND ISNULL(EmployeeStatus, N'Active') NOT IN (N'Exited', N'Inactive'));
        IF @MgrPk IS NULL THROW 50502, 'The new manager was not found or is no longer active.', 1;

        -- The new manager must not sit anywhere below the employee.
        DECLARE @Hit INT;
        WITH down AS (
            SELECT l.EmpPk, 1 AS Depth FROM org.fn_reporting_lines(@OrganizationId) AS l WHERE l.ManagerPk = @EmpPk
            UNION ALL
            SELECT l.EmpPk, d.Depth + 1 FROM down AS d
            JOIN org.fn_reporting_lines(@OrganizationId) AS l ON l.ManagerPk = d.EmpPk
            WHERE d.Depth < 50 AND l.EmpPk <> @EmpPk
        )
        SELECT @Hit = COUNT(*) FROM down WHERE EmpPk = @MgrPk OPTION (MAXRECURSION 60);
        IF @Hit > 0 THROW 50503, 'That would create a loop: the new manager already reports to this person.', 1;
    END

    BEGIN TRANSACTION;
    DECLARE @DetailId INT = (SELECT TOP (1) Id FROM emp.EmploymentDetail WITH (UPDLOCK)
                             WHERE EmployeeId = @EmpPk AND IsDeleted = 0 ORDER BY Id DESC);
    IF @DetailId IS NULL
    BEGIN
        ROLLBACK TRANSACTION;
        THROW 50504, 'Fill in this employee''s job details first.', 1;
    END

    UPDATE emp.EmploymentDetail
       SET ReportingManager = ISNULL(@Manager_Id, N''),
           UpdatedAt = SYSUTCDATETIME(), UpdatedBy = @UserId
     WHERE Id = @DetailId;
    SET @Affected = @@ROWCOUNT;
    COMMIT TRANSACTION;
END
GO

-- Demo leadership so the chart has a real top. Re-runnable: only inserts missing people and only fixes
-- the seeded loop (EMP00004 -> EMP00001 -> EMP00004).
IF dbo.fn_employee_pk('EMP00004') IS NOT NULL AND dbo.fn_employee_pk('EMP00006') IS NULL
BEGIN
    DECLARE @OrgOrg INT = (SELECT OrganizationId FROM emp.Employee WHERE Id = dbo.fn_employee_pk('EMP00004'));

    INSERT emp.Employee (OrganizationId, EmployeeCode, Salutation, FirstName, LastName, DateOfJoining, Gender, Nationality, EmployeeStatus, CreatedBy) VALUES
    (@OrgOrg, 'EMP00006', N'Mr',  N'Arjun', N'Mehta',  '2015-04-01', N'Male',   N'Indian', N'Active', N'seed'),
    (@OrgOrg, 'EMP00007', N'Ms',  N'Kavya', N'Rao',    '2017-08-16', N'Female', N'Indian', N'Active', N'seed'),
    (@OrgOrg, 'EMP00008', N'Mr',  N'Rahul', N'Verma',  '2016-11-21', N'Male',   N'Indian', N'Active', N'seed'),
    (@OrgOrg, 'EMP00009', N'Ms',  N'Sneha', N'Iyer',   '2020-02-03', N'Female', N'Indian', N'Active', N'seed');

    INSERT emp.EmploymentDetail (EmployeeId, [OfficeEmail], [EmploymentStatus], [EmployeeType], [Department], [BusinessUnit], [Designation], [PayLevel], [WorkLocation], [ReportingManager], [ShiftTimings], [WorkSchedule], [CostCenter], [EmployeeCategory], [HrOwner], CreatedBy)
    SELECT e.Id, v.Mail, N'Confirmed', N'Full Time', v.Dept, N'Product', v.Title, v.Lvl, N'Hyderabad', v.Mgr, N'General (09:00-18:00)', N'5 Days', v.Cc, N'Management', N'EMP00004', N'seed'
    FROM (VALUES
        ('EMP00006', N'arjun.mehta@openrainbow.com',  N'Leadership',  N'Chief Executive Officer', N'L0', N'',         N'CC-EXE'),
        ('EMP00007', N'kavya.rao@openrainbow.com',    N'Finance',     N'Finance Head',            N'L1', N'EMP00006', N'CC-FIN'),
        ('EMP00008', N'rahul.verma@openrainbow.com',  N'Engineering', N'Head of Engineering',     N'L1', N'EMP00006', N'CC-ENG'),
        ('EMP00009', N'sneha.iyer@openrainbow.com',   N'Engineering', N'Tech Lead',               N'L2', N'EMP00008', N'CC-ENG')
    ) AS v (Code, Mail, Dept, Title, Lvl, Mgr, Cc)
    JOIN emp.Employee AS e ON e.EmployeeCode = v.Code AND e.OrganizationId = @OrgOrg AND e.IsDeleted = 0;

    INSERT emp.ContactInfo (EmployeeId, [PersonalMail], [MobileNumber], [OfficialEmail], CreatedBy)
    SELECT e.Id, v.Personal, v.Mobile, v.Official, N'seed'
    FROM (VALUES
        ('EMP00006', N'arjun.mehta@gmail.com', N'9876500006', N'arjun.mehta@openrainbow.com'),
        ('EMP00007', N'kavya.rao@gmail.com',   N'9876500007', N'kavya.rao@openrainbow.com'),
        ('EMP00008', N'rahul.verma@gmail.com', N'9876500008', N'rahul.verma@openrainbow.com'),
        ('EMP00009', N'sneha.iyer@gmail.com',  N'9876500009', N'sneha.iyer@openrainbow.com')
    ) AS v (Code, Personal, Mobile, Official)
    JOIN emp.Employee AS e ON e.EmployeeCode = v.Code AND e.OrganizationId = @OrgOrg AND e.IsDeleted = 0;

    -- HR Manager reports to the CEO (was EMP00001: a loop). Accountant reports to the Finance Head.
    UPDATE d SET ReportingManager = N'EMP00006', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = N'seed'
    FROM emp.EmploymentDetail AS d JOIN emp.Employee AS e ON e.Id = d.EmployeeId
    WHERE e.EmployeeCode = 'EMP00004' AND d.IsDeleted = 0 AND d.ReportingManager IN (N'EMP00001', N'');

    UPDATE d SET ReportingManager = N'EMP00007', UpdatedAt = SYSUTCDATETIME(), UpdatedBy = N'seed'
    FROM emp.EmploymentDetail AS d JOIN emp.Employee AS e ON e.Id = d.EmployeeId
    WHERE e.EmployeeCode = 'EMP00005' AND d.IsDeleted = 0 AND d.ReportingManager = N'EMP00004';
END
GO
