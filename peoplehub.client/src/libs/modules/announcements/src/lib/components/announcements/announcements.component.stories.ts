import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { Announcement } from 'common';
import { AnnouncementsComponent } from './announcements.component';

type Story = StoryObj<AnnouncementsComponent>;

const day = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

const announcements: Announcement[] = [
  {
    announcementId: 125,
    title: 'Office closed for the holidays',
    priority: 'High',
    description:
      'The office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
    postedDate: day(-1),
    postedBy: 'HR Department',
    expireDate: day(14),
  },
  {
    announcementId: 123,
    title: 'Quarterly town hall',
    priority: 'Medium',
    description: 'Join the leadership team on Friday at 4 PM for the quarterly town hall. Questions can be submitted in advance.',
    postedDate: day(-2),
    postedBy: 'Leadership',
    expireDate: day(5),
  },
  {
    announcementId: 124,
    title: 'New security policy',
    priority: 'Low',
    description: 'All employees must update their passwords by the end of the week following the new security guidelines.',
    postedDate: day(-6),
    postedBy: 'IT Security',
    expireDate: day(2),
  },
  {
    announcementId: 126,
    title: 'Annual appraisal window closed',
    priority: 'Medium',
    description: 'Thanks to everyone who submitted their self-review on time.',
    postedDate: day(-40),
    postedBy: 'HR Department',
    expireDate: day(-3),
  },
];

const meta: Meta<AnnouncementsComponent> = {
  component: AnnouncementsComponent,
  title: 'modules/announcements/Announcements',
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideHttpClient()] })],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  args: {
    announcements,
  },
};

export const FromService: Story = {};
