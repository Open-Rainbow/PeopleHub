import { Meta, StoryObj } from '@storybook/angular';
import { OrganizationContextComponent } from './organization-context.component';

type Story = StoryObj<OrganizationContextComponent>;

const meta: Meta<OrganizationContextComponent> = {
  component: OrganizationContextComponent,
  title: 'organization-context',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

