import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import {
  PlannerCalendarDayCell,
  PlannerCalendarEvent,
  PlannerCalendarPeriod,
  PlannerCalendarSelectionChange,
  PlannerCalendarWeekDay,
  plannerCalendarMockEvents
} from '../../../models/component-models/planner-calendar.model';
import {
  PlannerCalendarSidebarMode,
  PlannerCalendarView
} from '../../../models/component-models/planner-calendar.types';

@Component({
  selector: 'ui-planner-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-calendar.component.html',
  styleUrl: './planner-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ui-planner-calendar-host'
  }
})
export class PlannerCalendarComponent {
  events = input<PlannerCalendarEvent[]>(plannerCalendarMockEvents);
  initialDate = input<Date>(new Date());
  availableViews = input<PlannerCalendarView[]>(['month', 'week', 'day']);
  sidebarMode = input<PlannerCalendarSidebarMode>('agenda');

  dateSelected = output<Date>();
  eventSelected = output<PlannerCalendarEvent>();
  viewChanged = output<PlannerCalendarView>();
  periodChanged = output<PlannerCalendarPeriod>();
  selectionChanged = output<PlannerCalendarSelectionChange>();

  readonly currentView = signal<PlannerCalendarView>('month');
  readonly selectedDate = signal<Date>(this.normalizeDate(new Date()));

  private readonly anchorDate = signal<Date>(this.normalizeDate(new Date()));
  private readonly today = this.normalizeDate(new Date());

  readonly weekDayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly timelineHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  readonly monthLabel = computed(() =>
    this.anchorDate().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  );

  readonly periodLabel = computed(() => {
    const view = this.currentView();

    if (view === 'month') {
      return this.monthLabel();
    }

    if (view === 'day') {
      return this.formatDayTitle(this.anchorDate());
    }

    const weekDays = this.weekDays();
    const startDate = weekDays[0]?.date;
    const endDate = weekDays[weekDays.length - 1]?.date;

    if (!startDate || !endDate) {
      return '';
    }

    const sameYear = startDate.getFullYear() === endDate.getFullYear();
    const sameMonth = startDate.getMonth() === endDate.getMonth();

    const startLabel = startDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const endLabel = endDate.toLocaleDateString('en-US', {
      month: sameMonth ? undefined : 'short',
      day: 'numeric'
    });

    const yearLabel = sameYear
      ? startDate.getFullYear()
      : `${startDate.getFullYear()} - ${endDate.getFullYear()}`;

    return `${startLabel} - ${endLabel}, ${yearLabel}`;
  });

  readonly weekDays = computed<PlannerCalendarWeekDay[]>(() => {
    const baseDate = this.anchorDate();

    if (this.currentView() === 'day') {
      const isoDate = this.toIsoDate(baseDate);
      return [
        {
          date: baseDate,
          isoDate,
          shortName: baseDate.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: baseDate.getDate(),
          isToday: this.isSameDate(baseDate, this.today)
        }
      ];
    }

    const start = this.startOfWeek(baseDate);

    return Array.from({ length: 7 }, (_, index) => {
      const date = this.addDays(start, index);
      return {
        date,
        isoDate: this.toIsoDate(date),
        shortName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: this.isSameDate(date, this.today)
      };
    });
  });

  readonly monthCells = computed<PlannerCalendarDayCell[]>(() => {
    const anchorDate = this.anchorDate();
    const selectedDate = this.selectedDate();
    const monthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const gridStart = this.startOfWeek(monthStart);

    return Array.from({ length: 42 }, (_, index) => {
      const date = this.addDays(gridStart, index);
      const events = this.getEventsForDate(date);

      return {
        date,
        isoDate: this.toIsoDate(date),
        dayNumber: date.getDate(),
        isCurrentMonth: date.getMonth() === anchorDate.getMonth(),
        isToday: this.isSameDate(date, this.today),
        isSelected: this.isSameDate(date, selectedDate),
        events
      };
    });
  });

  readonly selectedDayEvents = computed(() => {
    const selectedDate = this.selectedDate();
    return this.getEventsForDate(selectedDate);
  });

  readonly upcomingEvents = computed(() => {
    const fromDate = this.selectedDate().getTime();

    return [...this.events()]
      .filter((event) => new Date(event.startIso).getTime() >= fromDate)
      .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime())
      .slice(0, 6);
  });

  readonly currentPeriod = computed<PlannerCalendarPeriod>(() => {
    const view = this.currentView();

    if (view === 'month') {
      const monthDate = this.anchorDate();
      return {
        view,
        startDate: new Date(monthDate.getFullYear(), monthDate.getMonth(), 1),
        endDate: new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
      };
    }

    if (view === 'day') {
      const date = this.anchorDate();
      return {
        view,
        startDate: date,
        endDate: date
      };
    }

    const weekDays = this.weekDays();
    return {
      view,
      startDate: weekDays[0]?.date ?? this.anchorDate(),
      endDate: weekDays[weekDays.length - 1]?.date ?? this.anchorDate()
    };
  });

  constructor() {
    effect(() => {
      const incomingDate = this.normalizeDate(this.initialDate());
      this.anchorDate.set(incomingDate);
      this.selectedDate.set(incomingDate);
    });

    effect(() => {
      this.periodChanged.emit(this.currentPeriod());
    });

    effect(() => {
      const selectedDate = this.selectedDate();
      this.selectionChanged.emit({
        selectedDate,
        events: this.getEventsForDate(selectedDate)
      });
    });
  }

  setView(view: PlannerCalendarView): void {
    if (view === this.currentView()) {
      return;
    }

    this.currentView.set(view);
    this.viewChanged.emit(view);
  }

  goToToday(): void {
    this.selectDate(this.today);
  }

  goToPrevious(): void {
    const currentDate = this.anchorDate();
    const currentView = this.currentView();

    if (currentView === 'month') {
      this.anchorDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
      return;
    }

    const daysToMove = currentView === 'week' ? -7 : -1;
    this.anchorDate.set(this.addDays(currentDate, daysToMove));
  }

  goToNext(): void {
    const currentDate = this.anchorDate();
    const currentView = this.currentView();

    if (currentView === 'month') {
      this.anchorDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
      return;
    }

    const daysToMove = currentView === 'week' ? 7 : 1;
    this.anchorDate.set(this.addDays(currentDate, daysToMove));
  }

  selectDate(date: Date): void {
    const normalizedDate = this.normalizeDate(date);
    this.selectedDate.set(normalizedDate);
    this.anchorDate.set(normalizedDate);
    this.dateSelected.emit(normalizedDate);
  }

  onMonthCellClick(cell: PlannerCalendarDayCell): void {
    this.selectDate(cell.date);
  }

  onEventClick(event: PlannerCalendarEvent, date: Date): void {
    this.selectDate(date);
    this.eventSelected.emit(event);
  }

  onUpcomingEventClick(event: PlannerCalendarEvent): void {
    this.onEventClick(event, new Date(event.startIso));
  }

  trackByDayCell(_: number, dayCell: PlannerCalendarDayCell): string {
    return dayCell.isoDate;
  }

  trackByWeekDay(_: number, weekDay: PlannerCalendarWeekDay): string {
    return weekDay.isoDate;
  }

  trackByEvent(_: number, event: PlannerCalendarEvent): string {
    return event.id;
  }

  getEventsForHour(date: Date, hour: number): PlannerCalendarEvent[] {
    return this.getEventsForDate(date).filter((event) => {
      const eventStart = new Date(event.startIso);
      return eventStart.getHours() === hour;
    });
  }

  formatHourLabel(hour: number): string {
    return new Date(2026, 0, 1, hour).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  formatSelectedDate(): string {
    return this.selectedDate().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatEventTime(event: PlannerCalendarEvent): string {
    if (event.isAllDay) {
      return 'All day';
    }

    const start = new Date(event.startIso);
    const end = new Date(event.endIso);

    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });

    return `${formatter.format(start)} - ${formatter.format(end)}`;
  }

  isCurrentView(view: PlannerCalendarView): boolean {
    return this.currentView() === view;
  }

  isSelectedDate(date: Date): boolean {
    return this.isSameDate(date, this.selectedDate());
  }

  isToday(date: Date): boolean {
    return this.isSameDate(date, this.today);
  }

  private getEventsForDate(date: Date): PlannerCalendarEvent[] {
    const isoDate = this.toIsoDate(date);

    return [...this.events()]
      .filter((event) => this.toIsoDate(new Date(event.startIso)) === isoDate)
      .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());
  }

  private startOfWeek(date: Date): Date {
    const normalizedDate = this.normalizeDate(date);
    const weekDay = normalizedDate.getDay();

    return this.addDays(normalizedDate, -weekDay);
  }

  private addDays(date: Date, days: number): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + days);
    return this.normalizeDate(nextDate);
  }

  private isSameDate(firstDate: Date, secondDate: Date): boolean {
    return firstDate.toDateString() === secondDate.toDateString();
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private toIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private formatDayTitle(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
