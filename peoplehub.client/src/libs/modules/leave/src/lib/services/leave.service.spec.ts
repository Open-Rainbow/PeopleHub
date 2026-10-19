import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LEAVE_API, LeaveService } from './leave.service';
import { LeaveDraft } from '../models/leave-request.model';
import { addDaysIso, fromIso, todayIso, workingDays } from '../utils/leave-date.utils';

/** Next Monday on or after `offset` days from today, so tests never land on a weekend. */
function monday(offset = 7): string {
  let iso = addDaysIso(todayIso(), offset);
  while (fromIso(iso)!.getDay() !== 1) iso = addDaysIso(iso, 1);
  return iso;
}

describe('LeaveService', () => {
  let service: LeaveService;
  let http: HttpTestingController;

  const draft = (overrides: Partial<LeaveDraft> = {}): LeaveDraft => ({
    type: 'earned',
    fromDate: monday(60),
    toDate: monday(60),
    dayPart: 'full',
    reason: 'Family trip',
    ...overrides,
  });

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LeaveService);
    http = TestBed.inject(HttpTestingController);
  });

  it('seeds demo requests and balances', () => {
    expect(service.requests().length).toBeGreaterThan(0);
    expect(service.balances().length).toBe(5);
  });

  it('counts working days only', () => {
    const mon = monday();
    expect(workingDays(mon, addDaysIso(mon, 6))).toBeLessThanOrEqual(5);
    expect(workingDays(mon, mon, 'first-half')).toBeLessThanOrEqual(0.5);
  });

  it('rejects past dates, reversed ranges and short reasons', () => {
    expect(service.validate(draft({ fromDate: addDaysIso(todayIso(), -3), toDate: todayIso() })).fromDate).toBeTruthy();
    expect(service.validate(draft({ toDate: addDaysIso(monday(60), -3) })).toDate).toBeTruthy();
    expect(service.validate(draft({ reason: 'abc' })).reason).toBeTruthy();
  });

  it('allows sick leave to be backdated', () => {
    const errors = service.validate(draft({ type: 'sick', fromDate: addDaysIso(todayIso(), -2), toDate: addDaysIso(todayIso(), -2) }));
    expect(errors.fromDate).toBeUndefined();
  });

  it('blocks requests beyond the limits and overlapping requests', () => {
    const tooLong = service.validate(draft({ type: 'comp-off', toDate: addDaysIso(monday(60), 3) }));
    expect(tooLong.toDate || tooLong.balance).toBeTruthy();

    const first = service.apply(draft());
    expect(first.request?.status).toBe('Pending');
    expect(service.apply(draft()).errors?.overlap).toBeTruthy();
  });

  it('withdraws a pending request and frees the balance', () => {
    const before = service.balanceOf('earned').available!;
    const { request } = service.apply(draft());
    expect(service.balanceOf('earned').available).toBe(before - request!.days);

    service.cancel(request!.id);
    expect(service.requests().find((r) => r.id === request!.id)?.status).toBe('Cancelled');
    expect(service.balanceOf('earned').available).toBe(before);
  });

  it('uses server types, holidays and requests once the API answers', () => {
    service.refresh();
    const year = Number(todayIso().slice(0, 4));
    http.expectOne(`${LEAVE_API}/types`).flush([
      { code: 'earned', label: 'Earned Leave', shortCode: 'EL', annualEntitlement: 20, backdateDays: 0, maxConsecutive: 15 },
    ]);
    http.expectOne(`${LEAVE_API}/holidays?year=${year}`).flush([{ date: `${year}-12-31T00:00:00`, name: 'Year end', isOptional: false }]);
    http.expectOne(`${LEAVE_API}/holidays?year=${year + 1}`).flush([]);
    http.expectOne((req) => req.url.startsWith(`${LEAVE_API}/requests`)).flush([
      { id: 50, leaveType: 'earned', fromDate: `${year}-01-05T00:00:00`, toDate: `${year}-01-06T00:00:00`, dayPart: 'full', days: 2, reason: 'Trip', status: 'Approved', appliedAt: `${year}-01-01T00:00:00` },
    ]);

    expect(service.isOnline()).toBe(true);
    expect(service.requests().map((r) => r.id)).toEqual([50]);
    expect(service.balanceOf('earned').available).toBe(18);
    expect(service.holidays()[`${year}-12-31`]).toBe('Year end');
  });

  it('posts new requests and swaps in the server copy', () => {
    service.refresh();
    const year = Number(todayIso().slice(0, 4));
    http.expectOne(`${LEAVE_API}/types`).flush([]);
    http.expectOne(`${LEAVE_API}/holidays?year=${year}`).flush([]);
    http.expectOne(`${LEAVE_API}/holidays?year=${year + 1}`).flush([]);
    http.expectOne((req) => req.url.startsWith(`${LEAVE_API}/requests`)).flush([]);

    const { request } = service.apply(draft());
    const post = http.expectOne((req) => req.method === 'POST' && req.url === `${LEAVE_API}/requests`);
    expect(post.request.body.leaveType).toBe('earned');
    post.flush({ id: 77, leaveType: 'earned', fromDate: request!.fromDate, toDate: request!.toDate, days: 1, reason: 'Family trip', status: 'Pending' });

    expect(service.requests().some((r) => r.id === request!.id)).toBe(false);
    expect(service.requests().find((r) => r.id === 77)?.status).toBe('Pending');

    service.cancel(77);
    http.expectOne(`${LEAVE_API}/requests/77/withdraw`).flush({ id: 77, leaveType: 'earned', fromDate: request!.fromDate, toDate: request!.toDate, days: 1, reason: 'Family trip', status: 'Cancelled' });
    expect(service.requests().find((r) => r.id === 77)?.status).toBe('Cancelled');
    http.verify();
  });
});
