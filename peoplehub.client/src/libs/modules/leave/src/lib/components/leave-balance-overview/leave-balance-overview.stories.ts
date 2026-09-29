import type { Meta, StoryObj } from '@storybook/angular';
import { LeaveBalanceOverviewComponent } from './leave-balance-overview.component';

const meta: Meta<LeaveBalanceOverviewComponent> = {
  title: 'Modules/LeaveManagement/LeaveBalanceOverview',
  component: LeaveBalanceOverviewComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
};

export default meta;
type Story = StoryObj<LeaveBalanceOverviewComponent>;

export const LeaveBalanceOverview: Story = {};