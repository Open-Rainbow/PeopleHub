import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'navigation-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      navigation works!
    </p>
  `,
  styles: ``
})
export class NavigationComponent {

}

