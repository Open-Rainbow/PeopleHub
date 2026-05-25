import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from 'ui';

@Component({
  selector: 'employee-overview-root',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-overview.component.html',
})
export class EmployeeOverviewComponent {}


