import { TestBed } from '@angular/core/testing';

import { ThemeTokensService } from './theme-tokens.service';

describe('ThemeTokensService', () => {
  let service: ThemeTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
