import { Meta, StoryObj } from '@storybook/angular';
import { OrgChartComponent } from './org-chart.component';

type Story = StoryObj<OrgChartComponent>;

const meta: Meta<OrgChartComponent> = {
  component: OrgChartComponent,
  title: 'UI/Charts/Org Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
