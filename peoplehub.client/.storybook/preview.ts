import type { Preview } from '@storybook/angular';
import '../src/libs/shared/common/src/lib/assets/icons/icon-registry';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
