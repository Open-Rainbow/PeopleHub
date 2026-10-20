import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  ChipComponent,
  DropdownComponent,
  IconButtonComponent,
  LoaderComponent,
  NoticeBannerComponent,
  optionLabelOf,
  TabButtonComponent,
  TabButtonItem,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  ToggleComponent,
} from 'ui';
import { ACCESS_ACTIONS, AccessAction, AccessService, ADMIN, FieldRequirement, flagOf, PageAccess, SUPER_ADMIN } from 'common';
import { SetupBodyPortalDirective } from '../../directives/setup-body-portal.directive';
import { FieldSetting, PagePermission, RoleDraft, SETUP_LIMITS, SetupForm, SetupRole } from '../../models/setup.model';
import { SetupService } from '../../services/setup.service';

type Tab = 'roles' | 'access' | 'fields';
type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

/** Chip / banner colours from the theme tokens only (light + dark). */
const TONES: Record<Tone, { color: string; bg: string }> = {
  primary: { color: 'var(--color-primary)', bg: 'var(--color-primary-soft)' },
  success: { color: 'var(--color-success)', bg: 'color-mix(in srgb, var(--color-success) 14%, transparent)' },
  warning: { color: 'var(--color-warning)', bg: 'color-mix(in srgb, var(--color-warning) 16%, transparent)' },
  danger: { color: 'var(--color-danger)', bg: 'color-mix(in srgb, var(--color-danger) 14%, transparent)' },
  neutral: { color: 'var(--color-text-secondary)', bg: 'var(--color-surface-muted)' },
};

function bannerTone(t: Tone) {
  return {
    bannerColor: TONES[t].bg,
    headingColor: TONES[t].color,
    contentColor: 'var(--color-text-primary)',
    highlighterColor: TONES[t].color,
    iconColor: TONES[t].color,
  };
}

const ACTION_LABELS: Record<AccessAction, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  delete: 'Delete',
  approve: 'Approve',
  export: 'Export',
};

/**
 * Setup (Admin / Super Admin): roles, what each role can open and do, and how form fields behave per role.
 * Route: /admin/setup and /superadmin/setup. Needs "setup" access; Super Admin is always full access.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'setup-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonGroupComponent,
    ChipComponent,
    DropdownComponent,
    IconButtonComponent,
    LoaderComponent,
    NoticeBannerComponent,
    TabButtonComponent,
    TextAreaComponent,
    TextBoxComponent,
    TextButtonComponent,
    ToastStackComponent,
    ToggleComponent,
    SetupBodyPortalDirective,
  ],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  private readonly service = inject(SetupService);
  private readonly accessService = inject(AccessService);

  readonly limits = SETUP_LIMITS;
  readonly actions = ACCESS_ACTIONS;
  readonly actionLabels = ACTION_LABELS;
  readonly tone = (t: Tone) => TONES[t];
  readonly errorBanner = bannerTone('danger');
  readonly infoBanner = bannerTone('primary');
  readonly warnBanner = bannerTone('warning');
  readonly myRole = this.accessService.role();

  readonly tabs: TabButtonItem[] = [
    { id: 'roles', label: 'Roles' },
    { id: 'access', label: 'Page access' },
    { id: 'fields', label: 'Field settings' },
  ];
  readonly tab = signal<Tab>('roles');

  readonly isOnline = this.service.isOnline;
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  readonly canCreate = computed(() => this.allowedOnSetup('create'));
  readonly canEdit = computed(() => this.allowedOnSetup('edit'));
  readonly canDelete = computed(() => this.allowedOnSetup('delete'));

  // ---- Roles ---------------------------------------------------------------------------------
  readonly roles = signal<SetupRole[]>([]);
  readonly roleItems = computed<ButtonGroupItem[]>(() =>
    this.roles()
      .filter((r) => r.isActive)
      .map((r) => ({ label: r.name, value: String(r.id) })),
  );
  readonly fieldRoleItems = computed<ButtonGroupItem[]>(() =>
    this.roles()
      .filter((r) => r.isActive && !r.isLocked)
      .map((r) => ({ label: r.name, value: String(r.id) })),
  );
  readonly roleStats = computed(() => {
    const list = this.roles();
    return [
      { label: 'Roles', value: String(list.length) },
      { label: 'Active', value: String(list.filter((r) => r.isActive).length) },
      { label: 'Custom', value: String(list.filter((r) => !r.isSystem).length) },
      { label: 'Field rules', value: String(list.reduce((s, r) => s + r.fieldRuleCount, 0)) },
    ];
  });

  readonly editingRole = signal<SetupRole | 'new' | null>(null);
  readonly editingExisting = computed(() => {
    const e = this.editingRole();
    return e && e !== 'new' ? e : null;
  });
  readonly roleForm = new FormGroup({
    code: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    copyFrom: new FormControl<number | null>(null),
  });
  readonly roleFormKey = signal(0);
  readonly roleError = signal<string | null>(null);
  readonly copyNames = computed(() => ['Start with no access', ...this.roles().filter((r) => !r.isLocked).map((r) => r.name)]);
  readonly copyOptions = computed(() => toDropdownOptions(this.copyNames()));
  readonly deletingRole = signal<SetupRole | null>(null);

  // ---- Page access ---------------------------------------------------------------------------
  readonly accessRoleId = signal<number | null>(null);
  readonly accessRole = computed(() => this.roles().find((r) => r.id === this.accessRoleId()) ?? null);
  readonly permissions = signal<PagePermission[]>([]);
  readonly permLoading = signal(false);
  readonly permDirty = signal(false);
  readonly permKey = signal(0);
  permForm = new FormGroup<Record<string, FormControl<boolean>>>({});
  readonly permGroups = computed(() => groupBy(this.permissions(), (p) => p.moduleName));
  readonly accessLockReason = computed(() => this.lockReason(this.accessRole()));
  readonly grantedCount = computed(() => this.permissions().filter((p) => p.canView).length);

  // ---- Field settings ------------------------------------------------------------------------
  readonly fieldRoleId = signal<number | null>(null);
  readonly fieldRole = computed(() => this.roles().find((r) => r.id === this.fieldRoleId()) ?? null);
  readonly forms = signal<SetupForm[]>([]);
  readonly formKey = signal<string | null>(null);
  readonly fieldRows = signal<FieldSetting[]>([]);
  readonly fieldsLoading = signal(false);
  readonly fieldsDirty = signal(false);
  readonly formOptions = computed(() => toDropdownOptions(this.forms().map((f) => formLabel(f.formKey))));
  readonly formPickForm = new FormGroup({ form: new FormControl<number | null>(null) });
  readonly formPickKey = signal(0);
  readonly fieldsLockReason = computed(() => this.lockReason(this.fieldRole()));
  readonly ruleCount = computed(() => this.fieldRows().filter((f) => f.isHidden || f.isReadOnly || f.requirement !== 'Default').length);
  readonly visibilityItems: ButtonGroupItem[] = [
    { label: 'Visible', value: 'visible' },
    { label: 'Hidden', value: 'hidden' },
  ];
  readonly editingItems: ButtonGroupItem[] = [
    { label: 'Editable', value: 'editable' },
    { label: 'Read-only', value: 'readonly' },
  ];
  readonly requirementItems: ButtonGroupItem[] = [
    { label: 'As designed', value: 'Default' },
    { label: 'Required', value: 'Required' },
    { label: 'Optional', value: 'Optional' },
  ];
  readonly formLabel = formLabel;

  async ngOnInit(): Promise<void> {
    this.formPickForm.controls.form.valueChanges.subscribe((v) => void this.onFormPicked(v));
    await this.accessService.load();
    await this.reload();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.deletingRole()) this.deletingRole.set(null);
    else if (this.editingRole()) this.closeRoleEditor();
  }

  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.loadRoles();
      if (this.tab() === 'access') await this.loadPermissions();
      if (this.tab() === 'fields') await this.loadForms();
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  async onTab(id: string): Promise<void> {
    const next: Tab = id === 'access' ? 'access' : id === 'fields' ? 'fields' : 'roles';
    if (next === this.tab()) return;
    if (!this.confirmLeave()) return;
    this.tab.set(next);
    if (next === 'access') await this.loadPermissions();
    if (next === 'fields') await this.loadForms();
  }

  // ---- Roles ---------------------------------------------------------------------------------

  private async loadRoles(): Promise<void> {
    const roles = await this.service.roles();
    this.service.remember(roles);
    this.roles.set(roles);
    const firstEditable = roles.find((r) => r.isActive && !r.isLocked) ?? roles[0] ?? null;
    if (!roles.some((r) => r.id === this.accessRoleId())) this.accessRoleId.set(firstEditable?.id ?? null);
    if (!roles.some((r) => r.id === this.fieldRoleId() && !r.isLocked)) this.fieldRoleId.set(firstEditable?.id ?? null);
  }

  canChange(r: SetupRole | null): boolean {
    return !this.lockReason(r);
  }

  openRoleEditor(r?: SetupRole): void {
    this.roleForm.reset({ code: '', name: r?.name ?? '', description: r?.description ?? '', copyFrom: null });
    this.roleError.set(null);
    this.editingRole.set(r ?? 'new');
    this.roleFormKey.update((k) => k + 1);
  }

  closeRoleEditor(): void {
    if (!this.busy()) this.editingRole.set(null);
  }

  /** Suggests a code from the name for new roles ("Team Lead" -> "team-lead"). */
  onRoleNameChange(name: string): void {
    if (this.editingExisting() || this.roleForm.controls.code.dirty) return;
    const code = (name ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/^[^a-z]+/, '')
      .slice(0, SETUP_LIMITS.codeMax);
    this.roleForm.controls.code.setValue(code);
  }

  async saveRole(): Promise<void> {
    const v = this.roleForm.getRawValue();
    const current = this.editingExisting();
    const copyName = optionLabelOf(this.copyOptions(), v.copyFrom);
    const copyFrom = this.roles().find((r) => r.name === copyName && !r.isLocked) ?? null;
    const draft: RoleDraft = { code: v.code ?? '', name: v.name ?? '', description: v.description ?? '', copyFromRoleId: copyFrom?.id ?? null };

    const problem = roleProblem(draft, !current);
    if (problem) {
      this.roleError.set(problem);
      return;
    }

    this.busy.set(true);
    this.roleError.set(null);
    try {
      const saved = current ? await this.service.updateRole(current.id, draft) : await this.service.createRole(draft);
      this.busy.set(false);
      this.editingRole.set(null);
      this.toast(current ? `"${saved.name}" saved.` : `"${saved.name}" created${copyFrom ? ` as a copy of ${copyFrom.name}` : ''}. Now give it page access.`, 'success');
      await this.loadRoles();
      if (!current) this.accessRoleId.set(saved.id);
    } catch (e) {
      this.roleError.set(message(e));
    } finally {
      this.busy.set(false);
    }
  }

  async toggleRoleStatus(r: SetupRole): Promise<void> {
    this.busy.set(true);
    try {
      await this.service.setRoleStatus(r.id, !r.isActive);
      this.toast(r.isActive ? `"${r.name}" deactivated. People with this role lose access.` : `"${r.name}" is active again.`, 'success');
      await this.loadRoles();
      await this.accessService.load(true);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  async confirmDeleteRole(): Promise<void> {
    const r = this.deletingRole();
    if (!r) return;
    this.busy.set(true);
    try {
      await this.service.deleteRole(r.id);
      this.deletingRole.set(null);
      this.toast(`"${r.name}" deleted.`, 'success');
      await this.loadRoles();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  async openAccessFor(r: SetupRole): Promise<void> {
    this.accessRoleId.set(r.id);
    this.tab.set('access');
    await this.loadPermissions();
  }

  async openFieldsFor(r: SetupRole): Promise<void> {
    if (r.isLocked) return;
    this.fieldRoleId.set(r.id);
    this.tab.set('fields');
    await this.loadForms();
  }

  // ---- Page access ---------------------------------------------------------------------------

  async pickAccessRole(values: string[]): Promise<void> {
    const id = Number(values[0]);
    if (!id || id === this.accessRoleId()) return;
    if (!this.confirmLeave()) return;
    this.accessRoleId.set(id);
    await this.loadPermissions();
  }

  private async loadPermissions(): Promise<void> {
    const id = this.accessRoleId();
    if (!id) return;
    this.permLoading.set(true);
    try {
      this.setPermissions(await this.service.permissions(id));
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.permLoading.set(false);
    }
  }

  private setPermissions(list: PagePermission[]): void {
    const controls: Record<string, FormControl<boolean>> = {};
    for (const p of list) {
      for (const a of p.actions) controls[ctrlKey(p.pageKey, a)] = new FormControl(!!p[flagOf(a)], { nonNullable: true });
    }
    this.permForm = new FormGroup(controls);
    this.permForm.valueChanges.subscribe(() => this.permDirty.set(true));
    this.permissions.set(list);
    this.permDirty.set(false);
    this.permKey.update((k) => k + 1);
  }

  ctrlKey(pageKey: string, action: AccessAction): string {
    return ctrlKey(pageKey, action);
  }

  allowed(p: PagePermission, action: AccessAction): boolean {
    return !!p[flagOf(action)];
  }

  async savePermissions(): Promise<void> {
    const role = this.accessRole();
    if (!role || this.accessLockReason()) return;
    const v = this.permForm.getRawValue() as Record<string, boolean>;
    const items: PageAccess[] = this.permissions().map((p) => {
      const on = (a: AccessAction) => p.actions.includes(a) && !!v[ctrlKey(p.pageKey, a)];
      return {
        pageKey: p.pageKey,
        canView: on('view'),
        canCreate: on('create'),
        canEdit: on('edit'),
        canDelete: on('delete'),
        canApprove: on('approve'),
        canExport: on('export'),
      };
    });
    await this.persistPermissions(() => this.service.savePermissions(role.id, items), `Page access for ${role.name} saved.`);
  }

  async resetPermissions(): Promise<void> {
    const role = this.accessRole();
    if (!role || this.accessLockReason()) return;
    await this.persistPermissions(
      () => this.service.resetPermissions(role),
      role.isSystem ? `${role.name} is back to the default access.` : `${role.name} has no page access now.`,
    );
  }

  discardPermissions(): void {
    this.setPermissions(this.permissions());
  }

  private async persistPermissions(save: () => Promise<PagePermission[]>, done: string): Promise<void> {
    this.busy.set(true);
    try {
      this.setPermissions(await save());
      this.toast(done, 'success');
      await this.loadRoles();
      await this.accessService.load(true);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Field settings ------------------------------------------------------------------------

  private async loadForms(): Promise<void> {
    this.fieldsLoading.set(true);
    try {
      const forms = await this.service.forms();
      this.forms.set(forms);
      const keep = forms.find((f) => f.formKey === this.formKey()) ?? forms[0] ?? null;
      this.formKey.set(keep?.formKey ?? null);
      const option = keep ? this.formOptions()[forms.indexOf(keep)] : undefined;
      this.formPickForm.controls.form.setValue(option ? (option.value as number) : null, { emitEvent: false });
      this.formPickKey.update((k) => k + 1);
      await this.loadFields();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.fieldsLoading.set(false);
    }
  }

  async pickFieldRole(values: string[]): Promise<void> {
    const id = Number(values[0]);
    if (!id || id === this.fieldRoleId()) return;
    if (!this.confirmLeave()) return;
    this.fieldRoleId.set(id);
    await this.loadFields();
  }

  private async onFormPicked(value: number | null): Promise<void> {
    const label = optionLabelOf(this.formOptions(), value);
    const form = this.forms().find((f) => formLabel(f.formKey) === label);
    if (!form || form.formKey === this.formKey()) return;
    if (!this.confirmLeave()) return;
    this.formKey.set(form.formKey);
    await this.loadFields();
  }

  private async loadFields(): Promise<void> {
    const role = this.fieldRole();
    const formKey = this.formKey();
    if (!role || role.isLocked || !formKey) {
      this.fieldRows.set([]);
      this.fieldsDirty.set(false);
      return;
    }
    this.fieldsLoading.set(true);
    try {
      this.fieldRows.set(await this.service.fieldSettings(role.id, formKey));
      this.fieldsDirty.set(false);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.fieldsLoading.set(false);
    }
  }

  setVisibility(f: FieldSetting, values: string[]): void {
    this.patchField(f, { isHidden: values[0] === 'hidden' });
  }

  setEditing(f: FieldSetting, values: string[]): void {
    this.patchField(f, { isReadOnly: values[0] === 'readonly' });
  }

  setRequirement(f: FieldSetting, values: string[]): void {
    const r = values[0] as FieldRequirement;
    this.patchField(f, { requirement: r === 'Required' || r === 'Optional' ? r : 'Default' });
  }

  resetFields(): void {
    this.fieldRows.update((rows) => rows.map((r) => ({ ...r, isHidden: false, isReadOnly: false, requirement: 'Default' as FieldRequirement })));
    this.fieldsDirty.set(true);
  }

  async discardFields(): Promise<void> {
    await this.loadFields();
  }

  async saveFields(): Promise<void> {
    const role = this.fieldRole();
    const formKey = this.formKey();
    if (!role || !formKey || this.fieldsLockReason()) return;
    this.busy.set(true);
    try {
      this.fieldRows.set(await this.service.saveFieldSettings(role.id, formKey, this.fieldRows()));
      this.fieldsDirty.set(false);
      this.toast(`Field settings for ${role.name} on ${formLabel(formKey)} saved. They apply next time the form is opened.`, 'success');
      await this.loadRoles();
      await this.accessService.load(true);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  private patchField(f: FieldSetting, patch: Partial<FieldSetting>): void {
    this.fieldRows.update((rows) => rows.map((r) => (r.fieldKey === f.fieldKey ? { ...r, ...patch } : r)));
    this.fieldsDirty.set(true);
  }

  // ---- Helpers -------------------------------------------------------------------------------

  private allowedOnSetup(action: AccessAction): boolean {
    this.accessService.version();
    return this.accessService.can('setup', action);
  }

  /** Why a role cannot be changed by the signed-in user (null = it can). */
  private lockReason(r: SetupRole | null): string | null {
    if (!r) return 'Pick a role.';
    if (r.isLocked) return 'Super Admin always has full access to every page and field. It cannot be changed.';
    if (!this.canEdit()) return 'You can look, but your role cannot change Setup.';
    if (r.code === ADMIN && this.myRole !== SUPER_ADMIN) return 'Only Super Admin can change the Admin role.';
    return null;
  }

  private confirmLeave(): boolean {
    if (!this.permDirty() && !this.fieldsDirty()) return true;
    const ok = typeof window === 'undefined' || window.confirm('You have unsaved changes. Discard them?');
    if (ok) {
      this.permDirty.set(false);
      this.fieldsDirty.set(false);
    }
    return ok;
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }
}

function ctrlKey(pageKey: string, action: AccessAction): string {
  return `${pageKey.replace(/[^A-Za-z0-9]/g, '_')}__${action}`;
}

/** "add-employee/personal-info" -> "Add employee › Personal info". */
export function formLabel(formKey: string): string {
  return formKey
    .split('/')
    .filter(Boolean)
    .map((s) => {
      const words = s.replace(/[-_.]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').trim().toLowerCase();
      return words.charAt(0).toUpperCase() + words.slice(1);
    })
    .join(' › ');
}

function groupBy<T>(list: T[], key: (item: T) => string): { name: string; items: T[] }[] {
  const groups: { name: string; items: T[] }[] = [];
  for (const item of list) {
    const name = key(item);
    let g = groups.find((x) => x.name === name);
    if (!g) {
      g = { name, items: [] };
      groups.push(g);
    }
    g.items.push(item);
  }
  return groups;
}

function roleProblem(d: RoleDraft, isNew: boolean): string | null {
  if (isNew && !/^[a-z][a-z0-9-]{1,29}$/.test(d.code.trim().toLowerCase()))
    return 'Code: 2-30 lower-case letters, digits or dashes, starting with a letter (e.g. team-lead).';
  const n = d.name.trim().length;
  if (n < SETUP_LIMITS.nameMin || n > SETUP_LIMITS.nameMax) return `Name: ${SETUP_LIMITS.nameMin}-${SETUP_LIMITS.nameMax} characters.`;
  if (d.description.trim().length > SETUP_LIMITS.descriptionMax) return `Description: up to ${SETUP_LIMITS.descriptionMax} characters.`;
  return null;
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
