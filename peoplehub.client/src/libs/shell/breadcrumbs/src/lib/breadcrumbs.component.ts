import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'breadcrumbs-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      breadcrumbs works!
    </p>
  `,
  styles: ``
})
export class BreadcrumbsComponent {

}

