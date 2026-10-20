import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChipComponent, TextBoxComponent, TextAreaComponent, DropdownComponent, CalendarComponent, TextButtonComponent, IconComponent } from 'ui';
import { HolidayList } from 'common';

interface ProcessedHoliday extends HolidayList {
  holidayMonth: string;
  holidayDay: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'holidays-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ChipComponent, TextBoxComponent, TextAreaComponent, DropdownComponent, CalendarComponent, TextButtonComponent, IconComponent],
  templateUrl: './holidays.component.html',
})
export class HolidaysComponent implements OnInit {
  private fb = inject(FormBuilder);

  showForm = false;
  holidayForm!: FormGroup;

  /** `tone` is a theme token; the tile tints itself from it, so light/dark both work. */
  holidayStatistics = [
    { name: 'Total Holidays', number: 12, tone: 'var(--color-primary)' },
    { name: 'Federal Holidays', number: 8, tone: 'var(--color-success)' },
    { name: 'Company Holidays', number: 4, tone: 'var(--color-warning)' },
    { name: 'Upcoming', number: 3, tone: 'var(--color-danger)' },
  ];

  holidayTypeOptions = [
    { value: 1, name: 'National Holiday' },
    { value: 2, name: 'Federal Holiday' },
    { value: 3, name: 'Company Holiday' },
    { value: 4, name: 'Optional Holiday' },
  ];

  holidays: HolidayList[] = [
    { holidayMonth: 'DEC', holidayDate: 25, holidayName: 'Christmas', holidayCalendar: '2025-12-25', holidayType: 'National Holiday', holidayClassification: 'Fixed' },
    { holidayMonth: 'JAN', holidayDate: 1, holidayName: 'New Year\'s Day', holidayCalendar: '2026-01-01', holidayType: 'National Holiday', holidayClassification: 'Fixed' },
    { holidayMonth: 'JAN', holidayDate: 26, holidayName: 'Republic Day', holidayCalendar: '2026-01-26', holidayType: 'Federal Holiday', holidayClassification: 'Fixed' },
  ];

  processedHolidays: ProcessedHoliday[] = [];

  ngOnInit(): void {
    this.initForm();
    this.processHolidayData();
  }

  private initForm(): void {
    this.holidayForm = this.fb.group({
      holidayName: ['', [Validators.required, Validators.maxLength(100)]],
      holidayDate: ['', Validators.required],
      holidayType: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    });
  }

  private processHolidayData(): void {
    this.processedHolidays = this.holidays.map(holiday => {
      try {
        const date = new Date(holiday.holidayCalendar);
        if (isNaN(date.getTime())) {
          return { ...holiday, holidayMonth: 'N/A', holidayDay: 0 };
        }
        return {
          ...holiday,
          holidayMonth: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
          holidayDay: date.getDate(),
        };
      } catch {
        return { ...holiday, holidayMonth: 'ERR', holidayDay: 0 };
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.clearForm();
    }
  }

  clearForm(): void {
    this.holidayForm.reset();
  }

  saveHoliday(): void {
    if (this.holidayForm.valid) {
      const val = this.holidayForm.value;
      this.holidays = [...this.holidays, {
        holidayMonth: '',
        holidayDate: 0,
        holidayName: val.holidayName,
        holidayCalendar: val.holidayDate,
        holidayType: this.holidayTypeOptions.find(x => x.value === val.holidayType)?.name ?? 'Optional Holiday',
        holidayClassification: 'Fixed',
      }];
      this.processHolidayData();
      this.showForm = false;
      this.clearForm();
    }
  }
}
