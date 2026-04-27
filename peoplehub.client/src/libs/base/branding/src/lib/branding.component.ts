import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'branding-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      branding works!
    </p>
  `,
  styles: ``
})
export class BrandingComponent {

}

