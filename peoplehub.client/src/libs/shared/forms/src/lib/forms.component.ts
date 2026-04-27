import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'forms-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      forms works!
    </p>
  `,
  styles: ``
})
export class FormsComponent {

}

