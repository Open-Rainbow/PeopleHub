import { Meta, StoryObj } from '@storybook/angular';
import { ConfirmPopupComponent } from './confirm-popup.component';

type Story = StoryObj<ConfirmPopupComponent>;

const meta: Meta<ConfirmPopupComponent> = {
  component: ConfirmPopupComponent,
  title: 'ui-confirm-popup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
