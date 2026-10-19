import { AttendancePolicy, DayStatus } from '../models/attendance.model';

/** Until login exists the page acts as this employee (same as Apply Leave). */
export const DEMO_EMPLOYEE_ID = 'EMP00001';

/** Manager / HR who approves corrections in the demo (EMP00004 is the seeded manager). */
export const DEMO_APPROVER_ID = 'EMP00004';

export const ATTENDANCE_LIMITS = {
  noteMax: 200,
  reasonMin: 10,
  reasonMax: 300,
  decisionNoteMax: 300,
} as const;

export const DEFAULT_ATTENDANCE_POLICY: AttendancePolicy = {
  shiftStart: '09:30',
  shiftEnd: '18:30',
  graceMinutes: 15,
  fullDayHours: 8,
  halfDayHours: 4,
  regularizeDays: 30,
  timeZone: 'India Standard Time',
  serverNow: '',
};

export interface StatusStyle {
  /** Calendar cell. */
  cell: string;
  /** Pill. */
  chip: string;
  dot: string;
  /** Counts as a day at work. */
  worked: boolean;
}

const style = (cell: string, chip: string, dot: string, worked = false): StatusStyle => ({ cell, chip, dot, worked });

export const STATUS_STYLES: Record<string, StatusStyle> = {
  Present: style('bg-emerald-50 text-emerald-800 border-emerald-200', 'bg-emerald-50 text-emerald-700 ring-emerald-600/20', 'bg-emerald-500', true),
  'Half day': style('bg-amber-50 text-amber-800 border-amber-200', 'bg-amber-50 text-amber-700 ring-amber-600/20', 'bg-amber-500', true),
  'Short day': style('bg-orange-50 text-orange-800 border-orange-200', 'bg-orange-50 text-orange-700 ring-orange-600/20', 'bg-orange-500', true),
  Working: style('bg-blue-50 text-blue-800 border-blue-300', 'bg-blue-50 text-blue-700 ring-blue-600/20', 'bg-blue-500', true),
  'Missed check-out': style('bg-rose-50 text-rose-800 border-rose-200', 'bg-rose-50 text-rose-700 ring-rose-600/20', 'bg-rose-500', true),
  'On leave': style('bg-violet-50 text-violet-800 border-violet-200', 'bg-violet-50 text-violet-700 ring-violet-600/20', 'bg-violet-500'),
  Holiday: style('bg-sky-50 text-sky-800 border-sky-200', 'bg-sky-50 text-sky-700 ring-sky-600/20', 'bg-sky-500'),
  Weekend: style('bg-gray-50 text-gray-400 border-gray-100', 'bg-gray-100 text-gray-600 ring-gray-500/20', 'bg-gray-300'),
  'Not checked in': style('bg-white text-gray-700 border-dashed border-gray-300', 'bg-gray-100 text-gray-700 ring-gray-500/20', 'bg-gray-400'),
  Absent: style('bg-red-50 text-red-800 border-red-200', 'bg-red-50 text-red-700 ring-red-600/20', 'bg-red-500'),
  Upcoming: style('bg-white text-gray-300 border-gray-100', 'bg-gray-50 text-gray-500 ring-gray-500/10', 'bg-gray-200'),
};

export const CALENDAR_LEGEND: DayStatus[] = ['Present', 'Half day', 'Missed check-out', 'Absent', 'On leave', 'Holiday', 'Weekend'];

export const TEAM_FILTERS = ['All', 'In office', 'Remote', 'Late', 'On leave', 'Not in'] as const;
export type TeamFilter = (typeof TEAM_FILTERS)[number];

/** Offline demo only: the server uses org.Holiday. */
export const DEMO_HOLIDAYS: Record<string, string> = {
  '2026-01-26': 'Republic Day',
  '2026-03-04': 'Holi',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-20': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-24': 'Guru Nanak Jayanti',
  '2026-12-25': 'Christmas',
};

export interface DemoEmployee {
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
}

export const DEMO_EMPLOYEES: DemoEmployee[] = [
  { employeeId: 'EMP00001', employeeName: 'Venkat Jangili', department: 'Engineering', designation: 'Web Developer' },
  { employeeId: 'EMP00002', employeeName: 'Polly Polineni', department: 'Engineering', designation: 'Junior Web Developer' },
  { employeeId: 'EMP00003', employeeName: 'Ethan Sarvigari', department: 'Engineering', designation: 'Junior Web Developer' },
  { employeeId: 'EMP00004', employeeName: 'Dharani Vedantham', department: 'HR', designation: 'HR Manager' },
  { employeeId: 'EMP00005', employeeName: 'Gani Kumar Pradhan', department: 'Finance', designation: 'Accountant' },
];
