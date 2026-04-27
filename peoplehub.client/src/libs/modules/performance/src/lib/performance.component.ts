import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'performance-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      performance works!
    </p>
  `,
  styles: ``
})
export class PerformanceComponent {

}

