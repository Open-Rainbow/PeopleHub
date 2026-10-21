import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

/** Gap between the field and the picker, and the minimum distance from the screen edge (px). */
const POPUP_GAP = 6;
const SCREEN_MARGIN = 8;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() label?: string = 'Date of Birth';
  @Input() isRequired?: boolean = true;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() placeholder?: string = 'Select Gender';
  @Output() dateSelected = new EventEmitter<string | null>();
  @Output() calendarClosed = new EventEmitter<void>();

  private readonly eRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly document = inject(DOCUMENT);

  isLabelFloating: boolean = false;

  showCalendar = false;
  /** Fixed position of the picker (it floats over the page, so scroll containers never grow or clip). */
  popupStyle: Record<string, string> = { visibility: 'hidden' };
  openUp = false;
  currentDate = new Date();
  calendarDays: any[] = [];
  weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  years: number[] = [];
  showMonthDropdown: boolean = false;
  showYearDropdown: boolean = false;

  selectedDate: Date | null = null;

  get formattedDate(): string {
    return this.selectedDate
      ? this.selectedDate.toLocaleDateString('en-GB').replace(/\//g, '-')
      : '';
  }

  get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

  private onChange = (_value: string | null) => {};
  private onTouched = () => {};
  private disabled = false;

  /**
   * Outside-click check in the capture phase, so it also works inside drawers / dialogs
   * that stop click bubbling.
   */
  private readonly onDocumentClick = (event: Event): void => {
    if (!this.showCalendar) return;
    const target = event.target as Node | null;
    if (target && this.eRef.nativeElement.contains(target)) return;
    this.closeCalendar();
    this.cdr.markForCheck();
  };

  /** Keep the picker next to the field while the page or a panel scrolls / resizes. */
  private readonly onViewportChange = (): void => {
    if (this.showCalendar) this.positionPopup();
  };

  ngOnInit() {
    this.generateYears();
    this.generateCalendar();
    const value = this.control?.value;
    if (value) {
      this.setDateFromValue(value);
    }
    this.document.addEventListener('click', this.onDocumentClick, true);
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('click', this.onDocumentClick, true);
    this.stopTracking();
  }

  private setDateFromValue(value: string | Date) {
    if (!value) return;

    if (value instanceof Date) {
      this.selectedDate = value;
    } else if (typeof value === 'string') {
      const parts = value.split('-');
      if (parts.length === 3) {
        this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      }
    }

    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.isLabelFloating = true;
    }

    this.generateCalendar();
  }

  writeValue(value: any): void {
    if (!value) {
      this.selectedDate = null;
      this.isLabelFloating = false;
      this.generateCalendar();
      this.cdr.markForCheck();
      return;
    }

    if (value instanceof Date) {
      this.selectedDate = value;
    } else if (typeof value === 'string') {
      const parts = value.split('-');
      if (parts.length === 3 && parts[0].length <= 2) {
        // dd-mm-yyyy (the format this control writes)
        this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      } else if (!isNaN(Date.parse(value))) {
        this.selectedDate = new Date(value);
      }
    }

    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.isLabelFloating = true;
    }

    this.generateCalendar();
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    this.onTouched();
  }

  openDatePicker(event: Event) {
    event.preventDefault();
    if (this.disabled) return;

    if (this.showCalendar) {
      this.closeCalendar();
      this.markAsTouched();
      return;
    }

    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
    } else {
      const today = new Date();
      this.currentMonth = today.getMonth();
      this.currentYear = today.getFullYear();
    }

    this.generateCalendar();
    this.isLabelFloating = true;
    this.popupStyle = { visibility: 'hidden', top: '0px', left: '0px' };
    this.showCalendar = true;
    this.startTracking();
    // Measure after the picker is rendered, then place it.
    setTimeout(() => this.positionPopup(), 0);
    this.markAsTouched();
  }

  selectDate(day: any) {
    this.selectedDate = new Date(day.date);
    this.currentMonth = this.selectedDate.getMonth();
    this.currentYear = this.selectedDate.getFullYear();
    this.generateCalendar();

    this.isLabelFloating = true;

    const formatted = this.toDDMMYYYY(this.selectedDate);

    this.dateSelected.emit(formatted);
    this.onChange(formatted);
    this.control?.setValue(formatted);
    this.markAsTouched();
    this.closeCalendar();
  }

  private toDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  clearSelection() {
    this.selectedDate = null;

    this.control?.setValue(null);
    this.control?.markAsTouched();
    this.control?.markAsDirty();
    this.generateCalendar();

    this.dateSelected.emit(null);
    this.onChange(null);
  }

  closeCalendar() {
    const wasOpen = this.showCalendar;
    this.showCalendar = false;
    this.showMonthDropdown = false;
    this.showYearDropdown = false;
    this.stopTracking();

    if (!this.selectedDate) {
      this.isLabelFloating = false;
    }

    if (wasOpen) this.calendarClosed.emit();
  }

  // ---- Floating position ---------------------------------------------------------------------

  private startTracking(): void {
    const view = this.document.defaultView;
    view?.addEventListener('scroll', this.onViewportChange, true);
    view?.addEventListener('resize', this.onViewportChange);
  }

  private stopTracking(): void {
    const view = this.document.defaultView;
    view?.removeEventListener('scroll', this.onViewportChange, true);
    view?.removeEventListener('resize', this.onViewportChange);
  }

  /** Places the picker under the field, or above it when there is no room below; keeps it on screen. */
  private positionPopup(): void {
    if (!this.showCalendar) return;
    const view = this.document.defaultView;
    const box = this.eRef.nativeElement.querySelector('.ui-field__box') as HTMLElement | null;
    const popup = this.eRef.nativeElement.querySelector('.calendar-popup') as HTMLElement | null;
    if (!view || !box) return;

    const r = box.getBoundingClientRect();
    const vh = view.innerHeight;
    const vw = view.innerWidth;

    // The field scrolled out of sight (e.g. inside a panel): close instead of floating alone.
    if (r.bottom < 0 || r.top > vh) {
      this.closeCalendar();
      this.cdr.markForCheck();
      return;
    }

    const height = popup?.offsetHeight || 360;
    const width = Math.max(popup?.offsetWidth || 288, r.width);
    const spaceBelow = vh - r.bottom - POPUP_GAP - SCREEN_MARGIN;
    const spaceAbove = r.top - POPUP_GAP - SCREEN_MARGIN;
    this.openUp = spaceBelow < height && spaceAbove > spaceBelow;

    let top = this.openUp ? r.top - POPUP_GAP - height : r.bottom + POPUP_GAP;
    top = Math.max(SCREEN_MARGIN, Math.min(top, vh - height - SCREEN_MARGIN));
    let left = Math.min(r.left, vw - width - SCREEN_MARGIN);
    left = Math.max(SCREEN_MARGIN, left);

    this.popupStyle = {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      minWidth: `${Math.round(Math.min(r.width, vw - 2 * SCREEN_MARGIN))}px`,
      maxWidth: `${vw - 2 * SCREEN_MARGIN}px`,
    };
    this.cdr.markForCheck();
  }

  // ---- Calendar ------------------------------------------------------------------------------

  generateYears() {
    this.years = [];
    const startYear = 1950;
    const endYear = 2050;
    for (let i = startYear; i <= endYear; i++) {
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

      const isCurrentMonth = date.getMonth() === this.currentMonth;
      const isSelected = this.isSelected(date);
      const isToday = this.isToday(date) && !isSelected;

      this.calendarDays.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected
      });
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.toDateString() === today.toDateString() &&
      (!this.selectedDate || this.selectedDate.toDateString() !== today.toDateString())
    );
  }

  isSelected(date: Date): boolean {
    return this.selectedDate
      ? date.toDateString() === this.selectedDate.toDateString()
      : false;
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  toggleMonthDropdown() {
    this.showMonthDropdown = !this.showMonthDropdown;
    this.showYearDropdown = false;
    if (this.showMonthDropdown) this.scrollToSelected('.month-selector');
  }

  toggleYearDropdown() {
    this.showYearDropdown = !this.showYearDropdown;
    this.showMonthDropdown = false;
    if (this.showYearDropdown) this.scrollToSelected('.year-selector');
  }

  /** Scrolls the open month / year list (of this calendar only) to the selected item. */
  private scrollToSelected(selector: string): void {
    setTimeout(() => {
      const list = this.eRef.nativeElement.querySelector(`${selector} .dropdown`) as HTMLElement | null;
      const selected = list?.querySelector('li.selected') as HTMLElement | null;
      if (list && selected) list.scrollTop = Math.max(0, selected.offsetTop - list.clientHeight / 2 + selected.offsetHeight / 2);
    }, 0);
  }

  selectMonth(index: number) {
    this.currentMonth = index;
    this.showMonthDropdown = false;
    this.defaultDateChanged();
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.showYearDropdown = false;
    this.defaultDateChanged();
  }

  defaultDateChanged() {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, 1);
    this.generateCalendar();
    const formatted = this.toDDMMYYYY(this.selectedDate);
    this.dateSelected.emit(formatted);
    this.onChange(formatted);
  }

  goToToday() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.selectedDate = today;
    this.generateCalendar();

    const formatted = this.toDDMMYYYY(this.selectedDate);
    this.dateSelected.emit(formatted);
    this.onChange(formatted);
  }

  closeMonthDropdown() {
    this.showMonthDropdown = false;
  }

  closeYearDropdown() {
    this.showYearDropdown = false;
  }
}
