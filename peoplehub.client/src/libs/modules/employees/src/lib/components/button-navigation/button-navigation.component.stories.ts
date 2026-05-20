import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonNavigationComponent } from './button-navigation.component';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';
import { EmployeesService } from '../../services/employees.service';
import { ConfirmPopupService } from 'ui';

type Story = StoryObj<ButtonNavigationComponent>;

const meta: Meta<ButtonNavigationComponent> = {
  component: ButtonNavigationComponent,
  title: 'employees/ButtonNavigation',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
      providers: [
        StepperService,
        EmployeeDataService,
        EmployeesService,
        ConfirmPopupService,
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
