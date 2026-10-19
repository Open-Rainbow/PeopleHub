import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { POLICY_DEMO_EMPLOYEES, POLICY_FILE_TYPES } from '../config/policy-options';
import { Policy, PolicyAck, PolicyCategory, PolicyDraft, PolicyQuery, PolicyStatus } from '../models/policy.model';
import { baseName, fileExtension } from './policies.utils';

/** Backend: PeopleHub.Server PoliciesController (proxied by proxy.conf.js). */
export const POLICIES_API = '/api/v1/policies';

const STORE_KEY = 'ph.policies.v1';
const API_TIMEOUT_MS = 8000;

type Row = Record<string, unknown>;

interface LocalPolicy extends Policy {
  fileData: string | null;
  isDeleted: boolean;
}

interface LocalAck {
  policyId: number;
  employeeId: string;
  version: number;
  at: string;
}

interface LocalStore {
  nextId: number;
  policies: LocalPolicy[];
  acks: LocalAck[];
}

/**
 * Company policies. API first; when the API is not reachable the page keeps working on demo data in
 * localStorage (same rules as the stored procedures), including uploads and acknowledgements.
 */
@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  private readonly http = inject(HttpClient);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  isLocal(): boolean {
    return this.mode === 'local';
  }

  async list(q: PolicyQuery): Promise<Policy[]> {
    let params = new HttpParams().set('employeeId', q.employeeId).set('manage', String(q.manage));
    if (q.manage && q.status && q.status !== 'All') params = params.set('status', q.status);
    if (q.category && q.category !== 'All') params = params.set('category', q.category);
    if (q.search?.trim()) params = params.set('search', q.search.trim());
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(POLICIES_API, { params }))).map(toPolicy),
      () => {
        const store = this.read();
        const term = (q.search ?? '').trim().toLowerCase();
        return this.visible(store, q.employeeId, q.manage)
          .filter((p) => !q.manage || !q.status || q.status === 'All' || p.status === q.status)
          .filter((p) => !q.category || q.category === 'All' || p.category === q.category)
          .filter((p) => !term || [p.title, p.summary ?? '', p.fileName ?? ''].some((v) => v.toLowerCase().includes(term)))
          .sort(byPinnedThenRecent)
          .map((p) => ({ ...this.project(store, p, q.employeeId), content: null }));
      },
    );
  }

  async get(id: number, employeeId: string, manage: boolean): Promise<Policy> {
    const params = new HttpParams().set('employeeId', employeeId).set('manage', String(manage));
    return this.run(
      async () => toPolicy(await this.call(this.http.get<Row>(`${POLICIES_API}/${id}`, { params }))),
      () => {
        const store = this.read();
        const p = this.visible(store, employeeId, manage).find((x) => x.id === id);
        if (!p) throw new Error('This policy is not available.');
        return this.project(store, p, employeeId);
      },
    );
  }

  /** URL for the attachment: the API endpoint, or a data URI in demo mode. */
  fileUrl(p: Policy, employeeId: string, manage: boolean, inline = false): string | null {
    if (!p.hasFile) return null;
    if (this.mode === 'local') return this.read().policies.find((x) => x.id === p.id)?.fileData ?? null;
    const query = `employeeId=${encodeURIComponent(employeeId)}&manage=${manage}${inline ? '&inline=true' : ''}`;
    return `${POLICIES_API}/${p.id}/file?${query}`;
  }

  async create(draft: PolicyDraft): Promise<Policy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.post<Row>(POLICIES_API, toBody(draft)))),
      () => this.localSave(null, draft),
    );
  }

  async update(id: number, draft: PolicyDraft): Promise<Policy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.put<Row>(`${POLICIES_API}/${id}`, toBody(draft)))),
      () => this.localSave(id, draft),
    );
  }

  async setStatus(id: number, status: PolicyStatus): Promise<Policy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.post<Row>(`${POLICIES_API}/${id}/status`, { status }))),
      () => {
        const store = this.read();
        const p = store.policies.find((x) => x.id === id && !x.isDeleted);
        if (!p) throw new Error('Policy not found.');
        if (status === 'Published' && p.status !== 'Published') {
          p.publishedAt = nowIso();
          p.publishedBy = 'you';
        }
        p.status = status;
        p.updatedAt = nowIso();
        this.write(store);
        return this.project(store, p, '');
      },
    );
  }

  async remove(id: number): Promise<void> {
    await this.run(
      async () => {
        await this.call(this.http.delete(`${POLICIES_API}/${id}`));
      },
      () => {
        const store = this.read();
        const p = store.policies.find((x) => x.id === id && !x.isDeleted);
        if (!p) throw new Error('Policy not found.');
        p.isDeleted = true;
        this.write(store);
      },
    );
  }

  async acknowledge(id: number, employeeId: string): Promise<Policy> {
    return this.run(
      async () => toPolicy(await this.call(this.http.post<Row>(`${POLICIES_API}/${id}/acknowledge`, { employeeId }))),
      () => {
        const store = this.read();
        const p = this.visible(store, employeeId, false).find((x) => x.id === id);
        if (!p) throw new Error('This policy is not published.');
        if (!store.acks.some((a) => a.policyId === id && a.employeeId === employeeId && a.version === p.version)) {
          store.acks.push({ policyId: id, employeeId, version: p.version, at: nowIso() });
          this.write(store);
        }
        return this.project(store, p, employeeId);
      },
    );
  }

  async acknowledgements(id: number): Promise<PolicyAck[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${POLICIES_API}/${id}/acknowledgements`))).map(toAck),
      () => {
        const store = this.read();
        const p = store.policies.find((x) => x.id === id && !x.isDeleted);
        if (!p) throw new Error('Policy not found.');
        return audienceOf(p.audience)
          .map((e) => ({
            employeeId: e.employeeId,
            employeeName: e.employeeName,
            department: e.department,
            version: p.version,
            acknowledgedAt: store.acks.find((a) => a.policyId === id && a.employeeId === e.employeeId && a.version === p.version)?.at ?? null,
          }))
          .sort((a, b) => Number(!!a.acknowledgedAt) - Number(!!b.acknowledgedAt) || a.employeeName.localeCompare(b.employeeName));
      },
    );
  }

  // ---- Demo store -----------------------------------------------------------------------------

  private visible(store: LocalStore, employeeId: string, manage: boolean): LocalPolicy[] {
    const dept = POLICY_DEMO_EMPLOYEES.find((e) => e.employeeId === employeeId)?.department ?? null;
    return store.policies.filter((p) => !p.isDeleted && (manage || (p.status === 'Published' && (!p.audience || p.audience === dept))));
  }

  private project(store: LocalStore, p: LocalPolicy, employeeId: string): Policy {
    const audience = audienceOf(p.audience);
    const acked = store.acks.filter((a) => a.policyId === p.id && a.version === p.version);
    const { fileData: _file, isDeleted: _deleted, ...rest } = p;
    return {
      ...rest,
      acknowledgedAt: acked.find((a) => a.employeeId === employeeId)?.at ?? null,
      ackCount: acked.filter((a) => audience.some((e) => e.employeeId === a.employeeId)).length,
      audienceCount: audience.length,
    };
  }

  private localSave(id: number | null, d: PolicyDraft): Policy {
    const store = this.read();
    const title = d.title.trim();
    if (store.policies.some((p) => !p.isDeleted && p.id !== id && p.title.toLowerCase() === title.toLowerCase()))
      throw new Error('A policy with this title already exists.');
    if (d.audience && !audienceOf(d.audience).length) throw new Error('Nobody works in that department yet.');

    const now = nowIso();
    let p = id === null ? undefined : store.policies.find((x) => x.id === id && !x.isDeleted);
    if (id !== null && !p) throw new Error('Policy not found.');
    if (!p) {
      p = {
        id: store.nextId++, title, category: d.category as PolicyCategory, summary: null, content: null, hasContent: false,
        fileName: null, fileContentType: null, fileSize: null, hasFile: false, fileData: null, version: 1, effectiveFrom: null,
        status: 'Draft', requiresAck: false, audience: null, isPinned: false, publishedAt: null, publishedBy: null,
        createdAt: now, createdBy: 'you', updatedAt: now, updatedBy: 'you', acknowledgedAt: null, ackCount: 0, audienceCount: 0, isDeleted: false,
      };
      store.policies.push(p);
    } else if (d.newVersion && p.status === 'Published') {
      p.version += 1;
      p.publishedAt = now;
    }

    p.title = title;
    p.category = d.category as PolicyCategory;
    p.summary = d.summary.trim() || null;
    p.content = d.content.trim() || null;
    p.hasContent = !!p.content;
    if (d.file) {
      const name = baseName(d.file.fileName);
      p.fileName = name;
      p.fileContentType = POLICY_FILE_TYPES[fileExtension(name)] ?? d.file.contentType;
      p.fileSize = d.file.size;
      p.fileData = d.file.data;
    } else if (d.removeFile) {
      p.fileName = p.fileContentType = p.fileData = null;
      p.fileSize = null;
    }
    p.hasFile = !!p.fileData;
    if (!p.hasContent && !p.hasFile) throw new Error('Write the policy or attach a file.');
    p.effectiveFrom = d.effectiveFrom || null;
    p.requiresAck = d.requiresAck;
    p.audience = d.audience || null;
    p.isPinned = d.isPinned;
    if (d.publish && p.status !== 'Published') {
      p.status = 'Published';
      p.publishedAt = now;
      p.publishedBy = 'you';
    }
    p.updatedAt = now;
    p.updatedBy = 'you';
    this.write(store);
    return this.project(store, p, '');
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
      if (parsed && Array.isArray(parsed.policies) && Array.isArray(parsed.acks)) return parsed;
    } catch {
      // fall through to seed
    }
    const fresh = seed();
    this.write(fresh);
    return fresh;
  }

  private write(store: LocalStore): void {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch {
      throw new Error('This browser has no room left for demo files. Remove a policy or use a smaller file.');
    }
  }
}

function audienceOf(department: string | null) {
  return POLICY_DEMO_EMPLOYEES.filter((e) => !department || e.department === department);
}

function byPinnedThenRecent(a: Policy, b: Policy): number {
  const rank = (s: PolicyStatus) => (s === 'Published' ? 0 : s === 'Draft' ? 1 : 2);
  return Number(b.isPinned) - Number(a.isPinned) || rank(a.status) - rank(b.status) || (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt);
}

function nowIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function toBody(d: PolicyDraft) {
  return {
    title: d.title.trim(),
    category: d.category,
    summary: d.summary.trim() || null,
    content: d.content.trim() || null,
    file: d.file ? { fileName: baseName(d.file.fileName), contentType: d.file.contentType, data: d.file.data } : null,
    removeFile: d.removeFile,
    effectiveFrom: d.effectiveFrom || null,
    requiresAck: d.requiresAck,
    audience: d.audience || null,
    isPinned: d.isPinned,
    publish: d.publish,
    newVersion: d.newVersion,
  };
}

const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const strOrNull = (v: unknown): string | null => (v == null || v === '' ? null : String(v));
const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);

export function toPolicy(r: Row): Policy {
  return {
    id: num(r['id']),
    title: str(r['title']),
    category: str(r['category']) as PolicyCategory,
    summary: strOrNull(r['summary']),
    content: strOrNull(r['content']),
    hasContent: !!r['hasContent'],
    fileName: strOrNull(r['fileName']),
    fileContentType: strOrNull(r['fileContentType']),
    fileSize: r['fileSize'] == null ? null : num(r['fileSize']),
    hasFile: !!r['hasFile'],
    version: num(r['version']) || 1,
    effectiveFrom: r['effectiveFrom'] ? str(r['effectiveFrom']).slice(0, 10) : null,
    status: (str(r['status']) || 'Draft') as PolicyStatus,
    requiresAck: !!r['requiresAck'],
    audience: strOrNull(r['audience']),
    isPinned: !!r['isPinned'],
    publishedAt: strOrNull(r['publishedAt']),
    publishedBy: strOrNull(r['publishedBy']),
    createdAt: str(r['createdAt']),
    createdBy: strOrNull(r['createdBy']),
    updatedAt: str(r['updatedAt']),
    updatedBy: strOrNull(r['updatedBy']),
    acknowledgedAt: strOrNull(r['acknowledgedAt']),
    ackCount: num(r['ackCount']),
    audienceCount: num(r['audienceCount']),
  };
}

function toAck(r: Row): PolicyAck {
  return {
    employeeId: str(r['employeeId']),
    employeeName: str(r['employeeName']),
    department: strOrNull(r['department']),
    acknowledgedAt: strOrNull(r['acknowledgedAt']),
    version: num(r['version']) || 1,
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

/** Mirrors the SQL seed so the demo looks the same as a fresh database. */
function seed(): LocalStore {
  const base = {
    summary: null, content: null, hasContent: true, fileName: null, fileContentType: null, fileSize: null, hasFile: false, fileData: null,
    version: 1, requiresAck: false, audience: null, isPinned: false, publishedBy: 'seed', createdBy: 'seed', updatedBy: 'seed',
    acknowledgedAt: null, ackCount: 0, audienceCount: 0, isDeleted: false,
  };
  const policies: LocalPolicy[] = [
    {
      ...base, id: 1, title: 'Floor and desk management', category: 'Workplace', status: 'Published', requiresAck: true, isPinned: true,
      summary: 'How desks are allocated, booked and kept on each floor.', effectiveFrom: '2026-06-01',
      publishedAt: '2026-06-01T09:00:00', createdAt: '2026-05-20T09:00:00', updatedAt: '2026-06-01T09:00:00',
      content: [
        '1. Desk allocation',
        '- Floors are split into team zones. Ask Facilities to change your zone.',
        '- Hot desks (marked H) are first come, first served, or bookable a week ahead.',
        '',
        '2. Booking a desk',
        '- Book in PeopleHub or at the floor kiosk before 10:00 on the day.',
        '- Bookings not checked in by 11:00 are released.',
        '',
        '3. Clean desk',
        '- Clear your desk at the end of every day. Lock laptops and papers in your pedestal.',
        '- Leave the monitor, dock and chair as you found them.',
        '',
        '4. Quiet zones and meeting rooms',
        '- Floor 3 east wing is a quiet zone: no calls.',
        '- Meeting rooms are for meetings of 2 or more; release them if plans change.',
        '',
        '5. Visitors',
        '- Register visitors at reception. They must be escorted on every floor.',
        '',
        'Questions: facilities@openrainbow.com',
      ].join('\n'),
    },
    {
      ...base, id: 2, title: 'Work from home', category: 'HR', status: 'Published', effectiveFrom: '2026-04-01',
      summary: 'Who can work remotely, how to request it and what is expected.',
      publishedAt: '2026-04-01T09:00:00', createdAt: '2026-03-25T09:00:00', updatedAt: '2026-04-01T09:00:00',
      content: '- Up to 2 remote days a week after probation, agreed with your manager.\n- Mark the day as Remote when you check in.\n- Be reachable during core hours (11:00 - 16:00).\n- Use the company VPN for all work systems.',
    },
    {
      ...base, id: 3, title: 'Acceptable use of IT assets', category: 'IT & Security', status: 'Published', requiresAck: true, effectiveFrom: '2026-04-01',
      summary: 'Rules for laptops, accounts, passwords and company data.',
      publishedAt: '2026-04-01T09:00:00', createdAt: '2026-03-25T09:00:00', updatedAt: '2026-04-01T09:00:00',
      content: '- Never share your password or MFA codes.\n- Lock your screen when you leave your desk (Win + L).\n- Install software only from the company portal.\n- Report lost devices to IT within 1 hour.',
    },
    {
      ...base, id: 4, title: 'Travel and expenses', category: 'Finance', status: 'Draft', effectiveFrom: null, publishedAt: null, publishedBy: null,
      summary: 'Draft: limits for travel, stay and meals on business trips.', content: 'Draft under review by Finance.',
      createdAt: '2026-10-01T09:00:00', updatedAt: '2026-10-01T09:00:00',
    },
  ];
  return {
    nextId: 5,
    policies,
    acks: [
      { policyId: 1, employeeId: 'EMP00002', version: 1, at: '2026-06-02T10:15:00' },
      { policyId: 1, employeeId: 'EMP00004', version: 1, at: '2026-06-03T09:40:00' },
    ],
  };
}
