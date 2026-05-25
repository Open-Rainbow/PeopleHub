import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DoughnutChartComponent,
  HorizontalBarChartComponent,
  SearchComponent,
  TextButtonComponent,
} from 'ui';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'attendance-root',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalBarChartComponent,
    DoughnutChartComponent,
    SearchComponent,
    TextButtonComponent,
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent {
  horizontalChartData: number[][] = [
    [22, 20, 19, 21, 20, 22, 18, 21, 20, 22, 19, 21],
    [2, 3, 4, 2, 3, 1, 5, 2, 3, 1, 4, 2],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];

  doughnutChartData = [
    { color: '#2166E1', value: 45, label: 'Full Time' },
    { color: '#FF8800', value: 20, label: 'Part Time' },
    { color: '#13C9E4', value: 15, label: 'Contract' },
    { color: '#FFB400', value: 10, label: 'Intern' },
  ];

  attendanceStats = [
    { label: 'Present Today', value: '87', color: '#16a34a', bg: '#f0fdf4' },
    { label: 'Absent Today', value: '5', color: '#dc2626', bg: '#fef2f2' },
    { label: 'On Leave', value: '8', color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Work From Home', value: '12', color: '#2563eb', bg: '#eff6ff' },
  ];
}


