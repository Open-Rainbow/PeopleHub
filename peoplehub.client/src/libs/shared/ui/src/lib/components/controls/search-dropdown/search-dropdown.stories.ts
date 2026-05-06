import { Meta, StoryObj } from '@storybook/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchDropdownComponent } from './search-dropdown.component';
import type { SearchDropdownOption } from '../../../models/value-configs/search-dropdown-option.model';

type Story = StoryObj<SearchDropdownComponent>;

const employeeData = [
  { name: 'Sandeep', email: 'sandeep@gmail.com', position: 'Senior Dev', department: 'Developer' },
  { name: 'Srikant', email: 'srikant@gmail.com', position: 'Junior Dev', department: 'Full Stack' },
  { name: 'Auro', email: 'auro@gmail.com', position: 'Intern', department: 'Developer' },
  { name: 'Arobinda', email: 'arobinda@gmail.com', position: 'Trainee', department: 'HR' },
  { name: 'Bikram', email: 'bikram@gmail.com', position: 'Senior Dev', department: 'Developer' },
  { name: 'Rajesh', email: 'rajesh@gmail.com', position: 'Intern', department: 'Database' },
  { name: 'Rakesh', email: 'rakesh@gmail.com', position: 'Trainee', department: 'HR' },
];

const employeeConfig: SearchDropdownOption = {
  displayField: 'name',
  subtitleField: 'email',
  descriptionField: 'position',
  searchFields: ['name', 'email', 'position'],
};

const meta: Meta<SearchDropdownComponent> = {
  component: SearchDropdownComponent,
  title: 'UI/Controls/Search Dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text above search input',
    },
    placeholderText: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border around search input',
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
    },
    data: {
      control: 'object',
      description: 'Array of items to search',
    },
    config: {
      control: 'object',
      description: 'SearchDropdownOption - configure which fields to display and search',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Search Employees',
    placeholderText: 'Search employees by name, email, position...',
    showBorder: true,
    borderColor: '#2563eb',
    data: employeeData,
    config: employeeConfig,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        employeeSearch: new FormControl(''),
      }),
      id: 'employeeSearch',
    },
    template: `
      <div class="w-96">
        <ui-search-dropdown
          [label]="label"
          [placeholderText]="placeholderText"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [data]="data"
          [config]="config"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-search-dropdown>
      </div>
    `,
  }),
};

export const WithoutConfig: Story = {
  args: {
    label: 'Search',
    placeholderText: 'Search by any field...',
    showBorder: true,
    borderColor: '#2563eb',
    data: employeeData,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        search: new FormControl(''),
      }),
      id: 'search',
    },
    template: `
      <div class="w-96">
        <ui-search-dropdown
          [label]="label"
          [placeholderText]="placeholderText"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [data]="data"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-search-dropdown>
      </div>
    `,
  }),
};

export const Colored: Story = {
  args: {
    label: 'Search Employees',
    placeholderText: 'Search employees...',
    showBorder: true,
    borderColor: '#7c3aed',
    data: employeeData,
    config: employeeConfig,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        employeeSearch: new FormControl(''),
      }),
      id: 'employeeSearch',
    },
    template: `
      <div class="w-96">
        <ui-search-dropdown
          [label]="label"
          [placeholderText]="placeholderText"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [data]="data"
          [config]="config"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-search-dropdown>
      </div>
    `,
  }),
};
