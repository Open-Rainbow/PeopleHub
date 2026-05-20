import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SalaryStructureComponent } from './salary-structure.component';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<SalaryStructureComponent>;

const meta: Meta<SalaryStructureComponent> = {
  component: SalaryStructureComponent,
  title: 'employees/SalaryStructure',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
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
