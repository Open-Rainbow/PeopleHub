import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'feature-flags-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      feature-flags works!
    </p>
  `,
  styles: ``
})
export class FeatureFlagsComponent {

}

