import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'org-a-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      org-a works!
    </p>
  `,
  styles: ``
})
export class OrgAComponent {

}

