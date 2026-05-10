import { Meta, StoryObj } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';

type Story = StoryObj<ButtonGroupComponent>;

const LEFT_MIDDLE_RIGHT = [
  { label: 'Left', value: 'left' },
  { label: 'Middle', value: 'middle' },
  { label: 'Right', value: 'right' },
];

const NUMBERED = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

const MIXED_COLORS = [
  { label: 'Left', value: 'left', color: '#3b82f6' },
  { label: 'Middle', value: 'middle', color: '#10b981' },
  { label: 'Right', value: 'right', color: '#f59e0b' },
];

const meta: Meta<ButtonGroupComponent> = {
  component: ButtonGroupComponent,
  id: 'ui-primitives-button-list',
  title: 'UI/Primitives/Button Group',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'mixed'],
      description: 'visual style variant of the button group',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'size of each button in the group',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'layout direction of the button group',
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      description: 'controls how many buttons can be selected',
    },
    ariaLabel: {
      control: 'text',
      description: 'accessible label for the group element',
    },
  },
};

export default meta;

// Keep legacy id compatibility: ui-primitives-button-list--default
export const Default: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['left'],
    ariaLabel: 'Default button group',
  },
};

// ── Basic ──────────────────────────────────────────────────────────────────
export const Basic: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['left'],
    ariaLabel: 'Basic button group',
  },
};

// ── Outlined ───────────────────────────────────────────────────────────────
export const Outlined: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'outlined',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['middle'],
    ariaLabel: 'Outlined button group',
  },
};

// ── Mixed styles ───────────────────────────────────────────────────────────
export const MixedStyles: Story = {
  args: {
    items: MIXED_COLORS,
    variant: 'mixed',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'none',
    ariaLabel: 'Mixed styles button group',
  },
};

// ── Checkbox (multiple selection) ──────────────────────────────────────────
export const CheckboxGroup: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'outlined',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'multiple',
    selectedValues: ['left', 'right'],
    ariaLabel: 'Checkbox button group',
  },
};

// ── Radio (single selection) ───────────────────────────────────────────────
export const RadioGroup: Story = {
  args: {
    items: NUMBERED,
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['3'],
    ariaLabel: 'Radio button group',
  },
};

// ── Sizing ─────────────────────────────────────────────────────────────────
export const SizingSmall: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'default',
    size: 'sm',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['left'],
    ariaLabel: 'Small button group',
  },
};

export const SizingLarge: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'default',
    size: 'lg',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['left'],
    ariaLabel: 'Large button group',
  },
};

// ── Vertical ───────────────────────────────────────────────────────────────
export const Vertical: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'default',
    size: 'md',
    orientation: 'vertical',
    selectionMode: 'single',
    selectedValues: ['middle'],
    ariaLabel: 'Vertical button group',
  },
};

// ── With disabled button ────────────────────────────────────────────────────
export const WithDisabled: Story = {
  args: {
    items: [
      { label: 'Left', value: 'left' },
      { label: 'Middle (disabled)', value: 'middle', disabled: true },
      { label: 'Right', value: 'right' },
    ],
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'single',
    selectedValues: ['left'],
    ariaLabel: 'Button group with disabled button',
  },
};

// ── No selection (clickable only) ──────────────────────────────────────────
export const NoSelection: Story = {
  args: {
    items: LEFT_MIDDLE_RIGHT,
    variant: 'outlined',
    size: 'md',
    orientation: 'horizontal',
    selectionMode: 'none',
    ariaLabel: 'Non-selectable button group',
  },
};
