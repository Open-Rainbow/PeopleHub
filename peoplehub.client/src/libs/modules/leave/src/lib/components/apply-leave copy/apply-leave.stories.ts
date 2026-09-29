import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { ApplyLeaveComponentcopy } from './apply-leave.component';

const meta: Meta<ApplyLeaveComponentcopy> = {
  title: 'Modules/LeaveManagement/ApplyLeave',

  component: ApplyLeaveComponentcopy,

  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
      ],
    }),
  ],

  parameters: {
    layout: 'fullscreen',
  },

  args: {},
};

export default meta;

type Story = StoryObj<ApplyLeaveComponentcopy>;

export const ApplyLeave: Story = {};