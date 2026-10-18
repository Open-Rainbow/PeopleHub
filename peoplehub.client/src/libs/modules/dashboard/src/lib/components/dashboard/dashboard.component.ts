import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent, HorizontalBarChartComponent, IconComponent } from 'ui';
import { Activity, QuickAnnouncements, RecentPayslip } from 'common';
import { DurationPipe } from 'pipes';

const HOUR = 60 * 60 * 1000;

/** ISO timestamp `hoursAgo` hours before now, so demo items never look a year old. */
const hoursAgo = (hours: number): string => new Date(Date.now() - hours * HOUR).toISOString();

const formatDay = (date: Date): string =>
  date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Next occurrence (today or later) of a fixed-date holiday. */
const nextOccurrence = (month: number, day: number): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const candidate = new Date(today.getFullYear(), month - 1, day);
  if (candidate < today) {
    candidate.setFullYear(candidate.getFullYear() + 1);
  }
  return candidate;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dashboard-root',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalBarChartComponent,
    ChipComponent,
    IconComponent,
    DurationPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activePayslipIndex: number | null = null;

  readonly today = new Date();
  readonly userName = localStorage.getItem('userName') || 'there';
  readonly greeting = this.getGreeting();

  chartData: number[][] = [
    [390, 120, 295, 230, 100, 20, 180, 230, 250],
    [100, 190, 110, 380, 100, 200, 290, 300, 100],
    [150, 200, 190, 120, 100, 400, 90, 120, 200],
  ];

  leaveBalance = [
    { label: 'Total Days', value: 24, color: '#2563eb', bg: '#eff6ff' },
    { label: 'Used Days', value: 8, color: '#dc2626', bg: '#fef2f2' },
    { label: 'Remaining', value: 14, color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Pending', value: 2, color: '#f59e0b', bg: '#fffbeb' },
  ];

  quickStats = [
    { label: 'Present today', value: '42 / 45', icon: 'person_check_outline' },
    { label: 'On leave', value: '3', icon: 'leave_user' },
    { label: 'Pending approvals', value: '5', icon: 'check_circle_outline' },
  ];

  announcements: QuickAnnouncements[] = [
    { name: 'Prepare monthly financial report', date: hoursAgo(3) },
    { name: 'Team building event on Friday', date: hoursAgo(26) },
    { name: 'New leave policy update', date: hoursAgo(72) },
  ];

  activities: Activity[] = [
    { name: 'Leave request submitted by Ravi Kumar', date: hoursAgo(1) },
    { name: 'New employee onboarded: Priya Shah', date: hoursAgo(20) },
    { name: 'Payslip generated for last month', date: hoursAgo(96) },
  ];

  recentPayslips: RecentPayslip[] = this.buildPayslips();

  teamMembers = [
    { name: 'Ganesh Kumar', designation: 'UI/UX Designer' },
    { name: 'Venkat Rao', designation: 'Senior Software Engineer' },
    { name: 'Priya Shah', designation: 'HR Manager' },
    { name: 'Chitranjan Das', designation: 'Web Developer' },
  ];

  holidayStats = [
    { name: 'Total Holidays', number: 12, color: '#2563eb', bg: '#eff6ff' },
    { name: 'Federal Holidays', number: 8, color: '#16a34a', bg: '#f0fdf4' },
    { name: 'Company Holidays', number: 4, color: '#ea580c', bg: '#fff7ed' },
    { name: 'Upcoming', number: 3, color: '#c026d3', bg: '#fdf4ff' },
  ];

  upcomingHolidays = [
    { name: 'Christmas', date: nextOccurrence(12, 25), type: 'National Holiday' },
    { name: 'New Year', date: nextOccurrence(1, 1), type: 'National Holiday' },
    { name: 'Republic Day', date: nextOccurrence(1, 26), type: 'Federal Holiday' },
  ]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(h => ({ ...h, date: formatDay(h.date) }));

  togglePayslip(index: number): void {
    this.activePayslipIndex = this.activePayslipIndex === index ? null : index;
  }

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  /** Last three completed months. */
  private buildPayslips(): RecentPayslip[] {
    const now = new Date();
    return [1, 2, 3].map(offset => {
      const lastDay = new Date(now.getFullYear(), now.getMonth() - offset + 1, 0);
      return {
        month: lastDay.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        date: formatDay(lastDay),
        amount: '₹4,250.00',
      };
    });
  }
}
