import { Meta, StoryObj } from '@storybook/angular';
import { ButtonListComponent } from './button-list.component';

type Story = StoryObj<ButtonListComponent>;

const meta: Meta<ButtonListComponent> = {
  component: ButtonListComponent,
  title: 'UI/Primitives/Button List',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttons: {
      control: 'text',
      description: 'buttons property',
    },
    textColor: {
      control: 'text',
      description: 'textColor property',
    },
    bgColor: {
      control: 'text',
      description: 'bgColor property',
    },
    selectedBgColor: {
      control: 'text',
      description: 'selectedBgColor property',
    },
    selectedTextColor: {
      control: 'text',
      description: 'selectedTextColor property',
    },
    hoverBgColor: {
      control: 'text',
      description: 'hoverBgColor property',
    },
    hoverTextColor: {
      control: 'text',
      description: 'hoverTextColor property',
    },
    selectedId: {
      control: 'number',
      description: 'selectedId property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    buttons: [],
    textColor: '#ffffff',
    bgColor: '#79b2f3',
    selectedBgColor: '#3b82f6',
    selectedTextColor: '#ffffff',
    hoverBgColor: 'red',
    hoverTextColor: '#ffffff'
},
};

export const Colored: Story = {
  args: {
    buttons: [],
    textColor: '#ffffff',
    bgColor: '#FF5733',
    selectedBgColor: '#3b82f6',
    selectedTextColor: '#ffffff',
    hoverBgColor: 'red',
    hoverTextColor: '#ffffff'
},
};
