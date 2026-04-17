import { Meta, StoryObj } from '@storybook/angular';
import { MenuBarComponent } from './menu-bar.component';

type Story = StoryObj<MenuBarComponent>;

const meta: Meta<MenuBarComponent> = {
  component: MenuBarComponent,
  title: 'UI/Primitives/Menu Bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
