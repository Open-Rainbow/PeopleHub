import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementDraft } from '../models/announcement.model';
import { addDays, statusOf, toIsoDate } from '../utils/announcement.utils';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;

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
});
