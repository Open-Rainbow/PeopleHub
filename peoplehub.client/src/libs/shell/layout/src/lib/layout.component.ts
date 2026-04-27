import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      layout works!
    </p>
  `,
  styles: ``
})
export class LayoutComponent {

}

