import { Meta, StoryObj } from '@storybook/angular';
import { DocumentsComponent } from './documents.component';

type Story = StoryObj<DocumentsComponent>;

const meta: Meta<DocumentsComponent> = {
  component: DocumentsComponent,
  title: 'documents',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

