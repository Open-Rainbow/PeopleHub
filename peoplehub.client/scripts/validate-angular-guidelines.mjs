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

function buildComponentContractMap(componentFiles) {
  const contractMap = new Map();

  for (const file of componentFiles) {
    const text = fs.readFileSync(file, 'utf8');

    const selectorMatch = text.match(/selector\s*:\s*'([^']+)'/);
    if (!selectorMatch) {
      continue;
    }

    const selector = selectorMatch[1].trim();
    const inputs = new Set();
    const outputs = new Set();

    const inputRegex = /@Input(?:\(\s*(?:'([^']+)')?\s*\))?\s*(?:public\s+|private\s+|protected\s+|readonly\s+)*(?:override\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*[!?]?\s*[:=]/g;
    const outputRegex = /@Output(?:\(\s*(?:'([^']+)')?\s*\))?\s*(?:public\s+|private\s+|protected\s+|readonly\s+)*(?:override\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*[!?]?\s*[:=]/g;
    const signalInputRegex = /(?:public\s+|private\s+|protected\s+|readonly\s+)*(?:override\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*input(?:\.required)?(?:<[^>]+>)?\s*\(/g;
    const signalOutputRegex = /(?:public\s+|private\s+|protected\s+|readonly\s+)*(?:override\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*output(?:<[^>]+>)?\s*\(/g;

    for (const match of text.matchAll(inputRegex)) {
      const name = (match[1] || match[2] || '').trim();
      if (name) {
        inputs.add(name);
      }
    }

    for (const match of text.matchAll(outputRegex)) {
      const name = (match[1] || match[2] || '').trim();
      if (name) {
        outputs.add(name);
      }
    }

    for (const match of text.matchAll(signalInputRegex)) {
      const name = (match[1] || '').trim();
      if (name) {
        inputs.add(name);
      }
    }

    for (const match of text.matchAll(signalOutputRegex)) {
      const name = (match[1] || '').trim();
      if (name) {
        outputs.add(name);
      }
    }

    contractMap.set(selector, {
      inputs,
      outputs,
      file: toRel(file),
    });
  }

  return contractMap;
}

function lineOfIndex(text, index) {
  return text.slice(0, index).split('\n').length;
}

function normalizeEventBindingName(name) {
  return name.split('.')[0].trim();
}

function validateTemplates(templateFiles, contractMap) {
  const violations = [];
  const ignoredBindingNames = new Set(['ngClass', 'ngStyle', 'ngModel']);

  const tagRegex = /<([a-z]+-[a-z0-9-]+)\b([\s\S]*?)>/g;
  const propertyRegex = /\[(?!\()\s*([A-Za-z_][A-Za-z0-9_.]*)\s*\]\s*=/g;
  const eventRegex = /\((?!\[)\s*([A-Za-z_][A-Za-z0-9_.]*)\s*\)\s*=/g;
  const bananaRegex = /\[\(\s*([A-Za-z_][A-Za-z0-9_.]*)\s*\)\]\s*=/g;

  for (const file of templateFiles) {
    const text = fs.readFileSync(file, 'utf8');
    const rel = toRel(file);

    for (const tagMatch of text.matchAll(tagRegex)) {
      const selector = tagMatch[1];
      const attrs = tagMatch[2] ?? '';
      const component = contractMap.get(selector);

      if (!component) {
        continue;
      }

      for (const bindingMatch of attrs.matchAll(propertyRegex)) {
        const bindingName = bindingMatch[1];
        if (ignoredBindingNames.has(bindingName)) {
          continue;
        }
        if (bindingName.startsWith('style.') || bindingName.startsWith('class.') || bindingName.startsWith('attr.')) {
          continue;
        }

        if (!component.inputs.has(bindingName)) {
          const baseIndex = (tagMatch.index ?? 0) + (bindingMatch.index ?? 0);
          violations.push(`${rel}:${lineOfIndex(text, baseIndex)} -> <${selector}> has unknown input [${bindingName}] (expected one of: ${Array.from(component.inputs).sort().join(', ') || 'none'}) from ${component.file}`);
        }
      }

      for (const bindingMatch of attrs.matchAll(eventRegex)) {
        const rawName = bindingMatch[1];
        const bindingName = normalizeEventBindingName(rawName);
        if (!component.outputs.has(bindingName)) {
          continue;
        }
      }

      for (const bindingMatch of attrs.matchAll(bananaRegex)) {
        const bindingName = bindingMatch[1];
        if (ignoredBindingNames.has(bindingName)) {
          continue;
        }
        const hasInput = component.inputs.has(bindingName);
        const hasOutput = component.outputs.has(`${bindingName}Change`) || component.outputs.has(bindingName);
        if (!hasInput || !hasOutput) {
          const baseIndex = (tagMatch.index ?? 0) + (bindingMatch.index ?? 0);
          violations.push(`${rel}:${lineOfIndex(text, baseIndex)} -> <${selector}> has invalid two-way binding [(${bindingName})] (input: ${hasInput}, output: ${hasOutput}) from ${component.file}`);
        }
      }
    }
  }

  return violations;
}

function validateLegacyNaming(files) {
  const violations = [];
  const supportedExtensions = new Set(['.ts', '.html', '.mdx']);
  // Intentionally matches legacy, non-camelCase tokens that must be rejected.
  // Keep these values as historical bad spellings to prevent regressions.
  const legacyNameRegex = /\b(isexpand|hoverBGColor|placeHolder|dropDownModel|Placeholder|lebelsize|valuesize|subTitle)\b/g;

  for (const file of files) {
    if (!supportedExtensions.has(path.extname(file))) {
      continue;
    }

    const text = fs.readFileSync(file, 'utf8');
    const rel = toRel(file);
    for (const match of text.matchAll(legacyNameRegex)) {
      const token = match[1] ?? match[0];
      violations.push(`${rel}:${lineOfIndex(text, match.index ?? 0)} -> legacy non-camelCase token "${token}" is not allowed`);
    }
  }

  return violations;
}

if (!fs.existsSync(libsRoot)) {
  console.error('Unable to validate Angular guidelines: src/libs directory not found.');
  process.exit(1);
}

const allFiles = walk(libsRoot);
const componentFiles = allFiles.filter((f) => f.endsWith('.component.ts'));
const templateFiles = allFiles.filter((f) => f.endsWith('.component.html'));

const contractMap = buildComponentContractMap(componentFiles);
const violations = [
  ...validateTemplates(templateFiles, contractMap),
  ...validateLegacyNaming(allFiles),
];

if (violations.length > 0) {
  console.error('Angular guideline validation failed (binding contracts / camelCase consistency):');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Angular guideline validation passed: component binding contracts are valid.');
