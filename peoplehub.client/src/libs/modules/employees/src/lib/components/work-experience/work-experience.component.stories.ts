import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { WorkExperienceComponent } from './work-experience.component';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<WorkExperienceComponent>;

const meta: Meta<WorkExperienceComponent> = {
  component: WorkExperienceComponent,
  title: 'employees/WorkExperience',
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
