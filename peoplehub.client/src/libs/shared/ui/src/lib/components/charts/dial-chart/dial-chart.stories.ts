import { Meta, StoryObj } from '@storybook/angular';
import { DialChartComponent } from './dial-chart.component';

type Story = StoryObj<DialChartComponent>;

const meta: Meta<DialChartComponent> = {
  component: DialChartComponent,
  title: 'ui-dial-chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
