import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'ui';
import { HolidayList } from 'common';

@Component({
  selector: 'holiday-list-root',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './holiday-list.component.html',
})
export class HolidayListComponent {
  holidays: HolidayList[] = [
    { holidayMonth: 'DEC', holidayDate: 25, holidayName: 'Christmas', holidayType: 'National Holiday', holidayClassification: 'Fixed', holidayCalendar: '25-12-2025' },
    { holidayMonth: 'JAN', holidayDate: 1, holidayName: 'New Year', holidayType: 'National Holiday', holidayClassification: 'Fixed', holidayCalendar: '01-01-2026' },
    { holidayMonth: 'JAN', holidayDate: 26, holidayName: 'Republic Day', holidayType: 'Federal Holiday', holidayClassification: 'Fixed', holidayCalendar: '26-01-2026' },
  ];
}



