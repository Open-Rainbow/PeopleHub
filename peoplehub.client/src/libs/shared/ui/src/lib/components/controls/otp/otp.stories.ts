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
    label: {
      control: 'text',
      description: 'label property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    otpLength: {
      control: 'number',
      description: 'otp length property (example: 4 or 6)',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Enter OTP here',
    otpLength: 6,
  },
};

export const Alternative: Story = {
  args: {
    ...Default.args,
    otpLength: 4,
  },
};
