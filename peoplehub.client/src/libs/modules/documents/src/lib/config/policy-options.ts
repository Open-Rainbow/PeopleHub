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

/** Semantic colours built only from the theme tokens (theme-tokens.css), so light / dark both work. */
export type PolicyTone = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const tone = (token: string) => ({
  color: `color-mix(in srgb, var(${token}) 80%, var(--color-text-primary))`,
  bg: `color-mix(in srgb, var(${token}) 14%, transparent)`,
  solid: `var(${token})`,
});

export const TONES: Record<PolicyTone, { color: string; bg: string; solid: string }> = {
  primary: tone('--color-primary'),
  info: tone('--color-primary-soft'),
  success: tone('--color-success'),
  warning: tone('--color-warning'),
  danger: tone('--color-danger'),
  neutral: {
    color: 'var(--color-text-secondary)',
    bg: 'var(--color-surface-muted)',
    solid: 'var(--color-text-secondary)',
  },
};

/** Theme-tinted notice banner colours (ui-notice-banner inputs). */
export function bannerTone(t: PolicyTone) {
  const c = TONES[t];
  return {
    bannerColor: `color-mix(in srgb, ${c.solid} 10%, var(--color-surface))`,
    headingColor: c.color,
    contentColor: 'var(--color-text-primary)',
    highlighterColor: c.solid,
    iconColor: c.solid,
  };
}

export const CATEGORY_STYLES: Record<PolicyCategory, { tone: PolicyTone; icon: string }> = {
  Workplace: { tone: 'primary', icon: 'group' },
  HR: { tone: 'info', icon: 'person' },
  'IT & Security': { tone: 'primary', icon: 'settings' },
  'Leave & Attendance': { tone: 'success', icon: 'calendar' },
  Finance: { tone: 'warning', icon: 'dollar' },
  'Code of Conduct': { tone: 'neutral', icon: 'info' },
  'Health & Safety': { tone: 'danger', icon: 'check_circle_outline' },
  Other: { tone: 'neutral', icon: 'copy' },
};

export const STATUS_TONES: Record<PolicyStatus, PolicyTone> = {
  Published: 'success',
  Draft: 'warning',
  Archived: 'neutral',
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
