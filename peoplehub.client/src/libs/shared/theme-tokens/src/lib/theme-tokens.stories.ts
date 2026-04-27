import { Meta, StoryObj } from '@storybook/angular';
import { ThemeTokensComponent } from './theme-tokens.component';

type Story = StoryObj<ThemeTokensComponent>;

const meta: Meta<ThemeTokensComponent> = {
  component: ThemeTokensComponent,
  title: 'theme-tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

