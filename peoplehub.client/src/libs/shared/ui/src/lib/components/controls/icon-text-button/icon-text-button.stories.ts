import { Meta, StoryObj } from '@storybook/angular';
import { IconTextButtonComponent } from './icon-text-button.component';

type Story = StoryObj<IconTextButtonComponent>;

const meta: Meta<IconTextButtonComponent> = {
  component: IconTextButtonComponent,
  title: 'UI/Controls/Icon Text Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'text property',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled property',
    },
    isExpanded: {
      control: 'boolean',
      description: 'isExpanded property',
    },
    iconName: {
      control: 'text',
      description: 'iconName property',
    },
    iconPosition: {
      control: 'text',
      description: 'iconPosition property',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'link'],
      description: 'variant property',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'size property',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'native button type',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    text: 'Continue',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    isExpanded: false,
    iconName: 'material-symbols:arrow-forward-rounded',
    iconPosition: 'left',
    type: 'button'
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  },
};

export const RightIcon: Story = {
  args: {
    ...Default.args,
    text: 'Next Step',
    iconPosition: 'right',
    iconName: 'material-symbols:arrow-right-alt-rounded'
  },
};
