import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { CalendarPositionedEvent } from '../../../models/component-models/calendar-positioned-event.model';
import { ButtonListComponent } from '../../primitives/button-list/button-list.component';
import { ButtonComponent } from '../button/button.component';

type CalendarView = 'month' | 'week' | 'day';

interface CalendarEvent {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface WeekDayItem {
  date: Date;
  dayName: string;
}

interface CalendarDayItem {
  date: Date;
  fullDate: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'ui-detailed-calendar',
  standalone: true,
  imports: [ButtonListComponent, ButtonComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './detailed-calendar.component.html',
  styleUrls: ['./detailed-calendar.component.scss']
})
export class DetailedCalendarComponent implements OnInit {

  currentView: CalendarView = 'month';
  viewMode: CalendarView = 'month';
  selectedWeekDate: Date | null = null;
  selectedDate: Date | null = null;
  displayMonth: string = '';
  monthHeader: string = '';
  selectedWeekCells: { [key: string]: boolean } = {};


  weekDays: WeekDayItem[] = [];
  hours: string[] = [];
  calendarDays: CalendarDayItem[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  events: CalendarEvent[] = [
    { title: 'Teams meeting', date: '2025-12-12', startTime: '09:00', endTime: '10:00' },
    { title: 'Demo', date: '2025-12-13', startTime: '14:03', endTime: '15:30' },
    { title: 'Demo', date: '2025-12-13', startTime: '14:00', endTime: '14:30' },
    { title: 'Client meet', date: '2025-12-13', startTime: '01:00', endTime: '02:30' }
  ];

  @Input() label: string = 'Date of Birth';
  @Input() isRequired: boolean = true;
  @Input() defaultDate: Date | null = null;
  @Output() dateSelected = new EventEmitter<Date | null>();
  @Output() calendarClosed = new EventEmitter<void>();

  showCalendar = false;
  showMonthDropdown = false;
  showYearDropdown = false;
  clickedInside = false;
  calendarIcon: string = 'home';


  currentDate = new Date();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  years: number[] = [];

  startingYear: number = 1950;
  endingYear: number = 2050;

  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  formatDate(d: Date): string {
    return d.toISOString().split("T")[0]; // yyyy-mm-dd
  }
  getEventsForDate(dateString: string) {
    return this.events
      .filter(e => e.date === dateString)
      .sort((a, b) => this.timeToMinutes(a.startTime) - this.timeToMinutes(b.startTime));
  }

  timeToMinutes(t: string | undefined): number {
    if (!t) return 0;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }
  getEventTop(start: string): string {
    const [h, m] = start.split(":").map(Number);
    const totalMinutes = h * 60 + m;
    return (totalMinutes / (24 * 60)) * 100 + "%";
  }

  getEventHeight(start: string, end: string): string {
    const startMinutes = this.timeToMinutes(start);
    const endMinutes = this.timeToMinutes(end);
    return ((endMinutes - startMinutes) / (24 * 60)) * 100 + "%";
  }

  hourHeight = 60;
  private pxPerMinute = () => this.hourHeight / 60;
  getEventsForDay(date: Date): CalendarPositionedEvent[] {
    const dateStr = this.formatDate(date);
    const dayEvents: CalendarPositionedEvent[] = this.events
      .filter((event) => event.date === dateStr)
      .map((event) => {
        const [sh, sm] = event.startTime.split(':').map(Number);
        const [eh, em] = event.endTime.split(':').map(Number);
        const start = sh * 60 + sm;
        const end = eh * 60 + em;

        return {
          original: event,
          startMinutes: start,
          endMinutes: end,
          top: Math.round(start * this.pxPerMinute()),
          height: Math.max(Math.round((end - start) * this.pxPerMinute()), 2),
          col: 0,
          totalCols: 1,
          left: 0,
          width: 100,
          overlap: false
        };
      })
      .sort((a, b) => a.startMinutes - b.startMinutes);

    if (dayEvents.length === 0) return [];

    // 2. Build clusters of overlapping events
    const clusters: CalendarPositionedEvent[][] = [];
    let currentCluster: CalendarPositionedEvent[] = [];
    let clusterEnd = -1;

    for (const evt of dayEvents) {
      if (currentCluster.length === 0) {
        currentCluster.push(evt);
        clusterEnd = evt.endMinutes;
      } else if (evt.startMinutes < clusterEnd) {
        // overlaps current cluster
        currentCluster.push(evt);
        clusterEnd = Math.max(clusterEnd, evt.endMinutes);
      } else {
        // no overlap -> new cluster
        clusters.push(currentCluster);
        currentCluster = [evt];
        clusterEnd = evt.endMinutes;
      }
    }
    if (currentCluster.length > 0) {
      clusters.push(currentCluster);
    }

    const positionedEvents: CalendarPositionedEvent[] = [];

    for (const cluster of clusters) {
      const columns: { end: number }[] = [];
      cluster.forEach(evt => {
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
          if (evt.startMinutes >= columns[i].end) {
            evt.col = i;
            columns[i].end = evt.endMinutes;
            placed = true;
            break;
          }
        }
        if (!placed) {
          columns.push({ end: evt.endMinutes });
          evt.col = columns.length - 1;
        }
      });

      const totalCols = columns.length;

      cluster.forEach(evt => {
        evt.totalCols = totalCols;
        evt.width = 100 / totalCols;
        evt.left = evt.col * evt.width;
        evt.overlap = totalCols > 1;
        positionedEvents.push(evt);
      });
    }

    return positionedEvents;
  }

  getEventsForWeekCell(dayDate: Date, hourStr: string): CalendarEvent[] {
    const dateStr = this.formatDate(dayDate);
    const hour = this.parseHour(hourStr);

    return this.events.filter(event => {
      if (event.date !== dateStr) return false;

      const [sh, sm] = event.startTime.split(':').map(Number);
      const [eh, em] = event.endTime.split(':').map(Number);

      const eventStart = sh * 60 + sm;
      const eventEnd = eh * 60 + em;
      const hourStart = hour * 60;
      const hourEnd = hourStart + 60;

      return eventStart < hourEnd && eventEnd > hourStart;
    });
  }

  parseHour(hourStr: string): number {
    const match = hourStr.match(/(\d+):00 (AM|PM)/i);
    if (!match) return 0;

    let hour = parseInt(match[1], 10);
    const period = match[2].toUpperCase();

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour;
  }
  ngOnInit() {
    this.generateYears();
    this.updateMonthHeader();

    this.selectedDate = new Date();

    if (!this.defaultDate) this.defaultDate = new Date();

    this.currentMonth = this.defaultDate.getMonth();
    this.currentYear = this.defaultDate.getFullYear();

    this.generateCalendar();
    this.generateWeekHours();
    this.generateWeekDays();
  }

  @HostListener('document:click')
  handleOutsideClick() {
    this.showMonthDropdown = false;

    if (this.clickedInside) {
      this.clickedInside = false;
      return;
    }

    this.showCalendar = false;
    this.calendarIcon = 'home';
    this.showYearDropdown = false;
    this.calendarClosed.emit();
  }

  get formattedDate(): string {
    if (!this.defaultDate) return '';
    return this.defaultDate.toLocaleDateString('en-GB').replace(/\//g, '-');
  }

  openDatePicker(event: Event) {
    event.preventDefault();
    this.clickedInside = true;

    this.showCalendar = !this.showCalendar;
    this.calendarIcon = this.showCalendar ? 'save' : 'home';

    if (!this.showCalendar) {
      this.showMonthDropdown = false;
      this.showYearDropdown = false;
      this.calendarClosed.emit();
    }
  }

  generateYears() {
    this.years = [];
    for (let i = this.startingYear; i <= this.endingYear; i++) {
      this.years.push(i);
    }
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    const totalDays = 42;

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      this.calendarDays.push({
        date,
        fullDate: this.formatDate(date),
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === this.currentMonth,
        isToday: this.isToday(date) && !this.isSelected(date),
        isSelected: this.isSelected(date)
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.toDateString() === today.toDateString() &&
      (!this.defaultDate || this.defaultDate.toDateString() === today.toDateString())
    );
  }

  isSelected(date: Date): boolean {
    return this.selectedDate
      ? date.toDateString() === this.selectedDate.toDateString()
      : false;
  }

  updateMonthHeader() {
    const month = this.currentDate.toLocaleString('en-US', { month: 'long' });
    const year = this.currentDate.getFullYear();
    this.monthHeader = `${month} ${year}`;
  }

  updateDayHeader() {
    const d = this.weekDays[0].date;
    const month = d.toLocaleString('en-US', { month: 'long' });
    const day = d.getDate();
    const year = d.getFullYear();

    this.displayMonth = `${month} ${day}, ${year}`;
  }
  updateWeekHeader() {
    if (!this.weekDays || this.weekDays.length < 7) return;

    const start = this.weekDays[0].date;
    const end = this.weekDays[6].date;

    const startMonth = start.toLocaleString('en-US', { month: 'short' });
    const endMonth = end.toLocaleString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (startMonth === endMonth && startYear === endYear) {
      this.displayMonth = `${startMonth} ${startDay} - ${endDay}, ${startYear}`;
      return;
    }

    if (startYear === endYear) {
      this.displayMonth = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
      return;
    }

    this.displayMonth = `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
  }

  generateWeekHours() {
    this.hours = [];
    for (let i = 0; i < 24; i++) {
      const hour12 = i % 12 === 0 ? 12 : i % 12;
      const meridiem = i < 12 ? 'AM' : 'PM';
      this.hours.push(`${hour12}:00 ${meridiem}`);
    }
  }

  generateWeekDays() {
    const baseDate = this.defaultDate ? new Date(this.defaultDate) : new Date();
    const start = new Date(baseDate);
    start.setDate(baseDate.getDate() - baseDate.getDay());

    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      this.weekDays.push({
        date: d,
        dayName: d.toLocaleString('en-US', { weekday: 'short' })
      });
    }
  }

  generateDayView() {
    const base = this.defaultDate ? new Date(this.defaultDate) : new Date();

    this.weekDays = [{
      date: base,
      dayName: base.toLocaleString('en-US', { weekday: 'long' })
    }];

    this.generateWeekHours();
  }

  switchToMonth() {
    this.viewMode = 'month';
    this.updateMonthHeader();
    this.generateCalendar();
    this.updateCalendar();
  }

  switchToWeek() {
    this.currentView = 'week';
    this.viewMode = 'week';
    this.generateWeekDays();
    this.generateWeekHours();
    this.updateWeekHeader();
  }

  switchToDay() {
    this.currentView = 'day';
    this.viewMode = 'day';

    const selected = this.defaultDate || this.selectedDate || new Date();
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.weekDays = [
      { dayName: weekdayNames[selected.getDay()], date: selected }
    ];

    this.generateWeekHours();
    this.updateDayHeader();
  }

  previousWeek() {
    if (!this.defaultDate) return;

    const d = new Date(this.defaultDate);
    d.setDate(d.getDate() - 7);

    this.defaultDate = d;
    this.currentDate = d;

    this.currentMonth = d.getMonth();
    this.currentYear = d.getFullYear();

    this.generateWeekDays();
    this.updateWeekHeader();
  }

  nextWeek() {
    if (!this.defaultDate) return;

    const d = new Date(this.defaultDate);
    d.setDate(d.getDate() + 7);

    this.defaultDate = d;
    this.currentDate = d;

    this.currentMonth = d.getMonth();
    this.currentYear = d.getFullYear();

    this.generateWeekDays();
    this.updateWeekHeader();
  }

  goToPrevious() {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        this.currentDate.getDate()
      );

      this.updateMonthHeader();
      this.generateCalendar();
    }

    else if (this.currentView === 'week') {
      this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 7));
    }

    else if (this.currentView === 'day') {
      this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() - 1));
    }

    this.updateCalendar();
  }

  goToNext() {
    if (this.viewMode === 'month') {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        this.currentDate.getDate()
      );

      this.updateMonthHeader();
      this.generateCalendar();
    }

    else if (this.currentView === 'week') {
      this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 7));
    }

    else if (this.currentView === 'day') {
      this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1));
    }

    this.updateCalendar();
  }


  setView(view: 'month' | 'week' | 'day') {
    this.currentView = view;
    this.updateCalendar();
  }

  updateCalendar() {
    this.defaultDate = new Date(this.currentDate);

    if (this.viewMode === 'month') {
      this.currentMonth = this.currentDate.getMonth();
      this.currentYear = this.currentDate.getFullYear();

      this.updateMonthHeader();
      this.generateCalendar();
    }

    if (this.currentView === 'week') {
      this.generateWeekDays();
      this.generateWeekHours();
      this.updateWeekHeader();
      return;
    }

    if (this.currentView === 'day') {
      this.generateDayView();
      this.generateWeekHours();
      this.updateDayHeader();
      return;
    }
  }

  onMonthChange() {
    this.currentMonth = Number(this.currentMonth);
    this.defaultDate = new Date(this.currentYear, this.currentMonth, 1);
    this.generateCalendar();
    this.dateSelected.emit(this.selectedDate);
  }

  onYearChange() {
    this.currentYear = Number(this.currentYear);
    this.defaultDate = new Date(this.currentYear, this.currentMonth, 1);
    this.currentDate = new Date(this.defaultDate);

    if (this.currentView === 'month') {
      this.generateCalendar();
    }
    else if (this.currentView === 'week') {
      this.generateWeekDays();
      this.generateWeekHours();
      this.updateWeekHeader();
    }
    else if (this.currentView === 'day') {
      this.generateDayView();
      this.generateWeekHours();
      this.updateDayHeader();
    }

    this.dateSelected.emit(this.defaultDate);
  }

  selectDate(day: any) {
    this.selectedDate = new Date(day.date);
    this.defaultDate = new Date(day.date);
    this.currentMonth = this.defaultDate.getMonth();
    this.currentYear = this.defaultDate.getFullYear();

    this.generateCalendar();
    this.dateSelected.emit(this.selectedDate);

  }

  goToToday() {
    const today = new Date();
    this.currentDate = new Date(today);
    this.defaultDate = new Date(today);
    this.selectedDate = new Date(today);


    // ---------------- MONTH VIEW ----------------
    if (this.currentView === 'month') {
      this.currentMonth = today.getMonth();
      this.currentYear = today.getFullYear();
      this.generateCalendar();
      this.dateSelected.emit(today);
      return;
    }

    // ---------------- WEEK VIEW ----------------
    if (this.currentView === 'week') {
      this.currentMonth = today.getMonth();
      this.currentYear = today.getFullYear();

      this.generateWeekDays();
      this.generateWeekHours();

      this.selectedWeekCells = {};
      const keyDate = today.toISOString().split("T")[0];

      for (let hour = 0; hour < 24; hour++) {
        const key = `${keyDate}-${hour}`;
        this.selectedWeekCells[key] = true;
      }

      this.updateCalendar();
      this.updateWeekHeader();
      return;
    }

    // ---------------- DAY VIEW ----------------
    if (this.currentView === 'day') {
      this.currentMonth = today.getMonth();
      this.currentYear = today.getFullYear();

      this.generateDayView();
      this.generateWeekHours();

      this.selectedWeekCells = {};
      const keyDate = today.toISOString().split("T")[0];

      for (let hour = 0; hour < 24; hour++) {
        const key = `${keyDate}-${hour}`;
        this.selectedWeekCells[key] = true;
      }

      this.updateDayHeader();
      return;
    }
  }

  get weekRangeLabel(): string {
    if (!this.weekDays || this.weekDays.length === 0) return '';

    const first = this.weekDays[0].date;
    const last = this.weekDays[this.weekDays.length - 1].date;

    const sameMonth = first.getMonth() === last.getMonth();
    const sameYear = first.getFullYear() === last.getFullYear();

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    if (sameMonth && sameYear) {
      return `${first.toLocaleDateString('en-US', options)} ${first.getFullYear()}`;
    }

    return `${first.toLocaleDateString('en-US', options)} - ${last.toLocaleDateString('en-US', options)} ${last.getFullYear()}`;
  }

  get isWeekSpanTwoMonths(): boolean {
    if (!this.weekDays || this.weekDays.length === 0) return false;

    const first = this.weekDays[0].date;
    const last = this.weekDays[this.weekDays.length - 1].date;

    return first.getMonth() !== last.getMonth() || first.getFullYear() !== last.getFullYear();
  }

  formatWeekHeader(start: Date, end: Date): string {
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();

    return startMonth === endMonth
      ? `${startMonth} ${startDay} - ${endDay}`
      : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }

  isWeekCellSelected(date: Date, hour: string): boolean {
    const keyDate = date.toISOString().split("T")[0];
    const slotHour = this.parseHour(hour); // 0-23
    const key = `${keyDate}-${slotHour}`;
    return !!this.selectedWeekCells[key];
  }

  clearSelection() {
    this.defaultDate = null;
    this.generateCalendar();
    this.dateSelected.emit(null);
  }

  closeCalendar() {
    this.showCalendar = false;
    this.calendarIcon = 'home';
    this.calendarClosed.emit();
  }

  closeMonthDropdown() {
    this.showMonthDropdown = false;
  }

  closeYearDropdown() {
    this.showYearDropdown = false;
  }

  toggleMonthDropdown() {
    this.showMonthDropdown = !this.showMonthDropdown;
    this.showYearDropdown = false;

    if (this.showMonthDropdown) {
      setTimeout(() => {
        const monthDropdown = document.querySelectorAll('.dropdown')[0] as HTMLElement;
        if (!monthDropdown) return;

        const list = monthDropdown.querySelector('.dropdown-list') as HTMLElement;
        if (!list) return;

        const selected = list.querySelector('li.selected') as HTMLElement;
        if (!selected) return;

        list.scrollTop = selected.offsetTop;
      }, 0);
    }
  }

  toggleYearDropdown() {
    this.showYearDropdown = !this.showYearDropdown;
    this.showMonthDropdown = false;

    if (this.showYearDropdown) {
      setTimeout(() => {
        const yearDropdown = document.querySelectorAll('.dropdown')[1] as HTMLElement;
        if (!yearDropdown) return;

        const list = yearDropdown.querySelector('.dropdown-list') as HTMLElement;
        if (!list) return;

        const selected = list.querySelector('li.selected') as HTMLElement;
        if (!selected) return;

        list.scrollTop = selected.offsetTop;
      }, 0);
    }
  }

  selectMonth(index: number) {
    this.currentMonth = index;
    this.showMonthDropdown = false;
    this.onMonthChange();
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.showYearDropdown = false;
    this.onYearChange();
  }

  scrollSelectedIntoView(selector: string) {
    setTimeout(() => {
      const selectedElement = document.querySelector(selector);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 0);
  }

  onWheel(event: WheelEvent) {
    event.stopPropagation();
  }

  onViewModeButtonClick(event: { labelId: number }) {
    switch (event.labelId) {
      case 1:
        this.switchToMonth();
        break;

      case 2:
        this.switchToWeek();
        break;

      case 3:
        this.switchToDay();
        break;
    }
  }

  onNavigationButtonClick(event: { labelId: number }) {
    switch (event.labelId) {
      case 1:
        this.goToPrevious();
        break;

      case 2:
        this.goToNext();
        break;
    }
  }
}
