#!/usr/bin/env node
/**
 * px -> rem codemod for the whole client.
 *
 *   node scripts/px-to-rem.mjs            # dry run: report what would change
 *   node scripts/px-to-rem.mjs --write    # rewrite files in place
 *   node scripts/px-to-rem.mjs --write --all   # also convert 1px / 2px hairlines
 *   node scripts/px-to-rem.mjs --check    # exit 1 if any convertible px is left (CI guard)
 *
 * Scope: every .scss / .css / .html file under src/ (app + all libs).
 * Handles SCSS/CSS declarations, inline style="..." and Tailwind arbitrary values
 * like text-[14px], p-[32px_48px], w-[calc(100%-24px)], min-[1231px]:.
 *
 * Deliberately NOT touched:
 *   - .ts files (runtime positioning like `${left}px` must stay px)
 *   - Angular unit bindings like [style.width.px]="..." (no number before 'px')
 *   - 0px (becomes 0) and 1px/2px hairlines (borders, rings, dividers) unless --all
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const BASE_FONT_SIZE = 16;
const EXTENSIONS = new Set(['.scss', '.css', '.html']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.angular', 'storybook-static', 'coverage']);

const args = new Set(process.argv.slice(2));
const WRITE = args.has('--write');
const CHECK = args.has('--check');
const ALL = args.has('--all');

// number immediately followed by px; not preceded by a letter/digit/dot/#/- (avoids hex, words, .px bindings)
const PX_PATTERN = /(?<![\w.#])(-?)(\d*\.?\d+)px\b/g;

function toRem(sign, raw) {
  const value = Number(raw);
  if (value === 0) return '0';
  if (!ALL && value <= 2) return null; // keep hairlines crisp
  const rem = Math.round((value / BASE_FONT_SIZE) * 10000) / 10000;
  return `${sign}${String(rem)}rem`;
}

function convert(content) {
  let count = 0;
  const next = content.replace(PX_PATTERN, (match, sign, raw) => {
    const replacement = toRem(sign, raw);
    if (replacement === null) return match;
    count += 1;
    return replacement;
  });
  return { next, count };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      walk(full, out);
    } else if (EXTENSIONS.has(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(SRC);
let totalFiles = 0;
let totalReplacements = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const { next, count } = convert(original);
  if (count === 0) continue;

  totalFiles += 1;
  totalReplacements += count;
  console.log(`${String(count).padStart(4)}  ${relative(ROOT, file)}`);

  if (WRITE) {
    writeFileSync(file, next, 'utf8');
  }
}

const verb = WRITE ? 'Converted' : 'Would convert';
console.log(`\n${verb} ${totalReplacements} px value(s) in ${totalFiles} file(s).`);
if (!WRITE && totalReplacements > 0 && !CHECK) {
  console.log('Run again with --write to apply.');
}

if (CHECK && totalReplacements > 0) {
  process.exit(1);
}
