import { DropdownOption } from 'common';
import { AnnouncementPriority, AnnouncementStatus } from '../../models/announcement.model';

export const PRIORITY_OPTIONS: DropdownOption[] = [
  { value: 1, name: 'High' },
  { value: 2, name: 'Medium' },
  { value: 3, name: 'Low' },
];

export const CATEGORY_OPTIONS: DropdownOption[] = [
  { value: 1, name: 'General' },
  { value: 2, name: 'Policy' },
  { value: 3, name: 'Event' },
  { value: 4, name: 'Holiday' },
  { value: 5, name: 'IT & Systems' },
  { value: 6, name: 'HR' },
  { value: 7, name: 'Celebration' },
  { value: 8, name: 'Training' },
];

export const DEPARTMENT_OPTIONS: DropdownOption[] = [
  { value: 1, name: 'All Departments' },
  { value: 2, name: 'Engineering' },
  { value: 3, name: 'Human Resources' },
  { value: 4, name: 'Finance' },
  { value: 5, name: 'Sales' },
  { value: 6, name: 'Marketing' },
  { value: 7, name: 'Operations' },
];

export const AUDIENCE_OPTIONS: DropdownOption[] = [
  { value: 1, name: 'All Employees' },
  { value: 2, name: 'Managers' },
  { value: 3, name: 'Team Leads' },
  { value: 4, name: 'New Joiners' },
  { value: 5, name: 'Admins' },
];

export function optionName(options: DropdownOption[], value: unknown): string {
  return options.find((option) => option.value === Number(value))?.name ?? '';
}

export function optionValue(options: DropdownOption[], name: string | null | undefined): number | null {
  const key = (name ?? '').trim().toLowerCase();
  return options.find((option) => option.name.toLowerCase() === key)?.value ?? null;
}

export interface PriorityStyle {
  chip: string;
  bar: string;
  dot: string;
  button: string;
}

export const PRIORITY_STYLES: Record<AnnouncementPriority, PriorityStyle> = {
  High: {
    chip: 'bg-red-50 text-red-700 ring-red-600/20',
    bar: 'bg-red-500',
    dot: 'bg-red-500',
    button: 'border-red-500 bg-red-50 text-red-700',
  },
  Medium: {
    chip: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    bar: 'bg-amber-400',
    dot: 'bg-amber-400',
    button: 'border-amber-500 bg-amber-50 text-amber-700',
  },
  Low: {
    chip: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    bar: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    button: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  },
};

export const STATUS_STYLES: Record<AnnouncementStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Scheduled: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Expired: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};
