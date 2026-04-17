import { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectComponent } from './multi-select.component';

type Story = StoryObj<MultiSelectComponent>;

const meta: Meta<MultiSelectComponent> = {
  component: MultiSelectComponent,
  title: 'ui-multi-select',
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
    showCheckbox: {
      control: 'boolean',
      description: 'showCheckbox property',
    },
    showSearch: {
      control: 'boolean',
      description: 'showSearch property',
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
    options: [
      { value: 1, name: 'Male' },
      { value: 2, name: 'Female' },
      { value: 3, name: 'Other' },
      { value: 4, name: 'Other1' },
      { value: 5, name: 'Other2' },
      { value: 6, name: 'Other3' },
      { value: 7, name: 'Other4' },
      { value: 8, name: 'Other5' },
    ],
    showCheckbox: true,
    showSearch: true,
    dropDownModel: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
