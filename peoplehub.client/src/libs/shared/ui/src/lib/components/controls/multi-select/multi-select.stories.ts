import { Meta, StoryObj } from '@storybook/angular';
import { MultiSelectComponent } from './multi-select.component';

type Story = StoryObj<MultiSelectComponent>;

const meta: Meta<MultiSelectComponent> = {
  component: MultiSelectComponent,
  title: 'UI/Controls/Multi Select',
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'label property',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder property',
    },
    isRequired: {
      control: 'boolean',
      description: 'isRequired property',
    },
    options: {
      control: 'text',
      description: 'options property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'showSelectAll property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Gender',
    placeholder: 'Select Gender',
    isRequired: false,
    options: [
      { value: 1, name: 'Male' },
      { value: 2, name: 'Female' },
      { value: 3, name: 'Other' },
      { value: 4, name: 'Other1' },
      { value: 5, name: 'Other2' },
      { value: 6, name: 'Other3' },
      { value: 7, name: 'Other4' },
      { value: 8, name: 'Other5' },
    ],
    showSelectAll: true,
},
};

export const Alternative: Story = {
  args: { ...Default.args },
};

export const UsersList: Story = {
  args: {
    label: 'Select Users',
    placeholder: 'Select users from the list',
    isRequired: false,
    options: [
      {
        value: 1,
        name: 'Sophia Hall',
        avatar: 'https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar1.webp',
        email: 'sophia@example.com',
      },
      {
        value: 2,
        name: 'Emily Johnson',
        avatar: 'https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar2.webp',
        email: 'emily@example.com',
      },
      {
        value: 3,
        name: 'Olivia Clark',
        avatar: 'https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar3.webp',
        email: 'olivia@example.com',
      },
      {
        value: 4,
        name: 'Michael Davis',
        avatar: 'https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar4.webp',
        email: 'michael@example.com',
      },
      {
        value: 5,
        name: 'James Anderson',
        avatar: 'https://gxon.layoutdrop.com/demo/assets/images/avatar/avatar5.webp',
        email: 'james@example.com',
      },
    ],
    showSelectAll: true,
  },
};
