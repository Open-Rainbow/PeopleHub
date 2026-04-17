import { Meta, StoryObj } from '@storybook/angular';
import { IconButtonPopupComponent } from './icon-button-popup.component';

type Story = StoryObj<IconButtonPopupComponent>;

const meta: Meta<IconButtonPopupComponent> = {
  component: IconButtonPopupComponent,
  title: 'ui-icon-button-popup',
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
  },
};

export default meta;

export const Default: Story = {
  args: {
    'description': 'Description text',
    'popupPosition': 'bottom',
    'popupBgColor': '#1f2937',
    'popupTxtColor': '#ffffff',
    'iconName': 'info',
    'bgColor': 'white',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'white',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': false
},
};

export const Disabled: Story = {
  args: {
    'description': 'Description text',
    'popupPosition': 'bottom',
    'popupBgColor': '#1f2937',
    'popupTxtColor': '#ffffff',
    'iconName': 'info',
    'bgColor': 'white',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'white',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': true
},
};

export const Colored: Story = {
  args: {
    'description': 'Description text',
    'popupPosition': 'bottom',
    'popupBgColor': '#1f2937',
    'popupTxtColor': '#ffffff',
    'iconName': 'info',
    'bgColor': '#FF5733',
    'color': 'red',
    'hoverBGColor': 'red',
    'hoverColor': 'white',
    'borderRadius': 8,
    'borderColor': 'blue',
    'showBorder': true,
    'disable': false
},
};
