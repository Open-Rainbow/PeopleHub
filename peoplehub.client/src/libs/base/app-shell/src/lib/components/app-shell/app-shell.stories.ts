import { Meta, StoryObj } from '@storybook/angular';
import { AppShellComponent } from './app-shell.component';

type Story = StoryObj<AppShellComponent>;

const meta: Meta<AppShellComponent> = {
  component: AppShellComponent,
  title: 'app-shell',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

