import { Meta, StoryObj } from '@storybook/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

type Story = StoryObj<TextAreaComponent>;

const meta: Meta<TextAreaComponent> = {
  component: TextAreaComponent,
  title: 'UI/Controls/Text Area',
  tags: ['autodocs'],
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    showBorder: {
      control: 'boolean',
      description: 'Show border around textarea',
    },
    borderColor: {
      control: 'color',
      description: 'Border color when focused',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    minLength: {
      control: 'number',
      description: 'Minimum character length',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Show character count indicator',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    isRequired: true,
    showBorder: true,
    borderColor: '#2563eb',
    maxLength: 500,
    minLength: 0,
    showCharCount: true,
    rows: 4,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        description: new FormControl(''),
      }),
      id: 'description',
    },
    template: `
      <div class="w-96">
        <ui-text-area
          [label]="label"
          [placeholder]="placeholder"
          [isRequired]="isRequired"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [maxLength]="maxLength"
          [minLength]="minLength"
          [showCharCount]="showCharCount"
          [rows]="rows"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-text-area>
      </div>
    `,
  }),
};

export const Optional: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add optional notes...',
    isRequired: false,
    showBorder: true,
    borderColor: '#2563eb',
    maxLength: 300,
    minLength: 0,
    showCharCount: true,
    rows: 3,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        notes: new FormControl(''),
      }),
      id: 'notes',
    },
    template: `
      <div class="w-96">
        <ui-text-area
          [label]="label"
          [placeholder]="placeholder"
          [isRequired]="isRequired"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [maxLength]="maxLength"
          [minLength]="minLength"
          [showCharCount]="showCharCount"
          [rows]="rows"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-text-area>
      </div>
    `,
  }),
};

export const Colored: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Share your feedback...',
    isRequired: true,
    showBorder: true,
    borderColor: '#7c3aed',
    maxLength: 1000,
    minLength: 10,
    showCharCount: true,
    rows: 5,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        feedback: new FormControl(''),
      }),
      id: 'feedback',
    },
    template: `
      <div class="w-96">
        <ui-text-area
          [label]="label"
          [placeholder]="placeholder"
          [isRequired]="isRequired"
          [showBorder]="showBorder"
          [borderColor]="borderColor"
          [maxLength]="maxLength"
          [minLength]="minLength"
          [showCharCount]="showCharCount"
          [rows]="rows"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-text-area>
      </div>
    `,
  }),
};
