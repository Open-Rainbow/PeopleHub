import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'organization-context-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      organization-context works!
    </p>
  `,
  styles: ``
})
export class OrganizationContextComponent {

}

