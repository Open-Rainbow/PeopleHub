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
    ariaLabel: {
      control: 'text',
      description: 'accessible button name',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'native button type',
    },
    title: {
      control: 'text',
      description: 'tooltip title',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    isExpanded: false,
    iconName: 'material-symbols:search-rounded',
    ariaLabel: 'Search',
    title: 'Search',
    type: 'button'
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true
  },
};

export const DangerAction: Story = {
  args: {
    ...Default.args,
    variant: 'danger',
    iconName: 'material-symbols:delete-rounded',
    ariaLabel: 'Delete record',
    title: 'Delete'
  },
};
