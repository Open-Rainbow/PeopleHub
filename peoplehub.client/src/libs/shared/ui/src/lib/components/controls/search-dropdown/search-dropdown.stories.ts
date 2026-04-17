import { Meta, StoryObj } from '@storybook/angular';
import { SearchDropdownComponent } from './search-dropdown.component';

type Story = StoryObj<SearchDropdownComponent>;

const meta: Meta<SearchDropdownComponent> = {
  component: SearchDropdownComponent,
  title: 'ui-search-dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholderText: {
      control: 'text',
      description: 'placeholderText property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    borderColor: {
      control: 'text',
      description: 'borderColor property',
    },
    iconPosition: {
      control: 'text',
      description: 'iconPosition property',
    },
    showIcon: {
      control: 'boolean',
      description: 'showIcon property',
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
    'placeholderText': 'Search employees by name, email, position, or department...',
    'showBorder': true,
    'borderColor': '#2563eb',
    'iconPosition': 'right',
    'showIcon': true
},
};

export const Colored: Story = {
  args: {
    'placeholderText': 'Search employees by name, email, position, or department...',
    'showBorder': true,
    'borderColor': '#2563eb',
    'iconPosition': 'right',
    'showIcon': true
},
};
