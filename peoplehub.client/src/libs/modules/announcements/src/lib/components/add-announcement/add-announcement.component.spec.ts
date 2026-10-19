import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AddAnnouncementComponent } from './add-announcement.component';
import { AnnouncementsService } from '../../services/announcements.service';

describe('AddAnnouncementComponent', () => {
  let component: AddAnnouncementComponent;
  let fixture: ComponentFixture<AddAnnouncementComponent>;
  let service: AnnouncementsService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AddAnnouncementComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAnnouncementComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AnnouncementsService);
    fixture.detectChanges();
  });

  it('should create with seeded announcements', () => {
    expect(component).toBeTruthy();
    expect(component.counts().All).toBe(service.items().length);
  });

  it('does not save an empty form', () => {
    const before = service.items().length;
    component.openCreate();
    component.save();
    expect(service.items().length).toBe(before);
    expect(component.formError()).toBeTruthy();
  });

  it('publishes a valid announcement', () => {
    const before = service.items().length;
    component.openCreate();
    component.form.patchValue({ title: 'Team lunch', description: 'Friday at 1 PM.' });
    component.save();
    expect(service.items().length).toBe(before + 1);
    expect(component.formOpen()).toBe(false);
  });
});
