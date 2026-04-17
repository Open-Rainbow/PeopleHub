import { Meta, StoryObj } from '@storybook/angular';
import { ToastStackComponent } from './toast-stack.component';

type Story = StoryObj<ToastStackComponent>;

const meta: Meta<ToastStackComponent> = {
  component: ToastStackComponent,
  title: 'UI/Primitives/Toast Stack',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: 'text',
      description: 'position property',
    },
    toasts: {
      control: 'text',
      description: 'toasts property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    position: 'top-right',
    toasts: []
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
