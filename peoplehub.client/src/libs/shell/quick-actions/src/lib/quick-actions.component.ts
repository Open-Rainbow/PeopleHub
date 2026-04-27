import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'quick-actions-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      quick-actions works!
    </p>
  `,
  styles: ``
})
export class QuickActionsComponent {

}

