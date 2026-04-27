import { Meta, StoryObj } from '@storybook/angular';
import { ApiComponent } from './api.component';

type Story = StoryObj<ApiComponent>;

const meta: Meta<ApiComponent> = {
  component: ApiComponent,
  title: 'api',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

