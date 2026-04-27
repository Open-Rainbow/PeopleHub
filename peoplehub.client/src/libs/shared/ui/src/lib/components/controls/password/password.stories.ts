import { Meta, StoryObj } from '@storybook/angular';
import { PasswordComponent } from './password.component';

type Story = StoryObj<PasswordComponent>;

const meta: Meta<PasswordComponent> = {
  component: PasswordComponent,
  title: 'UI/Controls/Password',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    value: {
      control: 'text',
      description: 'value property',
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
    label: 'Temporary Password',
    isRequired: true,
    placeholder: 'Enter Temporary password',
    value: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
