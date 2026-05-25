import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ContactInfoComponent } from './contact-info.component';
import { CommonService } from 'common';
import { DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<ContactInfoComponent>;

const meta: Meta<ContactInfoComponent> = {
  component: ContactInfoComponent,
  title: 'employees/ContactInfo',
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


