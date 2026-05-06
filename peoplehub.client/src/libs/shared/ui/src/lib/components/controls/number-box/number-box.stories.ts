import { Meta, StoryObj } from '@storybook/angular';
import { NumberBoxComponent } from './number-box.component';

type Story = StoryObj<NumberBoxComponent>;

const meta: Meta<NumberBoxComponent> = {
  component: NumberBoxComponent,
  title: 'UI/Controls/Number Box',
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
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
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    minValue: {
      control: 'number',
      description: 'minValue property',
    },
    maxValue: {
      control: 'number',
      description: 'maxValue property',
    },
    step: {
      control: 'number',
      description: 'step property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Casual',
    isRequired: true,
    placeholder: '0',
    step: 1,
    id: 'casual'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
