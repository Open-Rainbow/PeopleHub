import {
  Meta,
  StoryObj,
} from '@storybook/angular';
import { AddLeaveType } from './add-leave-type';
type Story = StoryObj<AddLeaveType>;


const meta: Meta<AddLeaveType> = {
  component: AddLeaveType,
  title: 'Leave Management/Add Leave Type',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};


export default meta;

 
export const Default: Story = {
  args: {},
};