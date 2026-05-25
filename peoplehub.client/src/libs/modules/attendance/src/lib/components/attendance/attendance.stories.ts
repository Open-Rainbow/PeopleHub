import { Meta, StoryObj } from '@storybook/angular';
import { AttendanceComponent } from './attendance.component';

type Story = StoryObj<AttendanceComponent>;

const meta: Meta<AttendanceComponent> = {
  component: AttendanceComponent,
  title: 'attendance',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

