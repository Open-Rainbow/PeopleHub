import type { DropdownOption } from '../models/value-configs/dropdown-option.model';
import { CHIP_VARIANT_PALETTE, ChipVariant } from '../models/component-models/chip.types';

/**
 * Small adapters so feature modules can feed plain strings / ISO dates into the shared controls
 * (ui-dropdown works with numeric option values, ui-calendar with dd-MM-yyyy strings).
 */

/** ['Office', 'Remote'] -> [{ value: 1, name: 'Office' }, { value: 2, name: 'Remote' }] */
export function toDropdownOptions(labels: readonly string[], startAt = 1): DropdownOption[] {
  return labels.map((name, index) => ({ value: index + startAt, name }));
}

/** Option value for a label (null when not found). */
export function optionValueOf(options: readonly DropdownOption[], label: string | null | undefined): number | null {
  return options.find((o) => o.name === label)?.value ?? null;
}

/** Label for an option value ('' when not found). */
export function optionLabelOf(options: readonly DropdownOption[], value: unknown): string {
  return options.find((o) => o.value === value)?.name ?? '';
}

/** 2026-10-19 -> 19-10-2026 (ui-calendar format). */
export function isoToCalendar(iso: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? '');
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

/** 19-10-2026 -> 2026-10-19 (empty when invalid). */
export function calendarToIso(value: string | null | undefined): string {
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec((value ?? '').trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

/** "09:30 AM" / "21:05" / "21:05:00" -> "21:05" (empty when invalid). */
export function timeTo24h(value: string | null | undefined): string {
  const m = /^\s*(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?\s*$/i.exec(value ?? '');
  if (!m) return '';
  let h = Number(m[1]);
  const suffix = m[3]?.toUpperCase();
  if (suffix) h = (h % 12) + (suffix === 'PM' ? 12 : 0);
  return h > 23 || Number(m[2]) > 59 ? '' : `${String(h).padStart(2, '0')}:${m[2]}`;
}

/** Colours for a non-interactive ui-chip (no hover colour change). */
export function staticChip(variant: ChipVariant): { variant: ChipVariant; bg: string; color: string } {
  const p = CHIP_VARIANT_PALETTE[variant];
  return { variant, bg: p.background, color: p.text };
}
