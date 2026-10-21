import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {
  EMPLOYEE_STATUSES,
  EmployeeFilters,
  EmployeeListItem,
  EmployeePage,
  EmployeeProfile,
  EmployeeQuery,
  EmployeeStatus,
  EmployeeSummary,
  FilterOption,
  REASON_STATUSES,
  StatusChange,
  StatusHistoryItem,
} from '../../models/employee-directory.model';

/** Backend: PeopleHub.Server EmployeeDirectoryController (proxied by proxy.conf.js). */
export const EMPLOYEES_API = '/api/v1/employees';

const STORE_KEY = 'ph.employee-directory.v1';
const API_TIMEOUT_MS = 8000;

type Row = Record<string, unknown>;

interface LocalEmployee extends EmployeeProfile {
  isDeleted: boolean;
}

interface LocalHistory extends StatusHistoryItem {
  employeeCode: string;
}

interface LocalStore {
  nextHistoryId: number;
  employees: LocalEmployee[];
  history: LocalHistory[];
}

/**
 * Employee directory. API first; when the API is not reachable the screen keeps working on demo data
 * in localStorage (same rules as the stored procedures in database/employees.sql).
 */
@Injectable({ providedIn: 'root' })
export class EmployeeDirectoryService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  async list(q: EmployeeQuery): Promise<EmployeePage> {
    return this.run(
      async () => {
        const r = await this.call(this.http.get<Row>(EMPLOYEES_API, { params: toParams(q) }));
        return {
          items: (Array.isArray(r['items']) ? (r['items'] as Row[]) : []).map(toListItem),
          total: num(r['total']),
          page: num(r['page']) || 1,
          pageSize: num(r['pageSize']) || q.pageSize,
        };
      },
      () => {
        const rows = sortRows(this.filtered(q), q);
        const pages = Math.max(1, Math.ceil(rows.length / q.pageSize));
        const page = Math.min(Math.max(1, q.page), pages);
        return {
          items: rows.slice((page - 1) * q.pageSize, page * q.pageSize).map(toListItem as (e: LocalEmployee) => EmployeeListItem),
          total: rows.length,
          page,
          pageSize: q.pageSize,
        };
      },
    );
  }

  async summary(): Promise<EmployeeSummary> {
    return this.run(
      async () => toSummary(await this.call(this.http.get<Row>(`${EMPLOYEES_API}/summary`))),
      () => {
        const all = this.live();
        const count = (s: EmployeeStatus) => all.filter((e) => e.status === s).length;
        const current = all.filter((e) => e.status !== 'Exited');
        const since = new Date();
        since.setDate(since.getDate() - 30);
        const sinceIso = isoDate(since);
        return {
          total: current.length,
          active: count('Active'),
          onboarding: count('Onboarding'),
          probation: count('Probation'),
          noticePeriod: count('Notice Period'),
          onLeave: count('On Leave'),
          inactive: count('Inactive'),
          exited: count('Exited'),
          joinedLast30Days: current.filter((e) => !!e.dateOfJoining && e.dateOfJoining >= sinceIso).length,
          departments: new Set(current.map((e) => e.department).filter(Boolean)).size,
        };
      },
    );
  }

  async filters(): Promise<EmployeeFilters> {
    return this.run(
      async () => {
        const r = await this.call(this.http.get<Row>(`${EMPLOYEES_API}/filters`));
        const list = (k: string) => (Array.isArray(r[k]) ? (r[k] as Row[]) : []).map(toFilter);
        return { departments: list('departments'), locations: list('locations'), types: list('types'), statuses: list('statuses'), managers: list('managers') };
      },
      () => {
        const all = this.live();
        const current = all.filter((e) => e.status !== 'Exited');
        const group = (kind: string, rows: LocalEmployee[], value: (e: LocalEmployee) => string | null, label?: (e: LocalEmployee) => string | null) => {
          const map = new Map<string, FilterOption>();
          rows.forEach((e) => {
            const v = value(e);
            if (!v) return;
            const l = label ? label(e) : v;
            if (!l) return;
            const item = map.get(v) ?? { kind, value: v, label: l, count: 0 };
            item.count += 1;
            map.set(v, item);
          });
          return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
        };
        return {
          departments: group('department', current, (e) => e.department),
          locations: group('location', current, (e) => e.workLocation),
          types: group('type', current, (e) => e.employeeType),
          statuses: group('status', all, (e) => e.status),
          managers: group('manager', current, (e) => e.managerCode, (e) => e.managerName),
        };
      },
    );
  }

  async profile(code: string): Promise<EmployeeProfile> {
    return this.run(
      async () => toProfile(await this.call(this.http.get<Row>(`${EMPLOYEES_API}/${encodeURIComponent(code)}`))),
      () => {
        const e = this.live().find((x) => x.employeeCode === code);
        if (!e) throw new Error('This employee was not found.');
        const { isDeleted: _deleted, ...profile } = e;
        return profile;
      },
    );
  }

  async history(code: string): Promise<StatusHistoryItem[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${EMPLOYEES_API}/${encodeURIComponent(code)}/status-history`))).map(toHistory),
      () =>
        this.read()
          .history.filter((h) => h.employeeCode === code)
          .sort((a, b) => b.changedAt.localeCompare(a.changedAt) || b.id - a.id)
          .map(({ employeeCode: _code, ...h }) => h),
    );
  }

  async setStatus(code: string, change: StatusChange): Promise<EmployeeProfile> {
    const body = { status: change.status, reason: change.reason.trim() || null, effectiveDate: change.effectiveDate || null };
    return this.run(
      async () => toProfile(await this.call(this.http.post<Row>(`${EMPLOYEES_API}/${encodeURIComponent(code)}/status`, body))),
      () => {
        const store = this.read();
        const e = store.employees.find((x) => x.employeeCode === code && !x.isDeleted);
        if (!e) throw new Error('This employee was not found.');
        if (e.status === change.status) throw new Error('The employee already has this status.');
        if (REASON_STATUSES.includes(change.status) && !change.reason.trim()) throw new Error('Give a reason for this change.');
        if (REASON_STATUSES.includes(change.status) && this.leadsTeam(store, code))
          throw new Error('This person still manages a team. Move the team to another manager first.');
        store.history.push({
          id: store.nextHistoryId++, employeeCode: code, oldStatus: e.status, newStatus: change.status, reason: change.reason.trim() || null,
          effectiveDate: change.effectiveDate || isoDate(new Date()), changedAt: nowIso(), changedBy: 'you',
        });
        e.status = change.status;
        this.recount(store);
        this.write(store);
        const { isDeleted: _deleted, ...profile } = e;
        return profile;
      },
    );
  }

  async remove(code: string): Promise<void> {
    await this.run(
      async () => {
        await this.call(this.http.delete(`${EMPLOYEES_API}/${encodeURIComponent(code)}`));
      },
      () => {
        const store = this.read();
        const e = store.employees.find((x) => x.employeeCode === code && !x.isDeleted);
        if (!e) throw new Error('This employee was not found.');
        if (this.leadsTeam(store, code)) throw new Error('This person still manages a team. Move the team to another manager first.');
        e.isDeleted = true;
        store.history.push({
          id: store.nextHistoryId++, employeeCode: code, oldStatus: e.status, newStatus: 'Deleted', reason: 'Removed from the directory',
          effectiveDate: isoDate(new Date()), changedAt: nowIso(), changedBy: 'you',
        });
        this.recount(store);
        this.write(store);
      },
    );
  }

  /** CSV of every row that matches the filters (not just the current page). */
  async exportCsv(q: EmployeeQuery): Promise<Blob> {
    return this.run(
      async () => this.call(this.http.get(`${EMPLOYEES_API}/export`, { params: toParams({ ...q, page: 1 }), responseType: 'blob' })),
      () => new Blob(['\ufeff' + toCsv(sortRows(this.filtered(q), q))], { type: 'text/csv' }),
    );
  }

  // ---- Demo store -----------------------------------------------------------------------------

  private live(): LocalEmployee[] {
    return this.read().employees.filter((e) => !e.isDeleted);
  }

  private filtered(q: EmployeeQuery): LocalEmployee[] {
    const term = q.search.trim().toLowerCase();
    return this.live().filter(
      (e) =>
        (!term ||
          [e.fullName, e.employeeCode, e.preferredName, e.officeEmail, e.designation, e.mobileNumber].some((v) => (v ?? '').toLowerCase().includes(term))) &&
        (q.status ? e.status === q.status : q.includeExited || e.status !== 'Exited') &&
        (!q.department || e.department === q.department) &&
        (!q.location || e.workLocation === q.location) &&
        (!q.employeeType || e.employeeType === q.employeeType) &&
        (!q.managerCode || e.managerCode === q.managerCode) &&
        (!q.joinedFrom || (!!e.dateOfJoining && e.dateOfJoining >= q.joinedFrom)) &&
        (!q.joinedTo || (!!e.dateOfJoining && e.dateOfJoining <= q.joinedTo)),
    );
  }

  private leadsTeam(store: LocalStore, code: string): boolean {
    return store.employees.some((x) => !x.isDeleted && x.managerCode === code && x.status !== 'Exited' && x.status !== 'Inactive');
  }

  /** Keeps manager names and team sizes right after a change. */
  private recount(store: LocalStore): void {
    const live = store.employees.filter((e) => !e.isDeleted);
    store.employees.forEach((e) => {
      const manager = live.find((m) => m.employeeCode === e.managerCode && m.employeeCode !== e.employeeCode);
      e.managerName = manager?.fullName ?? null;
      e.directReports = live.filter((r) => r.managerCode === e.employeeCode && r.status !== 'Exited' && r.status !== 'Inactive').length;
    });
  }

  // ---- Plumbing -------------------------------------------------------------------------------

  private call<T>(source: Observable<T>): Promise<T> {
    return firstValueFrom(source.pipe(timeout(API_TIMEOUT_MS)));
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
          throw new Error(await readableError(error));
        }
      }
    }
    return local();
  }

  private setMode(mode: 'api' | 'local'): void {
    this.mode = mode;
    this.isOnline.set(mode === 'api');
  }

  private read(): LocalStore {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as LocalStore) : null;
      if (parsed && Array.isArray(parsed.employees) && Array.isArray(parsed.history)) return parsed;
    } catch {
      // fall through to seed
    }
    const fresh = seed();
    this.recount(fresh);
    this.write(fresh);
    return fresh;
  }

  private write(store: LocalStore): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {
      // demo only
    }
  }
}

// ---- Mapping --------------------------------------------------------------------------------

function toParams(q: EmployeeQuery): HttpParams {
  let p = new HttpParams()
    .set('sortBy', q.sortBy)
    .set('sortDir', q.sortDir)
    .set('page', String(q.page))
    .set('pageSize', String(q.pageSize));
  if (q.search.trim()) p = p.set('search', q.search.trim());
  if (q.status) p = p.set('status', q.status);
  if (q.department) p = p.set('department', q.department);
  if (q.location) p = p.set('location', q.location);
  if (q.employeeType) p = p.set('employeeType', q.employeeType);
  if (q.managerCode) p = p.set('managerCode', q.managerCode);
  if (q.joinedFrom) p = p.set('joinedFrom', q.joinedFrom);
  if (q.joinedTo) p = p.set('joinedTo', q.joinedTo);
  if (q.includeExited) p = p.set('includeExited', 'true');
  return p;
}

const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const strOrNull = (v: unknown): string | null => (v == null || v === '' ? null : String(v));
const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);
const dateOrNull = (v: unknown): string | null => (v ? str(v).slice(0, 10) : null);
const status = (v: unknown): EmployeeStatus => (EMPLOYEE_STATUSES.find((s) => s === str(v)) ?? 'Active');

function toListItem(r: Row | LocalEmployee): EmployeeListItem {
  const x = r as Row;
  return {
    id: num(x['id']),
    employeeCode: str(x['employeeCode']),
    fullName: str(x['fullName']),
    preferredName: strOrNull(x['preferredName']),
    designation: strOrNull(x['designation']),
    department: strOrNull(x['department']),
    businessUnit: strOrNull(x['businessUnit']),
    workLocation: strOrNull(x['workLocation']),
    employeeType: strOrNull(x['employeeType']),
    officeEmail: strOrNull(x['officeEmail']),
    mobileNumber: strOrNull(x['mobileNumber']),
    status: status(x['status']),
    dateOfJoining: dateOrNull(x['dateOfJoining']),
    managerCode: strOrNull(x['managerCode']),
    managerName: strOrNull(x['managerName']),
    directReports: num(x['directReports']),
    hasPhoto: !!x['hasPhoto'],
  };
}

function toProfile(r: Row): EmployeeProfile {
  return {
    ...toListItem(r),
    salutation: strOrNull(r['salutation']),
    firstName: strOrNull(r['firstName']),
    middleName: strOrNull(r['middleName']),
    lastName: strOrNull(r['lastName']),
    gender: strOrNull(r['gender']),
    dateOfBirth: dateOrNull(r['dateOfBirth']),
    maritalStatus: strOrNull(r['maritalStatus']),
    bloodGroup: strOrNull(r['bloodGroup']),
    nationality: strOrNull(r['nationality']),
    employmentStatus: strOrNull(r['employmentStatus']),
    payLevel: strOrNull(r['payLevel']),
    shiftTimings: strOrNull(r['shiftTimings']),
    workSchedule: strOrNull(r['workSchedule']),
    probationStartDate: dateOrNull(r['probationStartDate']),
    probationEndDate: dateOrNull(r['probationEndDate']),
    confirmationDate: dateOrNull(r['confirmationDate']),
    hrOwnerCode: strOrNull(r['hrOwnerCode']),
    hrOwnerName: strOrNull(r['hrOwnerName']),
    personalMail: strOrNull(r['personalMail']),
    alternateMail: strOrNull(r['alternateMail']),
    alternateMobile: strOrNull(r['alternateMobile']),
    officialEmail: strOrNull(r['officialEmail']),
    linkedinUrl: strOrNull(r['linkedinUrl']),
    photo: strOrNull(r['photo']),
  };
}

function toSummary(r: Row): EmployeeSummary {
  return {
    total: num(r['total']),
    active: num(r['active']),
    onboarding: num(r['onboarding']),
    probation: num(r['probation']),
    noticePeriod: num(r['noticePeriod']),
    onLeave: num(r['onLeave']),
    inactive: num(r['inactive']),
    exited: num(r['exited']),
    joinedLast30Days: num(r['joinedLast30Days']),
    departments: num(r['departments']),
  };
}

function toFilter(r: Row): FilterOption {
  return { kind: str(r['kind']), value: str(r['value']), label: str(r['label']) || str(r['value']), count: num(r['count']) };
}

function toHistory(r: Row): StatusHistoryItem {
  return {
    id: num(r['id']),
    oldStatus: strOrNull(r['oldStatus']),
    newStatus: str(r['newStatus']),
    reason: strOrNull(r['reason']),
    effectiveDate: dateOrNull(r['effectiveDate']),
    changedAt: str(r['changedAt']),
    changedBy: strOrNull(r['changedBy']),
  };
}

function sortRows(rows: LocalEmployee[], q: EmployeeQuery): LocalEmployee[] {
  const key = (e: LocalEmployee): string => {
    switch (q.sortBy) {
      case 'code': return e.employeeCode;
      case 'designation': return e.designation ?? '';
      case 'department': return e.department ?? '';
      case 'location': return e.workLocation ?? '';
      case 'status': return e.status;
      case 'joined': return e.dateOfJoining ?? '';
      default: return e.fullName;
    }
  };
  const dir = q.sortDir === 'desc' ? -1 : 1;
  return [...rows].sort((a, b) => dir * key(a).localeCompare(key(b)) || a.fullName.localeCompare(b.fullName));
}

function toCsv(rows: EmployeeListItem[]): string {
  const cell = (v: string | null | undefined) => {
    let s = v ?? '';
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const head = 'Employee ID,Name,Designation,Department,Business unit,Location,Type,Status,Date of joining,Manager,Office email,Mobile';
  const lines = rows.map((r) =>
    [
      r.employeeCode, r.fullName, r.designation, r.department, r.businessUnit, r.workLocation, r.employeeType, r.status, r.dateOfJoining,
      r.managerName ? `${r.managerName} (${r.managerCode})` : r.managerCode, r.officeEmail, r.mobileNumber,
    ].map(cell).join(','),
  );
  return [head, ...lines].join('\r\n');
}

function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true;
  return error.status === 0 || error.status === 404 || error.status >= 500;
}

async function readableError(error: unknown): Promise<string> {
  if (error instanceof HttpErrorResponse) {
    let b = error.error as { detail?: string; title?: string; errors?: Record<string, string[]> } | Blob | null;
    if (b instanceof Blob) {
      try {
        b = JSON.parse(await b.text());
      } catch {
        b = null;
      }
    }
    const body = b as { detail?: string; title?: string; errors?: Record<string, string[]> } | null;
    const first = body?.errors ? Object.values(body.errors)[0]?.[0] : undefined;
    if (error.status === 403) return body?.detail || 'You do not have permission to do this.';
    return first || body?.detail || body?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}

function isoDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function nowIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${isoDate(d)}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

/** Mirrors the SQL seed so the demo looks like a fresh database. */
function seed(): LocalStore {
  type SeedRow = [string, string, string, string | null, string, string, string, string, string, string, string | null, EmployeeStatus, string, string, string, string];
  // code, salutation, first, middle, last, gender, dob, joined, designation, department, manager, status, location, level, marital, blood
  const rows: SeedRow[] = [
    ['EMP00001', 'Mr', 'Venkat', null, 'Jangili', 'Male', '1995-05-10', '2021-06-01', 'Web Developer', 'Engineering', 'EMP00004', 'Active', 'Hyderabad', 'L3', 'Married', 'O+'],
    ['EMP00002', 'Ms', 'Polly', null, 'Polineni', 'Female', '1998-11-21', '2023-02-15', 'Junior Web Developer', 'Engineering', 'EMP00004', 'Active', 'Hyderabad', 'L4', 'Single', 'A+'],
    ['EMP00003', 'Mr', 'Ethan', null, 'Sarvigari', 'Male', '1999-03-02', '2024-07-01', 'Junior Web Developer', 'Engineering', 'EMP00004', 'Active', 'Bengaluru', 'L2', 'Single', 'B+'],
    ['EMP00004', 'Mrs', 'Dharani', null, 'Vedantham', 'Female', '1990-08-14', '2019-01-07', 'HR Manager', 'HR', 'EMP00006', 'Active', 'Hyderabad', 'L3', 'Married', 'AB+'],
    ['EMP00005', 'Mr', 'Gani', 'Kumar', 'Pradhan', 'Male', '1996-12-30', '2022-09-12', 'Accountant', 'Finance', 'EMP00007', 'Notice Period', 'Bengaluru', 'L4', 'Single', 'O-'],
    ['EMP00006', 'Mr', 'Arjun', null, 'Mehta', 'Male', '', '2015-04-01', 'Chief Executive Officer', 'Leadership', null, 'Active', 'Hyderabad', 'L0', '', ''],
    ['EMP00007', 'Ms', 'Kavya', null, 'Rao', 'Female', '', '2017-08-16', 'Finance Head', 'Finance', 'EMP00006', 'Active', 'Hyderabad', 'L1', '', ''],
    ['EMP00008', 'Mr', 'Rahul', null, 'Verma', 'Male', '', '2016-11-21', 'Head of Engineering', 'Engineering', 'EMP00006', 'Active', 'Hyderabad', 'L1', '', ''],
    ['EMP00009', 'Ms', 'Sneha', null, 'Iyer', 'Female', '', '2020-02-03', 'Tech Lead', 'Engineering', 'EMP00008', 'Active', 'Hyderabad', 'L2', '', ''],
  ];
  const employees: LocalEmployee[] = rows.map((r, i) => {
    const [code, salutation, first, middle, last, gender, dob, joined, designation, department, manager, st, location, level, marital, blood] = r;
    const mail = `${first}.${last}`.toLowerCase();
    return {
      id: i + 1,
      employeeCode: code,
      salutation,
      firstName: first,
      middleName: middle,
      lastName: last,
      fullName: [first, middle, last].filter(Boolean).join(' '),
      preferredName: null,
      gender,
      dateOfBirth: dob || null,
      dateOfJoining: joined,
      maritalStatus: marital || null,
      bloodGroup: blood || null,
      nationality: 'Indian',
      status: st,
      hasPhoto: false,
      photo: null,
      designation,
      department,
      businessUnit: 'Product',
      workLocation: location,
      employeeType: 'Full Time',
      employmentStatus: code === 'EMP00003' ? 'Probation' : st === 'Notice Period' ? 'Notice Period' : 'Confirmed',
      officeEmail: `${mail}@openrainbow.com`,
      payLevel: level,
      shiftTimings: 'General (09:00-18:00)',
      workSchedule: '5 Days',
      probationStartDate: i < 5 ? joined : null,
      probationEndDate: null,
      confirmationDate: null,
      managerCode: manager,
      managerName: null,
      hrOwnerCode: 'EMP00004',
      hrOwnerName: 'Dharani Vedantham',
      personalMail: `${mail}@gmail.com`,
      alternateMail: null,
      mobileNumber: `98765000${String(i + 1).padStart(2, '0')}`,
      alternateMobile: null,
      officialEmail: `${mail}@openrainbow.com`,
      linkedinUrl: i < 5 ? `https://linkedin.com/in/${first.toLowerCase()}-${last.toLowerCase()}` : null,
      directReports: 0,
      isDeleted: false,
    };
  });
  return { nextHistoryId: 1, employees, history: [] };
}
