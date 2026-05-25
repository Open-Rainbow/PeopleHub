import { TestBed } from '@angular/core/testing';

import { ThemeTokensService } from './theme-tokens.service';

describe('ThemeTokensService', () => {
  let service: ThemeTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeTokensService);
    localStorage.removeItem('theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and persist theme', () => {
    service.setTheme('dark');

    expect(service.getTheme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should toggle theme', () => {
    service.setTheme('light');

    const next = service.toggleTheme();

    expect(next).toBe('dark');
    expect(service.getTheme()).toBe('dark');
  });
});
