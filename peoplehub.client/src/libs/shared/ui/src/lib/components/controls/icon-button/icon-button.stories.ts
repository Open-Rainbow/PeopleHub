import { Meta, StoryObj } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';

type Story = StoryObj<IconButtonComponent>;

const meta: Meta<IconButtonComponent> = {
  component: IconButtonComponent,
  title: 'UI/Controls/Icon Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bgColor: {
      control: 'text',
      description: 'bgColor property',
    },
    color: {
      control: 'text',
      description: 'color property',
    },
    hoverBgColor: {
      control: 'text',
      description: 'hoverBgColor property',
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
    isExpanded: {
      control: 'boolean',
      description: 'isExpanded property',
    },
    iconName: {
      control: 'text',
      description: 'iconName property',
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
    bgColor: 'white',
    color: 'red',
    hoverBgColor: 'red',
    hoverColor: 'black',
    borderRadius: 6,
    borderColor: 'blue',
    showBorder: true,
    disable: false,
    isExpanded: false,
    iconName: 'home',
},
};

export const Disabled: Story = {
  args: {
    bgColor: 'white',
    color: 'red',
    hoverBgColor: 'red',
    hoverColor: 'black',
    borderRadius: 6,
    borderColor: 'blue',
    showBorder: true,
    disable: true,
    isExpanded: false,
    iconName: 'home',
},
};

export const Colored: Story = {
  args: {
    bgColor: '#FF5733',
    color: 'red',
    hoverBgColor: 'red',
    hoverColor: 'black',
    borderRadius: 6,
    borderColor: 'blue',
    showBorder: true,
    disable: false,
    isExpanded: false,
    iconName: 'home',
},
};
