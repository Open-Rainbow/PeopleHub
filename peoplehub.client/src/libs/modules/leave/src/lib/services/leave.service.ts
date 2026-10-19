import { computed, Injectable, signal } from '@angular/core';
import {
  LeaveBalance,
  LeaveDraft,
  LeaveDraftErrors,
  LeaveRequest,
  LeaveTypeKey,
} from '../models/leave-request.model';
import { LEAVE_TYPE_MAP, LEAVE_TYPES, REASON_MAX, REASON_MIN } from '../config/leave-policy';
import { addDaysIso, rangesOverlap, todayIso, workingDays } from '../utils/leave-date.utils';

const STORE_KEY = 'ph.leave.requests.v1';

/** Statuses that block the same dates and count against the balance. */
const ACTIVE: ReadonlyArray<LeaveRequest['status']> = ['Pending', 'Approved'];

/**
 * Leave requests + balances for the signed-in employee.
 * Offline-first (localStorage, seeded with demo data) until the leave API exists.
 */
@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private readonly requestsSignal = signal<LeaveRequest[]>(this.readStore());

  readonly requests = computed(() =>
    [...this.requestsSignal()].sort((a, b) => b.fromDate.localeCompare(a.fromDate) || b.id - a.id),
  );

  /** Balances for the current calendar year. */
  readonly balances = computed<LeaveBalance[]>(() => {
    const year = todayIso().slice(0, 4);
    const thisYear = this.requestsSignal().filter((r) => r.fromDate.startsWith(year));
    return LEAVE_TYPES.map((type) => {
      const used = sum(thisYear.filter((r) => r.type === type.key && r.status === 'Approved'));
      const pending = sum(thisYear.filter((r) => r.type === type.key && r.status === 'Pending'));
      return {
        type,
        entitlement: type.entitlement,
        used,
        pending,
        available: type.entitlement === null ? null : Math.max(type.entitlement - used - pending, 0),
      };
    });
  });

  readonly totals = computed(() => {
    const limited = this.balances().filter((b) => b.entitlement !== null);
    return {
      entitlement: limited.reduce((n, b) => n + (b.entitlement ?? 0), 0),
      used: this.balances().reduce((n, b) => n + b.used, 0),
      pending: this.balances().reduce((n, b) => n + b.pending, 0),
      available: limited.reduce((n, b) => n + (b.available ?? 0), 0),
    };
  });

  /** Next leave that hasn't ended yet (pending or approved). */
  readonly upcoming = computed(() => {
    const today = todayIso();
    return (
      [...this.requestsSignal()]
        .filter((r) => ACTIVE.includes(r.status) && r.toDate >= today)
        .sort((a, b) => a.fromDate.localeCompare(b.fromDate))[0] ?? null
    );
  });

  balanceOf(type: LeaveTypeKey): LeaveBalance {
    return this.balances().find((b) => b.type.key === type)!;
  }

  /** Field-level problems with a draft. Empty object = OK to submit. */
  validate(draft: LeaveDraft): LeaveDraftErrors {
    const errors: LeaveDraftErrors = {};
    const type = LEAVE_TYPE_MAP[draft.type];
    const today = todayIso();
    const reason = draft.reason.trim();

    if (!type) errors.type = 'Pick a leave type.';
    if (!draft.fromDate) errors.fromDate = 'Pick a start date.';
    if (!draft.toDate) errors.toDate = 'Pick an end date.';
    if (!reason) errors.reason = 'Add a short reason.';
    else if (reason.length < REASON_MIN) errors.reason = `Reason must be at least ${REASON_MIN} characters.`;
    else if (reason.length > REASON_MAX) errors.reason = `Reason must be ${REASON_MAX} characters or fewer.`;
    if (!type || errors.fromDate || errors.toDate) return errors;

    if (draft.toDate < draft.fromDate) {
      errors.toDate = 'End date must be on or after the start date.';
      return errors;
    }

    const earliest = addDaysIso(today, -type.backdateDays);
    if (draft.fromDate < earliest) {
      errors.fromDate = type.backdateDays > 0
        ? `${type.label} can start at most ${type.backdateDays} days ago.`
        : `${type.label} can't start in the past.`;
    }

    if (draft.dayPart !== 'full' && draft.fromDate !== draft.toDate) {
      errors.toDate = 'Half day applies to a single date only.';
    }

    const days = workingDays(draft.fromDate, draft.toDate, draft.dayPart);
    if (days === 0) {
      errors.toDate = 'These dates are all weekends or holidays.';
      return errors;
    }
    if (type.maxConsecutive !== null && days > type.maxConsecutive) {
      errors.toDate = `${type.label} allows at most ${type.maxConsecutive} days in one request.`;
    }

    const balance = this.balanceOf(type.key);
    if (balance.available !== null && days > balance.available) {
      errors.balance = `Only ${balance.available} ${type.label} day(s) left. Shorten the request or choose Loss of Pay.`;
    }

    const clash = this.requestsSignal().find(
      (r) => ACTIVE.includes(r.status) && rangesOverlap(r.fromDate, r.toDate, draft.fromDate, draft.toDate),
    );
    if (clash) {
      errors.overlap = `Overlaps your ${LEAVE_TYPE_MAP[clash.type].label.toLowerCase()} on ${clash.fromDate}${clash.toDate !== clash.fromDate ? ' to ' + clash.toDate : ''} (${clash.status.toLowerCase()}).`;
    }

    return errors;
  }

  /** Returns the created request, or the validation errors. */
  apply(draft: LeaveDraft): { request?: LeaveRequest; errors?: LeaveDraftErrors } {
    const errors = this.validate(draft);
    if (Object.keys(errors).length > 0) return { errors };

    const request: LeaveRequest = {
      id: this.requestsSignal().reduce((max, r) => Math.max(max, r.id), 0) + 1,
      type: draft.type,
      fromDate: draft.fromDate,
      toDate: draft.toDate,
      dayPart: draft.fromDate === draft.toDate ? draft.dayPart : 'full',
      days: workingDays(draft.fromDate, draft.toDate, draft.dayPart),
      reason: draft.reason.trim(),
      status: 'Pending',
      appliedOn: new Date().toISOString(),
      approver: 'Reporting Manager',
    };
    this.save([request, ...this.requestsSignal()]);
    return { request };
  }

  /** Pending requests and approved ones that haven't started can be withdrawn. */
  canCancel(request: LeaveRequest): boolean {
    return request.status === 'Pending' || (request.status === 'Approved' && request.fromDate > todayIso());
  }

  cancel(id: number): void {
    this.save(
      this.requestsSignal().map((r) =>
        r.id === id && this.canCancel(r) ? { ...r, status: 'Cancelled', decisionNote: 'Withdrawn by you' } : r,
      ),
    );
  }

  resetDemoData(): void {
    this.save(seedRequests());
  }

  private save(requests: LeaveRequest[]): void {
    this.requestsSignal.set(requests);
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(requests));
    } catch {
      // storage blocked: keep in memory
    }
  }

  private readStore(): LeaveRequest[] {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as LeaveRequest[]) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fall through to seed
    }
    return seedRequests();
  }
}

function sum(requests: LeaveRequest[]): number {
  return requests.reduce((n, r) => n + r.days, 0);
}

/** Demo history relative to today, so balances and "upcoming" always look realistic. */
export function seedRequests(now = new Date()): LeaveRequest[] {
  const today = todayIso(now);
  const at = (offset: number) => addDaysIso(today, offset);
  const make = (
    id: number, type: LeaveTypeKey, from: number, to: number, reason: string,
    status: LeaveRequest['status'], decisionNote?: string,
  ): LeaveRequest => ({
    id, type, fromDate: at(from), toDate: at(to), dayPart: 'full',
    days: workingDays(at(from), at(to)), reason, status,
    appliedOn: new Date(now.getTime() + (from - 7) * 86_400_000).toISOString(),
    approver: 'Reporting Manager', decisionNote,
  });

  return [
    make(1, 'earned', 32, 33, 'Family function in hometown', 'Pending'),
    make(2, 'sick', -9, -8, 'Fever and doctor visit', 'Approved', 'Get well soon'),
    make(3, 'casual', -40, -40, 'Bank and passport appointment', 'Approved'),
    make(4, 'earned', -75, -71, 'Vacation with family', 'Approved', 'Enjoy!'),
    make(5, 'casual', -20, -20, 'Personal work', 'Rejected', 'Release week, please pick another date'),
  ].filter((r) => r.days > 0);
}
