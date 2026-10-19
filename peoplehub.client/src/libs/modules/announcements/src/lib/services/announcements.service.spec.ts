import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ANNOUNCEMENTS_API, AnnouncementsService } from './announcements.service';
import { AnnouncementDraft } from '../models/announcement.model';
import { addDays, statusOf, toIsoDate } from '../utils/announcement.utils';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;
  let http: HttpTestingController;

  const draft = (overrides: Partial<AnnouncementDraft> = {}): AnnouncementDraft => ({
    title: 'Test announcement',
    description: 'Body',
    priority: 'Medium',
    category: 'General',
    department: 'All Departments',
    targetAudience: 'All Employees',
    publishOn: toIsoDate(new Date()),
    expiresOn: toIsoDate(addDays(new Date(), 7)),
    isPinned: false,
    ...overrides,
  });

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AnnouncementsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('starts with demo data', () => {
    expect(service.items().length).toBeGreaterThan(0);
  });

  it('creates, updates and removes an announcement', () => {
    const created = service.create(draft());
    expect(service.getById(created.id)?.title).toBe('Test announcement');

    service.update(created.id, draft({ title: 'Renamed' }));
    expect(service.getById(created.id)?.title).toBe('Renamed');

    service.remove(created.id);
    expect(service.getById(created.id)).toBeUndefined();
  });

  it('toggles pin and tracks read state', () => {
    const created = service.create(draft());
    service.togglePin(created.id);
    expect(service.getById(created.id)?.isPinned).toBe(true);

    expect(service.isRead(created.id)).toBe(false);
    service.markRead(created.id);
    expect(service.isRead(created.id)).toBe(true);
  });

  it('derives status from dates', () => {
    const today = new Date();
    expect(statusOf({ publishOn: toIsoDate(addDays(today, 2)), expiresOn: toIsoDate(addDays(today, 9)) })).toBe('Scheduled');
    expect(statusOf({ publishOn: toIsoDate(addDays(today, -9)), expiresOn: toIsoDate(addDays(today, -1)) })).toBe('Expired');
    expect(statusOf({ publishOn: toIsoDate(today), expiresOn: toIsoDate(today) })).toBe('Active');
  });

  it('switches to API data once the backend answers', () => {
    service.refresh();
    http.expectOne(ANNOUNCEMENTS_API).flush([
      { id: 10, title: 'From API', description: 'x', priority: 'Low', publishOn: '2026-10-01T00:00:00', expiresOn: '2099-01-01T00:00:00', isPinned: true, isRead: true },
    ]);

    expect(service.isOnline()).toBe(true);
    expect(service.items().map((item) => item.id)).toEqual([10]);
    expect(service.getById(10)?.isPinned).toBe(true);
    expect(service.isRead(10)).toBe(true);
  });

  it('sends writes to the API when online and swaps in the server id', () => {
    service.refresh();
    http.expectOne(ANNOUNCEMENTS_API).flush([]);

    const temp = service.create(draft({ title: 'Online' }));
    const post = http.expectOne((req) => req.method === 'POST' && req.url === ANNOUNCEMENTS_API);
    expect(post.request.body.title).toBe('Online');
    post.flush({ id: 77, title: 'Online', description: 'Body', priority: 'Medium', publishOn: draft().publishOn, expiresOn: draft().expiresOn });

    expect(service.getById(temp.id)).toBeUndefined();
    expect(service.getById(77)?.title).toBe('Online');

    service.togglePin(77);
    const patch = http.expectOne(`${ANNOUNCEMENTS_API}/77/pin`);
    expect(patch.request.body).toEqual({ isPinned: true });
    patch.flush({});

    service.remove(77);
    http.expectOne((req) => req.method === 'DELETE' && req.url === `${ANNOUNCEMENTS_API}/77`).flush(null);
    http.verify();
  });
});
