import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../primitives/icon/icon.component';

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
export class CalendarComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string = 'Date of Birth';
  @Input() isRequired?: boolean = true;
  @Input() parentFormGroup!: FormGroup;
  @Input() id!: string;
  @Input() placeholder?: string = 'Select Gender';
  @Output() dateSelected = new EventEmitter<string | null>();
  @Output() calendarClosed = new EventEmitter<void>();


  isLabelFloating: boolean = false;


  constructor() {}

  showCalendar = false;
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
  clickedInside: boolean = false;

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


  @HostListener('document:click')
  handleOutsideClick() {
    this.showMonthDropdown = false;

    if (this.clickedInside) {
      this.clickedInside = false;
      return;
    }

    this.showCalendar = false;


    if (!this.selectedDate) {
      this.isLabelFloating = false;

    }

    this.calendarClosed.emit();
  }


  ngOnInit() {
    this.generateYears();
    this.generateCalendar();
    const value = this.control?.value;
    if (value) {
      this.setDateFromValue(value);
    }
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
      return;
    }

    if (value instanceof Date) {
      this.selectedDate = value;
    }
    else if (typeof value === 'string') {
      if (!isNaN(Date.parse(value))) {
        this.selectedDate = new Date(value);
      }
      else {
        const parts = value.split('-');
        if (parts.length === 3) {
          this.selectedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);
        }
      }
    }

    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.isLabelFloating = true;
    }

    this.generateCalendar();
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
    this.clickedInside = true;
    this.showCalendar = !this.showCalendar;

    if (this.showCalendar) {
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

    } else {

      if (!this.selectedDate) {
        this.isLabelFloating = false;

      }
    }

    this.markAsTouched();
  }

  selectDate(day: any) {
    this.selectedDate = new Date(day.date);
    this.currentMonth = this.selectedDate.getMonth();
    this.currentYear = this.selectedDate.getFullYear();
    this.generateCalendar();


    this.isLabelFloating = true;

    const dateString = this.formattedDate;
    console.log(dateString);


    const formatted = this.toDDMMYYYY(this.selectedDate);

    this.dateSelected.emit(formatted);
    console.log(formatted);
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
    this.showCalendar = false;

    if (!this.selectedDate) {
      this.isLabelFloating = false;

    }

    this.calendarClosed.emit();
  }


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

    if (this.showMonthDropdown) {
      setTimeout(() => {
        const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
        const monthDropdown = dropdowns[0] as HTMLElement | undefined;
        if (!monthDropdown) return;
        const list = monthDropdown.querySelector('.dropdown-list') as HTMLElement | null;
        if (!list) return;
        const selected = list.querySelector('li.selected') as HTMLElement | null;
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
        const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
        const yearDropdown = dropdowns[1] as HTMLElement | undefined;
        if (!yearDropdown) return;
        const list = yearDropdown.querySelector('.dropdown-list') as HTMLElement | null;
        if (!list) return;
        const selected = list.querySelector('li.selected') as HTMLElement | null;
        if (!selected) return;
        list.scrollTop = selected.offsetTop;
      }, 0);
    }
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

