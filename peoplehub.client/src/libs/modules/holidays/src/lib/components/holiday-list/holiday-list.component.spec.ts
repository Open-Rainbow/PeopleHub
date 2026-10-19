import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HolidayListComponent } from './holiday-list.component';

describe('HolidayListComponent', () => {
  let fixture: ComponentFixture<HolidayListComponent>;
  let component: HolidayListComponent;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HolidayListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(HolidayListComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('manage', true);
    fixture.detectChanges();
    for (let i = 0; i < 3; i++) {
      http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
      await new Promise((resolve) => setTimeout(resolve));
      await fixture.whenStable();
    }
  });

  it('loads without errors', () => {
    expect(component.loading()).toBe(false);
    expect(component.error()).toBeNull();
  });

  it('does not save an empty holiday', async () => {
    const before = component.holidays().length;
    component.openAdd();
    component.patch('name', '');
    await component.save();
    expect(component.holidays().length).toBe(before);
    expect(component.formErrors().name).toBeTruthy();
    expect(component.drawerOpen()).toBe(true);
  });

  it('flags a date that already has a holiday', () => {
    const existing = component.holidays()[0];
    if (!existing) return;
    component.openAdd();
    component.patch('date', existing.date);
    expect(component.formErrors().date).toContain(existing.name);
  });
});
