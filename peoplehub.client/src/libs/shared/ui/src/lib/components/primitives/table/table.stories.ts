import { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';

type Story = StoryObj<TableComponent>;

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'ui-table',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    topPagination: {
      control: 'boolean',
      description: 'topPagination property',
    },
    bottomPagination: {
      control: 'boolean',
      description: 'bottomPagination property',
    },
    showSerialNo: {
      control: 'boolean',
      description: 'showSerialNo property',
    },
    showUndoRedo: {
      control: 'boolean',
      description: 'showUndoRedo property',
    },
    canDrag: {
      control: 'boolean',
      description: 'canDrag property',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'showCheckbox property',
    },
    alternateRowColor: {
      control: 'boolean',
      description: 'alternateRowColor property',
    },
    customRowColor: {
      control: 'text',
      description: 'customRowColor property',
    },
    thRadius: {
      control: 'text',
      description: 'thRadius property',
    },
    trRadius: {
      control: 'text',
      description: 'trRadius property',
    },
    tableData: {
      control: 'text',
      description: 'tableData property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    topPagination: true,
    bottomPagination: true,
    showSerialNo: true,
    showUndoRedo: true,
    canDrag: false,
    showCheckbox: true,
    alternateRowColor: true,
    customRowColor: '#dbeafe',
    thRadius: '',
    trRadius: '',
    tableData: []
},
};

export const Colored: Story = {
  args: {
    topPagination: true,
    bottomPagination: true,
    showSerialNo: true,
    showUndoRedo: true,
    canDrag: false,
    showCheckbox: true,
    alternateRowColor: true,
    customRowColor: '#dbeafe',
    thRadius: '',
    trRadius: '',
    tableData: []
},
};
