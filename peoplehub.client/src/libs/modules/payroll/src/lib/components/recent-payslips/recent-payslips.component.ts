import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from 'ui';
import { RecentPayslip } from 'common';

@Component({
  selector: 'recent-payslips-root',
  standalone: true,
  imports: [CommonModule, TextButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recent-payslips.component.html',
})
export class RecentPayslipsComponent {
  visibleIndex = signal<number | null>(null);

  payslips: RecentPayslip[] = [
    { month: 'December 2024', date: '31 Dec 2024', amount: 'Rs. 4,250.00' },
    { month: 'November 2024', date: '30 Nov 2024', amount: 'Rs. 4,120.00' },
    { month: 'October 2024', date: '31 Oct 2024', amount: 'Rs. 4,250.00' },
  ];

  toggle(index: number): void {
    this.visibleIndex.set(this.visibleIndex() === index ? null : index);
  }
}


