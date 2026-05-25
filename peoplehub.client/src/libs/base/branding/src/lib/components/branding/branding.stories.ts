import { Meta, StoryObj } from '@storybook/angular';
import { BrandingComponent } from './branding.component';

type Story = StoryObj<BrandingComponent>;

const meta: Meta<BrandingComponent> = {
  component: BrandingComponent,
  title: 'branding',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

