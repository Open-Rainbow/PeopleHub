import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplyLeaveComponent } from './apply-leave.component';
import { LeaveService } from '../../services/leave.service';

describe('ApplyLeaveComponent', () => {
  let component: ApplyLeaveComponent;
  let fixture: ComponentFixture<ApplyLeaveComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ApplyLeaveComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with balances', () => {
    expect(component).toBeTruthy();
    expect(component.balances().length).toBe(5);
  });

  it('does not submit without a reason', () => {
    const service = TestBed.inject(LeaveService);
    const before = service.requests().length;
    component.openForm('casual');
    component.submit();
    expect(service.requests().length).toBe(before);
    expect(component.shownErrors().reason).toBeTruthy();
    expect(component.formOpen()).toBe(true);
  });

  it('submits a valid request', () => {
    const service = TestBed.inject(LeaveService);
    const before = service.requests().length;
    component.openForm('loss-of-pay');
    component.setReason('Personal errand');
    component.submit();
    expect(service.requests().length).toBe(before + 1);
    expect(component.formOpen()).toBe(false);
  });
});
