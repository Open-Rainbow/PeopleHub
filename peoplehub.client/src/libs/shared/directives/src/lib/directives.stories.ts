import { Meta, StoryObj } from '@storybook/angular';
import { DirectivesComponent } from './directives.component';

type Story = StoryObj<DirectivesComponent>;

const meta: Meta<DirectivesComponent> = {
  component: DirectivesComponent,
  title: 'directives',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

