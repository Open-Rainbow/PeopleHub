import { Meta, StoryObj } from '@storybook/angular';
import { PipesComponent } from './pipes.component';

type Story = StoryObj<PipesComponent>;

const meta: Meta<PipesComponent> = {
  component: PipesComponent,
  title: 'pipes',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

