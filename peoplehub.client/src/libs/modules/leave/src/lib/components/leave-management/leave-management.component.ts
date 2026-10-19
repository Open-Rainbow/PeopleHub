import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent, TextButtonComponent } from 'ui';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import {
  ALLOWANCE_BASES,
  APPROVAL_STYLES,
  APPROVAL_TYPES,
  CATEGORY_MAP,
  DEFAULT_EMPLOYMENT_TYPES,
  POLICY_CATEGORIES,
  POLICY_LIMITS,
} from '../../config/leave-policy-options';
import {
  LeavePolicy,
  LeavePolicyItem,
  LeavePolicySummary,
  PolicyCategory,
  PolicyChange,
  PolicyItemErrors,
} from '../../models/leave-policy.model';
import { LeavePolicyService } from '../../services/leave-policy.service';
import { daysLabel, diffPolicies, emptyItem, sameItems, slugify, validateItem, validatePolicy } from '../../utils/leave-policy.utils';

type Dialog = 'publish' | 'discard' | 'copy' | 'leave' | null;

/**
 * Leave Policy Manager (HR / admin).
 * One policy per year + employment type: edit a working copy, save it as a draft, publish it.
 * Apply Leave uses the published version (see sp_apply_leave).
 */
@Component({
  selector: 'leave-management-root',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TextButtonComponent, BodyPortalDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementComponent implements OnInit {
  private readonly service = inject(LeavePolicyService);

  readonly categories = POLICY_CATEGORIES;
  readonly categoryMap = CATEGORY_MAP;
  readonly bases = ALLOWANCE_BASES;
  readonly approvals = APPROVAL_TYPES;
  readonly approvalStyles = APPROVAL_STYLES;
  readonly limits = POLICY_LIMITS;
  readonly daysLabel = daysLabel;

  readonly currentYear = new Date().getFullYear();
  readonly years = [this.currentYear + 1, this.currentYear, this.currentYear - 1, this.currentYear - 2];

  readonly year = signal(this.currentYear);
  readonly employmentType = signal(DEFAULT_EMPLOYMENT_TYPES[0]);
  readonly employmentTypes = signal<string[]>(DEFAULT_EMPLOYMENT_TYPES);
  readonly summaries = signal<LeavePolicySummary[]>([]);

  /** Last version loaded from / saved to the server. */
  readonly policy = signal<LeavePolicy | null>(null);
  /** Working copy being edited. */
  readonly items = signal<LeavePolicyItem[]>([]);

  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly isOnline = this.service.isOnline;
  readonly error = signal<string | null>(null);
  readonly toast = signal<string | null>(null);
  readonly search = signal('');
  readonly collapsed = signal<Record<string, boolean>>({});

  // Drawer
  readonly drawerOpen = signal(false);
  readonly editingIndex = signal<number | null>(null);
  readonly form = signal<LeavePolicyItem>(emptyItem());
  readonly codeTouched = signal(false);
  readonly submitted = signal(false);

  // Dialogs
  readonly dialog = signal<Dialog>(null);
  readonly pendingRemove = signal<number | null>(null);
  readonly copySource = signal(this.currentYear - 1);
  readonly copyAll = signal(false);
  private pendingSwitch: (() => void) | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  readonly status = computed(() => this.policy()?.status ?? 'None');
  readonly dirty = computed(() => {
    const p = this.policy();
    if (!p) return false;
    return p.status === 'None' ? true : !sameItems(this.items(), p.items);
  });
  readonly canPublish = computed(() => this.items().length > 0 && (this.status() === 'Draft' || this.dirty()));

  /** Changes compared with the version in force. */
  readonly changes = computed<PolicyChange[]>(() => {
    const p = this.policy();
    return p && p.hasPublished ? diffPolicies(this.items(), p.publishedItems) : [];
  });
  readonly changeByCode = computed(() =>
    this.changes().reduce((map, c) => ({ ...map, [c.code]: c }), {} as Record<string, PolicyChange>),
  );

  readonly policyProblems = computed(() => validatePolicy(this.items()));

  readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    return this.items()
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !q || item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q));
  });

  readonly groups = computed(() =>
    this.categories.map((category) => {
      const rows = this.filtered().filter((r) => r.item.category === category.id);
      return {
        category,
        rows,
        days: rows.reduce((n, r) => n + (r.item.annualAllowance ?? 0), 0),
        total: this.items().filter((i) => i.category === category.id).length,
      };
    }),
  );

  readonly summary = computed(() => {
    const items = this.items();
    const paid = items.filter((i) => i.isPaid);
    const totalDays = paid.reduce((n, i) => n + (i.annualAllowance ?? 0), 0);
    const byCategory = this.categories.map((c) => {
      const days = paid.filter((i) => i.category === c.id).reduce((n, i) => n + (i.annualAllowance ?? 0), 0);
      return { category: c, days, count: items.filter((i) => i.category === c.id).length, share: totalDays ? Math.round((days / totalDays) * 100) : 0 };
    });
    const byApproval = this.approvals
      .map((a) => ({ id: a.id, count: items.filter((i) => i.approvalType === a.id).length }))
      .filter((a) => a.count > 0);
    return {
      types: items.length,
      totalDays,
      carryForward: items.reduce((n, i) => n + i.carryForwardDays, 0),
      unpaid: items.length - paid.length,
      encashable: items.filter((i) => i.isEncashable).length,
      certificate: items.filter((i) => i.certificateRequired).length,
      byCategory,
      byApproval,
    };
  });

  readonly formErrors = computed<PolicyItemErrors>(() => {
    const index = this.editingIndex();
    const others = this.items().filter((_, i) => i !== index);
    return validateItem(this.form(), others);
  });
  readonly formValid = computed(() => Object.keys(this.formErrors()).length === 0);

  ngOnInit(): void {
    void this.init();
  }

  private async init(): Promise<void> {
    try {
      const types = await this.service.employmentTypes();
      this.employmentTypes.set(types);
      if (!types.includes(this.employmentType())) this.employmentType.set(types[0]);
    } catch {
      // keep defaults
    }
    await this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [policy, summaries] = await Promise.all([
        this.service.current(this.year(), this.employmentType()),
        this.service.summaries(this.year()),
      ]);
      this.applyPolicy(policy);
      this.summaries.set(summaries);
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  // ---- Year / employment type -------------------------------------------------

  selectYear(value: string | number): void {
    const year = Number(value);
    if (year === this.year()) return;
    this.guard(() => {
      this.year.set(year);
      this.copySource.set(year - 1);
      void this.load();
    });
  }

  selectType(type: string): void {
    if (type === this.employmentType()) return;
    this.guard(() => {
      this.employmentType.set(type);
      void this.load();
    });
  }

  tabState(type: string): { label: string; tone: string } {
    const s = this.summaries().find((x) => x.employmentType.replace(/[\s-]/g, '').toLowerCase() === type.replace(/[\s-]/g, '').toLowerCase());
    if (s?.hasDraft) return { label: s.publishedVersion ? `v${s.publishedVersion} + draft` : 'Draft', tone: 'bg-amber-400' };
    if (s?.publishedVersion) return { label: `Live v${s.publishedVersion}`, tone: 'bg-emerald-500' };
    return { label: 'Not set', tone: 'bg-gray-300' };
  }

  /** Asks before throwing away unsaved edits. */
  private guard(action: () => void): void {
    if (this.dirty() && this.status() !== 'None') {
      this.pendingSwitch = action;
      this.dialog.set('leave');
      return;
    }
    action();
  }

  confirmLeave(): void {
    const action = this.pendingSwitch;
    this.pendingSwitch = null;
    this.dialog.set(null);
    action?.();
  }

  // ---- Policy actions ---------------------------------------------------------

  async saveDraft(): Promise<boolean> {
    const problems = this.policyProblems();
    if (problems.length > 0) {
      this.error.set(problems[0]);
      return false;
    }
    return this.act(async () => {
      this.applyPolicy(await this.service.saveDraft(this.year(), this.employmentType(), this.items()));
      this.showToast('Draft saved');
    });
  }

  async publish(): Promise<void> {
    this.dialog.set(null);
    if (this.dirty() && !(await this.saveDraft())) return;
    await this.act(async () => {
      this.applyPolicy(await this.service.publish(this.year(), this.employmentType()));
      this.showToast(`${this.employmentType()} ${this.year()} policy is live`);
    });
  }

  async discard(): Promise<void> {
    this.dialog.set(null);
    if (this.status() !== 'Draft') {
      // Only local edits: reset to what was loaded.
      const p = this.policy();
      if (p) this.items.set(structuredClone(p.items));
      this.showToast('Changes discarded');
      return;
    }
    await this.act(async () => {
      this.applyPolicy(await this.service.discard(this.year(), this.employmentType()));
      this.showToast('Draft discarded');
    });
  }

  async copy(): Promise<void> {
    this.dialog.set(null);
    await this.act(async () => {
      const result = await this.service.copy(this.copySource(), this.year(), this.copyAll() ? null : this.employmentType());
      await this.load();
      this.showToast(result.message);
    });
  }

  resetLocalChanges(): void {
    this.dialog.set('discard');
  }

  private async act(work: () => Promise<void>): Promise<boolean> {
    this.busy.set(true);
    this.error.set(null);
    try {
      await work();
      await this.refreshSummaries();
      return true;
    } catch (e) {
      this.error.set(message(e));
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  private async refreshSummaries(): Promise<void> {
    try {
      this.summaries.set(await this.service.summaries(this.year()));
    } catch {
      // not critical
    }
  }

  private applyPolicy(policy: LeavePolicy): void {
    this.policy.set(policy);
    this.items.set(structuredClone(policy.items));
  }

  // ---- Leave type drawer ------------------------------------------------------

  openAdd(category: PolicyCategory = 'standard'): void {
    this.editingIndex.set(null);
    this.form.set(emptyItem(category));
    this.codeTouched.set(false);
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  openEdit(index: number): void {
    this.editingIndex.set(index);
    this.form.set(structuredClone(this.items()[index]));
    this.codeTouched.set(true);
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  duplicate(index: number): void {
    const source = this.items()[index];
    this.editingIndex.set(null);
    this.form.set({ ...structuredClone(source), code: '', label: `${source.label} (copy)` });
    this.codeTouched.set(false);
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  patch<K extends keyof LeavePolicyItem>(field: K, value: LeavePolicyItem[K]): void {
    this.form.update((f) => {
      const next = { ...f, [field]: value };
      if (field === 'label' && !this.codeTouched() && this.editingIndex() === null) next.code = '';
      if (field === 'isPaid' && value === false) next.isEncashable = false;
      if (field === 'isPaid' && value === true && next.annualAllowance === null) next.annualAllowance = 0;
      if (field === 'certificateRequired' && value === true && next.certificateAfterDays === null) next.certificateAfterDays = 2;
      return next;
    });
  }

  /** Number inputs: '' means "no value". */
  patchNumber(field: 'annualAllowance' | 'carryForwardDays' | 'mustBeTakenWithinMonths' | 'certificateAfterDays' | 'backdateDays' | 'maxConsecutive', value: unknown): void {
    const n = value === '' || value === null || value === undefined ? null : Number(value);
    const required = field === 'carryForwardDays' || field === 'backdateDays';
    this.patch(field, (n === null && required ? 0 : n) as never);
  }

  setUnlimited(on: boolean): void {
    this.patch('annualAllowance', on ? null : 0);
    if (on) this.patch('carryForwardDays', 0);
  }

  basisHint(): string {
    return this.bases.find((b) => b.id === this.form().allowanceBasis)?.hint ?? '';
  }

  codePreview(): string {
    const f = this.form();
    return f.code || (f.label.trim() ? slugify(f.label) : 'generated-from-name');
  }

  fieldError(field: keyof LeavePolicyItem): string | undefined {
    return this.submitted() || field === 'carryForwardDays' ? this.formErrors()[field] : undefined;
  }

  saveItem(): void {
    this.submitted.set(true);
    if (!this.formValid()) return;
    const item: LeavePolicyItem = {
      ...this.form(),
      label: this.form().label.trim(),
      description: this.form().description.trim(),
      certificateAfterDays: this.form().certificateRequired ? this.form().certificateAfterDays : null,
    };
    const index = this.editingIndex();
    this.items.update((list) => (index === null ? [...list, item] : list.map((x, i) => (i === index ? item : x))));
    this.drawerOpen.set(false);
    this.showToast(index === null ? `${item.label} added. Save the draft to keep it.` : `${item.label} updated`);
  }

  askRemove(index: number): void {
    this.pendingRemove.set(index);
  }

  confirmRemove(): void {
    const index = this.pendingRemove();
    if (index === null) return;
    const label = this.items()[index]?.label;
    this.items.update((list) => list.filter((_, i) => i !== index));
    this.pendingRemove.set(null);
    this.showToast(`${label} removed`);
  }

  toggleCategory(id: string): void {
    this.collapsed.update((c) => ({ ...c, [id]: !c[id] }));
  }

  changeOf(item: LeavePolicyItem): PolicyChange | undefined {
    return item.code ? this.changeByCode()[item.code] : this.policy()?.hasPublished ? { code: '', label: item.label, kind: 'added', fields: [] } : undefined;
  }

  removedChanges(): PolicyChange[] {
    return this.changes().filter((c) => c.kind === 'removed');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pendingRemove() !== null) this.pendingRemove.set(null);
    else if (this.dialog()) this.dialog.set(null);
    else if (this.drawerOpen()) this.drawerOpen.set(false);
  }

  private showToast(text: string): void {
    this.toast.set(text);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
  }
}

function message(error: unknown): string {
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}
