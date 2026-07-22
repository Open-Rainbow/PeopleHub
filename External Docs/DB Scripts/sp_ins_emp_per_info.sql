CREATE OR ALTER PROCEDURE [dbo].[sp_ins_emp_per_info]
(
    @OperationType      varchar(10),
    @Id                 int = NULL OUTPUT,
    @Employee_Id        varchar(50) = NULL OUTPUT,
    @Salutation         varchar(10) = NULL,
    @FirstName          varchar(250),
    @MiddleName         varchar(250) = NULL,
    @LastName           varchar(250),
    @PreferredName      varchar(250) = NULL,
    @DateOfBirth        datetime,
    @DateOfJoining      datetime = NULL,
    @Gender             varchar(50),
    @MaritalStatus      varchar(20),
    @BloodGroup         varchar(20),
    @Nationality        varchar(50) = NULL,
    @PlaceOfBirth       varchar(100) = NULL,
    @Religion           varchar(50) = NULL,
    @Category           varchar(100) = NULL,
    @EmployeePhoto      varbinary(max) = NULL,
    @ResultMessage      varchar(200) = NULL OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        DECLARE @EmployeeName varchar(250);

        SET @EmployeeName = LTRIM(RTRIM(CONCAT_WS(' ', @Salutation, @FirstName, @MiddleName, @LastName)));

        IF @OperationType = 'INS'
        BEGIN
            DECLARE @NextNumber int;

            SELECT @NextNumber = ISNULL(MAX(CAST(SUBSTRING(Employee_Id, 3, LEN(Employee_Id)) AS int)), 0)
            FROM T_Emp_Basic_Info WITH (UPDLOCK, HOLDLOCK);

            SET @Employee_Id = 'OR' + RIGHT('0000' + CAST(@NextNumber + 1 AS varchar), 4);

            INSERT INTO T_Emp_Basic_Info
            (
                Employee_Id,
                Employee_Name,
                Dob,
                Gender,
                BloodGroup,
                MaritalStatus
            )
            VALUES
            (
                @Employee_Id,
                @EmployeeName,
                @DateOfBirth,
                @Gender,
                @BloodGroup,
                @MaritalStatus
            );

            SET @Id = CAST(SCOPE_IDENTITY() AS int);

            IF @EmployeePhoto IS NOT NULL
            BEGIN
                INSERT INTO T_Emp_DocumentsUpload_Info
                (
                    Id,
                    EmpPhoto
                )
                VALUES
                (
                    @Id,
                    @EmployeePhoto
                );
            END

            SET @ResultMessage = 'Employee personal info inserted successfully.';
        END
        ELSE IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_Basic_Info
            SET
                Employee_Name = @EmployeeName,
                Dob = @DateOfBirth,
                Gender = @Gender,
                BloodGroup = @BloodGroup,
                MaritalStatus = @MaritalStatus,
                LastModifiedBy = SUSER_SNAME(),
                LastModifiedDate = GETDATE()
            WHERE Id = @Id;

            IF EXISTS (SELECT 1 FROM T_Emp_DocumentsUpload_Info WHERE Id = @Id)
            BEGIN
                UPDATE T_Emp_DocumentsUpload_Info
                SET EmpPhoto = @EmployeePhoto,
                    LastModifiedBy = SUSER_SNAME(),
                    LastModifiedDate = GETDATE()
                WHERE Id = @Id;
            END
            ELSE IF @EmployeePhoto IS NOT NULL
            BEGIN
                INSERT INTO T_Emp_DocumentsUpload_Info
                (
                    Id,
                    EmpPhoto
                )
                VALUES
                (
                    @Id,
                    @EmployeePhoto
                );
            END

            SET @ResultMessage = 'Employee personal info updated successfully.';
        END

        COMMIT TRAN;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
        BEGIN
            ROLLBACK TRAN;
        END

        DECLARE @ErrorMessage varchar(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END