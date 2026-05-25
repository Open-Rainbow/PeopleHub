import { Meta, StoryObj } from '@storybook/angular';
import { LayoutComponent } from './layout.component';

type Story = StoryObj<LayoutComponent>;

const meta: Meta<LayoutComponent> = {
  component: LayoutComponent,
  title: 'layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

