import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { AttendanceComponent } from './attendance.component';

type Story = StoryObj<AttendanceComponent>;

/** Without a backend the page runs on demo data in localStorage ("Offline demo data" badge). */
const meta: Meta<AttendanceComponent> = {
  component: AttendanceComponent,
  title: 'attendance',
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideHttpClient()] })],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Employee: Story = {
  args: { manage: false },
};

export const HrManager: Story = {
  args: { manage: true },
};
