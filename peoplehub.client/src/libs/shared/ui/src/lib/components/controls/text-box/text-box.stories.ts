import { Meta, StoryObj } from '@storybook/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxComponent } from './text-box.component';

type Story = StoryObj<TextBoxComponent>;

const meta: Meta<TextBoxComponent> = {
  component: TextBoxComponent,
  title: 'UI/Controls/Text Box',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
    isFocused: {
      control: 'boolean',
      description: 'isFocused property',
    },
    showBorder: {
      control: 'boolean',
      description: 'showBorder property',
    },
    minLength: {
      control: 'number',
      description: 'minLength property',
    },
    maxLength: {
      control: 'number',
      description: 'maxLength property',
    },
    showCharCount: {
      control: 'boolean',
      description: 'showCharCount property',
    },
    parentFormGroup: {
      control: 'text',
      description: 'parentFormGroup property',
    },
    id: {
      control: 'text',
      description: 'id property',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'isReadOnly property',
    },
    isAllowSpecialChars: {
      control: 'boolean',
      description: 'isAllowSpecialChars property',
    },
    tabindex: {
      control: 'number',
      description: 'tabindex property',
    },
    value: {
      control: 'text',
      description: 'value property',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    label: 'Text Box',
    placeholder: 'Enter here...',
    isRequired: true,
    isFocused: false,
    showBorder: true,
    minLength: 0,
    maxLength: 50,
    showCharCount: true,
    isReadOnly: false,
    isAllowSpecialChars: true,
    value: '',
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        textBox: new FormControl(''),
      }),
      id: 'textBox',
    },
    template: `
      <div class="w-96">
        <ui-text-box
          [label]="label"
          [placeholder]="placeholder"
          [isRequired]="isRequired"
          [isFocused]="isFocused"
          [showBorder]="showBorder"
          [minLength]="minLength"
          [maxLength]="maxLength"
          [showCharCount]="showCharCount"
          [isReadOnly]="isReadOnly"
          [isAllowSpecialChars]="isAllowSpecialChars"
          [value]="value"
          [tabindex]="tabindex"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-text-box>
      </div>
    `,
  }),
};

export const Alternative: Story = {
  args: {
    ...Default.args,
    label: 'Name',
    placeholder: 'Enter your name...',
    isRequired: false,
    maxLength: 100,
  },
  render: (args) => ({
    props: {
      ...args,
      parentFormGroup: new FormGroup({
        name: new FormControl(''),
      }),
      id: 'name',
    },
    template: `
      <div class="w-96">
        <ui-text-box
          [label]="label"
          [placeholder]="placeholder"
          [isRequired]="isRequired"
          [isFocused]="isFocused"
          [showBorder]="showBorder"
          [minLength]="minLength"
          [maxLength]="maxLength"
          [showCharCount]="showCharCount"
          [isReadOnly]="isReadOnly"
          [isAllowSpecialChars]="isAllowSpecialChars"
          [value]="value"
          [tabindex]="tabindex"
          [parentFormGroup]="parentFormGroup"
          [id]="id">
        </ui-text-box>
      </div>
    `,
  }),
};
