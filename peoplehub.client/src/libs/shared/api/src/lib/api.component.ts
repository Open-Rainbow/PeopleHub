import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'api-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      api works!
    </p>
  `,
  styles: ``
})
export class ApiComponent {

}

