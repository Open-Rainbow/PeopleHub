import { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

type Story = StoryObj<HeaderComponent>;

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'header',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

