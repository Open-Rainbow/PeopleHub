import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pipes-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      pipes works!
    </p>
  `,
  styles: ``
})
export class PipesComponent {

}

