import { Meta, StoryObj } from '@storybook/angular';
import { LeaveComponent } from './leave.component';

type Story = StoryObj<LeaveComponent>;

const meta: Meta<LeaveComponent> = {
  component: LeaveComponent,
  title: 'leave',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

