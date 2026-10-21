import { LeaveStatus, LeaveTypeConfig, LeaveTypeKey } from '../models/leave-request.model';

/**
 * Offline fallback only: online, the types and rules come from GET /api/v1/leave/types
 * (the employee's published leave policy). `styles` are kept for the old screens.
 */
export const LEAVE_TYPES: LeaveTypeConfig[] = [
  {
    key: 'earned',
    label: 'Earned Leave',
    short: 'EL',
    description: 'Planned time off. Apply in advance.',
    entitlement: 12,
    backdateDays: 0,
    maxConsecutive: 15,
    category: 'standard',
    isPaid: true,
    carryForwardDays: 5,
    isEncashable: true,
    styles: { chip: 'bg-blue-50 text-blue-700 ring-blue-600/20', bar: 'bg-blue-500', soft: 'bg-blue-50 text-blue-600', ring: 'border-blue-500 ring-blue-500' },
  },
  {
    key: 'casual',
    label: 'Casual Leave',
    short: 'CL',
    description: 'Short personal errands, up to 3 days at a time.',
    entitlement: 6,
    backdateDays: 0,
    maxConsecutive: 3,
    category: 'standard',
    isPaid: true,
    styles: { chip: 'bg-violet-50 text-violet-700 ring-violet-600/20', bar: 'bg-violet-500', soft: 'bg-violet-50 text-violet-600', ring: 'border-violet-500 ring-violet-500' },
  },
  {
    key: 'sick',
    label: 'Sick Leave',
    short: 'SL',
    description: 'Illness or medical appointments. Can be applied up to 7 days later.',
    entitlement: 6,
    backdateDays: 7,
    maxConsecutive: null,
    documentAfterDays: 2,
    category: 'standard',
    isPaid: true,
    styles: { chip: 'bg-rose-50 text-rose-700 ring-rose-600/20', bar: 'bg-rose-500', soft: 'bg-rose-50 text-rose-600', ring: 'border-rose-500 ring-rose-500' },
  },
  {
    key: 'comp-off',
    label: 'Comp Off',
    short: 'CO',
    description: 'For weekends or holidays you worked.',
    entitlement: 2,
    backdateDays: 0,
    maxConsecutive: 2,
    category: 'additional',
    isPaid: true,
    styles: { chip: 'bg-teal-50 text-teal-700 ring-teal-600/20', bar: 'bg-teal-500', soft: 'bg-teal-50 text-teal-600', ring: 'border-teal-500 ring-teal-500' },
  },
  {
    key: 'maternity',
    label: 'Maternity Leave',
    short: 'ML',
    description: 'Leave for employees before and after childbirth.',
    entitlement: 182,
    backdateDays: 0,
    maxConsecutive: 182,
    documentAfterDays: 1,
    category: 'parental',
    isPaid: true,
    styles: { chip: 'bg-pink-50 text-pink-700 ring-pink-600/20', bar: 'bg-pink-500', soft: 'bg-pink-50 text-pink-600', ring: 'border-pink-500 ring-pink-500' },
  },
  {
    key: 'paternity',
    label: 'Paternity Leave',
    short: 'PL',
    description: 'Leave for new fathers, for childbirth or adoption.',
    entitlement: 15,
    backdateDays: 0,
    maxConsecutive: 15,
    category: 'parental',
    isPaid: true,
    styles: { chip: 'bg-sky-50 text-sky-700 ring-sky-600/20', bar: 'bg-sky-500', soft: 'bg-sky-50 text-sky-600', ring: 'border-sky-500 ring-sky-500' },
  },
  {
    key: 'wfh',
    label: 'Work From Home',
    short: 'WFH',
    description: 'Remote working days.',
    entitlement: 96,
    backdateDays: 0,
    maxConsecutive: 5,
    category: 'additional',
    isPaid: true,
    styles: { chip: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', bar: 'bg-emerald-500', soft: 'bg-emerald-50 text-emerald-600', ring: 'border-emerald-500 ring-emerald-500' },
  },
  {
    key: 'loss-of-pay',
    label: 'Loss of Pay',
    short: 'LOP',
    description: 'Unpaid leave when other balances are used up.',
    entitlement: null,
    backdateDays: 0,
    maxConsecutive: 30,
    category: 'additional',
    isPaid: false,
    styles: { chip: 'bg-gray-100 text-gray-700 ring-gray-500/20', bar: 'bg-gray-400', soft: 'bg-gray-100 text-gray-600', ring: 'border-gray-500 ring-gray-500' },
  },
];

export const LEAVE_TYPE_MAP: Record<LeaveTypeKey, LeaveTypeConfig> = LEAVE_TYPES.reduce(
  (map, type) => ({ ...map, [type.key]: type }),
  {} as Record<LeaveTypeKey, LeaveTypeConfig>,
);

/** Legacy Tailwind classes (old screens only). */
export const LEAVE_STATUS_STYLES: Record<LeaveStatus, string> = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  Cancelled: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};

/**
 * Company holidays (yyyy-MM-dd) skipped when counting leave days.
 * Offline fallback only: online, the list comes from GET /api/v1/leave/holidays (org.Holiday).
 * Keep in sync with the holiday seed in database/leave.sql.
 */
export const LEAVE_HOLIDAYS: Record<string, string> = {
  '2026-01-01': 'New Year',
  '2026-01-26': 'Republic Day',
  '2026-03-04': 'Holi',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
  '2026-12-25': 'Christmas',
  '2027-01-01': 'New Year',
  '2027-01-26': 'Republic Day',
};

export const REASON_MIN = 5;
export const REASON_MAX = 500;

/** Code of the work-from-home type (not counted as leave in balances and charts). */
export const WFH_CODE = 'wfh';
