import { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';

type Story = StoryObj<DropdownComponent>;

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'ui-dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    placeHolder: {
      control: 'text',
      description: 'placeHolder property',
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
    dropDownModel: {
      control: 'text',
      description: 'dropDownModel property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Gender',
    placeHolder: 'Select Gender',
    isRequired: false,
    options: null,
    selectedValue: null,
    dropDownModel: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
