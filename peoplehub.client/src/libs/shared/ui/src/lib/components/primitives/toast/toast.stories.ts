import { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';
import { ToastType, ToastPosition } from '../../../models/component-models/toast.types';

type Story = StoryObj<ToastComponent>;

const meta: Meta<ToastComponent> = {
  component: ToastComponent,
  title: 'UI/Primitives/Toast',
  id: 'ui-primitives-toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['normal', 'warning', 'alert', 'success'] as ToastType[],
      description: 'Toast type variant',
    },
    title: {
      control: 'text',
      description: 'Toast title',
    },
    subtitle: {
      control: 'text',
      description: 'Toast subtitle/message',
    },
    icon: {
      control: 'text',
      description: 'Icon name from Iconify',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as ToastPosition[],
      description: 'Toast position on screen',
    },
    duration: {
      control: 'number',
      min: 1000,
      max: 10000,
      step: 1000,
      description: 'Duration in milliseconds before auto-close',
    },
    isStorybook: {
      control: false,
    },
    closed: {
      action: 'closed',
    },
  },
};

export default meta;

export const Normal: Story = {
  args: {
    type: 'normal',
    title: 'Information',
    subtitle: 'This is a normal toast notification.',
    icon: 'mdi:information',
    position: 'top-center',
    duration: 5000,
    isStorybook: true,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    subtitle: 'Please review this important warning message.',
    icon: 'mdi:alert-circle',
    position: 'top-center',
    duration: 5000,
    isStorybook: true,
  },
};

export const Alert: Story = {
  args: {
    type: 'alert',
    title: 'Error',
    subtitle: 'Something went wrong. Please try again.',
    icon: 'mdi:close-circle',
    position: 'top-center',
    duration: 5000,
    isStorybook: true,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success',
    subtitle: 'Your action completed successfully!',
    icon: 'mdi:check-circle',
    position: 'top-center',
    duration: 5000,
    isStorybook: true,
  },
};

export const TopLeft: Story = {
  args: {
    type: 'normal',
    title: 'Top Left',
    subtitle: 'This toast appears in the top-left corner.',
    icon: 'mdi:information',
    position: 'top-left',
    duration: 5000,
    isStorybook: true,
  },
};

export const TopRight: Story = {
  args: {
    type: 'success',
    title: 'Top Right',
    subtitle: 'This toast appears in the top-right corner.',
    icon: 'mdi:check-circle',
    position: 'top-right',
    duration: 5000,
    isStorybook: true,
  },
};

export const BottomLeft: Story = {
  args: {
    type: 'warning',
    title: 'Bottom Left',
    subtitle: 'This toast appears in the bottom-left corner.',
    icon: 'mdi:alert-circle',
    position: 'bottom-left',
    duration: 5000,
    isStorybook: true,
  },
};

export const BottomRight: Story = {
  args: {
    type: 'alert',
    title: 'Bottom Right',
    subtitle: 'This toast appears in the bottom-right corner.',
    icon: 'mdi:close-circle',
    position: 'bottom-right',
    duration: 5000,
    isStorybook: true,
  },
};

export const LongDuration: Story = {
  args: {
    type: 'normal',
    title: 'Long Duration',
    subtitle: 'This notification will stay visible for 10 seconds.',
    icon: 'mdi:clock',
    position: 'top-center',
    duration: 10000,
    isStorybook: true,
  },
};

export const ShortDuration: Story = {
  args: {
    type: 'success',
    title: 'Short Duration',
    subtitle: 'This notification will close quickly.',
    icon: 'mdi:check-circle',
    position: 'top-center',
    duration: 2000,
    isStorybook: true,
  },
};
