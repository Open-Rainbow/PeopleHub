import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { ExpireAnnouncementComponent } from './expire-announcement.component';

type Story = StoryObj<ExpireAnnouncementComponent>;

const meta: Meta<ExpireAnnouncementComponent> = {
  component: ExpireAnnouncementComponent,
  title: 'modules/announcements/ExpireAnnouncement',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
};

export default meta;

export const Default: Story = {
  args: {
    announcements: [
      {
        announcementId: 1,
        title: 'Quarterly Town Hall',
        priority: 'High',
        priorityDesc: 'high',
        description:
          'The quarterly town hall meeting will be held next Friday in the main auditorium.',
        postedDate: '01/12/2024',
        postedBy: 'HR Department',
        expireDate: '15/12/2024',
        expireOn: new Date(),
      },
    ],
  },
};
