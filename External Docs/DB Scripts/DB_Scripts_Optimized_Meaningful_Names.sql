USE [orms]
GO
CREATE SCHEMA [hr]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_announcement](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [title] [varchar](2000) NOT NULL,
    [description] [varchar](2000) NOT NULL,
    [expire_on] [date] NOT NULL,
    [priority] [varchar](50) NOT NULL,
    [status] [int] NULL,
    [org_id] [int] NULL,
    [department] [varchar](100) NULL,
    [target_audience] [varchar](150) NULL,
    [category] [varchar](100) NULL,
    [posted_by] [varchar](200) NULL,
    [posted_date] [date] NULL,
    [last_modified_date] [datetime] NULL,
    [last_modified_by] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_acc_details_info](
	--[acc_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] IDENTITY(1,1) NOT NULL,
    [bank_name] [varchar](100) NOT NULL,
    [branch_name] [varchar](100) NOT NULL,
    [account_number] [varchar](30) NOT NULL,
    [ifsc_code] [varchar](20) NOT NULL,
    [pf_acc_num] [varchar](30) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_basic_info](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [employee_id] [varchar](50) NULL,
    [employee_name] [varchar](250) NOT NULL,
    [dob] [datetime] NOT NULL,
    [gender] [varchar](50) NOT NULL,
    [blood_group] [varchar](20) NOT NULL,
    [marital_status] [varchar](20) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_basic_info_audit](
    [audit_id] [int] IDENTITY(1,1) NOT NULL,
    [employee_id] [varchar](10) NULL,
    [old_employee_name] [varchar](250) NULL,
    [old_dob] [datetime] NULL,
    [old_gender] [varchar](50) NULL,
    [old_blood_group] [varchar](20) NULL,
    [old_marital_status] [varchar](20) NULL,
    [new_employee_name] [varchar](250) NULL,
    [new_dob] [datetime] NULL,
    [new_gender] [varchar](50) NULL,
    [new_blood_group] [varchar](20) NULL,
    [new_marital_status] [varchar](20) NULL,
    [changed_by] [varchar](100) NULL,
    [changed_date] [datetime] NULL
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_contact_info](
    [contact_id] [int] IDENTITY(1,1) NOT NULL,
    [personal_email] [varchar](200) NOT NULL,
    [linkedin_url] [varchar](300) NOT NULL,
    [contact_number] [varchar](15) NOT NULL,
    [permanent_address] [varchar](500) NOT NULL,
    [present_address] [varchar](500) NOT NULL,
    [emergency_contact_name_1] [varchar](100) NOT NULL,
    [emergency_contact_number_1] [varchar](15) NOT NULL,
    [emergency_contact_relationship_1] [varchar](200) NOT NULL,
    [emergency_contact_number_2] [varchar](15) NOT NULL,
    [emergency_contact_relationship_2] [varchar](200) NOT NULL,
    [emergency_contact_number_3] [varchar](15) NULL,
    [emergency_contact_relationship_3] [varchar](200) NULL,
    [id] [int] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [contact_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_document](
    [employee_document_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [employee_photo] [varbinary](max) NULL,
    [employee_pan_document] [varbinary](max) NULL,
    [employee_passport_document] [varbinary](max) NULL,
    [last_six_months_bank_statements] [varbinary](max) NULL,
    [last_three_months_payslips] [varbinary](max) NULL,
    [experience_letter_document] [varbinary](max) NULL,
    [relieving_letter_document] [varbinary](max) NULL,
    [offer_letter_document] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [employee_document_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_education](
    [education_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [highest_qualification] [varchar](100) NOT NULL,
    [specialization] [varchar](200) NOT NULL,
    [year_of_passing] [datetime] NOT NULL,
    [university_or_college_name] [varchar](100) NOT NULL,
    [education_certificates] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [education_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_insurance](
    [insurance_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [father_name] [varchar](100) NOT NULL,
    [father_aadhaar_document] [varbinary](max) NULL,
    [father_pan_document] [varbinary](max) NULL,
    [father_date_of_birth] [datetime] NOT NULL,
    [father_occupation] [varchar](100) NOT NULL,
    [mother_name] [varchar](100) NOT NULL,
    [mother_aadhaar_document] [varbinary](max) NULL,
    [mother_pan_document] [varbinary](max) NULL,
    [mother_date_of_birth] [datetime] NOT NULL,
    [mother_occupation] [varchar](100) NOT NULL,
    [spouse_name] [varchar](100) NULL,
    [spouse_aadhaar_document] [varbinary](max) NULL,
    [spouse_pan_document] [varbinary](max) NULL,
    [spouse_date_of_birth] [datetime] NULL,
    [spouse_occupation] [varchar](100) NULL,
    [child_1_name] [varchar](100) NULL,
    [child_1_aadhaar_document] [varbinary](max) NULL,
    [child_2_name] [varchar](100) NULL,
    [child_2_aadhaar_document] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [insurance_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_job_details](
    [job_details_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [office_email] [varchar](50) NOT NULL,
    [department] [varchar](50) NOT NULL,
    [current_designation] [varchar](50) NOT NULL,
    [employment_type] [varchar](50) NOT NULL,
    [pay_level_or_grade] [varchar](20) NOT NULL,
    [reporting_manager] [varchar](50) NOT NULL,
    [work_location_or_branch] [varchar](200) NOT NULL,
    [shift_timing] [varchar](50) NOT NULL,
    [casual_leave_days] [int] NOT NULL,
    [earned_leave_days] [int] NOT NULL,
    [optional_leave_days] [int] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [job_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_login](
    [login_details_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [user_name] [varchar](50) NOT NULL,
    [password_hash] [varchar](255) NOT NULL,
    [role] [varchar](100) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [login_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF),
 CONSTRAINT [uq_employee_login_user_name] UNIQUE NONCLUSTERED 
(
    [user_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_salary_structure](
    [salary_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [gross_salary_monthly] [decimal](10, 2) NOT NULL,
    [gross_salary_annual] [decimal](12, 2) NOT NULL,
    [basic_salary_monthly] [decimal](10, 2) NOT NULL,
    [basic_salary_annual] [decimal](12, 2) NOT NULL,
    [house_rent_allowance_monthly] [decimal](10, 2) NOT NULL,
    [house_rent_allowance_annual] [decimal](12, 2) NOT NULL,
    [food_allowance_monthly] [decimal](10, 2) NOT NULL,
    [food_allowance_annual] [decimal](12, 2) NOT NULL,
    [special_allowance_monthly] [decimal](10, 2) NOT NULL,
    [special_allowance_annual] [decimal](12, 2) NOT NULL,
    [gross_salary_a_monthly] [decimal](10, 2) NOT NULL,
    [gross_salary_a_annual] [decimal](12, 2) NOT NULL,
    [employer_provident_fund_monthly] [decimal](10, 2) NOT NULL,
    [employer_provident_fund_annual] [decimal](12, 2) NOT NULL,
    [employer_esi_monthly] [decimal](10, 2) NOT NULL,
    [employer_esi_annual] [decimal](12, 2) NOT NULL,
    [joining_bonus_annual] [decimal](12, 2) NULL,
    [cost_to_company_monthly] [decimal](10, 2) NOT NULL,
    [cost_to_company_annual] [decimal](12, 2) NOT NULL,
    [employee_provident_fund_monthly] [decimal](10, 2) NOT NULL,
    [employee_provident_fund_annual] [decimal](12, 2) NOT NULL,
    [tax_deducted_at_source_monthly] [decimal](10, 2) NOT NULL,
    [tax_deducted_at_source_annual] [decimal](12, 2) NOT NULL,
    [professional_tax_monthly] [decimal](10, 2) NOT NULL,
    [professional_tax_annual] [decimal](12, 2) NOT NULL,
    [total_deductions_monthly] [decimal](10, 2) NOT NULL,
    [total_deductions_annual] [decimal](12, 2) NOT NULL,
    [net_pay_monthly] [decimal](10, 2) NOT NULL,
    [net_pay_annual] [decimal](12, 2) NOT NULL,
    [net_pay_first_month] [decimal](10, 2) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [salary_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_work_experience](
    [work_experience_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [skills] [varchar](500) NOT NULL,
    [years_of_experience] [decimal](5, 2) NOT NULL,
    [previous_organization] [varchar](200) NOT NULL,
    [previous_designation] [varchar](100) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [work_experience_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[error_log](
    [error_log_id] [int] IDENTITY(1,1) NOT NULL,
    [procedure_name] [sysname] NOT NULL,
    [error_line_number] [int] NULL,
    [error_number] [int] NULL,
    [error_message] [nvarchar](500) NULL,
    [error_severity] [int] NULL,
    [error_state] [int] NULL,
    [executed_by] [sysname] NOT NULL,
    [error_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [error_log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_application](
    [leave_application_id] [int] IDENTITY(1,1) NOT NULL,
    [leave_type_id] [int] NOT NULL,
    [start_date] [datetime] NOT NULL,
    [end_date] [datetime] NOT NULL,
    [reason_for_leave] [varchar](2000) NOT NULL,
    [clear_form] [bit] NOT NULL,
    [submit_application] [bit] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
 CONSTRAINT [pk_leave_application] PRIMARY KEY CLUSTERED 
(
    [leave_application_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employment_type](
    [employment_type_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF),
UNIQUE NONCLUSTERED 
(
    [employment_type] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_policy_compensatory_off](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [enable_compensatory_off] [bit] NOT NULL,
    [expiry_period_days] [int] NOT NULL,
    [maximum_accrual_limit] [int] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [policy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_policy_loss_of_pay](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [allow_unpaid_leave] [bit] NOT NULL,
    [maximum_consecutive_days] [int] NOT NULL,
    [approval_required] [bit] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [policy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_policy_parental](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [leave_type_id] [int] NOT NULL,
    [total_duration_days] [int] NOT NULL,
    [paid_duration_days] [int] NOT NULL,
    [extension_allowed] [bit] NOT NULL,
    [must_be_taken_within_days] [int] NULL,
    [additional_notes] [varchar](2000) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [policy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_policy_standard](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [leave_type_id] [int] NOT NULL,
    [annual_leave_allowance] [int] NOT NULL,
    [carry_forward_allowed] [bit] NOT NULL,
    [encashment_allowed] [bit] NOT NULL,
    [accrual_method] [varchar](50) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [policy_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[leave_type](
    [leave_type_id] [int] IDENTITY(1,1) NOT NULL,
    [leave_type_name] [varchar](100) NOT NULL,
    [leave_category] [varchar](50) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[scheduled_dependency_log](
    [dependency_log_id] [int] IDENTITY(1,1) NOT NULL,
    [dependency_name] [varchar](200) NULL,
    [procedure_name] [varchar](200) NULL,
    [process_start_date] [datetime] NULL,
    [process_end_date] [datetime] NULL,
    [process_status] [varchar](2) NULL,
PRIMARY KEY CLUSTERED 
(
    [dependency_log_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hr].[employee_address](
    [address_id] [int] IDENTITY(1,1) NOT NULL,
    [employee_id] [varchar](50) NOT NULL,
    [address_type] [varchar](5) NOT NULL,
    [door_number] [varchar](200) NOT NULL,
    [area] [varchar](100) NULL,
    [city] [varchar](50) NULL,
    [pin_code] [varchar](10) NULL,
    [state] [varchar](50) NULL,
    [country] [varchar](50) NULL,
    [status] [int] NOT NULL,
    [created_by] [int] NULL,
    [created_date] [datetime] NULL,
    [modified_by] [int] NULL,
    [modified_date] [datetime] NULL
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hr].[employee_profile](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [employee_id] [varchar](50) NOT NULL,
    [employee_salutation] [varchar](10) NULL,
    [employee_first_name] [varchar](250) NOT NULL,
    [employee_middle_name] [varchar](250) NOT NULL,
    [employee_last_name] [varchar](250) NOT NULL,
    [employee_gender] [char](1) NOT NULL,
    [employee_date_of_birth] [datetime] NOT NULL,
    [employee_email] [varchar](100) NOT NULL,
    [employee_uan] [int] NULL,
    [employee_mobile_number] [int] NULL,
    [employee_date_of_joining] [date] NULL,
    [employee_status] [bit] NULL,
    [employee_blood_group] [varchar](20) NOT NULL,
    [employee_marital_status] [varchar](20) NOT NULL,
    [employee_linkedin_url] [varchar](300) NOT NULL,
    [employee_emergency_contact_name] [varchar](100) NOT NULL,
    [employee_emergency_contact_number] [varchar](15) NOT NULL,
    [employee_created_by] [int] NOT NULL,
    [employee_created_date] [datetime] NULL,
    [employee_last_modified_by] [int] NULL,
    [employee_last_modified_date] [datetime] NULL,
    [employee_unique_id] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
    [employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_accountdetails_info_id] ON [dbo].[employee_account_details]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
SET ANSI_PADDING ON
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_basic_info_employee_id] ON [dbo].[employee_basic_info]
(
    [employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_documentsupload_info_id] ON [dbo].[employee_document]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_educationdetails_info_id] ON [dbo].[employee_education]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_insurancedetails_info_id] ON [dbo].[employee_insurance]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_jobdetails_info_id] ON [dbo].[employee_job_details]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_logindetails_info_id] ON [dbo].[employee_login]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_workexperience_info_id] ON [dbo].[employee_work_experience]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leaveapplication_leavetypeid] ON [dbo].[leave_application]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_compoff_employmenttypeid] ON [dbo].[leave_policy_compensatory_off]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_lop_employmenttypeid] ON [dbo].[leave_policy_loss_of_pay]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_parental_employmenttypeid] ON [dbo].[leave_policy_parental]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_parental_leavetypeid] ON [dbo].[leave_policy_parental]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_standard_employmenttypeid] ON [dbo].[leave_policy_standard]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leavepolicy_standard_leavetypeid] ON [dbo].[leave_policy_standard]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
ALTER TABLE [dbo].[announcement] ADD  DEFAULT (original_login()) FOR [a_postedby]
GO
ALTER TABLE [dbo].[announcement] ADD  DEFAULT (getdate()) FOR [a_posteddate]
GO
ALTER TABLE [dbo].[employee_account_details] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_account_details] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_account_details] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_account_details] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_basic_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_basic_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_basic_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_basic_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_basic_info_audit] ADD  DEFAULT (getdate()) FOR [changeddate]
GO
ALTER TABLE [dbo].[employee_contact_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_contact_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_contact_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_contact_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_document] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_document] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_document] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_document] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_education] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_education] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_education] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_education] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_insurance] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_insurance] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_insurance] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_insurance] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_job_details] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_job_details] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_job_details] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_job_details] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_login] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_login] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_login] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_login] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_salary_structure] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_salary_structure] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_salary_structure] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_salary_structure] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[employee_work_experience] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[employee_work_experience] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[employee_work_experience] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[employee_work_experience] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[error_log] ADD  DEFAULT (getdate()) FOR [error_date]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT ((0)) FOR [clear_form]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT ((0)) FOR [submit_application]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_application] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[leave_policy_parental] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_policy_parental] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_policy_parental] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_policy_parental] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[leave_policy_standard] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_policy_standard] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_policy_standard] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_policy_standard] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[leave_type] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[leave_type] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[leave_type] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[leave_type] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [hr].[employee_profile] ADD  DEFAULT (getdate()) FOR [employee_created_date]
GO
ALTER TABLE [hr].[employee_profile] ADD  DEFAULT (newid()) FOR [employee_unique_id]
GO
ALTER TABLE [dbo].[employee_account_details]  WITH CHECK ADD  CONSTRAINT [fk_emp_accountdetails_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_account_details] CHECK CONSTRAINT [fk_emp_accountdetails_basic_id]
GO
ALTER TABLE [dbo].[employee_contact_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_contact_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_contact_info] CHECK CONSTRAINT [fk_emp_contact_basic_id]
GO
ALTER TABLE [dbo].[employee_document]  WITH CHECK ADD  CONSTRAINT [fk_emp_documentsupload_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_document] CHECK CONSTRAINT [fk_emp_documentsupload_basic_id]
GO
ALTER TABLE [dbo].[employee_education]  WITH CHECK ADD  CONSTRAINT [fk_t_emp_educationdetails_info_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_education] CHECK CONSTRAINT [fk_t_emp_educationdetails_info_id]
GO
ALTER TABLE [dbo].[employee_insurance]  WITH CHECK ADD  CONSTRAINT [fk_emp_insurancedetails_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_insurance] CHECK CONSTRAINT [fk_emp_insurancedetails_basic_id]
GO
ALTER TABLE [dbo].[employee_job_details]  WITH CHECK ADD  CONSTRAINT [fk_emp_jobdetails_basic] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_job_details] CHECK CONSTRAINT [fk_emp_jobdetails_basic]
GO
ALTER TABLE [dbo].[employee_login]  WITH CHECK ADD  CONSTRAINT [fk_emp_otherdetails_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_login] CHECK CONSTRAINT [fk_emp_otherdetails_basic_id]
GO
ALTER TABLE [dbo].[employee_salary_structure]  WITH CHECK ADD  CONSTRAINT [fk_salary_emp_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_salary_structure] CHECK CONSTRAINT [fk_salary_emp_id]
GO
ALTER TABLE [dbo].[employee_work_experience]  WITH CHECK ADD  CONSTRAINT [fk_emp_workexperience_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[employee_basic_info] ([id])
GO
ALTER TABLE [dbo].[employee_work_experience] CHECK CONSTRAINT [fk_emp_workexperience_basic_id]
GO
ALTER TABLE [dbo].[leave_application]  WITH CHECK ADD  CONSTRAINT [fk_t_laplication_leavetype_leavetypeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[leave_application] CHECK CONSTRAINT [fk_t_laplication_leavetype_leavetypeid]
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off]  WITH CHECK ADD  CONSTRAINT [fk_comp_emp_employmenttypeid] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[employment_type] ([employment_type_id])
GO
ALTER TABLE [dbo].[leave_policy_compensatory_off] CHECK CONSTRAINT [fk_comp_emp_employmenttypeid]
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay]  WITH CHECK ADD  CONSTRAINT [fk_lop_emp_employmenttypeid] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[employment_type] ([employment_type_id])
GO
ALTER TABLE [dbo].[leave_policy_loss_of_pay] CHECK CONSTRAINT [fk_lop_emp_employmenttypeid]
GO
ALTER TABLE [dbo].[leave_policy_parental]  WITH CHECK ADD  CONSTRAINT [fk_par_emp_employmenttypeid] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[employment_type] ([employment_type_id])
GO
ALTER TABLE [dbo].[leave_policy_parental] CHECK CONSTRAINT [fk_par_emp_employmenttypeid]
GO
ALTER TABLE [dbo].[leave_policy_parental]  WITH CHECK ADD  CONSTRAINT [fk_par_leave_leavetypeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[leave_policy_parental] CHECK CONSTRAINT [fk_par_leave_leavetypeid]
GO
ALTER TABLE [dbo].[leave_policy_standard]  WITH CHECK ADD  CONSTRAINT [fk_std_emp_employmenttypeid] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[employment_type] ([employment_type_id])
GO
ALTER TABLE [dbo].[leave_policy_standard] CHECK CONSTRAINT [fk_std_emp_employmenttypeid]
GO
ALTER TABLE [dbo].[leave_policy_standard]  WITH CHECK ADD  CONSTRAINT [fk_std_leave_leavetypeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[leave_policy_standard] CHECK CONSTRAINT [fk_std_leave_leavetypeid]
GO
ALTER TABLE [hr].[employee_address]  WITH CHECK ADD  CONSTRAINT [fk_add_emid] FOREIGN KEY([employee_id])
REFERENCES [hr].[employee_profile] ([employee_id])
GO
ALTER TABLE [hr].[employee_address] CHECK CONSTRAINT [fk_add_emid]
GO
ALTER TABLE [dbo].[leave_application]  WITH CHECK ADD  CONSTRAINT [ck_t_leaveapplication_dates] CHECK  (([start_date]<=[end_date]))
GO
ALTER TABLE [dbo].[leave_application] CHECK CONSTRAINT [ck_t_leaveapplication_dates]
GO
ALTER TABLE [hr].[employee_profile]  WITH CHECK ADD CHECK  (([employee_gender]='F' OR [employee_gender]='M'))
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[dummy]
(
    @Employee_Id varchar(20)
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @cmd nvarchar(4000);

    SET @cmd =
    'bcp "SELECT Employee_Id,Employee_Name,Dob,Gender,BloodGroup,MaritalStatus,CreatedBy FROM ORMS.dbo.T_Emp_Basic_Info WHERE Employee_Id = ''OR0001''" queryout "C:\JT\output.csv" -c -t, -U sa -P Admin@123 -S 192.168.5.70 -d ORMS';

    PRINT @cmd;   -- check final command

    EXEC xp_cmdshell @cmd;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[dummy1]
(
    @Employee_Id varchar(20)
)
AS
BEGIN
    SET NOCOUNT ON;

   SELECT Employee_Id,Employee_Name,Dob,Gender,BloodGroup,MaritalStatus,CreatedBy,CreatedDate FROM ORMS.dbo.T_Emp_Basic_Info 
   WHERE Employee_Id =@Employee_Id

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[exportquerytocsv]
      @Query               nvarchar(MAX)              -- e.g., N'SELECT Col1, Col2 FROM dbo.TABLE ORDER BY Col1'
    , @OutputFile          nvarchar(4000)             -- e.g., N'D:\Exports\myfile.csv'
    , @ServerName          nvarchar(256) = NULL       -- NULL = local DEFAULT instance; ELSE 'MyServer\Instance'
    , @DatabaseName        sysname        = NULL      -- Optional; IF supplied, we wrap the query WITH USE
    , @Delimiter           nvarchar(10)   = N','      -- CSV delimiter (',' OR ';' etc.)
    , @IncludeHeaders      bit            = 1         -- 1 = include header row
    , @UseTrustedConnection bit           = 1         -- 1 = Windows Auth (recommended); 0 = SQL Auth, supply @SqlUser/@SqlPassword
    , @SqlUser             nvarchar(256)  = NULL      -- SQL Login (IF @UseTrustedConnection = 0)
    , @SqlPassword         nvarchar(256)  = NULL      -- SQL Password (IF @UseTrustedConnection = 0)
    , @QuoteText           bit            = 0         -- 1 = quote string columns BY wrapping WITH " AND escaping internal "
    , @CodePage            nvarchar(10)   = N'ACP'    -- 'ACP' (ANSI), 'RAW', OR specific code page like '65001' for UTF-8
AS
BEGIN
    SET NOCOUNT ON;

    -------------------------------------------------------------------------
    -- Safety checks
    -------------------------------------------------------------------------
    IF RIGHT(@OutputFile, 4) NOT IN ('.csv', '.txt')
        SET @OutputFile += N'.csv';

    IF @UseTrustedConnection = 0 AND (NULLIF(@SqlUser, N'') IS NULL OR NULLIF(@SqlPassword, N'') IS NULL)
    BEGIN
        RAISERROR('SQL authentication selected but @SqlUser/@SqlPassword NOT provided.', 16, 1);
        RETURN 1;
    END

    -- Ensure xp_cmdshell is available (will error IF disabled)
    IF NOT EXISTS (SELECT 1 FROM sys.configurations WHERE name = 'xp_cmdshell' AND value_in_use = 1)
    BEGIN
        RAISERROR('xp_cmdshell is disabled. Enable it for this proc OR run via SQL Agent PowerShell.', 16, 1);
        RETURN 2;
    END

    -------------------------------------------------------------------------
    -- Build the final query to feed BCP
    -- IF headers requested, we need to construct a UNION ALL header row.
    -- We’ll read column names FROM the target query via temp TABLE.
    -------------------------------------------------------------------------
    DECLARE @WorkQuery nvarchar(MAX) = @Query;

    IF NULLIF(@DatabaseName, N'') IS NOT NULL
        SET @WorkQuery = N'USE ' + QUOTENAME(@DatabaseName) + N'; ' + @WorkQuery;

    -- Put results INTO a temp TABLE just to reflect metadata (no execution yet)
    -- We'll USE SET FMTONLY OFF/ON approach is deprecated; USE top 0 SELECT.
    DECLARE @MetaQuery nvarchar(MAX) =
        N'SET NOCOUNT ON; ' + 
        N'WITH src AS (' + @WorkQuery + N') SELECT TOP (0) * INTO #_expo_meta FROM src; ' +
        N'SELECT name, column_id FROM tempdb.sys.columns WHERE object_id = OBJECT_ID(''tempdb..#_expo_meta'') ORDER BY column_id;';

    -- Capture column list
    DECLARE @Cols TABLE (name sysname, column_id int);
    INSERT @Cols(name, column_id)
    EXEC sp_executesql @MetaQuery;

    IF NOT EXISTS (SELECT 1 FROM @Cols)
    BEGIN
        RAISERROR('Could NOT infer columns FROM the query. Ensure it returns at least 0 rows AND is valid.', 16, 1);
        RETURN 3;
    END

    -- Build header CSV line: "Col1{delim}Col2{delim}..."
    DECLARE @Header nvarchar(MAX) =
    (
        SELECT STRING_AGG(QUOTENAME(name, '"'), @Delimiter) WITHIN GROUP (ORDER BY column_id)
        FROM @Cols
    );

    -- Build projection list that optionally quotes string columns safely
    -- We will detect datatypes BY running the query INTO a temp TABLE AND looking at sys.types.
    DECLARE @Proj nvarchar(MAX);

    DECLARE @ProjQuery nvarchar(MAX) = N'
        WITH src AS (' + @WorkQuery + N')
        SELECT TOP (0) * INTO #_expo_types FROM src;
        SELECT @p = STRING_AGG(
            CASE 
                WHEN t.name IN (''char'',''nchar'',''varchar'',''nvarchar'',''text'',''ntext'')
                     AND @QuoteText = 1
                THEN ''"'' + REPLACE(CONVERT(nvarchar(max),'' + QUOTENAME(c.name) + ''), ''"'',''""'') + ''"''
                ELSE '' + QUOTENAME(c.name) + ''
            END
            , ''' + @Delimiter + '''
        ) WITHIN GROUP (ORDER BY c.column_id)
        FROM tempdb.sys.columns c
        JOIN sys.types t ON c.user_type_id = t.user_type_id
        WHERE c.object_id = OBJECT_ID(''tempdb..#_expo_types'');
    ';

    DECLARE @Params nvarchar(400) = N'@p nvarchar(max) OUTPUT, @QuoteText bit';
    EXEC sp_executesql @ProjQuery, @Params, @p=@Proj OUTPUT, @QuoteText=@QuoteText;

    IF @Proj IS NULL
    BEGIN
        RAISERROR('Failed to build projection list.', 16, 1);
        RETURN 4;
    END

    -- Final query that BCP will run:
    DECLARE @FinalQuery nvarchar(MAX);

    IF @IncludeHeaders = 1
        SET @FinalQuery = N'SET NOCOUNT ON;' + char(13) + char(10) +
                          N'SELECT ' + @Header + N' ' +
                          N'UNION ALL SELECT ' + @Proj + N' FROM (' + @WorkQuery + N') AS Q;';
    ELSE
        SET @FinalQuery = N'SET NOCOUNT ON; SELECT ' + @Proj + N' FROM (' + @WorkQuery + N') AS Q;';

    -------------------------------------------------------------------------
    -- Build BCP command
    -- Notes:
    --  - -c for char output; -t for delimiter; -C for code page (e.g., 65001 UTF-8)
    --  - USE -T for trusted OR -U/-P for SQL auth
    -------------------------------------------------------------------------
    DECLARE @BCP nvarchar(MAX) = N'bcp ';
    -- queryout WITH quoted query
    SET @BCP += N'"' + REPLACE(@FinalQuery, '"', '""') + N'" queryout ' + N'"' + @OutputFile + N'" ';
    SET @BCP += N'-c -t "' + @Delimiter + N'" ';
    IF NULLIF(@CodePage, N'') IS NOT NULL SET @BCP += N'-C ' + @CodePage + N' ';

    IF NULLIF(@ServerName, N'') IS NOT NULL
        SET @BCP += N'-S "' + @ServerName + N'" ';
    -- Authentication
    IF @UseTrustedConnection = 1
        SET @BCP += N'-T ';
    ELSE
        SET @BCP += N'-U "' + @SqlUser + N'" -P "' + @SqlPassword + N'" ';

    -- Database context is already baked INTO @FinalQuery via USE (IF provided)

    -------------------------------------------------------------------------
    -- Execute BCP via xp_cmdshell
    -------------------------------------------------------------------------
    DECLARE @Cmd nvarchar(4000) = N'';
    -- Wrap in cmd.exe /c to capture RETURN code AND redirect stderr to stdout
    SET @Cmd = N'cmd /c ' + @BCP + N' 2>&1';

    DECLARE @Output TABLE (line nvarchar(4000));
    INSERT @Output(line) EXEC xp_cmdshell @Cmd;

    -- Surface the BCP console output (useful for debugging)
    SELECT line FROM @Output;

    -- Try to detect common errors
    IF EXISTS (SELECT 1 FROM @Output WHERE line LIKE '%Error%' OR line LIKE '%BCP copy out failed%')
    BEGIN
        RAISERROR('Export failed. Review the output above for details.', 16, 1);
        RETURN 5;
    END

    RETURN 0;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[exporttocsv]
AS
BEGIN
    DECLARE @cmd varchar(4000)

    SET @cmd = 'bcp "SELECT * FROM ORMS.dbo.T_Emp_Basic_Info" queryout "C:\JT\export3.csv" -c -t, -T -S ' + @@SERVERNAME

    EXEC xp_cmdshell @cmd
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[runcurrentbookings]
(
    @EmpID varchar(100) = 'OR0001'
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Call your existing SP
    --EXEC dbo.CurrentBookings
    --    @StartDate = @StartDate,
    --    @EndDate   = @EndDate;

  SELECT * FROM ORMS.dbo.T_Emp_Basic_Info WHERE Employee_Id = @EmpID

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE   [dbo].[s_sch_announcements]
AS
BEGIN

 SET NOCOUNT ON
 BEGIN tran
BEGIN try

DECLARE @IDENTITY int 

INSERT INTO  T_SchDependency_log ( Sd_name, Sd_ProcName ,Sd_StartDate ,Sd_ProcessStatus )
VALUES ('Announcements','s_sch_Announcements',getdate(),'I')


SELECT  @IDENTITY = SCOPE_IDENTITY() 
 
Update T_Announcement
SET A_Status = 3
WHERE A_ExpireOn <=getdate() AND A_Status =1
 


Delete FROM T_Announcement WHERE A_Status =3 AND datediff(day,A_PostedDate,getdate()) >90
 


UPDATE T_SchDependency_log 
SET Sd_ProcessStatus = 'C',
Sd_EndDate = getdate()
WHERE Sd_Id = @IDENTITY

commit tran

END TRY
 

 BEGIN CATCH
        IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

     
    END CATCH

END


GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_dateperiods_complete]
(
    @Action nvarchar(20) = 'GET',  -- GET, REFRESH, INSERT
    @dat_per_id int = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    /* ===============================
       DECLARE VARIABLES
       =============================== */
    DECLARE 
        @p_cur_dat date,
        @p_yst_day date,
        @p_cur_wek_str date,
        @p_cur_mth_str date,
        @p_28_dys_str date,
        @p_cur_q_str date,
        @p_cur_y_str date,
        @p_prv_wek_str date,
        @p_prv_wek_end date,
        @p_prv_mth_str date,
        @p_prv_mth_end date,
        @p_prv_q_str date,
        @p_prv_q_end date,
        @p_prv_y_str date,
        @p_prv_y_end date;

    /* ===============================
       ASSIGN VALUES
       =============================== */
    SET @p_cur_dat = CAST(GETDATE() AS date);
    SET @p_yst_day = DATEADD(DAY, -1, @p_cur_dat);

    -- Ensure week starts ON Sunday
    SET DATEFIRST 7;

    SET @p_cur_wek_str = DATEADD(DAY, 1 - DATEPART(WEEKDAY, @p_cur_dat), @p_cur_dat);
    SET @p_cur_mth_str = DATEFROMPARTS(YEAR(@p_cur_dat), MONTH(@p_cur_dat), 1);
    SET @p_28_dys_str  = DATEADD(DAY, -29, @p_cur_dat);

    SET @p_cur_q_str = DATEADD(QUARTER, DATEDIFF(QUARTER, 0, @p_cur_dat), 0);
    SET @p_cur_y_str = DATEFROMPARTS(YEAR(@p_cur_dat), 1, 1);

    SET @p_prv_wek_str = DATEADD(WEEK, -1, @p_cur_wek_str);
    SET @p_prv_wek_end = DATEADD(DAY, -1, @p_cur_wek_str);

    SET @p_prv_mth_str = DATEADD(MONTH, DATEDIFF(MONTH, 0, @p_cur_dat) - 1, 0);
    SET @p_prv_mth_end = EOMONTH(@p_prv_mth_str);

    SET @p_prv_q_str = DATEADD(QUARTER, -1, @p_cur_q_str);
    SET @p_prv_q_end = DATEADD(DAY, -1, @p_cur_q_str);

    SET @p_prv_y_str = DATEFROMPARTS(YEAR(@p_cur_dat) - 1, 1, 1);
    SET @p_prv_y_end = DATEFROMPARTS(YEAR(@p_cur_dat) - 1, 12, 31);

    /* ===============================
       CREATE TABLE IF NOT EXISTS
       =============================== */
    IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'DatePeriods')
    BEGIN
        CREATE TABLE dbo.DatePeriods
        (
            dat_per_id int PRIMARY KEY,
            dsc nvarchar(100) NOT NULL,
            is_cmp bit NOT NULL,
            cmp_dat_per_id int NULL,
            dat_frm date NOT NULL,
            dat_to date NOT NULL,
            total_days int NOT NULL,
            created_date datetime2 DEFAULT GETDATE()
        );
    END;

    /* ===============================
       REFRESH / INSERT DATA
       =============================== */
    IF @Action IN ('REFRESH', 'INSERT')
    BEGIN
        DELETE FROM dbo.DatePeriods;

        INSERT INTO dbo.DatePeriods
        (
            dat_per_id, dsc, is_cmp, cmp_dat_per_id,
            dat_frm, dat_to, total_days
        )
        VALUES
            (1,  'Yesterday',              0, 8,  @p_yst_day, @p_cur_dat, 1),
            (2,  'Week to date',           0, 9,  @p_cur_wek_str, @p_cur_dat, DATEDIFF(DAY, @p_cur_wek_str, @p_cur_dat) + 1),
            (3,  'Month to date',          0, 10, @p_cur_mth_str, @p_cur_dat, DATEDIFF(DAY, @p_cur_mth_str, @p_cur_dat) + 1),
            (4,  'Last 28 Days',           0, 11, @p_28_dys_str, @p_cur_dat, 29),
            (5,  'Previous Month',         0, 12, @p_prv_mth_str, @p_prv_mth_end, DATEDIFF(DAY, @p_prv_mth_str, @p_prv_mth_end) + 1),
            (6,  'Quarter to date',        0, 13, @p_cur_q_str, @p_cur_dat, DATEDIFF(DAY, @p_cur_q_str, @p_cur_dat) + 1),
            (7,  'Year to date',           0, 14, @p_cur_y_str, @p_cur_dat, DATEDIFF(DAY, @p_cur_y_str, @p_cur_dat) + 1),

            (8,  'Day Before Yesterday',   1, NULL, DATEADD(DAY, -2, @p_cur_dat), DATEADD(DAY, -1, @p_cur_dat), 1),
            (9,  'Previous Week',          1, NULL, @p_prv_wek_str, @p_prv_wek_end, DATEDIFF(DAY, @p_prv_wek_str, @p_prv_wek_end) + 1),
            (10, 'Previous Month',         1, NULL, @p_prv_mth_str, @p_prv_mth_end, DATEDIFF(DAY, @p_prv_mth_str, @p_prv_mth_end) + 1),
            (11, 'Previous 28 Days',       1, NULL, DATEADD(DAY, -57, @p_cur_dat), @p_28_dys_str, 29),
            (12, '2 Months Ago',           1, NULL, DATEADD(MONTH, -2, @p_cur_mth_str), EOMONTH(DATEADD(MONTH, -2, @p_cur_mth_str)), DATEDIFF(DAY, DATEADD(MONTH, -2, @p_cur_mth_str), EOMONTH(DATEADD(MONTH, -2, @p_cur_mth_str))) + 1),
            (13, 'Previous Quarter',       1, NULL, @p_prv_q_str, @p_prv_q_end, DATEDIFF(DAY, @p_prv_q_str, @p_prv_q_end) + 1),
            (14, 'Previous Year',          1, NULL, @p_prv_y_str, @p_prv_y_end, DATEDIFF(DAY, @p_prv_y_str, @p_prv_y_end) + 1);

        SELECT 'DatePeriods populated successfully. Rows inserted: ' 
               + CAST(@@ROWCOUNT AS varchar(10)) AS Result;
        RETURN;
    END;

    /* ===============================
       GET DATA
       =============================== */
    IF @Action = 'GET'
    BEGIN
        SELECT 
            dat_per_id,
            dsc,
            is_cmp,
            cmp_dat_per_id,
            dat_frm,
            dat_to,
            total_days,
            created_date,
            FORMAT(dat_frm, 'MMM dd') AS frm_display,
            FORMAT(dat_to, 'MMM dd, yyyy') AS to_display
        FROM dbo.DatePeriods
        WHERE (@dat_per_id IS NULL OR dat_per_id = @dat_per_id)
        ORDER BY dat_per_id;
    END;
END;
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[sp_extract] AS
BEGIN
EXEC dbo.ExportQueryToCsv
      @Query        = N'SELECT OrderID, CustomerName, OrderDate, TotalAmount FROM dbo.Orders WHERE OrderDate >= ''2026-01-01'''
    , @OutputFile   = N'D:\Exports\Orders_2026YTD.csv'
    , @ServerName   = N'MYSQLSERVER01'       -- OR NULL for local DEFAULT
    , @DatabaseName = N'SalesDB'
    , @Delimiter    = N','
    , @IncludeHeaders = 1
    , @UseTrustedConnection = 1
    , @QuoteText    = 1                      -- quote text columns properly
    , @CodePage     = N'65001';              -- UTF-8

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getannouncements]
AS
BEGIN
    SET NOCOUNT ON


    BEGIN 
        SELECT  Title,
                Description,
                ExpireOn,
                Priority,
                PostedBy,
                PostedDate,
                LastModifiedDate,
                LastModifiedBy
        FROM  T_Announcement  
        WHERE   PostedDate >= DATEADD(MONTH,-3,GETDATE()) AND Status = 3
   END 

   BEGIN 
   SELECT  Title,
                Description,
                ExpireOn,
                Priority,
                PostedBy,
                PostedDate,
                LastModifiedDate,
                LastModifiedBy
        FROM  T_Announcement  
        WHERE    Status = 1
   END

END 

 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_getannouncementsbydaterange]
AS
BEGIN
    SET NOCOUNT ON


    BEGIN 
        SELECT  A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_PostedBy,
                A_PostedDate,
                A_LastModifiedDate,
                A_LastModifiedBy
        FROM  T_Announcement  
        WHERE   A_PostedDate >= DATEADD(MONTH,-3,GETDATE()) AND A_Status = 3
   END 

   BEGIN 
   SELECT       A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_PostedBy,
                A_PostedDate,
                A_LastModifiedDate,
                A_LastModifiedBy
        FROM  T_Announcement  
        WHERE    A_Status = 1
   END

END 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_announcementsdelation] 
(
@P_AnnouncementID  int
)
AS 
BEGIN

DELETE FROM  T_Announcement 
WHERE  A_ID = @P_AnnouncementID

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_getannouncementsbydaterange]
AS
BEGIN
    SET NOCOUNT ON


    BEGIN 
        SELECT 
                A_ID,
                A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_Department ,
                A_TargetAudience ,
                A_Category ,
                A_PostedBy,
                A_PostedDate,
                A_LastModifiedDate,
                A_LastModifiedBy
        FROM  T_Announcement  
        WHERE   A_PostedDate >= DATEADD(MONTH,-3,GETDATE()) AND A_Status = 3
   END 

   BEGIN 
   SELECT       
                A_ID,
                A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_Department ,
                A_TargetAudience ,
                A_Category ,
                A_PostedBy,
                A_PostedDate,
                A_LastModifiedDate,
                A_LastModifiedBy
        FROM  T_Announcement  
        WHERE    A_Status = 1
   END

END 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_getemployeefulldetails]
(
    @ID int
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        SELECT
            b.*,   -- Basic Info
            c.*,   -- Contact Info
            j.*,   -- Job Details
            e.*,   -- Education Details
            w.*,   -- Work Experience
            a.*,   -- Account Details
            d.*,   -- Documents Upload
            o.*,   -- Other Details
            i.*    -- Insurance Details
        FROM T_Emp_Basic_Info  b WITH(nolock)
        LEFT JOIN T_Emp_Contact_Info          c  WITH(nolock) ON c.ID = b.ID
        LEFT JOIN T_Emp_JobDetails_Info       j  WITH(nolock) ON j.ID = b.ID
        LEFT JOIN T_Emp_EducationDetails_Info e WITH(nolock) ON e.ID = b.ID
        LEFT JOIN T_Emp_WorkExperience_Info   w WITH(nolock) ON w.ID = b.ID
        LEFT JOIN T_Emp_AccountDetails_Info   a WITH(nolock) ON a.ID = b.ID
        LEFT JOIN T_Emp_DocumentsUpload_Info  d WITH(nolock) ON d.ID = b.ID
        LEFT JOIN T_Emp_LoginDetails_Info     o WITH(nolock) ON o.ID = b.ID
        LEFT JOIN T_Emp_InsuranceDetails_Info i WITH(nolock) ON i.ID = b.ID
        WHERE b.ID = @ID;

        COMMIT TRAN
    END TRY
    BEGIN CATCH

        -- Rollback only IF transaction is active
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        

    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_getleaveapprovalreport]
(
    @LeaveTypeID int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    SELECT
        LA.LeaveApplicationID,

        LA.LeaveTypeID,
        LT.LeaveTypeName AS LeaveType,

        LA.StartDate,
        LA.EndDate,

        -- Number of leave days (AS shown in UI)
        DATEDIFF(DAY, LA.StartDate, LA.EndDate) + 1 AS LeaveDays,

        LA.ReasonForLeave,

        LA.CreatedDate AS AppliedOn,

        -- UI action flags
        LA.ClearForm,
        LA.SubmitApplication

    FROM T_LeaveApplication LA WITH(nolock)
    INNER JOIN T_LeaveType LT WITH(nolock)
        ON LA.LeaveTypeID = LT.LeaveTypeID

    WHERE
        (@LeaveTypeID IS NULL OR LA.LeaveTypeID = @LeaveTypeID)

    ORDER BY LA.CreatedDate DESC;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_getvalidate_login_details]
(
   @UserName           varchar(50),
    @Password           varchar(255)

)

AS  
BEGIN

SET NOCOUNT ON

SELECT 
     elo.Id  AS Employee_Id,
    UserName ,
    [password_hash] ,
    Role ,
    edc.EmpPhoto
FROM  T_Emp_LoginDetails_Info elo WITH(nolock) 
INNER JOIN 
T_Emp_DocumentsUpload_Info edc WITH(nolock)  ON elo.Id = edc.Id
WHERE 
 UserName  = @UserName 
AND 
[password_hash] = @Password 
    
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_announcement]
(
    @P_OperationType      varchar(10),      -- INS / UPD
    @P_AnnouncementID     int = NULL,       -- Required for UPDATE
    @P_Title              varchar(2000),
    @P_Description        varchar(2000),
    @P_ExpireOn           date,
    @P_Priority           int,
    @P_Orgid              int = NULL,
    @P_Status             int = NULL,
    @P_Department      varchar(100),
    @P_TargetAudience  varchar(150),
    @P_Category      varchar(100),
    @P_PostedBy           varchar(200) = NULL,
    @P_LastModifiedBy     varchar(200) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        /* ========================
           INSERT
        ========================= */
        IF UPPER(@P_OperationType) = 'INS'
        BEGIN
            IF @P_PostedBy IS NULL SET @P_PostedBy = ORIGINAL_LOGIN();
            IF @P_Status   IS NULL SET @P_Status = 1;

            INSERT INTO T_Announcement
            (
                A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_Status,
                A_Orgid,
                A_Department ,
                A_TargetAudience ,
                A_Category ,
                A_PostedBy,
                A_PostedDate
            )
            VALUES
            (
                @P_Title,
                @P_Description,
                @P_ExpireOn,
                @P_Priority,
                @P_Status,
                @P_Orgid,
                @P_Department      ,
                @P_TargetAudience  ,
                @P_Category ,
                @P_PostedBy,
                GETDATE()
            );
        END

        /* ========================
           UPDATE
        ========================= */
        IF UPPER(@P_OperationType) = 'UPD'
        BEGIN
            IF @P_LastModifiedBy IS NULL SET @P_LastModifiedBy = ORIGINAL_LOGIN()

            UPDATE T_Announcement
            SET
                A_Title            = @P_Title,
                A_Description      = @P_Description,
                A_ExpireOn         = @P_ExpireOn,
                A_Priority         = @P_Priority,
                A_Status           = ISNULL(@P_Status, A_Status),
                A_Orgid            = @P_Orgid,
                A_Department       = @P_Department,
                A_TargetAudience   = @P_TargetAudience,
                A_Category         =  @P_Category,
                A_LastModifiedDate = GETDATE(),
                A_LastModifiedBy   = @P_LastModifiedBy
            WHERE A_ID = @P_AnnouncementID
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

     
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_accountdetails]
(
    @OperationType        varchar(10),   -- INS / UPD

    @ID          int,
    @BankName             varchar(100),
    @BranchName           varchar(100),
    @AccountNumber        varchar(30),
    @IFSCCode             varchar(20),
    @PFAccountNumber      varchar(30),
    @E_AC_ID                 int = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_AccountDetails_Info
            (
                ID,
                BankName,
                BranchName,
                AccountNumber,
                IFSCCode,
                PFAccountNumber
            
            )
            VALUES
            (
                @ID,
                @BankName,
                @BranchName,
                @AccountNumber,
                @IFSCCode,
                @PFAccountNumber
              
            )

            PRINT 'EMPLOYEE ACCOUNT DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_AccountDetails_Info
            SET
                BankName        = @BankName,
                BranchName      = @BranchName,
                AccountNumber   = @AccountNumber,
                IFSCCode        = @IFSCCode,
                PFAccountNumber = @PFAccountNumber
              
            WHERE E_AC_ID= @E_AC_ID

            PRINT 'EMPLOYEE ACCOUNT DETAILS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_basic_info]
(
    @OperationType      varchar(20),
    @Employee_Id        varchar(50) = NULL,   -- auto for INS
    @Employee_Name      varchar(250),
    @Dob                datetime,
    @Gender             varchar(50),
    @BloodGroup         varchar(20),
    @MaritalStatus      varchar(20),
    @Id                 int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        /* ================= INSERT ================= */
        IF @OperationType = 'INS'
        BEGIN
            DECLARE @NextNumber int

            SELECT @NextNumber =
                ISNULL(MAX(CAST(SUBSTRING(Employee_Id, 3, LEN(Employee_Id)) AS int)), 0)
            FROM T_Emp_Basic_Info WITH (UPDLOCK, HOLDLOCK)

            SET @Employee_Id =
                'OR' + RIGHT('0000' + CAST(@NextNumber + 1 AS varchar), 4)

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
                @Employee_Name,
                @Dob,
                @Gender,
                @BloodGroup,
                @MaritalStatus
               
            )

            PRINT 'EMPLOYEE INSERTED SUCCESSFULLY'
        END

        /* ================= UPDATE ================= */
        ELSE IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_Basic_Info
            SET
                Employee_Name      = @Employee_Name,
                Dob                = @Dob,
                Gender             = @Gender,
                BloodGroup         = @BloodGroup,
                MaritalStatus      = @MaritalStatus
               
            WHERE Id = @Id;

            PRINT 'EMPLOYEE UPDATED SUCCESSFULLY'
        END

        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

         -- rethrow error
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_contact_info]
(
    @OperationType          varchar(10),      -- INS / UPD

    @PersonalMail           varchar(200),
    @LinkedinUrl            varchar(300),
    @ContactNo              varchar(15),
    @PermanentAddress       varchar(500),
    @PresentAddress         varchar(500),

    @EmergencyContactName1  varchar(100),
    @ContactNo1             varchar(15),
    @Relation1              varchar(200),

    @ContactNo2             varchar(15),
    @Relation2              varchar(200),

    @ContactNo3             varchar(15) = NULL,
    @Relation3              varchar(200) = NULL,

    @ID            int,


    @C_ID                   int = NULL 
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        /* ================= INSERT ================= */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_Contact_Info
            (
                PersonalMail,
                LinkedinUrl,
                ContactNo,
                PermanentAddress,
                PresentAddress,
                EmergencyContactName1,
                ContactNo1,
                Relation1,
                ContactNo2,
                Relation2,
                ContactNo3,
                Relation3,
                ID
              
            )
            VALUES
            (
                @PersonalMail,
                @LinkedinUrl,
                @ContactNo,
                @PermanentAddress,
                @PresentAddress,
                @EmergencyContactName1,
                @ContactNo1,
                @Relation1,
                @ContactNo2,
                @Relation2,
                @ContactNo3,
                @Relation3,
                @ID
            
            )

            PRINT 'EMPLOYEE CONTACT INFO INSERTED SUCCESSFULLY'
        END

        /* ================= UPDATE ================= */
        ELSE IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_Contact_Info
            SET
                PersonalMail           = @PersonalMail,
                LinkedinUrl            = @LinkedinUrl,
                ContactNo              = @ContactNo,
                PermanentAddress       = @PermanentAddress,
                PresentAddress         = @PresentAddress,
                EmergencyContactName1  = @EmergencyContactName1,
                ContactNo1             = @ContactNo1,
                Relation1              = @Relation1,
                ContactNo2             = @ContactNo2,
                Relation2              = @Relation2,
                ContactNo3             = @ContactNo3,
                Relation3              = @Relation3,
              --  LastModifiedBy            =@LastModifiedBy,
                LastModifiedDate           = GETDATE()
            WHERE @C_ID = @C_ID

            PRINT 'EMPLOYEE CONTACT INFO UPDATED SUCCESSFULLY'
        END
      
        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_documentsupload]
(
    @OperationType                  varchar(10),   -- INS / UPD

    @ID                    int,
    @EmpPhoto                       varbinary(MAX),
    @EmpPanNumberDocs               varbinary(MAX),
    @EmpPassportNumberDocs          varbinary(MAX),
    @LastSixMonthsBankStatements    varbinary(MAX),
    @LastThreeMonthsPayslips        varbinary(MAX),
    @ExperienceLetterDocs           varbinary(MAX),
    @RelievingLetterDocs            varbinary(MAX),
    @OfferLetterDocs                varbinary(MAX),
    @E_DO_ID                          int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_DocumentsUpload_Info
            (
                ID,
                EmpPhoto,
                EmpPanNumberDocs,
                EmpPassportNumberDocs,
                LastSixMonthsBankStatements,
                LastThreeMonthsPayslips,
                ExperienceLetterDocs,
                RelievingLetterDocs,
                OfferLetterDocs
               
            )
            VALUES
            (
                @ID,
                @EmpPhoto,
                @EmpPanNumberDocs,
                @EmpPassportNumberDocs,
                @LastSixMonthsBankStatements,
                @LastThreeMonthsPayslips,
                @ExperienceLetterDocs,
                @RelievingLetterDocs,
                @OfferLetterDocs
             
            )

            PRINT 'EMPLOYEE DOCUMENTS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_DocumentsUpload_Info
            SET
                EmpPhoto                     = @EmpPhoto,
                EmpPanNumberDocs             = @EmpPanNumberDocs,
                EmpPassportNumberDocs        = @EmpPassportNumberDocs,
                LastSixMonthsBankStatements  = @LastSixMonthsBankStatements,
                LastThreeMonthsPayslips      = @LastThreeMonthsPayslips,
                ExperienceLetterDocs         = @ExperienceLetterDocs,
                RelievingLetterDocs          = @RelievingLetterDocs,
                OfferLetterDocs              = @OfferLetterDocs
            WHERE E_DO_ID = @E_DO_ID 

            PRINT 'EMPLOYEE DOCUMENTS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_educationdetails_info]
(
    @OperationType          varchar(10),   -- INS / UPD

    @ID            int,
    @HighestQualification   varchar(100),
    @Specialization         varchar(200),
    @YearOfPassing          datetime,
    @University_ClgName     varchar(100),
    @Certificates           varbinary(MAX),


    @ED_Id                      int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_EducationDetails_Info
            (
                ID,
                HighestQualification,
                Specialization,
                YearOfPassing,
                [university_or_college_name],
                Certificates

            )
            VALUES
            (
                @ID,
                @HighestQualification,
                @Specialization,
                @YearOfPassing,
                @University_ClgName,
                @Certificates
             
            )

            PRINT 'EMPLOYEE EDUCATION DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_EducationDetails_Info
            SET
                HighestQualification = @HighestQualification,
                Specialization       = @Specialization,
                YearOfPassing        = @YearOfPassing,
                [university_or_college_name] = @University_ClgName,
                Certificates         = @Certificates
               
            WHERE ED_Id  = @ED_Id 

            PRINT 'EMPLOYEE EDUCATION DETAILS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_insurancedetails]
(
    @OperationType        varchar(10), -- INS / UPD

    @ID          int,
     @E_INS_ID   int = NULL,

    -- Father
    @FatherName           varchar(100),
    @FatherAdhar          varbinary(MAX),
    @FatherPan            varbinary(MAX),
    @FatherDOB            datetime,
    @FatherOccupation     varchar(100),

    -- Mother
    @MotherName           varchar(100),
    @MotherAdhar          varbinary(MAX),
    @MotherPan            varbinary(MAX),
    @MotherDOB            datetime,
    @MotherOccupation     varchar(100),

    -- Spouse
    @SpouseName           varchar(100) = NULL,
    @SpouseAdhar          varbinary(MAX) = NULL,
    @SpousePan            varbinary(MAX) = NULL,
    @SpouseDOB            datetime = NULL,
    @SpouseOccupation     varchar(100) = NULL,

    -- Children
    @Child1Name           varchar(100) = NULL,
    @Child1Adhar          varbinary(MAX) = NULL,
    @Child2Name           varchar(100) = NULL,
    @Child2Adhar          varbinary(MAX) = NULL

 
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_InsuranceDetails_Info
            (
                ID,
                FatherName,
                FatherAdhar,
                FatherPan,
                FatherDOB,
                FatherOccupation,
                MotherName,
                MotherAdhar,
                MotherPan,
                MotherDOB,
                MotherOccupation,
                SpouseName,
                SpouseAdhar,
                SpousePan,
                SpouseDOB,
                SpouseOccupation,
                Child1Name,
                Child1Adhar,
                Child2Name,
                Child2Adhar
          
            )
            VALUES
            (
                @ID,
                @FatherName,
                @FatherAdhar,
                @FatherPan,
                @FatherDOB,
                @FatherOccupation,
                @MotherName,
                @MotherAdhar,
                @MotherPan,
                @MotherDOB,
                @MotherOccupation,
                @SpouseName,
                @SpouseAdhar,
                @SpousePan,
                @SpouseDOB,
                @SpouseOccupation,
                @Child1Name,
                @Child1Adhar,
                @Child2Name,
                @Child2Adhar
                
            )

            PRINT 'EMPLOYEE INSURANCE DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_InsuranceDetails_Info
            SET
                FatherName       = @FatherName,
                FatherAdhar      = @FatherAdhar,
                FatherPan        = @FatherPan,
                FatherDOB        = @FatherDOB,
                FatherOccupation = @FatherOccupation,
                MotherName       = @MotherName,
                MotherAdhar      = @MotherAdhar,
                MotherPan        = @MotherPan,
                MotherDOB        = @MotherDOB,
                MotherOccupation = @MotherOccupation,
                SpouseName       = @SpouseName,
                SpouseAdhar      = @SpouseAdhar,
                SpousePan        = @SpousePan,
                SpouseDOB        = @SpouseDOB,
                SpouseOccupation = @SpouseOccupation,
                Child1Name       = @Child1Name,
                Child1Adhar      = @Child1Adhar,
                Child2Name       = @Child2Name,
                Child2Adhar      = @Child2Adhar
               
            WHERE @E_INS_ID = @E_INS_ID

            PRINT 'EMPLOYEE INSURANCE DETAILS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_jobdetails]
(
    @OperationType           varchar(10),   -- INS / UPD

    @ID             int,
    @OfficeEmail             varchar(50),
    @Department              varchar(50),
    @CurrentDesg             varchar(50),
    @EmploymentType          varchar(50),
    @PayLevel_Grade          varchar(20),
    @ReportingManager        varchar(50),
    @WorkLocation_Branch     varchar(200),
    @ShiftTiming             varchar(50),
    @CasualLeaves            int,
    @EarnedLeaves            int,
    @OptionalLeaves          int,

    -- Audit columns
    @J_Id                      int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_JobDetails_Info
            (
                ID,
                OfficeEmail,
                Department,
                CurrentDesg,
                EmploymentType,
                [pay_level_or_grade],
                ReportingManager,
                [work_location_or_branch],
                ShiftTiming,
                CasualLeaves,
                EarnedLeaves,
                OptionalLeaves
             
            )
            VALUES
            (
                @ID,
                @OfficeEmail,
                @Department,
                @CurrentDesg,
                @EmploymentType,
                @PayLevel_Grade,
                @ReportingManager,
                @WorkLocation_Branch,
                @ShiftTiming,
                @CasualLeaves,
                @EarnedLeaves,
                @OptionalLeaves
            
            )

            PRINT 'EMPLOYEE JOB DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_JobDetails_Info
            SET
                OfficeEmail               = @OfficeEmail,
                Department                = @Department,
                CurrentDesg               = @CurrentDesg,
                EmploymentType            = @EmploymentType,
                [pay_level_or_grade]        = @PayLevel_Grade,
                ReportingManager          = @ReportingManager,
                [work_location_or_branch]   = @WorkLocation_Branch,
                ShiftTiming               = @ShiftTiming,
                CasualLeaves              = @CasualLeaves,
                EarnedLeaves              = @EarnedLeaves,
                OptionalLeaves            = @OptionalLeaves,
                --LastModifiedBy               = @LastModifiedBy,
                LastModifiedDate              = GETDATE()
            WHERE J_Id  = @J_Id 

            PRINT 'EMPLOYEE JOB DETAILS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_otherdetails]
(
    @OperationType      varchar(10),   -- INS / UPD

    @ID        int,
    @UserName           varchar(50),
    @Password           varchar(255),
    @Role               varchar(100),

    -- Audit columns
    @E_LO_ID          int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_LoginDetails_Info
            (
                ID,
                UserName,
                [password_hash],
                 Role
             
            )
            VALUES
            (
                @ID,
                @UserName,
                @Password,
                @Role
            
            )

            PRINT 'EMPLOYEE OTHER DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_LoginDetails_Info
            SET
                UserName     = @UserName,
                [password_hash]   = @Password,
                 Role        = @Role
              
            WHERE E_LO_ID = @E_LO_ID

            PRINT 'EMPLOYEE OTHER DETAILS UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_ins_upd_emp_salarystructure]
(
    @OperationType char(10),  -- INS = INSERT, UPD = Update
    @SalaryID int = NULL,

    @ID int,

    -- Earnings
    @Gross_Monthly decimal(10,2),
    @Gross_Annual decimal(12,2),

    @Basic_Monthly decimal(10,2),
    @Basic_Annual decimal(12,2),

    @HRA_Monthly decimal(10,2),
    @HRA_Annual decimal(12,2),

    @FoodAllowance_Monthly decimal(10,2),
    @FoodAllowance_Annual decimal(12,2),

    @SpecialAllowance_Monthly decimal(10,2),
    @SpecialAllowance_Annual decimal(12,2),

    @GrossSalaryA_Monthly decimal(10,2),
    @GrossSalaryA_Annual decimal(12,2),

    -- Employer Contributions
    @ER_PF_Monthly decimal(10,2),
    @ER_PF_Annual decimal(12,2),

    @ER_ESI_Monthly decimal(10,2),
    @ER_ESI_Annual decimal(12,2),

    @JoiningBonus_Annual decimal(12,2) = NULL,

    @CTC_Monthly decimal(10,2),
    @CTC_Annual decimal(12,2),

    -- Deductions
    @EPF_Monthly decimal(10,2),
    @EPF_Annual decimal(12,2),

    @TDS_Monthly decimal(10,2),
    @TDS_Annual decimal(12,2),

    @PT_Monthly decimal(10,2),
    @PT_Annual decimal(12,2),

    @TotalDeductions_Monthly decimal(10,2),
    @TotalDeductions_Annual decimal(12,2),

    -- Net Pay
    @NetPay_Monthly decimal(10,2),
    @NetPay_Annual decimal(12,2),
    @NetPay_FirstMonth decimal(10,2)

    --@UserName varchar(200)
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        -- INSERT
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_SalaryStructure
            (
                ID,
                Gross_Monthly, Gross_Annual,
                Basic_Monthly, Basic_Annual,
                HRA_Monthly, HRA_Annual,
                FoodAllowance_Monthly, FoodAllowance_Annual,
                SpecialAllowance_Monthly, SpecialAllowance_Annual,
                GrossSalaryA_Monthly, GrossSalaryA_Annual,
                ER_PF_Monthly, ER_PF_Annual,
                ER_ESI_Monthly, ER_ESI_Annual,
                JoiningBonus_Annual,
                CTC_Monthly, CTC_Annual,
                EPF_Monthly, EPF_Annual,
                TDS_Monthly, TDS_Annual,
                PT_Monthly, PT_Annual,
                TotalDeductions_Monthly, TotalDeductions_Annual,
                NetPay_Monthly, NetPay_Annual,
                NetPay_FirstMonth
                
            )
            VALUES
            (
                @ID,
                @Gross_Monthly, @Gross_Annual,
                @Basic_Monthly, @Basic_Annual,
                @HRA_Monthly, @HRA_Annual,
                @FoodAllowance_Monthly, @FoodAllowance_Annual,
                @SpecialAllowance_Monthly, @SpecialAllowance_Annual,
                @GrossSalaryA_Monthly, @GrossSalaryA_Annual,
                @ER_PF_Monthly, @ER_PF_Annual,
                @ER_ESI_Monthly, @ER_ESI_Annual,
                @JoiningBonus_Annual,
                @CTC_Monthly, @CTC_Annual,
                @EPF_Monthly, @EPF_Annual,
                @TDS_Monthly, @TDS_Annual,
                @PT_Monthly, @PT_Annual,
                @TotalDeductions_Monthly, @TotalDeductions_Annual,
                @NetPay_Monthly, @NetPay_Annual,
                @NetPay_FirstMonth
                
            )
        END

        -- UPDATE
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_SalaryStructure
            SET
                Gross_Monthly = @Gross_Monthly,
                Gross_Annual = @Gross_Annual,
                Basic_Monthly = @Basic_Monthly,
                Basic_Annual = @Basic_Annual,
                HRA_Monthly = @HRA_Monthly,
                HRA_Annual = @HRA_Annual,
                FoodAllowance_Monthly = @FoodAllowance_Monthly,
                FoodAllowance_Annual = @FoodAllowance_Annual,
                SpecialAllowance_Monthly = @SpecialAllowance_Monthly,
                SpecialAllowance_Annual = @SpecialAllowance_Annual,
                GrossSalaryA_Monthly = @GrossSalaryA_Monthly,
                GrossSalaryA_Annual = @GrossSalaryA_Annual,
                ER_PF_Monthly = @ER_PF_Monthly,
                ER_PF_Annual = @ER_PF_Annual,
                ER_ESI_Monthly = @ER_ESI_Monthly,
                ER_ESI_Annual = @ER_ESI_Annual,
                JoiningBonus_Annual = @JoiningBonus_Annual,
                CTC_Monthly = @CTC_Monthly,
                CTC_Annual = @CTC_Annual,
                EPF_Monthly = @EPF_Monthly,
                EPF_Annual = @EPF_Annual,
                TDS_Monthly = @TDS_Monthly,
                TDS_Annual = @TDS_Annual,
                PT_Monthly = @PT_Monthly,
                PT_Annual = @PT_Annual,
                TotalDeductions_Monthly = @TotalDeductions_Monthly,
                TotalDeductions_Annual = @TotalDeductions_Annual,
                NetPay_Monthly = @NetPay_Monthly,
                NetPay_Annual = @NetPay_Annual,
                NetPay_FirstMonth = @NetPay_FirstMonth
                
            WHERE SalaryID = @SalaryID
        END

        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name, Error_Line, Error_Number,
            Error_Message, Error_Severity,
            Error_State, Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(), ERROR_LINE(),
            ERROR_NUMBER(), ERROR_MESSAGE(),
            ERROR_SEVERITY(), ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_workexperience]
(
    @OperationType            varchar(10),   -- INS / UPD

    @ID              int,
    @Skills                   varchar(500),
    @YearsOfExperience        decimal(5,2),
    @PreviousOrganization     varchar(200),
    @PreviousDesignation      varchar(100),

    -- Audit columns
    @WE_Id                    int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_Emp_WorkExperience_Info
            (
                ID,
                Skills,
                YearsOfExperience,
                PreviousOrganization,
                PreviousDesignation
              
            )
            VALUES
            (
                @ID,
                @Skills,
                @YearsOfExperience,
                @PreviousOrganization,
                @PreviousDesignation
              
            )

            PRINT 'EMPLOYEE WORK EXPERIENCE INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_WorkExperience_Info
            SET
                Skills               = @Skills,
                YearsOfExperience    = @YearsOfExperience,
                PreviousOrganization = @PreviousOrganization,
                PreviousDesignation  = @PreviousDesignation
             
            WHERE @WE_Id= @WE_Id

            PRINT 'EMPLOYEE WORK EXPERIENCE UPDATED SUCCESSFULLY'
        END

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRANSACTION

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_leaveapplication]
(
    @OperationType        varchar(10),   -- INS / UPD
    @LeaveApplicationID   int = NULL,     -- Required only for UPDATE

    @LeaveTypeID          int,
    @StartDate            datetime,
    @EndDate              datetime,
    @ReasonForLeave       varchar(2000),
    @ClearForm            bit = 0,
    @SubmitApplication    bit = 1

   
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_LeaveApplication
            (
                LeaveTypeID,
                StartDate,
                EndDate,
                ReasonForLeave,
                ClearForm,
                SubmitApplication
              
            )
            VALUES
            (
                @LeaveTypeID,
                @StartDate,
                @EndDate,
                @ReasonForLeave,
                @ClearForm,
                @SubmitApplication
                
            )
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_LeaveApplication
            SET
                LeaveTypeID = @LeaveTypeID,
                StartDate = @StartDate,
                EndDate = @EndDate,
                ReasonForLeave = @ReasonForLeave,
                ClearForm = @ClearForm,
                SubmitApplication = @SubmitApplication
               
            WHERE LeaveApplicationID = @LeaveApplicationID;
        END

        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_leavemanagement]
(
    @OperationType       varchar(10),     -- INS / UPD
    @EmploymentTypeID    int = NULL,      -- Used only for UPDATE
    @EmploymentType      varchar(2000)
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRAN

        /* ========= INSERT ========= */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO T_LeaveManagement
            (
                EmploymentType
            )
            VALUES
            (
                @EmploymentType
            )
        END

        /* ========= UPDATE ========= */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_LeaveManagement
            SET EmploymentType = @EmploymentType
            WHERE EmploymentTypeID = @EmploymentTypeID
        END

        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_ins_upd_leavepolicy]
(
    @OperationType varchar(10),   -- INS / UPD
    @PolicyID int = NULL,         -- Required ONLY for UPDATE

    @EmploymentTypeID int,
    @LeaveTypeID int,

    -- Standard
    @AnnualAllowance int = NULL,
    @CarryForwardAllowed bit = NULL,
    @EncashmentAllowed bit = NULL,
    @AccrualMethod varchar(50) = NULL,

    -- Parental
    @TotalDurationDays int = NULL,
    @PaidDurationDays int = NULL,
    @ExtensionAllowed bit = NULL,
    @MustBeTakenWithin int = NULL,
    @AdditionalNotes varchar(2000) = NULL,

    -- CompOff
    @EnableCompOff bit = NULL,
    @ExpiryPeriodDays int = NULL,
    @MaxAccrualLimit int = NULL,

    -- LOP
    @AllowUnpaidLeave bit = NULL,
    @MaxConsecutiveDays int = NULL,
    @ApprovalRequired bit = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    DECLARE @LeaveCategory varchar(50)

    BEGIN TRY
        BEGIN TRAN

        SELECT @LeaveCategory = LeaveCategory
        FROM T_LeaveType
        WHERE LeaveTypeID = @LeaveTypeID


        /* ================= INSERT ================= */
        IF @OperationType = 'INS'
        BEGIN
            IF @LeaveCategory = 'Standard'
                INSERT INTO  T_LeavePolicy_Standard
                (
                    EmploymentTypeID, LeaveTypeID,
                    AnnualAllowance, CarryForwardAllowed,
                    EncashmentAllowed, AccrualMethod
                    
                )
                VALUES
                (
                    @EmploymentTypeID, @LeaveTypeID,
                    @AnnualAllowance, @CarryForwardAllowed,
                    @EncashmentAllowed, @AccrualMethod
                    
                )

            IF @LeaveCategory = 'Parental'
                INSERT INTO T_LeavePolicy_Parental
                (
                    EmploymentTypeID, LeaveTypeID,
                    TotalDurationDays, PaidDurationDays,
                    ExtensionAllowed, MustBeTakenWithin,
                    AdditionalNotes
                )
                VALUES
                (
                    @EmploymentTypeID, @LeaveTypeID,
                    @TotalDurationDays, @PaidDurationDays,
                    @ExtensionAllowed, @MustBeTakenWithin,
                    @AdditionalNotes
                )

            IF @LeaveCategory = 'CompOff'
                INSERT INTO T_LeavePolicy_CompOff
                (
                    EmploymentTypeID, EnableCompOff,
                    ExpiryPeriodDays, MaxAccrualLimit
                   
                )
                VALUES
                (
                    @EmploymentTypeID, @EnableCompOff,
                    @ExpiryPeriodDays, @MaxAccrualLimit
                   
                )

            IF @LeaveCategory = 'LOP'
                INSERT INTO T_LeavePolicy_LOP
                (
                    EmploymentTypeID, AllowUnpaidLeave,
                    MaxConsecutiveDays, ApprovalRequired
                   
                )
                VALUES
                (
                    @EmploymentTypeID, @AllowUnpaidLeave,
                    @MaxConsecutiveDays, @ApprovalRequired
                    
                )
        END

        /* ================= UPDATE ================= */
        IF @OperationType = 'UPD'
        BEGIN
            IF @LeaveCategory = 'Standard'
                UPDATE T_LeavePolicy_Standard
                SET
                    AnnualAllowance = @AnnualAllowance,
                    CarryForwardAllowed = @CarryForwardAllowed,
                    EncashmentAllowed = @EncashmentAllowed,
                    AccrualMethod = @AccrualMethod
                  
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'Parental'
                UPDATE T_LeavePolicy_Parental
                SET
                    TotalDurationDays = @TotalDurationDays,
                    PaidDurationDays = @PaidDurationDays,
                    ExtensionAllowed = @ExtensionAllowed,
                    MustBeTakenWithin = @MustBeTakenWithin,
                    AdditionalNotes = @AdditionalNotes   
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'CompOff'
                UPDATE T_LeavePolicy_CompOff
                SET
                    EnableCompOff = @EnableCompOff,
                    ExpiryPeriodDays = @ExpiryPeriodDays,
                    MaxAccrualLimit = @MaxAccrualLimit
                   
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'LOP'
                UPDATE T_LeavePolicy_LOP
                SET
                    AllowUnpaidLeave = @AllowUnpaidLeave,
                    MaxConsecutiveDays = @MaxConsecutiveDays,
                    ApprovalRequired = @ApprovalRequired
                   
                WHERE PolicyID = @PolicyID
        END

        COMMIT TRAN
    END TRY
    BEGIN CATCH
        IF XACT_STATE() <> 0
            ROLLBACK TRAN

        INSERT INTO T_Error_Logs
        (
            Proc_Name, Error_Line, Error_Number,
            Error_Message, Error_Severity,
            Error_State, Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(), ERROR_LINE(),
            ERROR_NUMBER(), ERROR_MESSAGE(),
            ERROR_SEVERITY(), ERROR_STATE(),
            SUSER_SNAME()
        )

        
    END CATCH
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE  PROCEDURE   [dbo].[usp_ins_upd_sch_announcements]
AS
BEGIN

 SET NOCOUNT ON
 BEGIN tran
BEGIN try

DECLARE @P_IDENTITY int 

INSERT INTO  T_SchDependency_log ( Sd_name, Sd_ProcName ,Sd_StartDate ,Sd_ProcessStatus )
VALUES ('Announcements','s_sch_Announcements',getdate(),'I')


SELECT  @P_IDENTITY = SCOPE_IDENTITY() 
 
Update T_Announcement
SET A_Status = 3
WHERE A_ExpireOn <=getdate() AND A_Status =1
 


Delete FROM T_Announcement WHERE A_Status =3 AND datediff(day,A_PostedDate,getdate()) >90
 


UPDATE T_SchDependency_log 
SET Sd_ProcessStatus = 'C',
Sd_EndDate = getdate()
WHERE Sd_Id = @P_IDENTITY

commit tran

END TRY
 

 BEGIN CATCH
        IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;

        INSERT INTO T_Error_Logs
        (
            Proc_Name,
            Error_Line,
            Error_Number,
            Error_Message,
            Error_Severity,
            Error_State,
            Executed_By
        )
        VALUES
        (
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_NUMBER(),
            ERROR_MESSAGE(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            SUSER_SNAME()
        )

     
    END CATCH

END

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[trg_t_emp_basic_info_audit]
ON [dbo].[employee_basic_info]
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON

    INSERT INTO T_Emp_Basic_Info_Audit
    (
        AuditId,
        Employee_Id,

        Old_Employee_Name,
        Old_Dob,
        Old_Gender,
        Old_BloodGroup,
        Old_MaritalStatus,

        New_Employee_Name,
        New_Dob,
        New_Gender,
        New_BloodGroup,
        New_MaritalStatus,

        ChangedBy,
        ChangedDate
    )
    SELECT
        d.Id,
        d.Employee_Id,

        d.Employee_Name,
        d.Dob,
        d.Gender,
        d.BloodGroup,
        d.MaritalStatus,

        i.Employee_Name,
        i.Dob,
        i.Gender,
        i.BloodGroup,
        i.MaritalStatus,

        SUSER_SNAME(),
        GETDATE()
    FROM deleted d
    LEFT JOIN inserted i
        ON d.Id = i.Id
END
GO
ALTER TABLE [dbo].[employee_basic_info] ENABLE TRIGGER [trg_t_emp_basic_info_audit]
GO
