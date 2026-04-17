import { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

type Story = StoryObj<PaginationComponent>;

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
  title: 'UI/Primitives/Pagination',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    totalItems: {
      control: 'number',
      description: 'totalItems property',
    },
    pageSize: {
      control: 'number',
      description: 'pageSize property',
    },
    currentPage: {
      control: 'number',
      description: 'currentPage property',
    },
    isDropCount: {
      control: 'boolean',
      description: 'isDropCount property',
    },
    isPagination: {
      control: 'boolean',
      description: 'isPagination property',
    },
    isGoto: {
      control: 'boolean',
      description: 'isGoto property',
    },
    isShowingEntries: {
      control: 'boolean',
      description: 'isShowingEntries property',
    },
    backgroundColor: {
      control: 'text',
      description: 'backgroundColor property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    'totalItems': 77,
    'pageSize': 10,
    'currentPage': 1,
    'isDropCount': true,
    'isPagination': true,
    'isGoto': true,
    'isShowingEntries': true,
    'backgroundColor': '#fff4f4'
},
};

export const Colored: Story = {
  args: {
    'totalItems': 77,
    'pageSize': 10,
    'currentPage': 1,
    'isDropCount': true,
    'isPagination': true,
    'isGoto': true,
    'isShowingEntries': true,
    'backgroundColor': '#fff4f4'
},
};
