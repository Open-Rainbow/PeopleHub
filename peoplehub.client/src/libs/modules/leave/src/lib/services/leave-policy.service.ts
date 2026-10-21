import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { DEFAULT_EMPLOYMENT_TYPES } from '../config/leave-policy-options';
import { DEFAULT_POLICY_ITEMS, SEED_FULL_TIME, SEED_PART_TIME } from '../config/leave-policy.seed';
import {
  CopyPolicyResult,
  LeavePolicy,
  LeavePolicyItem,
  LeavePolicySummary,
} from '../models/leave-policy.model';
import { completeItem, uniqueCode } from '../utils/leave-policy.utils';

/** Backend: PeopleHub.Server LeavePolicyController (proxied by proxy.conf.js). */
export const LEAVE_POLICY_API = '/api/v1/leave/policies';
export const EMPLOYMENT_TYPES_API = '/api/v1/leave/employment-types';

const STORE_KEY = 'ph.leave.policies.v1';
const API_TIMEOUT_MS = 5000;

interface StoredVersion {
  version: number;
  items: LeavePolicyItem[];
  at: string;
}

interface StoredPolicy {
  year: number;
  employmentType: string;
  draft?: StoredVersion;
  published?: StoredVersion;
  /** Highest version number used so far (archived ones included). */
  lastVersion: number;
}

type Store = Record<string, StoredPolicy>;
type Row = Record<string, unknown>;

/**
 * Leave Policy Manager data.
 *
 * The first call decides the mode: if the API answers, every call goes to the server (the database
 * re-checks every rule and Apply Leave reads the published version). If it doesn't, the page keeps
 * working on local demo data (localStorage) so the screen can be designed and demoed without a backend.
 */
@Injectable({
  providedIn: 'root',
})
export class LeavePolicyService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);
  readonly lastError = signal<string | null>(null);

  async employmentTypes(): Promise<string[]> {
    return this.run(
      async () => {
        const rows = await this.call(this.http.get<string[]>(EMPLOYMENT_TYPES_API));
        return rows.length > 0 ? rows : DEFAULT_EMPLOYMENT_TYPES;
      },
      () => DEFAULT_EMPLOYMENT_TYPES,
    );
  }

  async summaries(year: number): Promise<LeavePolicySummary[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${LEAVE_POLICY_API}?year=${year}`))).map(toSummary),
      () => Object.values(this.read())
        .filter((p) => p.year === year && (p.draft || p.published))
        .map((p) => ({
          year: p.year,
          employmentType: p.employmentType,
          publishedVersion: p.published?.version ?? null,
          publishedAt: p.published?.at ?? null,
          hasDraft: !!p.draft,
        })),
    );
  }

  /** The draft if there is one, else the published version, else the defaults (status None). */
  async current(year: number, employmentType: string): Promise<LeavePolicy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.get<Row>(
        `${LEAVE_POLICY_API}/current?year=${year}&employmentType=${encodeURIComponent(employmentType)}`))),
      () => this.localPolicy(year, employmentType),
    );
  }

  async saveDraft(year: number, employmentType: string, items: LeavePolicyItem[]): Promise<LeavePolicy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.put<Row>(`${LEAVE_POLICY_API}/draft`, { year, employmentType, items }))),
      () => this.mutate(year, employmentType, (p) => {
        const taken = items.filter((i) => i.code).map((i) => i.code);
        const withCodes = items.map((i) => {
          if (i.code) return i;
          const code = uniqueCode(i.label, taken);
          taken.push(code);
          return { ...i, code };
        });
        if (!p.draft) p.lastVersion += 1;
        p.draft = { version: p.draft?.version ?? p.lastVersion, items: withCodes, at: new Date().toISOString() };
      }),
    );
  }

  async publish(year: number, employmentType: string): Promise<LeavePolicy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.post<Row>(`${LEAVE_POLICY_API}/publish`, { year, employmentType }))),
      () => this.mutate(year, employmentType, (p) => {
        if (!p.draft) throw new Error('There is no draft to publish. Save a draft first.');
        if (p.draft.items.length === 0) throw new Error('Add at least one leave type before publishing.');
        p.published = { ...p.draft, at: new Date().toISOString() };
        delete p.draft;
      }),
    );
  }

  async discard(year: number, employmentType: string): Promise<LeavePolicy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.post<Row>(`${LEAVE_POLICY_API}/discard`, { year, employmentType }))),
      () => this.mutate(year, employmentType, (p) => {
        delete p.draft;
      }),
    );
  }

  /** Copies sourceYear's policies into targetYear drafts. employmentType null = all of them. */
  async copy(sourceYear: number, targetYear: number, employmentType: string | null): Promise<CopyPolicyResult> {
    return this.run(
      async () => {
        const row = await this.call(this.http.post<Row>(`${LEAVE_POLICY_API}/copy`, { sourceYear, targetYear, employmentType }));
        return { created: Number(row['created'] ?? 0), message: String(row['message'] ?? '') };
      },
      () => {
        if (sourceYear === targetYear) throw new Error('Pick a different year to copy to.');
        const store = this.read();
        const sources = Object.values(store).filter((p) => p.year === sourceYear && (p.published || p.draft)
          && (!employmentType || same(p.employmentType, employmentType)));
        if (sources.length === 0) throw new Error(`There is no ${sourceYear} policy to copy.`);
        let created = 0;
        for (const src of sources) {
          const k = key(targetYear, src.employmentType);
          if (store[k]?.draft || store[k]?.published) continue;
          const lastVersion = (store[k]?.lastVersion ?? 0) + 1;
          store[k] = {
            year: targetYear,
            employmentType: src.employmentType,
            lastVersion,
            draft: { version: lastVersion, items: structuredClone((src.published ?? src.draft)!.items), at: new Date().toISOString() },
          };
          created++;
        }
        this.write(store);
        return {
          created,
          message: created === 0
            ? `${targetYear} already has a policy for ${employmentType ?? 'every employment type'}. Nothing copied.`
            : created === 1 ? `Created a ${targetYear} draft from ${sourceYear}.` : `Created ${created} ${targetYear} drafts from ${sourceYear}.`,
        };
      },
    );
  }

  resetDemoData(): void {
    this.write(seedStore());
  }

  /** API first; local store when the API has never answered. Errors become a readable message. */
  private async run<T>(api: () => Promise<T>, local: () => T): Promise<T> {
    this.lastError.set(null);
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
          throw this.fail(error);
        }
      }
    }
    try {
      return local();
    } catch (error) {
      throw this.fail(error);
    }
  }

  private setMode(mode: 'api' | 'local'): void {
    this.mode = mode;
    this.isOnline.set(mode === 'api');
  }

  private call<T>(request: Observable<T>): Promise<T> {
    return firstValueFrom(request.pipe(timeout(API_TIMEOUT_MS)));
  }

  private fail(error: unknown): Error {
    const message = readableError(error);
    this.lastError.set(message);
    return new Error(message);
  }

  private localPolicy(year: number, employmentType: string): LeavePolicy {
    const p = this.read()[key(year, employmentType)];
    const live = p?.published;
    const shown = p?.draft ?? live;
    return {
      id: null,
      year,
      employmentType: p?.employmentType ?? employmentType,
      status: p?.draft ? 'Draft' : live ? 'Published' : 'None',
      version: shown?.version ?? null,
      publishedAt: live?.at ?? null,
      updatedAt: shown?.at ?? null,
      hasPublished: !!live,
      publishedVersion: live?.version ?? null,
      items: structuredClone(shown?.items ?? DEFAULT_POLICY_ITEMS).map(completeItem),
      publishedItems: structuredClone(live?.items ?? []).map(completeItem),
    };
  }

  private mutate(year: number, employmentType: string, change: (p: StoredPolicy) => void): LeavePolicy {
    const store = this.read();
    const k = key(year, employmentType);
    const policy: StoredPolicy = store[k] ?? { year, employmentType, lastVersion: 0 };
    change(policy);
    store[k] = policy;
    this.write(store);
    return this.localPolicy(year, employmentType);
  }

  private read(): Store {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE_KEY) : null;
      if (raw) return JSON.parse(raw) as Store;
    } catch {
      // fall through to seed
    }
    return seedStore();
  }

  private write(store: Store): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {
      // storage blocked: changes live until reload
    }
  }
}

function key(year: number, employmentType: string): string {
  return `${year}|${employmentType.replace(/[\s-]/g, '').toLowerCase()}`;
}

function same(a: string, b: string): boolean {
  return a.replace(/[\s-]/g, '').toLowerCase() === b.replace(/[\s-]/g, '').toLowerCase();
}

/** Demo data mirroring the seed in leave.sql: this year's Full Time is published, Part Time is a draft. */
export function seedStore(now = new Date()): Store {
  const year = now.getFullYear();
  const at = now.toISOString();
  return {
    [key(year, 'Full Time')]: { year, employmentType: 'Full Time', lastVersion: 1, published: { version: 1, items: structuredClone(SEED_FULL_TIME), at } },
    [key(year, 'Part Time')]: { year, employmentType: 'Part Time', lastVersion: 1, draft: { version: 1, items: structuredClone(SEED_PART_TIME), at } },
  };
}

/** Backend not running / proxy has no target / SQL not deployed yet. */
function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true; // timeout or network
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

const num = (v: unknown): number | null => (v === null || v === undefined || v === '' ? null : Number(v));
const text = (v: unknown): string => (v === null || v === undefined ? '' : String(v));

export function toItem(row: Row): LeavePolicyItem {
  return {
    code: text(row['code']),
    label: text(row['label']),
    description: text(row['description']),
    category: (text(row['category']) || 'standard') as LeavePolicyItem['category'],
    annualAllowance: num(row['annualAllowance']),
    carryForwardDays: Number(row['carryForwardDays'] ?? 0),
    isPaid: row['isPaid'] !== false,
    isEncashable: row['isEncashable'] === true,
    mustBeTakenWithinMonths: num(row['mustBeTakenWithinMonths']),
    allowanceBasis: (text(row['allowanceBasis']) || 'Yearly') as LeavePolicyItem['allowanceBasis'],
    approvalType: (text(row['approvalType']) || 'Manager') as LeavePolicyItem['approvalType'],
    certificateRequired: row['certificateRequired'] === true,
    certificateAfterDays: num(row['certificateAfterDays']),
    backdateDays: Number(row['backdateDays'] ?? 0),
    maxConsecutive: num(row['maxConsecutive']),
    isEnabled: row['isEnabled'] !== false,
    advanceNoticeRequired: row['advanceNoticeRequired'] === true,
    advanceNoticeHours: num(row['advanceNoticeHours']),
    paidDays: num(row['paidDays']),
    extensionWeeks: num(row['extensionWeeks']),
    notes: text(row['notes']),
    expiryDays: num(row['expiryDays']),
    maxAccrual: num(row['maxAccrual']),
    maxPerMonth: num(row['maxPerMonth']),
    maxPerWeek: num(row['maxPerWeek']),
    eligibleAfterMonths: num(row['eligibleAfterMonths']),
  };
}

export function toPolicy(row: Row): LeavePolicy {
  const list = (v: unknown) => (Array.isArray(v) ? (v as Row[]).map(toItem) : []);
  return {
    id: num(row['id']),
    year: Number(row['year']),
    employmentType: text(row['employmentType']),
    status: (text(row['status']) || 'None') as LeavePolicy['status'],
    version: num(row['version']),
    publishedAt: text(row['publishedAt']) || null,
    updatedAt: text(row['updatedAt']) || null,
    hasPublished: row['hasPublished'] === true,
    publishedVersion: num(row['publishedVersion']),
    items: list(row['items']),
    publishedItems: list(row['publishedItems']),
  };
}

function toSummary(row: Row): LeavePolicySummary {
  return {
    year: Number(row['year']),
    employmentType: text(row['employmentType']),
    publishedVersion: num(row['publishedVersion']),
    publishedAt: text(row['publishedAt']) || null,
    hasDraft: row['hasDraft'] === true,
  };
}
