import { Meta, StoryObj } from '@storybook/angular';
import { PayrollComponent } from './payroll.component';

type Story = StoryObj<PayrollComponent>;

const meta: Meta<PayrollComponent> = {
  component: PayrollComponent,
  title: 'payroll',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

