import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEmployeeComponent } from './add-employee.component';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';
import { EmployeesService } from '../../services/employees/employees.service';

type Story = StoryObj<AddEmployeeComponent>;

const meta: Meta<AddEmployeeComponent> = {
  component: AddEmployeeComponent,
  title: 'employees/AddEmployee',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        StepperService,
        EmployeeDataService,
        EmployeesService,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
