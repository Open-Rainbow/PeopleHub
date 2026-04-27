import { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';
import { CHIP_VARIANTS } from '../../../models/component-models/chip.types';

type Story = StoryObj<ChipComponent>;

const meta: Meta<ChipComponent> = {
  component: ChipComponent,
  title: 'UI/Controls/Chip',
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
      control: 'select',
      options: ['extrasmall', 'small', 'medium', 'large', 'status'],
      description: 'size property',
    },
    variant: {
      control: 'select',
      options: CHIP_VARIANTS,
      description: 'reference variant palette',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled property',
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
    text: 'text',
    color: '#6b7280',
    variant: 'lightGrey',
    activeBGColor: '#7c3aed',
    activeColor: 'white',
    borderRadius: '9999px',
    size: 'extrasmall',
    disabled: false,
    usePointerCursor: true
},
};

export const Colored: Story = {
  args: {
    text: 'text',
    color: '#6b7280',
    variant: 'lightGrey',
    activeBGColor: '#7c3aed',
    activeColor: 'white',
    borderRadius: '9999px',
    size: 'extrasmall',
    disabled: false,
    usePointerCursor: true,
    bgColor: '#FF5733'
},
};
