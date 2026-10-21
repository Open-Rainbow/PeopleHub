import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {
  AdminEmployee,
  AdminEmployeesQuery,
  AdminFilters,
  AdminHistoryItem,
  AdminLeaveRequest,
  AdminRequestsQuery,
  AdminRequestsResult,
} from '../models/leave-admin.model';
import { LeaveStatus } from '../models/leave-request.model';
import { LEAVE_TYPES, WFH_CODE } from '../config/leave-policy';
import { addDaysIso, todayIso, workingDays } from '../utils/leave-date.utils';
import { LEAVE_API } from './leave.service';

export const LEAVE_ADMIN_API = `${LEAVE_API}/admin`;

const STORE_KEY = 'ph.leave.admin.v1';
const API_TIMEOUT_MS = 8000;
const NEW_WITHIN_MS = 48 * 3_600_000;

type Row = Record<string, unknown>;

/**
 * Leaves & WFH dashboard data (HR / admin).
 * API first (LeaveAdminController); when the API is not reachable the page runs on local demo data.
 */
@Injectable({ providedIn: 'root' })
export class LeaveAdminService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  filters(): Promise<AdminFilters> {
    return this.run(
      async () => {
        const row = await this.call(this.http.get<Row>(`${LEAVE_ADMIN_API}/filters`));
        return {
          headcount: Number(row['headcount'] ?? 0),
          departments: ((row['departments'] as Row[]) ?? []).map((d) => ({ department: text(d['department']), headcount: Number(d['headcount'] ?? 0) })),
          leaveTypes: ((row['leaveTypes'] as Row[]) ?? []).map((t) => ({
            code: text(t['code']), label: text(t['label']), category: text(t['category']) || 'standard', isPaid: t['isPaid'] !== false,
          })),
        };
      },
      () => {
        const store = this.read();
        const depts = [...new Set(store.employees.map((e) => e.department))].sort();
        return {
          headcount: store.employees.length,
          departments: depts.map((d) => ({ department: d, headcount: store.employees.filter((e) => e.department === d).length })),
          leaveTypes: LEAVE_TYPES.map((t) => ({ code: t.key, label: t.label, category: t.category ?? 'standard', isPaid: t.isPaid !== false })),
        };
      },
    );
  }

  requests(q: AdminRequestsQuery): Promise<AdminRequestsResult> {
    return this.run(
      async () => {
        let params = new HttpParams().set('from', q.from).set('to', q.to);
        if (q.department) params = params.set('department', q.department);
        if (q.leaveType) params = params.set('leaveType', q.leaveType);
        if (q.status && q.status !== 'All') params = params.set('status', q.status);
        if (q.search?.trim()) params = params.set('search', q.search.trim());
        const row = await this.call(this.http.get<Row>(`${LEAVE_ADMIN_API}/requests`, { params }));
        return {
          from: text(row['from']).slice(0, 10),
          to: text(row['to']).slice(0, 10),
          referenceDate: text(row['referenceDate']).slice(0, 10),
          headcount: Number(row['headcount'] ?? 0),
          items: ((row['items'] as Row[]) ?? []).map(toRequest),
        };
      },
      () => {
        const store = this.read();
        const now = Date.now();
        let items = store.requests
          .filter((r) => r.fromDate <= q.to && r.toDate >= q.from)
          .filter((r) => !q.department || r.department === q.department)
          .filter((r) => !q.leaveType || r.leaveType === q.leaveType)
          .map((r) => ({ ...r, isNew: r.status === 'Pending' && now - new Date(r.appliedAt).getTime() <= NEW_WITHIN_MS }));
        if (q.status === 'New') items = items.filter((r) => r.isNew);
        else if (q.status && q.status !== 'All') items = items.filter((r) => r.status === q.status);
        const s = q.search?.trim().toLowerCase();
        if (s) items = items.filter((r) => [r.employeeName, r.employeeId, r.designation, r.department, r.leaveTypeLabel, r.reason].some((v) => v.toLowerCase().includes(s)));
        const today = todayIso();
        return {
          from: q.from,
          to: q.to,
          referenceDate: today >= q.from && today <= q.to ? today : q.to,
          headcount: store.employees.filter((e) => !q.department || e.department === q.department).length,
          items: items.sort((a, b) => b.appliedAt.localeCompare(a.appliedAt)),
        };
      },
    );
  }

  employees(q: AdminEmployeesQuery): Promise<AdminEmployee[]> {
    return this.run(
      async () => {
        let params = new HttpParams().set('from', q.from).set('to', q.to).set('ignorePeriod', String(q.ignorePeriod));
        if (q.department) params = params.set('department', q.department);
        if (q.search?.trim()) params = params.set('search', q.search.trim());
        const rows = await this.call(this.http.get<Row[]>(`${LEAVE_ADMIN_API}/employees`, { params }));
        return rows.map(toEmployee);
      },
      () => {
        const store = this.read();
        const year = q.to.slice(0, 4);
        const from = q.ignorePeriod ? `${year}-01-01` : q.from;
        const to = q.ignorePeriod ? `${year}-12-31` : q.to;
        const s = q.search?.trim().toLowerCase();
        return store.employees
          .filter((e) => !q.department || e.department === q.department)
          .filter((e) => !s || [e.name, e.code, e.designation].some((v) => v.toLowerCase().includes(s)))
          .map((e) => {
            const mine = store.requests.filter((r) => r.employeeId === e.code && r.fromDate >= from && r.fromDate <= to);
            const balances = LEAVE_TYPES.map((t) => {
              const used = mine.filter((r) => r.leaveType === t.key && r.status === 'Approved').reduce((n, r) => n + r.days, 0);
              const pending = mine.filter((r) => r.leaveType === t.key && r.status === 'Pending').reduce((n, r) => n + r.days, 0);
              return { leaveType: t.key, label: t.label, total: t.entitlement, used, pending, left: t.entitlement === null ? null : Math.max(t.entitlement - used - pending, 0) };
            });
            const counted = balances.filter((b) => b.total !== null && b.leaveType !== WFH_CODE);
            const total = counted.reduce((n, b) => n + (b.total ?? 0), 0);
            const used = counted.reduce((n, b) => n + b.used, 0);
            return {
              employeeId: e.code,
              employeeName: e.name,
              designation: e.designation,
              department: e.department,
              totalDays: total,
              usedDays: used,
              pendingDays: counted.reduce((n, b) => n + b.pending, 0),
              availableDays: counted.reduce((n, b) => n + (b.left ?? 0), 0),
              utilizationPercent: total ? Math.round((used / total) * 100) : 0,
              balances,
            };
          })
          .sort((a, b) => a.employeeName.localeCompare(b.employeeName));
      },
    );
  }

  /** Every leave of one employee (newest first). */
  history(employeeId: string): Promise<AdminHistoryItem[]> {
    return this.run(
      async () => {
        const rows = await this.call(this.http.get<Row[]>(`${LEAVE_API}/requests?employeeId=${encodeURIComponent(employeeId)}`));
        return rows.map((r) => ({
          id: Number(r['id']),
          leaveType: text(r['leaveType']),
          label: text(r['leaveTypeLabel']),
          fromDate: text(r['fromDate']).slice(0, 10),
          toDate: text(r['toDate']).slice(0, 10),
          days: Number(r['days'] ?? 0),
          reason: text(r['reason']),
          status: (text(r['status']) || 'Pending') as LeaveStatus,
        }));
      },
      () => this.read().requests
        .filter((r) => r.employeeId === employeeId)
        .sort((a, b) => b.fromDate.localeCompare(a.fromDate))
        .map((r) => ({ id: r.id, leaveType: r.leaveType, label: r.leaveTypeLabel, fromDate: r.fromDate, toDate: r.toDate, days: r.days, reason: r.reason, status: r.status })),
    );
  }

  /** Approve or reject a pending request. A note is required to reject. */
  decide(id: number, approve: boolean, note: string): Promise<void> {
    return this.run(
      async () => {
        await this.call(this.http.post<Row>(`${LEAVE_API}/requests/${id}/decision`, { approve, note: note.trim() || null }));
      },
      () => {
        const store = this.read();
        const r = store.requests.find((x) => x.id === id);
        if (!r) throw new Error('This request no longer exists.');
        if (r.status !== 'Pending') throw new Error('This request has already been decided.');
        if (!approve && !note.trim()) throw new Error('Add a note when rejecting a request.');
        r.status = approve ? 'Approved' : 'Rejected';
        r.decisionNote = note.trim() || null;
        r.decidedAt = new Date().toISOString();
        r.approverName = 'You';
        this.write(store);
      },
    );
  }

  resetDemoData(): void {
    this.write(seedStore());
  }

  private async run<T>(api: () => Promise<T>, local: () => T): Promise<T> {
    if (this.mode !== 'local') {
      try {
        const result = await api();
        this.setMode('api');
        return result;
      } catch (error) {
        if (this.mode === 'unknown' && unreachable(error)) this.setMode('local');
        else {
          this.setMode('api');
          throw new Error(readableError(error));
        }
      }
    }
    try {
      return local();
    } catch (error) {
      throw new Error(readableError(error));
    }
  }

  private setMode(mode: 'api' | 'local'): void {
    this.mode = mode;
    this.isOnline.set(mode === 'api');
  }

  private call<T>(request: Observable<T>): Promise<T> {
    return firstValueFrom(request.pipe(timeout(API_TIMEOUT_MS)));
  }

  private read(): DemoStore {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as DemoStore;
        if (parsed?.requests?.length && parsed.seededOn === todayIso().slice(0, 7)) return parsed;
      }
    } catch {
      // fall through
    }
    const fresh = seedStore();
    this.write(fresh);
    return fresh;
  }

  private write(store: DemoStore): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {
      // storage blocked
    }
  }
}

// ---- mapping ----------------------------------------------------------------------------------

const text = (v: unknown): string => (v === null || v === undefined ? '' : String(v));
const num = (v: unknown): number | null => (v === null || v === undefined || v === '' ? null : Number(v));

function toRequest(r: Row): AdminLeaveRequest {
  return {
    id: Number(r['id']),
    employeeId: text(r['employeeId']),
    employeeName: text(r['employeeName']),
    designation: text(r['designation']),
    department: text(r['department']) || 'Unassigned',
    leaveType: text(r['leaveType']),
    leaveTypeLabel: text(r['leaveTypeLabel']),
    category: text(r['category']) || 'standard',
    isPaid: r['isPaid'] !== false,
    fromDate: text(r['fromDate']).slice(0, 10),
    toDate: text(r['toDate']).slice(0, 10),
    dayPart: text(r['dayPart']) || 'full',
    days: Number(r['days'] ?? 0),
    reason: text(r['reason']),
    status: (text(r['status']) || 'Pending') as LeaveStatus,
    appliedAt: text(r['appliedAt']),
    decidedAt: text(r['decidedAt']) || null,
    approverName: text(r['approverName']) || null,
    decisionNote: text(r['decisionNote']) || null,
    isNew: r['isNew'] === true,
  };
}

function toEmployee(r: Row): AdminEmployee {
  return {
    employeeId: text(r['employeeId']),
    employeeName: text(r['employeeName']),
    designation: text(r['designation']),
    department: text(r['department']) || 'Unassigned',
    totalDays: Number(r['totalDays'] ?? 0),
    usedDays: Number(r['usedDays'] ?? 0),
    pendingDays: Number(r['pendingDays'] ?? 0),
    availableDays: Number(r['availableDays'] ?? 0),
    utilizationPercent: Number(r['utilizationPercent'] ?? 0),
    balances: ((r['balances'] as Row[]) ?? []).map((b) => ({
      leaveType: text(b['leaveType']),
      label: text(b['label']),
      total: num(b['total']),
      used: Number(b['used'] ?? 0),
      pending: Number(b['pending'] ?? 0),
      left: num(b['left']),
    })),
  };
}

function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true;
  return error.status === 0 || error.status === 404 || error.status >= 500;
}

function readableError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as { detail?: string; title?: string; errors?: Record<string, string[]> } | null;
    const firstField = body?.errors ? Object.values(body.errors)[0]?.[0] : undefined;
    return firstField || body?.detail || body?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}

// ---- offline demo data ------------------------------------------------------------------------

interface DemoEmployee {
  code: string;
  name: string;
  designation: string;
  department: string;
}

interface DemoStore {
  seededOn: string;
  employees: DemoEmployee[];
  requests: AdminLeaveRequest[];
}

const DEMO_EMPLOYEES: DemoEmployee[] = [
  { code: 'EMP00001', name: 'Arjun Mehta', designation: 'Senior Frontend Engineer', department: 'Engineering' },
  { code: 'EMP00002', name: 'Priya Sharma', designation: 'Product Designer', department: 'Design' },
  { code: 'EMP00003', name: 'Rahul Gupta', designation: 'Marketing Lead', department: 'Marketing' },
  { code: 'EMP00004', name: 'Sneha Patel', designation: 'Backend Engineer', department: 'Engineering' },
  { code: 'EMP00005', name: 'Divya Krishnan', designation: 'Operations Manager', department: 'Operations' },
  { code: 'EMP00006', name: 'Anjali Nair', designation: 'Financial Analyst', department: 'Finance' },
  { code: 'EMP00007', name: 'Meera Joshi', designation: 'UX Researcher', department: 'Design' },
  { code: 'EMP00008', name: 'Karan Singh', designation: 'Sales Executive', department: 'Sales' },
  { code: 'EMP00009', name: 'Neha Verma', designation: 'HR Generalist', department: 'HR' },
  { code: 'EMP00010', name: 'Vikram Rao', designation: 'DevOps Engineer', department: 'Engineering' },
  { code: 'EMP00011', name: 'Aditya Kumar', designation: 'Account Manager', department: 'Sales' },
  { code: 'EMP00012', name: 'Kavya Iyer', designation: 'QA Engineer', department: 'Engineering' },
];

const REASONS: Record<string, string[]> = {
  casual: ['Family function', 'Bank work', 'Personal errand', 'Passport appointment'],
  sick: ['Fever and cold', 'Migraine', 'Doctor appointment', 'Back pain'],
  earned: ['Family trip', 'Holiday travel', 'Wedding in the family', 'Vacation booked'],
  wfh: ['Plumber visit at home', 'Waiting for a delivery', 'Child is unwell', 'Home renovation going on'],
  'comp-off': ['Worked on the release weekend'],
  'loss-of-pay': ['Extended personal leave'],
};

/** About 120 requests spread over the last 9 months and the next 3 weeks (same every time for a month). */
function seedStore(now = new Date()): DemoStore {
  let seed = now.getFullYear() * 100 + now.getMonth() + 1;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  const pick = <T>(list: T[]) => list[Math.floor(rand() * list.length)];
  const today = todayIso(now);
  const typePool = ['casual', 'casual', 'sick', 'sick', 'earned', 'wfh', 'wfh', 'wfh', 'comp-off', 'loss-of-pay'];
  const label = (code: string) => LEAVE_TYPES.find((t) => t.key === code)?.label ?? code;
  const requests: AdminLeaveRequest[] = [];
  let id = 1;
  for (let n = 0; n < 140; n++) {
    const e = pick(DEMO_EMPLOYEES);
    const code = pick(typePool);
    const start = addDaysIso(today, -Math.floor(rand() * 270) + 20);
    const len = code === 'earned' ? 2 + Math.floor(rand() * 4) : code === 'wfh' ? 1 : 1 + Math.floor(rand() * 2);
    const end = addDaysIso(start, len - 1);
    const days = workingDays(start, end);
    if (days === 0) continue;
    if (requests.some((r) => r.employeeId === e.code && r.fromDate <= end && r.toDate >= start)) continue;
    const future = start > today;
    const roll = rand();
    const status: LeaveStatus = future || roll < 0.12 ? (roll < 0.06 && !future ? 'Rejected' : 'Pending') : roll < 0.18 ? 'Rejected' : roll < 0.21 ? 'Cancelled' : 'Approved';
    const applied = new Date(`${start}T09:00:00`);
    applied.setDate(applied.getDate() - 2 - Math.floor(rand() * 10));
    if (applied > now) applied.setTime(now.getTime() - Math.floor(rand() * 72) * 3_600_000);
    requests.push({
      id: id++,
      employeeId: e.code,
      employeeName: e.name,
      designation: e.designation,
      department: e.department,
      leaveType: code,
      leaveTypeLabel: label(code),
      category: LEAVE_TYPES.find((t) => t.key === code)?.category ?? 'standard',
      isPaid: code !== 'loss-of-pay',
      fromDate: start,
      toDate: end,
      dayPart: 'full',
      days,
      reason: pick(REASONS[code] ?? ['Personal work']),
      status,
      appliedAt: applied.toISOString(),
      decidedAt: status === 'Pending' ? null : applied.toISOString(),
      approverName: status === 'Pending' ? null : 'Reporting Manager',
      decisionNote: status === 'Rejected' ? 'Team is short that week' : null,
      isNew: false,
    });
  }
  // A few on today so the "today" cards are not empty.
  for (const [i, code] of [[2, 'sick'], [4, 'wfh'], [9, 'earned'], [11, 'wfh']] as [number, string][]) {
    const e = DEMO_EMPLOYEES[i];
    if (requests.some((r) => r.employeeId === e.code && r.fromDate <= today && r.toDate >= today)) continue;
    requests.push({
      id: id++, employeeId: e.code, employeeName: e.name, designation: e.designation, department: e.department,
      leaveType: code, leaveTypeLabel: label(code), category: 'standard', isPaid: true, fromDate: today, toDate: today,
      dayPart: 'full', days: 1, reason: pick(REASONS[code]), status: 'Approved', appliedAt: new Date(now.getTime() - 86_400_000).toISOString(),
      decidedAt: now.toISOString(), approverName: 'Reporting Manager', decisionNote: null, isNew: false,
    });
  }
  return { seededOn: today.slice(0, 7), employees: DEMO_EMPLOYEES, requests };
}
