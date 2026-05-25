import { Meta, StoryObj } from '@storybook/angular';
import { ReportsComponent } from './reports.component';

type Story = StoryObj<ReportsComponent>;

const meta: Meta<ReportsComponent> = {
  component: ReportsComponent,
  title: 'reports',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

