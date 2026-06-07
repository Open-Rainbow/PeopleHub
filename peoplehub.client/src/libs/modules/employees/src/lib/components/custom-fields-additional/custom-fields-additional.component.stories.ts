import { Meta, StoryObj } from '@storybook/angular';
import { CustomFieldsAdditionalComponent } from './custom-fields-additional.component';

type Story = StoryObj<CustomFieldsAdditionalComponent>;

const meta: Meta<CustomFieldsAdditionalComponent> = {
  component: CustomFieldsAdditionalComponent,
  title: 'employees/CustomFieldsAdditional',
  tags: ['autodocs'],
};

export default meta;

export const Primary: Story = {};
