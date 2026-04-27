import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'holidays-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      holidays works!
    </p>
  `,
  styles: ``
})
export class HolidaysComponent {

}

