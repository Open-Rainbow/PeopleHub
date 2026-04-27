import { Meta, StoryObj } from '@storybook/angular';
import { AuthComponent } from './auth.component';

type Story = StoryObj<AuthComponent>;

const meta: Meta<AuthComponent> = {
  component: AuthComponent,
  title: 'auth',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

