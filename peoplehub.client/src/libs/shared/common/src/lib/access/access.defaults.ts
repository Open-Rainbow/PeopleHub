import { AccessAction, PageAccess, PageDef, RoleDef } from './access.models';

/** Same catalogue as `sec.Page` in database/setup.sql (section 16). */
export const PAGE_CATALOGUE: PageDef[] = [
  page('dashboard', 'Dashboard', 'General', 'view', 10),
  page('announcements', 'View announcements', 'Announcements', 'view', 20),
  page('announcements.manage', 'Manage announcements', 'Announcements', 'view,create,edit,delete', 21),
  page('apply-leave', 'Apply leave', 'Leave', 'view,create,edit,delete', 30),
  page('leave-approval', 'Leave approval', 'Leave', 'view,approve,export', 31),
  page('leave-management', 'Leave management', 'Leave', 'view,create,edit,delete,approve,export', 32),
  page('payroll', 'My payslips & tax', 'Payroll', 'view,create,export', 40),
  page('payroll.manage', 'Payroll processing', 'Payroll', 'view,create,edit,delete,approve,export', 41),
  page('attendance', 'Attendance', 'Attendance', 'view,create,approve,export', 50),
  page('holidays', 'Holiday calendar', 'Holidays', 'view', 60),
  page('holidays.manage', 'Manage holidays', 'Holidays', 'view,create,edit,delete', 61),
  page('org-chart', 'Org chart', 'Employees', 'view,edit,export', 70),
  page('employees.view', 'View employees', 'Employees', 'view,export', 71),
  page('employees.add', 'Add / edit employee', 'Employees', 'view,create,edit,delete', 72),
  page('profile', 'My profile', 'Employees', 'view,edit', 73),
  page('edocs', 'EDocs (offer letters)', 'Documents', 'view,create,edit,delete,export', 80),
  page('policies', 'Policies', 'Documents', 'view,create,edit,delete,export', 81),
  page('others', 'Others', 'General', 'view', 90),
  page('setup', 'Setup (roles & access)', 'Administration', 'view,create,edit,delete', 99),
];

/** Built-in roles (same as the SQL seed). */
export const SYSTEM_ROLES: RoleDef[] = [
  { code: 'superadmin', name: 'Super Admin', description: 'Full access to everything, including setup. Cannot be changed.', sortOrder: 10 },
  { code: 'admin', name: 'Admin', description: 'Runs the organization: employees, leave, payroll, policies and setup.', sortOrder: 20 },
  { code: 'hr', name: 'HR', description: 'People operations: employees, leave, attendance, payroll and policies.', sortOrder: 30 },
  { code: 'manager', name: 'Manager', description: 'Approves leave and attendance for their team.', sortOrder: 40 },
  { code: 'employee', name: 'Employee', description: 'Self-service: leave, attendance, payslips, policies.', sortOrder: 50 },
];

/** Flags per page: view, create, edit, delete, approve, export (1 = allowed). Mirrors the SQL seed. */
const DEFAULT_GRANTS: Record<string, Record<string, string>> = {
  admin: {
    dashboard: '100000', announcements: '100000', 'announcements.manage': '111100', 'apply-leave': '111100',
    'leave-approval': '100011', 'leave-management': '111111', payroll: '110001', 'payroll.manage': '111111',
    attendance: '110011', holidays: '100000', 'holidays.manage': '111100', 'org-chart': '101001',
    'employees.view': '100001', 'employees.add': '111100', profile: '101000', edocs: '111101', policies: '111101',
    others: '100000', setup: '111100',
  },
  hr: {
    dashboard: '100000', announcements: '100000', 'announcements.manage': '111100', 'apply-leave': '111100',
    'leave-management': '111111', payroll: '110001', 'payroll.manage': '111111', attendance: '110011',
    holidays: '100000', 'holidays.manage': '111100', 'org-chart': '101001', 'employees.view': '100001',
    'employees.add': '111100', profile: '101000', edocs: '111101', policies: '111101', others: '100000',
  },
  manager: {
    dashboard: '100000', announcements: '100000', 'apply-leave': '111100', 'leave-approval': '100011',
    payroll: '110000', attendance: '110011', holidays: '100000', 'org-chart': '100000', 'employees.view': '100000',
    profile: '101000', policies: '100000', others: '100000',
  },
  employee: {
    dashboard: '100000', announcements: '100000', 'apply-leave': '111100', payroll: '110000', attendance: '110000',
    holidays: '100000', 'org-chart': '100000', profile: '101000', policies: '100000', others: '100000',
  },
};

/** Default page access of a built-in role (custom roles start empty or as a copy). */
export function defaultPermissions(roleCode: string): PageAccess[] {
  if (roleCode === 'superadmin') return fullPermissions();
  const grants = DEFAULT_GRANTS[roleCode] ?? {};
  return PAGE_CATALOGUE.filter((p) => grants[p.pageKey]).map((p) => {
    const f = grants[p.pageKey];
    const on = (i: number, a: AccessAction) => f[i] === '1' && p.actions.includes(a);
    return {
      pageKey: p.pageKey,
      canView: on(0, 'view'),
      canCreate: on(1, 'create'),
      canEdit: on(2, 'edit'),
      canDelete: on(3, 'delete'),
      canApprove: on(4, 'approve'),
      canExport: on(5, 'export'),
    };
  });
}

/** Everything every page supports (Super Admin). */
export function fullPermissions(): PageAccess[] {
  return PAGE_CATALOGUE.map((p) => ({
    pageKey: p.pageKey,
    canView: true,
    canCreate: p.actions.includes('create'),
    canEdit: p.actions.includes('edit'),
    canDelete: p.actions.includes('delete'),
    canApprove: p.actions.includes('approve'),
    canExport: p.actions.includes('export'),
  }));
}

function page(pageKey: string, name: string, moduleName: string, actions: string, sortOrder: number): PageDef {
  return { pageKey, name, moduleName, actions: actions.split(',') as AccessAction[], sortOrder };
}
