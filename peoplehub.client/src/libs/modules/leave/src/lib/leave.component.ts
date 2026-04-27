import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leave-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      leave works!
    </p>
  `,
  styles: ``
})
export class LeaveComponent {

}

