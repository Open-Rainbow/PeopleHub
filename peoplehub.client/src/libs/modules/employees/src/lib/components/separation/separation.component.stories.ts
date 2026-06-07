import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SeparationComponent } from './separation.component';
import { CommonService, DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<SeparationComponent>;

const meta: Meta<SeparationComponent> = {
  component: SeparationComponent,
  title: 'employees/Separation',
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
