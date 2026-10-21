import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccessService } from 'common';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  calendarToIso,
  CalendarComponent,
  ChipComponent,
  DropdownComponent,
  IconButtonComponent,
  isoToCalendar,
  LoaderComponent,
  NoticeBannerComponent,
  optionLabelOf,
  optionValueOf,
  PaginationComponent,
  RingComponent,
  SearchComponent,
  TabButtonComponent,
  TabButtonItem,
  TextAreaComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  ToggleComponent,
  UiChartComponent,
  UiChartSeries,
} from 'ui';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import {
  AdminEmployee,
  AdminFilters,
  AdminHistoryItem,
  AdminLeaveRequest,
  AdminRequestsResult,
  AdminStatusFilter,
  AdminTab,
  PeriodKey,
} from '../../models/leave-admin.model';
import { LeaveAdminService } from '../../services/leave-admin.service';
import { addDaysIso, diffDays, formatDay, formatRange, todayIso } from '../../utils/leave-date.utils';
import { avatarTone, bannerTone, initials, SERIES_COLORS, statusTone, TONES, typeColor, typeTone, usageColor } from '../../utils/leave-tones';
import {
  approvalTrend,
  byDepartment,
  byType,
  departmentStatus,
  downloadText,
  isWfh,
  kpis,
  LEAVE_PAGE_SIZE,
  leavesVsWfh,
  pageOf,
  periodRange,
  toCsv,
  topEmployees,
  trendByType,
  typeByDepartment,
  weeklyPattern,
} from '../../utils/leave-analytics';

type SortField = 'name' | 'type' | 'department' | 'days' | 'start' | 'end' | 'status' | 'applied';
type EmpSort = 'name' | 'department' | 'utilization' | 'available';

const STATUSES: AdminStatusFilter[] = ['All', 'New', 'Pending', 'Approved', 'Rejected', 'Cancelled'];

/**
 * Leaves & WFH Requests (HR / admin): KPIs, approvals, requests table, analytics,
 * department charts and employee balances for a period. All filters live in a slide-in panel.
 */
@Component({
  selector: 'leave-approval-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonGroupComponent,
    CalendarComponent,
    ChipComponent,
    DropdownComponent,
    IconButtonComponent,
    LoaderComponent,
    NoticeBannerComponent,
    PaginationComponent,
    RingComponent,
    SearchComponent,
    TabButtonComponent,
    TextAreaComponent,
    TextButtonComponent,
    ToastStackComponent,
    ToggleComponent,
    UiChartComponent,
    BodyPortalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss'],
})
export class LeaveApprovalComponent implements OnInit, OnDestroy {
  private readonly service = inject(LeaveAdminService);
  private readonly access = inject(AccessService);
  private readonly document = inject(DOCUMENT);
  private readonly subs = new Subscription();
  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private loadToken = 0;

  readonly tones = TONES;
  readonly errorBanner = bannerTone('danger');
  readonly pageSize = LEAVE_PAGE_SIZE;
  readonly statusTone = statusTone;
  readonly avatarTone = avatarTone;
  readonly initials = initials;
  readonly usageColor = usageColor;
  readonly formatRange = formatRange;
  readonly formatDay = formatDay;
  readonly isOnline = this.service.isOnline;

  private readonly accessVersion = this.access.version;
  readonly canApprove = computed(() => (this.accessVersion(), this.access.can('leave-approval', 'approve') || this.access.can('leave-management', 'approve')));

  // ---- Period ----------------------------------------------------------------------------------
  readonly periodItems: ButtonGroupItem[] = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'WTD', value: 'wtd' },
    { label: 'MTD', value: 'mtd' },
    { label: 'QTD', value: 'qtd' },
    { label: 'HTD', value: 'htd' },
    { label: 'YTD', value: 'ytd' },
  ];
  readonly period = signal<PeriodKey>('mtd');
  readonly from = signal(periodRange('mtd').from);
  readonly to = signal(periodRange('mtd').to);
  readonly periodLabel = computed(() => formatRange(this.from(), this.to()));

  // ---- Filters (slide-in panel) ----------------------------------------------------------------
  readonly filterForm = new FormGroup({
    from: new FormControl('', { nonNullable: true }),
    to: new FormControl('', { nonNullable: true }),
    department: new FormControl<number | null>(null),
    leaveType: new FormControl<number | null>(null),
    status: new FormControl<number | null>(null),
    ignorePeriod: new FormControl(false, { nonNullable: true }),
  });
  readonly filterKey = signal(0);
  readonly filtersOpen = signal(false);
  readonly filterError = signal<string | null>(null);
  private filterSnapshot = this.filterForm.getRawValue();
  readonly filterMeta = signal<AdminFilters | null>(null);
  readonly department = signal<string | null>(null);
  readonly leaveType = signal<string | null>(null);
  readonly status = signal<AdminStatusFilter>('All');
  readonly ignorePeriod = signal(false);
  readonly departmentOptions = computed(() => toDropdownOptions(['All departments', ...(this.filterMeta()?.departments ?? []).map((d) => d.department)]));
  readonly typeOptions = computed(() => toDropdownOptions(['All types', ...(this.filterMeta()?.leaveTypes ?? []).map((t) => t.label)]));
  readonly statusOptions = toDropdownOptions(STATUSES.map((s) => (s === 'All' ? 'All statuses' : s)));
  readonly activeFilters = computed(() => {
    const chips: { key: 'department' | 'leaveType' | 'status' | 'ignorePeriod'; label: string }[] = [];
    if (this.department()) chips.push({ key: 'department', label: this.department()! });
    if (this.leaveType()) chips.push({ key: 'leaveType', label: this.typeLabel(this.leaveType()!) });
    if (this.status() !== 'All') chips.push({ key: 'status', label: this.status() });
    if (this.ignorePeriod()) chips.push({ key: 'ignorePeriod', label: 'Whole year (employees)' });
    return chips;
  });

  // ---- Tabs ------------------------------------------------------------------------------------
  readonly tab = signal<AdminTab>('overview');
  readonly tabs = computed<TabButtonItem[]>(() => {
    const pending = this.pending().length;
    return [
      { id: 'overview', label: 'Overview' },
      { id: 'requests', label: pending ? `Requests (${pending})` : 'Requests' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'departments', label: 'Departments' },
      { id: 'employees', label: 'Employees' },
    ];
  });

  // ---- Data ------------------------------------------------------------------------------------
  readonly result = signal<AdminRequestsResult | null>(null);
  readonly rows = computed(() => this.result()?.items ?? []);
  readonly pending = signal<AdminLeaveRequest[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly busy = signal(false);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  // ---- Charts ----------------------------------------------------------------------------------
  readonly chartForm = new FormGroup({
    weeklyWfh: new FormControl(false, { nonNullable: true }),
    topWfh: new FormControl(false, { nonNullable: true }),
    approvalRate: new FormControl(false, { nonNullable: true }),
  });
  readonly weeklyWfh = signal(false);
  readonly topWfh = signal(false);
  readonly approvalRate = signal(false);

  readonly kpis = computed(() => {
    const r = this.result();
    return r ? kpis(r.items, r.headcount, r.referenceDate) : [];
  });
  readonly weekly = computed(() => {
    const w = weeklyPattern(this.rows(), this.to(), this.weeklyWfh());
    const colors = ['var(--color-primary)', 'var(--color-success)', 'var(--color-warning)', 'color-mix(in srgb, var(--color-primary) 55%, var(--color-danger))'];
    return { labels: w.labels, series: w.series.map((s, i) => ({ ...s, color: colors[i] })) as UiChartSeries[] };
  });
  readonly allocated = computed(() => this.typeChart(byType(this.rows())));
  readonly trend = computed(() => {
    const t = trendByType(this.rows(), this.from(), this.to());
    return { labels: t.labels, series: t.series.map((s, i) => ({ label: s.label, data: s.data, color: typeColor(s.code, i), type: 'line', fill: true })) as UiChartSeries[] };
  });
  readonly distribution = computed(() => this.typeChart(byType(this.rows())));
  readonly top = computed(() => {
    const t = topEmployees(this.rows(), this.topWfh());
    return { labels: t.labels, series: [{ label: this.topWfh() ? 'WFH days' : 'Leave days', data: t.data, color: this.topWfh() ? 'var(--color-success)' : 'var(--color-primary)' }] as UiChartSeries[] };
  });
  readonly vsWfh = computed(() => {
    const v = leavesVsWfh(this.rows(), this.from(), this.to());
    return {
      labels: v.labels,
      series: [
        { label: 'Leaves', data: v.leaves, color: 'var(--color-primary)', type: 'line' },
        { label: 'WFH', data: v.wfh, color: 'var(--color-success)', type: 'line' },
        { label: 'Total', data: v.total, color: 'color-mix(in srgb, var(--color-primary) 55%, var(--color-danger))', type: 'line', dashed: true },
      ] as UiChartSeries[],
      bars: [
        { label: 'Leaves', data: v.leaves, color: 'var(--color-warning)', type: 'bar' },
        { label: 'WFH', data: v.wfh, color: 'var(--color-primary)', type: 'line' },
      ] as UiChartSeries[],
    };
  });
  readonly approvals = computed(() => {
    const a = approvalTrend(this.rows(), this.from(), this.to());
    return {
      labels: a.labels,
      series: [
        { label: 'Approved', data: a.approved, color: 'var(--color-success)', type: 'line' },
        { label: 'Pending', data: a.pending, color: 'var(--color-warning)', type: 'line' },
        { label: 'Rejected', data: a.rejected, color: 'var(--color-danger)', type: 'line', dashed: true },
      ] as UiChartSeries[],
    };
  });
  readonly deptLeaves = computed(() => {
    const d = byDepartment(this.rows());
    return { labels: d.map((x) => x.department), values: d.map((x) => x.days), total: d.reduce((n, x) => n + x.days, 0), series: [{ label: 'Days', data: d.map((x) => x.days) }] as UiChartSeries[] };
  });
  readonly deptStatus = computed(() => {
    const d = departmentStatus(this.rows());
    return {
      labels: d.labels,
      series: [
        { label: 'Approved', data: d.approved, color: 'var(--color-success)' },
        { label: 'Pending', data: d.pending, color: 'var(--color-warning)' },
        { label: 'Rejected', data: d.rejected, color: 'var(--color-danger)' },
      ] as UiChartSeries[],
    };
  });
  readonly deptTypes = computed(() => {
    const d = typeByDepartment(this.rows());
    return { labels: d.labels, series: d.series.map((s, i) => ({ label: s.label, data: s.data, color: typeColor(s.code, i) })) as UiChartSeries[] };
  });

  // ---- Requests tab ----------------------------------------------------------------------------
  readonly searchForm = new FormGroup({ search: new FormControl('', { nonNullable: true }) });
  readonly search = signal('');
  readonly sort = signal<{ field: SortField; dir: 1 | -1 }>({ field: 'applied', dir: -1 });
  readonly page = signal(1);
  readonly requestRows = computed(() => {
    const s = this.search().trim().toLowerCase();
    const st = this.status();
    const { field, dir } = this.sort();
    const list = this.rows().filter((r) =>
      (st === 'All' || (st === 'New' ? r.isNew : r.status === st))
      && (!s || [r.employeeName, r.employeeId, r.designation, r.department, r.leaveTypeLabel, r.reason].some((v) => (v ?? '').toLowerCase().includes(s))));
    const key = (r: AdminLeaveRequest): string | number => {
      switch (field) {
        case 'name': return r.employeeName.toLowerCase();
        case 'type': return r.leaveTypeLabel;
        case 'department': return r.department;
        case 'days': return r.days;
        case 'start': return r.fromDate;
        case 'end': return r.toDate;
        case 'status': return r.status;
        default: return r.appliedAt;
      }
    };
    return [...list].sort((a, b) => {
      const x = key(a);
      const y = key(b);
      return (x < y ? -1 : x > y ? 1 : 0) * dir;
    });
  });
  readonly requestPage = computed(() => pageOf(this.requestRows(), this.page(), this.pageSize));
  readonly viewing = signal<AdminLeaveRequest | null>(null);

  // ---- Reject dialog ---------------------------------------------------------------------------
  readonly rejectForm = new FormGroup({ note: new FormControl('', { nonNullable: true }) });
  readonly rejecting = signal<AdminLeaveRequest | null>(null);
  readonly rejectKey = signal(0);
  readonly rejectError = signal<string | null>(null);

  // ---- Employees tab ---------------------------------------------------------------------------
  readonly empSearchForm = new FormGroup({ search: new FormControl('', { nonNullable: true }) });
  readonly empSearch = signal('');
  readonly employees = signal<AdminEmployee[]>([]);
  readonly employeesLoaded = signal(false);
  readonly employeesLoading = signal(false);
  readonly empSort = signal<{ field: EmpSort; dir: 1 | -1 }>({ field: 'utilization', dir: -1 });
  readonly empPage = signal(1);
  readonly expandedEmp = signal<string | null>(null);
  readonly history = signal<AdminHistoryItem[]>([]);
  readonly historyLoading = signal(false);
  readonly empRows = computed(() => {
    const { field, dir } = this.empSort();
    const key = (e: AdminEmployee): string | number =>
      field === 'name' ? e.employeeName.toLowerCase() : field === 'department' ? e.department : field === 'available' ? e.availableDays : e.utilizationPercent;
    return [...this.employees()].sort((a, b) => {
      const x = key(a);
      const y = key(b);
      return (x < y ? -1 : x > y ? 1 : 0) * dir;
    });
  });
  readonly empPageRows = computed(() => pageOf(this.empRows(), this.empPage(), this.pageSize));

  async ngOnInit(): Promise<void> {
    void this.access.load();
    this.subs.add(this.chartForm.valueChanges.subscribe(() => {
      const v = this.chartForm.getRawValue();
      this.weeklyWfh.set(v.weeklyWfh);
      this.topWfh.set(v.topWfh);
      this.approvalRate.set(v.approvalRate);
    }));
    try {
      this.filterMeta.set(await this.service.filters());
    } catch {
      // filters are optional
    }
    await this.load();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.searchTimer) clearTimeout(this.searchTimer);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.rejecting()) this.rejecting.set(null);
    else if (this.viewing()) this.viewing.set(null);
    else if (this.filtersOpen()) this.cancelFilters();
  }

  // ---- Loading ---------------------------------------------------------------------------------

  async load(): Promise<void> {
    const token = ++this.loadToken;
    this.loading.set(true);
    this.error.set(null);
    try {
      const today = todayIso();
      const [result, pending] = await Promise.all([
        this.service.requests({ from: this.from(), to: this.to(), department: this.department(), leaveType: this.leaveType() }),
        this.service.requests({ from: addDaysIso(today, -365), to: addDaysIso(today, 365), department: this.department(), leaveType: this.leaveType(), status: 'Pending' }),
      ]);
      if (token !== this.loadToken) return;
      this.result.set(result);
      this.pending.set([...pending.items].sort((a, b) => a.fromDate.localeCompare(b.fromDate)));
      this.page.set(1);
      this.employeesLoaded.set(false);
      if (this.tab() === 'employees') void this.loadEmployees();
    } catch (e) {
      if (token === this.loadToken) this.error.set(message(e));
    } finally {
      if (token === this.loadToken) this.loading.set(false);
    }
  }

  async loadEmployees(): Promise<void> {
    this.employeesLoading.set(true);
    try {
      this.employees.set(await this.service.employees({
        from: this.from(), to: this.to(), department: this.department(), search: this.empSearch(), ignorePeriod: this.ignorePeriod(),
      }));
      this.employeesLoaded.set(true);
      this.empPage.set(1);
      this.expandedEmp.set(null);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.employeesLoading.set(false);
    }
  }

  // ---- Period / tabs ---------------------------------------------------------------------------

  setPeriod(values: string[]): void {
    const key = (values[0] as PeriodKey) || 'mtd';
    const range = periodRange(key);
    this.period.set(key);
    this.from.set(range.from);
    this.to.set(range.to);
    void this.load();
  }

  onTab(id: string): void {
    const tab = (['overview', 'requests', 'analytics', 'departments', 'employees'] as AdminTab[]).find((t) => t === id) ?? 'overview';
    this.tab.set(tab);
    if (tab === 'employees' && !this.employeesLoaded()) void this.loadEmployees();
  }

  /** KPI card click: show those requests. */
  openStatus(key: string): void {
    const status = (['Pending', 'Approved', 'Rejected'] as AdminStatusFilter[]).find((s) => s === key);
    if (!status) return;
    this.status.set(status);
    this.filterForm.patchValue({ status: optionValueOf(this.statusOptions, status) }, { emitEvent: false });
    this.page.set(1);
    this.tab.set('requests');
  }

  // ---- Filter panel ----------------------------------------------------------------------------

  openFilters(): void {
    this.filterForm.patchValue({ from: isoToCalendar(this.from()), to: isoToCalendar(this.to()) }, { emitEvent: false });
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
    const mtd = periodRange('mtd');
    this.filterForm.reset({ from: isoToCalendar(mtd.from), to: isoToCalendar(mtd.to), department: null, leaveType: null, status: null, ignorePeriod: false }, { emitEvent: false });
    this.filterError.set(null);
    this.filterKey.update((k) => k + 1);
  }

  applyFilters(): void {
    const v = this.filterForm.getRawValue();
    const from = calendarToIso(v.from);
    const to = calendarToIso(v.to);
    if (!from || !to) return this.filterError.set('Pick a start date and an end date.');
    if (from > to) return this.filterError.set('End date must be on or after the start date.');
    if (diffDays(from, to) > 731) return this.filterError.set('The date range can be at most two years.');
    const dept = optionLabelOf(this.departmentOptions(), v.department);
    const typeLabel = optionLabelOf(this.typeOptions(), v.leaveType);
    const status = optionLabelOf(this.statusOptions, v.status);
    const changedRange = from !== this.from() || to !== this.to();
    const changedServer = changedRange
      || (dept && dept !== 'All departments' ? dept : null) !== this.department()
      || (this.filterMeta()?.leaveTypes.find((t) => t.label === typeLabel)?.code ?? null) !== this.leaveType();
    const changedEmployees = !!v.ignorePeriod !== this.ignorePeriod();

    this.from.set(from);
    this.to.set(to);
    if (changedRange) this.period.set(this.matchPeriod(from, to));
    this.department.set(dept && dept !== 'All departments' ? dept : null);
    this.leaveType.set(this.filterMeta()?.leaveTypes.find((t) => t.label === typeLabel)?.code ?? null);
    this.status.set((STATUSES.find((s) => s === status) ?? 'All') as AdminStatusFilter);
    this.ignorePeriod.set(!!v.ignorePeriod);
    this.page.set(1);
    this.filtersOpen.set(false);
    if (changedServer) void this.load();
    else if (changedEmployees && this.tab() === 'employees') void this.loadEmployees();
    else if (changedEmployees) this.employeesLoaded.set(false);
  }

  clearFilter(key: 'department' | 'leaveType' | 'status' | 'ignorePeriod'): void {
    if (key === 'status') {
      this.status.set('All');
      this.filterForm.patchValue({ status: null }, { emitEvent: false });
      return;
    }
    if (key === 'ignorePeriod') {
      this.ignorePeriod.set(false);
      this.filterForm.patchValue({ ignorePeriod: false }, { emitEvent: false });
      if (this.tab() === 'employees') void this.loadEmployees();
      else this.employeesLoaded.set(false);
      return;
    }
    if (key === 'department') {
      this.department.set(null);
      this.filterForm.patchValue({ department: null }, { emitEvent: false });
    } else {
      this.leaveType.set(null);
      this.filterForm.patchValue({ leaveType: null }, { emitEvent: false });
    }
    void this.load();
  }

  private matchPeriod(from: string, to: string): PeriodKey {
    return (this.periodItems.map((p) => p.value as PeriodKey).find((k) => {
      const r = periodRange(k);
      return r.from === from && r.to === to;
    }) ?? 'custom');
  }

  // ---- Requests --------------------------------------------------------------------------------

  onSearch(value: string): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.search.set((value ?? '').slice(0, 100));
      this.page.set(1);
    }, 250);
  }

  sortBy(field: SortField): void {
    this.sort.update((s) => ({ field, dir: s.field === field ? (s.dir === 1 ? -1 : 1) : field === 'applied' || field === 'days' ? -1 : 1 }));
    this.page.set(1);
  }

  sortMark(field: SortField): string {
    const s = this.sort();
    return s.field !== field ? '↕' : s.dir === 1 ? '▲' : '▼';
  }

  onPage(e: { page: number }): void {
    this.page.set(e.page);
  }

  async approve(r: AdminLeaveRequest): Promise<void> {
    this.busy.set(true);
    try {
      await this.service.decide(r.id, true, '');
      this.toast(`Approved ${r.leaveTypeLabel.toLowerCase()} for ${r.employeeName}.`, 'success');
      if (this.viewing()?.id === r.id) this.viewing.set(null);
      await this.load();
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  askReject(r: AdminLeaveRequest): void {
    this.rejectForm.reset({ note: '' });
    this.rejectError.set(null);
    this.rejectKey.update((k) => k + 1);
    this.rejecting.set(r);
  }

  async confirmReject(): Promise<void> {
    const r = this.rejecting();
    if (!r) return;
    const note = this.rejectForm.getRawValue().note.trim();
    if (!note) return this.rejectError.set('Tell the employee why it is rejected.');
    this.busy.set(true);
    try {
      await this.service.decide(r.id, false, note);
      this.rejecting.set(null);
      if (this.viewing()?.id === r.id) this.viewing.set(null);
      this.toast(`Rejected ${r.leaveTypeLabel.toLowerCase()} for ${r.employeeName}.`, 'success');
      await this.load();
    } catch (e) {
      this.rejectError.set(message(e));
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Employees -------------------------------------------------------------------------------

  onEmpSearch(value: string): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.empSearch.set((value ?? '').slice(0, 100));
      void this.loadEmployees();
    }, 300);
  }

  sortEmployees(field: EmpSort): void {
    this.empSort.update((s) => ({ field, dir: s.field === field ? (s.dir === 1 ? -1 : 1) : field === 'name' || field === 'department' ? 1 : -1 }));
    this.empPage.set(1);
  }

  empSortMark(field: EmpSort): string {
    const s = this.empSort();
    return s.field !== field ? '↕' : s.dir === 1 ? '▲' : '▼';
  }

  onEmpPage(e: { page: number }): void {
    this.empPage.set(e.page);
    this.expandedEmp.set(null);
  }

  async toggleEmployee(e: AdminEmployee): Promise<void> {
    if (this.expandedEmp() === e.employeeId) {
      this.expandedEmp.set(null);
      return;
    }
    this.expandedEmp.set(e.employeeId);
    this.history.set([]);
    this.historyLoading.set(true);
    try {
      const list = await this.service.history(e.employeeId);
      if (this.expandedEmp() === e.employeeId) this.history.set(list);
    } catch (err) {
      this.toast(message(err), 'alert');
    } finally {
      this.historyLoading.set(false);
    }
  }

  balanceRows(e: AdminEmployee) {
    return e.balances.filter((b) => b.total !== null && (b.total > 0 || b.used > 0));
  }

  exportHistory(e: AdminEmployee): void {
    const csv = toCsv(['Type', 'From', 'To', 'Days', 'Reason', 'Status'], this.history().map((h) => [h.label, h.fromDate, h.toDate, h.days, h.reason, h.status]));
    downloadText(this.document, `${e.employeeId}-leave-history.csv`, csv);
  }

  // ---- Report ----------------------------------------------------------------------------------

  downloadReport(): void {
    if (this.tab() === 'employees') {
      const csv = toCsv(
        ['Employee ID', 'Name', 'Role', 'Department', 'Total days', 'Used', 'Pending', 'Available', 'Utilization %'],
        this.empRows().map((e) => [e.employeeId, e.employeeName, e.designation, e.department, e.totalDays, e.usedDays, e.pendingDays, e.availableDays, e.utilizationPercent]),
      );
      downloadText(this.document, `leave-balances-${this.to()}.csv`, csv);
      this.toast(`Downloaded ${this.empRows().length} employees.`, 'success');
      return;
    }
    const rows = this.tab() === 'requests' ? this.requestRows() : this.rows();
    const csv = toCsv(
      ['Employee ID', 'Name', 'Role', 'Department', 'Leave type', 'From', 'To', 'Days', 'Status', 'Applied on', 'Reason', 'Approver', 'Note'],
      rows.map((r) => [r.employeeId, r.employeeName, r.designation, r.department, r.leaveTypeLabel, r.fromDate, r.toDate, r.days,
        r.isNew ? 'New' : r.status, r.appliedAt.slice(0, 10), r.reason, r.approverName, r.decisionNote]),
    );
    downloadText(this.document, `leave-requests-${this.from()}-to-${this.to()}.csv`, csv);
    this.toast(`Downloaded ${rows.length} request${rows.length === 1 ? '' : 's'}.`, 'success');
  }

  // ---- Helpers ---------------------------------------------------------------------------------

  typeLabel(code: string): string {
    return this.filterMeta()?.leaveTypes.find((t) => t.code === code)?.label ?? code;
  }

  typeTone(code: string) {
    const i = this.filterMeta()?.leaveTypes.findIndex((t) => t.code === code) ?? 0;
    return typeTone(code, Math.max(i, 0));
  }

  statusOf(r: AdminLeaveRequest): string {
    return r.isNew ? 'New' : r.status;
  }

  isWfh(r: AdminLeaveRequest): boolean {
    return isWfh(r);
  }

  /** Default chart colour of slice / series i (same order as the ui chart palette). */
  chartColor(i: number): string {
    return SERIES_COLORS[i % SERIES_COLORS.length];
  }

  dash(v: string | null | undefined): string {
    return v && v.trim() ? v : '—';
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private typeChart(totals: { code: string; label: string; days: number }[]) {
    const sum = totals.reduce((n, t) => n + t.days, 0);
    return {
      total: sum,
      labels: totals.map((t) => t.label),
      colors: totals.map((t, i) => typeColor(t.code, i)),
      legend: totals.map((t, i) => ({ label: t.label, days: t.days, percent: sum ? Math.round((t.days / sum) * 100) : 0, color: typeColor(t.code, i) })),
      series: [{ label: 'Days', data: totals.map((t) => t.days) }] as UiChartSeries[],
    };
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
