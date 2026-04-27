import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlannerCalendarComponent } from './planner-calendar.component';

describe('PlannerCalendarComponent', () => {
  let component: PlannerCalendarComponent;
  let fixture: ComponentFixture<PlannerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerCalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlannerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to week view', () => {
    component.setView('week');
    expect(component.currentView()).toBe('week');
  });

  it('should select today when goToToday is called', () => {
    component.goToToday();
    const selectedDate = component.selectedDate();
    const today = new Date();

    expect(selectedDate.getDate()).toBe(today.getDate());
    expect(selectedDate.getMonth()).toBe(today.getMonth());
    expect(selectedDate.getFullYear()).toBe(today.getFullYear());
  });
});
