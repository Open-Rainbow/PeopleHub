import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'auth-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      auth works!
    </p>
  `,
  styles: ``
})
export class AuthComponent {

}

