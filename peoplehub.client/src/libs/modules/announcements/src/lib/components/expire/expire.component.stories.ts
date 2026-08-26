import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { ExpireComponent } from './expire.component';

type Story = StoryObj<ExpireComponent>;

const meta: Meta<ExpireComponent> = {
  component: ExpireComponent,
  title: 'modules/announcements/Expire',
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
