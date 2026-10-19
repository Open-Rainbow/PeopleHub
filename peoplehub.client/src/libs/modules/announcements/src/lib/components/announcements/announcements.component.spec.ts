import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Announcement } from 'common';
import { AnnouncementsComponent } from './announcements.component';

function legacy(id: number, priority: Announcement['priority'], daysAgo: number, expiresIn: number): Announcement {
  const fmt = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };
  return {
    announcementId: id,
    title: `Announcement ${id}`,
    priority,
    description: 'Details',
    postedDate: fmt(-daysAgo),
    postedBy: 'HR Department',
    expireDate: fmt(expiresIn),
  };
}

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsComponent;
  let fixture: ComponentFixture<AnnouncementsComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AnnouncementsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncementsComponent);
    component = fixture.componentInstance;
  });

  it('should create and show seeded announcements when no input is given', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.pinned().length + component.feed().length).toBeGreaterThan(0);
  });

  it('splits current and expired legacy announcements', () => {
    component.announcements = [legacy(1, 'High', 1, 5), legacy(2, 'Low', 2, 10), legacy(3, 'Medium', 40, -5)];
    expect(component.counts()).toEqual({ current: 2, expired: 1 });
    expect(component.pinned().map((item) => item.id)).toEqual([1]);
    expect(component.feed().map((item) => item.id)).toEqual([2]);

    component.setTab('expired');
    expect(component.feed().map((item) => item.id)).toEqual([3]);
  });

  it('marks all current announcements as read', () => {
    component.announcements = [legacy(10, 'High', 1, 5), legacy(11, 'Low', 1, 5)];
    expect(component.unreadIds().length).toBe(2);
    component.markAllRead();
    expect(component.unreadIds().length).toBe(0);
  });
});
