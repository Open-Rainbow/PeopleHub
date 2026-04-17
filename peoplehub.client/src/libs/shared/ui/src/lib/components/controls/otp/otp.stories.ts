import { Meta, StoryObj } from '@storybook/angular';
import { OtpComponent } from './otp.component';

type Story = StoryObj<OtpComponent>;

const meta: Meta<OtpComponent> = {
  component: OtpComponent,
  title: 'UI/Controls/Otp',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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
  args: {},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
