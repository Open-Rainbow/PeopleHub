import { Meta, StoryObj } from '@storybook/angular';
import { ConfirmPopupComponent } from './confirm-popup.component';

type Story = StoryObj<ConfirmPopupComponent>;

const meta: Meta<ConfirmPopupComponent> = {
  component: ConfirmPopupComponent,
  title: 'UI/Primitives/Confirm Popup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
