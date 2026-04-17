import { Meta, StoryObj } from '@storybook/angular';
import { DetailedCalendarComponent } from './detailed-calendar.component';

type Story = StoryObj<DetailedCalendarComponent>;

const meta: Meta<DetailedCalendarComponent> = {
  component: DetailedCalendarComponent,
  title: 'ui-detailed-calendar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    defaultDate: {
      control: 'text',
      description: 'defaultDate property',
    },
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
  args: {
    label: 'Date of Birth',
    isRequired: true,
    defaultDate: null
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
