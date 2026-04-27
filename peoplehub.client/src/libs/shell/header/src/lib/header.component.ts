import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'header-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      header works!
    </p>
  `,
  styles: ``
})
export class HeaderComponent {

}

