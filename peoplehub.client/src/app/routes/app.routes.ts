import { Route, Routes } from '@angular/router';
import { pageAccessGuard } from 'common';

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
    path: 'change-requests-audit',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/change-requests-audit/change-requests-audit.component').then(
        (m) => m.ChangeRequestsAuditComponent,
      ),
  },
  { path: '**', redirectTo: 'personal-info' },
];

// ---- Pages (shared by the role shells; the Setup page decides who may open them) -------------

const dashboardRoute: Route = {
  path: 'dashboard',
  loadComponent: () =>
    import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
      (m) => m.DashboardComponent,
    ),
};

const announcementsRoute: Route = {
  path: 'announcements',
  loadComponent: () =>
    import('../../libs/modules/announcements/src/lib/components/announcements/announcements.component').then(
      (m) => m.AnnouncementsComponent,
    ),
};

const addAnnouncementRoute: Route = {
  path: 'AddEditAnnouncement',
  loadComponent: () =>
    import('../../libs/modules/announcements/src/lib/components/add-announcement/add-announcement.component').then(
      (m) => m.AddAnnouncementComponent,
    ),
};

const applyLeaveRoute: Route = {
  path: 'apply-leave',
  loadComponent: () =>
    import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
      (m) => m.ApplyLeaveComponent,
    ),
};

const leaveApprovalRoute: Route = {
  path: 'leave-approval',
  loadComponent: () =>
    import('../../libs/modules/leave/src/lib/components/leave-approval/leave-approval.component').then(
      (m) => m.LeaveApprovalComponent,
    ),
};

const leaveManagementRoute: Route = {
  path: 'leave-management',
  loadComponent: () =>
    import('../../libs/modules/leave/src/lib/components/leave-management/leave-management.component').then(
      (m) => m.LeaveManagementComponent,
    ),
};

const payslipsRoute: Route = {
  path: 'payslips',
  loadComponent: () =>
    import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
      (m) => m.RecentPayslipsComponent,
    ),
};

const attendanceRoute: Route = {
  path: 'attendance',
  loadComponent: () =>
    import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
      (m) => m.AttendanceComponent,
    ),
};

const holidayCalendarRoute: Route = {
  path: 'holiday-calender',
  loadComponent: () =>
    import('../../libs/modules/holidays/src/lib/components/holiday-list/holiday-list.component').then(
      (m) => m.HolidayListComponent,
    ),
};

const holidayManageRoute: Route = {
  path: 'holidayList',
  loadComponent: () =>
    import('../../libs/modules/holidays/src/lib/components/add-holiday-list/add-holiday-list.component').then(
      (m) => m.AddHolidayListComponent,
    ),
};

const orgChartRoute: Route = {
  path: 'org-chart',
  loadComponent: () =>
    import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
      (m) => m.OrgChartComponent,
    ),
};

/** Company policies: everyone reads; admin / HR / super-admin also manage (decided from the URL). */
const policiesRoute: Route = {
  path: 'policies',
  loadComponent: () =>
    import('../../libs/modules/documents/src/lib/components/policies/policies.component').then(
      (m) => m.PoliciesComponent,
    ),
};

const othersRoute: Route = {
  path: 'others',
  loadComponent: () =>
    import('../../libs/modules/employees/src/lib/components/others/others.component').then(
      (m) => m.OthersComponent,
    ),
};

const profileRoute: Route = {
  path: 'showProfile',
  loadComponent: () =>
    import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
      (m) => m.EmployeeOverviewComponent,
    ),
};

const viewEmployeeRoute: Route = {
  path: 'view-employee',
  loadComponent: () =>
    import('../../libs/modules/employees/src/lib/components/employee-list/employee-list.component').then(
      (m) => m.EmployeeListComponent,
    ),
};

const addEmployeeRoute: Route = {
  path: 'add-employee',
  loadComponent: () =>
    import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
      (m) => m.AddEmployeeComponent,
    ),
  children: addEmployeeChildRoutes,
};

const offerLetterRoute: Route = {
  path: 'offer-letter',
  loadComponent: () =>
    import('../../libs/modules/documents/src/lib/components/offer-letter/offer-letter.component').then(
      (m) => m.OfferLetterComponent,
    ),
};

/** Roles, page access and field settings (Admin / Super Admin). */
const setupRoute: Route = {
  path: 'setup',
  loadComponent: () =>
    import('../../libs/modules/settings/src/lib/components/setup/setup.component').then(
      (m) => m.SetupComponent,
    ),
};

/** A role area: layout + its pages, protected by the Setup page access. */
function roleShell(path: string, pages: Routes): Route {
  return {
    path,
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        (m) => m.LayoutComponent,
      ),
    canActivateChild: [pageAccessGuard],
    children: [{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }, ...pages],
  };
}

const managementPages: Routes = [
  dashboardRoute,
  addAnnouncementRoute,
  announcementsRoute,
  applyLeaveRoute,
  leaveApprovalRoute,
  leaveManagementRoute,
  payslipsRoute,
  attendanceRoute,
  holidayManageRoute,
  holidayCalendarRoute,
  orgChartRoute,
  policiesRoute,
  othersRoute,
  profileRoute,
  viewEmployeeRoute,
  addEmployeeRoute,
  ...legacyAddEmployeeRedirectRoutes,
  offerLetterRoute,
  setupRoute,
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
  roleShell('employee', [
    dashboardRoute,
    announcementsRoute,
    applyLeaveRoute,
    payslipsRoute,
    attendanceRoute,
    holidayCalendarRoute,
    orgChartRoute,
    policiesRoute,
    othersRoute,
    profileRoute,
    addEmployeeRoute,
    ...legacyAddEmployeeRedirectRoutes,
  ]),
  roleShell('manager', [
    dashboardRoute,
    announcementsRoute,
    applyLeaveRoute,
    leaveApprovalRoute,
    payslipsRoute,
    attendanceRoute,
    holidayCalendarRoute,
    orgChartRoute,
    policiesRoute,
    othersRoute,
    profileRoute,
    viewEmployeeRoute,
  ]),
  {
    path: 'add-employee',
    loadComponent: () =>
      import('../../libs/modules/employees/src/lib/components/add-employee/add-employee.component').then(
        (m) => m.AddEmployeeComponent,
      ),
    children: addEmployeeChildRoutes,
  },
  roleShell('admin', managementPages),
  roleShell('hr', managementPages),
  roleShell('superadmin', managementPages),
  { path: '**', redirectTo: 'login' },
];
