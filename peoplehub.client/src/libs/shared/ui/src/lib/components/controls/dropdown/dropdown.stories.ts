import { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

type Story = StoryObj<DropdownComponent>;

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
      control: 'text',
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
    options: null,
    selectedValue: null,
    dropdownModel: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
