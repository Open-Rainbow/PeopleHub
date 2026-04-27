import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

type Story = StoryObj<CheckboxComponent>;

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'UI/Controls/Checkbox',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tickColor: {
      control: 'text',
      description: 'tickColor property',
    },
    label: {
      control: 'text',
      description: 'label property',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'labelPosition property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled property',
    },
    labelClick: {
      control: 'boolean',
      description: 'labelClick property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    tickColor: '#fff',
    label: '',
    labelPosition: 'right',
    isRequired: false,
    disabled: false,
    labelClick: true
},
};

export const Colored: Story = {
  args: {
    tickColor: '#fff',
    label: '',
    labelPosition: 'right',
    isRequired: false,
    disabled: false,
    labelClick: true
},
};
