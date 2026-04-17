import { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

type Story = StoryObj<ChipComponent>;

const meta: Meta<ChipComponent> = {
  component: ChipComponent,
  title: 'ui-chip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'text property',
    },
    color: {
      control: 'text',
      description: 'color property',
    },
    bgColor: {
      control: 'text',
      description: 'bgColor property',
    },
    activeBGColor: {
      control: 'text',
      description: 'activeBGColor property',
    },
    activeColor: {
      control: 'text',
      description: 'activeColor property',
    },
    borderRadius: {
      control: 'text',
      description: 'borderRadius property',
    },
    size: {
      control: 'text',
      description: 'size property',
    },
    usePointerCursor: {
      control: 'boolean',
      description: 'usePointerCursor property',
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
    'color': '#6b7280',
    'activeBGColor': '#7c3aed',
    'activeColor': 'white',
    'borderRadius': '9999px',
    'size': 'extrasmall',
    'usePointerCursor': true
},
};

export const Colored: Story = {
  args: {
    'text': 'text',
    'color': '#6b7280',
    'activeBGColor': '#7c3aed',
    'activeColor': 'white',
    'borderRadius': '9999px',
    'size': 'extrasmall',
    'usePointerCursor': true,
    'bgColor': '#FF5733'
},
};
