import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { EducationDetailsComponent } from './education-details.component';
import { CommonService } from 'common';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<EducationDetailsComponent>;

const meta: Meta<EducationDetailsComponent> = {
  component: EducationDetailsComponent,
  title: 'employees/EducationDetails',
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


