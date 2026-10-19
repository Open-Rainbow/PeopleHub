import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LEAVE_POLICY_API, LeavePolicyService } from './leave-policy.service';

describe('LeavePolicyService', () => {
  let service: LeavePolicyService;
  let http: HttpTestingController;
  const year = new Date().getFullYear();

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(LeavePolicyService);
    http = TestBed.inject(HttpTestingController);
  });

  const flushError = async (status = 0) => {
    await Promise.resolve();
    http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status }));
  };

  it('falls back to demo data when the API is unreachable', async () => {
    const pending = service.current(year, 'Full Time');
    await flushError();
    const policy = await pending;
    expect(service.isOnline()).toBe(false);
    expect(policy.status).toBe('Published');
  });

  it('uses the API when it answers', async () => {
    const pending = service.current(year, 'Contract');
    await Promise.resolve();
    http.expectOne((r) => r.url.startsWith(`${LEAVE_POLICY_API}/current`)).flush({
      year, employmentType: 'Contract', status: 'None', hasPublished: false,
      items: [{ code: 'earned', label: 'Earned Leave', annualAllowance: 12, isPaid: true }], publishedItems: [],
    });
    const policy = await pending;
    expect(service.isOnline()).toBe(true);
    expect(policy.items[0].annualAllowance).toBe(12);
  });

  it('surfaces server validation errors once online', async () => {
    const first = service.current(year, 'Contract');
    await Promise.resolve();
    http.expectOne(() => true).flush({ year, employmentType: 'Contract', status: 'None', items: [], publishedItems: [] });
    await first;

    const save = service.saveDraft(year, 'Contract', []);
    await Promise.resolve();
    http.expectOne(`${LEAVE_POLICY_API}/draft`).flush(
      { title: 'Validation failed', errors: { items: ['Add at least one leave type.'] } },
      { status: 400, statusText: 'Bad Request' },
    );
    await expect(save).rejects.toThrow('Add at least one leave type.');
    expect(service.lastError()).toBe('Add at least one leave type.');
  });

  it('offline: copy creates next-year drafts and skips existing ones', async () => {
    const probe = service.employmentTypes();
    await flushError();
    await probe;

    const first = await service.copy(year, year + 1, null);
    expect(first.created).toBe(2);
    const again = await service.copy(year, year + 1, null);
    expect(again.created).toBe(0);
    const draft = await service.current(year + 1, 'Full Time');
    expect(draft.status).toBe('Draft');
  });
});
