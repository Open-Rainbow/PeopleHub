import { Meta, StoryObj } from '@storybook/angular';
import { NotificationsComponent } from './notifications.component';

type Story = StoryObj<NotificationsComponent>;

const meta: Meta<NotificationsComponent> = {
  component: NotificationsComponent,
  title: 'notifications',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

