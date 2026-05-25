import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HolidayListComponent, HolidaysComponent } from 'holidays';

@Component({
  selector: 'add-holiday-list-root',
  standalone: true,
  imports: [HolidaysComponent, HolidayListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-holiday-list.component.html',
})
export class AddHolidayListComponent {}
