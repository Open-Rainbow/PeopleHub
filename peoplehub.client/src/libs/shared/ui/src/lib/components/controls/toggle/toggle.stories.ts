import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

type Story = StoryObj<ToggleComponent>;

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'ui-toggle',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    labelPosition: {
      control: 'text',
      description: 'labelPosition property',
    },
    labelColor: {
      control: 'text',
      description: 'labelColor property',
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
    'label': '',
    'labelPosition': 'right',
    'labelColor': '#333',
    'size': 'small',
},
};

export const Colored: Story = {
  args: {
    'label': '',
    'labelPosition': 'right',
    'labelColor': '#333',
    'size': 'small',
},
};
