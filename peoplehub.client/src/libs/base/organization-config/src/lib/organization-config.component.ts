import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'organization-config-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      organization-config works!
    </p>
  `,
  styles: ``
})
export class OrganizationConfigComponent {

}

