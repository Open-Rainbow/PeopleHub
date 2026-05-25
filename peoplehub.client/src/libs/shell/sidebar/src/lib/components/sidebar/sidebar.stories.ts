import { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

type Story = StoryObj<SidebarComponent>;

const meta: Meta<SidebarComponent> = {
  component: SidebarComponent,
  title: 'sidebar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

