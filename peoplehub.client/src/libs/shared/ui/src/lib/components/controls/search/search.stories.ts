import { Meta, StoryObj } from '@storybook/angular';
import { SearchComponent } from './search.component';

type Story = StoryObj<SearchComponent>;

const meta: Meta<SearchComponent> = {
  component: SearchComponent,
  title: 'UI/Controls/Search',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholderText: {
      control: 'text',
      description: 'placeholderText property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    borderColor: {
      control: 'text',
      description: 'borderColor property',
    },
    showIcon: {
      control: 'boolean',
      description: 'showIcon property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    displaySuggestions: {
      control: 'boolean',
      description: 'displaySuggestions property',
    },
    searchData: {
      control: 'text',
      description: 'searchData property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    placeholderText: 'Search employees by name, email, position, or department...',
    showBorder: true,
    borderColor: '#2563eb',
    showIcon: true,
    displaySuggestions: true,
    searchData: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin']
},
};

export const Colored: Story = {
  args: {
    placeholderText: 'Search employees by name, email, position, or department...',
    showBorder: true,
    borderColor: '#2563eb',
    showIcon: true,
    displaySuggestions: true,
    searchData: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin']
},
};
