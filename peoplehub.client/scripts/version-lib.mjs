import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`File not found: ${filePath}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function parseArgs(argv) {
  const args = { positional: [] };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (!token.startsWith('--')) {
      args.positional.push(token);
      continue;
    }

    const [key, inlineValue] = token.split('=');
    const next = argv[i + 1];
    const hasNextValue = typeof next === 'string' && !next.startsWith('--');

    switch (key) {
      case '--project':
      case '--bump':
      case '--version':
      case '--tag':
      case '--registry':
      case '--access': {
        const value = inlineValue ?? (hasNextValue ? next : undefined);
        if (!value) {
          fail(`Missing value for ${key}`);
        }
        if (!inlineValue && hasNextValue) {
          i += 1;
        }
        args[key.slice(2)] = value;
        break;
      }
      case '--publish':
      case '--dry-run':
      case '--skip-build': {
        args[key.slice(2)] = true;
        break;
      }
      default:
        fail(`Unknown argument: ${token}`);
    }
  }

  return args;
}

function bumpVersion(currentVersion, bumpType) {
  const semverMatch = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(currentVersion);
  if (!semverMatch) {
    fail(`Unsupported current version format: ${currentVersion}`);
  }

  let major = Number(semverMatch[1]);
  let minor = Number(semverMatch[2]);
  let patch = Number(semverMatch[3]);

  switch (bumpType) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      return `${major}.${minor}.${patch}`;
    case 'minor':
      minor += 1;
      patch = 0;
      return `${major}.${minor}.${patch}`;
    case 'patch':
      patch += 1;
      return `${major}.${minor}.${patch}`;
    default:
      fail(`Unsupported bump type: ${bumpType}`);
  }
}

function getProjectName(args) {
  if (args.project) {
    return args.project;
  }

  const positionalProject = args.positional.find((arg) => !['major', 'minor', 'patch'].includes(arg));
  if (positionalProject) {
    return positionalProject;
  }

  return process.env.npm_config_project;
}

function getBumpType(args) {
  if (args.bump) {
    return args.bump;
  }

  const positionalBump = args.positional.find((arg) => ['major', 'minor', 'patch'].includes(arg));
  return positionalBump || process.env.npm_config_bump || 'patch';
}

function runCommand(command, commandArgs, options = {}) {
  const result = spawnSync(command, commandArgs, { stdio: 'inherit', ...options });
  if ((result.status ?? 1) !== 0) {
    process.exit(result.status ?? 1);
  }
}

const args = parseArgs(process.argv.slice(2));
const project = getProjectName(args);
if (!project) {
  fail('Missing project. Use --project=<name> or pass project as positional argument.');
}

const bump = getBumpType(args);
if (!['major', 'minor', 'patch'].includes(bump)) {
  fail('Invalid bump type. Use major, minor, or patch.');
}

const explicitVersion = args.version || process.env.npm_config_version;
if (explicitVersion && !/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.test(explicitVersion)) {
  fail(`Invalid version format: ${explicitVersion}`);
}

const workspacePath = path.join(process.cwd(), 'angular.json');
const workspace = readJson(workspacePath);
const projectConfig = workspace.projects?.[project];

if (!projectConfig) {
  fail(`Project not found in angular.json: ${project}`);
}

if (projectConfig.projectType !== 'library') {
  fail(`Project ${project} is not a library project.`);
}

const projectRoot = path.join(process.cwd(), projectConfig.root);
const sourcePackagePath = path.join(projectRoot, 'package.json');
const ngPackagePath = path.join(projectRoot, 'ng-package.json');
const sourcePackage = readJson(sourcePackagePath);
const ngPackage = readJson(ngPackagePath);

const nextVersion = explicitVersion || bumpVersion(sourcePackage.version, bump);
const currentVersion = sourcePackage.version;

if (currentVersion === nextVersion) {
  fail(`Version did not change for ${project}. Current: ${currentVersion}`);
}

console.log(`Project: ${project}`);
console.log(`Package: ${sourcePackage.name}`);
console.log(`Version: ${currentVersion} -> ${nextVersion}`);

if (args['dry-run']) {
  console.log('Dry run mode. No files were changed.');
  process.exit(0);
}

sourcePackage.version = nextVersion;
writeJson(sourcePackagePath, sourcePackage);

if (!args['skip-build']) {
  const ngCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  console.log(`Building ${project}...`);
  runCommand(ngCmd, ['ng', 'run', `${project}:build`]);
}

const distRoot = ngPackage.dest || `dist/${project}`;
const distPath = path.join(process.cwd(), distRoot);
const distPackagePath = path.join(distPath, 'package.json');

if (fs.existsSync(distPackagePath)) {
  const distPackage = readJson(distPackagePath);
  distPackage.version = nextVersion;
  writeJson(distPackagePath, distPackage);
}

if (args.publish) {
  if (!fs.existsSync(distPath)) {
    fail(`Dist path does not exist: ${distPath}`);
  }

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const publishArgs = ['publish', distPath];

  if (args.tag) {
    publishArgs.push('--tag', args.tag);
  }

  if (args.registry) {
    publishArgs.push('--registry', args.registry);
  }

  if (args.access) {
    publishArgs.push('--access', args.access);
  }

  console.log(`Publishing ${project} from ${distRoot}...`);
  runCommand(npmCmd, publishArgs);
}

console.log('Done.');
