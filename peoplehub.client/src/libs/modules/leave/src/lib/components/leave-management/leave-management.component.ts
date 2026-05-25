import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent, DropdownComponent, NumberBoxComponent, TextButtonComponent } from 'ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'leave-management-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToggleComponent, DropdownComponent, NumberBoxComponent, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-management.component.html',
})
export class LeaveManagementComponent {
  form = new FormGroup({
    isAccrualEnabled: new FormControl(false, { nonNullable: true }),
    isCarryForwardEnabled: new FormControl(true, { nonNullable: true }),
    annualLeave: new FormControl(24, { nonNullable: true }),
    sickLeave: new FormControl(12, { nonNullable: true }),
    approvalLevel: new FormControl(1, { nonNullable: true }),
    accrualMethod: new FormControl(1, { nonNullable: true }),
  });

  approvalLevels = [
    { value: 1, name: 'Manager' },
    { value: 2, name: 'HR' },
    { value: 3, name: 'Manager + HR' },
  ];

  accrualMethods = [
    { value: 1, name: 'Monthly' },
    { value: 2, name: 'Quarterly' },
    { value: 3, name: 'Yearly' },
  ];

  reset(): void {
    this.form.reset({
      isAccrualEnabled: false,
      isCarryForwardEnabled: true,
      annualLeave: 24,
      sickLeave: 12,
      approvalLevel: 1,
      accrualMethod: 1,
    });
  }
}


