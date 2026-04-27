import { Meta, StoryObj } from '@storybook/angular';
import { LabelValueComponent } from './label-value.component';

type Story = StoryObj<LabelValueComponent>;

const meta: Meta<LabelValueComponent> = {
  component: LabelValueComponent,
  title: 'UI/Controls/Label Value',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    value: {
      control: 'text',
      description: 'value property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    isEditMode: {
      control: 'boolean',
      description: 'isEditMode property',
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
    label: 'Employee ID',
    isRequired: false,
    isEditMode: false
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
