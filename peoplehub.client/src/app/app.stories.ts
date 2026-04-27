import { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

type Story = StoryObj<AppComponent>;

const meta: Meta<AppComponent> = {
  component: AppComponent,
  title: 'app-root',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
