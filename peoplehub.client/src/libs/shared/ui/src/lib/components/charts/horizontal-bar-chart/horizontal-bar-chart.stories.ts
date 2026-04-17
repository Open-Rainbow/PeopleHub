import { Meta, StoryObj } from '@storybook/angular';
import { HorizontalBarChartComponent } from './horizontal-bar-chart.component';

type Story = StoryObj<HorizontalBarChartComponent>;

const meta: Meta<HorizontalBarChartComponent> = {
  component: HorizontalBarChartComponent,
  title: 'ui-horizontal-bar-chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColors: {
      control: 'text',
      description: 'backgroundColors property',
    },
    legendShapes: {
      control: 'text',
      description: 'legendShapes property',
    },
    labels: {
      control: 'text',
      description: 'labels property',
    },
    data: {
      control: 'text',
      description: 'data property',
    },
    datasetLabels: {
      control: 'text',
      description: 'datasetLabels property',
    },
    yAxisTicks: {
      control: 'text',
      description: 'yAxisTicks property',
    },
    gridDisplay: {
      control: 'text',
      description: 'gridDisplay property',
    },
    gridLineStyle: {
      control: 'text',
      description: 'gridLineStyle property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    backgroundColors: ['#2166E1', '#FF8800', '#13C9E4', '#FFB400'],
    legendShapes: [],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    data: [
      [390, 120, 295, 230, 100, 20, 180, 230, 250],
      [100, 190, 110, 380, 100, 200, 290, 300, 100],
      [150, 200, 190, 120, 100, 400, 90, 120, 200],
    ],
    datasetLabels: ['Net Profit', 'Revenue', 'Free Cash Flow'],
    yAxisTicks: [0, 50, 100, 150, 200, 250, 300, 350, 400],
    gridDisplay: 'both',
    gridLineStyle: 'dashed'
},
};

export const Colored: Story = {
  args: {
    backgroundColors: ['#2166E1', '#FF8800', '#13C9E4', '#FFB400'],
    legendShapes: [],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    data: [
      [390, 120, 295, 230, 100, 20, 180, 230, 250],
      [100, 190, 110, 380, 100, 200, 290, 300, 100],
      [150, 200, 190, 120, 100, 400, 90, 120, 200],
    ],
    datasetLabels: ['Net Profit', 'Revenue', 'Free Cash Flow'],
    yAxisTicks: [0, 50, 100, 150, 200, 250, 300, 350, 400],
    gridDisplay: 'both',
    gridLineStyle: 'dashed'
},
};
