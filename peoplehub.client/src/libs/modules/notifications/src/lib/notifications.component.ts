import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'notifications-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      notifications works!
    </p>
  `,
  styles: ``
})
export class NotificationsComponent {

}

