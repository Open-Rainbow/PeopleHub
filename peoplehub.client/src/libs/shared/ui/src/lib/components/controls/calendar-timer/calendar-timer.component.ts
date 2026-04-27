import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from '../calendar/calendar.component';
import { TimepickerComponent } from '../timepicker/timepicker.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ui-calendar-timer',
    templateUrl: './calendar-timer.component.html',
    styleUrls: ['./calendar-timer.component.scss'],
  standalone: true,
  imports: [CalendarComponent, TimepickerComponent, ReactiveFormsModule]
})
export class CalendarTimerComponent {
    @Input() parentFormGroup!:FormGroup;
    @Input() id!:string;

    get control() {
    return this.parentFormGroup?.get(this.id);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control?.dirty || this.control?.touched);
  }

}
