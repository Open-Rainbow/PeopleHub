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
      control: 'text',
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
  },
};

export default meta;

export const Default: Story = {
  args: {
    'label': 'Total',
    'labelColor': 'gray',
    'value': 20,
    'valueColor': 'skyblue',
    'borderColor': 'gray',
    'backgroundColor': 'white',
    'showBorder': true,
    'labelPosition': 'top',
    'labelSize': '14px',
    'valueSize': '24px'
},
};

export const Colored: Story = {
  args: {
    'label': 'Total',
    'labelColor': 'gray',
    'value': 20,
    'valueColor': 'skyblue',
    'borderColor': 'gray',
    'backgroundColor': 'white',
    'showBorder': true,
    'labelPosition': 'top',
    'labelSize': '14px',
    'valueSize': '24px'
},
};
