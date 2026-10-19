import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ATTENDANCE_API, AttendanceService } from './attendance.service';
import { addDays, clock, duration, isoDate, validateRegularization } from './attendance.utils';

describe('AttendanceService', () => {
  let service: AttendanceService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AttendanceService);
    http = TestBed.inject(HttpTestingController);
  });

  const offline = async () => {
    await Promise.resolve();
    http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
  };

  it('falls back to demo data and lets you check in and out once', async () => {
    const policy = service.policy();
    await offline();
    expect((await policy).shiftStart).toBe('09:30');
    expect(service.isOnline()).toBe(false);

    const today = service.today();
    const [before] = await service.days('EMP00001', today, today);
    expect(before.checkInAt).toBeNull();

    const result = await service.checkIn('EMP00001', 'Remote', ' first day back ');
    expect(result.today?.status).toBe('Working');
    expect(result.today?.workMode).toBe('Remote');
    await expectAsync(service.checkIn('EMP00001', 'Office', '')).toBeRejectedWithError('You have already checked in today.');

    const out = await service.checkOut('EMP00001', '');
    expect(out.today?.checkOutAt).not.toBeNull();
    await expectAsync(service.checkOut('EMP00001', '')).toBeRejectedWithError('You have already checked out today.');
  });

  it('seeds a missed check-out with a pending correction that HR can approve', async () => {
    const pending = service.regularizations('EMP00001');
    await offline();
    const [req] = await pending;
    expect(req.status).toBe('Pending');

    const approved = await service.decide(req.id, true, '', 'EMP00004');
    expect(approved.status).toBe('Approved');
    const [day] = await service.days('EMP00001', req.workDate, req.workDate);
    expect(day.source).toBe('Regularized');
    expect(clock(day.checkOutAt)).toBe('18:45');
  });

  it('maps API rows (org-local times stay untouched)', async () => {
    const pending = service.days('EMP00001', '2026-10-01', '2026-10-31');
    await Promise.resolve();
    const req = http.expectOne((r) => r.url === `${ATTENDANCE_API}/days`);
    expect(req.request.params.get('employeeId')).toBe('EMP00001');
    req.flush([
      { date: '2026-10-16T00:00:00', status: 'Present', isLate: true, checkInAt: '2026-10-16T09:52:00', checkOutAt: '2026-10-16T18:10:00', workedMinutes: 498, workMode: 'Office', source: 'Web', note: null, holidayName: null, leaveType: null, isHalfDayLeave: false },
    ]);
    const [day] = await pending;
    expect(service.isOnline()).toBe(true);
    expect(day.date).toBe('2026-10-16');
    expect(clock(day.checkInAt)).toBe('09:52');
    expect(duration(day.workedMinutes)).toBe('8h 18m');
  });

  it('shows the server message for business errors instead of going offline', async () => {
    const first = service.policy();
    await Promise.resolve();
    http.expectOne(`${ATTENDANCE_API}/policy`).flush({ shiftStart: '10:00', serverNow: '2026-10-19T10:05:00' });
    await first;

    const pending = service.checkIn('EMP00001', 'Office', '');
    await Promise.resolve();
    http.expectOne(`${ATTENDANCE_API}/check-in`).flush({ detail: 'You have already checked in today.' }, { status: 422, statusText: 'Unprocessable' });
    await expectAsync(pending).toBeRejectedWithError('You have already checked in today.');
    expect(service.isOnline()).toBe(true);
  });
});

describe('validateRegularization', () => {
  const now = new Date(2026, 9, 19, 12, 0, 0);
  const today = isoDate(now);
  const valid = { workDate: addDays(today, -3), checkIn: '09:30', checkOut: '18:30', workMode: 'Office' as const, reason: 'Forgot to check out.' };

  it('accepts a normal request', () => {
    expect(validateRegularization(valid, now, 30)).toEqual({});
  });

  it('checks the window, the order of times and the reason', () => {
    expect(validateRegularization({ ...valid, workDate: addDays(today, 1) }, now, 30).workDate).toContain('today or past');
    expect(validateRegularization({ ...valid, workDate: addDays(today, -31) }, now, 30).workDate).toContain('last 30 days');
    expect(validateRegularization({ ...valid, checkOut: '09:00' }, now, 30).checkOut).toContain('after check-in');
    expect(validateRegularization({ ...valid, workDate: today, checkOut: '17:00' }, now, 30).checkOut).toContain('future');
    expect(validateRegularization({ ...valid, reason: 'oops' }, now, 30).reason).toContain('At least');
  });
});
