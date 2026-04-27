import { Meta, StoryObj } from '@storybook/angular';
import { Announcements } from './announcements';

type Story = StoryObj<Announcements>;

const meta: Meta<Announcements> = {
  component: Announcements,
  title: 'modules/announcements',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
