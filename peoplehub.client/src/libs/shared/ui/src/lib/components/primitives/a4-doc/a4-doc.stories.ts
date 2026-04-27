import { Meta, StoryObj } from '@storybook/angular';
import { A4DocComponent } from './a4-doc.component';

type Story = StoryObj<A4DocComponent>;

const meta: Meta<A4DocComponent> = {
  component: A4DocComponent,
  title: 'UI/Primitives/A4 Doc',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    docType: {
      control: 'text',
      description: 'docType property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    docType: ''
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
