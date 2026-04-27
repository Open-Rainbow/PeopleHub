import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'super-admin-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      super-admin works!
    </p>
  `,
  styles: ``
})
export class SuperAdminComponent {

}

