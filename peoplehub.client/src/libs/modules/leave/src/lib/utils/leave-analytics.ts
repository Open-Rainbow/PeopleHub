import { AdminLeaveRequest, PeriodKey } from '../models/leave-admin.model';
import { WFH_CODE } from '../config/leave-policy';
import { addDaysIso, diffDays, eachDay, fromIso, toIso, todayIso } from './leave-date.utils';

/** Page size of every leave table. Pagination shows only when there are more rows than this. */
export const LEAVE_PAGE_SIZE = 6;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const isWfh = (r: { leaveType: string }) => r.leaveType === WFH_CODE;

/** Pending or approved: counts as booked time off. */
export const isActive = (r: { status: string }) => r.status === 'Pending' || r.status === 'Approved';

/** From / to for a period button. */
export function periodRange(key: PeriodKey, today = todayIso()): { from: string; to: string } {
  const d = fromIso(today)!;
  const y = d.getFullYear();
  const m = d.getMonth();
  switch (key) {
    case 'yesterday': {
      const day = addDaysIso(today, -1);
      return { from: day, to: day };
    }
    case 'wtd': {
      const back = (d.getDay() + 6) % 7; // Monday = 0
      return { from: addDaysIso(today, -back), to: today };
    }
    case 'mtd':
      return { from: toIso(new Date(y, m, 1)), to: today };
    case 'qtd':
      return { from: toIso(new Date(y, Math.floor(m / 3) * 3, 1)), to: today };
    case 'htd':
      return { from: toIso(new Date(y, m < 6 ? 0 : 6, 1)), to: today };
    case 'ytd':
      return { from: toIso(new Date(y, 0, 1)), to: today };
    default:
      return { from: today, to: today };
  }
}

interface Buckets {
  labels: string[];
  index: (iso: string) => number;
}

/** Days for short ranges, weeks up to ~4 months, months after that. Always at least 6 buckets. */
export function buckets(from: string, to: string): Buckets {
  const span = diffDays(from, to) + 1;
  if (span <= 31) {
    const start = span < 7 ? addDaysIso(to, -6) : from;
    const days = eachDay(start, to);
    return {
      labels: days.map((iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`),
      index: (iso) => days.indexOf(iso),
    };
  }
  if (span <= 120) {
    const count = Math.ceil(span / 7);
    return {
      labels: Array.from({ length: count }, (_, i) => {
        const iso = addDaysIso(from, i * 7);
        return `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;
      }),
      index: (iso) => (iso < from || iso > to ? -1 : Math.floor(diffDays(from, iso) / 7)),
    };
  }
  const a = fromIso(from)!;
  const b = fromIso(to)!;
  const count = (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth() + 1;
  return {
    labels: Array.from({ length: count }, (_, i) => {
      const dt = new Date(a.getFullYear(), a.getMonth() + i, 1);
      return `${MONTHS[dt.getMonth()]} ${String(dt.getFullYear()).slice(2)}`;
    }),
    index: (iso) => {
      const dt = fromIso(iso);
      if (!dt || iso < from || iso > to) return -1;
      return (dt.getFullYear() - a.getFullYear()) * 12 + dt.getMonth() - a.getMonth();
    },
  };
}

/** Bucket of a request: its start date, moved inside the range. */
function bucketOf(r: AdminLeaveRequest, from: string, to: string, b: Buckets): number {
  const iso = r.fromDate < from ? from : r.fromDate > to ? to : r.fromDate;
  return b.index(iso);
}

/** Leave rows on a given day (approved or pending). */
export function onDate(rows: AdminLeaveRequest[], iso: string): AdminLeaveRequest[] {
  return rows.filter((r) => r.status === 'Approved' && r.fromDate <= iso && r.toDate >= iso);
}

export interface Kpi {
  key: string;
  label: string;
  value: number;
  of: number;
  percent: number;
  color: string;
}

export function kpis(rows: AdminLeaveRequest[], headcount: number, referenceDate: string): Kpi[] {
  const today = onDate(rows, referenceDate);
  const peopleOnLeave = new Set(today.filter((r) => !isWfh(r)).map((r) => r.employeeId)).size;
  const peopleWfh = new Set(today.filter(isWfh).map((r) => r.employeeId)).size;
  const present = Math.max(headcount - peopleOnLeave, 0);
  const total = rows.filter((r) => r.status !== 'Cancelled').length;
  const count = (s: string) => rows.filter((r) => r.status === s).length;
  const pct = (v: number, of: number) => (of > 0 ? Math.round((v / of) * 100) : 0);
  return [
    { key: 'present', label: 'Present today', value: present, of: headcount, percent: pct(present, headcount), color: 'var(--color-primary)' },
    { key: 'leave', label: 'On leave', value: peopleOnLeave, of: headcount, percent: pct(peopleOnLeave, headcount), color: 'var(--color-danger)' },
    { key: 'wfh', label: 'Working from home', value: peopleWfh, of: headcount, percent: pct(peopleWfh, headcount), color: 'var(--color-primary-soft)' },
    { key: 'Pending', label: 'Pending requests', value: count('Pending'), of: total, percent: pct(count('Pending'), total), color: 'var(--color-warning)' },
    { key: 'Approved', label: 'Approved', value: count('Approved'), of: total, percent: pct(count('Approved'), total), color: 'var(--color-success)' },
    { key: 'Rejected', label: 'Rejected', value: count('Rejected'), of: total, percent: pct(count('Rejected'), total), color: 'var(--color-danger)' },
  ];
}

/** Weekly pattern: days off per weekday (Mon-Fri) for the last 4 weeks up to `to`. */
export function weeklyPattern(rows: AdminLeaveRequest[], to: string, wfh: boolean): { labels: string[]; series: { label: string; data: number[] }[] } {
  const end = fromIso(to)!;
  const monday = addDaysIso(to, -((end.getDay() + 6) % 7));
  const start = addDaysIso(monday, -21);
  const data = [0, 1, 2, 3].map(() => [0, 0, 0, 0, 0]);
  for (const r of rows) {
    if (!isActive(r) || isWfh(r) !== wfh) continue;
    const weight = r.dayPart && r.dayPart !== 'full' ? 0.5 : 1;
    for (const iso of eachDay(r.fromDate < start ? start : r.fromDate, r.toDate > to ? to : r.toDate)) {
      const dow = (fromIso(iso)!.getDay() + 6) % 7;
      if (dow > 4) continue;
      const week = Math.floor(diffDays(start, iso) / 7);
      if (week >= 0 && week < 4) data[week][dow] += weight;
    }
  }
  return {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: data.map((d, i) => ({ label: `Week ${i + 1}`, data: d })),
  };
}

export interface TypeTotal {
  code: string;
  label: string;
  days: number;
}

export function byType(rows: AdminLeaveRequest[], includeWfh = true): TypeTotal[] {
  const map = new Map<string, TypeTotal>();
  for (const r of rows) {
    if (!isActive(r) || (!includeWfh && isWfh(r))) continue;
    const t = map.get(r.leaveType) ?? { code: r.leaveType, label: r.leaveTypeLabel, days: 0 };
    t.days += r.days;
    map.set(r.leaveType, t);
  }
  return [...map.values()].sort((a, b) => b.days - a.days);
}

/** Days per bucket for each leave type (top `limit` types). */
export function trendByType(rows: AdminLeaveRequest[], from: string, to: string, limit = 5) {
  const b = buckets(from, to);
  const types = byType(rows).slice(0, limit);
  const series = types.map((t) => {
    const data = b.labels.map(() => 0);
    for (const r of rows) {
      if (r.leaveType !== t.code || !isActive(r)) continue;
      const i = bucketOf(r, from, to, b);
      if (i >= 0) data[i] += r.days;
    }
    return { code: t.code, label: t.label, data };
  });
  return { labels: b.labels, series };
}

/** Leave days, WFH days and total per bucket. */
export function leavesVsWfh(rows: AdminLeaveRequest[], from: string, to: string) {
  const b = buckets(from, to);
  const leaves = b.labels.map(() => 0);
  const wfh = b.labels.map(() => 0);
  for (const r of rows) {
    if (!isActive(r)) continue;
    const i = bucketOf(r, from, to, b);
    if (i < 0) continue;
    if (isWfh(r)) wfh[i] += r.days;
    else leaves[i] += r.days;
  }
  return { labels: b.labels, leaves, wfh, total: leaves.map((v, i) => v + wfh[i]) };
}

/** Requests per bucket by decision. */
export function approvalTrend(rows: AdminLeaveRequest[], from: string, to: string) {
  const b = buckets(from, to);
  const make = () => b.labels.map(() => 0);
  const approved = make();
  const pending = make();
  const rejected = make();
  for (const r of rows) {
    const i = bucketOf(r, from, to, b);
    if (i < 0) continue;
    if (r.status === 'Approved') approved[i]++;
    else if (r.status === 'Pending') pending[i]++;
    else if (r.status === 'Rejected') rejected[i]++;
  }
  return { labels: b.labels, approved, pending, rejected };
}

export function topEmployees(rows: AdminLeaveRequest[], wfh: boolean, limit = 8) {
  const map = new Map<string, { name: string; days: number }>();
  for (const r of rows) {
    if (!isActive(r) || isWfh(r) !== wfh) continue;
    const e = map.get(r.employeeId) ?? { name: r.employeeName, days: 0 };
    e.days += r.days;
    map.set(r.employeeId, e);
  }
  const top = [...map.values()].sort((a, b) => b.days - a.days).slice(0, limit);
  return { labels: top.map((e) => e.name), data: top.map((e) => e.days) };
}

function departments(rows: AdminLeaveRequest[]): string[] {
  return [...new Set(rows.map((r) => r.department || 'Unassigned'))].sort();
}

/** Leave days (WFH not included) per department. */
export function byDepartment(rows: AdminLeaveRequest[]) {
  const depts = departments(rows);
  const data = depts.map((d) => rows.filter((r) => isActive(r) && !isWfh(r) && (r.department || 'Unassigned') === d).reduce((n, r) => n + r.days, 0));
  return depts.map((d, i) => ({ department: d, days: data[i] })).filter((d) => d.days > 0).sort((a, b) => b.days - a.days);
}

/** Request count per department by decision (stacked bars). */
export function departmentStatus(rows: AdminLeaveRequest[]) {
  const depts = departments(rows);
  const count = (d: string, s: string) => rows.filter((r) => (r.department || 'Unassigned') === d && r.status === s).length;
  return {
    labels: depts,
    approved: depts.map((d) => count(d, 'Approved')),
    pending: depts.map((d) => count(d, 'Pending')),
    rejected: depts.map((d) => count(d, 'Rejected')),
  };
}

/** Days per department split by leave type (stacked bars). */
export function typeByDepartment(rows: AdminLeaveRequest[], limit = 6) {
  const depts = departments(rows);
  const types = byType(rows).slice(0, limit);
  return {
    labels: depts,
    series: types.map((t) => ({
      code: t.code,
      label: t.label,
      data: depts.map((d) => rows.filter((r) => isActive(r) && r.leaveType === t.code && (r.department || 'Unassigned') === d).reduce((n, r) => n + r.days, 0)),
    })),
  };
}

/** CSV text from rows (quotes fields, blocks spreadsheet formulas). */
export function toCsv(header: string[], rows: (string | number | null | undefined)[][]): string {
  const cell = (v: string | number | null | undefined) => {
    let s = v === null || v === undefined ? '' : String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [header, ...rows].map((r) => r.map(cell).join(',')).join('\r\n');
}

/** Starts a file download in the browser. */
export function downloadText(doc: Document, filename: string, text: string, type = 'text/csv'): void {
  const blob = new Blob(['\ufeff' + text], { type });
  const url = URL.createObjectURL(blob);
  const a = doc.createElement('a');
  a.href = url;
  a.download = filename;
  doc.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Rows of one page (1-based). */
export function pageOf<T>(rows: T[], page: number, size = LEAVE_PAGE_SIZE): T[] {
  return rows.slice((page - 1) * size, page * size);
}
