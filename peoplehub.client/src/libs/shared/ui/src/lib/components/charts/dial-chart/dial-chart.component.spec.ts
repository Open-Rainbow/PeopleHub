import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialChartComponent } from './dial-chart.component';


describe('DialChartComponent', () => {
  let component: DialChartComponent;
  let fixture: ComponentFixture<DialChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
