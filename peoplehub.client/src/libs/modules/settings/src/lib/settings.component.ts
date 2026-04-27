import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'settings-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      settings works!
    </p>
  `,
  styles: ``
})
export class SettingsComponent {

}

