import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AssetsComponent } from './assets.component';
import { CommonService, DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<AssetsComponent>;

const meta: Meta<AssetsComponent> = {
  component: AssetsComponent,
  title: 'employees/Assets',
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
