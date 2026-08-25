import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { AnnouncementSummaryComponent } from './announcement-summary.component';

type Story = StoryObj<AnnouncementSummaryComponent>;

const meta: Meta<AnnouncementSummaryComponent> = {
  component: AnnouncementSummaryComponent,
  title: 'modules/announcements/AnnouncementSummary',
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
