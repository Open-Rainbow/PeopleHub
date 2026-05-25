import { Meta, StoryObj } from '@storybook/angular';
import { SuperAdminComponent } from './super-admin.component';

type Story = StoryObj<SuperAdminComponent>;

const meta: Meta<SuperAdminComponent> = {
  component: SuperAdminComponent,
  title: 'super-admin',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

