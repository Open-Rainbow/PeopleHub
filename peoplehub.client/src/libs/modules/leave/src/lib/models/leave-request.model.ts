/** Built-in codes, plus any code HR adds in the Leave Policy Manager. */
export type LeaveTypeKey = 'earned' | 'casual' | 'sick' | 'comp-off' | 'loss-of-pay' | (string & {});

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

/** Half days are only allowed for single-day requests. */
export type DayPart = 'full' | 'first-half' | 'second-half';

export interface LeaveRequest {
  id: number;
  type: LeaveTypeKey;
  /** ISO date (yyyy-MM-dd) */
  fromDate: string;
  /** ISO date (yyyy-MM-dd) */
  toDate: string;
  dayPart: DayPart;
  /** Working days charged to the balance (weekends and holidays excluded). */
  days: number;
  reason: string;
  status: LeaveStatus;
  /** ISO timestamp */
  appliedOn: string;
  approver?: string;
  decisionNote?: string;
}

export interface LeaveDraft {
  type: LeaveTypeKey;
  fromDate: string;
  toDate: string;
  dayPart: DayPart;
  reason: string;
}

export interface LeaveTypeConfig {
  key: LeaveTypeKey;
  label: string;
  short: string;
  description: string;
  /** Days per year; null = no limit (Loss of Pay). */
  entitlement: number | null;
  /** How many days in the past a request may start (sick leave can be backdated). */
  backdateDays: number;
  /** Longest single request in working days; null = no limit. */
  maxConsecutive: number | null;
  /** Extra hint shown in the form when the request is long. */
  documentAfterDays?: number;
  /** Auto | Manager | HR | Manager + HR (from the published leave policy). */
  approvalType?: string;
  /** Days carried forward from last year (already part of entitlement). */
  carryIn?: number;
  /** standard | parental | additional (Leaves page filter chips). */
  category?: string;
  isPaid?: boolean;
  /** Most days that can move to next year. */
  carryForwardDays?: number;
  isEncashable?: boolean;
  /** Legacy Tailwind classes (old screens only). New screens colour types from the theme tokens. */
  styles: { chip: string; bar: string; soft: string; ring: string };
}

export interface LeaveBalance {
  type: LeaveTypeConfig;
  entitlement: number | null;
  used: number;
  pending: number;
  /** null when the type has no limit. */
  available: number | null;
}

/** Balance of one leave type for a given year (GET /api/v1/leave/balances). */
export interface YearBalance {
  key: LeaveTypeKey;
  label: string;
  entitlement: number | null;
  carryIn: number;
  used: number;
  pending: number;
  available: number | null;
}

export type LeaveDraftErrors = Partial<Record<keyof LeaveDraft | 'balance' | 'overlap', string>>;
