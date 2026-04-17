import { Meta, StoryObj } from '@storybook/angular';
import { EmployeeOrgChartComponent } from './employee-org-chart.component';

type Story = StoryObj<EmployeeOrgChartComponent>;

const meta: Meta<EmployeeOrgChartComponent> = {
  component: EmployeeOrgChartComponent,
  title: 'UI/Charts/Employee Org Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
