import { Meta, StoryObj } from '@storybook/angular';
import { PerformanceComponent } from './performance.component';

type Story = StoryObj<PerformanceComponent>;

const meta: Meta<PerformanceComponent> = {
  component: PerformanceComponent,
  title: 'performance',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

