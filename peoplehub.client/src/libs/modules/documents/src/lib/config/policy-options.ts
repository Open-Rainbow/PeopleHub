import { ChipVariant } from 'ui';
import { PolicyCategory, PolicyStatus } from '../models/policy.model';

/** Until login exists the screens act as this employee. */
export const POLICY_DEMO_EMPLOYEE_ID = 'EMP00001';

export const POLICY_CATEGORIES: PolicyCategory[] = [
  'Workplace',
  'HR',
  'IT & Security',
  'Leave & Attendance',
  'Finance',
  'Code of Conduct',
  'Health & Safety',
  'Other',
];

export const POLICY_STATUSES: PolicyStatus[] = ['Published', 'Draft', 'Archived'];

export const POLICY_DEPARTMENTS = ['Engineering', 'HR', 'Finance', 'Leadership', 'Product', 'Operations'];

export const POLICY_LIMITS = {
  titleMin: 3,
  titleMax: 150,
  summaryMax: 500,
  contentMax: 50000,
  fileMaxBytes: 10 * 1024 * 1024,
  /** Browser storage is small: offline demo uploads are capped lower. */
  offlineFileMaxBytes: 2 * 1024 * 1024,
};

/** Extension -> content type (same list as the API). */
export const POLICY_FILE_TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

export const POLICY_FILE_ACCEPT = Object.keys(POLICY_FILE_TYPES).join(',');

export const CATEGORY_STYLES: Record<PolicyCategory, { chip: ChipVariant; icon: string; tint: string }> = {
  Workplace: { chip: 'lightBlue', icon: 'group', tint: 'bg-sky-50 text-sky-700' },
  HR: { chip: 'purple', icon: 'person', tint: 'bg-violet-50 text-violet-700' },
  'IT & Security': { chip: 'darkBlue', icon: 'settings', tint: 'bg-indigo-50 text-indigo-700' },
  'Leave & Attendance': { chip: 'green', icon: 'calendar', tint: 'bg-emerald-50 text-emerald-700' },
  Finance: { chip: 'amber', icon: 'dollar', tint: 'bg-amber-50 text-amber-700' },
  'Code of Conduct': { chip: 'pink', icon: 'info', tint: 'bg-pink-50 text-pink-700' },
  'Health & Safety': { chip: 'red', icon: 'check_circle_outline', tint: 'bg-rose-50 text-rose-700' },
  Other: { chip: 'lightGrey', icon: 'copy', tint: 'bg-gray-100 text-gray-700' },
};

export const STATUS_CHIPS: Record<PolicyStatus, ChipVariant> = {
  Published: 'green',
  Draft: 'amber',
  Archived: 'lightGrey',
};

export interface PolicyDemoEmployee {
  employeeId: string;
  employeeName: string;
  department: string;
}

export const POLICY_DEMO_EMPLOYEES: PolicyDemoEmployee[] = [
  { employeeId: 'EMP00001', employeeName: 'Venkat Jangili', department: 'Engineering' },
  { employeeId: 'EMP00002', employeeName: 'Polly Polineni', department: 'Engineering' },
  { employeeId: 'EMP00003', employeeName: 'Ethan Sarvigari', department: 'Engineering' },
  { employeeId: 'EMP00004', employeeName: 'Dharani Vedantham', department: 'HR' },
  { employeeId: 'EMP00005', employeeName: 'Gani Kumar Pradhan', department: 'Finance' },
  { employeeId: 'EMP00006', employeeName: 'Arjun Mehta', department: 'Leadership' },
  { employeeId: 'EMP00007', employeeName: 'Kavya Rao', department: 'Finance' },
  { employeeId: 'EMP00008', employeeName: 'Rahul Verma', department: 'Engineering' },
  { employeeId: 'EMP00009', employeeName: 'Sneha Iyer', department: 'Engineering' },
];
