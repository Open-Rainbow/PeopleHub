import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent, HorizontalBarChartComponent } from 'ui';
import { Activity, QuickAnnouncements, RecentPayslip } from 'common';
import { DurationPipe } from 'pipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dashboard-root',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalBarChartComponent,
    ChipComponent,
    DurationPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  activePayslipIndex: number | null = null;

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

  announcements: QuickAnnouncements[] = [
    { name: 'Prepare monthly financial report', date: '2025-11-07T15:53:30' },
    { name: 'Team building event on Friday', date: '2025-11-06T10:00:00' },
    { name: 'New leave policy update', date: '2025-11-05T09:30:00' },
  ];

  activities: Activity[] = [
    { name: 'Leave request submitted by Ravi Kumar', date: '2025-11-07T15:53:30' },
    { name: 'New employee onboarded: Priya Shah', date: '2025-11-06T11:00:00' },
    { name: 'Payslip generated for October 2025', date: '2025-11-05T09:00:00' },
  ];

  recentPayslips: RecentPayslip[] = [
    { month: 'December 2024', date: '31 Dec 2024', amount: 'â‚¹4,250.00' },
    { month: 'November 2024', date: '30 Nov 2024', amount: 'â‚¹4,250.00' },
    { month: 'October 2024', date: '31 Oct 2024', amount: 'â‚¹4,250.00' },
  ];

  teamMembers = [
    { name: 'Ganesh Kumar', designation: 'UI/UX Designer' },
    { name: 'Venkat Rao', designation: 'Senior Software Engineer' },
    { name: 'Priya Shah', designation: 'HR Manager' },
    { name: 'Chitranjan Das', designation: 'Web Developer' },
  ];

  holidayStats = [
    { name: 'Total Holidays', number: 12, color: 'blue', bg: 'rgb(244 244 255)' },
    { name: 'Federal Holidays', number: 8, color: 'green', bg: '#ddffdd' },
    { name: 'Company Holidays', number: 4, color: 'rgb(250, 139, 4)', bg: '#fff4e7' },
    { name: 'Upcoming', number: 3, color: 'rgb(245, 4, 245)', bg: 'rgb(255, 205, 255)' },
  ];

  upcomingHolidays = [
    { name: 'Christmas Holiday', date: '25 Dec 2025', type: 'National Holiday' },
    { name: 'Happy New Year', date: '1 Jan 2026', type: 'National Holiday' },
    { name: 'Republic Day', date: '26 Jan 2026', type: 'Federal Holiday' },
  ];

  togglePayslip(index: number): void {
    this.activePayslipIndex = this.activePayslipIndex === index ? null : index;
  }
}



