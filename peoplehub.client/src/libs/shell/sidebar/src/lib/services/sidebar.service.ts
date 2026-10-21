import { Injectable } from '@angular/core';

export interface SubRoute {
  label: string;
  route: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  routes?: SubRoute[];
}

/**
 * Full menu per role shell. Items the role has no "view" access to (Setup page) are removed by the sidebar,
 * so a menu can list more than the role gets by default.
 */
const EMPLOYEE_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'view_dashboard_outline', route: 'dashboard' },
  {
    label: 'Announcement',
    icon: 'announcement_megaphone',
    routes: [{ label: 'View Announcement', route: 'announcements' }],
  },
  { label: 'Apply Leave', icon: 'leave_user', route: 'apply-leave' },
  { label: 'Payroll', icon: 'dollar', route: 'payslips' },
  { label: 'Attendance', icon: 'calendar', route: 'attendance' },
  { label: 'Holidays', icon: 'suitcase_line', route: 'holiday-calender' },
  { label: 'Org-Chart', icon: 'chart_growth', route: 'org-chart' },
  { label: 'Policies', icon: 'copy', route: 'policies' },
];

const MANAGER_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'view_dashboard_outline', route: 'dashboard' },
  {
    label: 'Announcement',
    icon: 'announcement_megaphone',
    routes: [{ label: 'View Announcement', route: 'announcements' }],
  },
  {
    label: 'Leave',
    icon: 'leave_user',
    routes: [
      { label: 'Apply Leave', route: 'apply-leave' },
      { label: 'Leave Approval', route: 'leave-approval' },
    ],
  },
  { label: 'My Team', icon: 'person', route: 'view-employee' },
  { label: 'Payroll', icon: 'dollar', route: 'payslips' },
  { label: 'Attendance', icon: 'calendar', route: 'attendance' },
  { label: 'Holidays', icon: 'suitcase_line', route: 'holiday-calender' },
  { label: 'Org Chart', icon: 'chart_growth', route: 'org-chart' },
  { label: 'Policies', icon: 'copy', route: 'policies' },
];

function managementMenu(dashboardLabel: string, dashboardIcon: string, withOrganizations = false): MenuItem[] {
  return [
    { label: dashboardLabel, icon: dashboardIcon, route: 'dashboard' },
    ...(withOrganizations ? [{ label: 'Organizations', icon: 'group', route: 'organizations' }] : []),
    {
      label: 'Employee',
      icon: 'person',
      routes: [
        { label: 'Add Employee', route: 'add-employee' },
        { label: 'View Employee', route: 'view-employee' },
        { label: 'EDocs', route: 'offer-letter' },
      ],
    },
    {
      label: 'Announcement',
      icon: 'announcement_megaphone',
      routes: [
        { label: 'Add Announcement', route: 'AddEditAnnouncement' },
        { label: 'View Announcement', route: 'announcements' },
      ],
    },
    {
      label: 'Leave',
      icon: 'leave_user',
      routes: [
        { label: 'Apply Leave', route: 'apply-leave' },
        { label: 'Leave Approval', route: 'leave-approval' },
        { label: 'Leave Management', route: 'leave-management' },
      ],
    },
    { label: 'Payroll', icon: 'dollar', route: 'payslips' },
    { label: 'Attendance', icon: 'calendar', route: 'attendance' },
    { label: 'Holidays', icon: 'suitcase_line', route: 'holidayList' },
    { label: 'Org Chart', icon: 'chart_growth', route: 'org-chart' },
    { label: 'Policies', icon: 'copy', route: 'policies' },
    { label: 'Setup', icon: 'settings', route: 'setup' },
  ];
}

export const MENU_CONFIG: Record<string, MenuItem[]> = {
  employee: EMPLOYEE_MENU,
  manager: MANAGER_MENU,
  admin: managementMenu('Admin Dashboard', 'administrator_line'),
  hr: managementMenu('HR Dashboard', 'home'),
  superadmin: managementMenu('Dashboard', 'view_dashboard_outline', true),
};

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}

  getMenuByRole(role: string): MenuItem[] {
    return MENU_CONFIG[role.toLowerCase()] || MENU_CONFIG['employee'];
  }
}
