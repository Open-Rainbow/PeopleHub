import { POLICY_FIELD_LABELS, POLICY_LIMITS } from '../config/leave-policy-options';
import { LeavePolicyItem, PolicyCategory, PolicyChange, PolicyItemErrors } from '../models/leave-policy.model';

/** "Bereavement Leave" -> "bereavement-leave" (same rule as LeavePolicyRules.Slugify on the server). */
export function slugify(label: string): string {
  let slug = label.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (slug.length > 20) slug = slug.slice(0, 20).replace(/-+$/, '');
  return slug.length >= 2 ? slug : `type-${slug}`.replace(/-+$/, '');
}

/** Unique code for a new type, given the codes already in the policy. */
export function uniqueCode(label: string, taken: string[]): string {
  const base = slugify(label);
  let code = base;
  for (let n = 2; taken.includes(code); n++) {
    const suffix = `-${n}`;
    code = (base.length + suffix.length > 20 ? base.slice(0, 20 - suffix.length) : base) + suffix;
  }
  return code;
}

export function emptyItem(category: PolicyCategory = 'standard'): LeavePolicyItem {
  return {
    code: '',
    label: '',
    description: '',
    category,
    annualAllowance: category === 'parental' ? 5 : 6,
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
  };
}

const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

/** Field errors for one item (same rules as LeavePolicyItemValidator). `others` = the rest of the policy. */
export function validateItem(item: LeavePolicyItem, others: LeavePolicyItem[]): PolicyItemErrors {
  const e: PolicyItemErrors = {};
  const label = item.label.trim();
  if (!label) e.label = 'Give the leave type a name.';
  else if (label.length > POLICY_LIMITS.labelMax) e.label = `Keep the name under ${POLICY_LIMITS.labelMax} characters.`;
  else if (others.some((o) => o.label.trim().toLowerCase() === label.toLowerCase())) e.label = 'Another leave type already has this name.';

  if (item.code && !/^[a-z0-9-]{2,20}$/.test(item.code)) e.code = 'Use 2-20 lowercase letters, digits or hyphens.';
  else if (item.code && others.some((o) => o.code === item.code)) e.code = 'Another leave type already uses this code.';

  if (item.description.length > POLICY_LIMITS.descriptionMax) e.description = `Keep it under ${POLICY_LIMITS.descriptionMax} characters.`;

  if (item.annualAllowance === null) {
    if (item.isPaid) e.annualAllowance = 'Paid leave needs an allowance. Only unpaid leave can be unlimited.';
  } else if (!isNum(item.annualAllowance) || item.annualAllowance < 0 || item.annualAllowance > POLICY_LIMITS.allowanceMax) {
    e.annualAllowance = `Enter 0 to ${POLICY_LIMITS.allowanceMax} days.`;
  }

  if (!isNum(item.carryForwardDays) || item.carryForwardDays < 0) e.carryForwardDays = 'Enter 0 or more days.';
  else if (item.annualAllowance !== null && item.carryForwardDays > item.annualAllowance) e.carryForwardDays = "Can't carry forward more than the allowance.";

  if (item.mustBeTakenWithinMonths !== null && (!isNum(item.mustBeTakenWithinMonths) || item.mustBeTakenWithinMonths < 1 || item.mustBeTakenWithinMonths > POLICY_LIMITS.monthsMax)) {
    e.mustBeTakenWithinMonths = `Enter 1 to ${POLICY_LIMITS.monthsMax} months, or leave empty.`;
  }

  if (item.certificateRequired) {
    if (!isNum(item.certificateAfterDays)) e.certificateAfterDays = 'After how many days is a certificate needed?';
    else if (item.certificateAfterDays < 0.5 || item.certificateAfterDays > 365) e.certificateAfterDays = 'Enter 0.5 to 365 days.';
  }

  if (!isNum(item.backdateDays) || item.backdateDays < 0 || item.backdateDays > POLICY_LIMITS.backdateMax) {
    e.backdateDays = `Enter 0 to ${POLICY_LIMITS.backdateMax} days.`;
  }

  if (item.maxConsecutive !== null && (!isNum(item.maxConsecutive) || item.maxConsecutive < 0.5 || item.maxConsecutive > 365)) {
    e.maxConsecutive = 'Enter 0.5 to 365 days, or leave empty.';
  }

  if (item.isEncashable && !item.isPaid) e.isEncashable = "Unpaid leave can't be encashed.";
  return e;
}

/** Whole-policy problems (empty list = OK to save). */
export function validatePolicy(items: LeavePolicyItem[]): string[] {
  const problems: string[] = [];
  if (items.length > POLICY_LIMITS.maxItems) problems.push(`A policy can have at most ${POLICY_LIMITS.maxItems} leave types.`);
  items.forEach((item, i) => {
    const errors = validateItem(item, items.filter((_, j) => j !== i));
    const first = Object.values(errors)[0];
    if (first) problems.push(`${item.label || 'Unnamed leave'}: ${first}`);
  });
  return problems;
}

const COMPARED = Object.keys(POLICY_FIELD_LABELS) as (keyof LeavePolicyItem)[];

/** What changed between the published version and the working copy. */
export function diffPolicies(current: LeavePolicyItem[], published: LeavePolicyItem[]): PolicyChange[] {
  const changes: PolicyChange[] = [];
  for (const item of current) {
    const before = published.find((p) => p.code && p.code === item.code);
    if (!before) {
      changes.push({ code: item.code, label: item.label, kind: 'added', fields: [] });
      continue;
    }
    const fields = COMPARED.filter((f) => normalize(item[f]) !== normalize(before[f])).map((f) => POLICY_FIELD_LABELS[f]!);
    if (fields.length > 0) changes.push({ code: item.code, label: item.label, kind: 'changed', fields });
  }
  for (const before of published) {
    if (!current.some((c) => c.code === before.code)) {
      changes.push({ code: before.code, label: before.label, kind: 'removed', fields: [] });
    }
  }
  return changes;
}

export function sameItems(a: LeavePolicyItem[], b: LeavePolicyItem[]): boolean {
  return JSON.stringify(a.map(canonical)) === JSON.stringify(b.map(canonical));
}

function canonical(item: LeavePolicyItem): unknown[] {
  return [item.code, ...COMPARED.map((f) => normalize(item[f]))];
}

function normalize(v: unknown): string {
  if (v === null || v === undefined || v === '') return '';
  return typeof v === 'string' ? v.trim() : String(v);
}

/** "12 days", "Unlimited", "0.5 day". */
export function daysLabel(days: number | null): string {
  if (days === null) return 'Unlimited';
  return `${days} ${days === 1 || days === 0.5 ? 'day' : 'days'}`;
}
