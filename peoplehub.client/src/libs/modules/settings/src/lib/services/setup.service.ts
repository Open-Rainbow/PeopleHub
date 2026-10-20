import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {
  AccessAction,
  ADMIN,
  AccessService,
  defaultPermissions,
  FieldRequirement,
  FieldRule,
  fullPermissions,
  LocalRole,
  LocalSetupStore,
  nowIso,
  PAGE_CATALOGUE,
  PageAccess,
  readSetupStore,
  SETUP_API,
  SUPER_ADMIN,
  writeSetupStore,
} from 'common';
import { FieldSetting, PagePermission, ROLE_CODE_PATTERN, RoleDraft, SETUP_LIMITS, SetupForm, SetupRole } from '../models/setup.model';

const API_TIMEOUT_MS = 8000;
type Row = Record<string, unknown>;

/**
 * Setup: roles, page access per role and field rules per role.
 * API first (PeopleHub.Server SetupController); offline demo store when the API is not reachable (same rules as the SPs).
 */
@Injectable({ providedIn: 'root' })
export class SetupService {
  private readonly http = inject(HttpClient);
  private readonly accessService = inject(AccessService);
  private mode: 'unknown' | 'api' | 'local' = 'unknown';

  readonly isOnline = signal(false);

  // ---- Roles ---------------------------------------------------------------------------------

  roles(): Promise<SetupRole[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${SETUP_API}/roles`))).map(toRole),
      () => {
        const store = this.read();
        return [...store.roles].sort(bySort).map((r) => this.project(store, r));
      },
    );
  }

  createRole(d: RoleDraft): Promise<SetupRole> {
    return this.run(
      async () => toRole(await this.call(this.http.post<Row>(`${SETUP_API}/roles`, roleBody(d, true)))),
      () => {
        const store = this.read();
        const code = d.code.trim().toLowerCase();
        validateRole(d, true);
        if (store.roles.some((r) => r.code === code)) throw new Error('A role with this code already exists.');
        if (store.roles.some((r) => r.name.toLowerCase() === d.name.trim().toLowerCase())) throw new Error('A role with this name already exists.');
        const source = d.copyFromRoleId ? store.roles.find((r) => r.id === d.copyFromRoleId) : undefined;
        if (d.copyFromRoleId && !source) throw new Error('The role to copy from was not found.');
        if (source?.code === SUPER_ADMIN) throw new Error('Super Admin cannot be copied. Copy Admin instead.');
        const now = nowIso();
        const role: LocalRole = {
          id: store.nextId++, code, name: d.name.trim(), description: d.description.trim() || null, isSystem: false, isActive: true,
          sortOrder: Math.max(0, ...store.roles.map((r) => r.sortOrder)) + 10, createdAt: now, updatedAt: now, updatedBy: this.me(),
        };
        store.roles.push(role);
        store.permissions[code] = source ? clone((store.permissions[source.code] ?? []).filter((p) => p.pageKey !== 'setup')) : [];
        store.fields[code] = source ? clone(store.fields[source.code] ?? []) : [];
        this.write(store);
        return this.project(store, role);
      },
    );
  }

  updateRole(id: number, d: RoleDraft): Promise<SetupRole> {
    return this.run(
      async () => toRole(await this.call(this.http.put<Row>(`${SETUP_API}/roles/${id}`, roleBody(d, false, this.codeOf(id))))),
      () => {
        const store = this.read();
        const role = this.editable(store, id);
        validateRole(d, false);
        if (store.roles.some((r) => r.id !== id && r.name.toLowerCase() === d.name.trim().toLowerCase())) throw new Error('A role with this name already exists.');
        role.name = d.name.trim();
        role.description = d.description.trim() || null;
        this.touch(role);
        this.write(store);
        return this.project(store, role);
      },
    );
  }

  setRoleStatus(id: number, isActive: boolean): Promise<SetupRole> {
    return this.run(
      async () => toRole(await this.call(this.http.post<Row>(`${SETUP_API}/roles/${id}/status`, { isActive }))),
      () => {
        const store = this.read();
        const role = this.editable(store, id);
        if (role.isSystem) throw new Error('Built-in roles cannot be deactivated.');
        role.isActive = isActive;
        this.touch(role);
        this.write(store);
        return this.project(store, role);
      },
    );
  }

  async deleteRole(id: number): Promise<void> {
    await this.run(
      async () => {
        await this.call(this.http.delete(`${SETUP_API}/roles/${id}`));
      },
      () => {
        const store = this.read();
        const role = this.editable(store, id);
        if (role.isSystem) throw new Error('Built-in roles cannot be deleted.');
        store.roles = store.roles.filter((r) => r.id !== id);
        delete store.permissions[role.code];
        delete store.fields[role.code];
        this.write(store);
      },
    );
  }

  // ---- Page access ---------------------------------------------------------------------------

  permissions(roleId: number): Promise<PagePermission[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${SETUP_API}/roles/${roleId}/permissions`))).map(toPermission),
      () => {
        const store = this.read();
        const role = this.find(store, roleId);
        const granted = role.code === SUPER_ADMIN ? fullPermissions() : store.permissions[role.code] ?? [];
        return catalogueWith(granted);
      },
    );
  }

  savePermissions(roleId: number, items: PageAccess[]): Promise<PagePermission[]> {
    const clean = items.map(normalizePermission);
    return this.run(
      async () => (await this.call(this.http.put<Row[]>(`${SETUP_API}/roles/${roleId}/permissions`, { items: clean }))).map(toPermission),
      () => {
        const store = this.read();
        const role = this.editable(store, roleId);
        const setup = clean.find((p) => p.pageKey === 'setup');
        if (role.code === ADMIN && !(setup?.canView && setup?.canEdit))
          throw new Error('Admin must keep view and edit access to Setup, or nobody could change access again.');
        store.permissions[role.code] = clean.filter((p) => p.canView);
        this.touch(role);
        this.write(store);
        return catalogueWith(store.permissions[role.code]);
      },
    );
  }

  /** Restores the shipped defaults of a built-in role (custom roles: no access). Saved straight away. */
  async resetPermissions(role: SetupRole): Promise<PagePermission[]> {
    return this.savePermissions(role.id, role.isSystem ? defaultPermissions(role.code) : []);
  }

  // ---- Field rules ---------------------------------------------------------------------------

  forms(): Promise<SetupForm[]> {
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${SETUP_API}/forms`))).map(toForm),
      () => {
        const store = this.read();
        return Object.keys(store.forms)
          .sort()
          .map((formKey) => ({ formKey, fieldCount: store.forms[formKey].length, lastSeenAt: store.formSeen[formKey] ?? null }));
      },
    );
  }

  fieldSettings(roleId: number, formKey: string): Promise<FieldSetting[]> {
    const params = new HttpParams().set('formKey', formKey);
    return this.run(
      async () => (await this.call(this.http.get<Row[]>(`${SETUP_API}/roles/${roleId}/fields`, { params }))).map(toFieldSetting),
      () => {
        const store = this.read();
        const role = this.find(store, roleId);
        return this.localFields(store, role.code, formKey);
      },
    );
  }

  saveFieldSettings(roleId: number, formKey: string, items: FieldSetting[]): Promise<FieldSetting[]> {
    const body = {
      formKey,
      items: items.map((i) => ({ fieldKey: i.fieldKey, isHidden: i.isHidden, isReadOnly: i.isReadOnly, requirement: i.requirement })),
    };
    return this.run(
      async () => (await this.call(this.http.put<Row[]>(`${SETUP_API}/roles/${roleId}/fields`, body))).map(toFieldSetting),
      () => {
        const store = this.read();
        const role = this.editable(store, roleId);
        const others = (store.fields[role.code] ?? []).filter((f) => f.formKey !== formKey);
        const rules: FieldRule[] = items
          .filter((i) => i.isHidden || i.isReadOnly || i.requirement !== 'Default')
          .map((i) => ({ formKey, fieldKey: i.fieldKey, isHidden: i.isHidden, isReadOnly: i.isReadOnly, requirement: i.requirement }));
        store.fields[role.code] = [...others, ...rules];
        this.touch(role);
        this.write(store);
        return this.localFields(store, role.code, formKey);
      },
    );
  }

  // ---- Demo store ----------------------------------------------------------------------------

  /** Code of a role already loaded (the API wants the code on update; built-in codes never change). */
  private codeOf(id: number): string | null {
    return this.lastRoles.find((r) => r.id === id)?.code ?? null;
  }

  private lastRoles: SetupRole[] = [];

  remember(roles: SetupRole[]): void {
    this.lastRoles = roles;
  }

  private localFields(store: LocalSetupStore, code: string, formKey: string): FieldSetting[] {
    const rules = (store.fields[code] ?? []).filter((f) => f.formKey === formKey);
    return (store.forms[formKey] ?? [])
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => {
        const r = rules.find((x) => x.fieldKey === f.fieldKey);
        return {
          formKey, fieldKey: f.fieldKey, label: f.label, sortOrder: f.sortOrder,
          isHidden: !!r?.isHidden, isReadOnly: !!r?.isReadOnly, requirement: r?.requirement ?? 'Default',
        };
      });
  }

  private project(store: LocalSetupStore, r: LocalRole): SetupRole {
    const pages = r.code === SUPER_ADMIN ? PAGE_CATALOGUE.length : (store.permissions[r.code] ?? []).filter((p) => p.canView).length;
    return {
      id: r.id, code: r.code, name: r.name, description: r.description, isSystem: r.isSystem, isActive: r.isActive,
      isLocked: r.code === SUPER_ADMIN, sortOrder: r.sortOrder, pageCount: pages,
      fieldRuleCount: r.code === SUPER_ADMIN ? 0 : (store.fields[r.code] ?? []).length, updatedAt: r.updatedAt, updatedBy: r.updatedBy,
    };
  }

  private find(store: LocalSetupStore, id: number): LocalRole {
    const role = store.roles.find((r) => r.id === id);
    if (!role) throw new Error('Role not found.');
    return role;
  }

  /** Same guards as SetupService.cs: Super Admin is locked; only Super Admin may change Admin. */
  private editable(store: LocalSetupStore, id: number): LocalRole {
    const role = this.find(store, id);
    if (role.code === SUPER_ADMIN) throw new Error('Super Admin always has full access and cannot be changed.');
    if (role.code === ADMIN && this.accessService.role() !== SUPER_ADMIN) throw new Error('Only Super Admin can change the Admin role.');
    return role;
  }

  private touch(role: LocalRole): void {
    role.updatedAt = nowIso();
    role.updatedBy = this.me();
  }

  private me(): string {
    try {
      return localStorage.getItem('userName') || this.accessService.role() || 'you';
    } catch {
      return 'you';
    }
  }

  private read(): LocalSetupStore {
    return readSetupStore();
  }

  private write(store: LocalSetupStore): void {
    writeSetupStore(store);
  }

  // ---- Plumbing ------------------------------------------------------------------------------

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
}

function validateRole(d: RoleDraft, isNew: boolean): void {
  if (isNew && !ROLE_CODE_PATTERN.test(d.code.trim().toLowerCase()))
    throw new Error('Code: 2-30 lower-case letters, digits or dashes, starting with a letter (e.g. team-lead).');
  const name = d.name.trim();
  if (name.length < SETUP_LIMITS.nameMin || name.length > SETUP_LIMITS.nameMax) throw new Error(`Name: ${SETUP_LIMITS.nameMin}-${SETUP_LIMITS.nameMax} characters.`);
  if (d.description.trim().length > SETUP_LIMITS.descriptionMax) throw new Error(`Description: up to ${SETUP_LIMITS.descriptionMax} characters.`);
}

/** The API validator needs a code on update too; it must stay the same as before. */
function roleBody(d: RoleDraft, isNew: boolean, existingCode: string | null = null) {
  return {
    code: isNew ? d.code.trim().toLowerCase() : existingCode,
    name: d.name.trim(),
    description: d.description.trim() || null,
    copyFromRoleId: isNew ? d.copyFromRoleId : null,
  };
}

/** Any action implies view; actions the page does not support are dropped. */
function normalizePermission(p: PageAccess): PageAccess {
  const def = PAGE_CATALOGUE.find((x) => x.pageKey === p.pageKey);
  const ok = (a: AccessAction, v: boolean) => v && !!def?.actions.includes(a);
  const out: PageAccess = {
    pageKey: p.pageKey,
    canView: false,
    canCreate: ok('create', p.canCreate),
    canEdit: ok('edit', p.canEdit),
    canDelete: ok('delete', p.canDelete),
    canApprove: ok('approve', p.canApprove),
    canExport: ok('export', p.canExport),
  };
  out.canView = p.canView || out.canCreate || out.canEdit || out.canDelete || out.canApprove || out.canExport;
  return out;
}

function catalogueWith(granted: PageAccess[]): PagePermission[] {
  return PAGE_CATALOGUE.map((p) => {
    const g = granted.find((x) => x.pageKey === p.pageKey);
    return {
      pageKey: p.pageKey, name: p.name, moduleName: p.moduleName, actions: p.actions, sortOrder: p.sortOrder,
      canView: !!g?.canView, canCreate: !!g?.canCreate, canEdit: !!g?.canEdit,
      canDelete: !!g?.canDelete, canApprove: !!g?.canApprove, canExport: !!g?.canExport,
    };
  });
}

function bySort(a: LocalRole, b: LocalRole): number {
  return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name);
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

const str = (v: unknown): string => (typeof v === 'string' ? v : v == null ? '' : String(v));
const strOrNull = (v: unknown): string | null => (v == null || v === '' ? null : String(v));
const num = (v: unknown): number => (typeof v === 'number' ? v : Number(v) || 0);

function toRole(r: Row): SetupRole {
  const code = str(r['code']);
  return {
    id: num(r['id']), code, name: str(r['name']), description: strOrNull(r['description']), isSystem: !!r['isSystem'],
    isActive: !!r['isActive'], isLocked: !!r['isLocked'] || code === SUPER_ADMIN, sortOrder: num(r['sortOrder']),
    pageCount: num(r['pageCount']), fieldRuleCount: num(r['fieldRuleCount']), updatedAt: str(r['updatedAt']), updatedBy: strOrNull(r['updatedBy']),
  };
}

function toPermission(r: Row): PagePermission {
  const actions = str(r['actions'] || 'view').split(',').map((a) => a.trim()).filter(Boolean) as AccessAction[];
  return {
    pageKey: str(r['pageKey']), name: str(r['name']), moduleName: str(r['moduleName']), actions, sortOrder: num(r['sortOrder']),
    canView: !!r['canView'], canCreate: !!r['canCreate'], canEdit: !!r['canEdit'],
    canDelete: !!r['canDelete'], canApprove: !!r['canApprove'], canExport: !!r['canExport'],
  };
}

function toForm(r: Row): SetupForm {
  return { formKey: str(r['formKey']), fieldCount: num(r['fieldCount']), lastSeenAt: strOrNull(r['lastSeenAt']) };
}

function toFieldSetting(r: Row): FieldSetting {
  const req = str(r['requirement']);
  return {
    formKey: str(r['formKey']), fieldKey: str(r['fieldKey']), label: str(r['label']) || str(r['fieldKey']), sortOrder: num(r['sortOrder']),
    isHidden: !!r['isHidden'], isReadOnly: !!r['isReadOnly'],
    requirement: (req === 'Required' || req === 'Optional' ? req : 'Default') as FieldRequirement,
  };
}

function unreachable(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) return true;
  return error.status === 0 || error.status === 404 || error.status >= 500;
}

function readableError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 403) {
      const b = error.error as { detail?: string } | null;
      return b?.detail || 'You do not have access to change this.';
    }
    const b = error.error as { detail?: string; title?: string; errors?: Record<string, string[]> } | null;
    const first = b?.errors ? Object.values(b.errors)[0]?.[0] : undefined;
    return first || b?.detail || b?.title || 'The server could not complete this action.';
  }
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}
