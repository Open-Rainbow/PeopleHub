import { Meta, StoryObj } from '@storybook/angular';
import { CommonComponent } from './common.component';

type Story = StoryObj<CommonComponent>;

const meta: Meta<CommonComponent> = {
  component: CommonComponent,
  title: 'common',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

