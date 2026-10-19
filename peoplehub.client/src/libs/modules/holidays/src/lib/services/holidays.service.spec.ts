import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HOLIDAYS_API, HolidaysService, validateHoliday } from './holidays.service';

describe('HolidaysService', () => {
  let service: HolidaysService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(HolidaysService);
    http = TestBed.inject(HttpTestingController);
  });

  const offline = async () => {
    await Promise.resolve();
    http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
  };

  it('falls back to demo holidays with the right Diwali date', async () => {
    const pending = service.list(2026);
    await offline();
    const list = await pending;
    expect(service.isOnline()).toBe(false);
    expect(list.find((h) => h.name === 'Diwali')?.date).toBe('2026-11-08');
    expect(list.find((h) => h.date === '2026-10-20')?.name).toBe('Dussehra');
  });

  it('uses the API when it answers', async () => {
    const pending = service.list(2026);
    await Promise.resolve();
    http.expectOne(`${HOLIDAYS_API}?year=2026`).flush([
      { id: 3, date: '2026-03-04T00:00:00', name: 'Holi', type: 'Festival', isOptional: false, description: null },
    ]);
    const list = await pending;
    expect(service.isOnline()).toBe(true);
    expect(list[0]).toEqual({ id: 3, date: '2026-03-04', name: 'Holi', type: 'Festival', isOptional: false, description: '' });
  });

  it('offline: rejects a second holiday on the same date', async () => {
    const first = service.list(2026);
    await offline();
    await first;
    await expect(service.create({ date: '2026-11-08', name: 'Another', type: 'Company', isOptional: false, description: '' }))
      .rejects.toThrow('already a holiday');
    const added = await service.create({ date: '2026-11-09', name: 'Diwali (observed)', type: 'Company', isOptional: false, description: '' });
    expect(added.id).toBeGreaterThan(0);
  });

  it('validates the form', () => {
    const errors = validateHoliday({ date: '', name: 'x', type: 'Public', isOptional: false, description: '' }, [], null);
    expect(errors.date).toBeTruthy();
    expect(errors.name).toBeTruthy();
  });
});
