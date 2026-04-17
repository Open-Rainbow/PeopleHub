import { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './text-area.component';

type Story = StoryObj<TextAreaComponent>;

const meta: Meta<TextAreaComponent> = {
  component: TextAreaComponent,
  title: 'UI/Controls/Text Area',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    maxLength: {
      control: 'number',
      description: 'maxLength property',
    },
    minLength: {
      control: 'number',
      description: 'minLength property',
    },
    showCharCount: {
      control: 'boolean',
      description: 'showCharCount property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'label': 'Text Area',
    'placeholder': 'Enter text area',
    'isRequired': true,
    'showBorder': true,
    'maxLength': 20,
    'minLength': 0,
    'showCharCount': true
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
