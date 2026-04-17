import { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';

type Story = StoryObj<SearchBarComponent>;

const meta: Meta<SearchBarComponent> = {
  component: SearchBarComponent,
  title: 'UI/Controls/Search Bar',
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
    iconPosition: {
      control: 'text',
      description: 'iconPosition property',
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
    enableIntelligenceBox: {
      control: 'boolean',
      description: 'enableIntelligenceBox property',
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
    iconPosition: 'right',
    showIcon: true,
    enableIntelligenceBox: true,
    searchData: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe', 'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe']
},
};

export const Colored: Story = {
  args: {
    placeholderText: 'Search employees by name, email, position, or department...',
    showBorder: true,
    borderColor: '#2563eb',
    iconPosition: 'right',
    showIcon: true,
    enableIntelligenceBox: true,
    searchData: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe', 'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green', 'Frank Harris', 'Grace Lee', 'Hannah Martin', 'Ian Clark', 'Jane Doe']
},
};
