import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'theme-tokens-root',
  standalone: true,
  imports: [],
  templateUrl: './theme-tokens.component.html',
  styleUrls: ['./theme-tokens.component.scss'],
})
export class ThemeTokensComponent {

}

