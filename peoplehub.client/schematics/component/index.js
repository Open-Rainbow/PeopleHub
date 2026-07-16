"use strict";

const { chain, externalSchematic } = require("@angular-devkit/schematics");
const { strings } = require("@angular-devkit/core");
const nodePath = require("path");

/**
 * Custom PeopleHub component schematic.
 *
 * Delegates to the standard @schematics/angular:component to generate
 * the .ts, .html, .scss and .spec.ts files, then automatically creates
 * a Storybook .stories.ts file in the same folder.
 */
function component(options) {
  // Enforce standalone components for all future generation.
  options.standalone = true;
  options.style = options.style || "scss";
  options.type = options.type || "component";

  return chain([
    externalSchematic("@schematics/angular", "component", options),
    generateStoryFile(options),
  ]);
}

/**
 * After the Angular component schematic has staged its files, scan the
 * tree actions to locate the newly created .component.ts file and create
 * a sibling .component.stories.ts file.
 */
function generateStoryFile(options) {
  return (tree) => {
    const dasherized = strings.dasherize(options.name);
    const classified = strings.classify(options.name);

    let componentDir = null;
    let componentBaseName = null;

    // Primary: look through staged actions for the CREATE of component.ts.
    // This is the most reliable approach – it only targets files that were
    // just staged by the preceding externalSchematic() call.
    for (const action of tree.actions) {
      if (action.kind !== "c") {
        continue;
      }

      if (action.path.endsWith(`/${dasherized}.component.ts`)) {
        componentDir = nodePath.posix.dirname(action.path);
        componentBaseName = `${dasherized}.component`;
        break;
      }

      if (action.path.endsWith(`/${dasherized}.ts`)) {
        componentDir = nodePath.posix.dirname(action.path);
        componentBaseName = dasherized;
        break;
      }
    }

    // Fallback: walk the whole tree if the action wasn't found above.
    if (!componentDir) {
      tree.visit((filePath) => {
        if (filePath.endsWith(`/${dasherized}.component.ts`)) {
          componentDir = nodePath.posix.dirname(filePath);
          componentBaseName = `${dasherized}.component`;
        }

        if (filePath.endsWith(`/${dasherized}.ts`)) {
          componentDir = nodePath.posix.dirname(filePath);
          componentBaseName = dasherized;
        }
      });
    }

    if (!componentDir || !componentBaseName) {
      return;
    }

    const storyPath = `${componentDir}/${componentBaseName}.stories.ts`;

    // Never overwrite an existing story – the developer may have customised it.
    if (!tree.exists(storyPath)) {
      tree.create(storyPath, buildStoryContent(classified, componentBaseName));
    }
  };
}

/**
 * Builds the initial Storybook story file content for a component.
 */
function buildStoryContent(classified, componentBaseName) {
  return `import type { Meta, StoryObj } from '@storybook/angular';
import { ${classified}Component } from './${componentBaseName}';

const meta: Meta<${classified}Component> = {
  title: 'Components/${classified}',
  component: ${classified}Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<${classified}Component>;

export const Default: Story = {
  args: {},
};
`;
}

module.exports = { component };
