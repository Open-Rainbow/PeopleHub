import { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

type Story = StoryObj<DropdownComponent>;

const dummyOptions = [
  { value: 1, name: 'Male' },
  { value: 2, name: 'Female' },
  { value: 3, name: 'Non-binary' },
  { value: 4, name: 'Prefer not to say' }
];

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'UI/Controls/Dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    options: {
      control: 'object',
      description: 'options property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    selectedValue: {
      control: 'text',
      description: 'selectedValue property',
    },
    dropdownModel: {
      control: 'text',
      description: 'dropdownModel property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Gender',
    placeholder: 'Select Gender',
    isRequired: false,
    options: dummyOptions,
    selectedValue: null,
    dropdownModel: ''
},
};

export const Alternative: Story = {
  args: {
    ...Default.args,
    label: 'Department',
    placeholder: 'Select Department',
    options: [
      { value: 10, name: 'Engineering' },
      { value: 20, name: 'Human Resources' },
      { value: 30, name: 'Finance' },
      { value: 40, name: 'Operations' }
    ],
    selectedValue: null
  },
};

export const NoDefaultSelection: Story = {
  args: {
    ...Default.args,
    label: 'Team',
    placeholder: 'Select Team',
    options: [
      { value: 101, name: 'Platform' },
      { value: 102, name: 'People Operations' },
      { value: 103, name: 'Support' }
    ],
    selectedValue: null
  }
};
