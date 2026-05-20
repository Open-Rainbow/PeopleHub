import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { StepperComponent } from './stepper.component';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<StepperComponent>;

const meta: Meta<StepperComponent> = {
  component: StepperComponent,
  title: 'employees/Stepper',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
      providers: [
        StepperService,
        EmployeeDataService,
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
