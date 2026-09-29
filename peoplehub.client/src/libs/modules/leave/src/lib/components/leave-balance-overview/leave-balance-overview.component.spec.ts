import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceOverviewComponent } from './leave-balance-overview.component';

describe('LeaveBalanceOverviewComponent', () => {
  let component: LeaveBalanceOverviewComponent;
  let fixture: ComponentFixture<LeaveBalanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LeaveBalanceOverviewComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(LeaveBalanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
