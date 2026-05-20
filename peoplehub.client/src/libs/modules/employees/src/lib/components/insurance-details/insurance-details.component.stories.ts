import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InsuranceDetailsComponent } from './insurance-details.component';
import { CommonService } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<InsuranceDetailsComponent>;

const meta: Meta<InsuranceDetailsComponent> = {
  component: InsuranceDetailsComponent,
  title: 'employees/InsuranceDetails',
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
