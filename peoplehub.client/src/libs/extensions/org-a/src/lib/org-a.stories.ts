import { Meta, StoryObj } from '@storybook/angular';
import { OrgAComponent } from './org-a.component';

type Story = StoryObj<OrgAComponent>;

const meta: Meta<OrgAComponent> = {
  component: OrgAComponent,
  title: 'org-a',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

