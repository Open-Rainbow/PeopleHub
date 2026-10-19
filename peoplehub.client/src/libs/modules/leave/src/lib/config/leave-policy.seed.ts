import { LeavePolicyItem } from '../models/leave-policy.model';

const item = (p: Partial<LeavePolicyItem> & Pick<LeavePolicyItem, 'code' | 'label'>): LeavePolicyItem => ({
  description: '',
  category: 'standard',
  annualAllowance: 0,
  carryForwardDays: 0,
  isPaid: true,
  isEncashable: false,
  mustBeTakenWithinMonths: null,
  allowanceBasis: 'Yearly',
  approvalType: 'Manager',
  certificateRequired: false,
  certificateAfterDays: null,
  backdateDays: 0,
  maxConsecutive: null,
  ...p,
});

/** Organization defaults: the starting point of a brand-new policy (mirrors lv.LeaveType in leave.sql). */
export const DEFAULT_POLICY_ITEMS: LeavePolicyItem[] = [
  item({ code: 'earned', label: 'Earned Leave', description: 'Planned time off. Apply in advance.', annualAllowance: 12, maxConsecutive: 15 }),
  item({ code: 'casual', label: 'Casual Leave', description: 'Short personal errands, up to 3 days at a time.', annualAllowance: 6, maxConsecutive: 3 }),
  item({ code: 'sick', label: 'Sick Leave', description: 'Illness or medical appointments. Can be applied up to 7 days later.', annualAllowance: 6, backdateDays: 7, certificateRequired: true, certificateAfterDays: 2 }),
  item({ code: 'comp-off', label: 'Comp Off', description: 'For weekends or holidays you worked.', category: 'additional', annualAllowance: 2, maxConsecutive: 2 }),
  item({ code: 'loss-of-pay', label: 'Loss of Pay', description: 'Unpaid leave when other balances are used up.', category: 'additional', annualAllowance: null, isPaid: false, maxConsecutive: 30 }),
  item({ code: 'maternity', label: 'Maternity Leave', description: 'Paid leave around childbirth or adoption (26 weeks).', category: 'parental', annualAllowance: 182, maxConsecutive: 182, certificateRequired: true, certificateAfterDays: 1 }),
  item({ code: 'paternity', label: 'Paternity Leave', description: 'Time off for new fathers, within 3 months of the birth.', category: 'parental', annualAllowance: 5, maxConsecutive: 5 }),
];

const byCode = (code: string) => DEFAULT_POLICY_ITEMS.find((i) => i.code === code)!;

/** This year's Full Time policy (published in the demo data). */
export const SEED_FULL_TIME: LeavePolicyItem[] = [
  { ...byCode('earned'), carryForwardDays: 5, isEncashable: true, allowanceBasis: 'Monthly accrual' },
  byCode('casual'),
  byCode('sick'),
  { ...byCode('maternity'), approvalType: 'HR' },
  { ...byCode('paternity'), mustBeTakenWithinMonths: 3 },
  { ...byCode('comp-off'), mustBeTakenWithinMonths: 2 },
  { ...byCode('loss-of-pay'), approvalType: 'Manager + HR' },
];

/** This year's Part Time policy (draft in the demo data). */
export const SEED_PART_TIME: LeavePolicyItem[] = [
  { ...byCode('earned'), annualAllowance: 6, carryForwardDays: 2, allowanceBasis: 'Pro-rata', maxConsecutive: 10 },
  { ...byCode('casual'), annualAllowance: 3, approvalType: 'Auto', maxConsecutive: 2 },
  { ...byCode('sick'), annualAllowance: 4 },
  { ...byCode('loss-of-pay'), approvalType: 'Manager + HR' },
];
