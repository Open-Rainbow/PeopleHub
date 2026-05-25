import { Routes } from '@angular/router';

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
        m => m.LoginComponent
      ),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        m => m.LayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'announcement-box',
        loadComponent: () =>
          import('../../libs/modules/announcements/src/lib/components/announcement-box/announcement-box.component').then(
            m => m.AnnouncementBoxComponent
          ),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            m => m.ApplyLeaveComponent
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            m => m.RecentPayslipsComponent
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            m => m.AttendanceComponent
          ),
      },
      {
        path: 'holiday-calender',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/holiday-list/holiday-list.component').then(
            m => m.HolidayListComponent
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            m => m.OrgChartComponent
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            m => m.OthersComponent
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            m => m.EmployeeOverviewComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        m => m.LayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'AddEditAnnouncement',
        loadComponent: () =>
          import('../../libs/modules/announcements/src/lib/components/add-edit-announcement/add-edit-announcement.component').then(
            m => m.AddEditAnnouncementComponent
          ),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            m => m.ApplyLeaveComponent
          ),
      },
      {
        path: 'leave-approval',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-approval/leave-approval.component').then(
            m => m.LeaveApprovalComponent
          ),
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-management/leave-management.component').then(
            m => m.LeaveManagementComponent
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            m => m.RecentPayslipsComponent
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            m => m.AttendanceComponent
          ),
      },
      {
        path: 'holidayList',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/add-holiday-list/add-holiday-list.component').then(
            m => m.AddHolidayListComponent
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            m => m.OrgChartComponent
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            m => m.OthersComponent
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            m => m.EmployeeOverviewComponent
          ),
      },
      {
        path: 'view-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-list/employee-list.component').then(
            m => m.EmployeeListComponent
          ),
      },
      {
        path: 'offer-letter',
        loadComponent: () =>
          import('../../libs/modules/documents/src/lib/components/offer-letter/offer-letter.component').then(
            m => m.OfferLetterComponent
          ),
      },
    ],
  },
  {
    path: 'hr',
    loadComponent: () =>
      import('../../libs/shell/layout/src/lib/components/layout/layout.component').then(
        m => m.LayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../../libs/modules/dashboard/src/lib/components/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'AddEditAnnouncement',
        loadComponent: () =>
          import('../../libs/modules/announcements/src/lib/components/add-edit-announcement/add-edit-announcement.component').then(
            m => m.AddEditAnnouncementComponent
          ),
      },
      {
        path: 'apply-leave',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/apply-leave/apply-leave.component').then(
            m => m.ApplyLeaveComponent
          ),
      },
      {
        path: 'leave-management',
        loadComponent: () =>
          import('../../libs/modules/leave/src/lib/components/leave-management/leave-management.component').then(
            m => m.LeaveManagementComponent
          ),
      },
      {
        path: 'payslips',
        loadComponent: () =>
          import('../../libs/modules/payroll/src/lib/components/recent-payslips/recent-payslips.component').then(
            m => m.RecentPayslipsComponent
          ),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../../libs/modules/attendance/src/lib/components/attendance/attendance.component').then(
            m => m.AttendanceComponent
          ),
      },
      {
        path: 'holidayList',
        loadComponent: () =>
          import('../../libs/modules/holidays/src/lib/components/add-holiday-list/add-holiday-list.component').then(
            m => m.AddHolidayListComponent
          ),
      },
      {
        path: 'org-chart',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/org-chart/org-chart.component').then(
            m => m.OrgChartComponent
          ),
      },
      {
        path: 'others',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/others/others.component').then(
            m => m.OthersComponent
          ),
      },
      {
        path: 'showProfile',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-overview/employee-overview.component').then(
            m => m.EmployeeOverviewComponent
          ),
      },
      {
        path: 'view-employee',
        loadComponent: () =>
          import('../../libs/modules/employees/src/lib/components/employee-list/employee-list.component').then(
            m => m.EmployeeListComponent
          ),
      },
      {
        path: 'offer-letter',
        loadComponent: () =>
          import('../../libs/modules/documents/src/lib/components/offer-letter/offer-letter.component').then(
            m => m.OfferLetterComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

