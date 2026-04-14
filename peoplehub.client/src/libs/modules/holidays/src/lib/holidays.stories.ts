import { Meta, StoryObj } from '@storybook/angular';
import { HolidaysComponent } from './holidays.component';

type Story = StoryObj<HolidaysComponent>;

const meta: Meta<HolidaysComponent> = {
  component: HolidaysComponent,
  title: 'ph-holidays',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
