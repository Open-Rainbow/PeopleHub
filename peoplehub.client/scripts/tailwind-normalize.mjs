#!/usr/bin/env node
/**
 * Tailwind normaliser: replaces arbitrary length values with Tailwind v4 scale utilities.
 *
 *   node scripts/tailwind-normalize.mjs           # dry run (report only)
 *   node scripts/tailwind-normalize.mjs --write   # rewrite files
 *
 * Examples
 *   text-[12px] / text-[0.75rem]   -> text-xs
 *   p-[16px]                       -> p-4
 *   gap-[10px]                     -> gap-2.5
 *   md:px-[24px]                   -> md:px-6
 *   -mt-[8px]                      -> -mt-2
 *   rounded-[8px]                  -> rounded-lg
 *   leading-[24px]                 -> leading-6
 *   w-[36px] h-[36px]              -> w-9 h-9
 *
 * Spacing uses Tailwind v4's 0.25rem step (n = px / 4). Only values that land on a
 * half step (2px increments) are converted; anything else (e.g. 7px) stays arbitrary
 * and is listed at the end so a human can pick the nearest scale value.
 *
 * Also lists every inline style="..." attribute so they can be moved to classes.
 * Scope: .html and .ts files under src/ (class strings in TS are matched too).
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const EXTENSIONS = new Set(['.html', '.ts']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.angular', 'storybook-static', 'coverage']);
const WRITE = process.argv.includes('--write');

const SPACING_UTILITIES = [
  'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'ps', 'pe',
  'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml', 'ms', 'me',
  'gap', 'gap-x', 'gap-y', 'space-x', 'space-y',
  'w', 'h', 'size', 'min-w', 'min-h', 'max-w', 'max-h',
  'top', 'right', 'bottom', 'left', 'inset', 'inset-x', 'inset-y', 'start', 'end',
  'translate-x', 'translate-y', 'scroll-m', 'scroll-p', 'indent', 'basis', 'leading',
];

const FONT_SIZES = { 12: 'xs', 14: 'sm', 16: 'base', 18: 'lg', 20: 'xl', 24: '2xl', 30: '3xl', 36: '4xl', 48: '5xl', 60: '6xl' };
const RADII = { 0: 'none', 2: 'xs', 4: 'sm', 6: 'md', 8: 'lg', 12: 'xl', 16: '2xl', 24: '3xl', 9999: 'full' };

const utilityAlternation = [...SPACING_UTILITIES]
  .sort((a, b) => b.length - a.length)
  .map((u) => u.replace(/-/g, '\\-'))
  .join('|');

// (variants)(!)(-)(utility)-[(number)(unit)]
const SPACING_RE = new RegExp(
  `(?<=^|[\\s"'\`{])((?:[\\w-]+:)*)(!?)(-?)(${utilityAlternation})-\\[(\\d*\\.?\\d+)(px|rem)\\]`,
  'g',
);
const TEXT_RE = /(?<=^|[\s"'`{])((?:[\w-]+:)*)(!?)text-\[(\d*\.?\d+)(px|rem)\]/g;
const RADIUS_RE = /(?<=^|[\s"'`{])((?:[\w-]+:)*)(!?)rounded(-(?:t|r|b|l|s|e|tl|tr|br|bl|ss|se|es|ee))?-\[(\d*\.?\d+)(px|rem)\]/g;
const LEFTOVER_RE = /(?<=^|[\s"'`{])(?:[\w-]+:)*!?-?[a-z][\w-]*-\[-?\d*\.?\d+(?:px|rem)\]/g;
const INLINE_STYLE_RE = /\sstyle="[^"]*"/g;

const toPx = (value, unit) => (unit === 'rem' ? Number(value) * 16 : Number(value));
const fmt = (n) => String(Math.round(n * 100) / 100);

function normalise(source) {
  let count = 0;

  let next = source.replace(TEXT_RE, (match, variants, important, value, unit) => {
    const name = FONT_SIZES[toPx(value, unit)];
    if (!name) return match;
    count += 1;
    return `${variants}${important}text-${name}`;
  });

  next = next.replace(RADIUS_RE, (match, variants, important, side = '', value, unit) => {
    const name = RADII[toPx(value, unit)];
    if (!name) return match;
    count += 1;
    return `${variants}${important}rounded${side}-${name}`;
  });

  next = next.replace(SPACING_RE, (match, variants, important, negative, utility, value, unit) => {
    const px = toPx(value, unit);
    if (px === 0) {
      count += 1;
      return `${variants}${important}${utility}-0`;
    }
    if (px === 1) {
      count += 1;
      return `${variants}${important}${negative}${utility}-px`;
    }
    const step = px / 4;
    if (!Number.isInteger(step * 2)) return match; // only whole/half steps
    count += 1;
    return `${variants}${important}${negative}${utility}-${fmt(step)}`;
  });

  return { next, count };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(extname(entry)) && !entry.endsWith('.spec.ts')) out.push(full);
  }
  return out;
}

let changedFiles = 0;
let changedTokens = 0;
const leftovers = [];
const inlineStyles = [];

for (const file of walk(SRC)) {
  const original = readFileSync(file, 'utf8');
  const { next, count } = normalise(original);
  const rel = relative(ROOT, file);

  if (count > 0) {
    changedFiles += 1;
    changedTokens += count;
    console.log(`${String(count).padStart(4)}  ${rel}`);
    if (WRITE) writeFileSync(file, next, 'utf8');
  }

  const remaining = next.match(LEFTOVER_RE) ?? [];
  if (remaining.length) leftovers.push([rel, [...new Set(remaining)]]);

  if (file.endsWith('.html')) {
    const styles = next.match(INLINE_STYLE_RE) ?? [];
    if (styles.length) inlineStyles.push([rel, styles.length]);
  }
}

console.log(`\n${WRITE ? 'Rewrote' : 'Would rewrite'} ${changedTokens} class(es) in ${changedFiles} file(s).`);

if (leftovers.length) {
  console.log('\nArbitrary values with no exact Tailwind scale match (pick the nearest by hand):');
  for (const [rel, tokens] of leftovers) console.log(`  ${rel}\n    ${tokens.join('  ')}`);
}

if (inlineStyles.length) {
  console.log('\nInline style="..." attributes to move into Tailwind classes:');
  for (const [rel, n] of inlineStyles) console.log(`  ${String(n).padStart(3)}  ${rel}`);
}

if (!WRITE && changedTokens > 0) console.log('\nRun with --write to apply.');
