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
  },
};

export default meta;

export const Default: Story = {
  args: {
    'name': '',
    'color': '',
    'hoverColor': ''
},
};

export const Colored: Story = {
  args: {
    'name': '',
    'color': '',
    'hoverColor': ''
},
};
