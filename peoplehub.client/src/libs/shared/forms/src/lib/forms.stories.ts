import { Meta, StoryObj } from '@storybook/angular';
import { FormsComponent } from './forms.component';

type Story = StoryObj<FormsComponent>;

const meta: Meta<FormsComponent> = {
  component: FormsComponent,
  title: 'forms',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

