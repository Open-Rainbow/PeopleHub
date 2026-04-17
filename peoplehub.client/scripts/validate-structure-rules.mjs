import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const libsRoot = path.join(root, 'src', 'libs');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'bin' || entry.name === 'obj') {
        continue;
      }
      files.push(...walk(fullPath));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function toRel(filePath) {
  return filePath.replace(root + path.sep, '').split(path.sep).join('/');
}

const allFiles = walk(libsRoot);
const modelFiles = allFiles.filter((f) => f.endsWith('.model.ts'));
const componentFiles = allFiles.filter((f) => f.endsWith('.component.ts'));

const violations = [];

for (const file of modelFiles) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, 'utf8');

  if (rel.includes('/components/')) {
    violations.push(`${rel} -> .model.ts file is inside a components folder`);
  }

  if (/^\s*export\s+type\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*/m.test(text)) {
    violations.push(`${rel} -> type alias declaration found in .model.ts`);
  }
}

for (const file of componentFiles) {
  const rel = toRel(file);
  const text = fs.readFileSync(file, 'utf8');

  if (/^\s*export\s+interface\s+/m.test(text)) {
    violations.push(`${rel} -> interface declaration found in .component.ts`);
  }

  if (/^\s*export\s+type\s+/m.test(text)) {
    violations.push(`${rel} -> type declaration found in .component.ts`);
  }
}

if (violations.length > 0) {
  console.error('Structure rule violations found:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Structure rules passed: no model/type placement violations found.');
