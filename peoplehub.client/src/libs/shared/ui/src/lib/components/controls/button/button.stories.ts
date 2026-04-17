import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

type Story = StoryObj<ButtonComponent>;

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ui-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'text property',
    },
    bgColor: {
      control: 'text',
      description: 'bgColor property',
    },
    color: {
      control: 'text',
      description: 'color property',
    },
    hoverBGColor: {
      control: 'text',
      description: 'hoverBGColor property',
    },
    hoverColor: {
      control: 'text',
      description: 'hoverColor property',
    },
    borderRadius: {
      control: 'number',
      description: 'borderRadius property',
    },
    borderColor: {
      control: 'text',
      description: 'borderColor property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    disable: {
      control: 'boolean',
      description: 'disable property',
    },
    isexpand: {
      control: 'boolean',
      description: 'isexpand property',
    },
    iconName: {
      control: 'text',
      description: 'iconName property',
    },
    iconPosition: {
      control: 'text',
      description: 'iconPosition property',
    },
    borderStyle: {
      control: 'text',
      description: 'borderStyle property',
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
    'text': 'text',
    'bgColor': 'white',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'black',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': false,
    'isexpand': false,
    'iconName': '',
    'iconPosition': 'left',
    'borderStyle': 'solid'
},
};

export const Disabled: Story = {
  args: {
    'text': 'text',
    'bgColor': 'white',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'black',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': true,
    'isexpand': false,
    'iconName': '',
    'iconPosition': 'left',
    'borderStyle': 'solid'
},
};

export const Colored: Story = {
  args: {
    'text': 'text',
    'bgColor': '#FF5733',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'black',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': false,
    'isexpand': false,
    'iconName': '',
    'iconPosition': 'left',
    'borderStyle': 'solid'
},
};
