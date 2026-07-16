import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PersonalInfoComponent } from './personal-info.component';
import { CommonService } from 'common';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<PersonalInfoComponent>;

const meta: Meta<PersonalInfoComponent> = {
  component: PersonalInfoComponent,
  title: 'employees/PersonalInfo',
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
