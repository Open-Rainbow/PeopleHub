export type WorkMode = 'Office' | 'Remote';

export type DayStatus =
  | 'Present'
  | 'Half day'
  | 'Short day'
  | 'Working'
  | 'Missed check-out'
  | 'On leave'
  | 'Holiday'
  | 'Weekend'
  | 'Not checked in'
  | 'Absent'
  | 'Upcoming';

export type RegularizationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

/** Times are organization-local, without offset: `YYYY-MM-DDTHH:mm:ss`. Dates are `YYYY-MM-DD`. */
export interface AttendancePolicy {
  shiftStart: string;
  shiftEnd: string;
  graceMinutes: number;
  fullDayHours: number;
  halfDayHours: number;
  regularizeDays: number;
  timeZone: string;
  serverNow: string;
}

export interface AttendanceDay {
  date: string;
  status: DayStatus;
  isLate: boolean;
  checkInAt: string | null;
  checkOutAt: string | null;
  workedMinutes: number | null;
  workMode: WorkMode | null;
  source: string | null;
  note: string;
  holidayName: string;
  leaveType: string;
  isHalfDayLeave: boolean;
}

export interface AttendanceActionResult {
  message: string;
  today: AttendanceDay | null;
}

export interface TeamDayRow {
  employeeId: string;
  employeeName: string;
  department: string;
  designation: string;
  status: DayStatus;
  isLate: boolean;
  checkInAt: string | null;
  checkOutAt: string | null;
  workedMinutes: number | null;
  workMode: WorkMode | null;
  leaveType: string;
  holidayName: string;
}

export interface AttendanceTrendPoint {
  date: string;
  present: number;
  late: number;
  remote: number;
  onLeave: number;
  absent: number;
  isOffDay: boolean;
}

export interface Regularization {
  id: number;
  employeeId: string;
  employeeName: string;
  workDate: string;
  checkIn: string;
  checkOut: string;
  workMode: WorkMode;
  reason: string;
  status: RegularizationStatus;
  approverId: string;
  approverName: string;
  decisionNote: string;
  requestedAt: string;
}

export interface RegularizationDraft {
  workDate: string;
  checkIn: string;
  checkOut: string;
  workMode: WorkMode;
  reason: string;
}

export type RegularizationErrors = Partial<Record<keyof RegularizationDraft, string>>;
