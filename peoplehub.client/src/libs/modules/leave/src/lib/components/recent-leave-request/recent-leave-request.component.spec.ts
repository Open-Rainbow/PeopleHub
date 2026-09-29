import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLeaveRequestComponent } from './recent-leave-request.component';

describe('RecentLeaveRequestComponent', () => {
  let component: RecentLeaveRequestComponent;
  let fixture: ComponentFixture<RecentLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RecentLeaveRequestComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(RecentLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
