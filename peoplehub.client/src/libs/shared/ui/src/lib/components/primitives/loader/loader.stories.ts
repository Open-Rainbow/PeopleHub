import { Meta, StoryObj } from '@storybook/angular';
import { LoaderComponent } from './loader.component';

type Story = StoryObj<LoaderComponent>;

const meta: Meta<LoaderComponent> = {
  component: LoaderComponent,
  title: 'UI/Primitives/Loader',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'text',
      description: 'type property',
    },
    color: {
      control: 'text',
      description: 'color property',
    },
    size: {
      control: 'number',
      description: 'size property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    type: 'spinner',
    color: '#1976d2',
    size: 50
},
};

export const Colored: Story = {
  args: {
    type: 'spinner',
    color: '#1976d2',
    size: 50
},
};
