import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Organization, OrganizationDraft } from './organization.models';

/** Backend: PeopleHub.Server OrganizationsController. */
export const ORGANIZATIONS_API = '/api/v1/organizations';
/** Organization the Super Admin is working in (sent as X-Organization-Id). */
export const ORG_STORAGE_KEY = 'ph.orgId';
export const ORG_HEADER = 'X-Organization-Id';
export const DEFAULT_ORG_ID = 1;

const STORE_KEY = 'ph.organizations.v1';
const API_TIMEOUT_MS = 8000;

type Row = Record<string, unknown>;

interface LocalStore {
  nextId: number;
  orgs: Organization[];
}

/** Organization id picked in the header (null = the default organization). */
export function selectedOrganizationId(): number | null {
  try {
    const v = Number(localStorage.getItem(ORG_STORAGE_KEY));
    return Number.isInteger(v) && v > 0 ? v : null;
  } catch {
    return null;
  }
}

/**
 * Organizations. Super Admin lists / creates / edits them and picks the one to work in;
 * every other role just sees its own. API first, offline demo data in localStorage otherwise.
 */
@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);
  /** Organization the app is working in. */
  readonly current = signal<Organization | null>(null);

  selectedId(): number {
    return selectedOrganizationId() ?? DEFAULT_ORG_ID;
  }

  /** Work in another organization: everything (roles, employees, leave ...) reloads for it. */
  switchTo(org: Pick<Organization, 'id'>): void {
    try {
      localStorage.setItem(ORG_STORAGE_KEY, String(org.id));
    } catch {
      // demo only
    }
    if (typeof location !== 'undefined') location.reload();
  }

  async loadCurrent(): Promise<Organization | null> {
    try {
      const org = await this.run(
        async () => toOrganization(await this.call(this.http.get<Row>(`${ORGANIZATIONS_API}/current`))),
        () => {
          const store = this.read();
          return store.orgs.find((o) => o.id === this.selectedId()) ?? store.orgs[0];
        },
      );
      this.current.set(org);
      return org;
    } catch {
      return null;
    }
  }

  async list(search = '', includeInactive = true): Promise<Organization[]> {
    let params = new HttpParams().set('includeInactive', String(includeInactive));
    if (search.trim()) params = params.set('search', search.trim());
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(ORGANIZATIONS_API, { params }))).map(toOrganization),
      () => {
        const term = search.trim().toLowerCase();
        return this.read()
          .orgs.filter((o) => includeInactive || o.isActive)
          .filter((o) => !term || [o.name, o.code, o.legalName, o.city, o.email].some((v) => (v ?? '').toLowerCase().includes(term)))
          .sort((a, b) => Number(b.isActive) - Number(a.isActive) || a.name.localeCompare(b.name));
      },
    );
  }

  async create(d: OrganizationDraft): Promise<Organization> {
    return this.run(
      async () => toOrganization(await this.call(this.http.post<Row>(ORGANIZATIONS_API, toBody(d)))),
      () => this.localSave(null, d),
    );
  }

  async update(id: number, d: OrganizationDraft): Promise<Organization> {
    return this.run(
      async () => toOrganization(await this.call(this.http.put<Row>(`${ORGANIZATIONS_API}/${id}`, toBody(d)))),
      () => this.localSave(id, d),
    );
  }

  async setStatus(id: number, isActive: boolean): Promise<Organization> {
    return this.run(
      async () => toOrganization(await this.call(this.http.post<Row>(`${ORGANIZATIONS_API}/${id}/status`, { isActive }))),
      () => {
        const store = this.read();
        const o = store.orgs.find((x) => x.id === id);
        if (!o) throw new Error('Organization not found.');
        if (!isActive && !store.orgs.some((x) => x.id !== id && x.isActive)) throw new Error('At least one organization must stay active.');
        o.isActive = isActive;
        o.updatedAt = nowIso();
        o.updatedBy = 'you';
        this.write(store);
        return o;
      },
    );
  }

  // ---- Demo store -----------------------------------------------------------------------------

  private localSave(id: number | null, d: OrganizationDraft): Organization {
    const store = this.read();
    const body = toBody(d);
    if (store.orgs.some((o) => o.id !== id && o.code.toUpperCase() === body.code)) throw new Error('Another organization already uses this code.');
    if (store.orgs.some((o) => o.id !== id && o.name.toLowerCase() === body.name.toLowerCase())) throw new Error('Another organization already has this name.');
    const now = nowIso();
    let o = id === null ? undefined : store.orgs.find((x) => x.id === id);
    if (id !== null && !o) throw new Error('Organization not found.');
    if (!o) {
      o = { ...blank(), id: store.nextId++, createdAt: now, createdBy: 'you', roleCount: 5 };
      store.orgs.push(o);
    }
    Object.assign(o, body, { updatedAt: id === null ? null : now, updatedBy: id === null ? null : 'you' });
    this.write(store);
    return o;
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

  private read(): LocalStore {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as LocalStore) : null;
      if (parsed && Array.isArray(parsed.orgs) && parsed.orgs.length) return parsed;
    } catch {
      // fall through to seed
    }
    const fresh: LocalStore = {
      nextId: 2,
      orgs: [
        {
          ...blank(), id: 1, code: 'OR', name: 'Open Rainbow', legalName: 'Open Rainbow', industry: 'Software Products',
          email: 'hr@openrainbow.com', city: 'Hyderabad', stateProvince: 'Telangana', country: 'India', timeZone: 'India Standard Time',
          currency: 'INR', financialYearStartMonth: 4, employeeCount: 9, roleCount: 5, createdAt: '2026-01-01T00:00:00', createdBy: 'seed',
        },
      ],
    };
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

function blank(): Organization {
  return {
    id: 0, code: '', name: '', legalName: null, industry: null, email: null, phone: null, website: null, addressLine: null, city: null,
    stateProvince: null, country: null, pincode: null, timeZone: null, currency: null, financialYearStartMonth: null, taxId: null,
    registrationNumber: null, isActive: true, employeeCount: 0, roleCount: 0, createdAt: '', createdBy: null, updatedAt: null, updatedBy: null,
  };
}

function toBody(d: OrganizationDraft) {
  const v = (s: string) => (s.trim() ? s.trim() : null);
  return {
    code: d.code.trim().toUpperCase(),
    name: d.name.trim(),
    legalName: v(d.legalName),
    industry: v(d.industry),
    email: v(d.email)?.toLowerCase() ?? null,
    phone: v(d.phone),
    website: v(d.website),
    addressLine: v(d.addressLine),
    city: v(d.city),
    stateProvince: v(d.stateProvince),
    country: v(d.country),
    pincode: v(d.pincode),
    timeZone: v(d.timeZone),
    currency: v(d.currency)?.toUpperCase() ?? null,
    financialYearStartMonth: d.financialYearStartMonth,
    taxId: v(d.taxId)?.toUpperCase() ?? null,
    registrationNumber: v(d.registrationNumber),
  };
}

const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const strOrNull = (v: unknown): string | null => (v == null || v === '' ? null : String(v));
const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);

export function toOrganization(r: Row): Organization {
  return {
    id: num(r['id']),
    code: str(r['code']),
    name: str(r['name']),
    legalName: strOrNull(r['legalName']),
    industry: strOrNull(r['industry']),
    email: strOrNull(r['email']),
    phone: strOrNull(r['phone']),
    website: strOrNull(r['website']),
    addressLine: strOrNull(r['addressLine']),
    city: strOrNull(r['city']),
    stateProvince: strOrNull(r['stateProvince']),
    country: strOrNull(r['country']),
    pincode: strOrNull(r['pincode']),
    timeZone: strOrNull(r['timeZone']),
    currency: strOrNull(r['currency']),
    financialYearStartMonth: r['financialYearStartMonth'] == null ? null : num(r['financialYearStartMonth']),
    taxId: strOrNull(r['taxId']),
    registrationNumber: strOrNull(r['registrationNumber']),
    isActive: r['isActive'] !== false,
    employeeCount: num(r['employeeCount']),
    roleCount: num(r['roleCount']),
    createdAt: str(r['createdAt']),
    createdBy: strOrNull(r['createdBy']),
    updatedAt: strOrNull(r['updatedAt']),
    updatedBy: strOrNull(r['updatedBy']),
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
    if (error.status === 403) return b?.detail || 'Only Super Admin can do this.';
    return first || b?.detail || b?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}

function nowIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
