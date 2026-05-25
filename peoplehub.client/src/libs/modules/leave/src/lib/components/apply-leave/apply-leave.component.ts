import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChipComponent, TextButtonComponent } from 'ui';

@Component({
  selector: 'apply-leave-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChipComponent, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './apply-leave.component.html',
})
export class ApplyLeaveComponent {
  openForm = signal(false);
  fromDate = '';
  toDate = '';
  leaveType = 'Annual Leave';
  reason = '';

  leaveCards = [
    { label: 'Total Days', value: 24, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Used', value: 8, color: '#dc2626', bg: '#fef2f2' },
    { label: 'Remaining', value: 14, color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Pending', value: 2, color: '#f59e0b', bg: '#fffbeb' },
  ];

  private requestData = signal([
    { id: 1, leaveType: 'Annual Leave', fromDate: '2025-11-20', toDate: '2025-11-21', reason: 'Family event', status: 'Pending' },
    { id: 2, leaveType: 'Sick Leave', fromDate: '2025-10-10', toDate: '2025-10-11', reason: 'Fever', status: 'Approved' },
  ]);

  requests = computed(() => this.requestData());

  submitLeave(): void {
    if (!this.fromDate || !this.toDate || !this.reason.trim()) {
      return;
    }

    this.requestData.update(list => [{
      id: list.length + 1,
      leaveType: this.leaveType,
      fromDate: this.fromDate,
      toDate: this.toDate,
      reason: this.reason,
      status: 'Pending',
    }, ...list]);

    this.openForm.set(false);
    this.reason = '';
  }
}


