import { Meta, StoryObj } from '@storybook/angular';
import { ToastStackComponent } from './toast-stack.component';

type Story = StoryObj<ToastStackComponent>;

const meta: Meta<ToastStackComponent> = {
  component: ToastStackComponent,
  title: 'UI/Primitives/Toast Stack',
  id: 'ui-primitives-toast-stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Stack position',
    },
    toasts: {
      control: 'object',
      description: 'Array of toasts to display',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    position: 'top-right',
    toasts: [
      {
        id: 1,
        title: 'Success',
        subtitle: 'Profile updated successfully.',
        type: 'success',
        icon: 'mdi:check-circle',
        duration: 5000,
      },
      {
        id: 2,
        title: 'Warning',
        subtitle: 'Your session will expire soon.',
        type: 'warning',
        icon: 'mdi:alert-circle',
        duration: 7000,
      },
      {
        id: 3,
        title: 'Info',
        subtitle: 'New policy update available.',
        type: 'normal',
        icon: 'mdi:information',
        duration: 9000,
      },
    ],
  },
};

export const Alternative: Story = {
  args: {
    position: 'bottom-left',
    toasts: [
      {
        id: 11,
        title: 'Alert',
        subtitle: 'Payroll sync failed. Try again.',
        type: 'alert',
        icon: 'mdi:close-circle',
        duration: 8000,
      },
      {
        id: 12,
        title: 'Queued',
        subtitle: 'Your request is in processing queue.',
        type: 'normal',
        icon: 'mdi:clock-outline',
        duration: 6000,
      },
    ],
  },
};
