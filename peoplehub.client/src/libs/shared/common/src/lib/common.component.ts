import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'common-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      common works!
    </p>
  `,
  styles: ``
})
export class CommonComponent {

}

