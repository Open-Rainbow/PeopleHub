import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DocumentsUploadComponent } from './documents-upload.component';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<DocumentsUploadComponent>;

const meta: Meta<DocumentsUploadComponent> = {
  component: DocumentsUploadComponent,
  title: 'employees/DocumentsUpload',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        CommonService,
        StepperService,
        EmployeeDataService,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};


