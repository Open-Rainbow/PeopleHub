import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeOrgChartComponent } from 'ui';

@Component({
  selector: 'org-chart-root',
  standalone: true,
  imports: [CommonModule, EmployeeOrgChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './org-chart.component.html',
})
export class OrgChartComponent {}


