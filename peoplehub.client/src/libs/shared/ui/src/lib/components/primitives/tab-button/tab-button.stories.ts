import { Meta, StoryObj } from '@storybook/angular';
import { TabButtonComponent } from './tab-button';

type Story = StoryObj<TabButtonComponent>;

const meta: Meta<TabButtonComponent> = {
  component: TabButtonComponent,
  title: 'tab-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'systemAccess',
        label: 'System Access',
      },
      {
        id: 'assetsCompliance',
        label: 'Assets and Compliance',
      },
      {
        id: 'security',
        label: 'Security',
      },
      {
        id: 'documents',
        label: 'Documents',
      },
    ],
    activeTab: 'systemAccess',
  },
};