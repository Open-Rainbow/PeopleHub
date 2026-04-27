import { Meta, StoryObj } from '@storybook/angular';
import { DashboardComponent } from './dashboard.component';

type Story = StoryObj<DashboardComponent>;

const meta: Meta<DashboardComponent> = {
  component: DashboardComponent,
  title: 'dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

