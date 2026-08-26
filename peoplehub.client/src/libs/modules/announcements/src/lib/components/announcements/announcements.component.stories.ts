import { Meta, StoryObj } from '@storybook/angular';
import { AnnouncementsComponent } from './announcements.component';

type Story = StoryObj<AnnouncementsComponent>;

const meta: Meta<AnnouncementsComponent> = {
  component: AnnouncementsComponent,
  title: 'modules/announcements/AnnouncementBox',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

