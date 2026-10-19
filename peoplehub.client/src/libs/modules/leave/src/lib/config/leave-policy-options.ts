import { AllowanceBasis, ApprovalType, LeavePolicyItem, PolicyCategory } from '../models/leave-policy.model';

export interface CategoryOption {
  id: PolicyCategory;
  label: string;
  hint: string;
  styles: { bar: string; soft: string; dot: string };
}

export const POLICY_CATEGORIES: CategoryOption[] = [
  { id: 'standard', label: 'Standard', hint: 'Everyday leave every employee gets.', styles: { bar: 'bg-blue-500', soft: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' } },
  { id: 'parental', label: 'Parental', hint: 'Maternity, paternity and adoption.', styles: { bar: 'bg-pink-500', soft: 'bg-pink-50 text-pink-700', dot: 'bg-pink-500' } },
  { id: 'additional', label: 'Additional', hint: 'Comp off, unpaid and special leave.', styles: { bar: 'bg-amber-500', soft: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' } },
];

export const CATEGORY_MAP: Record<string, CategoryOption> = POLICY_CATEGORIES.reduce(
  (map, c) => ({ ...map, [c.id]: c }),
  {} as Record<string, CategoryOption>,
);

export const ALLOWANCE_BASES: { id: AllowanceBasis; hint: string }[] = [
  { id: 'Yearly', hint: 'Full allowance on 1 January.' },
  { id: 'Monthly accrual', hint: 'Allowance / 12 credited every month.' },
  { id: 'Pro-rata', hint: 'Scaled by joining date in the year.' },
];

export const APPROVAL_TYPES: { id: ApprovalType; hint: string }[] = [
  { id: 'Auto', hint: 'Approved as soon as it is applied.' },
  { id: 'Manager', hint: 'Reporting manager approves.' },
  { id: 'HR', hint: 'HR approves.' },
  { id: 'Manager + HR', hint: 'Manager, then HR.' },
];

export const APPROVAL_STYLES: Record<string, string> = {
  Auto: 'bg-emerald-50 text-emerald-700',
  Manager: 'bg-sky-50 text-sky-700',
  HR: 'bg-violet-50 text-violet-700',
  'Manager + HR': 'bg-indigo-50 text-indigo-700',
};

export const DEFAULT_EMPLOYMENT_TYPES = ['Full Time', 'Part Time', 'Contract', 'Intern'];

export const POLICY_LIMITS = {
  labelMax: 50,
  descriptionMax: 200,
  allowanceMax: 365,
  backdateMax: 30,
  monthsMax: 24,
  maxItems: 30,
};

/** Human names used in the "changes since publish" list. */
export const POLICY_FIELD_LABELS: Partial<Record<keyof LeavePolicyItem, string>> = {
  label: 'name',
  description: 'description',
  category: 'category',
  annualAllowance: 'allowance',
  carryForwardDays: 'carry forward',
  isPaid: 'paid',
  isEncashable: 'encashment',
  mustBeTakenWithinMonths: 'use-within',
  allowanceBasis: 'basis',
  approvalType: 'approval',
  certificateRequired: 'certificate',
  certificateAfterDays: 'certificate days',
  backdateDays: 'backdating',
  maxConsecutive: 'max per request',
};
