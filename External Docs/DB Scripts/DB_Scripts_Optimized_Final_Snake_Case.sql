/*
    ORMS DATABASE SCRIPT

    NAMING CONVENTION:
    - SQL keywords: UPPERCASE
    - Schema, table, column and constraint names: lowercase snake_case
    - Original abbreviations and naming terms are preserved
    - Only word separators/underscores are added for readability
*/

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
CREATE TABLE [dbo].[t_emp_account_details_info](
	--[acc_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] IDENTITY(1,1) NOT NULL,
    [bank_name] [varchar](100) NOT NULL,
    [branch_name] [varchar](100) NOT NULL,
    [account_number] [varchar](30) NOT NULL,
    [ifsc_code] [varchar](20) NOT NULL,
    [pf_account_number] [varchar](30) NOT NULL,
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
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_contact_info](
    [c_id] [int] IDENTITY(1,1) NOT NULL,
    [personal_mail] [varchar](200) NOT NULL,
    [linkedin_url] [varchar](300) NOT NULL,
    [contact_no] [varchar](15) NOT NULL,
    [permanent_address] [varchar](500) NOT NULL,
    [present_address] [varchar](500) NOT NULL,
    [emergency_contact_name_1] [varchar](100) NOT NULL,
    [contact_no_1] [varchar](15) NOT NULL,
    [relation_1] [varchar](200) NOT NULL,
    [contact_no_2] [varchar](15) NOT NULL,
    [relation_2] [varchar](200) NOT NULL,
    [contact_no_3] [varchar](15) NULL,
    [relation_3] [varchar](200) NULL,
    [id] [int] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [c_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_documents_upload_info](
    [e_do_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [emp_photo] [varbinary](max) NULL,
    [emp_pan_number_docs] [varbinary](max) NULL,
    [emp_passport_number_docs] [varbinary](max) NULL,
    [last_six_months_bank_statements] [varbinary](max) NULL,
    [last_three_months_payslips] [varbinary](max) NULL,
    [experience_letter_docs] [varbinary](max) NULL,
    [relieving_letter_docs] [varbinary](max) NULL,
    [offer_letter_docs] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [e_do_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_education_details_info](
    [ed_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [highest_qualification] [varchar](100) NOT NULL,
    [specialization] [varchar](200) NOT NULL,
    [year_of_passing] [datetime] NOT NULL,
    [university_clg_name] [varchar](100) NOT NULL,
    [certificates] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [ed_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_insurance_details_info](
    [e_ins_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [father_name] [varchar](100) NOT NULL,
    [father_aadhar] [varbinary](max) NULL,
    [father_pan] [varbinary](max) NULL,
    [father_dob] [datetime] NOT NULL,
    [father_occupation] [varchar](100) NOT NULL,
    [mother_name] [varchar](100) NOT NULL,
    [mother_aadhar] [varbinary](max) NULL,
    [mother_pan] [varbinary](max) NULL,
    [mother_dob] [datetime] NOT NULL,
    [mother_occupation] [varchar](100) NOT NULL,
    [spouse_name] [varchar](100) NULL,
    [spouse_aadhar] [varbinary](max) NULL,
    [spouse_pan] [varbinary](max) NULL,
    [spouse_dob] [datetime] NULL,
    [spouse_occupation] [varchar](100) NULL,
    [child_1_name] [varchar](100) NULL,
    [child_1_aadhar] [varbinary](max) NULL,
    [child_2_name] [varchar](100) NULL,
    [child_2_aadhar] [varbinary](max) NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [e_ins_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_job_details_info](
    [j_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [office_email] [varchar](50) NOT NULL,
    [department] [varchar](50) NOT NULL,
    [current_desg] [varchar](50) NOT NULL,
    [employment_type] [varchar](50) NOT NULL,
    [pay_level_grade] [varchar](20) NOT NULL,
    [reporting_manager] [varchar](50) NOT NULL,
    [work_location_branch] [varchar](200) NOT NULL,
    [shift_timing] [varchar](50) NOT NULL,
    [casual_leaves] [int] NOT NULL,
    [earned_leaves] [int] NOT NULL,
    [optional_leaves] [int] NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [j_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_login_details_info](
    [e_lo_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [user_name] [varchar](50) NOT NULL,
    [password] [varchar](255) NOT NULL,
    [role] [varchar](100) NOT NULL,
    [created_by] [varchar](100) NULL,
    [created_date] [datetime] NULL,
    [last_modified_by] [varchar](100) NULL,
    [last_modified_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
    [e_lo_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF),
 CONSTRAINT [uq_t_emp_other_details_username] UNIQUE NONCLUSTERED 
(
    [user_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_emp_salary_structure](
    [salary_id] [int] IDENTITY(1,1) NOT NULL,
    [id] [int] NOT NULL,
    [gross_monthly] [decimal](10, 2) NOT NULL,
    [gross_annual] [decimal](12, 2) NOT NULL,
    [basic_monthly] [decimal](10, 2) NOT NULL,
    [basic_annual] [decimal](12, 2) NOT NULL,
    [hra_monthly] [decimal](10, 2) NOT NULL,
    [hra_annual] [decimal](12, 2) NOT NULL,
    [food_allowance_monthly] [decimal](10, 2) NOT NULL,
    [food_allowance_annual] [decimal](12, 2) NOT NULL,
    [special_allowance_monthly] [decimal](10, 2) NOT NULL,
    [special_allowance_annual] [decimal](12, 2) NOT NULL,
    [gross_salary_monthly] [decimal](10, 2) NOT NULL,
    [gross_salary_annual] [decimal](12, 2) NOT NULL,
    [er_pf_monthly] [decimal](10, 2) NOT NULL,
    [er_pf_annual] [decimal](12, 2) NOT NULL,
    [er_esi_monthly] [decimal](10, 2) NOT NULL,
    [er_esi_annual] [decimal](12, 2) NOT NULL,
    [joining_bonus_annual] [decimal](12, 2) NULL,
    [ctc_monthly] [decimal](10, 2) NOT NULL,
    [ctc_annual] [decimal](12, 2) NOT NULL,
    [epf_monthly] [decimal](10, 2) NOT NULL,
    [epf_annual] [decimal](12, 2) NOT NULL,
    [tds_monthly] [decimal](10, 2) NOT NULL,
    [tds_annual] [decimal](12, 2) NOT NULL,
    [pt_monthly] [decimal](10, 2) NOT NULL,
    [pt_annual] [decimal](12, 2) NOT NULL,
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
CREATE TABLE [dbo].[t_emp_work_experience_info](
    [we_id] [int] IDENTITY(1,1) NOT NULL,
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
    [we_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_error_logs](
    [error_log_id] [int] IDENTITY(1,1) NOT NULL,
    [proc_name] [sysname] NOT NULL,
    [error_line] [int] NULL,
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
CREATE TABLE [dbo].[t_leave_application](
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
 CONSTRAINT [pk_t_leave_application] PRIMARY KEY CLUSTERED 
(
    [leave_application_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_leave_management](
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
CREATE TABLE [dbo].[t_leave_policy_comp_off](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [enable_comp_off] [bit] NOT NULL,
    [expiry_period_days] [int] NOT NULL,
    [max_accrual_limit] [int] NOT NULL,
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
CREATE TABLE [dbo].[t_leave_policy_lop](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [allow_unpaid_leave] [bit] NOT NULL,
    [max_consecutive_days] [int] NOT NULL,
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
CREATE TABLE [dbo].[t_leave_policy_parental](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [leave_type_id] [int] NOT NULL,
    [total_duration_days] [int] NOT NULL,
    [paid_duration_days] [int] NOT NULL,
    [extension_allowed] [bit] NOT NULL,
    [must_be_taken_within] [int] NULL,
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
CREATE TABLE [dbo].[t_leave_policy_standard](
    [policy_id] [int] IDENTITY(1,1) NOT NULL,
    [employment_type_id] [int] NOT NULL,
    [leave_type_id] [int] NOT NULL,
    [annual_allowance] [int] NOT NULL,
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
CREATE TABLE [dbo].[t_leave_type](
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
CREATE TABLE [dbo].[t_sch_dependency_log](
    [sd_id] [int] IDENTITY(1,1) NOT NULL,
    [sd_name] [varchar](200) NULL,
    [sd_proc_name] [varchar](200) NULL,
    [sd_startdate] [datetime] NULL,
    [sd_enddate] [datetime] NULL,
    [sd_process_status] [varchar](2) NULL,
PRIMARY KEY CLUSTERED 
(
    [sd_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hr].[t_emp_address](
    [add_id] [int] IDENTITY(1,1) NOT NULL,
    [add_emp_id] [varchar](50) NOT NULL,
    [add_type] [varchar](5) NOT NULL,
    [add_door_no] [varchar](200) NOT NULL,
    [add_area] [varchar](100) NULL,
    [add_city] [varchar](50) NULL,
    [add_pincode] [varchar](10) NULL,
    [add_state] [varchar](50) NULL,
    [add_country] [varchar](50) NULL,
    [add_status] [int] NOT NULL,
    [add_created_by] [int] NULL,
    [add_created_date] [datetime] NULL,
    [add_modified_by] [int] NULL,
    [add_modified_date] [datetime] NULL
)
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [hr].[t_employee_profile](
    [id] [int] IDENTITY(1,1) NOT NULL,
    [emp_id] [varchar](50) NOT NULL,
    [emp_salutation] [varchar](10) NULL,
    [emp_first_name] [varchar](250) NOT NULL,
    [emp_middle_name] [varchar](250) NOT NULL,
    [emp_last_name] [varchar](250) NOT NULL,
    [emp_gender] [char](1) NOT NULL,
    [emp_dob] [datetime] NOT NULL,
    [emp_email] [varchar](100) NOT NULL,
    [emp_uan] [int] NULL,
    [emp_mobile_no] [int] NULL,
    [emp_doj] [date] NULL,
    [emp_status] [bit] NULL,
    [emp_blood_group] [varchar](20) NOT NULL,
    [emp_marital_status] [varchar](20) NOT NULL,
    [emp_linkedin_url] [varchar](300) NOT NULL,
    [emp_emergency_contact_name] [varchar](100) NOT NULL,
    [emp_contact_no] [varchar](15) NOT NULL,
    [emp_created_by] [int] NOT NULL,
    [emp_created_date] [datetime] NULL,
    [emp_last_modified_by] [int] NULL,
    [emp_last_modified_date] [datetime] NULL,
    [emp_uid] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
    [emp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_account_details_info_id] ON [dbo].[t_emp_account_details_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
SET ANSI_PADDING ON
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_basic_info_employee_id] ON [dbo].[t_emp_basic_info]
(
    [employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_documents_upload_info_id] ON [dbo].[t_emp_documents_upload_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_education_details_info_id] ON [dbo].[t_emp_education_details_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_insurance_details_info_id] ON [dbo].[t_emp_insurance_details_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_job_details_info_id] ON [dbo].[t_emp_job_details_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_login_details_info_id] ON [dbo].[t_emp_login_details_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_emp_work_experience_info_id] ON [dbo].[t_emp_work_experience_info]
(
    [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_application_leave_typeid] ON [dbo].[t_leave_application]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_comp_off_employment_type_id] ON [dbo].[t_leave_policy_comp_off]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_lop_employment_type_id] ON [dbo].[t_leave_policy_lop]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_parental_employment_type_id] ON [dbo].[t_leave_policy_parental]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_parental_leave_typeid] ON [dbo].[t_leave_policy_parental]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_standard_employment_type_id] ON [dbo].[t_leave_policy_standard]
(
    [employment_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
CREATE NONCLUSTERED INDEX [ix_t_leave_policy_standard_leave_typeid] ON [dbo].[t_leave_policy_standard]
(
    [leave_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF)
GO
ALTER TABLE [dbo].[t_announcement] ADD  DEFAULT (original_login()) FOR [a_posted_by]
GO
ALTER TABLE [dbo].[t_announcement] ADD  DEFAULT (getdate()) FOR [a_posted_date]
GO
ALTER TABLE [dbo].[t_emp_account_details_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_account_details_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_account_details_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_account_details_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_basic_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_basic_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_basic_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_basic_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_basic_info_audit] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_contact_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_contact_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_contact_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_contact_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_education_details_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_education_details_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_education_details_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_education_details_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_job_details_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_job_details_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_job_details_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_job_details_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_login_details_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_login_details_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_login_details_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_login_details_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_salary_structure] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_salary_structure] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_salary_structure] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_salary_structure] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_emp_work_experience_info] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_emp_work_experience_info] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_emp_work_experience_info] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_emp_work_experience_info] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_error_logs] ADD  DEFAULT (getdate()) FOR [error_date]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT ((0)) FOR [clear_form]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT ((0)) FOR [submit_application]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_application] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_leave_policy_lop] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_policy_lop] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_policy_lop] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_policy_lop] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_leave_policy_parental] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_policy_parental] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_policy_parental] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_policy_parental] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_leave_policy_standard] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_policy_standard] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_policy_standard] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_policy_standard] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [dbo].[t_leave_type] ADD  DEFAULT (original_login()) FOR [created_by]
GO
ALTER TABLE [dbo].[t_leave_type] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[t_leave_type] ADD  DEFAULT (original_login()) FOR [last_modified_by]
GO
ALTER TABLE [dbo].[t_leave_type] ADD  DEFAULT (getdate()) FOR [last_modified_date]
GO
ALTER TABLE [hr].[t_employee_profile] ADD  DEFAULT (getdate()) FOR [emp_created_date]
GO
ALTER TABLE [hr].[t_employee_profile] ADD  DEFAULT (newid()) FOR [emp_uid]
GO
ALTER TABLE [dbo].[t_emp_account_details_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_account_details_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_account_details_info] CHECK CONSTRAINT [fk_emp_account_details_basic_id]
GO
ALTER TABLE [dbo].[t_emp_contact_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_contact_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_contact_info] CHECK CONSTRAINT [fk_emp_contact_basic_id]
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_documents_upload_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_documents_upload_info] CHECK CONSTRAINT [fk_emp_documents_upload_basic_id]
GO
ALTER TABLE [dbo].[t_emp_education_details_info]  WITH CHECK ADD  CONSTRAINT [fk_t_emp_education_details_info_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_education_details_info] CHECK CONSTRAINT [fk_t_emp_education_details_info_id]
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_insurance_details_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_insurance_details_info] CHECK CONSTRAINT [fk_emp_insurance_details_basic_id]
GO
ALTER TABLE [dbo].[t_emp_job_details_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_job_details_basic] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_job_details_info] CHECK CONSTRAINT [fk_emp_job_details_basic]
GO
ALTER TABLE [dbo].[t_emp_login_details_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_other_details_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_login_details_info] CHECK CONSTRAINT [fk_emp_other_details_basic_id]
GO
ALTER TABLE [dbo].[t_emp_salary_structure]  WITH CHECK ADD  CONSTRAINT [fk_salary_emp_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_salary_structure] CHECK CONSTRAINT [fk_salary_emp_id]
GO
ALTER TABLE [dbo].[t_emp_work_experience_info]  WITH CHECK ADD  CONSTRAINT [fk_emp_work_experience_basic_id] FOREIGN KEY([id])
REFERENCES [dbo].[t_emp_basic_info] ([id])
GO
ALTER TABLE [dbo].[t_emp_work_experience_info] CHECK CONSTRAINT [fk_emp_work_experience_basic_id]
GO
ALTER TABLE [dbo].[t_leave_application]  WITH CHECK ADD  CONSTRAINT [fk_t_application_leave_type_leave_typeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[t_leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[t_leave_application] CHECK CONSTRAINT [fk_t_application_leave_type_leave_typeid]
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off]  WITH CHECK ADD  CONSTRAINT [fk_comp_emp_employment_type_id] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[t_leave_management] ([employment_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_comp_off] CHECK CONSTRAINT [fk_comp_emp_employment_type_id]
GO
ALTER TABLE [dbo].[t_leave_policy_lop]  WITH CHECK ADD  CONSTRAINT [fk_lop_emp_employment_type_id] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[t_leave_management] ([employment_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_lop] CHECK CONSTRAINT [fk_lop_emp_employment_type_id]
GO
ALTER TABLE [dbo].[t_leave_policy_parental]  WITH CHECK ADD  CONSTRAINT [fk_par_emp_employment_type_id] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[t_leave_management] ([employment_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_parental] CHECK CONSTRAINT [fk_par_emp_employment_type_id]
GO
ALTER TABLE [dbo].[t_leave_policy_parental]  WITH CHECK ADD  CONSTRAINT [fk_par_leave_leave_typeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[t_leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_parental] CHECK CONSTRAINT [fk_par_leave_leave_typeid]
GO
ALTER TABLE [dbo].[t_leave_policy_standard]  WITH CHECK ADD  CONSTRAINT [fk_std_emp_employment_type_id] FOREIGN KEY([employment_type_id])
REFERENCES [dbo].[t_leave_management] ([employment_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_standard] CHECK CONSTRAINT [fk_std_emp_employment_type_id]
GO
ALTER TABLE [dbo].[t_leave_policy_standard]  WITH CHECK ADD  CONSTRAINT [fk_std_leave_leave_typeid] FOREIGN KEY([leave_type_id])
REFERENCES [dbo].[t_leave_type] ([leave_type_id])
GO
ALTER TABLE [dbo].[t_leave_policy_standard] CHECK CONSTRAINT [fk_std_leave_leave_typeid]
GO
ALTER TABLE [hr].[t_emp_address]  WITH CHECK ADD  CONSTRAINT [fk_add_emp_id] FOREIGN KEY([add_emp_id])
REFERENCES [hr].[t_employee_profile] ([emp_id])
GO
ALTER TABLE [hr].[t_emp_address] CHECK CONSTRAINT [fk_add_emp_id]
GO
ALTER TABLE [dbo].[t_leave_application]  WITH CHECK ADD  CONSTRAINT [ck_t_leave_application_dates] CHECK  (([start_date]<=[end_date]))
GO
ALTER TABLE [dbo].[t_leave_application] CHECK CONSTRAINT [ck_t_leave_application_dates]
GO
ALTER TABLE [hr].[t_employee_profile]  WITH CHECK ADD CHECK  (([emp_gender]='F' OR [emp_gender]='M'))
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
    'bcp "SELECT Employee_Id,Employee_Name,Dob,Gender,blood_group,marital_status,created_by FROM ORMS.dbo.T_Emp_Basic_Info WHERE Employee_Id = ''OR0001''" queryout "C:\JT\output.csv" -c -t, -U sa -P Admin@123 -S 192.168.5.70 -d ORMS';

    PRINT @cmd;   -- check final command

    EXEC xp_cmdshell @cmd;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE   PROCEDURE [dbo].[dummy_1]
(
    @Employee_Id varchar(20)
)
AS
BEGIN
    SET NOCOUNT ON;

   SELECT Employee_Id,Employee_Name,Dob,Gender,blood_group,marital_status,created_by,created_date FROM ORMS.dbo.T_Emp_Basic_Info 
   WHERE Employee_Id =@Employee_Id

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[export_query_to_csv]
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


CREATE PROCEDURE [dbo].[export_to_csv]
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

CREATE PROCEDURE [dbo].[run_current_bookings]
(
    @emp_id varchar(100) = 'OR0001'
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Call your existing SP
    --EXEC dbo.CurrentBookings
    --    @StartDate = @StartDate,
    --    @EndDate   = @EndDate;

  SELECT * FROM ORMS.dbo.T_Emp_Basic_Info WHERE Employee_Id = @emp_id

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

INSERT INTO  T_sch_dependency_log ( Sd_name, Sd_proc_name ,Sd_StartDate ,Sd_process_status )
VALUES ('Announcements','s_sch_Announcements',getdate(),'I')


SELECT  @IDENTITY = SCOPE_IDENTITY() 
 
Update T_Announcement
SET A_Status = 3
WHERE A_ExpireOn <=getdate() AND A_Status =1
 


Delete FROM T_Announcement WHERE A_Status =3 AND datediff(day,A_posted_date,getdate()) >90
 


UPDATE T_sch_dependency_log 
SET Sd_process_status = 'C',
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
CREATE   PROCEDURE [dbo].[sp_date_periods_complete]
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
    IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = 'date_periods')
    BEGIN
        CREATE TABLE dbo.date_periods
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
        DELETE FROM dbo.date_periods;

        INSERT INTO dbo.date_periods
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

        SELECT 'date_periods populated successfully. Rows inserted: ' 
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
        FROM dbo.date_periods
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
EXEC dbo.export_query_to_csv
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

CREATE PROCEDURE [dbo].[sp_get_announcements]
AS
BEGIN
    SET NOCOUNT ON


    BEGIN 
        SELECT  Title,
                Description,
                ExpireOn,
                Priority,
                posted_by,
                posted_date,
                Last_modified_date,
                Last_modified_by
        FROM  T_Announcement  
        WHERE   posted_date >= DATEADD(MONTH,-3,GETDATE()) AND Status = 3
   END 

   BEGIN 
   SELECT  Title,
                Description,
                ExpireOn,
                Priority,
                posted_by,
                posted_date,
                Last_modified_date,
                Last_modified_by
        FROM  T_Announcement  
        WHERE    Status = 1
   END

END 

 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_get_announcements_by_date_range]
AS
BEGIN
    SET NOCOUNT ON

    BEGIN 
        SELECT  A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_posted_by,
                A_posted_date,
                A_Last_modified_date,
                A_Last_modified_by
        FROM  T_Announcement  
        WHERE   A_posted_date >= DATEADD(MONTH,-3,GETDATE()) AND A_Status = 3
   END 

   BEGIN 
   SELECT       A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_posted_by,
                A_posted_date,
                A_Last_modified_date,
                A_Last_modified_by
        FROM  T_Announcement  
        WHERE    A_Status = 1
   END

END 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_announcements_deletion] 
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

CREATE PROCEDURE [dbo].[usp_get_announcements_by_date_range]
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
                A_posted_by,
                A_posted_date,
                A_Last_modified_date,
                A_Last_modified_by
        FROM  T_Announcement  
        WHERE   A_posted_date >= DATEADD(MONTH,-3,GETDATE()) AND A_Status = 3
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
                A_posted_by,
                A_posted_date,
                A_Last_modified_date,
                A_Last_modified_by
        FROM  T_Announcement  
        WHERE    A_Status = 1
   END

END 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_get_employee_full_details]
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
        LEFT JOIN T_Emp_job_details_Info       j  WITH(nolock) ON j.ID = b.ID
        LEFT JOIN T_Emp_education_details_Info e WITH(nolock) ON e.ID = b.ID
        LEFT JOIN T_Emp_work_experience_Info   w WITH(nolock) ON w.ID = b.ID
        LEFT JOIN T_Emp_account_details_Info   a WITH(nolock) ON a.ID = b.ID
        LEFT JOIN T_Emp_documents_upload_Info  d WITH(nolock) ON d.ID = b.ID
        LEFT JOIN T_Emp_login_details_Info     o WITH(nolock) ON o.ID = b.ID
        LEFT JOIN t_emp_insurance_details_info i WITH(nolock) ON i.ID = b.ID
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
CREATE   PROCEDURE [dbo].[usp_get_leave_approval_report]
(
    @leave_typeID int = NULL
)
AS
BEGIN
    SET NOCOUNT ON

    SELECT
        LA.leave_applicationID,

        LA.leave_typeID,
        LT.leave_typeName AS leave_type,

        LA.StartDate,
        LA.EndDate,

        -- Number of leave days (AS shown in UI)
        DATEDIFF(DAY, LA.StartDate, LA.EndDate) + 1 AS LeaveDays,

        LA.ReasonForLeave,

        LA.created_date AS AppliedOn,

        -- UI action flags
        LA.ClearForm,
        LA.SubmitApplication

    FROM T_leave_application LA WITH(nolock)
    INNER JOIN T_leave_type LT WITH(nolock)
        ON LA.leave_typeID = LT.leave_typeID

    WHERE
        (@leave_typeID IS NULL OR LA.leave_typeID = @leave_typeID)

    ORDER BY LA.created_date DESC;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[usp_get_validate_login_details]
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
    [password] ,
    Role ,
    edc.EmpPhoto
FROM  T_Emp_login_details_Info elo WITH(nolock) 
INNER JOIN 
T_Emp_documents_upload_Info edc WITH(nolock)  ON elo.Id = edc.Id
WHERE 
 UserName  = @UserName 
AND 
[password] = @Password 
    
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
    @P_Org_id              int = NULL,
    @P_Status             int = NULL,
    @P_Department      varchar(100),
    @P_TargetAudience  varchar(150),
    @P_Category      varchar(100),
    @P_posted_by           varchar(200) = NULL,
    @P_Last_modified_by     varchar(200) = NULL
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
            IF @P_posted_by IS NULL SET @P_posted_by = ORIGINAL_LOGIN();
            IF @P_Status   IS NULL SET @P_Status = 1;

            INSERT INTO T_Announcement
            (
                A_Title,
                A_Description,
                A_ExpireOn,
                A_Priority,
                A_Status,
                A_Org_id,
                A_Department ,
                A_TargetAudience ,
                A_Category ,
                A_posted_by,
                A_posted_date
            )
            VALUES
            (
                @P_Title,
                @P_Description,
                @P_ExpireOn,
                @P_Priority,
                @P_Status,
                @P_Org_id,
                @P_Department      ,
                @P_TargetAudience  ,
                @P_Category ,
                @P_posted_by,
                GETDATE()
            );
        END

        /* ========================
           UPDATE
        ========================= */
        IF UPPER(@P_OperationType) = 'UPD'
        BEGIN
            IF @P_Last_modified_by IS NULL SET @P_Last_modified_by = ORIGINAL_LOGIN()

            UPDATE T_Announcement
            SET
                A_Title            = @P_Title,
                A_Description      = @P_Description,
                A_ExpireOn         = @P_ExpireOn,
                A_Priority         = @P_Priority,
                A_Status           = ISNULL(@P_Status, A_Status),
                A_Org_id            = @P_Org_id,
                A_Department       = @P_Department,
                A_TargetAudience   = @P_TargetAudience,
                A_Category         =  @P_Category,
                A_Last_modified_date = GETDATE(),
                A_Last_modified_by   = @P_Last_modified_by
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_account_details]
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
            INSERT INTO T_Emp_account_details_Info
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
            UPDATE T_Emp_account_details_Info
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
    @blood_group         varchar(20),
    @marital_status      varchar(20),
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
                blood_group,
                marital_status
            )
            VALUES
            (
                @Employee_Id,
                @Employee_Name,
                @Dob,
                @Gender,
                @blood_group,
                @marital_status
               
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
                blood_group         = @blood_group,
                marital_status      = @marital_status
               
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
    @linkedin_url            varchar(300),
    @contact_no              varchar(15),
    @PermanentAddress       varchar(500),
    @PresentAddress         varchar(500),

    @emergency_contact_name1  varchar(100),
    @contact_no1             varchar(15),
    @Relation1              varchar(200),

    @contact_no2             varchar(15),
    @Relation2              varchar(200),

    @contact_no3             varchar(15) = NULL,
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
                linkedin_url,
                contact_no,
                PermanentAddress,
                PresentAddress,
                emergency_contact_name1,
                contact_no1,
                Relation1,
                contact_no2,
                Relation2,
                contact_no3,
                Relation3,
                ID
              
            )
            VALUES
            (
                @PersonalMail,
                @linkedin_url,
                @contact_no,
                @PermanentAddress,
                @PresentAddress,
                @emergency_contact_name1,
                @contact_no1,
                @Relation1,
                @contact_no2,
                @Relation2,
                @contact_no3,
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
                linkedin_url            = @linkedin_url,
                contact_no              = @contact_no,
                PermanentAddress       = @PermanentAddress,
                PresentAddress         = @PresentAddress,
                emergency_contact_name1  = @emergency_contact_name1,
                contact_no1             = @contact_no1,
                Relation1              = @Relation1,
                contact_no2             = @contact_no2,
                Relation2              = @Relation2,
                contact_no3             = @contact_no3,
                Relation3              = @Relation3,
              --  Last_modified_by            =@Last_modified_by,
                Last_modified_date           = GETDATE()
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_documents_upload]
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
            INSERT INTO T_Emp_documents_upload_Info
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
            UPDATE T_Emp_documents_upload_Info
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_education_details_info]
(
    @OperationType          varchar(10),   -- INS / UPD

    @ID            int,
    @HighestQualification   varchar(100),
    @Specialization         varchar(200),
    @YearOfPassing          datetime,
    @university_clg_name     varchar(100),
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
            INSERT INTO T_Emp_education_details_Info
            (
                ID,
                HighestQualification,
                Specialization,
                YearOfPassing,
                [university_clg_name],
                Certificates

            )
            VALUES
            (
                @ID,
                @HighestQualification,
                @Specialization,
                @YearOfPassing,
                @university_clg_name,
                @Certificates
             
            )

            PRINT 'EMPLOYEE EDUCATION DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_education_details_Info
            SET
                HighestQualification = @HighestQualification,
                Specialization       = @Specialization,
                YearOfPassing        = @YearOfPassing,
                [university_clg_name] = @university_clg_name,
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_insurance_details]
(
    @OperationType        varchar(10), -- INS / UPD

    @ID          int,
     @E_INS_ID   int = NULL,

    -- Father
    @FatherName           varchar(100),
    @Fatheraadhar          varbinary(MAX),
    @FatherPan            varbinary(MAX),
    @FatherDOB            datetime,
    @FatherOccupation     varchar(100),

    -- Mother
    @MotherName           varchar(100),
    @Motheraadhar          varbinary(MAX),
    @MotherPan            varbinary(MAX),
    @MotherDOB            datetime,
    @MotherOccupation     varchar(100),

    -- Spouse
    @SpouseName           varchar(100) = NULL,
    @Spouseaadhar          varbinary(MAX) = NULL,
    @SpousePan            varbinary(MAX) = NULL,
    @SpouseDOB            datetime = NULL,
    @SpouseOccupation     varchar(100) = NULL,

    -- Children
    @Child1Name           varchar(100) = NULL,
    @Child1aadhar          varbinary(MAX) = NULL,
    @Child2Name           varchar(100) = NULL,
    @Child2aadhar          varbinary(MAX) = NULL

 
)
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY
        BEGIN TRANSACTION

        /* ========== INSERT ========== */
        IF @OperationType = 'INS'
        BEGIN
            INSERT INTO t_emp_insurance_details_info
            (
                ID,
                FatherName,
                Fatheraadhar,
                FatherPan,
                FatherDOB,
                FatherOccupation,
                MotherName,
                Motheraadhar,
                MotherPan,
                MotherDOB,
                MotherOccupation,
                SpouseName,
                Spouseaadhar,
                SpousePan,
                SpouseDOB,
                SpouseOccupation,
                Child1Name,
                Child1aadhar,
                Child2Name,
                Child2aadhar
          
            )
            VALUES
            (
                @ID,
                @FatherName,
                @Fatheraadhar,
                @FatherPan,
                @FatherDOB,
                @FatherOccupation,
                @MotherName,
                @Motheraadhar,
                @MotherPan,
                @MotherDOB,
                @MotherOccupation,
                @SpouseName,
                @Spouseaadhar,
                @SpousePan,
                @SpouseDOB,
                @SpouseOccupation,
                @Child1Name,
                @Child1aadhar,
                @Child2Name,
                @Child2aadhar
                
            )

            PRINT 'EMPLOYEE INSURANCE DETAILS INSERTED SUCCESSFULLY'
        END

        /* ========== UPDATE ========== */
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE t_emp_insurance_details_info
            SET
                FatherName       = @FatherName,
                Fatheraadhar      = @Fatheraadhar,
                FatherPan        = @FatherPan,
                FatherDOB        = @FatherDOB,
                FatherOccupation = @FatherOccupation,
                MotherName       = @MotherName,
                Motheraadhar      = @Motheraadhar,
                MotherPan        = @MotherPan,
                MotherDOB        = @MotherDOB,
                MotherOccupation = @MotherOccupation,
                SpouseName       = @SpouseName,
                Spouseaadhar      = @Spouseaadhar,
                SpousePan        = @SpousePan,
                SpouseDOB        = @SpouseDOB,
                SpouseOccupation = @SpouseOccupation,
                Child1Name       = @Child1Name,
                Child1aadhar      = @Child1aadhar,
                Child2Name       = @Child2Name,
                Child2aadhar      = @Child2aadhar
               
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_job_details]
(
    @OperationType           varchar(10),   -- INS / UPD

    @ID             int,
    @OfficeEmail             varchar(50),
    @Department              varchar(50),
    @CurrentDesg             varchar(50),
    @EmploymentType          varchar(50),
    @pay_level_Grade          varchar(20),
    @ReportingManager        varchar(50),
    @work_location_Branch     varchar(200),
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
            INSERT INTO T_Emp_job_details_Info
            (
                ID,
                OfficeEmail,
                Department,
                CurrentDesg,
                EmploymentType,
                [pay_level_grade],
                ReportingManager,
                [work_location_branch],
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
                @pay_level_Grade,
                @ReportingManager,
                @work_location_Branch,
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
            UPDATE T_Emp_job_details_Info
            SET
                OfficeEmail               = @OfficeEmail,
                Department                = @Department,
                CurrentDesg               = @CurrentDesg,
                EmploymentType            = @EmploymentType,
                [pay_level_grade]        = @pay_level_Grade,
                ReportingManager          = @ReportingManager,
                [work_location_branch]   = @work_location_Branch,
                ShiftTiming               = @ShiftTiming,
                CasualLeaves              = @CasualLeaves,
                EarnedLeaves              = @EarnedLeaves,
                OptionalLeaves            = @OptionalLeaves,
                --Last_modified_by               = @Last_modified_by,
                Last_modified_date              = GETDATE()
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_other_details]
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
            INSERT INTO T_Emp_login_details_Info
            (
                ID,
                UserName,
                [password],
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
            UPDATE T_Emp_login_details_Info
            SET
                UserName     = @UserName,
                [password]   = @Password,
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
CREATE   PROCEDURE [dbo].[usp_ins_upd_emp_salary_structure]
(
    @OperationType char(10),  -- INS = INSERT, UPD = Update
    @salary_id int = NULL,

    @ID int,

    -- Earnings
    @Gross_Monthly decimal(10,2),
    @Gross_Annual decimal(12,2),

    @Basic_Monthly decimal(10,2),
    @Basic_Annual decimal(12,2),

    @HRA_Monthly decimal(10,2),
    @HRA_Annual decimal(12,2),

    @food_allowance_Monthly decimal(10,2),
    @food_allowance_Annual decimal(12,2),

    @special_allowance_Monthly decimal(10,2),
    @special_allowance_Annual decimal(12,2),

    @gross_salary_Monthly decimal(10,2),
    @gross_salary_Annual decimal(12,2),

    -- Employer Contributions
    @ER_PF_Monthly decimal(10,2),
    @ER_PF_Annual decimal(12,2),

    @ER_ESI_Monthly decimal(10,2),
    @ER_ESI_Annual decimal(12,2),

    @joining_bonus_Annual decimal(12,2) = NULL,

    @CTC_Monthly decimal(10,2),
    @CTC_Annual decimal(12,2),

    -- Deductions
    @EPF_Monthly decimal(10,2),
    @EPF_Annual decimal(12,2),

    @TDS_Monthly decimal(10,2),
    @TDS_Annual decimal(12,2),

    @PT_Monthly decimal(10,2),
    @PT_Annual decimal(12,2),

    @total_deductions_Monthly decimal(10,2),
    @total_deductions_Annual decimal(12,2),

    -- Net Pay
    @net_pay_Monthly decimal(10,2),
    @net_pay_Annual decimal(12,2),
    @net_pay_first_month decimal(10,2)

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
            INSERT INTO T_Emp_salary_structure
            (
                ID,
                Gross_Monthly, Gross_Annual,
                Basic_Monthly, Basic_Annual,
                HRA_Monthly, HRA_Annual,
                food_allowance_Monthly, food_allowance_Annual,
                special_allowance_Monthly, special_allowance_Annual,
                gross_salary_Monthly, gross_salary_Annual,
                ER_PF_Monthly, ER_PF_Annual,
                ER_ESI_Monthly, ER_ESI_Annual,
                joining_bonus_Annual,
                CTC_Monthly, CTC_Annual,
                EPF_Monthly, EPF_Annual,
                TDS_Monthly, TDS_Annual,
                PT_Monthly, PT_Annual,
                total_deductions_Monthly, total_deductions_Annual,
                net_pay_Monthly, net_pay_Annual,
                net_pay_first_month
                
            )
            VALUES
            (
                @ID,
                @Gross_Monthly, @Gross_Annual,
                @Basic_Monthly, @Basic_Annual,
                @HRA_Monthly, @HRA_Annual,
                @food_allowance_Monthly, @food_allowance_Annual,
                @special_allowance_Monthly, @special_allowance_Annual,
                @gross_salary_Monthly, @gross_salary_Annual,
                @ER_PF_Monthly, @ER_PF_Annual,
                @ER_ESI_Monthly, @ER_ESI_Annual,
                @joining_bonus_Annual,
                @CTC_Monthly, @CTC_Annual,
                @EPF_Monthly, @EPF_Annual,
                @TDS_Monthly, @TDS_Annual,
                @PT_Monthly, @PT_Annual,
                @total_deductions_Monthly, @total_deductions_Annual,
                @net_pay_Monthly, @net_pay_Annual,
                @net_pay_first_month
                
            )
        END

        -- UPDATE
        IF @OperationType = 'UPD'
        BEGIN
            UPDATE T_Emp_salary_structure
            SET
                Gross_Monthly = @Gross_Monthly,
                Gross_Annual = @Gross_Annual,
                Basic_Monthly = @Basic_Monthly,
                Basic_Annual = @Basic_Annual,
                HRA_Monthly = @HRA_Monthly,
                HRA_Annual = @HRA_Annual,
                food_allowance_Monthly = @food_allowance_Monthly,
                food_allowance_Annual = @food_allowance_Annual,
                special_allowance_Monthly = @special_allowance_Monthly,
                special_allowance_Annual = @special_allowance_Annual,
                gross_salary_Monthly = @gross_salary_Monthly,
                gross_salary_Annual = @gross_salary_Annual,
                ER_PF_Monthly = @ER_PF_Monthly,
                ER_PF_Annual = @ER_PF_Annual,
                ER_ESI_Monthly = @ER_ESI_Monthly,
                ER_ESI_Annual = @ER_ESI_Annual,
                joining_bonus_Annual = @joining_bonus_Annual,
                CTC_Monthly = @CTC_Monthly,
                CTC_Annual = @CTC_Annual,
                EPF_Monthly = @EPF_Monthly,
                EPF_Annual = @EPF_Annual,
                TDS_Monthly = @TDS_Monthly,
                TDS_Annual = @TDS_Annual,
                PT_Monthly = @PT_Monthly,
                PT_Annual = @PT_Annual,
                total_deductions_Monthly = @total_deductions_Monthly,
                total_deductions_Annual = @total_deductions_Annual,
                net_pay_Monthly = @net_pay_Monthly,
                net_pay_Annual = @net_pay_Annual,
                net_pay_first_month = @net_pay_first_month
                
            WHERE salary_id = @salary_id
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

CREATE PROCEDURE [dbo].[usp_ins_upd_emp_work_experience]
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
            INSERT INTO T_Emp_work_experience_Info
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
            UPDATE T_Emp_work_experience_Info
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

CREATE PROCEDURE [dbo].[usp_ins_upd_leave_application]
(
    @OperationType        varchar(10),   -- INS / UPD
    @leave_applicationID   int = NULL,     -- Required only for UPDATE

    @leave_typeID          int,
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
            INSERT INTO T_leave_application
            (
                leave_typeID,
                StartDate,
                EndDate,
                ReasonForLeave,
                ClearForm,
                SubmitApplication
              
            )
            VALUES
            (
                @leave_typeID,
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
            UPDATE T_leave_application
            SET
                leave_typeID = @leave_typeID,
                StartDate = @StartDate,
                EndDate = @EndDate,
                ReasonForLeave = @ReasonForLeave,
                ClearForm = @ClearForm,
                SubmitApplication = @SubmitApplication
               
            WHERE leave_applicationID = @leave_applicationID;
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

CREATE PROCEDURE [dbo].[usp_ins_upd_leave_management]
(
    @OperationType       varchar(10),     -- INS / UPD
    @employment_type_id    int = NULL,      -- Used only for UPDATE
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
            INSERT INTO T_leave_management
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
            UPDATE T_leave_management
            SET EmploymentType = @EmploymentType
            WHERE employment_type_id = @employment_type_id
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

CREATE PROCEDURE [dbo].[usp_ins_upd_leave_policy]
(
    @OperationType varchar(10),   -- INS / UPD
    @PolicyID int = NULL,         -- Required ONLY for UPDATE

    @employment_type_id int,
    @leave_typeID int,

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
        FROM T_leave_type
        WHERE leave_typeID = @leave_typeID


        /* ================= INSERT ================= */
        IF @OperationType = 'INS'
        BEGIN
            IF @LeaveCategory = 'Standard'
                INSERT INTO  T_leave_policy_Standard
                (
                    employment_type_id, leave_typeID,
                    AnnualAllowance, CarryForwardAllowed,
                    EncashmentAllowed, AccrualMethod
                    
                )
                VALUES
                (
                    @employment_type_id, @leave_typeID,
                    @AnnualAllowance, @CarryForwardAllowed,
                    @EncashmentAllowed, @AccrualMethod
                    
                )

            IF @LeaveCategory = 'Parental'
                INSERT INTO T_leave_policy_Parental
                (
                    employment_type_id, leave_typeID,
                    TotalDurationDays, PaidDurationDays,
                    ExtensionAllowed, MustBeTakenWithin,
                    AdditionalNotes
                )
                VALUES
                (
                    @employment_type_id, @leave_typeID,
                    @TotalDurationDays, @PaidDurationDays,
                    @ExtensionAllowed, @MustBeTakenWithin,
                    @AdditionalNotes
                )

            IF @LeaveCategory = 'CompOff'
                INSERT INTO T_leave_policy_comp_off
                (
                    employment_type_id, EnableCompOff,
                    ExpiryPeriodDays, MaxAccrualLimit
                   
                )
                VALUES
                (
                    @employment_type_id, @EnableCompOff,
                    @ExpiryPeriodDays, @MaxAccrualLimit
                   
                )

            IF @LeaveCategory = 'LOP'
                INSERT INTO T_leave_policy_LOP
                (
                    employment_type_id, AllowUnpaidLeave,
                    MaxConsecutiveDays, ApprovalRequired
                   
                )
                VALUES
                (
                    @employment_type_id, @AllowUnpaidLeave,
                    @MaxConsecutiveDays, @ApprovalRequired
                    
                )
        END

        /* ================= UPDATE ================= */
        IF @OperationType = 'UPD'
        BEGIN
            IF @LeaveCategory = 'Standard'
                UPDATE T_leave_policy_Standard
                SET
                    AnnualAllowance = @AnnualAllowance,
                    CarryForwardAllowed = @CarryForwardAllowed,
                    EncashmentAllowed = @EncashmentAllowed,
                    AccrualMethod = @AccrualMethod
                  
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'Parental'
                UPDATE T_leave_policy_Parental
                SET
                    TotalDurationDays = @TotalDurationDays,
                    PaidDurationDays = @PaidDurationDays,
                    ExtensionAllowed = @ExtensionAllowed,
                    MustBeTakenWithin = @MustBeTakenWithin,
                    AdditionalNotes = @AdditionalNotes   
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'CompOff'
                UPDATE T_leave_policy_comp_off
                SET
                    EnableCompOff = @EnableCompOff,
                    ExpiryPeriodDays = @ExpiryPeriodDays,
                    MaxAccrualLimit = @MaxAccrualLimit
                   
                WHERE PolicyID = @PolicyID

            IF @LeaveCategory = 'LOP'
                UPDATE T_leave_policy_LOP
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

INSERT INTO  T_sch_dependency_log ( Sd_name, Sd_proc_name ,Sd_StartDate ,Sd_process_status )
VALUES ('Announcements','s_sch_Announcements',getdate(),'I')


SELECT  @P_IDENTITY = SCOPE_IDENTITY() 
 
Update T_Announcement
SET A_Status = 3
WHERE A_ExpireOn <=getdate() AND A_Status =1
 


Delete FROM T_Announcement WHERE A_Status =3 AND datediff(day,A_posted_date,getdate()) >90
 


UPDATE T_sch_dependency_log 
SET Sd_process_status = 'C',
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
ON [dbo].[t_emp_basic_info]
AFTER UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON

    INSERT INTO T_Emp_Basic_Info_Audit
    (
        audit_id,
        Employee_Id,

        Old_Employee_Name,
        Old_Dob,
        Old_Gender,
        old_blood_group,
        old_marital_status,

        New_Employee_Name,
        New_Dob,
        New_Gender,
        new_blood_group,
        new_marital_status,

        last_modified_by,
        last_modified_date
    )
    SELECT
        d.Id,
        d.Employee_Id,

        d.Employee_Name,
        d.Dob,
        d.Gender,
        d.blood_group,
        d.marital_status,

        i.Employee_Name,
        i.Dob,
        i.Gender,
        i.blood_group,
        i.marital_status,

        SUSER_SNAME(),
        GETDATE()
    FROM deleted d
    LEFT JOIN inserted i
        ON d.Id = i.Id
END
GO
ALTER TABLE [dbo].[t_emp_basic_info] ENABLE TRIGGER [trg_t_emp_basic_info_audit]
GO
