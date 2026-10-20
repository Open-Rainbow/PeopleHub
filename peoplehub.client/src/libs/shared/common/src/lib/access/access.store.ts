import { defaultPermissions, SYSTEM_ROLES } from './access.defaults';
import { FieldRule, PageAccess } from './access.models';

/**
 * Offline demo store for Setup (used only when the API is not reachable).
 * Same rules as the `sec` stored procedures so the app behaves the same without a server.
 */
export const SETUP_STORE_KEY = 'ph.setup.v1';

export interface LocalRole {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  updatedBy: string | null;
}

export interface LocalFormField {
  fieldKey: string;
  label: string;
  sortOrder: number;
}

export interface LocalSetupStore {
  nextId: number;
  roles: LocalRole[];
  /** Role code -> page access. */
  permissions: Record<string, PageAccess[]>;
  /** Role code -> non-default field rules. */
  fields: Record<string, FieldRule[]>;
  /** Form key -> fields the app reported. */
  forms: Record<string, LocalFormField[]>;
  /** Form key -> last time it was reported. */
  formSeen: Record<string, string>;
}

export function readSetupStore(): LocalSetupStore {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(SETUP_STORE_KEY) : null;
    const parsed = raw ? (JSON.parse(raw) as LocalSetupStore) : null;
    if (parsed && Array.isArray(parsed.roles) && parsed.permissions && parsed.fields && parsed.forms) {
      parsed.formSeen = parsed.formSeen ?? {};
      return parsed;
    }
  } catch {
    // fall through to a fresh seed
  }
  const fresh = seedSetupStore();
  writeSetupStore(fresh);
  return fresh;
}

export function writeSetupStore(store: LocalSetupStore): void {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(SETUP_STORE_KEY, JSON.stringify(store));
  } catch {
    // storage full / blocked: keep working in memory
  }
}

export function seedSetupStore(): LocalSetupStore {
  const now = nowIso();
  const roles: LocalRole[] = SYSTEM_ROLES.map((r, i) => ({
    id: i + 1,
    code: r.code,
    name: r.name,
    description: r.description,
    isSystem: true,
    isActive: true,
    sortOrder: r.sortOrder,
    createdAt: now,
    updatedAt: now,
    updatedBy: 'seed',
  }));
  const permissions: Record<string, PageAccess[]> = {};
  roles.forEach((r) => (permissions[r.code] = defaultPermissions(r.code)));
  return { nextId: roles.length + 1, roles, permissions, fields: {}, forms: {}, formSeen: {} };
}

export function nowIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
