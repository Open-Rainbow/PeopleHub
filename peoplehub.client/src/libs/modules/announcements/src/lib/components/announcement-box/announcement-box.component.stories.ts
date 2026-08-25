import { Meta, StoryObj } from '@storybook/angular';
import { AnnouncementBoxComponent } from './announcement-box.component';

type Story = StoryObj<AnnouncementBoxComponent>;

const meta: Meta<AnnouncementBoxComponent> = {
  component: AnnouncementBoxComponent,
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
