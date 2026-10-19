import { ChangeDetectionStrategy, Component, computed, DestroyRef, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent, TextButtonComponent } from 'ui';
import {
  ATTENDANCE_LIMITS,
  CALENDAR_LEGEND,
  DEFAULT_ATTENDANCE_POLICY,
  DEMO_APPROVER_ID,
  DEMO_EMPLOYEE_ID,
  STATUS_STYLES,
  TEAM_FILTERS,
  TeamFilter,
} from '../../config/attendance-options';
import { AttendanceBodyPortalDirective } from '../../directives/body-portal.directive';
import {
  AttendanceDay,
  AttendancePolicy,
  AttendanceTrendPoint,
  DayStatus,
  Regularization,
  RegularizationDraft,
  RegularizationErrors,
  TeamDayRow,
  WorkMode,
} from '../../models/attendance.model';
import { AttendanceService } from '../../services/attendance.service';
import { addDays, clock, duration, isoDate, parseLocal, pad, toCsv, validateRegularization } from '../../services/attendance.utils';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const OFF: DayStatus[] = ['Weekend', 'Holiday', 'Upcoming', 'On leave'];

type Tab = 'me' | 'team';

export interface CalendarCell {
  day: AttendanceDay | null;
  num: number;
  today: boolean;
}

/**
 * Attendance.
 * Everyone: live clock, check in / out (Office / Remote), month calendar, stats and corrections.
 * HR / admin (`/hr/attendance`, `/admin/attendance`, or `[manage]="true"`): team day view, 30-day trend,
 * approve / reject corrections and CSV export.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'attendance-root',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TextButtonComponent, AttendanceBodyPortalDirective],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  private readonly service = inject(AttendanceService);
  private readonly router = inject(Router, { optional: true });
  private readonly document = inject(DOCUMENT);

  /** Force the team tab on/off. Default: on for /hr and /admin routes. */
  readonly manage = input<boolean | null>(null);

  readonly employeeId = DEMO_EMPLOYEE_ID;
  readonly styles = STATUS_STYLES;
  readonly legend = CALENDAR_LEGEND;
  readonly teamFilters = TEAM_FILTERS;
  readonly limits = ATTENDANCE_LIMITS;
  readonly weekdayHeads = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly clock = clock;
  readonly duration = duration;

  readonly canManage = computed(() => this.manage() ?? /^\/(hr|admin)(\/|$)/.test(this.router?.url ?? ''));
  readonly isOnline = this.service.isOnline;

  readonly tab = signal<Tab>('me');
  readonly policy = signal<AttendancePolicy>(DEFAULT_ATTENDANCE_POLICY);
  readonly now = signal(new Date());
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toast = signal<string | null>(null);

  // ---- My attendance -------------------------------------------------------------------------
  readonly todayDay = signal<AttendanceDay | null>(null);
  readonly monthStart = signal(isoDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
  readonly monthDays = signal<AttendanceDay[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly myRequests = signal<Regularization[]>([]);
  readonly workMode = signal<WorkMode>('Office');
  readonly note = signal('');

  readonly todayIso = computed(() => isoDate(this.now()));
  readonly clockText = computed(() => {
    const d = this.now();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  });
  readonly dateText = computed(() => {
    const d = this.now();
    return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  });
  readonly greeting = computed(() => {
    const h = this.now().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  });

  /** Minutes worked today, ticking while checked in. */
  readonly liveMinutes = computed(() => {
    const t = this.todayDay();
    if (!t?.checkInAt) return 0;
    if (t.checkOutAt) return t.workedMinutes ?? 0;
    return Math.max(0, Math.floor((this.now().getTime() - parseLocal(t.checkInAt).getTime()) / 60000));
  });
  readonly fullDayMinutes = computed(() => this.policy().fullDayHours * 60);
  readonly progressPct = computed(() => Math.min(100, Math.round((this.liveMinutes() / this.fullDayMinutes()) * 100)));
  readonly leaveAt = computed(() => {
    const t = this.todayDay();
    if (!t?.checkInAt) return null;
    const d = parseLocal(t.checkInAt);
    d.setMinutes(d.getMinutes() + this.fullDayMinutes());
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  });
  readonly todayState = computed<'off' | 'ready' | 'working' | 'done'>(() => {
    const t = this.todayDay();
    if (!t) return 'ready';
    if (t.checkInAt && !t.checkOutAt) return 'working';
    if (t.checkOutAt) return 'done';
    return t.status === 'Weekend' || t.status === 'Holiday' || (t.status === 'On leave' && !t.isHalfDayLeave) ? 'off' : 'ready';
  });

  readonly monthLabel = computed(() => {
    const d = parseLocal(this.monthStart());
    return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  });
  readonly isCurrentMonth = computed(() => this.monthStart().slice(0, 7) === this.todayIso().slice(0, 7));

  readonly calendar = computed<CalendarCell[]>(() => {
    const days = this.monthDays();
    if (!days.length) return [];
    const lead = (parseLocal(days[0].date).getDay() + 6) % 7;
    const today = this.todayIso();
    const blanks: CalendarCell[] = Array.from({ length: lead }, () => ({ day: null, num: 0, today: false }));
    return [...blanks, ...days.map((d) => ({ day: this.withToday(d), num: Number(d.date.slice(8, 10)), today: d.date === today }))];
  });

  readonly monthStats = computed(() => {
    const days = this.monthDays().map((d) => this.withToday(d));
    const worked = days.filter((d) => this.styles[d.status]?.worked);
    const complete = worked.filter((d) => d.checkOutAt && d.workedMinutes !== null);
    const absent = days.filter((d) => d.status === 'Absent').length;
    const avg = complete.length ? Math.round(complete.reduce((s, d) => s + (d.workedMinutes ?? 0), 0) / complete.length) : null;
    const total = complete.reduce((s, d) => s + (d.workedMinutes ?? 0), 0);
    const due = worked.length + absent;
    return {
      present: worked.length,
      late: worked.filter((d) => d.isLate).length,
      remote: worked.filter((d) => d.workMode === 'Remote').length,
      absent,
      leave: days.filter((d) => d.status === 'On leave').length,
      missed: days.filter((d) => d.status === 'Missed check-out').length,
      avg,
      total,
      rate: due ? Math.round((worked.length / due) * 100) : null,
    };
  });

  readonly selectedDay = computed(() => {
    const date = this.selectedDate();
    const d = date ? this.monthDays().find((x) => x.date === date) : null;
    return d ? this.withToday(d) : null;
  });

  readonly pendingDates = computed(() => new Set(this.myRequests().filter((r) => r.status === 'Pending').map((r) => r.workDate)));
  readonly pendingMine = computed(() => this.myRequests().filter((r) => r.status === 'Pending').length);

  // ---- Correction drawer ---------------------------------------------------------------------
  readonly drawerOpen = signal(false);
  readonly submitted = signal(false);
  readonly form = signal<RegularizationDraft>(this.blankDraft(null));
  readonly formErrors = computed<RegularizationErrors>(() => validateRegularization(this.form(), this.now(), this.policy().regularizeDays));
  readonly formValid = computed(() => Object.keys(this.formErrors()).length === 0);
  readonly minCorrectionDate = computed(() => addDays(this.todayIso(), -this.policy().regularizeDays));
  readonly pendingWithdraw = signal<Regularization | null>(null);

  // ---- Team ----------------------------------------------------------------------------------
  readonly teamDate = signal(isoDate(new Date()));
  readonly teamSearch = signal('');
  readonly teamFilter = signal<TeamFilter>('All');
  readonly teamRows = signal<TeamDayRow[]>([]);
  readonly trend = signal<AttendanceTrendPoint[]>([]);
  readonly approvals = signal<Regularization[]>([]);
  readonly teamLoading = signal(false);
  readonly teamLoaded = signal(false);
  readonly rejecting = signal<Regularization | null>(null);
  readonly rejectNote = signal('');
  readonly rejectTouched = signal(false);

  readonly teamCounts = computed(() => {
    const rows = this.teamRows();
    const at = rows.filter((r) => this.styles[r.status]?.worked);
    return {
      total: rows.length,
      present: at.length,
      office: at.filter((r) => r.workMode !== 'Remote').length,
      remote: at.filter((r) => r.workMode === 'Remote').length,
      late: at.filter((r) => r.isLate).length,
      leave: rows.filter((r) => r.status === 'On leave').length,
      notIn: rows.filter((r) => r.status === 'Absent' || r.status === 'Not checked in').length,
    };
  });

  readonly teamCards = computed(() => {
    const c = this.teamCounts();
    return [
      { label: 'Present', value: c.present, sub: `of ${c.total}`, tone: 'text-emerald-600' },
      { label: 'In office', value: c.office, sub: 'checked in', tone: 'text-gray-900' },
      { label: 'Remote', value: c.remote, sub: 'working remotely', tone: 'text-blue-600' },
      { label: 'Late', value: c.late, sub: 'after grace', tone: 'text-amber-600' },
      { label: 'On leave', value: c.leave, sub: 'approved', tone: 'text-violet-600' },
      { label: 'Not in', value: c.notIn, sub: 'absent / not yet', tone: 'text-red-600' },
    ];
  });

  readonly filteredTeam = computed(() => {
    const f = this.teamFilter();
    return this.teamRows().filter((r) => {
      const worked = !!this.styles[r.status]?.worked;
      switch (f) {
        case 'In office':
          return worked && r.workMode !== 'Remote';
        case 'Remote':
          return worked && r.workMode === 'Remote';
        case 'Late':
          return r.isLate;
        case 'On leave':
          return r.status === 'On leave';
        case 'Not in':
          return r.status === 'Absent' || r.status === 'Not checked in';
        default:
          return true;
      }
    });
  });

  readonly trendMax = computed(() => Math.max(1, ...this.trend().map((p) => p.present + p.onLeave + p.absent)));
  readonly trendAvg = computed(() => {
    const work = this.trend().filter((p) => !p.isOffDay && p.present + p.onLeave + p.absent > 0);
    if (!work.length) return null;
    return Math.round((work.reduce((s, p) => s + p.present / (p.present + p.onLeave + p.absent), 0) / work.length) * 100);
  });

  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    const timer = setInterval(() => this.now.set(this.service.now()), 1000);
    inject(DestroyRef).onDestroy(() => {
      clearInterval(timer);
      if (this.searchTimer) clearTimeout(this.searchTimer);
      if (this.toastTimer) clearTimeout(this.toastTimer);
    });
  }

  async ngOnInit(): Promise<void> {
    this.loading.set(true);
    try {
      this.policy.set(await this.service.policy());
      this.now.set(this.service.now());
      const today = this.service.today();
      this.monthStart.set(`${today.slice(0, 7)}-01`);
      this.teamDate.set(today);
      await Promise.all([this.loadToday(), this.loadMonth(), this.loadRequests()]);
    } catch (e) {
      this.fail(e);
    } finally {
      this.loading.set(false);
    }
  }

  // ---- Tabs ----------------------------------------------------------------------------------
  async selectTab(tab: Tab): Promise<void> {
    this.tab.set(tab);
    if (tab === 'team' && !this.teamLoaded()) await this.loadTeam(true);
  }

  // ---- Check in / out ------------------------------------------------------------------------
  async checkIn(): Promise<void> {
    if (this.busy()) return;
    if (this.note().length > this.limits.noteMax) return this.error.set(`Note must be ${this.limits.noteMax} characters or fewer.`);
    await this.act(async () => {
      const result = await this.service.checkIn(this.employeeId, this.workMode(), this.note());
      this.applyToday(result.today);
      this.note.set('');
      this.showToast(result.message || 'Checked in.');
    });
  }

  async checkOut(): Promise<void> {
    if (this.busy()) return;
    await this.act(async () => {
      const result = await this.service.checkOut(this.employeeId, this.note());
      this.applyToday(result.today);
      this.note.set('');
      this.showToast(result.message || 'Checked out.');
    });
  }

  // ---- Month ---------------------------------------------------------------------------------
  async shiftMonth(delta: number): Promise<void> {
    const d = parseLocal(this.monthStart());
    d.setMonth(d.getMonth() + delta);
    const next = isoDate(new Date(d.getFullYear(), d.getMonth(), 1));
    if (next.slice(0, 7) > this.todayIso().slice(0, 7)) return;
    this.monthStart.set(next);
    this.selectedDate.set(null);
    await this.guard(() => this.loadMonth());
  }

  selectDay(cell: CalendarCell): void {
    if (!cell.day || cell.day.status === 'Upcoming') return;
    this.selectedDate.set(this.selectedDate() === cell.day.date ? null : cell.day.date);
  }

  canCorrect(day: AttendanceDay | null): boolean {
    if (!day || OFF.includes(day.status) || day.status === 'Working') return false;
    if (day.date > this.todayIso() || day.date < this.minCorrectionDate()) return false;
    return !this.pendingDates().has(day.date);
  }

  dayTitle(day: AttendanceDay): string {
    const parts: string[] = [day.status];
    if (day.holidayName) parts.push(day.holidayName);
    if (day.leaveType) parts.push(day.leaveType);
    if (day.checkInAt) parts.push(`${clock(day.checkInAt)} – ${clock(day.checkOutAt)}`);
    if (day.isLate) parts.push('late');
    return parts.join(' · ');
  }

  longDate(date: string): string {
    const d = parseLocal(date);
    return `${WEEKDAYS[d.getDay()].slice(0, 3)}, ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  }

  shortDate(date: string): string {
    const d = parseLocal(date);
    return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
  }

  // ---- Corrections ---------------------------------------------------------------------------
  openCorrection(day: AttendanceDay | null = null): void {
    this.form.set(this.blankDraft(day));
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    if (!this.busy()) this.drawerOpen.set(false);
  }

  patch<K extends keyof RegularizationDraft>(key: K, value: RegularizationDraft[K]): void {
    this.form.update((f) => ({ ...f, [key]: value }));
  }

  fieldError(key: keyof RegularizationDraft): string {
    return this.submitted() ? (this.formErrors()[key] ?? '') : '';
  }

  async submitCorrection(): Promise<void> {
    this.submitted.set(true);
    if (!this.formValid() || this.busy()) return;
    await this.act(async () => {
      await this.service.requestRegularization(this.employeeId, this.form());
      this.drawerOpen.set(false);
      await this.loadRequests();
      if (this.teamLoaded()) await this.loadApprovals();
      this.showToast('Correction sent to your manager.');
    });
  }

  async withdraw(): Promise<void> {
    const req = this.pendingWithdraw();
    if (!req) return;
    await this.act(async () => {
      await this.service.cancel(req.id, this.employeeId);
      this.pendingWithdraw.set(null);
      await this.loadRequests();
      if (this.teamLoaded()) await this.loadApprovals();
      this.showToast('Request withdrawn.');
    });
  }

  // ---- Team ----------------------------------------------------------------------------------
  async setTeamDate(date: string): Promise<void> {
    if (!date || date > this.todayIso()) return;
    this.teamDate.set(date);
    await this.guard(() => this.loadTeamDay());
  }

  async shiftTeamDate(delta: number): Promise<void> {
    await this.setTeamDate(addDays(this.teamDate(), delta));
  }

  onSearch(value: string): void {
    this.teamSearch.set(value);
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => void this.guard(() => this.loadTeamDay()), 300);
  }

  async approve(req: Regularization): Promise<void> {
    await this.act(async () => {
      await this.service.decide(req.id, true, '', DEMO_APPROVER_ID);
      await this.afterDecision(req, 'Approved. The attendance record was updated.');
    });
  }

  openReject(req: Regularization): void {
    this.rejecting.set(req);
    this.rejectNote.set('');
    this.rejectTouched.set(false);
  }

  async confirmReject(): Promise<void> {
    const req = this.rejecting();
    this.rejectTouched.set(true);
    if (!req || !this.rejectNote().trim()) return;
    await this.act(async () => {
      await this.service.decide(req.id, false, this.rejectNote(), DEMO_APPROVER_ID);
      this.rejecting.set(null);
      await this.afterDecision(req, 'Request rejected.');
    });
  }

  exportCsv(): void {
    const rows = this.filteredTeam();
    const csv = toCsv([
      ['Employee ID', 'Name', 'Department', 'Status', 'Late', 'Check in', 'Check out', 'Worked', 'Mode'],
      ...rows.map((r) => [
        r.employeeId,
        r.employeeName,
        r.department,
        r.status,
        r.isLate ? 'Yes' : 'No',
        clock(r.checkInAt),
        clock(r.checkOutAt),
        duration(r.workedMinutes),
        r.workMode ?? '',
      ]),
    ]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = `attendance-${this.teamDate()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  trendHeight(value: number): number {
    return Math.round((value / this.trendMax()) * 100);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.rejecting()) this.rejecting.set(null);
    else if (this.pendingWithdraw()) this.pendingWithdraw.set(null);
    else this.closeDrawer();
  }

  // ---- Loading -------------------------------------------------------------------------------
  private async loadToday(): Promise<void> {
    const today = this.service.today();
    const [row] = await this.service.days(this.employeeId, today, today);
    this.todayDay.set(row ?? null);
  }

  private async loadMonth(): Promise<void> {
    const start = this.monthStart();
    const d = parseLocal(start);
    const end = isoDate(new Date(d.getFullYear(), d.getMonth() + 1, 0));
    this.monthDays.set(await this.service.days(this.employeeId, start, end));
  }

  private async loadRequests(): Promise<void> {
    this.myRequests.set(await this.service.regularizations(this.employeeId));
  }

  private async loadTeam(withTrend: boolean): Promise<void> {
    this.teamLoading.set(true);
    try {
      const today = this.service.today();
      await Promise.all([
        this.loadTeamDay(),
        this.loadApprovals(),
        withTrend ? this.service.trend(addDays(today, -29), today).then((t) => this.trend.set(t)) : Promise.resolve(),
      ]);
      this.teamLoaded.set(true);
    } catch (e) {
      this.fail(e);
    } finally {
      this.teamLoading.set(false);
    }
  }

  private async loadTeamDay(): Promise<void> {
    this.teamRows.set(await this.service.team(this.teamDate(), this.teamSearch()));
  }

  private async loadApprovals(): Promise<void> {
    this.approvals.set(await this.service.regularizations(null, 'Pending'));
  }

  private async afterDecision(req: Regularization, message: string): Promise<void> {
    await Promise.all([this.loadApprovals(), this.loadTeamDay()]);
    if (req.employeeId === this.employeeId) await Promise.all([this.loadRequests(), this.loadMonth(), this.loadToday()]);
    this.showToast(message);
  }

  // ---- Helpers -------------------------------------------------------------------------------
  /** The month list is fetched once; today's row is live (check in/out happen on this page). */
  private withToday(day: AttendanceDay): AttendanceDay {
    const t = this.todayDay();
    return t && t.date === day.date ? t : day;
  }

  private applyToday(row: AttendanceDay | null): void {
    if (!row) return;
    this.todayDay.set(row);
    this.monthDays.update((days) => days.map((d) => (d.date === row.date ? row : d)));
  }

  private blankDraft(day: AttendanceDay | null): RegularizationDraft {
    const p = this.policy?.() ?? DEFAULT_ATTENDANCE_POLICY;
    return {
      workDate: day?.date ?? '',
      checkIn: day?.checkInAt ? clock(day.checkInAt) : p.shiftStart,
      checkOut: day?.checkOutAt ? clock(day.checkOutAt) : p.shiftEnd,
      workMode: day?.workMode ?? 'Office',
      reason: '',
    };
  }

  private async act(work: () => Promise<void>): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    try {
      await work();
    } catch (e) {
      this.fail(e);
    } finally {
      this.busy.set(false);
    }
  }

  private async guard(work: () => Promise<void>): Promise<void> {
    try {
      this.error.set(null);
      await work();
    } catch (e) {
      this.fail(e);
    }
  }

  private fail(e: unknown): void {
    this.error.set(e instanceof Error && e.message ? e.message : 'Something went wrong.');
  }

  private showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3500);
  }
}
