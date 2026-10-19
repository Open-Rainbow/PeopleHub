import { Announcement } from 'common';
import {
  AnnouncementItem,
  AnnouncementPriority,
  AnnouncementStatus,
} from '../models/announcement.model';

const DAY_MS = 86_400_000;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Accepts yyyy-MM-dd, dd/MM/yyyy, ISO strings and Date objects. */
export function parseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : startOfDay(value);

  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (dmy) return new Date(+dmy[3], +dmy[2] - 1, +dmy[1]);

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : startOfDay(parsed);
}

/** Whole days from today (negative = in the past). */
export function daysUntil(value: string | null | undefined, today = new Date()): number | null {
  const date = parseDate(value);
  if (!date) return null;
  return Math.round((date.getTime() - startOfDay(today).getTime()) / DAY_MS);
}

export function statusOf(
  item: Pick<AnnouncementItem, 'publishOn' | 'expiresOn'>,
  today = new Date(),
): AnnouncementStatus {
  const now = startOfDay(today).getTime();
  const publish = parseDate(item.publishOn);
  const expiry = parseDate(item.expiresOn);
  if (publish && publish.getTime() > now) return 'Scheduled';
  if (expiry && expiry.getTime() < now) return 'Expired';
  return 'Active';
}

export function formatDate(value: string | null | undefined): string {
  const date = parseDate(value);
  return date
    ? date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';
}

export function relativeDay(value: string | null | undefined, today = new Date()): string {
  const days = daysUntil(value, today);
  if (days === null) return '';
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  return days > 0 ? `in ${days} days` : `${-days} days ago`;
}

export function initials(name: string | null | undefined): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
  return (first + last).toUpperCase();
}

export function normalizePriority(value: unknown): AnnouncementPriority {
  const text = String(value ?? '').toLowerCase();
  if (text === 'high' || text === '1') return 'High';
  if (text === 'low' || text === '3') return 'Low';
  return 'Medium';
}

/** Maps the old `Announcement` model (dd/MM/yyyy dates) used by the dashboard. */
export function fromLegacyAnnouncement(source: Announcement): AnnouncementItem {
  const publish = parseDate(source.postedDate) ?? startOfDay(new Date());
  const expiry = parseDate(source.expireDate) ?? parseDate(source.expireOn ?? null) ?? addDays(publish, 30);
  const priority = normalizePriority(source.priority || source.priorityDesc);
  return {
    id: source.announcementId,
    title: source.title,
    description: source.description ?? '',
    priority,
    category: source.category ?? 'General',
    department: source.department ?? 'All Departments',
    targetAudience: source.targetAudience ?? 'All Employees',
    publishOn: toIsoDate(publish),
    expiresOn: toIsoDate(expiry),
    postedBy: source.postedBy ?? 'HR Team',
    isPinned: priority === 'High',
    createdAt: publish.toISOString(),
  };
}

export function toCsv(rows: AnnouncementItem[]): string {
  const header = [
    'Title', 'Priority', 'Category', 'Department', 'Audience',
    'Publish on', 'Expires on', 'Status', 'Posted by', 'Pinned', 'Description',
  ];
  const escape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((row) =>
    [
      row.title, row.priority, row.category, row.department, row.targetAudience,
      row.publishOn, row.expiresOn, statusOf(row), row.postedBy, row.isPinned ? 'Yes' : 'No', row.description,
    ].map(escape).join(','),
  );
  return [header.map(escape).join(','), ...lines].join('\r\n');
}

export function downloadText(fileName: string, content: string, mimeType = 'text/csv;charset=utf-8'): void {
  const blob = new Blob(['\ufeff' + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
