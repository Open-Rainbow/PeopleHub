import { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

type Story = StoryObj<FileUploadComponent>;

const meta: Meta<FileUploadComponent> = {
  component: FileUploadComponent,
  title: 'UI/Controls/File Upload',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    accept: {
      control: 'text',
      description: 'accepted file extensions or MIME types',
    },
    multiple: {
      control: 'boolean',
      description: 'allow multiple file selection',
    },
    showRemoveAction: {
      control: 'boolean',
      description: 'show remove action button',
    },
    errorNote: {
      control: 'text',
      description: 'errorNote property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Government ID',
    isRequired: true,
    placeholder: 'Upload government ID',
    accept: '.jpg,.jpeg,.png,.pdf',
    multiple: false,
    showRemoveAction: true,
    errorNote: 'Please upload jpg, png, or pdf formats only.',
    id: 'governmentId'
  },
};

export const Alternative: Story = {
  args: {
    ...Default.args,
    label: 'Attachments',
    placeholder: 'Upload one or more files',
    accept: '.jpg,.jpeg,.png,.pdf,.doc,.docx',
    multiple: true,
    id: 'attachments'
  },
};
