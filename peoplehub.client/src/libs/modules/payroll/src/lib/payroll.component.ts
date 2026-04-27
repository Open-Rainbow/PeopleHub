import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'payroll-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      payroll works!
    </p>
  `,
  styles: ``
})
export class PayrollComponent {

}

