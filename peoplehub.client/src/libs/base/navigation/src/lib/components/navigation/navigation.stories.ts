import { Meta, StoryObj } from '@storybook/angular';
import { NavigationComponent } from './navigation.component';

type Story = StoryObj<NavigationComponent>;

const meta: Meta<NavigationComponent> = {
  component: NavigationComponent,
  title: 'navigation',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

