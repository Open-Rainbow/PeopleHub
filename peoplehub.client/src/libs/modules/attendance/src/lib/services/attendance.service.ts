import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { DEFAULT_ATTENDANCE_POLICY, DEMO_EMPLOYEES, DEMO_HOLIDAYS } from '../config/attendance-options';
import {
  AttendanceActionResult,
  AttendanceDay,
  AttendancePolicy,
  AttendanceTrendPoint,
  Regularization,
  RegularizationDraft,
  RegularizationStatus,
  TeamDayRow,
  WorkMode,
} from '../models/attendance.model';
import { addDays, dayStatus, isLate, isoDate, isoDateTime, parseLocal, pad } from './attendance.utils';

/** Backend: PeopleHub.Server AttendanceController (proxied by proxy.conf.js). */
export const ATTENDANCE_API = '/api/v1/attendance';

const STORE_KEY = 'ph.attendance.v1';
const API_TIMEOUT_MS = 5000;

type Row = Record<string, unknown>;

interface LocalRecord {
  employeeId: string;
  date: string;
  checkInAt: string;
  checkOutAt: string | null;
  workMode: WorkMode;
  source: string;
  note: string;
}

interface LocalStore {
  records: LocalRecord[];
  regularizations: Regularization[];
}

/**
 * Attendance: check in / out, month view, team view and corrections.
 * The first call decides the mode: API when it answers, otherwise demo data in localStorage
 * (same rules as the stored procedures) so the page still works without a backend.
 */
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';
  /** Org clock minus browser clock (ms). */
  private offsetMs = 0;
  private policyCache: AttendancePolicy = DEFAULT_ATTENDANCE_POLICY;

  readonly isOnline = signal(false);

  /** Current organization-local time. */
  now(): Date {
    return new Date(Date.now() + this.offsetMs);
  }

  today(): string {
    return isoDate(this.now());
  }

  async policy(): Promise<AttendancePolicy> {
    const policy = await this.run(
      async () => toPolicy(await this.call(this.http.get<Row>(`${ATTENDANCE_API}/policy`))),
      () => ({ ...DEFAULT_ATTENDANCE_POLICY, serverNow: isoDateTime(new Date()) }),
    );
    if (policy.serverNow) this.offsetMs = parseLocal(policy.serverNow).getTime() - Date.now();
    this.policyCache = policy;
    return policy;
  }

  async days(employeeId: string, from: string, to: string): Promise<AttendanceDay[]> {
    const params = new HttpParams().set('employeeId', employeeId).set('from', from).set('to', to);
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${ATTENDANCE_API}/days`, { params }))).map(toDay),
      () => this.localDays(employeeId, from, to),
    );
  }

  async checkIn(employeeId: string, workMode: WorkMode, note: string): Promise<AttendanceActionResult> {
    return this.run(
      async () => toAction(await this.call(this.http.post<Row>(`${ATTENDANCE_API}/check-in`, { employeeId, workMode, note: note.trim() || null }))),
      () => {
        const store = this.read();
        const now = this.now();
        const today = isoDate(now);
        if (store.records.some((r) => r.employeeId === employeeId && r.date === today)) throw new Error('You have already checked in today.');
        store.records.push({ employeeId, date: today, checkInAt: isoDateTime(now), checkOutAt: null, workMode, source: 'Web', note: note.trim() });
        this.write(store);
        return { message: `Checked in at ${pad(now.getHours())}:${pad(now.getMinutes())}.`, today: this.localDays(employeeId, today, today)[0] };
      },
    );
  }

  async checkOut(employeeId: string, note: string): Promise<AttendanceActionResult> {
    return this.run(
      async () => toAction(await this.call(this.http.post<Row>(`${ATTENDANCE_API}/check-out`, { employeeId, note: note.trim() || null }))),
      () => {
        const store = this.read();
        const now = this.now();
        const today = isoDate(now);
        const rec = store.records.find((r) => r.employeeId === employeeId && r.date === today);
        if (!rec) throw new Error('Check in first.');
        if (rec.checkOutAt) throw new Error('You have already checked out today.');
        rec.checkOutAt = isoDateTime(now);
        if (note.trim()) rec.note = note.trim();
        this.write(store);
        const minutes = Math.max(0, Math.round((now.getTime() - parseLocal(rec.checkInAt).getTime()) / 60000));
        return { message: `Checked out. ${Math.floor(minutes / 60)}h ${minutes % 60}m today.`, today: this.localDays(employeeId, today, today)[0] };
      },
    );
  }

  async team(date: string, search: string): Promise<TeamDayRow[]> {
    let params = new HttpParams().set('date', date);
    if (search.trim()) params = params.set('search', search.trim());
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${ATTENDANCE_API}/team`, { params }))).map(toTeamRow),
      () => {
        const q = search.trim().toLowerCase();
        return DEMO_EMPLOYEES.filter(
          (e) => !q || e.employeeName.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q) || e.department.toLowerCase().includes(q),
        )
          .map((e) => {
            const d = this.localDays(e.employeeId, date, date)[0];
            return { ...e, status: d.status, isLate: d.isLate, checkInAt: d.checkInAt, checkOutAt: d.checkOutAt, workedMinutes: d.workedMinutes, workMode: d.workMode, leaveType: d.leaveType, holidayName: d.holidayName };
          })
          .sort((a, b) => a.employeeName.localeCompare(b.employeeName));
      },
    );
  }

  async trend(from: string, to: string): Promise<AttendanceTrendPoint[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${ATTENDANCE_API}/trend`, { params }))).map(toTrend),
      () => {
        const all = DEMO_EMPLOYEES.map((e) => this.localDays(e.employeeId, from, to));
        return all[0].map((first, i) => {
          const day = all.map((list) => list[i]);
          const count = (fn: (d: AttendanceDay) => boolean) => day.filter(fn).length;
          return {
            date: first.date,
            present: count((d) => ['Present', 'Half day', 'Short day', 'Working', 'Missed check-out'].includes(d.status)),
            late: count((d) => d.isLate),
            remote: count((d) => d.workMode === 'Remote'),
            onLeave: count((d) => d.status === 'On leave'),
            absent: count((d) => d.status === 'Absent' || d.status === 'Not checked in'),
            isOffDay: day.some((d) => d.status === 'Weekend' || d.status === 'Holiday'),
          };
        });
      },
    );
  }

  async regularizations(employeeId: string | null, status: 'All' | RegularizationStatus = 'All'): Promise<Regularization[]> {
    let params = new HttpParams().set('status', status);
    if (employeeId) params = params.set('employeeId', employeeId);
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${ATTENDANCE_API}/regularizations`, { params }))).map(toRegularization),
      () =>
        this.read()
          .regularizations.filter((r) => (!employeeId || r.employeeId === employeeId) && (status === 'All' || r.status === status))
          .sort((a, b) => Number(b.status === 'Pending') - Number(a.status === 'Pending') || b.workDate.localeCompare(a.workDate) || b.id - a.id),
    );
  }

  async requestRegularization(employeeId: string, draft: RegularizationDraft): Promise<Regularization> {
    const body = { employeeId, workDate: draft.workDate, checkIn: draft.checkIn, checkOut: draft.checkOut, workMode: draft.workMode, reason: draft.reason.trim() };
    return this.run(
      async () => toRegularization(await this.call(this.http.post<Row>(`${ATTENDANCE_API}/regularizations`, body))),
      () => {
        const store = this.read();
        if (store.regularizations.some((r) => r.employeeId === employeeId && r.workDate === draft.workDate && r.status === 'Pending'))
          throw new Error('There is already a pending correction for this day.');
        const emp = DEMO_EMPLOYEES.find((e) => e.employeeId === employeeId);
        const approver = DEMO_EMPLOYEES.find((e) => e.employeeId === 'EMP00004');
        const saved: Regularization = {
          id: store.regularizations.reduce((m, r) => Math.max(m, r.id), 0) + 1,
          employeeId,
          employeeName: emp?.employeeName ?? employeeId,
          workDate: draft.workDate,
          checkIn: draft.checkIn,
          checkOut: draft.checkOut,
          workMode: draft.workMode,
          reason: draft.reason.trim(),
          status: 'Pending',
          approverId: approver?.employeeId ?? '',
          approverName: approver?.employeeName ?? '',
          decisionNote: '',
          requestedAt: isoDateTime(this.now()),
        };
        store.regularizations.push(saved);
        this.write(store);
        return saved;
      },
    );
  }

  async decide(id: number, approve: boolean, note: string, approverId: string): Promise<Regularization> {
    return this.run(
      async () =>
        toRegularization(await this.call(this.http.post<Row>(`${ATTENDANCE_API}/regularizations/${id}/decision`, { approve, note: note.trim() || null, approverId }))),
      () => {
        const store = this.read();
        const reg = store.regularizations.find((r) => r.id === id);
        if (!reg) throw new Error('This request no longer exists.');
        if (reg.status !== 'Pending') throw new Error('This request has already been decided.');
        if (!approve && !note.trim()) throw new Error('Add a note when rejecting a request.');
        reg.status = approve ? 'Approved' : 'Rejected';
        reg.decisionNote = note.trim();
        if (approve) {
          const record: LocalRecord = {
            employeeId: reg.employeeId,
            date: reg.workDate,
            checkInAt: `${reg.workDate}T${reg.checkIn}:00`,
            checkOutAt: `${reg.workDate}T${reg.checkOut}:00`,
            workMode: reg.workMode,
            source: 'Regularized',
            note: `Corrected: ${reg.reason}`.slice(0, 200),
          };
          store.records = [...store.records.filter((r) => !(r.employeeId === reg.employeeId && r.date === reg.workDate)), record];
        }
        this.write(store);
        return { ...reg };
      },
    );
  }

  async cancel(id: number, employeeId: string): Promise<Regularization> {
    return this.run(
      async () => toRegularization(await this.call(this.http.post<Row>(`${ATTENDANCE_API}/regularizations/${id}/cancel`, { employeeId }))),
      () => {
        const store = this.read();
        const reg = store.regularizations.find((r) => r.id === id && r.employeeId === employeeId);
        if (!reg) throw new Error('This request no longer exists.');
        if (reg.status !== 'Pending') throw new Error('Only pending requests can be withdrawn.');
        reg.status = 'Cancelled';
        this.write(store);
        return { ...reg };
      },
    );
  }

  resetDemoData(): void {
    this.write(seed(this.today()));
  }

  private localDays(employeeId: string, from: string, to: string): AttendanceDay[] {
    const store = this.read();
    const now = this.now();
    const today = isoDate(now);
    const policy = this.policyCache;
    const out: AttendanceDay[] = [];
    for (let date = from; date <= to; date = addDays(date, 1)) {
      const rec = store.records.find((r) => r.employeeId === employeeId && r.date === date);
      const worked = rec
        ? rec.checkOutAt
          ? Math.round((parseLocal(rec.checkOutAt).getTime() - parseLocal(rec.checkInAt).getTime()) / 60000)
          : date === today
            ? Math.max(0, Math.round((now.getTime() - parseLocal(rec.checkInAt).getTime()) / 60000))
            : null
        : null;
      const holiday = DEMO_HOLIDAYS[date];
      out.push({
        date,
        status: dayStatus(date, today, rec, worked, policy, holiday),
        isLate: rec ? isLate(rec.checkInAt, policy) : false,
        checkInAt: rec?.checkInAt ?? null,
        checkOutAt: rec?.checkOutAt ?? null,
        workedMinutes: worked,
        workMode: rec?.workMode ?? null,
        source: rec?.source ?? null,
        note: rec?.note ?? '',
        holidayName: holiday ?? '',
        leaveType: '',
        isHalfDayLeave: false,
      });
    }
    return out;
  }

  private async run<T>(api: () => Promise<T>, local: () => T): Promise<T> {
    if (this.mode !== 'local') {
      try {
        const result = await api();
        this.setMode('api');
        return result;
      } catch (error) {
        if (this.mode === 'unknown' && unreachable(error)) {
          this.setMode('local');
        } else {
          this.setMode('api');
          throw new Error(readableError(error));
        }
      }
    }
    return local();
  }

  private setMode(mode: 'api' | 'local'): void {
    this.mode = mode;
    this.isOnline.set(mode === 'api');
  }

  private call<T>(request: Observable<T>): Promise<T> {
    return firstValueFrom(request.pipe(timeout(API_TIMEOUT_MS)));
  }

  private read(): LocalStore {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as LocalStore) : null;
      if (parsed && Array.isArray(parsed.records) && Array.isArray(parsed.regularizations)) return parsed;
    } catch {
      // fall through to seed
    }
    const fresh = seed(this.today());
    this.write(fresh);
    return fresh;
  }

  private write(store: LocalStore): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {
      // storage blocked
    }
  }
}

/** Same deterministic pattern as the SQL seed: last 30 days, weekends and holidays skipped. */
function seed(today: string): LocalStore {
  const records: LocalRecord[] = [];
  DEMO_EMPLOYEES.forEach((emp, index) => {
    const e = index + 1;
    for (let k = 1; k <= 30; k++) {
      const date = addDays(today, -k);
      const day = parseLocal(date).getDay();
      if (day === 0 || day === 6 || DEMO_HOLIDAYS[date]) continue;
      if ((e * 3 + k) % 17 === 0) continue;
      const inMin = 540 + ((e * 37 + k * 11) % 50);
      const worked = (e + k) % 13 === 0 ? 300 : 480 + ((e * 13 + k * 7) % 90);
      records.push({
        employeeId: emp.employeeId,
        date,
        checkInAt: at(date, inMin),
        checkOutAt: at(date, inMin + worked),
        workMode: (e + k) % 5 === 0 ? 'Remote' : 'Office',
        source: 'Seed',
        note: '',
      });
    }
  });
  // The demo user forgot to check out on their second most recent working day.
  const missed = records.filter((r) => r.employeeId === 'EMP00001')[1];
  if (missed) missed.checkOutAt = null;
  const regularizations: Regularization[] = missed
    ? [{
        id: 1,
        employeeId: 'EMP00001',
        employeeName: DEMO_EMPLOYEES[0].employeeName,
        workDate: missed.date,
        checkIn: missed.checkInAt.slice(11, 16),
        checkOut: '18:45',
        workMode: missed.workMode,
        reason: 'Forgot to check out before leaving.',
        status: 'Pending',
        approverId: 'EMP00004',
        approverName: DEMO_EMPLOYEES[3].employeeName,
        decisionNote: '',
        requestedAt: `${missed.date}T19:30:00`,
      }]
    : [];
  return { records, regularizations };
}

function at(date: string, minutes: number): string {
  return `${date}T${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}:00`;
}

const text = (v: unknown) => (v === null || v === undefined ? '' : String(v));
const nullableText = (v: unknown) => (v === null || v === undefined || v === '' ? null : String(v));
const num = (v: unknown, fallback = 0) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? fallback : Number(v));
const toMode = (v: unknown): WorkMode | null => (v === 'Remote' ? 'Remote' : v === 'Office' ? 'Office' : null);

export function toPolicy(row: Row): AttendancePolicy {
  return {
    shiftStart: text(row['shiftStart']) || DEFAULT_ATTENDANCE_POLICY.shiftStart,
    shiftEnd: text(row['shiftEnd']) || DEFAULT_ATTENDANCE_POLICY.shiftEnd,
    graceMinutes: num(row['graceMinutes'], DEFAULT_ATTENDANCE_POLICY.graceMinutes),
    fullDayHours: num(row['fullDayHours'], DEFAULT_ATTENDANCE_POLICY.fullDayHours),
    halfDayHours: num(row['halfDayHours'], DEFAULT_ATTENDANCE_POLICY.halfDayHours),
    regularizeDays: num(row['regularizeDays'], DEFAULT_ATTENDANCE_POLICY.regularizeDays),
    timeZone: text(row['timeZone']) || DEFAULT_ATTENDANCE_POLICY.timeZone,
    serverNow: text(row['serverNow']).slice(0, 19),
  };
}

export function toDay(row: Row): AttendanceDay {
  const worked = row['workedMinutes'];
  return {
    date: text(row['date']).slice(0, 10),
    status: (text(row['status']) || 'Absent') as AttendanceDay['status'],
    isLate: row['isLate'] === true,
    checkInAt: nullableText(row['checkInAt'])?.slice(0, 19) ?? null,
    checkOutAt: nullableText(row['checkOutAt'])?.slice(0, 19) ?? null,
    workedMinutes: worked === null || worked === undefined ? null : num(worked),
    workMode: toMode(row['workMode']),
    source: nullableText(row['source']),
    note: text(row['note']),
    holidayName: text(row['holidayName']),
    leaveType: text(row['leaveType']),
    isHalfDayLeave: row['isHalfDayLeave'] === true,
  };
}

function toAction(row: Row): AttendanceActionResult {
  const today = row['today'] as Row | null | undefined;
  return { message: text(row['message']), today: today ? toDay(today) : null };
}

export function toTeamRow(row: Row): TeamDayRow {
  const d = toDay(row);
  return {
    employeeId: text(row['employeeId']),
    employeeName: text(row['employeeName']),
    department: text(row['department']),
    designation: text(row['designation']),
    status: d.status,
    isLate: d.isLate,
    checkInAt: d.checkInAt,
    checkOutAt: d.checkOutAt,
    workedMinutes: d.workedMinutes,
    workMode: d.workMode,
    leaveType: d.leaveType,
    holidayName: d.holidayName,
  };
}

export function toTrend(row: Row): AttendanceTrendPoint {
  return {
    date: text(row['date']).slice(0, 10),
    present: num(row['present']),
    late: num(row['late']),
    remote: num(row['remote']),
    onLeave: num(row['onLeave']),
    absent: num(row['absent']),
    isOffDay: row['isOffDay'] === true,
  };
}

export function toRegularization(row: Row): Regularization {
  return {
    id: num(row['id']),
    employeeId: text(row['employeeId']),
    employeeName: text(row['employeeName']),
    workDate: text(row['workDate']).slice(0, 10),
    checkIn: text(row['checkIn']).slice(0, 5),
    checkOut: text(row['checkOut']).slice(0, 5),
    workMode: toMode(row['workMode']) ?? 'Office',
    reason: text(row['reason']),
    status: (text(row['status']) || 'Pending') as RegularizationStatus,
    approverId: text(row['approverId']),
    approverName: text(row['approverName']),
    decisionNote: text(row['decisionNote']),
    requestedAt: text(row['requestedAt']).slice(0, 19),
  };
}

function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true;
  return error.status === 0 || error.status === 404 || error.status >= 500;
}

function readableError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const b = error.error as { detail?: string; title?: string; errors?: Record<string, string[]> } | null;
    const first = b?.errors ? Object.values(b.errors)[0]?.[0] : undefined;
    return first || b?.detail || b?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}
