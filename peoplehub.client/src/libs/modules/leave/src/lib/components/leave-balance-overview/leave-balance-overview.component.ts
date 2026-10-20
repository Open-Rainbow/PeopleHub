import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DoughnutChartComponent, IconTextButtonComponent, ValueSelectComponent } from 'ui';

/** Canvas charts can't read CSS variables, so resolve the theme tokens when the chart is built. */
const tokenColour = (name: string, fallback: string): string => {
  if (typeof document === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

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
    textColor: 'var(--color-text-primary)',
    backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))',
  }));

  readonly legendData = [
    { color: tokenColour('--color-danger', '#dc2626'), value: 40, label: 'Used' },
    { color: tokenColour('--color-warning', '#f59e0b'), value: 30, label: 'Pending' },
    { color: tokenColour('--color-success', '#16a34a'), value: 30, label: 'Remaining' },
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
