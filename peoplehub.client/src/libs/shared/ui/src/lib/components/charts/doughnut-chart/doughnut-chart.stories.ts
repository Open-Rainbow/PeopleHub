import { Meta, StoryObj } from '@storybook/angular';
import { DoughnutChartComponent } from './doughnut-chart.component';

type Story = StoryObj<DoughnutChartComponent>;

const meta: Meta<DoughnutChartComponent> = {
  component: DoughnutChartComponent,
  title: 'UI/Charts/Doughnut Chart',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showLegends: {
      control: 'boolean',
      description: 'showLegends property',
    },
    centerText: {
      control: 'boolean',
      description: 'centerText property',
    },
    showAsValue: {
      control: 'boolean',
      description: 'showAsValue property',
    },
    legendData: {
      control: 'text',
      description: 'legendData property',
    },
    activeLabel: {
      control: 'text',
      description: 'activeLabel property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'showLegends': true,
    'centerText': true,
    'showAsValue': false,
    'activeLabel': 'Total Data'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
