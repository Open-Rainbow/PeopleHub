import { Meta, StoryObj } from '@storybook/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValueSelectComponent } from './value-select.component';
import { valueSelectConfig } from '../../../models/value-configs/value-select-config';

type Story = StoryObj<ValueSelectComponent>;

const meta: Meta<ValueSelectComponent> = {
  component: ValueSelectComponent,
  title: 'UI/Controls/Value Select',
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    dropdownValues: {
      control: 'object',
      description: 'Array of DropdownValues with value, textColor, backgroundColor, isDisabled, isDefault',
    },
    defaultSelected: {
      control: 'text',
      description: 'Default selected value',
    },
    textColor: {
      control: 'color',
      description: 'Default text color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Default background color',
    },
    activeBackgroundColor: {
      control: 'color',
      description: 'Background color when open/active',
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
    },
    activeTextColor: {
      control: 'color',
      description: 'Text color when active',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show/hide dropdown icon',
    },
  },
};

export default meta;

export const MonthSelector: Story = {
  render: (args) => {
    const fb = new FormBuilder();
    const form = fb.group({ month: '' });
    return {
      props: {
        ...args,
        parentFormGroup: form,
        id: 'month',
        dropdownValues: valueSelectConfig.calendarDropDown,
        defaultSelected: 'Feb',
      },
    };
  },
  args: {
    textColor: '#111',
    backgroundColor: 'white',
    activeBackgroundColor: '#eaf0ff',
    borderColor: 'lightgray',
    activeTextColor: '#316aff',
    showIcon: true,
  },
};

export const YearSelector: Story = {
  render: (args) => {
    const fb = new FormBuilder();
    const form = fb.group({ year: '' });
    return {
      props: {
        ...args,
        parentFormGroup: form,
        id: 'year',
        dropdownValues: valueSelectConfig.yearDropDown,
        defaultSelected: '2023',
      },
    };
  },
  args: {
    textColor: '#111',
    backgroundColor: 'white',
    activeBackgroundColor: '#eaf0ff',
    borderColor: 'lightgray',
    activeTextColor: '#316aff',
    showIcon: true,
  },
};

export const CustomColors: Story = {
  render: (args) => {
    const fb = new FormBuilder();
    const form = fb.group({ option: '' });
    return {
      props: {
        ...args,
        parentFormGroup: form,
        id: 'option',
        dropdownValues: valueSelectConfig.calendarDropDown,
        defaultSelected: 'Mar',
      },
    };
  },
  args: {
    textColor: '#fff',
    backgroundColor: '#2563eb',
    activeBackgroundColor: '#1e40af',
    borderColor: '#1e40af',
    activeTextColor: '#fbbf24',
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  render: (args) => {
    const fb = new FormBuilder();
    const form = fb.group({ month: '' });
    return {
      props: {
        ...args,
        parentFormGroup: form,
        id: 'month',
        dropdownValues: valueSelectConfig.calendarDropDown,
        defaultSelected: 'Jan',
      },
    };
  },
  args: {
    textColor: '#111',
    backgroundColor: 'white',
    activeBackgroundColor: '#eaf0ff',
    borderColor: 'lightgray',
    activeTextColor: '#316aff',
    showIcon: false,
  },
};
