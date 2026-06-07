import { Meta, StoryObj } from '@storybook/angular';
import { ChangeRequestsAuditComponent } from './change-requests-audit.component';

type Story = StoryObj<ChangeRequestsAuditComponent>;

const meta: Meta<ChangeRequestsAuditComponent> = {
  component: ChangeRequestsAuditComponent,
  title: 'employees/ChangeRequestsAudit',
  tags: ['autodocs'],
};

export default meta;

export const Primary: Story = {};
