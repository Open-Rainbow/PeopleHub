import { ChangeDetectionStrategy, Component, computed, HostListener, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent, TextButtonComponent } from 'ui';
import { HOLIDAY_LIMITS, HOLIDAY_TYPE_MAP, HOLIDAY_TYPES } from '../../config/holiday-options';
import { HolidayBodyPortalDirective } from '../../directives/body-portal.directive';
import { Holiday, HolidayDraft, HolidayDraftErrors, HolidayType } from '../../models/holiday.model';
import { HolidaysService, validateHoliday } from '../../services/holidays.service';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export interface HolidayView extends Holiday {
  day: number;
  month: number;
  weekday: string;
  weekend: boolean;
  past: boolean;
  today: boolean;
  /** Days from today (negative = past). */
  inDays: number;
  /** "3-day weekend" / "Take Fri off for a 4-day weekend" */
  bridge: string | null;
}

/**
 * Holiday calendar.
 * Employees: read-only (`/employee/holiday-calender`).
 * HR/admin: `[manage]="true"` adds add / edit / delete (`/hr/holidayList`, `/admin/holidayList`).
 */
@Component({
  selector: 'holiday-list-root',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, TextButtonComponent, HolidayBodyPortalDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.scss',
})
export class HolidayListComponent implements OnInit {
  private readonly service = inject(HolidaysService);

  readonly manage = input(false);

  readonly types = HOLIDAY_TYPES;
  readonly typeMap = HOLIDAY_TYPE_MAP;
  readonly limits = HOLIDAY_LIMITS;
  readonly months = MONTHS;

  readonly currentYear = new Date().getFullYear();
  readonly years = [this.currentYear - 1, this.currentYear, this.currentYear + 1];
  readonly year = signal(this.currentYear);
  readonly holidays = signal<Holiday[]>([]);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly toast = signal<string | null>(null);
  readonly isOnline = this.service.isOnline;

  readonly typeFilter = signal<'All' | HolidayType>('All');
  readonly monthFilter = signal<number | null>(null);
  readonly hidePast = signal(false);

  // Drawer + dialogs
  readonly drawerOpen = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly form = signal<HolidayDraft>(emptyDraft(this.currentYear));
  readonly submitted = signal(false);
  readonly pendingDelete = signal<HolidayView | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly todayIso = iso(new Date());

  readonly views = computed<HolidayView[]>(() => {
    const list = [...this.holidays()].sort((a, b) => a.date.localeCompare(b.date));
    const dates = new Set(list.filter((h) => !h.isOptional).map((h) => h.date));
    return list.map((h) => this.toView(h, dates));
  });

  readonly visible = computed(() =>
    this.views().filter((h) =>
      (this.typeFilter() === 'All' || h.type === this.typeFilter())
      && (this.monthFilter() === null || h.month === this.monthFilter())
      && (!this.hidePast() || !h.past)),
  );

  readonly groups = computed(() => {
    const groups: { month: number; label: string; items: HolidayView[] }[] = [];
    for (const h of this.visible()) {
      const last = groups[groups.length - 1];
      if (last?.month === h.month) last.items.push(h);
      else groups.push({ month: h.month, label: `${MONTHS_LONG[h.month]} ${this.year()}`, items: [h] });
    }
    return groups;
  });

  readonly next = computed(() => this.views().find((h) => !h.past) ?? null);

  readonly stats = computed(() => {
    const all = this.views();
    const fixed = all.filter((h) => !h.isOptional);
    return {
      total: all.length,
      upcoming: all.filter((h) => !h.past).length,
      weekdays: fixed.filter((h) => !h.weekend).length,
      onWeekend: fixed.filter((h) => h.weekend).length,
      longWeekends: all.filter((h) => h.bridge?.startsWith('3-day')).length,
      optional: all.filter((h) => h.isOptional).length,
    };
  });

  readonly perMonth = computed(() => MONTHS.map((label, m) => ({
    label,
    month: m,
    count: this.views().filter((h) => h.month === m).length,
    dots: this.views().filter((h) => h.month === m).map((h) => this.typeMap[h.type]?.dot ?? 'bg-gray-400'),
  })));

  readonly typeCounts = computed(() =>
    this.types.map((t) => ({ ...t, count: this.views().filter((h) => h.type === t.id).length })),
  );

  readonly formErrors = computed<HolidayDraftErrors>(() =>
    validateHoliday(this.form(), this.holidays(), this.editingId()),
  );
  readonly formValid = computed(() => Object.keys(this.formErrors()).length === 0);
  readonly formWeekday = computed(() => {
    const d = parse(this.form().date);
    return d ? WEEKDAYS[d.getDay()] : '';
  });
  readonly formOnWeekend = computed(() => {
    const d = parse(this.form().date);
    return !!d && (d.getDay() === 0 || d.getDay() === 6);
  });

  ngOnInit(): void {
    void this.load();
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.holidays.set(await this.service.list(this.year()));
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.loading.set(false);
    }
  }

  selectYear(value: number | string): void {
    const y = Number(value);
    if (y === this.year()) return;
    this.year.set(y);
    this.monthFilter.set(null);
    void this.load();
  }

  toggleMonth(m: number): void {
    this.monthFilter.update((cur) => (cur === m ? null : m));
  }

  countdown(h: HolidayView): string {
    if (h.today) return 'Today';
    if (h.inDays === 1) return 'Tomorrow';
    if (h.inDays > 1) return `In ${h.inDays} days`;
    return h.inDays === -1 ? 'Yesterday' : `${-h.inDays} days ago`;
  }

  // ---- HR actions -------------------------------------------------------------

  openAdd(): void {
    this.editingId.set(null);
    this.form.set(emptyDraft(this.year()));
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  openEdit(h: Holiday): void {
    this.editingId.set(h.id);
    this.form.set({ date: h.date, name: h.name, type: h.type, isOptional: h.isOptional, description: h.description });
    this.submitted.set(false);
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  patch<K extends keyof HolidayDraft>(field: K, value: HolidayDraft[K]): void {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  fieldError(field: keyof HolidayDraft): string | undefined {
    return this.submitted() || (field === 'date' && !!this.form().date) ? this.formErrors()[field] : undefined;
  }

  async save(): Promise<void> {
    this.submitted.set(true);
    if (!this.formValid()) return;
    const draft = this.form();
    const id = this.editingId();
    await this.act(async () => {
      const saved = id === null ? await this.service.create(draft) : await this.service.update(id, draft);
      this.drawerOpen.set(false);
      const savedYear = Number(saved.date.slice(0, 4));
      if (savedYear !== this.year()) this.year.set(savedYear);
      await this.load();
      this.showToast(id === null ? `${saved.name} added` : `${saved.name} updated`);
    });
  }

  async confirmDelete(): Promise<void> {
    const target = this.pendingDelete();
    if (!target) return;
    this.pendingDelete.set(null);
    await this.act(async () => {
      await this.service.remove(target.id);
      this.holidays.update((list) => list.filter((h) => h.id !== target.id));
      this.showToast(`${target.name} removed`);
    });
  }

  /** Downloads the visible year as an .ics file (Google / Outlook / Apple calendar). */
  exportCalendar(): void {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//PeopleHub//Holidays//EN', 'CALSCALE:GREGORIAN'];
    for (const h of this.views()) {
      const start = h.date.replace(/-/g, '');
      const end = iso(addDays(parse(h.date)!, 1)).replace(/-/g, '');
      lines.push(
        'BEGIN:VEVENT',
        `UID:peoplehub-holiday-${h.date}@peoplehub`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        `SUMMARY:${escapeIcs(h.name + (h.isOptional ? ' (optional)' : ''))}`,
        ...(h.description ? [`DESCRIPTION:${escapeIcs(h.description)}`] : []),
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
      );
    }
    lines.push('END:VCALENDAR');
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `holidays-${this.year()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.pendingDelete()) this.pendingDelete.set(null);
    else if (this.drawerOpen()) this.drawerOpen.set(false);
  }

  private async act(work: () => Promise<void>): Promise<void> {
    this.busy.set(true);
    this.error.set(null);
    try {
      await work();
    } catch (e) {
      this.error.set(message(e));
    } finally {
      this.busy.set(false);
    }
  }

  private toView(h: Holiday, fixedDates: Set<string>): HolidayView {
    const d = parse(h.date)!;
    const dow = d.getDay();
    const inDays = Math.round((d.getTime() - parse(this.todayIso)!.getTime()) / 86_400_000);
    const off = (offset: number) => {
      const x = addDays(d, offset);
      return x.getDay() === 0 || x.getDay() === 6 || fixedDates.has(iso(x));
    };
    let bridge: string | null = null;
    if (!h.isOptional && dow !== 0 && dow !== 6) {
      if ((dow === 5 && off(1)) || (dow === 1 && off(-1))) bridge = '3-day weekend';
      else if (dow === 4) bridge = 'Take Fri off for a 4-day weekend';
      else if (dow === 2) bridge = 'Take Mon off for a 4-day weekend';
    }
    return {
      ...h,
      day: d.getDate(),
      month: d.getMonth(),
      weekday: WEEKDAYS[dow],
      weekend: dow === 0 || dow === 6,
      past: inDays < 0,
      today: inDays === 0,
      inDays,
      bridge,
    };
  }

  private showToast(text: string): void {
    this.toast.set(text);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 3000);
  }
}

function emptyDraft(year: number): HolidayDraft {
  const now = new Date();
  const date = now.getFullYear() === year ? iso(now) : `${year}-01-01`;
  return { date, name: '', type: 'Public', isOptional: false, description: '' };
}

function parse(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function message(error: unknown): string {
  return error instanceof Error && error.message ? error.message : 'Something went wrong.';
}
