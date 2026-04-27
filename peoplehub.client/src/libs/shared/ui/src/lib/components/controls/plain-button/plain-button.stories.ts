import { Meta, StoryObj } from '@storybook/angular';
import { PlainButtonComponent } from './plain-button.component';

type Story = StoryObj<PlainButtonComponent>;

const meta: Meta<PlainButtonComponent> = {
  title: 'UI/Controls/Plain Button',
  component: PlainButtonComponent,
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
        <ui-plain-button text="Primary" variant="primary"></ui-plain-button>
        <ui-plain-button text="Secondary" variant="secondary"></ui-plain-button>
        <ui-plain-button text="Success" variant="success"></ui-plain-button>
        <ui-plain-button text="Danger" variant="danger"></ui-plain-button>
        <ui-plain-button text="Warning" variant="warning"></ui-plain-button>
        <ui-plain-button text="Info" variant="info"></ui-plain-button>
        <ui-plain-button text="Dark" variant="dark"></ui-plain-button>
        <ui-plain-button text="Light" variant="light"></ui-plain-button>
        <ui-plain-button text="White" variant="white"></ui-plain-button>
        <ui-plain-button text="Link" variant="link"></ui-plain-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:12px;">
        <ui-plain-button text="Small" size="small"></ui-plain-button>
        <ui-plain-button text="Medium" size="medium"></ui-plain-button>
        <ui-plain-button text="Large" size="large"></ui-plain-button>
      </div>
    `,
  }),
};

export const VariantSizeCombinations: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, minmax(180px, 1fr)); gap:12px; width:420px;">
        <ui-plain-button text="Primary Small" variant="primary" size="small"></ui-plain-button>
        <ui-plain-button text="Success Medium" variant="success" size="medium"></ui-plain-button>
        <ui-plain-button text="Danger Large" variant="danger" size="large"></ui-plain-button>
        <ui-plain-button text="Dark Small" variant="dark" size="small"></ui-plain-button>
        <ui-plain-button text="Info Large" variant="info" size="large"></ui-plain-button>
        <ui-plain-button text="Link Medium" variant="link" size="medium"></ui-plain-button>
      </div>
    `,
  }),
};
