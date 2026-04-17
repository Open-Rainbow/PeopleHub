import { Meta, StoryObj } from '@storybook/angular';
import { CallerComponent } from './caller.component';

type Story = StoryObj<CallerComponent>;

const meta: Meta<CallerComponent> = {
  component: CallerComponent,
  title: 'ui-caller',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
