import { Meta, StoryObj } from '@storybook/angular';
import { UiComponent } from './ui.component';

type Story = StoryObj<UiComponent>;

const meta: Meta<UiComponent> = {
  component: UiComponent,
  title: 'UI/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

