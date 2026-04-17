import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , target, scopeArg] = process.argv;
const scope = scopeArg || process.env.npm_config_scope || 'libs';

if (!target) {
  console.error('Usage: node scripts/run-target-all.mjs <target> [libs|apps|all]');
  process.exit(1);
}

const angularPath = path.join(process.cwd(), 'angular.json');
const workspace = JSON.parse(fs.readFileSync(angularPath, 'utf8'));

const projects = Object.entries(workspace.projects)
  .filter(([, p]) => {
    if (!p?.architect?.[target]) return false;
    if (scope === 'all') return true;
    if (scope === 'libs') return p.projectType === 'library';
    if (scope === 'apps') return p.projectType === 'application';
    return false;
  })
  .map(([name]) => name)
  .sort();

if (projects.length === 0) {
  console.error(`No projects found for target=${target} scope=${scope}`);
  process.exit(1);
}

const ngCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
for (const project of projects) {
  console.log(`\n>> Running ${project}:${target}`);
  const result = spawnSync(ngCmd, ['ng', 'run', `${project}:${target}`], { stdio: 'inherit' });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}
