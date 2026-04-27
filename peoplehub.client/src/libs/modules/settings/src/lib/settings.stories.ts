import { Meta, StoryObj } from '@storybook/angular';
import { SettingsComponent } from './settings.component';

type Story = StoryObj<SettingsComponent>;

const meta: Meta<SettingsComponent> = {
  component: SettingsComponent,
  title: 'settings',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

