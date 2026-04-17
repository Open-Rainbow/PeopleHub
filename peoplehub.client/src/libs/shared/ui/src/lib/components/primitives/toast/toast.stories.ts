import { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';

type Story = StoryObj<ToastComponent>;

const meta: Meta<ToastComponent> = {
  component: ToastComponent,
  title: 'ui-toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'type property',
    },
    title: {
      control: 'text',
      description: 'title property',
    },
    subTitle: {
      control: 'text',
      description: 'subTitle property',
    },
    icon: {
      control: 'text',
      description: 'icon property',
    },
    position: {
      control: 'text',
      description: 'position property',
    },
    duration: {
      control: 'number',
      description: 'duration property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'type': 'normal',
    'title': 'Hi',
    'subTitle': 'Hello, world! This is a Toast message.',
    'icon': 'home',
    'position': 'top-center',
    'duration': 5000
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
