import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeTokensService {
  private readonly storageKey = 'theme';
  private readonly themeSubject = new BehaviorSubject<AppTheme>('light');

  readonly theme$: Observable<AppTheme> = this.themeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  initTheme(): AppTheme {
    const storedTheme = this.readStoredTheme();
    const initialTheme = storedTheme ?? this.getSystemTheme();

    this.applyTheme(initialTheme);
    return initialTheme;
  }

  setTheme(theme: AppTheme): void {
    this.applyTheme(theme);
  }

  toggleTheme(): AppTheme {
    const nextTheme: AppTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    return nextTheme;
  }

  getTheme(): AppTheme {
    return this.themeSubject.value;
  }

  private applyTheme(theme: AppTheme): void {
    const root = this.document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('color-scheme', theme);

    localStorage.setItem(this.storageKey, theme);
    this.themeSubject.next(theme);
  }

  private readStoredTheme(): AppTheme | null {
    const storedTheme = localStorage.getItem(this.storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return null;
  }

  private getSystemTheme(): AppTheme {
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }
}
