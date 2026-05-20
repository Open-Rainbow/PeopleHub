import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TempLoginCredentialsComponent } from './temp-login-credentials.component';
import { StepperService } from '../../services/stepper.service';
import { EmployeeDataService } from '../../services/employee-data.service';

type Story = StoryObj<TempLoginCredentialsComponent>;

const meta: Meta<TempLoginCredentialsComponent> = {
  component: TempLoginCredentialsComponent,
  title: 'employees/TempLoginCredentials',
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
