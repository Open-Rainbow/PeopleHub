import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';

import { LeaveManagementComponent } from './leave-management.component';

/** Without a backend the page runs on demo data (localStorage). */
const meta: Meta<LeaveManagementComponent> = {
  title: 'Leave Management/Leave Policy Manager',
  component: LeaveManagementComponent,
  tags: ['autodocs'],
  decorators: [applicationConfig({ providers: [provideHttpClient()] })],
};

export default meta;

type Story = StoryObj<LeaveManagementComponent>;

export const Default: Story = {};
