import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LeaveManagementComponent } from './leave-management.component';

describe('LeaveManagementComponent', () => {
  let component: LeaveManagementComponent;
  let fixture: ComponentFixture<LeaveManagementComponent>;
  let http: HttpTestingController;

  /** Answers every pending API call with a network error, so the page falls back to demo data. */
  const goOffline = async () => {
    for (let i = 0; i < 5; i++) {
      http.match(() => true).forEach((req) => req.error(new ProgressEvent('error'), { status: 0 }));
      await new Promise((resolve) => setTimeout(resolve));
      await fixture.whenStable();
    }
  };

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [LeaveManagementComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveManagementComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await goOffline();
  });

  it('loads the published Full Time demo policy', () => {
    expect(component.loading()).toBe(false);
    expect(component.status()).toBe('Published');
    expect(component.items().length).toBeGreaterThan(0);
    expect(component.dirty()).toBe(false);
  });

  it('does not add an invalid leave type', () => {
    const before = component.items().length;
    component.openAdd('standard');
    component.saveItem();
    expect(component.items().length).toBe(before);
    expect(component.formErrors().label).toBeTruthy();
  });

  it('rejects carry forward above the allowance', () => {
    component.openAdd();
    component.patch('label', 'Study Leave');
    component.patchNumber('annualAllowance', 4);
    component.patchNumber('carryForwardDays', 6);
    expect(component.formErrors().carryForwardDays).toBeTruthy();
  });

  it('adds a type, tracks it as a change and saves a draft', async () => {
    component.openAdd('additional');
    component.patch('label', 'Bereavement Leave');
    component.patchNumber('annualAllowance', 3);
    component.saveItem();

    expect(component.dirty()).toBe(true);
    expect(component.changes().some((c) => c.kind === 'added')).toBe(true);

    await component.saveDraft();
    expect(component.status()).toBe('Draft');
    expect(component.items().find((i) => i.label === 'Bereavement Leave')?.code).toBe('bereavement-leave');
    expect(component.dirty()).toBe(false);
  });

  it('publishes a draft', async () => {
    component.openEdit(0);
    component.patchNumber('annualAllowance', 15);
    component.saveItem();
    await component.publish();
    expect(component.status()).toBe('Published');
    expect(component.policy()?.version).toBe(2);
  });
});
