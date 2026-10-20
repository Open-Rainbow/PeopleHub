/** Page / field access of the signed-in role (PeopleHub.Server SetupController, schema `sec`). */

export type AccessAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';
export const ACCESS_ACTIONS: AccessAction[] = ['view', 'create', 'edit', 'delete', 'approve', 'export'];

export type FieldRequirement = 'Default' | 'Required' | 'Optional';
export const FIELD_REQUIREMENTS: FieldRequirement[] = ['Default', 'Required', 'Optional'];

export const SUPER_ADMIN = 'superadmin';
export const ADMIN = 'admin';

export interface PageAccess {
  pageKey: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
}

export interface FieldRule {
  formKey: string;
  fieldKey: string;
  isHidden: boolean;
  isReadOnly: boolean;
  requirement: FieldRequirement;
}

export interface MyAccess {
  role: string;
  isSuperAdmin: boolean;
  pages: PageAccess[];
  fields: FieldRule[];
  /** Where it came from: the API, or the offline demo store when the API is not reachable. */
  source: 'api' | 'local';
}

export interface PageDef {
  pageKey: string;
  name: string;
  moduleName: string;
  actions: AccessAction[];
  sortOrder: number;
}

export interface RoleDef {
  code: string;
  name: string;
  description: string;
  sortOrder: number;
}

/** Rule as the shared ui controls understand it (see UI_FIELD_POLICY in the ui lib). */
export interface FieldPolicyRule {
  hidden: boolean;
  readOnly: boolean;
  requirement: FieldRequirement;
}

const FLAG: Record<AccessAction, keyof PageAccess> = {
  view: 'canView',
  create: 'canCreate',
  edit: 'canEdit',
  delete: 'canDelete',
  approve: 'canApprove',
  export: 'canExport',
};

export function allows(p: PageAccess | undefined | null, action: AccessAction): boolean {
  return !!p && p[FLAG[action]] === true;
}

export function flagOf(action: AccessAction): keyof PageAccess {
  return FLAG[action];
}

export function emptyAccess(pageKey: string): PageAccess {
  return { pageKey, canView: false, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false };
}
