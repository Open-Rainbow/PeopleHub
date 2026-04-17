import { Meta, StoryObj } from '@storybook/angular';
import { ScatterChartComponent } from './scatter-chart.component';

type Story = StoryObj<ScatterChartComponent>;

const meta: Meta<ScatterChartComponent> = {
  component: ScatterChartComponent,
  title: 'UI/Charts/Scatter Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    yAxisLabels: {
      control: 'text',
      description: 'yAxisLabels property',
    },
    legendShape: {
      control: 'text',
      description: 'legendShape property',
    },
    datasets: {
      control: 'text',
      description: 'datasets property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    yAxisLabels: [],
    legendShape: 'rectRounded'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
