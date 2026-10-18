import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DoughnutChartComponent, IconTextButtonComponent, ValueSelectComponent } from 'ui';

@Component({
  selector: 'leave-balance-overview',
  standalone: true,
  templateUrl: './leave-balance-overview.component.html',
  styleUrl: './leave-balance-overview.component.css',
  imports: [DoughnutChartComponent, IconTextButtonComponent, ValueSelectComponent],
})
export class LeaveBalanceOverviewComponent {
  LeaveBalanceOverview = new FormGroup({
    year: new FormControl<string | null>(String(new Date().getFullYear())),
  });

  /** Current year + previous two, shaped like the ui DropdownValues model. */
  readonly yearOptions = [0, 1, 2].map((offset) => ({
    value: String(new Date().getFullYear() - offset),
    isDefault: offset === 0,
    isDisabled: false,
    textColor: '#111827',
    backgroundColor: '#ecf2fd',
  }));

  readonly legendData = [
    { color: '#ffb6c1', value: 40, label: 'Used' },
    { color: '#fff09c', value: 30, label: 'Pending' },
    { color: '#acefac', value: 30, label: 'Remaining' },
  ];

  constructor(private router: Router) {}

  onYearSelect(year: string | number): void {
    this.LeaveBalanceOverview.controls.year.setValue(String(year));
  }

  goToApplyLeave(): void {
    const role = this.router.url.split('/')[1];

    this.router.navigate([`/${role}/apply-leave`], {
      queryParams: { openForm: true },
    });
  }
}
