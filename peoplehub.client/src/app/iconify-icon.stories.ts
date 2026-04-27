import { Meta, StoryObj } from '@storybook/angular';
import { IconifyIconComponent } from './iconify-icon.component';

type Story = StoryObj<IconifyIconComponent>;

const meta: Meta<IconifyIconComponent> = {
  component: IconifyIconComponent,
  title: 'ph-icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
