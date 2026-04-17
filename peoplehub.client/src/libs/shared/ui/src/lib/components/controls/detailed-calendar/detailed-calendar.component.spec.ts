import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedCalendarComponent } from './detailed-calendar.component';

describe('DetailedCalendarComponent', () => {
  let component: DetailedCalendarComponent;
  let fixture: ComponentFixture<DetailedCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
