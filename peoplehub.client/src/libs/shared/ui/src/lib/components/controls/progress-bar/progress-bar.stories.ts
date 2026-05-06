import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

type Story = StoryObj<ProgressBarComponent>;

const meta: Meta<ProgressBarComponent> = {
  component: ProgressBarComponent,
  title: 'UI/Controls/Progress Bar',
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
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
    remainingLabel: {
      control: 'text',
      description: 'remaining label text (example: days remaining, hours left, items pending)',
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
  render: (args) => ({
    props: args,
    template: `<div style="width: 320px;"><ui-progress-bar [total]="total" [used]="used" [remainingLabel]="remainingLabel" [barColor]="barColor" [showBorderRadius]="showBorderRadius" [totalTextColor]="totalTextColor" [usedTextColor]="usedTextColor" [remainingTextColor]="remainingTextColor" [hideDetails]="hideDetails"></ui-progress-bar></div>`,
  }),
  args: {
    total: 12,
    used: 3,
    remainingLabel: 'days remaining',
    barColor: 'blueviolet',
    showBorderRadius: true,
    totalTextColor: '#374151',
    usedTextColor: '#6b7280',
    remainingTextColor: '#4f46e5',
    hideDetails: false,
  },
};

export const Colored: Story = {
  render: (args) => ({
    props: args,
    template: `<div style="width: 320px;"><ui-progress-bar [total]="total" [used]="used" [remainingLabel]="remainingLabel" [barColor]="barColor" [showBorderRadius]="showBorderRadius" [totalTextColor]="totalTextColor" [usedTextColor]="usedTextColor" [remainingTextColor]="remainingTextColor" [hideDetails]="hideDetails"></ui-progress-bar></div>`,
  }),
  args: {
    total: 12,
    used: 3,
    remainingLabel: 'items pending',
    barColor: 'blueviolet',
    showBorderRadius: true,
    totalTextColor: '#374151',
    usedTextColor: '#6b7280',
    remainingTextColor: '#4f46e5',
    hideDetails: false,
  },
};
