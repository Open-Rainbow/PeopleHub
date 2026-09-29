import type { Meta, StoryObj } from '@storybook/angular';
import { LeaveBalanceComponent } from './leave-balance.component';

const meta: Meta<LeaveBalanceComponent> = {
  title: 'Modules/LeaveManagement/LeaveBalance',
  component: LeaveBalanceComponent,
   tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    leaveCards:
    [
        {
            leaveTypeId:1,
            leaveTypeName: 'Annual Leave',
            total: 18,
            used: 5,
            carryForward: 5,
            encashable: 10,
            color: '#2563eb',
            accentColor: 'hsl(217, 91%, 60%)',
            leaveCategory: 'Paid'
        },
        {
            leaveTypeId:2,
            leaveTypeName: 'Sick Leave',
            total: 12,
            used: 4,
            carryForward: 5,
            encashable: 0,
            color: '#dc2626',
            accentColor: 'hsl(0, 84%, 60%)',
            leaveCategory: 'Paid'
        },
        {
            leaveTypeId:3,
            leaveTypeName: 'Casual Leave',
            total: 8,
            used: 2,
            carryForward: 0,
            encashable: 0,
            color: '#f59e0b',
            accentColor: 'hsl(38, 92%, 50%)',
            leaveCategory: 'Paid'
        },
        {
            leaveTypeId:4,
            leaveTypeName: 'Comp Off',
            total: 4,
            used: 1,
            carryForward: 0,
            encashable: 0,
            color: '#10b981',
            accentColor: 'hsl(160, 84%, 39%)',
            leaveCategory: 'Paid'
        },
        {
            leaveTypeId:5,
            leaveTypeName: 'Earned Leave',
            total: 15,
            used: 3,
            carryForward: 5,
            encashable: 10,
            color: '#0ea5e9',
            accentColor: 'hsl(199, 89%, 48%)',
            leaveCategory: 'Paid'
        },
        {
            leaveTypeId:6,
            leaveTypeName: 'Paternity Leave',
            total: 15,
            used: 0,
            carryForward: 5,
            encashable: 10,
            color: '#6366f1',
            accentColor: 'hsl(243, 75%, 59%)',
            leaveCategory: 'Special'
        },
        {
            leaveTypeId:7,
            leaveTypeName: 'Maternity Leave',
            total: 182,
            used: 0,
            carryForward: 0,
            encashable: 0,
            color: '#db2777',
            accentColor: 'hsl(333, 71%, 51%)',
            leaveCategory: 'Special'
        },
        {
            leaveTypeId:8,
            leaveTypeName: 'Sabbatical',
            total: 30,
            used: 0,
            carryForward: 0,
            encashable: 0,
            color: '#16a34a',
            accentColor: 'hsl(142, 71%, 45%)',
            leaveCategory: 'Special'
        },
        {
            leaveTypeId:9,
            leaveTypeName: 'Unpaid Leave',
            total: 10,
            used: 1,
            carryForward: 0,
            encashable: 0,
            color: '#64748b',
            accentColor: 'hsl(215, 19%, 35%)',
            leaveCategory: 'Unpaid'
        },
        {
            leaveTypeId:10,
            leaveTypeName: 'Study Leave',
            total: 5,
            used: 0,
            carryForward: 0,
            encashable: 0,
            color: '#7c3aed',
            accentColor: 'hsl(262, 83%, 58%)',
            leaveCategory: 'Special'
        }
    ]
  },
};

export default meta;
type Story = StoryObj<LeaveBalanceComponent>;

export const LeaveBalance: Story = {};