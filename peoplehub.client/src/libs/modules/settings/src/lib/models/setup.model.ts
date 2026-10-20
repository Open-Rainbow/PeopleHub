import { AccessAction, FieldRequirement } from 'common';

export interface SetupRole {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  isLocked: boolean;
  sortOrder: number;
  pageCount: number;
  fieldRuleCount: number;
  updatedAt: string;
  updatedBy: string | null;
}

export interface RoleDraft {
  code: string;
  name: string;
  description: string;
  copyFromRoleId: number | null;
}

export interface PagePermission {
  pageKey: string;
  name: string;
  moduleName: string;
  actions: AccessAction[];
  sortOrder: number;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
}

export interface SetupForm {
  formKey: string;
  fieldCount: number;
  lastSeenAt: string | null;
}

export interface FieldSetting {
  formKey: string;
  fieldKey: string;
  label: string;
  sortOrder: number;
  isHidden: boolean;
  isReadOnly: boolean;
  requirement: FieldRequirement;
}

export const SETUP_LIMITS = {
  codeMax: 30,
  nameMin: 2,
  nameMax: 60,
  descriptionMax: 200,
};

export const ROLE_CODE_PATTERN = /^[a-z][a-z0-9-]{1,29}$/;
