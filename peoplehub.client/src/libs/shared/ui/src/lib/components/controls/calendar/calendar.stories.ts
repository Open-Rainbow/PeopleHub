import { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from './calendar.component';

type Story = StoryObj<CalendarComponent>;

const meta: Meta<CalendarComponent> = {
  component: CalendarComponent,
  title: 'ui-calendar',
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
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    placeHolder: {
      control: 'text',
      description: 'placeHolder property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'label': 'Date of Birth',
    'isRequired': true,
    'placeHolder': 'Select Gender'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
