import { Meta, StoryObj } from '@storybook/angular';
import { TextButtonComponent } from './text-button.component';

type Story = StoryObj<TextButtonComponent>;

const meta: Meta<TextButtonComponent> = {
  title: 'UI/Controls/Text Button',
  component: TextButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Button label text',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'light',
        'white',
        'link',
      ],
      description: 'Visual button variant',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    isExpanded: {
      control: 'boolean',
      description: 'Stretch button to full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interaction',
    },
    buttonClick: {
      action: 'buttonClick',
      description: 'Fires when button is clicked',
    },
  },
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'medium',
    isExpanded: false,
    disabled: false,
  },
};

export default meta;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(150px, 1fr)); gap:12px; width:360px;">
        <ui-text-button text="Primary" variant="primary"></ui-text-button>
        <ui-text-button text="Secondary" variant="secondary"></ui-text-button>
        <ui-text-button text="Success" variant="success"></ui-text-button>
        <ui-text-button text="Danger" variant="danger"></ui-text-button>
        <ui-text-button text="Warning" variant="warning"></ui-text-button>
        <ui-text-button text="Info" variant="info"></ui-text-button>
        <ui-text-button text="Dark" variant="dark"></ui-text-button>
        <ui-text-button text="Light" variant="light"></ui-text-button>
        <ui-text-button text="White" variant="white"></ui-text-button>
        <ui-text-button text="Link" variant="link"></ui-text-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <ui-text-button text="Small" size="small"></ui-text-button>
        <ui-text-button text="Medium" size="medium"></ui-text-button>
        <ui-text-button text="Large" size="large"></ui-text-button>
      </div>
    `,
  }),
};

export const VariantSizeCombinations: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(180px, 1fr)); gap:12px; width:420px;">
        <ui-text-button text="Primary Small" variant="primary" size="small"></ui-text-button>
        <ui-text-button text="Success Medium" variant="success" size="medium"></ui-text-button>
        <ui-text-button text="Danger Large" variant="danger" size="large"></ui-text-button>
        <ui-text-button text="Dark Small" variant="dark" size="small"></ui-text-button>
        <ui-text-button text="Info Large" variant="info" size="large"></ui-text-button>
        <ui-text-button text="Link Medium" variant="link" size="medium"></ui-text-button>
      </div>
    `,
  }),
};
