import { Meta, StoryObj } from '@storybook/angular';
import { EmployeesComponent } from './employees.component';

type Story = StoryObj<EmployeesComponent>;

const meta: Meta<EmployeesComponent> = {
  component: EmployeesComponent,
  title: 'employees',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

