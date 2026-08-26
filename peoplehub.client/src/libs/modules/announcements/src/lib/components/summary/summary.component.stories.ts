import { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { SummaryComponent } from './summary.component';

type Story = StoryObj<SummaryComponent>;

const meta: Meta<SummaryComponent> = {
  component: SummaryComponent,
  title: 'modules/announcements/Summary',
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

