import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

type Story = StoryObj<IconComponent>;

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'UI/Primitives/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'name property',
    },
    color: {
      control: 'text',
      description: 'color property',
    },
    hoverColor: {
      control: 'text',
      description: 'hoverColor property',
    },
    size: {
      control: 'text',
      description: 'size property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    name: 'arrow_down',
    color: '#475569',
    hoverColor: '#0ea5e9',
    size: '20px',
  },
};

export const Colored: Story = {
  args: {
    name: 'delete',
    color: '#dc2626',
    hoverColor: '#991b1b',
    size: '24px',
  },
};
