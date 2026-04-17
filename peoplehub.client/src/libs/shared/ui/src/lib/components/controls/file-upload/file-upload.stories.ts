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
    errorNote: {
      control: 'text',
      description: 'errorNote property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
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
    'label': 'Government ID',
    'isRequired': true,
    'errorNote': 'Please upload jpg, png, mp3 formats only'
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};
