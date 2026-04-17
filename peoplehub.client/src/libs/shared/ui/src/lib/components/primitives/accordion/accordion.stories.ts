import { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';

type Story = StoryObj<AccordionComponent>;

const meta: Meta<AccordionComponent> = {
  component: AccordionComponent,
  title: 'ui-accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modalTemplate: {
      control: 'text',
      description: 'modalTemplate property',
    },
    sectionId: {
      control: 'text',
      description: 'sectionId property',
    },
    isOpen: {
      control: 'boolean',
      description: 'isOpen property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'sectionId': '',
    'isOpen': false
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
