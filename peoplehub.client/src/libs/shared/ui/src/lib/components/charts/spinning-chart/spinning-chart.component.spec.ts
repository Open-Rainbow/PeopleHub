import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinningChartComponent } from './spinning-chart.component';

describe('SpinningChartComponent', () => {
  let component: SpinningChartComponent;
  let fixture: ComponentFixture<SpinningChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinningChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
