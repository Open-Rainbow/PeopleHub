import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BasicInfoComponent } from './basic-info.component';
import { CommonService } from 'common';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<BasicInfoComponent>;

const meta: Meta<BasicInfoComponent> = {
  component: BasicInfoComponent,
  title: 'employees/BasicInfo',
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
