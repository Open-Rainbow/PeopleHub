import { Meta, StoryObj } from '@storybook/angular';
import { BulletListComponent } from './bullet-list.component';

type Story = StoryObj<BulletListComponent>;

const meta: Meta<BulletListComponent> = {
  component: BulletListComponent,
  title: 'UI/Primitives/Bullet List',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'text',
      description: 'mode property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'mode': 'bullet'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
