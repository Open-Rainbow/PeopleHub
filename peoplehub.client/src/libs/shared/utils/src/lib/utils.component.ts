import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'utils-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      utils works!
    </p>
  `,
  styles: ``
})
export class UtilsComponent {

}

