import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ui-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      ui works!
    </p>
  `,
  styles: ``
})
export class UiComponent {

}

