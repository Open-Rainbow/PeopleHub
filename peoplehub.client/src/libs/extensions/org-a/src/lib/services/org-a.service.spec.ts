import { TestBed } from '@angular/core/testing';

import { OrgAService } from './org-a.service';

describe('OrgAService', () => {
  let service: OrgAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
