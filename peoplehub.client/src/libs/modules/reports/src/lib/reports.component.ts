import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'reports-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      reports works!
    </p>
  `,
  styles: ``
})
export class ReportsComponent {

}

