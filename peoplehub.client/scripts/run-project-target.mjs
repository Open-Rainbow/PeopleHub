import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , target, ...restArgs] = process.argv;

if (!target) {
  console.error('Usage: node scripts/run-project-target.mjs <target> <project>');
  process.exit(1);
}

function resolveProjectArg(args) {
  const projectFlag = args.find((arg) => arg.startsWith('--project='));
  if (projectFlag) {
    return projectFlag.split('=')[1];
  }

  const projectFlagIndex = args.findIndex((arg) => arg === '--project');
  if (projectFlagIndex >= 0 && args[projectFlagIndex + 1]) {
    return args[projectFlagIndex + 1];
  }

  const positional = args.find((arg) => !arg.startsWith('--'));
  return positional;
}

const project = resolveProjectArg(restArgs) || process.env.npm_config_project;
if (!project) {
  console.error('Missing project. Pass as second arg or --project=<name>.');
  process.exit(1);
}

const angularPath = path.join(process.cwd(), 'angular.json');
const workspace = JSON.parse(fs.readFileSync(angularPath, 'utf8'));

if (!workspace.projects?.[project]) {
  console.error(`Project not found: ${project}`);
  process.exit(1);
}

const hasTarget = workspace.projects[project]?.architect?.[target];
if (!hasTarget) {
  console.error(`Target not found: ${project}:${target}`);
  process.exit(1);
}

const ngCliPath = path.join(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
const result = spawnSync(process.execPath, [ngCliPath, 'run', `${project}:${target}`], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
