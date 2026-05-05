import { Meta, StoryObj } from '@storybook/angular';
import { IconButtonPopupComponent } from './icon-button-popup.component';

type Story = StoryObj<IconButtonPopupComponent>;

const meta: Meta<IconButtonPopupComponent> = {
  component: IconButtonPopupComponent,
  title: 'UI/Controls/Icon Button Popup',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    description: {
      control: 'text',
      description: 'description property',
    },
    popupPosition: {
      control: 'text',
      description: 'popupPosition property',
    },
    popupBgColor: {
      control: 'text',
      description: 'popupBgColor property',
    },
    popupTxtColor: {
      control: 'text',
      description: 'popupTxtColor property',
    },
    iconName: {
      control: 'text',
      description: 'iconName property',
    },
    iconAriaLabel: {
      control: 'text',
      description: 'accessible label for icon button',
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
    disabled: {
      control: 'boolean',
      description: 'disabled property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    description: 'Description text',
    popupPosition: 'bottom',
    popupBgColor: '#1f2937',
    popupTxtColor: '#ffffff',
    iconName: 'info',
    iconAriaLabel: 'Show info',
    variant: 'secondary',
    size: 'medium',
    disabled: false
},
};

export const Disabled: Story = {
  args: {
    description: 'Description text',
    popupPosition: 'bottom',
    popupBgColor: '#1f2937',
    popupTxtColor: '#ffffff',
    iconName: 'info',
    iconAriaLabel: 'Show info',
    variant: 'secondary',
    size: 'medium',
    disabled: true
},
};

export const Colored: Story = {
  args: {
    description: 'Description text',
    popupPosition: 'bottom',
    popupBgColor: '#1f2937',
    popupTxtColor: '#ffffff',
    iconName: 'info',
    iconAriaLabel: 'Show info',
    variant: 'danger',
    size: 'medium',
    disabled: false
},
};
