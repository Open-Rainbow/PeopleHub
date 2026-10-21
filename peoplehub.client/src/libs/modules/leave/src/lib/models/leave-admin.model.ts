import { LeaveStatus } from './leave-request.model';

/** Period buttons of the Leaves & WFH page. custom = picked in the filter panel. */
export type PeriodKey = 'today' | 'yesterday' | 'wtd' | 'mtd' | 'qtd' | 'htd' | 'ytd' | 'custom';

export type AdminTab = 'overview' | 'requests' | 'analytics' | 'departments' | 'employees';

/** New = pending and applied in the last 2 days. */
export type AdminStatusFilter = 'All' | 'New' | LeaveStatus;

/** Row of GET /api/v1/leave/admin/requests. */
export interface AdminLeaveRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  leaveType: string;
  leaveTypeLabel: string;
  category: string;
  isPaid: boolean;
  /** yyyy-MM-dd */
  fromDate: string;
  toDate: string;
  dayPart: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  /** ISO timestamp */
  appliedAt: string;
  decidedAt: string | null;
  approverName: string | null;
  decisionNote: string | null;
  isNew: boolean;
}

export interface AdminRequestsResult {
  from: string;
  to: string;
  /** "Today" for the KPI cards: today when it is inside the range, else the last day. */
  referenceDate: string;
  headcount: number;
  items: AdminLeaveRequest[];
}

export interface AdminLeaveType {
  code: string;
  label: string;
  category: string;
  isPaid: boolean;
}

export interface AdminFilters {
  headcount: number;
  departments: { department: string; headcount: number }[];
  leaveTypes: AdminLeaveType[];
}

export interface AdminRequestsQuery {
  from: string;
  to: string;
  department: string | null;
  leaveType: string | null;
  status?: AdminStatusFilter | null;
  search?: string | null;
}

export interface AdminEmployeesQuery {
  from: string;
  to: string;
  department: string | null;
  search: string | null;
  ignorePeriod: boolean;
}

export interface AdminEmployeeBalance {
  leaveType: string;
  label: string;
  total: number | null;
  used: number;
  pending: number;
  left: number | null;
}

export interface AdminEmployee {
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  availableDays: number;
  utilizationPercent: number;
  balances: AdminEmployeeBalance[];
}

/** One leave in an employee's history (Employees tab). */
export interface AdminHistoryItem {
  id: number;
  leaveType: string;
  label: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}
