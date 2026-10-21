export type PolicyCategory = 'standard' | 'parental' | 'additional';
export type AllowanceBasis = 'Yearly' | 'Monthly accrual' | 'Pro-rata';
export type ApprovalType = 'Auto' | 'Manager' | 'HR' | 'Manager + HR';

/** None = nothing saved yet for this year + employment type (items are the defaults). */
export type PolicyStatus = 'Draft' | 'Published' | 'None';

/** One leave type inside a policy. Same shape as LeavePolicyItemDto on the server. */
export interface LeavePolicyItem {
  /** Slug (earned, casual, ...). Empty for a new type: generated from the label. */
  code: string;
  label: string;
  description: string;
  category: PolicyCategory;
  /** Days per year (parental: total duration); null = unlimited (unpaid only). */
  annualAllowance: number | null;
  carryForwardDays: number;
  isPaid: boolean;
  isEncashable: boolean;
  mustBeTakenWithinMonths: number | null;
  allowanceBasis: AllowanceBasis;
  approvalType: ApprovalType;
  certificateRequired: boolean;
  certificateAfterDays: number | null;
  /** How many days in the past a request may start. */
  backdateDays: number;
  /** Longest single request in working days; null = no limit. */
  maxConsecutive: number | null;

  // ---- Rules of the Policy Manager screen (database section 19) ----
  /** false = employees can't apply for it (Comp-Off / LOP / WFH "Enable"). */
  isEnabled: boolean;
  advanceNoticeRequired: boolean;
  advanceNoticeHours: number | null;
  /** Parental: paid part of the total duration. */
  paidDays: number | null;
  /** Parental: extra weeks allowed; null = no extension. */
  extensionWeeks: number | null;
  notes: string;
  /** Comp-Off: days to use it before it lapses. */
  expiryDays: number | null;
  /** Comp-Off: most days banked at once. */
  maxAccrual: number | null;
  /** WFH caps. */
  maxPerMonth: number | null;
  maxPerWeek: number | null;
  /** Months of service before it can be used. */
  eligibleAfterMonths: number | null;
}

export interface LeavePolicy {
  id: number | null;
  year: number;
  employmentType: string;
  status: PolicyStatus;
  version: number | null;
  publishedAt: string | null;
  updatedAt: string | null;
  hasPublished: boolean;
  publishedVersion: number | null;
  items: LeavePolicyItem[];
  /** Version in force, for "changes since publish". */
  publishedItems: LeavePolicyItem[];
}

export interface LeavePolicySummary {
  year: number;
  employmentType: string;
  publishedVersion: number | null;
  publishedAt: string | null;
  hasDraft: boolean;
}

export type PolicyItemErrors = Partial<Record<keyof LeavePolicyItem, string>>;

export interface PolicyChange {
  code: string;
  label: string;
  kind: 'added' | 'removed' | 'changed';
  /** Human labels of the changed fields. */
  fields: string[];
}

export interface CopyPolicyResult {
  created: number;
  message: string;
}
