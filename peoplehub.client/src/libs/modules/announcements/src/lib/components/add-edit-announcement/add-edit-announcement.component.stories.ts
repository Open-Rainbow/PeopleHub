import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { AddEditAnnouncementComponent } from './add-edit-announcement.component';

type Story = StoryObj<AddEditAnnouncementComponent>;

const meta: Meta<AddEditAnnouncementComponent> = {
  component: AddEditAnnouncementComponent,
  title: 'modules/announcements/AddEditAnnouncement',
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
