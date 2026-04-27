import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'directives-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      directives works!
    </p>
  `,
  styles: ``
})
export class DirectivesComponent {

}

