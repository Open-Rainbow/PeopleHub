import { Routes } from '@angular/router';

const addEmployeeSectionRoutes = [
  'personal-info',
  'contact-info',
  'family-details',
  'job-details',
  'education-details',
  'skills',
  'salary-structure',
  'identity-statutory',
  'work-experience',
  'insurance-details',
  'documents-upload',
  'temp-login-credentials',
  'separation',
  'assets',
  'custom-fields-additional',
  'change-requests-audit',
];

const legacyAddEmployeeRedirectRoutes: Routes = addEmployeeSectionRoutes.map(
  (stepRoute) => ({
    path: stepRoute,
    redirectTo: `add-employee/${stepRoute}`,
    pathMatch: 'full',
  }),
);

const addEmployeeChildRoutes: Routes = [
  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
  {
    path: 'personal-info',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/personal-info/personal-info.component').then(
        (m) => m.PersonalInfoComponent,
      ),
  },
  {
    path: 'contact-info',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/contact-info/contact-info.component').then(
        (m) => m.ContactInfoComponent,
      ),
  },
  {
    path: 'family-details',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/family-details/family-details.component').then(
        (m) => m.FamilyDetailsComponent,
      ),
  },
  {
    path: 'job-details',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent,
      ),
  },
  {
    path: 'education-details',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/education-details/education-details.component').then(
        (m) => m.EducationDetailsComponent,
      ),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/skills/skills.component').then(
        (m) => m.SkillsComponent,
      ),
  },
  {
    path: 'salary-structure',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/salary-structure/salary-structure.component').then(
        (m) => m.SalaryStructureComponent,
      ),
  },
  {
    path: 'identity-statutory',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/identity-statutory/identity-statutory.component').then(
        (m) => m.IdentityStatutoryComponent,
      ),
  },
  {
    path: 'work-experience',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/work-experience/work-experience.component').then(
        (m) => m.WorkExperienceComponent,
      ),
  },
  {
    path: 'insurance-details',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/insurance-details/insurance-details.component').then(
        (m) => m.InsuranceDetailsComponent,
      ),
  },
  {
    path: 'documents-upload',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/documents-upload/documents-upload.component').then(
        (m) => m.DocumentsUploadComponent,
      ),
  },
  {
    path: 'temp-login-credentials',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/temp-login-credentials/temp-login-credentials.component').then(
        (m) => m.TempLoginCredentialsComponent,
      ),
  },
  {
    path: 'separation',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/separation/separation.component').then(
        (m) => m.SeparationComponent,
      ),
  },
  {
    path: 'assets',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/assets/assets.component').then(
        (m) => m.AssetsComponent,
      ),
  },
  {
    path: 'custom-fields-additional',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/custom-fields-additional/custom-fields-additional.component').then(
        (m) => m.CustomFieldsAdditionalComponent,
      ),
  },
  {
    path: 'change-requests-audit',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/change-requests-audit/change-requests-audit.component').then(
        (m) => m.ChangeRequestsAuditComponent,
      ),
  },
  { path: '**', redirectTo: 'personal-info' },
];

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../../libs/shared/auth/src/lib/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'announcements',
        loadComponent: () =>
          import('../../libs/modules/announcements/src/lib/components/announcements/announcements.component').then(
            (m) => m.AnnouncementsComponent,
          ),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            (m) => m.ApplyLeaveComponent,
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            (m) => m.RecentPayslipsComponent,
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            (m) => m.AttendanceComponent,
          ),
      },
      {
        path: 'holiday-calender',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/holiday-list/holiday-list.component').then(
            (m) => m.HolidayListComponent,
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            (m) => m.OrgChartComponent,
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            (m) => m.OthersComponent,
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            (m) => m.EmployeeOverviewComponent,
          ),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent,
          ),
        children: addEmployeeChildRoutes,
      },
      ...legacyAddEmployeeRedirectRoutes,
    ],
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
    children: addEmployeeChildRoutes,
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'AddEditAnnouncement',
        loadComponent: () =>
          import(
            '../../libs/modules/announcements/src/lib/components/add-announcement/add-announcement.component'
          ).then((m) => m.AddAnnouncementComponent),
      },
      {
        path: 'announcements',
        loadComponent: () =>
          import(
            '../../libs/modules/announcements/src/lib/components/announcements/announcements.component'
          ).then((m) => m.AnnouncementsComponent),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            (m) => m.ApplyLeaveComponent,
          ),
      },
      {
        path: 'leave-approval',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-approval/leave-approval.component').then(
            (m) => m.LeaveApprovalComponent,
          ),
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-management/leave-management.component').then(
            (m) => m.LeaveManagementComponent,
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            (m) => m.RecentPayslipsComponent,
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            (m) => m.AttendanceComponent,
          ),
      },
      {
        path: 'holidayList',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/add-holiday-list/add-holiday-list.component').then(
            (m) => m.AddHolidayListComponent,
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            (m) => m.OrgChartComponent,
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            (m) => m.OthersComponent,
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            (m) => m.EmployeeOverviewComponent,
          ),
      },
      {
        path: 'view-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-list/employee-list.component').then(
            (m) => m.EmployeeListComponent,
          ),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent,
          ),
        children: addEmployeeChildRoutes,
      },
      ...legacyAddEmployeeRedirectRoutes,
      {
        path: 'offer-letter',
        loadComponent: () =>
          import('../../libs/modules/documents/src/lib/components/offer-letter/offer-letter.component').then(
            (m) => m.OfferLetterComponent,
          ),
      },
    ],
  },
  {
    path: 'hr',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'AddEditAnnouncement',
        loadComponent: () =>
          import(
            '../../libs/modules/announcements/src/lib/components/add-announcement/add-announcement.component'
          ).then((m) => m.AddAnnouncementComponent),
      },
      {
        path: 'announcements',
        loadComponent: () =>
          import(
            '../../libs/modules/announcements/src/lib/components/announcements/announcements.component'
          ).then((m) => m.AnnouncementsComponent),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            (m) => m.ApplyLeaveComponent,
          ),
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-management/leave-management.component').then(
            (m) => m.LeaveManagementComponent,
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            (m) => m.RecentPayslipsComponent,
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            (m) => m.AttendanceComponent,
          ),
      },
      {
        path: 'holidayList',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/add-holiday-list/add-holiday-list.component').then(
            (m) => m.AddHolidayListComponent,
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            (m) => m.OrgChartComponent,
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            (m) => m.OthersComponent,
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            (m) => m.EmployeeOverviewComponent,
          ),
      },
      {
        path: 'view-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-list/employee-list.component').then(
            (m) => m.EmployeeListComponent,
          ),
      },
      {
        path: 'add-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
            (m) => m.AddEmployeeComponent,
          ),
        children: addEmployeeChildRoutes,
      },
      ...legacyAddEmployeeRedirectRoutes,
      {
        path: 'offer-letter',
        loadComponent: () =>
          import('../../libs/modules/documents/src/lib/components/offer-letter/offer-letter.component').then(
            (m) => m.OfferLetterComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
