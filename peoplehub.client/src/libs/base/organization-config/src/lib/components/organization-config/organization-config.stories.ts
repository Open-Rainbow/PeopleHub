import { Meta, StoryObj } from '@storybook/angular';
import { OrganizationConfigComponent } from './organization-config.component';

type Story = StoryObj<OrganizationConfigComponent>;

const meta: Meta<OrganizationConfigComponent> = {
  component: OrganizationConfigComponent,
  title: 'organization-config',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

