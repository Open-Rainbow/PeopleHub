import { Meta, StoryObj } from '@storybook/angular';
import { CalendarTimerComponent } from './calendar-timer.component';

type Story = StoryObj<CalendarTimerComponent>;

const meta: Meta<CalendarTimerComponent> = {
  component: CalendarTimerComponent,
  title: 'UI/Controls/Calendar Timer',
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
