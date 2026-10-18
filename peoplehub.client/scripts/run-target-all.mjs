import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Usage: node scripts/run-target-all.mjs <target> [libs|apps|all] [rootPrefix]
//   rootPrefix (optional) limits the run to projects whose root starts with it,
//   e.g. src/libs/shared. For the "build" target, library dependencies are
//   resolved from bare-alias imports and built first (topological order),
//   because libraries consume each other from dist/.
const [, , target, scopeArg, rootPrefix] = process.argv;
const scope = scopeArg || process.env.npm_config_scope || 'libs';

if (!target) {
  console.error('Usage: node scripts/run-target-all.mjs <target> [libs|apps|all] [rootPrefix]');
  process.exit(1);
}

const angularPath = path.join(process.cwd(), 'angular.json');
const workspace = JSON.parse(fs.readFileSync(angularPath, 'utf8'));
const allProjectNames = Object.keys(workspace.projects);

const selected = Object.entries(workspace.projects)
  .filter(([, p]) => {
    if (!p?.architect?.[target]) return false;
    if (rootPrefix && !(p.root || '').replace(/\\/g, '/').startsWith(rootPrefix)) return false;
    if (scope === 'all') return true;
    if (scope === 'libs') return p.projectType === 'library';
    if (scope === 'apps') return p.projectType === 'application';
    return false;
  })
  .map(([name]) => name)
  .sort();

if (selected.length === 0) {
  console.error(`No projects found for target=${target} scope=${scope}${rootPrefix ? ` root=${rootPrefix}` : ''}`);
  process.exit(1);
}

function listTsFiles(rootDir) {
  if (!rootDir || !fs.existsSync(rootDir)) return [];
  const files = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', 'dist', 'out-tsc'].includes(entry.name)) continue;
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') && !entry.name.endsWith('.stories.ts')) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const depCache = new Map();
function libDeps(projectName) {
  if (depCache.has(projectName)) return depCache.get(projectName);
  const sourceRoot = workspace.projects[projectName]?.sourceRoot;
  const deps = new Set();
  const importPattern = /(?:from\s+|import\s*\()\s*['"]([^'"]+)['"]/g;
  for (const filePath of listTsFiles(sourceRoot && path.join(process.cwd(), sourceRoot))) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const match of content.matchAll(importPattern)) {
      const specifier = match[1];
      if (!specifier || specifier.startsWith('.')) continue;
      for (const candidate of allProjectNames) {
        if (candidate !== projectName && (specifier === candidate || specifier.startsWith(`${candidate}/`))) {
          const p = workspace.projects[candidate];
          if (p?.projectType === 'library' && p?.architect?.[target]) deps.add(candidate);
          break;
        }
      }
    }
  }
  const result = [...deps].sort();
  depCache.set(projectName, result);
  return result;
}

let order = selected;
if (target === 'build') {
  const visiting = new Set();
  const visited = new Set();
  order = [];
  const visit = (name) => {
    if (visited.has(name)) return;
    if (visiting.has(name)) {
      console.error(`Circular library dependency detected at: ${name}`);
      process.exit(1);
    }
    visiting.add(name);
    if (workspace.projects[name]?.projectType === 'library') {
      for (const dep of libDeps(name)) visit(dep);
    }
    visiting.delete(name);
    visited.add(name);
    order.push(name);
  };
  // libraries first, then applications
  for (const name of selected.filter((n) => workspace.projects[n].projectType === 'library')) visit(name);
  for (const name of selected.filter((n) => workspace.projects[n].projectType !== 'library')) visit(name);
}

console.log(`Order: ${order.join(' -> ')}`);
const ngCliPath = path.join(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
for (const project of order) {
  console.log(`\n>> Running ${project}:${target}`);
  const result = spawnSync(process.execPath, [ngCliPath, 'run', `${project}:${target}`], { stdio: 'inherit' });
  if ((result.status ?? 1) !== 0) {
    console.error(`\n\u2716 ${project}:${target} failed`);
    process.exit(result.status ?? 1);
  }
}
console.log(`\n\u2714 ${order.length} project(s) completed: ${target}`);
