import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrgChartComponent } from './employee-org-chart.component';

describe('EmployeeOrgChartComponent', () => {
  let component: EmployeeOrgChartComponent;
  let fixture: ComponentFixture<EmployeeOrgChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOrgChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOrgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
