import { Meta, StoryObj } from '@storybook/angular';
import { TextBoxComponent } from './text-box.component';

type Story = StoryObj<TextBoxComponent>;

const meta: Meta<TextBoxComponent> = {
  component: TextBoxComponent,
  title: 'ui-text-box',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    placeHolder: {
      control: 'text',
      description: 'placeHolder property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    isFocused: {
      control: 'boolean',
      description: 'isFocused property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    minLength: {
      control: 'number',
      description: 'minLength property',
    },
    maxLength: {
      control: 'number',
      description: 'maxLength property',
    },
    showCharCount: {
      control: 'boolean',
      description: 'showCharCount property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'isReadOnly property',
    },
    isAllowSpecialChars: {
      control: 'boolean',
      description: 'isAllowSpecialChars property',
    },
    tabindex: {
      control: 'number',
      description: 'tabindex property',
    },
    value: {
      control: 'text',
      description: 'value property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Text Box',
    placeHolder: 'Enter here...',
    isRequired: true,
    isFocused: false,
    showBorder: true,
    minLength: 0,
    maxLength: 50,
    showCharCount: true,
    isReadOnly: false,
    isAllowSpecialChars: true,
    value: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
