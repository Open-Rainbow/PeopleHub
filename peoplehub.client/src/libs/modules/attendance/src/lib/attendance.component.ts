import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'attendance-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      attendance works!
    </p>
  `,
  styles: ``
})
export class AttendanceComponent {

}

