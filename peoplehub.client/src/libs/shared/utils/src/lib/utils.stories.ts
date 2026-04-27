import { Meta, StoryObj } from '@storybook/angular';
import { UtilsComponent } from './utils.component';

type Story = StoryObj<UtilsComponent>;

const meta: Meta<UtilsComponent> = {
  component: UtilsComponent,
  title: 'utils',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

