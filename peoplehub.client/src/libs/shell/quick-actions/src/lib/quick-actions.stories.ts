import { Meta, StoryObj } from '@storybook/angular';
import { QuickActionsComponent } from './quick-actions.component';

type Story = StoryObj<QuickActionsComponent>;

const meta: Meta<QuickActionsComponent> = {
  component: QuickActionsComponent,
  title: 'quick-actions',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

