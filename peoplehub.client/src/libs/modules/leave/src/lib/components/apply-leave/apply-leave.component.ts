import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, TextButtonComponent } from 'ui';
import { LeaveService } from '../../services/leave.service';
import { BodyPortalDirective } from '../../directives/body-portal.directive';
import {
  DayPart,
  LeaveDraft,
  LeaveDraftErrors,
  LeaveRequest,
  LeaveStatus,
  LeaveTypeKey,
} from '../../models/leave-request.model';
import {
  LEAVE_STATUS_STYLES,
  LEAVE_TYPE_MAP,
  LEAVE_TYPES,
  REASON_MAX,
} from '../../config/leave-policy';
import {
  addDaysIso,
  diffDays,
  formatDay,
  formatDays,
  formatRange,
  skippedDays,
  todayIso,
  weekdayName,
  workingDays,
} from '../../utils/leave-date.utils';

type StatusTab = 'All' | LeaveStatus;

/** Employee page: leave balances, apply for leave, track and withdraw requests. */
@Component({
  selector: 'apply-leave-root',
  standalone: true,
  imports: [CommonModule, IconComponent, TextButtonComponent, BodyPortalDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss'],
})
export class ApplyLeaveComponent implements OnDestroy {
  private readonly service = inject(LeaveService);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly types = LEAVE_TYPES;
  readonly typeMap = LEAVE_TYPE_MAP;
  readonly statusStyles = LEAVE_STATUS_STYLES;
  readonly reasonMax = REASON_MAX;
  readonly tabs: StatusTab[] = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];
  readonly dayParts: { key: DayPart; label: string }[] = [
    { key: 'full', label: 'Full day' },
    { key: 'first-half', label: 'First half' },
    { key: 'second-half', label: 'Second half' },
  ];

  readonly formatDay = formatDay;
  readonly formatDays = formatDays;
  readonly formatRange = formatRange;
  readonly weekdayName = weekdayName;

  readonly balances = this.service.balances;
  readonly totals = this.service.totals;
  readonly upcoming = this.service.upcoming;

  // list
  readonly tab = signal<StatusTab>('All');
  readonly counts = computed(() => {
    const counts: Record<StatusTab, number> = { All: 0, Pending: 0, Approved: 0, Rejected: 0, Cancelled: 0 };
    for (const r of this.service.requests()) {
      counts.All++;
      counts[r.status]++;
    }
    return counts;
  });
  readonly visible = computed(() =>
    this.service.requests().filter((r) => this.tab() === 'All' || r.status === this.tab()),
  );

  // form (signals keep it simple and fully reactive)
  readonly formOpen = signal(false);
  readonly type = signal<LeaveTypeKey>('earned');
  readonly fromDate = signal('');
  readonly toDate = signal('');
  readonly dayPart = signal<DayPart>('full');
  readonly reason = signal('');
  readonly submitted = signal(false);

  // overlays
  readonly viewing = signal<LeaveRequest | null>(null);
  readonly pendingCancel = signal<LeaveRequest | null>(null);
  readonly toast = signal<string | null>(null);

  readonly draft = computed<LeaveDraft>(() => ({
    type: this.type(),
    fromDate: this.fromDate(),
    toDate: this.toDate(),
    dayPart: this.isSingleDay() ? this.dayPart() : 'full',
    reason: this.reason(),
  }));
  readonly errors = computed<LeaveDraftErrors>(() => this.service.validate(this.draft()));
  readonly shownErrors = computed<LeaveDraftErrors>(() => {
    if (this.submitted()) return this.errors();
    // Before submit, only show problems with dates the user already picked.
    const { balance, overlap, fromDate, toDate } = this.errors();
    return this.fromDate() && this.toDate() ? { balance, overlap, fromDate, toDate } : {};
  });
  readonly isSingleDay = computed(() => !!this.fromDate() && this.fromDate() === this.toDate());
  readonly selectedType = computed(() => LEAVE_TYPE_MAP[this.type()]);
  readonly selectedBalance = computed(() => this.service.balanceOf(this.type()));
  readonly days = computed(() =>
    this.fromDate() && this.toDate() && this.toDate() >= this.fromDate()
      ? workingDays(this.fromDate(), this.toDate(), this.draft().dayPart)
      : 0,
  );
  readonly skipped = computed(() =>
    this.days() > 0 ? skippedDays(this.fromDate(), this.toDate()) : { weekends: 0, holidays: [] as string[] },
  );
  readonly balanceAfter = computed(() => {
    const available = this.selectedBalance().available;
    return available === null ? null : available - this.days();
  });
  readonly minFrom = computed(() => addDaysIso(todayIso(), -this.selectedType().backdateDays));
  readonly needsDocument = computed(() => {
    const limit = this.selectedType().documentAfterDays;
    return limit !== undefined && this.days() > limit;
  });
  readonly upcomingIn = computed(() => {
    const next = this.upcoming();
    return next ? diffDays(todayIso(), next.fromDate) : null;
  });

  // ---------- form ----------
  openForm(type?: LeaveTypeKey): void {
    const start = this.nextWorkingDay();
    this.type.set(type ?? 'earned');
    this.fromDate.set(start);
    this.toDate.set(start);
    this.dayPart.set('full');
    this.reason.set('');
    this.submitted.set(false);
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
  }

  setType(type: LeaveTypeKey): void {
    this.type.set(type);
  }

  setFrom(value: string): void {
    this.fromDate.set(value);
    if (!this.toDate() || this.toDate() < value) this.toDate.set(value);
  }

  setTo(value: string): void {
    this.toDate.set(value);
  }

  setDayPart(part: DayPart): void {
    this.dayPart.set(part);
  }

  setReason(value: string): void {
    this.reason.set(value ?? '');
  }

  submit(): void {
    this.submitted.set(true);
    const result = this.service.apply(this.draft());
    if (!result.request) return;
    this.formOpen.set(false);
    this.tab.set('All');
    this.showToast(`Leave request sent for ${formatDays(result.request.days)}`);
  }

  hasErrors(errors: LeaveDraftErrors): boolean {
    return Object.values(errors).some(Boolean);
  }

  // ---------- list actions ----------
  canCancel(request: LeaveRequest): boolean {
    return this.service.canCancel(request);
  }

  askCancel(request: LeaveRequest): void {
    this.pendingCancel.set(request);
  }

  confirmCancel(): void {
    const request = this.pendingCancel();
    if (!request) return;
    this.service.cancel(request.id);
    this.pendingCancel.set(null);
    if (this.viewing()?.id === request.id) this.viewing.set(null);
    this.showToast('Leave request withdrawn');
  }

  // ---------- helpers ----------
  usedPercent(used: number, pending: number, entitlement: number | null): { used: number; pending: number } {
    if (!entitlement) return { used: 0, pending: 0 };
    return {
      used: Math.min((used / entitlement) * 100, 100),
      pending: Math.min((pending / entitlement) * 100, 100 - Math.min((used / entitlement) * 100, 100)),
    };
  }

  dayPartLabel(part: DayPart): string {
    return this.dayParts.find((p) => p.key === part)?.label ?? '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pendingCancel()) this.pendingCancel.set(null);
    else if (this.viewing()) this.viewing.set(null);
    else if (this.formOpen()) this.formOpen.set(false);
  }

  ngOnDestroy(): void {
    clearTimeout(this.toastTimer);
  }

  private nextWorkingDay(): string {
    let iso = addDaysIso(todayIso(), 1);
    for (let i = 0; i < 14 && workingDays(iso, iso) === 0; i++) iso = addDaysIso(iso, 1);
    return iso;
  }

  private showToast(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3000);
  }
}
