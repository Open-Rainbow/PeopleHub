import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  calendarToIso,
  CalendarComponent,
  ChipComponent,
  DropdownComponent,
  IconButtonComponent,
  IconComponent,
  isoToCalendar,
  NoticeBannerComponent,
  optionLabelOf,
  optionValueOf,
  PaginationComponent,
  RingComponent,
  TextAreaComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  UiChartComponent,
  UiChartSeries,
} from 'ui';
import { LeaveService } from '../../services/leave.service';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import { DayPart, LeaveDraftErrors, LeaveRequest, LeaveStatus, LeaveTypeConfig, YearBalance } from '../../models/leave-request.model';
import { REASON_MAX, WFH_CODE } from '../../config/leave-policy';
import { addDaysIso, formatDay, formatDays, formatRange, todayIso } from '../../utils/leave-date.utils';
import { bannerTone, statusTone, TONES, typeColor, typeTone, usageColor } from '../../utils/leave-tones';
import { downloadText, LEAVE_PAGE_SIZE, pageOf, toCsv } from '../../utils/leave-analytics';

type CategoryFilter = 'all' | 'paid' | 'special' | 'unpaid';
type SortField = 'type' | 'duration' | 'days' | 'applied';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const STATUSES: LeaveStatus[] = ['Pending', 'Approved', 'Rejected', 'Cancelled'];

interface TypeCard {
  type: LeaveTypeConfig;
  balance: YearBalance | null;
  total: number | null;
  used: number;
  pending: number;
  remaining: number | null;
  percent: number;
  group: Exclude<CategoryFilter, 'all'>;
}

/**
 * Leaves (employee): balance overview, monthly summary, leave type cards, history and the apply form.
 * Filters and the apply form open in slide-in panels.
 */
@Component({
  selector: 'apply-leave-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonGroupComponent,
    CalendarComponent,
    ChipComponent,
    DropdownComponent,
    IconButtonComponent,
    IconComponent,
    NoticeBannerComponent,
    PaginationComponent,
    RingComponent,
    TextAreaComponent,
    TextButtonComponent,
    ToastStackComponent,
    UiChartComponent,
    BodyPortalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnInit, OnDestroy {
  private readonly service = inject(LeaveService);
  private readonly document = inject(DOCUMENT);
  private readonly subs = new Subscription();

  readonly tones = TONES;
  readonly errorBanner = bannerTone('danger');
  readonly warnBanner = bannerTone('warning');
  readonly infoBanner = bannerTone('info');
  readonly pageSize = LEAVE_PAGE_SIZE;
  readonly reasonMax = REASON_MAX;
  readonly statusTone = statusTone;
  readonly formatRange = formatRange;
  readonly formatDay = formatDay;
  readonly formatDays = formatDays;
  readonly apiError = this.service.lastError;
  readonly isOnline = this.service.isOnline;
  readonly todayLabel = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'long' });

  // ---- Year ------------------------------------------------------------------------------------
  readonly currentYear = new Date().getFullYear();
  readonly yearOptions = toDropdownOptions([this.currentYear, this.currentYear - 1, this.currentYear - 2].map(String));
  readonly yearForm = new FormGroup({ year: new FormControl<number | null>(optionValueOf(this.yearOptions, String(this.currentYear))) });
  readonly year = signal(this.currentYear);
  readonly yearBalances = signal<YearBalance[]>([]);

  // ---- Types / balances ------------------------------------------------------------------------
  readonly types = this.service.types;

  readonly cards = computed<TypeCard[]>(() => {
    const balances = this.yearBalances();
    return this.types().map((type) => {
      const b = balances.find((x) => x.key === type.key) ?? null;
      const total = b ? b.entitlement : type.entitlement;
      const used = b?.used ?? 0;
      const pending = b?.pending ?? 0;
      const remaining = total === null ? null : Math.max(total - used - pending, 0);
      const group: TypeCard['group'] = type.isPaid === false ? 'unpaid' : (type.category ?? 'standard') === 'standard' ? 'paid' : 'special';
      return { type, balance: b, total, used, pending, remaining, percent: total ? Math.min(Math.round((used / total) * 100), 100) : 0, group };
    });
  });

  readonly categoryFilter = signal<CategoryFilter>('all');
  readonly categoryItems = computed<ButtonGroupItem[]>(() => {
    const c = this.cards();
    const n = (g: CategoryFilter) => (g === 'all' ? c.length : c.filter((x) => x.group === g).length);
    return [
      { label: `All ${n('all')}`, value: 'all' },
      { label: `Paid ${n('paid')}`, value: 'paid' },
      { label: `Special ${n('special')}`, value: 'special' },
      { label: `Unpaid ${n('unpaid')}`, value: 'unpaid' },
    ];
  });
  readonly visibleCards = computed(() => this.cards().filter((c) => this.categoryFilter() === 'all' || c.group === this.categoryFilter()));
  readonly expanded = signal<string | null>(null);

  /** Donut: used / pending / remaining over the limited leave types (WFH not counted). */
  readonly overview = computed(() => {
    const limited = this.cards().filter((c) => c.total !== null && c.type.key !== WFH_CODE);
    const total = limited.reduce((n, c) => n + (c.total ?? 0), 0);
    const used = limited.reduce((n, c) => n + c.used, 0);
    const pending = limited.reduce((n, c) => n + c.pending, 0);
    const remaining = Math.max(total - used - pending, 0);
    const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0);
    return {
      total,
      rows: [
        { label: 'Used', value: used, percent: pct(used), color: 'var(--color-danger)' },
        { label: 'Pending', value: pending, percent: pct(pending), color: 'var(--color-warning)' },
        { label: 'Remaining', value: remaining, percent: pct(remaining), color: 'var(--color-success)' },
      ],
    };
  });
  readonly donutSeries = computed<UiChartSeries[]>(() => [{ label: 'Days', data: this.overview().rows.map((r) => r.value) }]);
  readonly donutLabels = computed(() => this.overview().rows.map((r) => r.label));
  readonly donutColors = computed(() => this.overview().rows.map((r) => r.color));

  /** Summary chart: days per month in the picked year. */
  readonly yearRequests = computed(() => this.service.requests().filter((r) => r.fromDate.startsWith(String(this.year()))));
  readonly summarySeries = computed<UiChartSeries[]>(() => {
    const rows = this.yearRequests();
    const month = (filter: (r: LeaveRequest) => boolean) => MONTHS.map((_, i) =>
      rows.filter((r) => filter(r) && Number(r.fromDate.slice(5, 7)) === i + 1).reduce((n, r) => n + r.days, 0));
    return [
      { label: 'Leave taken', data: month((r) => r.status === 'Approved' && r.type !== WFH_CODE), color: 'var(--color-primary)', type: 'line', fill: true },
      { label: 'Pending', data: month((r) => r.status === 'Pending' && r.type !== WFH_CODE), color: 'var(--color-warning)', type: 'line', dashed: true },
      { label: 'Work from home', data: month((r) => r.status === 'Approved' && r.type === WFH_CODE), color: 'var(--color-success)', type: 'line' },
    ];
  });
  readonly months = MONTHS;

  // ---- History ---------------------------------------------------------------------------------
  readonly filterForm = new FormGroup({
    status: new FormControl<number | null>(null),
    type: new FormControl<number | null>(null),
    from: new FormControl('', { nonNullable: true }),
    to: new FormControl('', { nonNullable: true }),
  });
  readonly filterKey = signal(0);
  readonly filtersOpen = signal(false);
  readonly filterError = signal<string | null>(null);
  private filterSnapshot = this.filterForm.getRawValue();
  readonly statusOptions = toDropdownOptions(['All statuses', ...STATUSES]);
  readonly typeOptions = computed(() => toDropdownOptions(['All leave types', ...this.types().map((t) => t.label)]));
  readonly historyFilter = signal<{ status: string | null; type: string | null; from: string; to: string }>({ status: null, type: null, from: '', to: '' });
  readonly filterCount = computed(() => {
    const f = this.historyFilter();
    return [f.status, f.type, f.from || f.to].filter(Boolean).length;
  });

  readonly sort = signal<{ field: SortField; dir: 1 | -1 }>({ field: 'applied', dir: -1 });
  readonly page = signal(1);

  readonly history = computed(() => {
    const f = this.historyFilter();
    const { field, dir } = this.sort();
    const rows = this.service.requests().filter((r) =>
      (!f.status || r.status === f.status)
      && (!f.type || r.type === f.type)
      && (!f.from || r.toDate >= f.from)
      && (!f.to || r.fromDate <= f.to));
    const key = (r: LeaveRequest): string | number =>
      field === 'type' ? this.typeLabel(r.type) : field === 'days' ? r.days : field === 'duration' ? r.fromDate : r.appliedOn;
    return [...rows].sort((a, b) => {
      const x = key(a);
      const y = key(b);
      return (x < y ? -1 : x > y ? 1 : 0) * dir;
    });
  });
  readonly pageRows = computed(() => pageOf(this.history(), this.page(), this.pageSize));

  // ---- Apply panel -----------------------------------------------------------------------------
  readonly applyForm = new FormGroup({
    type: new FormControl<number | null>(null),
    fromDate: new FormControl('', { nonNullable: true }),
    toDate: new FormControl('', { nonNullable: true }),
    reason: new FormControl('', { nonNullable: true }),
  });
  readonly applyOpen = signal(false);
  readonly applyKey = signal(0);
  readonly toKey = signal(0);
  readonly submitted = signal(false);
  readonly pickedType = signal<string>('');
  readonly fromDate = signal('');
  readonly toDate = signal('');
  readonly reason = signal('');
  readonly dayPart = signal<DayPart>('full');
  readonly dayParts: ButtonGroupItem[] = [
    { label: 'Full day', value: 'full' },
    { label: 'First half', value: 'first-half' },
    { label: 'Second half', value: 'second-half' },
  ];
  readonly applyTypeOptions = computed(() => toDropdownOptions(this.types().map((t) => t.label)));

  readonly isSingleDay = computed(() => !!this.fromDate() && this.fromDate() === this.toDate());
  readonly draft = computed(() => ({
    type: this.pickedType(),
    fromDate: this.fromDate(),
    toDate: this.toDate(),
    dayPart: this.isSingleDay() ? this.dayPart() : ('full' as DayPart),
    reason: this.reason(),
  }));
  readonly errors = computed<LeaveDraftErrors>(() => this.service.validate(this.draft()));
  readonly shownErrors = computed<LeaveDraftErrors>(() => {
    if (this.submitted()) return this.errors();
    const { balance, overlap, fromDate, toDate } = this.errors();
    return this.fromDate() && this.toDate() ? { balance, overlap, fromDate, toDate } : {};
  });
  readonly days = computed(() =>
    this.fromDate() && this.toDate() && this.toDate() >= this.fromDate() ? this.service.countDays(this.fromDate(), this.toDate(), this.draft().dayPart) : 0);
  readonly skipped = computed(() => (this.days() > 0 ? this.service.skippedDays(this.fromDate(), this.toDate()) : { weekends: 0, holidays: [] as string[] }));
  readonly selectedType = computed(() => (this.pickedType() ? this.service.typeOf(this.pickedType()) : null));
  readonly selectedBalance = computed(() => (this.pickedType() ? this.service.balanceOf(this.pickedType()) : null));
  readonly balanceAfter = computed(() => {
    const available = this.selectedBalance()?.available;
    return available === null || available === undefined ? null : available - this.days();
  });
  readonly needsDocument = computed(() => {
    const limit = this.selectedType()?.documentAfterDays;
    return limit !== undefined && this.days() > limit;
  });

  // ---- Withdraw / details ----------------------------------------------------------------------
  readonly viewing = signal<LeaveRequest | null>(null);
  readonly pendingCancel = signal<LeaveRequest | null>(null);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  ngOnInit(): void {
    this.service.refresh();
    void this.loadYear();
    this.subs.add(this.yearForm.controls.year.valueChanges.subscribe((v) => {
      const y = Number(optionLabelOf(this.yearOptions, v)) || this.currentYear;
      if (y !== this.year()) {
        this.year.set(y);
        void this.loadYear();
      }
    }));
    this.subs.add(this.applyForm.valueChanges.subscribe(() => this.readApplyForm()));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pendingCancel()) this.pendingCancel.set(null);
    else if (this.viewing()) this.viewing.set(null);
    else if (this.applyOpen()) this.applyOpen.set(false);
    else if (this.filtersOpen()) this.cancelFilters();
  }

  async loadYear(): Promise<void> {
    this.yearBalances.set(await this.service.yearBalances(this.year()));
  }

  dismissError(): void {
    this.apiError.set(null);
  }

  // ---- Cards -----------------------------------------------------------------------------------

  setCategory(values: string[]): void {
    this.categoryFilter.set((values[0] as CategoryFilter) || 'all');
  }

  toggleCard(key: string): void {
    this.expanded.update((k) => (k === key ? null : key));
  }

  typeTone(key: string, index: number) {
    return typeTone(key, index);
  }

  typeColor(key: string, index: number): string {
    return typeColor(key, index);
  }

  usageColor(percent: number): string {
    return usageColor(percent);
  }

  typeLabel(key: string): string {
    return this.service.typeOf(key).label;
  }

  typeIndex(key: string): number {
    return Math.max(this.types().findIndex((t) => t.key === key), 0);
  }

  // ---- History ---------------------------------------------------------------------------------

  sortBy(field: SortField): void {
    this.sort.update((s) => ({ field, dir: s.field === field ? (s.dir === 1 ? -1 : 1) : field === 'type' ? 1 : -1 }));
    this.page.set(1);
  }

  sortMark(field: SortField): string {
    const s = this.sort();
    return s.field !== field ? '↕' : s.dir === 1 ? '▲' : '▼';
  }

  onPage(e: { page: number }): void {
    this.page.set(e.page);
  }

  openFilters(): void {
    this.filterSnapshot = this.filterForm.getRawValue();
    this.filterError.set(null);
    this.filterKey.update((k) => k + 1);
    this.filtersOpen.set(true);
  }

  cancelFilters(): void {
    this.filterForm.reset(this.filterSnapshot, { emitEvent: false });
    this.filtersOpen.set(false);
  }

  resetFilters(): void {
    this.filterForm.reset({ status: null, type: null, from: '', to: '' }, { emitEvent: false });
    this.filterError.set(null);
    this.filterKey.update((k) => k + 1);
  }

  applyFilters(): void {
    const v = this.filterForm.getRawValue();
    const from = calendarToIso(v.from);
    const to = calendarToIso(v.to);
    if ((v.from && !from) || (v.to && !to)) return this.filterError.set('Pick valid dates.');
    if (from && to && from > to) return this.filterError.set("'To' must be on or after 'From'.");
    const status = optionLabelOf(this.statusOptions, v.status);
    const typeLabel = optionLabelOf(this.typeOptions(), v.type);
    this.historyFilter.set({
      status: STATUSES.includes(status as LeaveStatus) ? status : null,
      type: this.types().find((t) => t.label === typeLabel)?.key ?? null,
      from,
      to,
    });
    this.page.set(1);
    this.filtersOpen.set(false);
  }

  clearFilters(): void {
    this.resetFilters();
    this.historyFilter.set({ status: null, type: null, from: '', to: '' });
    this.page.set(1);
  }

  downloadReport(): void {
    const rows = this.yearRequests();
    const csv = toCsv(
      ['Leave type', 'From', 'To', 'Days', 'Status', 'Applied on', 'Reason', 'Approver', 'Note'],
      rows.map((r) => [this.typeLabel(r.type), r.fromDate, r.toDate, r.days, r.status, r.appliedOn.slice(0, 10), r.reason, r.approver, r.decisionNote]),
    );
    downloadText(this.document, `my-leaves-${this.year()}.csv`, csv);
    this.toast(`Downloaded ${rows.length} leave${rows.length === 1 ? '' : 's'} for ${this.year()}.`, 'success');
  }

  // ---- Apply panel -----------------------------------------------------------------------------

  openApply(typeKey?: string): void {
    const start = this.nextWorkingDay();
    const options = this.applyTypeOptions();
    const label = this.types().find((t) => t.key === (typeKey ?? this.types()[0]?.key))?.label ?? null;
    this.applyForm.reset({
      type: optionValueOf(options, label),
      fromDate: isoToCalendar(start),
      toDate: isoToCalendar(start),
      reason: '',
    }, { emitEvent: false });
    this.dayPart.set('full');
    this.submitted.set(false);
    this.readApplyForm();
    this.applyKey.update((k) => k + 1);
    this.applyOpen.set(true);
  }

  closeApply(): void {
    this.applyOpen.set(false);
  }

  setDayPart(values: string[]): void {
    this.dayPart.set((values[0] as DayPart) || 'full');
  }

  private readApplyForm(): void {
    const v = this.applyForm.getRawValue();
    const label = optionLabelOf(this.applyTypeOptions(), v.type);
    this.pickedType.set(this.types().find((t) => t.label === label)?.key ?? '');
    const from = calendarToIso(v.fromDate);
    let to = calendarToIso(v.toDate);
    if (from && (!to || to < from)) {
      to = from;
      this.applyForm.controls.toDate.setValue(isoToCalendar(from), { emitEvent: false });
      this.toKey.update((k) => k + 1);
    }
    this.fromDate.set(from);
    this.toDate.set(to);
    this.reason.set(v.reason ?? '');
  }

  submit(): void {
    this.readApplyForm();
    this.submitted.set(true);
    const result = this.service.apply(this.draft());
    if (!result.request) return;
    this.applyOpen.set(false);
    this.page.set(1);
    this.toast(`Leave request sent for ${formatDays(result.request.days)}.`, 'success');
    setTimeout(() => void this.loadYear(), 600);
  }

  hasErrors(errors: LeaveDraftErrors): boolean {
    return Object.values(errors).some(Boolean);
  }

  // ---- Details / withdraw ----------------------------------------------------------------------

  canCancel(r: LeaveRequest): boolean {
    return this.service.canCancel(r);
  }

  confirmCancel(): void {
    const r = this.pendingCancel();
    if (!r) return;
    this.service.cancel(r.id);
    this.pendingCancel.set(null);
    this.viewing.set(null);
    this.toast('Leave request withdrawn.', 'success');
    setTimeout(() => void this.loadYear(), 600);
  }

  dayPartLabel(part: DayPart): string {
    return this.dayParts.find((p) => p.value === part)?.label ?? '';
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }

  private nextWorkingDay(): string {
    let iso = addDaysIso(todayIso(), 1);
    for (let i = 0; i < 14 && this.service.countDays(iso, iso) === 0; i++) iso = addDaysIso(iso, 1);
    return iso;
  }
}
