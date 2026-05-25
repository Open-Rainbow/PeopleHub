import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppTheme, ThemeTokensService } from './services/theme-tokens.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'theme-tokens-root',
  standalone: true,
  imports: [],
  templateUrl: './theme-tokens.component.html',
  styleUrls: ['./theme-tokens.component.scss'],
})
export class ThemeTokensComponent {
  currentTheme: AppTheme;

  constructor(private readonly themeTokensService: ThemeTokensService) {
    this.currentTheme = this.themeTokensService.initTheme();
  }

  setTheme(theme: AppTheme): void {
    this.themeTokensService.setTheme(theme);
    this.currentTheme = theme;
  }

  toggleTheme(): void {
    this.currentTheme = this.themeTokensService.toggleTheme();
  }

}

