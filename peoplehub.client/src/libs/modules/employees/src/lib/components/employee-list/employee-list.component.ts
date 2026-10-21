import { ChangeDetectionStrategy, Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccessService } from 'common';
import {
  ButtonGroupComponent,
  ButtonGroupItem,
  calendarToIso,
  CalendarComponent,
  ChipComponent,
  DropdownComponent,
  DropdownOption,
  IconButtonComponent,
  IconComponent,
  isoToCalendar,
  LoaderComponent,
  NoticeBannerComponent,
  optionLabelOf,
  optionValueOf,
  PaginationComponent,
  SearchComponent,
  TabButtonComponent,
  TabButtonItem,
  TextAreaComponent,
  TextButtonComponent,
  toDropdownOptions,
  ToastMessage,
  ToastStackComponent,
  ToggleComponent,
} from 'ui';
import { EmployeeBodyPortalDirective } from '../../directives/employee-body-portal.directive';
import {
  DIRECTORY_LIMITS,
  EMPLOYEE_STATUSES,
  EmployeeFilters,
  EmployeeListItem,
  EmployeeProfile,
  EmployeeQuery,
  EmployeeSortField,
  EmployeeStatus,
  EmployeeSummary,
  emptyQuery,
  FilterOption,
  REASON_STATUSES,
  StatusHistoryItem,
} from '../../models/employee-directory.model';
import { EmployeeDirectoryService } from '../../services/employee-directory/employee-directory.service';

// ---- Theme tones (only theme-tokens.css variables, so light / dark both work) -----------------
type Tone = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const tone = (token: string) => ({
  color: `color-mix(in srgb, var(${token}) 80%, var(--color-text-primary))`,
  bg: `color-mix(in srgb, var(${token}) 14%, transparent)`,
  solid: `var(${token})`,
});

const TONES: Record<Tone, { color: string; bg: string; solid: string }> = {
  primary: tone('--color-primary'),
  info: tone('--color-primary-soft'),
  success: tone('--color-success'),
  warning: tone('--color-warning'),
  danger: tone('--color-danger'),
  neutral: { color: 'var(--color-text-secondary)', bg: 'var(--color-surface-muted)', solid: 'var(--color-text-secondary)' },
};

const STATUS_TONES: Record<string, Tone> = {
  Active: 'success',
  Onboarding: 'info',
  Probation: 'primary',
  'Notice Period': 'warning',
  'On Leave': 'info',
  Inactive: 'neutral',
  Exited: 'danger',
  Deleted: 'danger',
};

/** Avatar colours rotate through these tones by name. */
const AVATAR_TONES: Tone[] = ['primary', 'success', 'warning', 'info', 'danger'];

function bannerTone(t: Tone) {
  const c = TONES[t];
  return {
    bannerColor: `color-mix(in srgb, ${c.solid} 10%, var(--color-surface))`,
    headingColor: c.color,
    contentColor: 'var(--color-text-primary)',
    highlighterColor: c.solid,
    iconColor: c.solid,
  };
}

type ViewMode = 'table' | 'cards';
type ProfileTab = 'job' | 'contact' | 'personal' | 'history';

/** Values of the filter panel form. */
interface FilterFormValue {
  status: number | null;
  department: number | null;
  location: number | null;
  type: number | null;
  manager: number | null;
  joinedFrom: string;
  joinedTo: string;
  includeExited: boolean;
}

const EMPTY_FILTERS: FilterFormValue = {
  status: null,
  department: null,
  location: null,
  type: null,
  manager: null,
  joinedFrom: '',
  joinedTo: '',
  includeExited: false,
};

/** A filter dropdown: ui-dropdown options plus label -> API value. */
interface FilterSelect {
  options: DropdownOption[];
  values: Map<string, string>;
}

interface StatCard {
  label: string;
  value: number;
  hint: string;
  icon: string;
  tone: Tone;
  status: EmployeeStatus | null;
}

const ALL = {
  status: 'All statuses',
  department: 'All departments',
  location: 'All locations',
  type: 'All types',
  manager: 'All managers',
};

/**
 * View Employee: searchable, filterable employee directory with a profile side panel.
 * Search stays on the page; the other filters live in a slide-in panel (Apply / Reset).
 * Admin / HR can change status (with reason + history), remove employees and export CSV.
 * What each role may do comes from the Setup page (employees.view / employees.add).
 */
@Component({
  selector: 'employee-list-root',
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
    LoaderComponent,
    NoticeBannerComponent,
    PaginationComponent,
    SearchComponent,
    TabButtonComponent,
    TextAreaComponent,
    TextButtonComponent,
    ToastStackComponent,
    ToggleComponent,
    EmployeeBodyPortalDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  private readonly service = inject(EmployeeDirectoryService);
  private readonly access = inject(AccessService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly subs = new Subscription();
  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private loadToken = 0;

  readonly limits = DIRECTORY_LIMITS;
  readonly errorBanner = bannerTone('danger');
  readonly tones = TONES;
  readonly isOnline = this.service.isOnline;

  // ---- What this role may do (Setup page) ----------------------------------------------------
  private readonly accessVersion = this.access.version;
  readonly canAdd = computed(() => (this.accessVersion(), this.access.can('employees.add', 'create')));
  readonly canEdit = computed(() => (this.accessVersion(), this.access.can('employees.add', 'edit')));
  readonly canDelete = computed(() => (this.accessVersion(), this.access.can('employees.add', 'delete')));
  readonly canExport = computed(() => (this.accessVersion(), this.access.can('employees.view', 'export')));
  readonly canOrgChart = computed(() => (this.accessVersion(), this.access.can('org-chart', 'view')));

  // ---- Forms for the shared controls ---------------------------------------------------------
  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });
  readonly filterForm = new FormGroup({
    status: new FormControl<number | null>(null),
    department: new FormControl<number | null>(null),
    location: new FormControl<number | null>(null),
    type: new FormControl<number | null>(null),
    manager: new FormControl<number | null>(null),
    joinedFrom: new FormControl('', { nonNullable: true }),
    joinedTo: new FormControl('', { nonNullable: true }),
    includeExited: new FormControl(false, { nonNullable: true }),
  });
  readonly statusForm = new FormGroup({
    status: new FormControl<number | null>(null),
    effectiveDate: new FormControl('', { nonNullable: true }),
    reason: new FormControl('', { nonNullable: true }),
  });
  /** Bumped to re-create controls (they read their value on init). */
  readonly filterKey = signal(0);
  readonly searchKey = signal(0);

  // ---- Filter panel --------------------------------------------------------------------------
  readonly filtersOpen = signal(false);
  /** Filter values when the panel was opened (Cancel puts them back). */
  private filterSnapshot: FilterFormValue = { ...EMPTY_FILTERS };
  readonly filterError = signal<string | null>(null);

  // ---- Data ----------------------------------------------------------------------------------
  readonly query = signal<EmployeeQuery>(emptyQuery());
  readonly rows = signal<EmployeeListItem[]>([]);
  readonly total = signal(0);
  readonly summary = signal<EmployeeSummary | null>(null);
  readonly filters = signal<EmployeeFilters | null>(null);
  readonly loading = signal(true);
  readonly listLoading = signal(false);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toasts = signal<ToastMessage[]>([]);
  private toastId = 0;

  readonly view = signal<ViewMode>('table');
  readonly viewItems: ButtonGroupItem[] = [
    { label: 'Table', value: 'table' },
    { label: 'Cards', value: 'cards' },
  ];

  readonly selects = computed(() => {
    const f = this.filters();
    return {
      status: select(ALL.status, EMPLOYEE_STATUSES.map((s) => ({ kind: 'status', value: s, label: s, count: f?.statuses.find((x) => x.value === s)?.count ?? 0 }))),
      department: select(ALL.department, f?.departments ?? []),
      location: select(ALL.location, f?.locations ?? []),
      type: select(ALL.type, f?.types ?? []),
      manager: select(ALL.manager, f?.managers ?? []),
    };
  });

  readonly stats = computed<StatCard[]>(() => {
    const s = this.summary();
    if (!s) return [];
    return [
      { label: 'Headcount', value: s.total, hint: `${s.departments} department${s.departments === 1 ? '' : 's'}`, icon: 'group', tone: 'primary', status: null },
      { label: 'Active', value: s.active, hint: s.total ? `${Math.round((s.active / s.total) * 100)}% of headcount` : 'No one yet', icon: 'check_circle_outline', tone: 'success', status: 'Active' },
      { label: 'Onboarding & probation', value: s.onboarding + s.probation, hint: `${s.joinedLast30Days} joined in the last 30 days`, icon: 'person', tone: 'info', status: s.probation >= s.onboarding ? 'Probation' : 'Onboarding' },
      { label: 'Notice period', value: s.noticePeriod, hint: s.noticePeriod ? 'Plan handovers' : 'Nobody is leaving', icon: 'calendar', tone: 'warning', status: 'Notice Period' },
      { label: 'Exited', value: s.exited, hint: `${s.inactive} inactive`, icon: 'info', tone: 'neutral', status: 'Exited' },
    ];
  });

  readonly activeFilters = computed(() => {
    const q = this.query();
    const chips: { key: keyof EmployeeQuery; label: string }[] = [];
    if (q.search.trim()) chips.push({ key: 'search', label: `"${q.search.trim()}"` });
    if (q.status) chips.push({ key: 'status', label: q.status });
    if (q.department) chips.push({ key: 'department', label: q.department });
    if (q.location) chips.push({ key: 'location', label: q.location });
    if (q.employeeType) chips.push({ key: 'employeeType', label: q.employeeType });
    if (q.managerCode) chips.push({ key: 'managerCode', label: `Team of ${this.filters()?.managers.find((m) => m.value === q.managerCode)?.label ?? q.managerCode}` });
    if (q.joinedFrom || q.joinedTo) chips.push({ key: 'joinedFrom', label: `Joined ${q.joinedFrom ? 'from ' + shortDate(q.joinedFrom) : ''} ${q.joinedTo ? 'to ' + shortDate(q.joinedTo) : ''}`.trim() });
    if (q.includeExited && !q.status) chips.push({ key: 'includeExited', label: 'Including exited' });
    return chips;
  });

  /** Number of panel filters in use (search not counted). Shown on the Filters button. */
  readonly filterCount = computed(() => this.activeFilters().filter((f) => f.key !== 'search').length);

  readonly columns: { key: EmployeeSortField; label: string; css: string }[] = [
    { key: 'name', label: 'Employee', css: 'px-5' },
    { key: 'designation', label: 'Role', css: 'px-4' },
    { key: 'location', label: 'Location', css: 'px-4 hidden lg:table-cell' },
    { key: 'joined', label: 'Joined', css: 'px-4 hidden md:table-cell' },
    { key: 'status', label: 'Status', css: 'px-4' },
  ];

  // ---- Profile drawer ------------------------------------------------------------------------
  readonly profile = signal<EmployeeProfile | null>(null);
  readonly profileBase = signal<EmployeeListItem | null>(null);
  readonly profileLoading = signal(false);
  readonly profileTab = signal<ProfileTab>('job');
  readonly profileTabs: TabButtonItem[] = [
    { id: 'job', label: 'Job' },
    { id: 'contact', label: 'Contact' },
    { id: 'personal', label: 'Personal' },
    { id: 'history', label: 'History' },
  ];
  readonly history = signal<StatusHistoryItem[]>([]);
  readonly historyLoading = signal(false);
  readonly team = signal<EmployeeListItem[]>([]);

  // ---- Status dialog / delete ----------------------------------------------------------------
  readonly statusTarget = signal<EmployeeListItem | null>(null);
  readonly statusKey = signal(0);
  readonly statusErrors = signal<{ status?: string; reason?: string; effectiveDate?: string }>({});
  readonly statusOptions = signal<DropdownOption[]>([]);
  readonly pickedStatus = signal<EmployeeStatus | null>(null);
  readonly needsReason = computed(() => !!this.pickedStatus() && REASON_STATUSES.includes(this.pickedStatus()!));
  readonly deleting = signal<EmployeeListItem | null>(null);

  async ngOnInit(): Promise<void> {
    void this.access.load();
    this.subs.add(
      this.statusForm.controls.status.valueChanges.subscribe((v) =>
        this.pickedStatus.set((optionLabelOf(this.statusOptions(), v) as EmployeeStatus) || null),
      ),
    );
    await this.reload();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.searchTimer) clearTimeout(this.searchTimer);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.deleting()) this.deleting.set(null);
    else if (this.statusTarget()) this.closeStatus();
    else if (this.filtersOpen()) this.cancelFilters();
    else if (this.profileBase()) this.closeProfile();
  }

  // ---- Loading -------------------------------------------------------------------------------

  async reload(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const [summary, filters] = await Promise.all([this.service.summary(), this.service.filters()]);
      this.summary.set(summary);
      this.filters.set(filters);
      await this.loadList();
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  private async refreshMeta(): Promise<void> {
    try {
      const [summary, filters] = await Promise.all([this.service.summary(), this.service.filters()]);
      this.summary.set(summary);
      this.filters.set(filters);
    } catch {
      // the list still works; numbers update on the next reload
    }
  }

  private async loadList(): Promise<void> {
    const token = ++this.loadToken;
    this.listLoading.set(true);
    try {
      const page = await this.service.list(this.query());
      if (token !== this.loadToken) return;
      this.rows.set(page.items);
      this.total.set(page.total);
      if (page.page !== this.query().page) this.query.update((q) => ({ ...q, page: page.page }));
      this.error.set(null);
    } catch (e) {
      if (token === this.loadToken) this.error.set(message(e));
    } finally {
      if (token === this.loadToken) this.listLoading.set(false);
    }
  }

  // ---- Search / filter panel -----------------------------------------------------------------

  onSearch(value: string): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.patchQuery({ search: (value ?? '').slice(0, DIRECTORY_LIMITS.searchMax) }), 300);
  }

  openFilters(): void {
    this.filterSnapshot = this.filterForm.getRawValue() as FilterFormValue;
    this.filterError.set(null);
    this.filterKey.update((k) => k + 1);
    this.filtersOpen.set(true);
  }

  /** Close without applying: put the old values back. */
  cancelFilters(): void {
    this.filterForm.reset(this.filterSnapshot, { emitEvent: false });
    this.filterError.set(null);
    this.filtersOpen.set(false);
  }

  /** Clears the panel only; the list changes when Apply is pressed. */
  resetFilters(): void {
    this.filterForm.reset({ ...EMPTY_FILTERS }, { emitEvent: false });
    this.filterError.set(null);
    this.filterKey.update((k) => k + 1);
  }

  applyFilters(): void {
    const v = this.filterForm.getRawValue();
    const from = calendarToIso(v.joinedFrom);
    const to = calendarToIso(v.joinedTo);
    if ((v.joinedFrom && !from) || (v.joinedTo && !to)) {
      this.filterError.set('Pick valid joining dates.');
      return;
    }
    if (from && to && from > to) {
      this.filterError.set("'Joined to' must be on or after 'Joined from'.");
      return;
    }
    this.filterError.set(null);
    this.applyFilterForm();
    this.filtersOpen.set(false);
  }

  private applyFilterForm(): void {
    const v = this.filterForm.getRawValue();
    const s = this.selects();
    this.patchQuery({
      status: (pick(s.status, v.status) as EmployeeStatus | null) ?? null,
      department: pick(s.department, v.department),
      location: pick(s.location, v.location),
      employeeType: pick(s.type, v.type),
      managerCode: pick(s.manager, v.manager),
      joinedFrom: calendarToIso(v.joinedFrom) || null,
      joinedTo: calendarToIso(v.joinedTo) || null,
      includeExited: !!v.includeExited,
    });
  }

  private patchQuery(patch: Partial<EmployeeQuery>, resetPage = true): void {
    const current = this.query();
    const next: EmployeeQuery = { ...current, ...patch, page: resetPage ? 1 : patch.page ?? current.page };
    if (JSON.stringify(next) === JSON.stringify(current)) return;
    this.query.set(next);
    void this.loadList();
  }

  // ---- Sort / paging / layout ----------------------------------------------------------------

  sortBy(field: EmployeeSortField): void {
    const q = this.query();
    const sortDir = q.sortBy === field && q.sortDir === 'asc' ? 'desc' : 'asc';
    this.patchQuery({ sortBy: field, sortDir });
  }

  sortMark(field: EmployeeSortField): string {
    const q = this.query();
    return q.sortBy !== field ? '' : q.sortDir === 'asc' ? '▲' : '▼';
  }

  ariaSort(field: EmployeeSortField): string {
    const q = this.query();
    return q.sortBy !== field ? 'none' : q.sortDir === 'asc' ? 'ascending' : 'descending';
  }

  onPage(e: { page: number; pageSize: number }): void {
    const q = this.query();
    if (e.pageSize !== q.pageSize) this.patchQuery({ pageSize: e.pageSize });
    else this.patchQuery({ page: e.page }, false);
  }

  setView(values: string[]): void {
    this.view.set(values[0] === 'cards' ? 'cards' : 'table');
  }

  /** Stat card click: filter by that status (click again to clear). */
  pickStat(card: StatCard): void {
    const current = this.query().status;
    const status = !card.status || current === card.status ? null : card.status;
    this.setFilterControls({ status: status ? optionValueOf(this.selects().status.options, statusLabel(this.selects().status, status)) : null });
  }

  /** Removes one active filter chip. */
  clearFilter(key: keyof EmployeeQuery): void {
    switch (key) {
      case 'search':
        this.searchForm.reset({ search: '' }, { emitEvent: false });
        this.searchKey.update((k) => k + 1);
        this.patchQuery({ search: '' });
        return;
      case 'status': return this.setFilterControls({ status: null });
      case 'department': return this.setFilterControls({ department: null });
      case 'location': return this.setFilterControls({ location: null });
      case 'employeeType': return this.setFilterControls({ type: null });
      case 'managerCode': return this.setFilterControls({ manager: null });
      case 'joinedFrom': return this.setFilterControls({ joinedFrom: '', joinedTo: '' });
      case 'includeExited': return this.setFilterControls({ includeExited: false });
    }
  }

  clearAll(): void {
    this.searchForm.reset({ search: '' }, { emitEvent: false });
    this.filterForm.reset({ ...EMPTY_FILTERS }, { emitEvent: false });
    this.searchKey.update((k) => k + 1);
    this.filterKey.update((k) => k + 1);
    const q = this.query();
    this.patchQuery({ ...emptyQuery(), sortBy: q.sortBy, sortDir: q.sortDir, pageSize: q.pageSize });
  }

  /** Show the team of a manager. */
  showTeam(code: string | null): void {
    if (!code) return;
    this.closeProfile();
    const s = this.selects().manager;
    const label = s.options.find((o) => s.values.get(o.name) === code)?.name;
    this.setFilterControls({ manager: optionValueOf(s.options, label) });
  }

  private setFilterControls(patch: Partial<FilterFormValue>): void {
    this.filterForm.patchValue(patch, { emitEvent: false });
    this.filterKey.update((k) => k + 1);
    this.applyFilterForm();
  }

  // ---- Profile drawer ------------------------------------------------------------------------

  async openProfile(e: EmployeeListItem, tab: ProfileTab = 'job'): Promise<void> {
    this.profileBase.set(e);
    this.profile.set(null);
    this.profileTab.set(tab);
    this.history.set([]);
    this.team.set([]);
    this.profileLoading.set(true);
    try {
      this.profile.set(await this.service.profile(e.employeeCode));
      if (e.directReports > 0) void this.loadTeam(e.employeeCode);
      if (tab === 'history') void this.loadHistory();
    } catch (err) {
      this.toast(message(err), 'alert');
      this.profileBase.set(null);
    } finally {
      this.profileLoading.set(false);
    }
  }

  closeProfile(): void {
    this.profileBase.set(null);
    this.profile.set(null);
  }

  onProfileTab(id: string): void {
    const tab = (['job', 'contact', 'personal', 'history'] as ProfileTab[]).find((t) => t === id) ?? 'job';
    this.profileTab.set(tab);
    if (tab === 'history' && !this.history().length) void this.loadHistory();
  }

  private async loadHistory(): Promise<void> {
    const code = this.profileBase()?.employeeCode;
    if (!code) return;
    this.historyLoading.set(true);
    try {
      this.history.set(await this.service.history(code));
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.historyLoading.set(false);
    }
  }

  private async loadTeam(code: string): Promise<void> {
    try {
      const page = await this.service.list({ ...emptyQuery(), managerCode: code, pageSize: 50 });
      if (this.profileBase()?.employeeCode === code) this.team.set(page.items);
    } catch {
      // optional section
    }
  }

  openOrgChart(): void {
    const code = this.profileBase()?.employeeCode;
    this.closeProfile();
    void this.router.navigate(['/', this.roleSegment(), 'org-chart'], { queryParams: code ? { focus: code } : {} });
  }

  addEmployee(): void {
    void this.router.navigate(['/', this.roleSegment(), 'add-employee']);
  }

  mailTo(email: string | null): void {
    if (!email) return;
    this.document.location.href = `mailto:${email}`;
  }

  // ---- Status --------------------------------------------------------------------------------

  openStatus(e: EmployeeListItem): void {
    const options = toDropdownOptions(EMPLOYEE_STATUSES.filter((s) => s !== e.status));
    this.statusOptions.set(options);
    this.statusForm.reset({ status: null, effectiveDate: isoToCalendar(todayIso()), reason: '' });
    this.pickedStatus.set(null);
    this.statusErrors.set({});
    this.statusTarget.set(e);
    this.statusKey.update((k) => k + 1);
  }

  closeStatus(): void {
    if (!this.busy()) this.statusTarget.set(null);
  }

  async saveStatus(): Promise<void> {
    const target = this.statusTarget();
    if (!target) return;
    const v = this.statusForm.getRawValue();
    const status = (optionLabelOf(this.statusOptions(), v.status) as EmployeeStatus) || null;
    const reason = (v.reason ?? '').trim();
    const effectiveDate = calendarToIso(v.effectiveDate) || null;
    const errors: { status?: string; reason?: string; effectiveDate?: string } = {};
    if (!status) errors.status = 'Pick the new status.';
    if (status && REASON_STATUSES.includes(status) && !reason) errors.reason = 'Give a reason for this change.';
    if (reason.length > DIRECTORY_LIMITS.reasonMax) errors.reason = `Reason must be ${DIRECTORY_LIMITS.reasonMax} characters or fewer.`;
    if (v.effectiveDate && !effectiveDate) errors.effectiveDate = 'Pick a valid date.';
    this.statusErrors.set(errors);
    if (Object.keys(errors).length || !status) return;

    this.busy.set(true);
    try {
      const updated = await this.service.setStatus(target.employeeCode, { status, reason, effectiveDate });
      this.busy.set(false);
      this.statusTarget.set(null);
      this.toast(`${target.fullName} is now ${status}.`, 'success');
      if (this.profileBase()?.employeeCode === target.employeeCode) {
        this.profile.set(updated);
        this.profileBase.set({ ...target, status });
        this.history.set([]);
        if (this.profileTab() === 'history') void this.loadHistory();
      }
      await Promise.all([this.loadList(), this.refreshMeta()]);
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Delete --------------------------------------------------------------------------------

  async confirmDelete(): Promise<void> {
    const e = this.deleting();
    if (!e) return;
    this.busy.set(true);
    try {
      await this.service.remove(e.employeeCode);
      this.deleting.set(null);
      if (this.profileBase()?.employeeCode === e.employeeCode) this.closeProfile();
      this.toast(`${e.fullName} was removed from the directory.`, 'success');
      await Promise.all([this.loadList(), this.refreshMeta()]);
    } catch (err) {
      this.toast(message(err), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- Export --------------------------------------------------------------------------------

  async exportCsv(): Promise<void> {
    this.busy.set(true);
    try {
      const blob = await this.service.exportCsv(this.query());
      const url = URL.createObjectURL(blob);
      const a = this.document.createElement('a');
      a.href = url;
      a.download = `employees-${todayIso()}.csv`;
      this.document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      this.toast(`Exported ${this.total()} employee${this.total() === 1 ? '' : 's'}.`, 'success');
    } catch (e) {
      this.toast(message(e), 'alert');
    } finally {
      this.busy.set(false);
    }
  }

  // ---- View helpers --------------------------------------------------------------------------

  statusTone(status: string) {
    return TONES[STATUS_TONES[status] ?? 'neutral'];
  }

  avatarTone(name: string) {
    let h = 0;
    for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return TONES[AVATAR_TONES[h % AVATAR_TONES.length]];
  }

  initials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '?';
  }

  photoUrl(p: EmployeeProfile | null): string | null {
    if (!p?.photo) return null;
    return p.photo.startsWith('data:') ? p.photo : `data:image/jpeg;base64,${p.photo}`;
  }

  shortDate(iso: string | null): string {
    return shortDate(iso);
  }

  /** "3 yrs 4 mos" since joining. */
  tenure(iso: string | null): string {
    if (!iso) return '';
    const start = new Date(`${iso.slice(0, 10)}T00:00:00`);
    if (Number.isNaN(start.getTime())) return '';
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) months -= 1;
    if (months < 0) return 'Joins soon';
    if (months < 1) return 'New joiner';
    const y = Math.floor(months / 12);
    const m = months % 12;
    return [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo${m > 1 ? 's' : ''}` : ''].filter(Boolean).join(' ');
  }

  age(iso: string | null): string {
    if (!iso) return '';
    const b = new Date(`${iso.slice(0, 10)}T00:00:00`);
    if (Number.isNaN(b.getTime())) return '';
    const n = new Date();
    let a = n.getFullYear() - b.getFullYear();
    if (n.getMonth() < b.getMonth() || (n.getMonth() === b.getMonth() && n.getDate() < b.getDate())) a -= 1;
    return `${a} years`;
  }

  dash(v: string | null | undefined): string {
    return v && String(v).trim() ? String(v) : '—';
  }

  rangeLabel(): string {
    const q = this.query();
    const total = this.total();
    if (!total) return 'No employees';
    const start = (q.page - 1) * q.pageSize + 1;
    return `${start}–${Math.min(q.page * q.pageSize, total)} of ${total}`;
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private roleSegment(): string {
    const first = this.router.url.split(/[?#]/)[0].split('/').filter(Boolean)[0];
    return first || this.access.role() || 'admin';
  }

  private toast(title: string, type: ToastMessage['type'] = 'normal'): void {
    const id = ++this.toastId;
    this.toasts.update((list) => [...list, { id, title, type, duration: 4000 }]);
  }
}

/** Dropdown options with an "All ..." first entry; labels show the count. */
function select(allLabel: string, items: FilterOption[]): FilterSelect {
  const values = new Map<string, string>();
  const labels = [allLabel];
  items.forEach((i) => {
    const label = i.count ? `${i.label} (${i.count})` : i.label;
    values.set(label, i.value);
    labels.push(label);
  });
  return { options: toDropdownOptions(labels), values };
}

/** Option label for an API value (labels carry counts, e.g. "Active (6)"). */
function statusLabel(s: FilterSelect, value: string): string | undefined {
  return s.options.find((o) => s.values.get(o.name) === value)?.name;
}

/** API value for the picked option (null for "All ..." or nothing). */
function pick(s: FilterSelect, value: number | null): string | null {
  const label = optionLabelOf(s.options, value);
  return label ? s.values.get(label) ?? null : null;
}

function shortDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function message(e: unknown): string {
  return e instanceof Error && e.message ? e.message : 'Something went wrong.';
}
