import { Meta, StoryObj } from '@storybook/angular';
import { CountWidgetComponent } from './count-widget.component';

type Story = StoryObj<CountWidgetComponent>;

const meta: Meta<CountWidgetComponent> = {
  component: CountWidgetComponent,
  title: 'UI/Primitives/Count Widget',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    labelColor: {
      control: 'text',
      description: 'labelColor property',
    },
    value: {
      control: 'number',
      description: 'value property',
    },
    valueColor: {
      control: 'text',
      description: 'valueColor property',
    },
    borderColor: {
      control: 'text',
      description: 'borderColor property',
    },
    backgroundColor: {
      control: 'text',
      description: 'backgroundColor property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'bottom', 'before', 'after'],
      description: 'labelPosition property',
    },
    labelSize: {
      control: 'text',
      description: 'labelSize property',
    },
    valueSize: {
      control: 'text',
      description: 'valueSize property',
    },
    locale: {
      control: 'text',
      description: 'locale property',
    },
    useGrouping: {
      control: 'boolean',
      description: 'useGrouping property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Total',
    labelColor: '#6b7280',
    value: 20,
    valueColor: '#0284c7',
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    showBorder: true,
    labelPosition: 'top',
    labelSize: '14px',
    valueSize: '24px',
    locale: 'en-US',
    useGrouping: true,
  },
};

export const Colored: Story = {
  args: {
    label: 'Active users',
    labelColor: '#1f2937',
    value: 12500,
    valueColor: '#16a34a',
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
    showBorder: true,
    labelPosition: 'before',
    labelSize: '14px',
    valueSize: '26px',
    locale: 'en-US',
    useGrouping: true,
  },
};
