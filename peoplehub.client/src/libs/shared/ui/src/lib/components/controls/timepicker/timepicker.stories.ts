import { Meta, StoryObj } from '@storybook/angular';
import { TimepickerComponent } from './timepicker.component';

type Story = StoryObj<TimepickerComponent>;

const meta: Meta<TimepickerComponent> = {
  component: TimepickerComponent,
  title: 'UI/Controls/Timepicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
