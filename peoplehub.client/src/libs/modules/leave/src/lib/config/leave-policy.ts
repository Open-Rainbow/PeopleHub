import { LeaveStatus, LeaveTypeConfig, LeaveTypeKey } from '../models/leave-request.model';

export const LEAVE_TYPES: LeaveTypeConfig[] = [
  {
    key: 'earned',
    label: 'Earned Leave',
    short: 'EL',
    description: 'Planned time off. Apply in advance.',
    entitlement: 12,
    backdateDays: 0,
    maxConsecutive: 15,
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
    styles: { chip: 'bg-teal-50 text-teal-700 ring-teal-600/20', bar: 'bg-teal-500', soft: 'bg-teal-50 text-teal-600', ring: 'border-teal-500 ring-teal-500' },
  },
  {
    key: 'loss-of-pay',
    label: 'Loss of Pay',
    short: 'LOP',
    description: 'Unpaid leave when other balances are used up.',
    entitlement: null,
    backdateDays: 0,
    maxConsecutive: 30,
    styles: { chip: 'bg-gray-100 text-gray-700 ring-gray-500/20', bar: 'bg-gray-400', soft: 'bg-gray-100 text-gray-600', ring: 'border-gray-500 ring-gray-500' },
  },
];

export const LEAVE_TYPE_MAP: Record<LeaveTypeKey, LeaveTypeConfig> = LEAVE_TYPES.reduce(
  (map, type) => ({ ...map, [type.key]: type }),
  {} as Record<LeaveTypeKey, LeaveTypeConfig>,
);

export const LEAVE_STATUS_STYLES: Record<LeaveStatus, string> = {
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  Cancelled: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};

/**
 * Company holidays (yyyy-MM-dd) skipped when counting leave days.
 * Replace with the Holidays module/API once it exists.
 */
export const LEAVE_HOLIDAYS: Record<string, string> = {
  '2026-10-20': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
  '2026-12-25': 'Christmas',
  '2027-01-01': 'New Year',
  '2027-01-26': 'Republic Day',
};

export const REASON_MIN = 5;
export const REASON_MAX = 500;
