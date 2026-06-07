import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { IdentityStatutoryComponent } from './identity-statutory.component';
import { CommonService, DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<IdentityStatutoryComponent>;

const meta: Meta<IdentityStatutoryComponent> = {
  component: IdentityStatutoryComponent,
  title: 'employees/IdentityStatutory',
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
