import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { AddAnnouncementComponent } from './add-announcement.component';

type Story = StoryObj<AddAnnouncementComponent>;

const meta: Meta<AddAnnouncementComponent> = {
  component: AddAnnouncementComponent,
  title: 'modules/announcements/AddAnnouncement',
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
  args: {},
};

