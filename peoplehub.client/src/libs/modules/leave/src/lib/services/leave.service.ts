import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import {
  DayPart,
  LeaveBalance,
  LeaveDraft,
  LeaveDraftErrors,
  LeaveRequest,
  LeaveTypeConfig,
  LeaveTypeKey,
} from '../models/leave-request.model';
import { LEAVE_HOLIDAYS, LEAVE_TYPES, REASON_MAX, REASON_MIN } from '../config/leave-policy';
import { addDaysIso, rangesOverlap, skippedDays, todayIso, workingDays } from '../utils/leave-date.utils';

/** Backend: PeopleHub.Server LeaveController (proxied by proxy.conf.js). */
export const LEAVE_API = '/api/v1/leave';

/** Until login is wired up, every call is made as this employee (seeded in PeopleHub.sql). */
export const DEMO_EMPLOYEE_ID = 'EMP00001';

const STORE_KEY = 'ph.leave.requests.v1';
const API_TIMEOUT_MS = 5000;

/** Statuses that block the same dates and count against the balance. */
const ACTIVE: ReadonlyArray<LeaveRequest['status']> = ['Pending', 'Approved'];

type Row = Record<string, unknown>;

/**
 * Leave requests + balances for the signed-in employee.
 *
 * - When the API answers, it is the source of truth: types, holidays and requests come
 *   from the server and every write goes to it (the database re-checks every rule).
 * - When it doesn't, the page keeps working on local demo data (localStorage).
 */
@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private readonly http = inject(HttpClient);
  private readonly requestsSignal = signal<LeaveRequest[]>(this.readStore());
  private readonly typesSignal = signal<LeaveTypeConfig[]>(LEAVE_TYPES);
  private readonly holidaysSignal = signal<Record<string, string>>(LEAVE_HOLIDAYS);
  private readonly onlineSignal = signal(false);
  private tempId = 0;

  readonly employeeId = DEMO_EMPLOYEE_ID;
  readonly loading = signal(false);
  readonly isOnline = this.onlineSignal.asReadonly();
  readonly lastError = signal<string | null>(null);
  readonly types = this.typesSignal.asReadonly();
  readonly holidays = this.holidaysSignal.asReadonly();
  readonly typeMap = computed(() =>
    this.typesSignal().reduce((map, t) => ({ ...map, [t.key]: t }), {} as Record<LeaveTypeKey, LeaveTypeConfig>),
  );

  readonly requests = computed(() =>
    [...this.requestsSignal()].sort((a, b) => b.fromDate.localeCompare(a.fromDate) || b.id - a.id),
  );

  /** Balances for the current calendar year (same formula as sp_get_leave_balances). */
  readonly balances = computed<LeaveBalance[]>(() => {
    const year = todayIso().slice(0, 4);
    const thisYear = this.requestsSignal().filter((r) => r.fromDate.startsWith(year));
    return this.typesSignal().map((type) => {
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

  /** Loads types, holidays (this + next year) and my requests. Keeps local data if the API is down. */
  refresh(): void {
    const year = Number(todayIso().slice(0, 4));
    const get = <T>(url: string) => this.http.get<T>(url).pipe(timeout(API_TIMEOUT_MS));
    this.loading.set(true);
    forkJoin({
      types: get<Row[]>(`${LEAVE_API}/types`),
      thisYear: get<Row[]>(`${LEAVE_API}/holidays?year=${year}`),
      nextYear: get<Row[]>(`${LEAVE_API}/holidays?year=${year + 1}`),
      requests: get<Row[]>(`${LEAVE_API}/requests?employeeId=${encodeURIComponent(this.employeeId)}`),
    })
      .pipe(
        catchError(() => of(null)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((data) => {
        if (!data || !Array.isArray(data.requests)) return;
        this.onlineSignal.set(true);
        if (Array.isArray(data.types) && data.types.length > 0) this.typesSignal.set(this.mergeTypes(data.types));
        const holidays: Record<string, string> = {};
        for (const h of [...(data.thisYear ?? []), ...(data.nextYear ?? [])]) {
          if (!h['isOptional']) holidays[String(h['date']).slice(0, 10)] = String(h['name']);
        }
        this.holidaysSignal.set(holidays);
        this.requestsSignal.set(data.requests.map((row) => this.fromApi(row)));
      });
  }

  typeOf(key: LeaveTypeKey): LeaveTypeConfig {
    return this.typeMap()[key] ?? LEAVE_TYPES[0];
  }

  balanceOf(type: LeaveTypeKey): LeaveBalance {
    return this.balances().find((b) => b.type.key === type) ?? this.balances()[0];
  }

  countDays(from: string, to: string, dayPart: DayPart = 'full'): number {
    return workingDays(from, to, dayPart, this.holidaysSignal());
  }

  skippedDays(from: string, to: string): { weekends: number; holidays: string[] } {
    return skippedDays(from, to, this.holidaysSignal());
  }

  /** Field-level problems with a draft. Empty object = OK to submit. The server re-checks all of these. */
  validate(draft: LeaveDraft): LeaveDraftErrors {
    const errors: LeaveDraftErrors = {};
    const type = this.typeMap()[draft.type];
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

    if (draft.fromDate < addDaysIso(today, -type.backdateDays)) {
      errors.fromDate = type.backdateDays > 0
        ? `${type.label} can start at most ${type.backdateDays} days ago.`
        : `${type.label} can't start in the past.`;
    }

    if (draft.dayPart !== 'full' && draft.fromDate !== draft.toDate) {
      errors.toDate = 'Half day applies to a single date only.';
    }

    const days = this.countDays(draft.fromDate, draft.toDate, draft.dayPart);
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
      errors.overlap = `Overlaps your ${this.typeOf(clash.type).label.toLowerCase()} on ${clash.fromDate}${clash.toDate !== clash.fromDate ? ' to ' + clash.toDate : ''} (${clash.status.toLowerCase()}).`;
    }

    return errors;
  }

  /** Returns the created request (optimistic when online), or the validation errors. */
  apply(draft: LeaveDraft): { request?: LeaveRequest; errors?: LeaveDraftErrors } {
    const errors = this.validate(draft);
    if (Object.keys(errors).length > 0) return { errors };

    const online = this.onlineSignal();
    const dayPart: DayPart = draft.fromDate === draft.toDate ? draft.dayPart : 'full';
    const request: LeaveRequest = {
      id: online ? --this.tempId : this.requestsSignal().reduce((max, r) => Math.max(max, r.id), 0) + 1,
      type: draft.type,
      fromDate: draft.fromDate,
      toDate: draft.toDate,
      dayPart,
      days: this.countDays(draft.fromDate, draft.toDate, dayPart),
      reason: draft.reason.trim(),
      status: 'Pending',
      appliedOn: new Date().toISOString(),
      approver: 'Reporting Manager',
    };
    this.save([request, ...this.requestsSignal()]);

    if (online) {
      this.http
        .post<Row>(`${LEAVE_API}/requests`, {
          employeeId: this.employeeId,
          leaveType: request.type,
          fromDate: request.fromDate,
          toDate: request.toDate,
          dayPart: request.dayPart,
          reason: request.reason,
        })
        .subscribe({
          next: (saved) => this.replace(request.id, this.fromApi(saved)),
          error: (error) => this.fail(error, 'Could not send your leave request.'),
        });
    }
    return { request };
  }

  /** Pending requests and approved ones that haven't started can be withdrawn. */
  canCancel(request: LeaveRequest): boolean {
    return request.id > 0
      && (request.status === 'Pending' || (request.status === 'Approved' && request.fromDate > todayIso()));
  }

  cancel(id: number): void {
    const target = this.requestsSignal().find((r) => r.id === id);
    if (!target || !this.canCancel(target)) return;
    this.save(this.requestsSignal().map((r) => (r.id === id ? { ...r, status: 'Cancelled', decisionNote: 'Withdrawn by you' } : r)));

    if (this.onlineSignal()) {
      this.http.post<Row>(`${LEAVE_API}/requests/${id}/withdraw`, { employeeId: this.employeeId }).subscribe({
        next: (saved) => this.replace(id, this.fromApi(saved)),
        error: (error) => this.fail(error, 'Could not withdraw the request.'),
      });
    }
  }

  resetDemoData(): void {
    this.save(seedRequests());
  }

  private replace(id: number, next: LeaveRequest): void {
    this.save(this.requestsSignal().map((r) => (r.id === id ? next : r)));
  }

  /** A write failed: show the server's reason and re-sync with the server. */
  private fail(error: unknown, fallback: string): void {
    const body = (error as { error?: { detail?: string; title?: string; errors?: Record<string, string[]> } })?.error;
    const firstFieldError = body?.errors ? Object.values(body.errors)[0]?.[0] : undefined;
    this.lastError.set(body?.detail || firstFieldError || body?.title || fallback);
    this.refresh();
  }

  /** Server rules (entitlement, limits) + local styles. */
  private mergeTypes(rows: Row[]): LeaveTypeConfig[] {
    const num = (v: unknown) => (v === null || v === undefined || v === '' ? null : Number(v));
    return LEAVE_TYPES.map((local) => {
      const row = rows.find((r) => r['code'] === local.key);
      if (!row) return local;
      return {
        ...local,
        label: String(row['label'] ?? local.label),
        short: String(row['shortCode'] ?? local.short),
        description: String(row['description'] ?? local.description),
        entitlement: num(row['annualEntitlement']),
        backdateDays: Number(row['backdateDays'] ?? local.backdateDays),
        maxConsecutive: num(row['maxConsecutive']),
        documentAfterDays: num(row['documentAfterDays']) ?? undefined,
      };
    });
  }

  private fromApi(row: Row): LeaveRequest {
    const text = (key: string) => (row[key] === null || row[key] === undefined ? '' : String(row[key]));
    return {
      id: Number(row['id']),
      type: (text('leaveType') || 'earned') as LeaveTypeKey,
      fromDate: text('fromDate').slice(0, 10),
      toDate: text('toDate').slice(0, 10),
      dayPart: (text('dayPart') || 'full') as DayPart,
      days: Number(row['days'] ?? 0),
      reason: text('reason'),
      status: (text('status') || 'Pending') as LeaveRequest['status'],
      appliedOn: text('appliedAt') || new Date().toISOString(),
      approver: text('approverName') || 'Reporting Manager',
      decisionNote: text('decisionNote') || undefined,
    };
  }

  private save(requests: LeaveRequest[]): void {
    this.requestsSignal.set(requests);
    if (this.onlineSignal()) return; // online data always comes from the API
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

/** Demo history relative to today (mirrors the seed in PeopleHub.sql). */
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
