/** First URL segment after the role (e.g. /hr/<segment>) -> page key of the Setup catalogue. */
export const ROUTE_PAGE_MAP: Record<string, string> = {
  dashboard: 'dashboard',
  announcements: 'announcements',
  AddEditAnnouncement: 'announcements.manage',
  'apply-leave': 'apply-leave',
  'leave-approval': 'leave-approval',
  'leave-management': 'leave-management',
  payslips: 'payroll',
  attendance: 'attendance',
  'holiday-calender': 'holidays',
  holidayList: 'holidays.manage',
  'org-chart': 'org-chart',
  'view-employee': 'employees.view',
  'add-employee': 'employees.add',
  showProfile: 'profile',
  'offer-letter': 'edocs',
  policies: 'policies',
  others: 'others',
  setup: 'setup',
};

/** Role shells in app.routes.ts. */
export const ROLE_SHELLS = ['employee', 'manager', 'hr', 'admin', 'superadmin'];

/** Page key of a route segment (null = not controlled by Setup). */
export function pageKeyOf(segment: string | null | undefined): string | null {
  if (!segment) return null;
  return ROUTE_PAGE_MAP[segment] ?? null;
}
