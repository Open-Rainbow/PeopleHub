import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTimerComponent } from './calendar-timer.component';

describe('CalendarTimerComponent', () => {
  let component: CalendarTimerComponent;
  let fixture: ComponentFixture<CalendarTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CalendarTimerComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
