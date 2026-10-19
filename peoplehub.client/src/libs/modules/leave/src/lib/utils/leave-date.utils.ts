import { LEAVE_HOLIDAYS } from '../config/leave-policy';
import { DayPart } from '../models/leave-request.model';

const DAY_MS = 86_400_000;

export function todayIso(now = new Date()): string {
  return toIso(now);
}

export function toIso(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function fromIso(value: string | null | undefined): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
  return match ? new Date(+match[1], +match[2] - 1, +match[3]) : null;
}

export function addDaysIso(value: string, days: number): string {
  const date = fromIso(value) ?? new Date();
  date.setDate(date.getDate() + days);
  return toIso(date);
}

export function diffDays(from: string, to: string): number {
  const a = fromIso(from);
  const b = fromIso(to);
  return a && b ? Math.round((b.getTime() - a.getTime()) / DAY_MS) : 0;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function holidayName(iso: string, holidays = LEAVE_HOLIDAYS): string | null {
  return holidays[iso] ?? null;
}

/** Each date in the range, inclusive. Empty when the range is invalid. */
export function eachDay(from: string, to: string): string[] {
  const start = fromIso(from);
  const end = fromIso(to);
  if (!start || !end || end < start) return [];
  const days: string[] = [];
  for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    days.push(toIso(cursor));
  }
  return days;
}

/** Working days in the range (weekends + holidays skipped). Half day = 0.5. */
export function workingDays(from: string, to: string, dayPart: DayPart = 'full', holidays = LEAVE_HOLIDAYS): number {
  const count = eachDay(from, to).filter((iso) => !isWeekend(fromIso(iso)!) && !holidays[iso]).length;
  return dayPart !== 'full' && from === to ? count * 0.5 : count;
}

/** Holidays and weekends inside the range, for the "skipped" hint. */
export function skippedDays(from: string, to: string, holidays = LEAVE_HOLIDAYS): { weekends: number; holidays: string[] } {
  let weekends = 0;
  const names: string[] = [];
  for (const iso of eachDay(from, to)) {
    if (isWeekend(fromIso(iso)!)) weekends++;
    else if (holidays[iso]) names.push(holidays[iso]);
  }
  return { weekends, holidays: names };
}

export function rangesOverlap(aFrom: string, aTo: string, bFrom: string, bTo: string): boolean {
  return aFrom <= bTo && bFrom <= aTo;
}

export function formatDay(iso: string | null | undefined, withYear = false): string {
  const date = fromIso(iso);
  if (!date) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {}),
  });
}

export function formatRange(from: string, to: string): string {
  if (from === to) return formatDay(from, true);
  const sameYear = from.slice(0, 4) === to.slice(0, 4);
  return `${formatDay(from, !sameYear)} – ${formatDay(to, true)}`;
}

export function weekdayName(iso: string): string {
  return fromIso(iso)?.toLocaleDateString('en-GB', { weekday: 'short' }) ?? '';
}

export function formatDays(days: number): string {
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}
