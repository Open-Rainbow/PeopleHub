import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'employees-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      employees works!
    </p>
  `,
  styles: ``
})
export class EmployeesComponent {

}

