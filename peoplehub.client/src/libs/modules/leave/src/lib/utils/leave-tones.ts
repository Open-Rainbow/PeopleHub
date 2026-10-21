/**
 * Colours for the leave screens. Only theme-tokens.css variables (and color-mix of them),
 * so every chip, ring and chart follows the light / dark theme.
 */
export type Tone = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface ToneColors {
  /** Text colour on a soft background. */
  color: string;
  /** Soft background. */
  bg: string;
  /** Solid colour (bars, rings, dots). */
  solid: string;
}

export function toneOf(solid: string): ToneColors {
  return {
    color: `color-mix(in srgb, ${solid} 80%, var(--color-text-primary))`,
    bg: `color-mix(in srgb, ${solid} 14%, transparent)`,
    solid,
  };
}

export const TONES: Record<Tone, ToneColors> = {
  primary: toneOf('var(--color-primary)'),
  info: toneOf('var(--color-primary-soft)'),
  success: toneOf('var(--color-success)'),
  warning: toneOf('var(--color-warning)'),
  danger: toneOf('var(--color-danger)'),
  neutral: { color: 'var(--color-text-secondary)', bg: 'var(--color-surface-muted)', solid: 'var(--color-text-secondary)' },
};

/** Same order as UI_CHART_PALETTE in the ui library, so cards and charts match. */
export const SERIES_COLORS: readonly string[] = [
  'var(--color-primary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-danger)',
  'color-mix(in srgb, var(--color-primary) 55%, var(--color-danger))',
  'color-mix(in srgb, var(--color-success) 50%, var(--color-primary))',
  'color-mix(in srgb, var(--color-warning) 50%, var(--color-danger))',
  'var(--color-primary-soft)',
  'color-mix(in srgb, var(--color-success) 50%, var(--color-warning))',
  'var(--color-text-secondary)',
];

/** Fixed colour per well-known leave type; other types take the next free colour. */
const TYPE_SLOTS: Record<string, number> = {
  earned: 0,
  annual: 0,
  wfh: 1,
  casual: 2,
  sick: 3,
  maternity: 4,
  'comp-off': 5,
  study: 6,
  paternity: 7,
  sabbatical: 8,
  'loss-of-pay': 9,
  unpaid: 9,
};

export function typeColor(code: string, index = 0): string {
  const slot = TYPE_SLOTS[code];
  return SERIES_COLORS[(slot ?? index) % SERIES_COLORS.length];
}

export function typeTone(code: string, index = 0): ToneColors {
  return toneOf(typeColor(code, index));
}

export const STATUS_TONES: Record<string, Tone> = {
  New: 'info',
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'danger',
  Cancelled: 'neutral',
};

export function statusTone(status: string): ToneColors {
  return TONES[STATUS_TONES[status] ?? 'neutral'];
}

/** Inputs for ui-notice-banner. */
export function bannerTone(t: Tone) {
  const c = TONES[t];
  return {
    bannerColor: `color-mix(in srgb, ${c.solid} 10%, var(--color-surface))`,
    headingColor: c.color,
    contentColor: 'var(--color-text-primary)',
    highlighterColor: c.solid,
    iconColor: c.solid,
  };
}

const AVATAR_TONES: Tone[] = ['primary', 'success', 'warning', 'info', 'danger'];

export function avatarTone(name: string): ToneColors {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[AVATAR_TONES[h % AVATAR_TONES.length]];
}

export function initials(name: string): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase() || '?';
}

/** Ring colour for a usage percentage: green, then amber, then red. */
export function usageColor(percent: number): string {
  return percent >= 75 ? 'var(--color-danger)' : percent >= 50 ? 'var(--color-warning)' : 'var(--color-success)';
}
