export type LeaveTypeKey = 'earned' | 'casual' | 'sick' | 'comp-off' | 'loss-of-pay';

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

export type LeaveDraftErrors = Partial<Record<keyof LeaveDraft | 'balance' | 'overlap', string>>;
