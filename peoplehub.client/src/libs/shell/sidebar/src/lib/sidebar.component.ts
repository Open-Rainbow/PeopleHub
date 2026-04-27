import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sidebar-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      sidebar works!
    </p>
  `,
  styles: ``
})
export class SidebarComponent {

}

