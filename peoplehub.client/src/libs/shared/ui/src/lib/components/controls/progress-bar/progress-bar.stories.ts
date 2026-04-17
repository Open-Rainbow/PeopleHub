import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

type Story = StoryObj<ProgressBarComponent>;

const meta: Meta<ProgressBarComponent> = {
  component: ProgressBarComponent,
  title: 'UI/Controls/Progress Bar',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    total: {
      control: 'number',
      description: 'total property',
    },
    used: {
      control: 'number',
      description: 'used property',
    },
    barColor: {
      control: 'text',
      description: 'barColor property',
    },
    showBorderRadius: {
      control: 'boolean',
      description: 'showBorderRadius property',
    },
    totalTextColor: {
      control: 'text',
      description: 'totalTextColor property',
    },
    usedTextColor: {
      control: 'text',
      description: 'usedTextColor property',
    },
    remainingTextColor: {
      control: 'text',
      description: 'remainingTextColor property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    hideDetails: {
      control: 'boolean',
      description: 'hideDetails property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'total': 12,
    'used': 3,
    'barColor': 'blueviolet',
    'showBorderRadius': true,
    'totalTextColor': '#374151',
    'usedTextColor': '#6b7280',
    'remainingTextColor': '#4f46e5',
    'hideDetails': true
},
};

export const Colored: Story = {
  args: {
    'total': 12,
    'used': 3,
    'barColor': 'blueviolet',
    'showBorderRadius': true,
    'totalTextColor': '#374151',
    'usedTextColor': '#6b7280',
    'remainingTextColor': '#4f46e5',
    'hideDetails': true
},
};
