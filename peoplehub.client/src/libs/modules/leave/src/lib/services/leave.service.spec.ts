import { TestBed } from '@angular/core/testing';
import { LeaveService } from './leave.service';
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
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveService);
  });

  it('seeds demo requests and balances', () => {
    expect(service.requests().length).toBeGreaterThan(0);
    expect(service.balances().length).toBe(5);
  });

  it('counts working days only', () => {
    const mon = monday();
    expect(workingDays(mon, addDaysIso(mon, 6))).toBeLessThanOrEqual(5);
    expect(workingDays(mon, mon, 'first-half')).toBe(0.5);
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
});
