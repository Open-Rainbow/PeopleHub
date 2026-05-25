import { Meta, StoryObj } from '@storybook/angular';
import { FeatureFlagsComponent } from './feature-flags.component';

type Story = StoryObj<FeatureFlagsComponent>;

const meta: Meta<FeatureFlagsComponent> = {
  component: FeatureFlagsComponent,
  title: 'feature-flags',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

