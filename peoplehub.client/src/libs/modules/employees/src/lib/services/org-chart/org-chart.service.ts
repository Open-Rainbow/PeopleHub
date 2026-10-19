import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { OrgPerson } from '../../models/org-chart.model';
import { buildForest, descendantIds } from './org-chart.utils';

/** Backend: PeopleHub.Server OrgChartController (proxied by proxy.conf.js). */
export const ORG_CHART_API = '/api/v1/org-chart';

const STORE_KEY = 'ph.orgchart.v1';
const API_TIMEOUT_MS = 5000;

type Row = Record<string, unknown>;

const person = (p: Partial<OrgPerson> & Pick<OrgPerson, 'employeeId' | 'name'>): OrgPerson => ({
  preferredName: '',
  designation: '',
  department: '',
  location: 'Hyderabad',
  employeeType: 'Full Time',
  employmentStatus: 'Confirmed',
  employeeStatus: 'Active',
  managerId: '',
  dottedLineManagerId: '',
  email: '',
  mobile: '',
  dateOfJoining: '',
  inLoop: false,
  ...p,
});

/** Same people and reporting lines as the SQL seed (sections 3 and 13). */
export const DEMO_ORG: OrgPerson[] = [
  person({ employeeId: 'EMP00006', name: 'Arjun Mehta', designation: 'Chief Executive Officer', department: 'Leadership', email: 'arjun.mehta@openrainbow.com', mobile: '9876500006', dateOfJoining: '2015-04-01' }),
  person({ employeeId: 'EMP00007', name: 'Kavya Rao', designation: 'Finance Head', department: 'Finance', managerId: 'EMP00006', email: 'kavya.rao@openrainbow.com', mobile: '9876500007', dateOfJoining: '2017-08-16' }),
  person({ employeeId: 'EMP00008', name: 'Rahul Verma', designation: 'Head of Engineering', department: 'Engineering', managerId: 'EMP00006', email: 'rahul.verma@openrainbow.com', mobile: '9876500008', dateOfJoining: '2016-11-21' }),
  person({ employeeId: 'EMP00009', name: 'Sneha Iyer', designation: 'Tech Lead', department: 'Engineering', managerId: 'EMP00008', email: 'sneha.iyer@openrainbow.com', mobile: '9876500009', dateOfJoining: '2020-02-03' }),
  person({ employeeId: 'EMP00004', name: 'Dharani Vedantham', designation: 'HR Manager', department: 'HR', managerId: 'EMP00006', email: 'dharani.vedantham@openrainbow.com', dateOfJoining: '2019-01-07' }),
  person({ employeeId: 'EMP00001', name: 'Venkat Jangili', designation: 'Web Developer', department: 'Engineering', managerId: 'EMP00004', email: 'venkat.jangili@openrainbow.com', mobile: '9876500001', dateOfJoining: '2021-06-01' }),
  person({ employeeId: 'EMP00002', name: 'Polly Polineni', designation: 'Junior Web Developer', department: 'Engineering', managerId: 'EMP00004', email: 'polly.polineni@openrainbow.com', dateOfJoining: '2023-02-15' }),
  person({ employeeId: 'EMP00003', name: 'Ethan Sarvigari', designation: 'Junior Web Developer', department: 'Engineering', managerId: 'EMP00004', location: 'Bengaluru', employmentStatus: 'Probation', email: 'ethan.sarvigari@openrainbow.com', dateOfJoining: '2024-07-01' }),
  person({ employeeId: 'EMP00005', name: 'Gani Kumar Pradhan', designation: 'Accountant', department: 'Finance', managerId: 'EMP00007', location: 'Bengaluru', employmentStatus: 'Notice Period', employeeStatus: 'Notice Period', email: 'gani.pradhan@openrainbow.com', dateOfJoining: '2022-09-12' }),
];

/**
 * Org chart data.
 * The first call decides the mode: API when it answers, otherwise demo data in localStorage
 * (same loop / self checks as sp_org_set_manager) so the page works without a backend.
 */
@Injectable({
  providedIn: 'root',
})
export class OrgChartService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  async list(): Promise<OrgPerson[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(ORG_CHART_API))).map(toPerson),
      () => this.read(),
    );
  }

  /** managerId null = top of the chart. Returns the updated chart. */
  async setManager(employeeId: string, managerId: string | null): Promise<OrgPerson[]> {
    return this.run(
      async () =>
        (await this.call(this.http.put<Row[]>(`${ORG_CHART_API}/${encodeURIComponent(employeeId)}/manager`, { managerId }))).map(toPerson),
      () => {
        const all = this.read();
        const me = all.find((p) => p.employeeId === employeeId);
        if (!me) throw new Error('This employee no longer exists.');
        if (managerId) {
          if (managerId === employeeId) throw new Error('Someone cannot report to themselves.');
          if (!all.some((p) => p.employeeId === managerId)) throw new Error('The new manager was not found or is no longer active.');
          const node = buildForest(all).byId.get(employeeId);
          if (node && descendantIds(node).has(managerId)) throw new Error('That would create a loop: the new manager already reports to this person.');
        }
        const next = all.map((p) => (p.employeeId === employeeId ? { ...p, managerId: managerId ?? '', inLoop: false } : p));
        this.write(next);
        return next;
      },
    );
  }

  resetDemoData(): void {
    this.write(structuredClone(DEMO_ORG));
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

  private read(): OrgPerson[] {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as OrgPerson[]) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {
      // fall through to seed
    }
    return structuredClone(DEMO_ORG);
  }

  private write(people: OrgPerson[]): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(people));
    } catch {
      // storage blocked
    }
  }
}

export function toPerson(row: Row): OrgPerson {
  const text = (v: unknown) => (v === null || v === undefined ? '' : String(v));
  return {
    employeeId: text(row['employeeId']),
    name: text(row['employeeName']) || text(row['employeeId']),
    preferredName: text(row['preferredName']),
    designation: text(row['designation']),
    department: text(row['department']),
    location: text(row['workLocation']),
    employeeType: text(row['employeeType']),
    employmentStatus: text(row['employmentStatus']),
    employeeStatus: text(row['employeeStatus']),
    managerId: text(row['managerId']),
    dottedLineManagerId: text(row['dottedLineManagerId']),
    email: text(row['email']),
    mobile: text(row['mobile']),
    dateOfJoining: text(row['dateOfJoining']).slice(0, 10),
    inLoop: row['inLoop'] === true,
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
