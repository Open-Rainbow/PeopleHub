import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { fullPermissions } from './access.defaults';
import { AccessAction, allows, FieldPolicyRule, FieldRequirement, FieldRule, MyAccess, PageAccess, SUPER_ADMIN } from './access.models';
import { nowIso, readSetupStore, writeSetupStore } from './access.store';
import { ROLE_SHELLS } from './route-page-map';

/** Backend: PeopleHub.Server SetupController. */
export const SETUP_API = '/api/v1/setup';
export const ROLE_STORAGE_KEY = 'userRole';

const API_TIMEOUT_MS = 6000;
const REGISTER_DELAY_MS = 1500;
/** Forms that never get field rules (so nobody can lock the Setup page itself). */
const EXCLUDED_FORMS = /^(setup|login)(\/|$)/;

type Row = Record<string, unknown>;

/**
 * What the signed-in role may open and do, plus field rules for the shared ui controls.
 * Loaded from `GET api/v1/setup/my-access`; falls back to the offline Setup store when the API is not reachable.
 * Also provided as UI_FIELD_POLICY (main.ts) so ui-text-box, ui-dropdown, ... apply Setup's field rules.
 */
@Injectable({ providedIn: 'root' })
export class AccessService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /** Current access (null until the first load). */
  readonly access = signal<MyAccess | null>(null);
  /** Bumped on every (re)load: read it in computed()/effect() to react to changes. */
  readonly version = signal(0);

  private pending: Promise<MyAccess> | null = null;
  private pages = new Map<string, PageAccess>();
  private rules = new Map<string, FieldRule>();
  private readonly registerQueue = new Map<string, Map<string, { label: string; sortOrder: number }>>();
  private readonly registered = new Set<string>();
  private registerTimer: ReturnType<typeof setTimeout> | null = null;

  /** Role of the signed-in user (demo login keeps it in localStorage). */
  role(): string {
    try {
      return (localStorage.getItem(ROLE_STORAGE_KEY) || '').trim().toLowerCase();
    } catch {
      return '';
    }
  }

  isSignedIn(): boolean {
    return !!this.role();
  }

  isSuperAdmin(): boolean {
    return this.role() === SUPER_ADMIN;
  }

  isOnline(): boolean {
    return this.access()?.source === 'api';
  }

  /** Loads access for the current role. Cached until the role changes or `force` is set. */
  load(force = false): Promise<MyAccess> {
    const role = this.role();
    const current = this.access();
    if (!force && current && current.role === role) return Promise.resolve(current);
    if (!force && this.pending) return this.pending;

    this.pending = this.fetch(role)
      .then((a) => {
        this.apply(a);
        return a;
      })
      .finally(() => (this.pending = null));
    return this.pending;
  }

  /** Forget the cached access (e.g. on login / logout). */
  clear(): void {
    this.access.set(null);
    this.pages.clear();
    this.rules.clear();
    this.version.update((v) => v + 1);
  }

  /** Can the current role do `action` on the page? Works before the first load (uses the offline defaults). */
  can(pageKey: string, action: AccessAction = 'view'): boolean {
    const role = this.role();
    if (!role) return false;
    if (role === SUPER_ADMIN) return true;
    const a = this.access();
    if (a && a.role === role) return allows(this.pages.get(pageKey), action);
    return allows(this.localAccess(role).pages.find((p) => p.pageKey === pageKey), action);
  }

  // ---- Field rules (UI_FIELD_POLICY) ---------------------------------------------------------

  /** Rule of a field on the form that is being rendered (null = no rule, use the form's own settings). */
  ruleFor(fieldKey: string): FieldPolicyRule | null {
    if (!fieldKey || this.isSuperAdmin()) return null;
    const formKey = this.formKey();
    if (!formKey || EXCLUDED_FORMS.test(formKey)) return null;
    const r = this.rules.get(ruleKey(formKey, fieldKey));
    if (!r || (!r.isHidden && !r.isReadOnly && r.requirement === 'Default')) return null;
    return { hidden: r.isHidden, readOnly: r.isReadOnly, requirement: r.requirement };
  }

  /** Called by the shared controls when they render: makes the field configurable in Setup. */
  register(fieldKey: string, label: string): void {
    const formKey = this.formKey();
    if (!formKey || !fieldKey || !label || EXCLUDED_FORMS.test(formKey) || !isFormKey(formKey) || !isFieldKey(fieldKey)) return;
    const key = ruleKey(formKey, fieldKey);
    if (this.registered.has(key)) return;
    this.registered.add(key);

    const fields = this.registerQueue.get(formKey) ?? new Map<string, { label: string; sortOrder: number }>();
    if (!fields.has(fieldKey)) fields.set(fieldKey, { label: label.trim().slice(0, 120), sortOrder: fields.size + 1 });
    this.registerQueue.set(formKey, fields);
    if (!this.registerTimer) this.registerTimer = setTimeout(() => this.flushRegistrations(), REGISTER_DELAY_MS);
  }

  /** Form key = page path after the role, e.g. "/hr/add-employee/personal-info" -> "add-employee/personal-info". */
  formKey(): string {
    const nav = this.router.currentNavigation();
    const url = nav?.finalUrl ? this.router.serializeUrl(nav.finalUrl) : this.router.url;
    const segments = url.split(/[?#;(]/)[0].split('/').filter(Boolean);
    if (segments.length && ROLE_SHELLS.includes(segments[0].toLowerCase())) segments.shift();
    return segments.join('/').toLowerCase();
  }

  // ---- Internals -----------------------------------------------------------------------------

  private async fetch(role: string): Promise<MyAccess> {
    if (!role) return { role: '', isSuperAdmin: false, pages: [], fields: [], source: 'local' };
    try {
      const r = await firstValueFrom(this.http.get<Row>(`${SETUP_API}/my-access`).pipe(timeout(API_TIMEOUT_MS)));
      return {
        role,
        isSuperAdmin: !!r['isSuperAdmin'] || role === SUPER_ADMIN,
        pages: (Array.isArray(r['pages']) ? (r['pages'] as Row[]) : []).map(toPageAccess),
        fields: (Array.isArray(r['fields']) ? (r['fields'] as Row[]) : []).map(toFieldRule),
        source: 'api',
      };
    } catch {
      return this.localAccess(role);
    }
  }

  private localAccess(role: string): MyAccess {
    if (role === SUPER_ADMIN) return { role, isSuperAdmin: true, pages: fullPermissions(), fields: [], source: 'local' };
    const store = readSetupStore();
    const r = store.roles.find((x) => x.code === role);
    const active = !!r && r.isActive;
    return {
      role,
      isSuperAdmin: false,
      pages: active ? store.permissions[role] ?? [] : [],
      fields: active ? store.fields[role] ?? [] : [],
      source: 'local',
    };
  }

  private apply(a: MyAccess): void {
    this.pages = new Map(a.pages.map((p) => [p.pageKey, p]));
    this.rules = new Map(a.fields.map((f) => [ruleKey(f.formKey.toLowerCase(), f.fieldKey), { ...f, formKey: f.formKey.toLowerCase() }]));
    this.access.set(a);
    this.version.update((v) => v + 1);
  }

  private flushRegistrations(): void {
    this.registerTimer = null;
    const batch = [...this.registerQueue.entries()];
    this.registerQueue.clear();

    // Always keep the offline catalogue up to date, so Setup can list forms without the API too.
    const store = readSetupStore();
    for (const [formKey, fields] of batch) {
      const known = store.forms[formKey] ?? [];
      fields.forEach((f, fieldKey) => {
        if (!known.some((k) => k.fieldKey === fieldKey)) known.push({ fieldKey, label: f.label, sortOrder: known.length + 1 });
      });
      store.forms[formKey] = known;
      store.formSeen[formKey] = nowIso();
    }
    writeSetupStore(store);

    if (this.access()?.source !== 'api') return;
    for (const [formKey, fields] of batch) {
      const body = {
        formKey,
        fields: [...fields.entries()].map(([fieldKey, f]) => ({ fieldKey, label: f.label, sortOrder: f.sortOrder })),
      };
      this.http.post(`${SETUP_API}/fields/register`, body).pipe(timeout(API_TIMEOUT_MS)).subscribe({ error: () => undefined });
    }
  }
}

function ruleKey(formKey: string, fieldKey: string): string {
  return `${formKey}|${fieldKey}`;
}

function isFormKey(v: string): boolean {
  return v.length <= 100 && /^[a-z0-9][a-z0-9/_.-]*$/i.test(v);
}

function isFieldKey(v: string): boolean {
  return v.length <= 80 && /^[A-Za-z0-9_.-]+$/.test(v);
}

const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));

export function toPageAccess(r: Row): PageAccess {
  return {
    pageKey: str(r['pageKey']),
    canView: !!r['canView'],
    canCreate: !!r['canCreate'],
    canEdit: !!r['canEdit'],
    canDelete: !!r['canDelete'],
    canApprove: !!r['canApprove'],
    canExport: !!r['canExport'],
  };
}

export function toFieldRule(r: Row): FieldRule {
  const req = str(r['requirement']);
  return {
    formKey: str(r['formKey']),
    fieldKey: str(r['fieldKey']),
    isHidden: !!r['isHidden'],
    isReadOnly: !!r['isReadOnly'],
    requirement: (req === 'Required' || req === 'Optional' ? req : 'Default') as FieldRequirement,
  };
}
