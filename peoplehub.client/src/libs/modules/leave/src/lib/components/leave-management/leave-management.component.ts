import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  ChipComponent,
  DropdownComponent,
  DropdownOption,
  IconButtonComponent,
  LoaderComponent,
  MultiSelectComponent,
  NoticeBannerComponent,
  NumberBoxComponent,
  optionLabelOf,
  optionValueOf,
  TextAreaComponent,
  TextBoxComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  ToggleComponent,
} from 'ui';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import { ALLOWANCE_BASES, APPROVAL_TYPES, DEFAULT_EMPLOYMENT_TYPES, POLICY_CATEGORIES, POLICY_LIMITS } from '../../config/leave-policy-options';
import { LeavePolicy, LeavePolicyItem, LeavePolicySummary, PolicyCategory, PolicyItemErrors } from '../../models/leave-policy.model';
import { LeavePolicyService } from '../../services/leave-policy.service';
import { emptyItem, sameItems, validateItem, validatePolicy } from '../../utils/leave-policy.utils';
import { formatDay } from '../../utils/leave-date.utils';
import { bannerTone, TONES, typeColor, typeTone } from '../../utils/leave-tones';

type Variant = 'standard' | 'parental' | 'compoff' | 'lop' | 'wfh' | 'additional';
type FieldKind = 'number' | 'select' | 'toggle' | 'notes';

interface Choice {
  label: string;
  value: unknown;
}

interface FieldDef {
  key: keyof LeavePolicyItem;
  label: string;
  kind: FieldKind;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  choices?: Choice[];
  /** Only shown when this returns true. */
  when?: (i: LeavePolicyItem) => boolean;
  /** Toggles and notes take the whole row. */
  wide?: boolean;
  hint?: string;
}

interface Row {
  uid: string;
  item: LeavePolicyItem;
}

interface YearChip {
  year: number;
  status: 'Active' | 'Draft' | 'New';
}

const YES_NO: Choice[] = [{ label: 'Yes', value: true }, { label: 'No', value: false }];
const APPROVALS: Choice[] = APPROVAL_TYPES.map((a) => ({ label: a.id === 'Manager' ? 'Manager only' : a.id, value: a.id }));
const BASES: Choice[] = ALLOWANCE_BASES.map((b) => ({ label: b.id === 'Monthly accrual' ? 'Monthly' : b.id, value: b.id }));
const WITHIN: Choice[] = [{ label: 'No limit', value: null }, ...[1, 2, 3, 6, 12].map((m) => ({ label: `${m} month${m > 1 ? 's' : ''}`, value: m }))];
const EXTENSION: Choice[] = [{ label: 'No', value: null }, ...[4, 8, 12].map((w) => ({ label: `Yes, up to ${w} weeks`, value: w }))];
const EXPIRY: Choice[] = [30, 60, 90, 180].map((d) => ({ label: `${d} days`, value: d }));

const CERT: FieldDef[] = [
  { key: 'certificateRequired', label: 'Require medical certificate', kind: 'toggle', wide: true, hint: 'for longer leaves' },
  { key: 'certificateAfterDays', label: 'Certificate required after', kind: 'number', suffix: 'days', min: 0.5, max: 365, step: 0.5, when: (i) => i.certificateRequired },
];
const NOTICE: FieldDef[] = [
  { key: 'advanceNoticeRequired', label: 'Require advance notice', kind: 'toggle', wide: true },
  { key: 'advanceNoticeHours', label: 'Advance notice period', kind: 'number', suffix: 'hours', min: 1, max: POLICY_LIMITS.noticeHoursMax, when: (i) => i.advanceNoticeRequired },
];

/** The fields of each leave type card (Leave Policy Manager mockup, page 7). */
const FIELDS: Record<Variant, FieldDef[]> = {
  standard: [
    { key: 'annualAllowance', label: 'Annual allowance', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'carryForwardDays', label: 'Carry forward', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'isEncashable', label: 'Encashment allowed', kind: 'select', choices: YES_NO },
    { key: 'allowanceBasis', label: 'Accrual method', kind: 'select', choices: BASES },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
    { key: 'maxConsecutive', label: 'Max days per request', kind: 'number', suffix: 'days', min: 0.5, max: 365, step: 0.5 },
    { key: 'backdateDays', label: 'Can apply up to (past)', kind: 'number', suffix: 'days', min: 0, max: 30 },
    ...CERT,
    ...NOTICE,
  ],
  parental: [
    { key: 'annualAllowance', label: 'Total duration', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'paidDays', label: 'Paid duration', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'extensionWeeks', label: 'Extension allowed', kind: 'select', choices: EXTENSION },
    { key: 'mustBeTakenWithinMonths', label: 'Must be taken within', kind: 'select', choices: WITHIN },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
    { key: 'eligibleAfterMonths', label: 'Eligible after', kind: 'number', suffix: 'months', min: 0, max: 60 },
    ...CERT,
    { key: 'notes', label: 'Additional policy notes', kind: 'notes', wide: true },
  ],
  compoff: [
    { key: 'isEnabled', label: 'Enable comp-off', kind: 'select', choices: YES_NO },
    { key: 'expiryDays', label: 'Expiry period', kind: 'select', choices: EXPIRY },
    { key: 'maxAccrual', label: 'Max accrual limit', kind: 'number', suffix: 'days', min: 0.5, max: 365, step: 0.5 },
    { key: 'annualAllowance', label: 'Days per year', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
    { key: 'mustBeTakenWithinMonths', label: 'Must be taken within', kind: 'select', choices: WITHIN },
  ],
  lop: [
    { key: 'isEnabled', label: 'Allow unpaid leave', kind: 'select', choices: YES_NO },
    { key: 'maxConsecutive', label: 'Max consecutive days', kind: 'number', suffix: 'days', min: 0.5, max: 365, step: 0.5 },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
  ],
  wfh: [
    { key: 'isEnabled', label: 'Enable WFH', kind: 'select', choices: YES_NO },
    { key: 'maxPerMonth', label: 'Max days per month', kind: 'number', suffix: 'days', min: 0.5, max: 31, step: 0.5 },
    { key: 'maxPerWeek', label: 'Max days per week', kind: 'number', suffix: 'days', min: 0.5, max: 7, step: 0.5 },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
    { key: 'eligibleAfterMonths', label: 'Eligible after', kind: 'number', suffix: 'months', min: 0, max: 60 },
    ...NOTICE,
  ],
  additional: [
    { key: 'isEnabled', label: 'Enabled', kind: 'select', choices: YES_NO },
    { key: 'annualAllowance', label: 'Days per year', kind: 'number', suffix: 'days', min: 0, max: 365 },
    { key: 'isPaid', label: 'Paid leave', kind: 'select', choices: YES_NO },
    { key: 'approvalType', label: 'Approval required', kind: 'select', choices: APPROVALS },
    { key: 'maxConsecutive', label: 'Max days per request', kind: 'number', suffix: 'days', min: 0.5, max: 365, step: 0.5 },
    ...CERT,
  ],
};

const CATEGORY_TITLES: Record<PolicyCategory, string> = {
  standard: 'Standard leave types',
  parental: 'Parental leave types',
  additional: 'Additional leave types',
};

let uidSeed = 0;
const nextUid = () => `lt${++uidSeed}`;

/**
 * Leave Policy Manager (HR / admin). One policy per year + employment type:
 * edit the leave types, Save Policy keeps a draft, Publish makes it live for Apply Leave.
 */
@Component({
  selector: 'leave-management-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipComponent,
    DropdownComponent,
    IconButtonComponent,
    LoaderComponent,
    MultiSelectComponent,
    NoticeBannerComponent,
    NumberBoxComponent,
    TextAreaComponent,
    TextBoxComponent,
    TextButtonComponent,
    ToastStackComponent,
    ToggleComponent,
    BodyPortalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss'],
})
export class LeaveManagementComponent implements OnInit, OnDestroy {
  private readonly service = inject(LeavePolicyService);
  private formSubs = new Subscription();
  private readonly subs = new Subscription();

  readonly tones = TONES;
  readonly infoBanner = bannerTone('info');
  readonly errorBanner = bannerTone('danger');
  readonly limits = POLICY_LIMITS;
  readonly categories = POLICY_CATEGORIES;
  readonly categoryTitles = CATEGORY_TITLES;
  readonly isOnline = this.service.isOnline;
  readonly currentYear = new Date().getFullYear();

  // ---- Year / employment type ------------------------------------------------------------------
  readonly year = signal(this.currentYear);
  readonly yearChips = signal<YearChip[]>([]);
  readonly employmentTypes = signal<string[]>(DEFAULT_EMPLOYMENT_TYPES);
  readonly employmentType = signal(DEFAULT_EMPLOYMENT_TYPES[0]);
  readonly typeOptions = computed(() => toDropdownOptions(this.employmentTypes()));
  readonly typeForm = new FormGroup({ type: new FormControl<number | null>(1) });
  readonly typeKey = signal(0);

  // ---- Policy ----------------------------------------------------------------------------------
  readonly policy = signal<LeavePolicy | null>(null);
  readonly rows = signal<Row[]>([]);
  readonly items = computed(() => this.rows().map((r) => r.item));
  readonly forms = new Map<string, FormGroup>();
  readonly formsVersion = signal(0);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly saveTried = signal(false);
  readonly collapsedGroups = signal<Record<string, boolean>>({});
  readonly collapsedCards = signal<Record<string, boolean>>({});

  readonly status = computed(() => this.policy()?.status ?? 'None');
  readonly dirty = computed(() => {
    const p = this.policy();
    return !!p && !sameItems(this.items(), p.items);
  });
  readonly problems = computed(() => validatePolicy(this.items()));
  readonly errorsByUid = computed(() => {
    const list = this.rows();
    const out: Record<string, PolicyItemErrors> = {};
    list.forEach((r, i) => (out[r.uid] = validateItem(r.item, list.filter((_, j) => j !== i).map((x) => x.item))));
    return out;
  });
  readonly groups = computed(() => this.categories.map((c) => ({ category: c, rows: this.rows().filter((r) => r.item.category === c.id) })));
  readonly lastModified = computed(() => {
    const p = this.policy();
    const at = p?.updatedAt ?? p?.publishedAt;
    return at ? formatDay(at.slice(0, 10), true) : 'not saved yet';
  });

  readonly summary = computed(() => {
    const items = this.items();
    const standardDays = items
      .filter((i) => i.category === 'standard' && i.isPaid && i.isEnabled)
      .reduce((n, i) => n + (i.annualAllowance ?? 0), 0);
    const approvals = APPROVAL_TYPES.map((a) => ({ id: a.id, count: items.filter((i) => i.approvalType === a.id).length })).filter((a) => a.count);
    return {
      standardDays,
      lines: items.map((i, idx) => ({ label: i.label || 'New leave type', color: typeColor(i.code, idx), ...this.summaryValue(i) })),
      types: items.length,
      paid: items.filter((i) => i.isPaid).length,
      unpaid: items.filter((i) => !i.isPaid).length,
      carryForward: items.reduce((n, i) => n + (i.carryForwardDays || 0), 0),
      encashable: items.filter((i) => i.isEncashable).length,
      approvals,
    };
  });

  // ---- Add leave type drawer -------------------------------------------------------------------
  readonly addOpen = signal(false);
  readonly addKey = signal(0);
  readonly addTried = signal(false);
  readonly addForm = new FormGroup({
    label: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    category: new FormControl<number | null>(1),
    annualAllowance: new FormControl<number | string>(6),
    carryForwardDays: new FormControl<number | string>(0),
    isEncashable: new FormControl(false, { nonNullable: true }),
    isPaid: new FormControl(true, { nonNullable: true }),
    mustBeTakenWithinMonths: new FormControl<number | string>(''),
    allowanceBasis: new FormControl<number | null>(1),
    employmentTypes: new FormControl<number[]>([]),
    approvalType: new FormControl<number | null>(2),
    certificateRequired: new FormControl(false, { nonNullable: true }),
    certificateAfterDays: new FormControl<number | string>(''),
  });
  readonly addDraft = signal<LeavePolicyItem>(emptyItem());
  readonly addErrors = computed(() => validateItem(this.addDraft(), this.items()));
  readonly categoryOptions = toDropdownOptions(POLICY_CATEGORIES.map((c) => c.label));
  readonly basisOptions = toDropdownOptions(ALLOWANCE_BASES.map((b) => b.id));
  readonly approvalOptions = toDropdownOptions(APPROVAL_TYPES.map((a) => a.id));

  // ---- Dialogs ---------------------------------------------------------------------------------
  readonly confirm = signal<{ title: string; text: string; action: string; danger?: boolean; run: () => void } | null>(null);
  readonly yearOpen = signal(false);
  readonly yearKey = signal(0);
  readonly yearForm = new FormGroup({
    year: new FormControl<number | null>(null),
    source: new FormControl<number | null>(1),
  });
  readonly newYearOptions = computed(() => {
    const taken = new Set(this.yearChips().filter((c) => c.status !== 'New').map((c) => c.year));
    return toDropdownOptions(Array.from({ length: 6 }, (_, i) => this.currentYear - 1 + i).filter((y) => !taken.has(y)).map(String));
  });
  readonly sourceOptions = computed(() => toDropdownOptions(['Organization defaults', ...this.yearChips().filter((c) => c.status !== 'New').map((c) => `Copy of ${c.year}`)]));

  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  async ngOnInit(): Promise<void> {
    this.subs.add(this.typeForm.controls.type.valueChanges.subscribe((v) => {
      const type = optionLabelOf(this.typeOptions(), v);
      if (type && type !== this.employmentType()) this.guard(() => this.switchType(type), () => this.resetTypeControl());
    }));
    this.subs.add(this.addForm.valueChanges.subscribe(() => this.addDraft.set(this.readAddForm())));
    try {
      const types = await this.service.employmentTypes();
      this.employmentTypes.set(types);
      if (!types.includes(this.employmentType())) this.employmentType.set(types[0]);
      this.resetTypeControl();
    } catch {
      // defaults
    }
    await Promise.all([this.load(), this.loadYears()]);
  }

  ngOnDestroy(): void {
    this.formSubs.unsubscribe();
    this.subs.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.confirm()) this.confirm.set(null);
    else if (this.yearOpen()) this.yearOpen.set(false);
    else if (this.addOpen()) this.addOpen.set(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(e: BeforeUnloadEvent): void {
    if (this.dirty()) e.preventDefault();
  }

  // ---- Loading ---------------------------------------------------------------------------------

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.applyPolicy(await this.service.current(this.year(), this.employmentType()));
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  private async loadYears(): Promise<void> {
    const years = [this.currentYear - 1, this.currentYear, this.currentYear + 1, this.currentYear + 2, this.currentYear + 3];
    const lists = await Promise.all(years.map((y) => this.service.summaries(y).catch(() => [] as LeavePolicySummary[])));
    const norm = (s: string) => s.replace(/[\s-]/g, '').toLowerCase();
    const chips: YearChip[] = [];
    years.forEach((y, i) => {
      const mine = lists[i].find((s) => norm(s.employmentType) === norm(this.employmentType()));
      const any = lists[i].length > 0;
      if (!any && y !== this.currentYear && y !== this.year()) return;
      chips.push({ year: y, status: mine?.publishedVersion ? 'Active' : mine?.hasDraft ? 'Draft' : 'New' });
    });
    if (!chips.some((c) => c.year === this.year())) chips.push({ year: this.year(), status: 'New' });
    this.yearChips.set(chips.sort((a, b) => a.year - b.year));
  }

  private applyPolicy(policy: LeavePolicy): void {
    this.policy.set(policy);
    this.buildRows(structuredClone(policy.items));
    this.saveTried.set(false);
  }

  /** One FormGroup per leave type card; edits flow back into `rows`. */
  private buildRows(items: LeavePolicyItem[]): void {
    this.formSubs.unsubscribe();
    this.formSubs = new Subscription();
    this.forms.clear();
    const rows = items.map((item) => ({ uid: nextUid(), item }));
    for (const r of rows) this.attachForm(r);
    this.rows.set(rows);
    this.formsVersion.update((v) => v + 1);
  }

  private attachForm(row: Row): void {
    const defs = this.fieldsOf(row.item);
    const group = new FormGroup<Record<string, FormControl>>({});
    for (const f of defs) group.addControl(this.ctrl(row.uid, f), new FormControl(this.toControl(row.item, f)));
    this.forms.set(row.uid, group);
    this.formSubs.add(group.valueChanges.subscribe(() => {
      this.rows.update((list) => list.map((r) => (r.uid === row.uid ? { ...r, item: this.fromForm(r.item, defs, group, r.uid) } : r)));
    }));
  }

  // ---- Fields ----------------------------------------------------------------------------------

  variantOf(i: LeavePolicyItem): Variant {
    if (i.code === 'comp-off') return 'compoff';
    if (i.code === 'wfh') return 'wfh';
    if (i.code === 'loss-of-pay' || i.code === 'unpaid' || (i.category === 'additional' && !i.isPaid && i.annualAllowance === null)) return 'lop';
    return i.category === 'parental' ? 'parental' : i.category === 'additional' ? 'additional' : 'standard';
  }

  fieldsOf(i: LeavePolicyItem): FieldDef[] {
    return FIELDS[this.variantOf(i)];
  }

  visibleFields(i: LeavePolicyItem): FieldDef[] {
    return this.fieldsOf(i).filter((f) => !f.when || f.when(i));
  }

  ctrl(uid: string, f: FieldDef): string {
    return `${uid}_${String(f.key)}`;
  }

  optionsOf(f: FieldDef): DropdownOption[] {
    return toDropdownOptions((f.choices ?? []).map((c) => c.label));
  }

  private toControl(item: LeavePolicyItem, f: FieldDef): unknown {
    const v = item[f.key];
    if (f.kind === 'select') {
      const idx = (f.choices ?? []).findIndex((c) => c.value === v || (c.value === null && (v === null || v === 0)));
      return idx >= 0 ? idx + 1 : null;
    }
    if (f.kind === 'number') return v === null || v === undefined ? '' : v;
    if (f.kind === 'toggle') return !!v;
    return v ?? '';
  }

  private fromForm(item: LeavePolicyItem, defs: FieldDef[], group: FormGroup, uid: string): LeavePolicyItem {
    const next = { ...item } as Record<string, unknown>;
    for (const f of defs) {
      const raw = group.get(this.ctrl(uid, f))?.value;
      if (f.kind === 'select') {
        const c = (f.choices ?? [])[Number(raw) - 1];
        if (c) next[f.key] = c.value;
      } else if (f.kind === 'number') {
        const n = raw === '' || raw === null || raw === undefined ? null : Number(raw);
        next[f.key] = f.key === 'carryForwardDays' || f.key === 'backdateDays' ? n ?? 0 : n;
      } else if (f.kind === 'toggle') {
        next[f.key] = !!raw;
      } else {
        next[f.key] = String(raw ?? '');
      }
    }
    const out = next as unknown as LeavePolicyItem;
    if (this.variantOf(item) === 'wfh' && out.maxPerMonth) out.annualAllowance = out.maxPerMonth * 12;
    if (!out.isPaid) out.isEncashable = false;
    if (!out.isPaid && this.variantOf(item) === 'lop') out.annualAllowance = null;
    return out;
  }

  fieldError(uid: string, f: FieldDef): string | undefined {
    return this.saveTried() ? this.errorsByUid()[uid]?.[f.key] : undefined;
  }

  hasErrors(uid: string): boolean {
    return Object.keys(this.errorsByUid()[uid] ?? {}).length > 0;
  }

  badge(i: LeavePolicyItem): string {
    switch (this.variantOf(i)) {
      case 'parental': return `${i.annualAllowance ?? 0} days`;
      case 'wfh': return i.isEnabled ? `${i.maxPerMonth ?? 0} days/month` : 'Off';
      case 'lop': return i.isEnabled ? 'Unpaid' : 'Off';
      case 'compoff': return i.isEnabled ? `max ${i.maxAccrual ?? 0} days` : 'Off';
      default: return i.isEnabled ? `${i.annualAllowance ?? 0} days/year` : 'Off';
    }
  }

  typeTone(code: string, index: number) {
    return typeTone(code, index);
  }

  private summaryValue(i: LeavePolicyItem): { value: string; hint: string } {
    switch (this.variantOf(i)) {
      case 'parental': return { value: `${i.annualAllowance ?? 0}d`, hint: i.paidDays !== null ? `${i.paidDays}d paid` : '' };
      case 'compoff': return { value: i.isEnabled ? 'Enabled' : 'Off', hint: i.maxAccrual ? `max ${i.maxAccrual}d` : '' };
      case 'lop': return { value: i.isEnabled ? 'Allowed' : 'Off', hint: i.maxConsecutive ? `max ${i.maxConsecutive}d` : '' };
      case 'wfh': return { value: i.isEnabled ? `${i.maxPerMonth ?? 0}d/mo` : 'Off', hint: i.maxPerWeek ? `${i.maxPerWeek}d/wk` : '' };
      default: return { value: `${i.annualAllowance ?? 0}d`, hint: i.carryForwardDays ? `+${i.carryForwardDays} CF` : '' };
    }
  }

  // ---- Collapse --------------------------------------------------------------------------------

  toggleGroup(id: string): void {
    this.collapsedGroups.update((c) => ({ ...c, [id]: !c[id] }));
  }

  toggleCard(uid: string): void {
    this.collapsedCards.update((c) => ({ ...c, [uid]: !c[uid] }));
  }

  // ---- Year / type -----------------------------------------------------------------------------

  pickYear(year: number): void {
    if (year === this.year()) return;
    this.guard(() => {
      this.year.set(year);
      void this.load();
    });
  }

  private switchType(type: string): void {
    this.employmentType.set(type);
    void Promise.all([this.load(), this.loadYears()]);
  }

  private resetTypeControl(): void {
    this.typeForm.controls.type.setValue(optionValueOf(this.typeOptions(), this.employmentType()), { emitEvent: false });
    this.typeKey.update((k) => k + 1);
  }

  /** Asks before throwing away unsaved edits. */
  private guard(action: () => void, cancel?: () => void): void {
    if (!this.dirty()) return action();
    this.confirm.set({
      title: 'Discard unsaved changes?',
      text: 'You changed this policy but did not save it. If you continue, the changes are lost.',
      action: 'Discard and continue',
      danger: true,
      run: action,
    });
    this.pendingCancel = cancel ?? null;
  }

  private pendingCancel: (() => void) | null = null;

  closeConfirm(): void {
    this.confirm.set(null);
    this.pendingCancel?.();
    this.pendingCancel = null;
  }

  runConfirm(): void {
    const c = this.confirm();
    this.confirm.set(null);
    this.pendingCancel = null;
    c?.run();
  }

  openNewYear(): void {
    const opts = this.newYearOptions();
    this.yearForm.reset({ year: opts[0]?.value ?? null, source: this.sourceOptions().length > 1 ? 2 : 1 });
    this.yearKey.update((k) => k + 1);
    this.yearOpen.set(true);
  }

  async createYear(): Promise<void> {
    const v = this.yearForm.getRawValue();
    const target = Number(optionLabelOf(this.newYearOptions(), v.year));
    if (!target) return;
    const source = optionLabelOf(this.sourceOptions(), v.source);
    const sourceYear = source.startsWith('Copy of ') ? Number(source.slice(8)) : null;
    this.yearOpen.set(false);
    this.guard(async () => {
      this.busy.set(true);
      try {
        if (sourceYear) {
          const r = await this.service.copy(sourceYear, target, null);
          this.toast(r.message, 'success');
        } else {
          this.toast(`${target} starts from the organization defaults. Press Save Policy to keep it.`, 'normal');
        }
        this.year.set(target);
        await Promise.all([this.load(), this.loadYears()]);
      } catch (e) {
        this.toast(message(e), 'alert');
      } finally {
        this.busy.set(false);
      }
    });
  }

  // ---- Save / publish --------------------------------------------------------------------------

  reset(): void {
    const p = this.policy();
    if (!p || !this.dirty()) return;
    this.confirm.set({
      title: 'Reset changes?',
      text: 'All changes since the last save are removed.',
      action: 'Reset',
      danger: true,
      run: () => {
        this.buildRows(structuredClone(p.items));
        this.saveTried.set(false);
        this.toast('Changes reset.', 'normal');
      },
    });
  }

  async save(): Promise<boolean> {
    this.saveTried.set(true);
    const problems = this.problems();
    if (problems.length) {
      this.error.set(problems[0]);
      return false;
    }
    this.busy.set(true);
    this.error.set(null);
    try {
      this.applyPolicy(await this.service.saveDraft(this.year(), this.employmentType(), this.items()));
      await this.loadYears();
      this.toast('Policy saved as a draft. Publish it to make it live.', 'success');
      return true;
    } catch (e) {
      this.error.set(message(e));
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  askPublish(): void {
    this.confirm.set({
      title: `Publish the ${this.year()} ${this.employmentType()} policy?`,
      text: 'Employees with this employment type will use these rules when they apply for leave in this year.',
      action: 'Publish',
      run: () => void this.publish(),
    });
  }

  private async publish(): Promise<void> {
    if ((this.dirty() || this.status() === 'None') && !(await this.save())) return;
    this.busy.set(true);
    try {
      this.applyPolicy(await this.service.publish(this.year(), this.employmentType()));
      await this.loadYears();
      this.toast(`${this.employmentType()} ${this.year()} policy is live.`, 'success');
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.busy.set(false);
    }
  }

  askDiscardDraft(): void {
    this.confirm.set({
      title: 'Discard this draft?',
      text: this.policy()?.hasPublished ? 'The published version stays live.' : 'The policy goes back to the organization defaults.',
      action: 'Discard draft',
      danger: true,
      run: async () => {
        this.busy.set(true);
        try {
          this.applyPolicy(await this.service.discard(this.year(), this.employmentType()));
          await this.loadYears();
          this.toast('Draft discarded.', 'success');
        } catch (e) {
          this.error.set(message(e));
        } finally {
          this.busy.set(false);
        }
      },
    });
  }

  askRemove(row: Row): void {
    this.confirm.set({
      title: `Remove ${row.item.label || 'this leave type'}?`,
      text: 'It is removed from this policy when you save. Old leave requests are kept.',
      action: 'Remove',
      danger: true,
      run: () => {
        this.forms.delete(row.uid);
        this.rows.update((list) => list.filter((r) => r.uid !== row.uid));
      },
    });
  }

  // ---- Add leave type --------------------------------------------------------------------------

  openAdd(category: PolicyCategory = 'standard'): void {
    this.addForm.reset({
      label: '', description: '', category: POLICY_CATEGORIES.findIndex((c) => c.id === category) + 1,
      annualAllowance: category === 'parental' ? 5 : 6, carryForwardDays: 0, isEncashable: false, isPaid: true,
      mustBeTakenWithinMonths: '', allowanceBasis: 1,
      employmentTypes: [optionValueOf(this.typeOptions(), this.employmentType()) ?? 1],
      approvalType: 2, certificateRequired: false, certificateAfterDays: '',
    });
    this.addDraft.set(this.readAddForm());
    this.addTried.set(false);
    this.addKey.update((k) => k + 1);
    this.addOpen.set(true);
  }

  private readAddForm(): LeavePolicyItem {
    const v = this.addForm.getRawValue();
    const num = (x: unknown) => (x === '' || x === null || x === undefined ? null : Number(x));
    const category = POLICY_CATEGORIES[(v.category ?? 1) - 1]?.id ?? 'standard';
    const item = emptyItem(category);
    return {
      ...item,
      label: v.label.trim(),
      description: v.description.trim(),
      annualAllowance: num(v.annualAllowance),
      carryForwardDays: num(v.carryForwardDays) ?? 0,
      isPaid: v.isPaid,
      isEncashable: v.isPaid && v.isEncashable,
      mustBeTakenWithinMonths: num(v.mustBeTakenWithinMonths),
      allowanceBasis: ALLOWANCE_BASES[(v.allowanceBasis ?? 1) - 1]?.id ?? 'Yearly',
      approvalType: APPROVAL_TYPES[(v.approvalType ?? 2) - 1]?.id ?? 'Manager',
      certificateRequired: v.certificateRequired,
      certificateAfterDays: v.certificateRequired ? num(v.certificateAfterDays) : null,
      paidDays: category === 'parental' ? num(v.annualAllowance) : null,
    };
  }

  addError(key: keyof LeavePolicyItem): string | undefined {
    return this.addTried() ? this.addErrors()[key] : undefined;
  }

  async saveAdd(): Promise<void> {
    this.addTried.set(true);
    const item = this.readAddForm();
    if (Object.keys(validateItem(item, this.items())).length) return;
    const row = { uid: nextUid(), item };
    this.attachForm(row);
    this.rows.update((list) => [...list, row]);
    this.formsVersion.update((v) => v + 1);
    this.addOpen.set(false);

    // Also add it to the drafts of the other employment types picked in "Applicable for".
    const picked = (this.addForm.getRawValue().employmentTypes ?? []).map((v) => optionLabelOf(this.typeOptions(), v)).filter((t) => t && t !== this.employmentType());
    if (!picked.length) {
      this.toast(`${item.label} added. Press Save Policy to keep it.`, 'success');
      return;
    }
    this.busy.set(true);
    const done: string[] = [];
    try {
      for (const type of picked) {
        const other = await this.service.current(this.year(), type);
        if (other.items.some((i) => i.label.trim().toLowerCase() === item.label.toLowerCase())) continue;
        await this.service.saveDraft(this.year(), type, [...other.items, item]);
        done.push(type);
      }
      this.toast(`${item.label} added here${done.length ? ` and to the ${done.join(', ')} drafts` : ''}. Press Save Policy to keep it here.`, 'success');
    } catch (e) {
      this.toast(`${item.label} added here, but not to the other types: ${message(e)}`, 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4500 }]);
  }
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
