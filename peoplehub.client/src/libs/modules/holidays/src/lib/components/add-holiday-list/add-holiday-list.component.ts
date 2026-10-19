import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HolidayListComponent } from '../holiday-list/holiday-list.component';

/** HR / admin holiday calendar: same page as employees see, with add / edit / delete. */
@Component({
  selector: 'add-holiday-list-root',
  standalone: true,
  imports: [HolidayListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-holiday-list.component.html',
})
export class AddHolidayListComponent {}
