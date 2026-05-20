import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { JobDetailsComponent } from './job-details.component';
import { CommonService } from 'common';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<JobDetailsComponent>;

const meta: Meta<JobDetailsComponent> = {
  component: JobDetailsComponent,
  title: 'employees/JobDetails',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        CommonService,
        DropdownConfigService,
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
