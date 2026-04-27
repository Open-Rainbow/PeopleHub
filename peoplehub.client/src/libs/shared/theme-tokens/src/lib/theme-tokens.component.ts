import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'theme-tokens-root',
  standalone: true,
  imports: [],
  template: `
    <p>
      theme-tokens works!
    </p>
  `,
  styles: ``
})
export class ThemeTokensComponent {

}

