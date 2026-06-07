import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FamilyDetailsComponent } from './family-details.component';
import { CommonService, DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<FamilyDetailsComponent>;

const meta: Meta<FamilyDetailsComponent> = {
  component: FamilyDetailsComponent,
  title: 'employees/FamilyDetails',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [CommonService, DropdownConfigService, StepperService, EmployeeDataService],
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
