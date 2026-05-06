import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

type Story = StoryObj<ToggleComponent>;

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'UI/Controls/Toggle',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'checked state',
    },
    color: {
      control: 'color',
      description: 'active track color',
    },
    label: {
      control: 'text',
      description: 'label property',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right', 'both'],
      description: 'labelPosition property',
    },
    labelColor: {
      control: 'color',
      description: 'labelColor property',
    },
    isRequired: {
      control: 'boolean',
      description: 'show required asterisk',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'size property',
    },
    enableLabelClick: {
      control: 'boolean',
      description: 'allow label click to toggle value',
    },
    offLabel: {
      control: 'text',
      description: 'left/off label text',
    },
    onLabel: {
      control: 'text',
      description: 'right/on label text',
    },
    toggleOnlyMode: {
      table: { disable: true },
    },
    parentFormGroup: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    checkedChange: {
      table: { disable: true },
    },
    toggleChange: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: '',
    checked: false,
    color: '#4caf50',
    labelPosition: 'right',
    labelColor: '#333',
    isRequired: true,
    size: 'small',
    enableLabelClick: false,
    offLabel: '',
    onLabel: '',
},
};

export const Colored: Story = {
  args: {
    label: 'Enable feature',
    labelPosition: 'right',
    labelColor: '#333',
    color: '#2563eb',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    labelPosition: 'right',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    labelPosition: 'right',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    labelPosition: 'right',
    size: 'large',
  },
};
