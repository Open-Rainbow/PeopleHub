import { Meta, StoryObj } from '@storybook/angular';
import { ValueDropdownComponent } from './value-dropdown.component';

type Story = StoryObj<ValueDropdownComponent>;

const meta: Meta<ValueDropdownComponent> = {
  component: ValueDropdownComponent,
  title: 'UI/Controls/Value Dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    dropdownValues: {
      control: 'text',
      description: 'dropdownValues property',
    },
    defaultSelected: {
      control: 'text',
      description: 'defaultSelected property',
    },
    placeholderText: {
      control: 'text',
      description: 'placeholderText property',
    },
    textColor: {
      control: 'text',
      description: 'textColor property',
    },
    backgroundColor: {
      control: 'text',
      description: 'backgroundColor property',
    },
    activeBackgroundColor: {
      control: 'text',
      description: 'activeBackgroundColor property',
    },
    borderColor: {
      control: 'text',
      description: 'borderColor property',
    },
    activeTextColor: {
      control: 'text',
      description: 'activeTextColor property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    showIcon: {
      control: 'boolean',
      description: 'showIcon property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    dropdownValues: [],
    defaultSelected: null,
    placeholderText: '2024',
    textColor: '#111',
    backgroundColor: 'white',
    activeBackgroundColor: '#eaf0ff',
    borderColor: 'lightgray',
    activeTextColor: '#316aff',
    showIcon: true
},
};

export const Colored: Story = {
  args: {
    dropdownValues: [],
    defaultSelected: null,
    placeholderText: '2024',
    textColor: '#111',
    backgroundColor: 'white',
    activeBackgroundColor: '#eaf0ff',
    borderColor: 'lightgray',
    activeTextColor: '#316aff',
    showIcon: true
},
};
