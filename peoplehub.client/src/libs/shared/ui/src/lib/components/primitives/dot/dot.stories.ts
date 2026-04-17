import { Meta, StoryObj } from '@storybook/angular';
import { DotComponent } from './dot.component';

type Story = StoryObj<DotComponent>;

const meta: Meta<DotComponent> = {
  component: DotComponent,
  title: 'UI/Primitives/Dot',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    labelColor: {
      control: 'text',
      description: 'labelColor property',
    },
    dotColor: {
      control: 'text',
      description: 'dotColor property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    labelColor: 'lightgreen',
    dotColor: 'lightgreen',
    labelPosition: 'left',
    dotSize: 'small'
},
};

export const Colored: Story = {
  args: {
    labelColor: 'lightgreen',
    labelPosition: 'left',
    dotColor: 'lightgreen',
    dotSize: 'small'
},
};
