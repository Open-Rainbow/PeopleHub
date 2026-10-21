/** View Employee screen (employee directory). Matches PeopleHub.Server EmployeeDirectoryController. */

export type EmployeeStatus = 'Onboarding' | 'Active' | 'Probation' | 'Notice Period' | 'On Leave' | 'Inactive' | 'Exited';

export const EMPLOYEE_STATUSES: EmployeeStatus[] = ['Onboarding', 'Active', 'Probation', 'Notice Period', 'On Leave', 'Inactive', 'Exited'];

/** These two need a reason. */
export const REASON_STATUSES: EmployeeStatus[] = ['Inactive', 'Exited'];

export type EmployeeSortField = 'name' | 'code' | 'designation' | 'department' | 'location' | 'status' | 'joined';
export type SortDir = 'asc' | 'desc';

export interface EmployeeQuery {
  search: string;
  status: EmployeeStatus | null;
  department: string | null;
  location: string | null;
  employeeType: string | null;
  managerCode: string | null;
  joinedFrom: string | null;
  joinedTo: string | null;
  includeExited: boolean;
  sortBy: EmployeeSortField;
  sortDir: SortDir;
  page: number;
  pageSize: number;
}

export interface EmployeeListItem {
  id: number;
  employeeCode: string;
  fullName: string;
  preferredName: string | null;
  designation: string | null;
  department: string | null;
  businessUnit: string | null;
  workLocation: string | null;
  employeeType: string | null;
  officeEmail: string | null;
  mobileNumber: string | null;
  status: EmployeeStatus;
  dateOfJoining: string | null;
  managerCode: string | null;
  managerName: string | null;
  directReports: number;
  hasPhoto: boolean;
}

export interface EmployeePage {
  items: EmployeeListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface EmployeeSummary {
  total: number;
  active: number;
  onboarding: number;
  probation: number;
  noticePeriod: number;
  onLeave: number;
  inactive: number;
  exited: number;
  joinedLast30Days: number;
  departments: number;
}

export interface FilterOption {
  kind: string;
  value: string;
  label: string;
  count: number;
}

export interface EmployeeFilters {
  departments: FilterOption[];
  locations: FilterOption[];
  types: FilterOption[];
  statuses: FilterOption[];
  managers: FilterOption[];
}

export interface EmployeeProfile extends EmployeeListItem {
  salutation: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  maritalStatus: string | null;
  bloodGroup: string | null;
  nationality: string | null;
  employmentStatus: string | null;
  payLevel: string | null;
  shiftTimings: string | null;
  workSchedule: string | null;
  probationStartDate: string | null;
  probationEndDate: string | null;
  confirmationDate: string | null;
  hrOwnerCode: string | null;
  hrOwnerName: string | null;
  personalMail: string | null;
  alternateMail: string | null;
  alternateMobile: string | null;
  officialEmail: string | null;
  linkedinUrl: string | null;
  /** Base64 photo, or null. */
  photo: string | null;
}

export interface StatusHistoryItem {
  id: number;
  oldStatus: string | null;
  newStatus: string;
  reason: string | null;
  effectiveDate: string | null;
  changedAt: string;
  changedBy: string | null;
}

export interface StatusChange {
  status: EmployeeStatus;
  reason: string;
  effectiveDate: string | null;
}

export const DIRECTORY_LIMITS = {
  searchMax: 100,
  reasonMax: 500,
  defaultPageSize: 10,
};

export function emptyQuery(): EmployeeQuery {
  return {
    search: '',
    status: null,
    department: null,
    location: null,
    employeeType: null,
    managerCode: null,
    joinedFrom: null,
    joinedTo: null,
    includeExited: false,
    sortBy: 'name',
    sortDir: 'asc',
    page: 1,
    pageSize: DIRECTORY_LIMITS.defaultPageSize,
  };
}
