export type LeaveCategoryId =
  | 'standard'
  | 'parental'
  | 'additional';

export interface LeaveCategory {
  id: LeaveCategoryId;
  name: string;
  expanded: boolean;
}

export interface LeaveItem {
  id: number;
  categoryId: LeaveCategoryId;
  name: string;
  description: string;
  annualAllowance: number;
  carryForwardDays: number;
  paidLeave: boolean;
  enhancementAllowed: boolean;
  anyCertificates: boolean;
  certificateRequiredAfterDays: number | null;
  approvalType: string;
}

export interface LeaveManagementSummary {
  totalLeaveTypes: number;
  totalAnnualAllowance: number;
  paidLeaves: number;
  unpaidLeaves: number;
  totalCarryForward: number;
  encashableLeaves: number;
  managerApprovalCount: number;
}