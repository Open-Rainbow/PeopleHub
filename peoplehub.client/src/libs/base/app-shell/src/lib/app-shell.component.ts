import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shell-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      app-shell works!
    </p>
  `,
  styles: ``
})
export class AppShellComponent {

}

