import { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

type Story = StoryObj<BreadcrumbsComponent>;

const meta: Meta<BreadcrumbsComponent> = {
  component: BreadcrumbsComponent,
  title: 'breadcrumbs',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

