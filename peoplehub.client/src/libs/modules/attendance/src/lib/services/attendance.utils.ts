import { AttendanceDay, AttendancePolicy, RegularizationDraft, RegularizationErrors } from '../models/attendance.model';
import { ATTENDANCE_LIMITS } from '../config/attendance-options';

/** Local calendar date `YYYY-MM-DD` (no UTC shift). */
export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Local date-time `YYYY-MM-DDTHH:mm:ss` (no UTC shift). */
export function isoDateTime(d: Date): string {
  return `${isoDate(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Parses `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]` as local time (never UTC). */
export function parseLocal(value: string): Date {
  const [d, t = '00:00:00'] = value.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [h, mi, s] = t.split(':').map((x) => Number(x) || 0);
  return new Date(y, (m || 1) - 1, day || 1, h || 0, mi || 0, s || 0);
}

export function addDays(date: string, days: number): string {
  const d = parseLocal(date);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

export function isWeekend(date: string): boolean {
  const day = parseLocal(date).getDay();
  return day === 0 || day === 6;
}

/** `09:41` from `2026-10-19T09:41:00`, or a dash. */
export function clock(value: string | null | undefined): string {
  return value && value.length >= 16 ? value.slice(11, 16) : '—';
}

/** `7h 45m` */
export function duration(minutes: number | null | undefined): string {
  if (minutes === null || minutes === undefined || minutes < 0) return '—';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h ? `${h}h ${pad(m)}m` : `${m}m`;
}

export function minutesOf(hhmm: string): number | null {
  const match = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(hhmm.trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

/** Mirrors att.fn_days for offline demo data. */
export function dayStatus(
  date: string,
  today: string,
  record: { checkInAt: string; checkOutAt: string | null } | undefined,
  workedMinutes: number | null,
  policy: AttendancePolicy,
  holiday: string | undefined,
): AttendanceDay['status'] {
  if (record) {
    if (!record.checkOutAt) return date === today ? 'Working' : 'Missed check-out';
    const worked = workedMinutes ?? 0;
    if (worked >= policy.fullDayHours * 60) return 'Present';
    if (worked >= policy.halfDayHours * 60) return 'Half day';
    return 'Short day';
  }
  if (isWeekend(date)) return 'Weekend';
  if (holiday) return 'Holiday';
  if (date > today) return 'Upcoming';
  if (date === today) return 'Not checked in';
  return 'Absent';
}

export function isLate(checkInAt: string | null, policy: AttendancePolicy): boolean {
  if (!checkInAt) return false;
  const start = minutesOf(policy.shiftStart) ?? 570;
  const d = parseLocal(checkInAt);
  return d.getHours() * 60 + d.getMinutes() > start + policy.graceMinutes;
}

/** Same rules as RegularizationRequestValidator + sp_att_request_regularization. `now` = org local time. */
export function validateRegularization(draft: RegularizationDraft, now: Date, windowDays: number): RegularizationErrors {
  const errors: RegularizationErrors = {};
  const today = isoDate(now);
  if (!draft.workDate) errors.workDate = 'Pick the day to correct.';
  else if (draft.workDate > today) errors.workDate = 'You can only correct today or past days.';
  else if (draft.workDate < addDays(today, -windowDays)) errors.workDate = `Corrections are allowed for the last ${windowDays} days only.`;

  const start = minutesOf(draft.checkIn);
  const end = minutesOf(draft.checkOut);
  if (start === null) errors.checkIn = 'Enter a check-in time like 09:30.';
  if (end === null) errors.checkOut = 'Enter a check-out time like 18:30.';
  else if (start !== null && end <= start) errors.checkOut = 'Check-out must be after check-in.';
  else if (draft.workDate === today && end > now.getHours() * 60 + now.getMinutes()) errors.checkOut = 'Check-out time is still in the future.';

  const reason = draft.reason.trim();
  if (!reason) errors.reason = 'Tell your manager what happened.';
  else if (reason.length < ATTENDANCE_LIMITS.reasonMin) errors.reason = `At least ${ATTENDANCE_LIMITS.reasonMin} characters.`;
  else if (reason.length > ATTENDANCE_LIMITS.reasonMax) errors.reason = `Keep it under ${ATTENDANCE_LIMITS.reasonMax} characters.`;
  return errors;
}

export function toCsv(rows: (string | number)[][]): string {
  return rows
    .map((r) => r.map((v) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(','))
    .join('\n');
}
