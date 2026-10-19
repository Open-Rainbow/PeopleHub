import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AttendanceComponent } from './attendance.component';

describe('AttendanceComponent', () => {
  let fixture: ComponentFixture<AttendanceComponent>;
  let component: AttendanceComponent;
  let http: HttpTestingController;

  const settle = async () => {
    for (let i = 0; i < 4; i++) {
      http.match(() => true).forEach((r) => r.error(new ProgressEvent('error'), { status: 0 }));
      await new Promise((resolve) => setTimeout(resolve));
      await fixture.whenStable();
    }
    fixture.detectChanges();
  };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AttendanceComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('manage', true);
    fixture.detectChanges();
    await settle();
  });

  afterEach(() => fixture.destroy());

  it('loads the month calendar from demo data', () => {
    expect(component.loading()).toBe(false);
    expect(component.calendar().filter((c) => c.day).length).toBeGreaterThanOrEqual(28);
    expect(component.myRequests().length).toBe(1);
  });

  it('blocks a correction without a reason', async () => {
    component.openCorrection();
    component.patch('workDate', component.todayIso());
    await component.submitCorrection();
    expect(component.drawerOpen()).toBe(true);
    expect(component.fieldError('reason')).toBeTruthy();
  });

  it('shows the team tab for HR and approves the pending correction', async () => {
    await component.selectTab('team');
    await settle();
    expect(component.teamRows().length).toBe(5);
    expect(component.approvals().length).toBe(1);

    await component.approve(component.approvals()[0]);
    expect(component.approvals().length).toBe(0);
    expect(component.myRequests()[0].status).toBe('Approved');
  });

  it('requires a note to reject', async () => {
    await component.selectTab('team');
    await settle();
    component.openReject(component.approvals()[0]);
    await component.confirmReject();
    expect(component.rejecting()).not.toBeNull();
  });
});
