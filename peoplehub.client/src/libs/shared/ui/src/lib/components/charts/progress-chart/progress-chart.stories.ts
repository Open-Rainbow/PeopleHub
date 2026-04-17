import { Meta, StoryObj } from '@storybook/angular';
import { ProgressChartComponent } from './progress-chart.component';

type Story = StoryObj<ProgressChartComponent>;

const meta: Meta<ProgressChartComponent> = {
  component: ProgressChartComponent,
  title: 'UI/Charts/Progress Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    goalText: {
      control: 'text',
      description: 'goalText property',
    },
    progress: {
      control: 'number',
      description: 'progress property',
    },
    barColor: {
      control: 'text',
      description: 'barColor property',
    },
    bgColor: {
      control: 'text',
      description: 'bgColor property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'goalText': '720 to Goal',
    'progress': 70,
    'barColor': '#d18238',
    'bgColor': '#fbe7d2'
},
};

export const Colored: Story = {
  args: {
    'goalText': '720 to Goal',
    'progress': 70,
    'barColor': '#d18238',
    'bgColor': '#FF5733'
},
};
