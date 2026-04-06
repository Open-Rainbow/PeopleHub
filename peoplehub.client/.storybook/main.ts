import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.ts',
    '../src/**/*.stories.mdx',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
