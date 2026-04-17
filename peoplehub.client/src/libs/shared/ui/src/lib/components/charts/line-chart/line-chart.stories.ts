import { Meta, StoryObj } from '@storybook/angular';
import { LineChartComponent } from './line-chart.component';

type Story = StoryObj<LineChartComponent>;

const meta: Meta<LineChartComponent> = {
  component: LineChartComponent,
  title: 'UI/Charts/Line Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    labels: {
      control: 'text',
      description: 'labels property',
    },
    data: {
      control: 'text',
      description: 'data property',
    },
    colors: {
      control: 'text',
      description: 'colors property',
    },
    lineStyles: {
      control: 'text',
      description: 'lineStyles property',
    },
    visible: {
      control: 'text',
      description: 'visible property',
    },
    seriesLabels: {
      control: 'text',
      description: 'seriesLabels property',
    },
    lineThickness: {
      control: 'text',
      description: 'lineThickness property',
    },
    legendShapes: {
      control: 'text',
      description: 'legendShapes property',
    },
    yAxisLabels: {
      control: 'text',
      description: 'yAxisLabels property',
    },
    showDataPoints: {
      control: 'boolean',
      description: 'showDataPoints property',
    },
    yAxisStep: {
      control: 'text',
      description: 'yAxisStep property',
    },
    showYAxisLine: {
      control: 'boolean',
      description: 'showYAxisLine property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    labels: [],
    data: [],
    colors: [],
    lineStyles: [],
    visible: [],
    seriesLabels: [],
    lineThickness: [],
    legendShapes: [],
    yAxisLabels: [],
    showDataPoints: true,
    yAxisStep: null,
    showYAxisLine: true
},
};

export const Colored: Story = {
  args: {
    labels: [],
    data: [],
    colors: [],
    lineStyles: [],
    visible: [],
    seriesLabels: [],
    lineThickness: [],
    legendShapes: [],
    yAxisLabels: [],
    showDataPoints: true,
    yAxisStep: null,
    showYAxisLine: true
},
};
