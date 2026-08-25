import { Meta, StoryObj } from '@storybook/angular';
import { ViewAnnouncementComponent } from './view-announcement.component';

type Story = StoryObj<ViewAnnouncementComponent>;

const meta: Meta<ViewAnnouncementComponent> = {
  component: ViewAnnouncementComponent,
  title: 'modules/announcements/ViewAnnouncement',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
