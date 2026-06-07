import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SkillsComponent } from './skills.component';
import { CommonService, DropdownConfigService } from 'common';
import { StepperService } from '../../services/stepper/stepper.service';
import { EmployeeDataService } from '../../services/employee-data/employee-data.service';

type Story = StoryObj<SkillsComponent>;

const meta: Meta<SkillsComponent> = {
  component: SkillsComponent,
  title: 'employees/Skills',
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
