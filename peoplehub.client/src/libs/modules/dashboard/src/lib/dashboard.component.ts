import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dashboard-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      dashboard works!
    </p>
  `,
  styles: ``
})
export class DashboardComponent {

}

