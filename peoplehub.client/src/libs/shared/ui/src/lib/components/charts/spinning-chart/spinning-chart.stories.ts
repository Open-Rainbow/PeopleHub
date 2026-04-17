import { Meta, StoryObj } from '@storybook/angular';
import { SpinningChartComponent } from './spinning-chart.component';

type Story = StoryObj<SpinningChartComponent>;

const meta: Meta<SpinningChartComponent> = {
  component: SpinningChartComponent,
  title: 'UI/Charts/Spinning Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    percentage: {
      control: 'number',
      description: 'percentage property',
    },
    value: {
      control: 'number',
      description: 'value property',
    },
    total: {
      control: 'number',
      description: 'total property',
    },
    size: {
      control: 'number',
      description: 'size property',
    },
    width: {
      control: 'number',
      description: 'width property',
    },
    height: {
      control: 'number',
      description: 'height property',
    },
    showData: {
      control: 'boolean',
      description: 'showData property',
    },
    completedColor: {
      control: 'text',
      description: 'completedColor property',
    },
    remainingColor: {
      control: 'text',
      description: 'remainingColor property',
    },
    textColor: {
      control: 'text',
      description: 'textColor property',
    },
    hoverCompletedColor: {
      control: 'text',
      description: 'hoverCompletedColor property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'size': 64,
    'width': 200,
    'height': 200,
    'showData': true,
    'completedColor': 'rgb(0, 150, 255)',
    'remainingColor': 'rgb(220, 240, 255)',
    'textColor': 'rgb(1, 19, 41)',
    'hoverCompletedColor': 'rgba(8, 116, 194, 1)'
},
};

export const Colored: Story = {
  args: {
    'size': 64,
    'width': 200,
    'height': 200,
    'showData': true,
    'completedColor': 'rgb(0, 150, 255)',
    'remainingColor': 'rgb(220, 240, 255)',
    'textColor': 'rgb(1, 19, 41)',
    'hoverCompletedColor': 'rgba(8, 116, 194, 1)'
},
};
