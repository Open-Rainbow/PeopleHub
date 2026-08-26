import {Meta,StoryObj,} from '@storybook/angular';
import { AnnouncementsComponent } from './announcements.component';
import { Announcement } from 'common';

type Story = StoryObj<AnnouncementsComponent>;
const announcements: Announcement[] = [
  {
    announcementId: 123,
    title: 'Holiday Schedule Update',
    priority: 'Medium',
    description:
      'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
    postedDate: '30/12/2024',
    postedBy: 'HR Department',
    expireDate: '24/12/2024',
    expireOn: new Date(),
    priorityDesc: '',
  },
  {
    announcementId: 124,
    title: 'New Security Policy',
    priority: 'Low',
    description:
      'All employees must update their passwords by end of week following the new security guidelines.',
    postedDate: '25/12/2024',
    postedBy: 'IT Security',
    expireDate: '24/12/2024',
    expireOn: new Date(),
    priorityDesc: '',
  },
  {
    announcementId: 125,
    title: 'Holiday Schedule Update 1',
    priority: 'High',
    description:
      'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
    postedDate: '29/12/2024',
    postedBy: 'HR Department',
    expireDate: '24/12/2024',
    expireOn: new Date(),
    priorityDesc: '',
  },
  {
    announcementId: 126,
    title: 'Holiday Schedule Update 2',
    priority: 'High',
    description:
      'Please note that the office will be closed from December 24th to January 2nd. Emergency contacts will be available during this period.',
    postedDate: '29/12/2024',
    postedBy: 'HR Department',
    expireDate: '24/12/2024',
    expireOn: new Date(),
    priorityDesc: '',
  },
];

const meta: Meta<AnnouncementsComponent> = {
  component: AnnouncementsComponent,
  title: 'modules/announcements/Announcements',
  tags: ['autodocs'],
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

