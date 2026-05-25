import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent, TextButtonComponent } from 'ui';

@Component({
  selector: 'leave-approval-root',
  standalone: true,
  imports: [CommonModule, ChipComponent, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leave-approval.component.html',
})
export class LeaveApprovalComponent {
  rows = [
    { id: 1, employee: 'Nikhil Raj', type: 'Annual Leave', from: '2025-11-15', to: '2025-11-16', reason: 'Travel', status: 'Pending' },
    { id: 2, employee: 'Priya Shah', type: 'Sick Leave', from: '2025-11-09', to: '2025-11-10', reason: 'Medical', status: 'Approved' },
  ];
}


