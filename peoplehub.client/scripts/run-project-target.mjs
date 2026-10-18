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

function listTsFiles(rootDir) {
  if (!rootDir || !fs.existsSync(rootDir)) return [];

  const files = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'out-tsc') {
          continue;
        }
        stack.push(fullPath);
        continue;
      }

      if (
        entry.isFile() &&
        entry.name.endsWith('.ts') &&
        !entry.name.endsWith('.spec.ts') &&
        !entry.name.endsWith('.stories.ts')
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function extractProjectDeps(projectName, allProjectNames) {
  const projectConfig = workspace.projects[projectName];
  const sourceRoot = projectConfig?.sourceRoot;
  if (!sourceRoot) return [];

  const tsFiles = listTsFiles(path.join(process.cwd(), sourceRoot));
  const deps = new Set();
  const importPattern = /(?:from\s+|import\s*\()\s*['\"]([^'\"]+)['\"]/g;

  for (const filePath of tsFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    for (const match of content.matchAll(importPattern)) {
      const specifier = match[1];
      if (!specifier || specifier.startsWith('.')) {
        continue;
      }

      for (const candidate of allProjectNames) {
        if (specifier === candidate || specifier.startsWith(`${candidate}/`)) {
          if (candidate !== projectName) {
            deps.add(candidate);
          }
          break;
        }
      }
    }
  }

  return [...deps];
}

function resolveBuildOrder(rootProject) {
  const projectNames = Object.keys(workspace.projects);
  const visiting = new Set();
  const visited = new Set();
  const order = [];

  function visit(name) {
    if (visited.has(name)) return;
    if (visiting.has(name)) {
      console.error(`Circular dependency detected while resolving project dependencies at: ${name}`);
      process.exit(1);
    }

    visiting.add(name);
    const deps = extractProjectDeps(name, projectNames)
      .filter((depName) => workspace.projects[depName]?.projectType === 'library')
      .filter((depName) => !!workspace.projects[depName]?.architect?.[target]);

    for (const dep of deps) {
      visit(dep);
      if (!order.includes(dep)) {
        order.push(dep);
      }
    }

    visiting.delete(name);
    visited.add(name);
  }

  visit(rootProject);
  return order;
}

function runProjectTarget(projectName) {
  console.log(`\n>> Running ${projectName}:${target}`);
  const result = spawnSync(process.execPath, [ngCliPath, 'run', `${projectName}:${target}`], { stdio: 'inherit' });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (target === 'build' && workspace.projects[project]?.projectType === 'library') {
  const dependencyBuildOrder = resolveBuildOrder(project);
  for (const depProject of dependencyBuildOrder) {
    runProjectTarget(depProject);
  }
}

const result = spawnSync(process.execPath, [ngCliPath, 'run', `${project}:${target}`], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
