import { Meta, StoryObj } from '@storybook/angular';
import { ViewAnnouncementComponent } from './view-announcement.component';
import { AnnouncementInfo, TeamData } from 'common';

type Story = StoryObj<ViewAnnouncementComponent>;

const teamData: TeamData[] = [
  {
    name: 'Ganesh',
    designation: 'UI/UX Designer',
    empID: 'CECO_10111',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1661757403301-ae68e1f1b827?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=735',
    priority: 'High',
  },
];

const announcementInfo: AnnouncementInfo[] = [
  {
    icon: 'calendar',
    label: 'PUBLISHED',
    value: '10 Feb 2026',
  },
  {
    icon: 'edit',
    label: 'EXPIRES',
    value: '15 Mar 2026',
  },
  {
    icon: 'delete',
    label: 'AUDIENCE',
    value: 'All Employees',
  },
];

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
  args: {
    title: 'Annual Company Retreat - Registration Open',
    data: teamData,
    announcementInfo,
  },
};
