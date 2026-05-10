import { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { AccordionGroupComponent } from './accordion-group.component';

type Story = StoryObj<AccordionComponent>;

const meta: Meta<AccordionComponent> = {
  component: AccordionComponent,
  title: 'UI/Primitives/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the accordion item',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle/description text',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'flush', 'with-icon'],
      description: 'Visual variant style',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the accordion is open',
    },
    sectionId: {
      control: 'text',
      description: 'Unique identifier for the section',
    },
    showEditButton: {
      control: 'boolean',
      description: 'Show/hide edit button',
    },
    icon: {
      control: 'text',
      description: 'Icon name (for with-icon variant)',
    },
  },
};

export default meta;

const dummyContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type 
specimen book. It has survived not only five centuries, but also the leap into 
electronic typesetting, remaining essentially unchanged.`;

// Default Variant
export const Default: Story = {
  args: {
    title: 'Accordion Item #1',
    subtitle: 'Click to expand',
    variant: 'default',
    isOpen: false,
    sectionId: 'section-1',
    showEditButton: true,
  },
  render: (args) => ({
    props: {
      ...args,
      content: dummyContent,
    },
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <ui-accordion [title]="title" [subtitle]="subtitle" [variant]="variant" 
                      [isOpen]="isOpen" [sectionId]="sectionId" 
                      [showEditButton]="showEditButton">
          <ng-template #modal>
            <p>{{ content }}</p>
          </ng-template>
        </ui-accordion>
      </div>
    `,
  }),
};

// Primary Variant
export const Primary: Story = {
  args: {},
  render: () => ({
    imports: [AccordionComponent, AccordionGroupComponent, CommonModule],
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <h3 class="text-lg font-semibold mb-4">Accordion Custom Primary</h3>
        <ui-accordion-group>
          <ui-accordion 
            [title]="'Accordion Item #1'" 
            [subtitle]="'Features'"
            variant="primary" 
            [sectionId]="'primary-1'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>Features Overview:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Advanced customization options</li>
                  <li>Responsive design patterns</li>
                  <li>Multiple color variants</li>
                  <li>Smooth animations and transitions</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #2'" 
            [subtitle]="'Benefits'"
            variant="primary" 
            [sectionId]="'primary-2'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>Key Benefits:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Improved user experience with smooth interactions</li>
                  <li>Accessibility compliant (WCAG AA)</li>
                  <li>Keyboard navigation support</li>
                  <li>Dark mode compatible</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #3'" 
            [subtitle]="'Usage'"
            variant="primary" 
            [sectionId]="'primary-3'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>How to Use:</strong></p>
                <p>Wrap multiple ui-accordion items in a ui-accordion-group component. Set variant="primary" on each accordion item for the primary color scheme.</p>
              </div>
            </ng-template>
          </ui-accordion>
        </ui-accordion-group>
      </div>
    `,
    props: {},
  }),
};

// Secondary Variant
export const Secondary: Story = {
  args: {},
  render: () => ({
    imports: [AccordionComponent, AccordionGroupComponent, CommonModule],
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <h3 class="text-lg font-semibold mb-4">Accordion Custom Secondary</h3>
        <ui-accordion-group>
          <ui-accordion 
            [title]="'Accordion Item #1'" 
            [subtitle]="'Getting Started'"
            variant="secondary" 
            [sectionId]="'secondary-1'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>Installation Steps:</strong></p>
                <ol class="list-decimal list-inside space-y-1">
                  <li>Import AccordionComponent from shared UI library</li>
                  <li>Import AccordionGroupComponent for grouped behavior</li>
                  <li>Add to your component imports array</li>
                  <li>Use in your template with desired variant</li>
                </ol>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #2'" 
            [subtitle]="'Configuration'"
            variant="secondary" 
            [sectionId]="'secondary-2'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>Available Variants:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li><strong>primary:</strong> Blue gradient theme</li>
                  <li><strong>secondary:</strong> Green gradient theme</li>
                  <li><strong>default:</strong> Gray neutral theme</li>
                  <li><strong>flush:</strong> Borderless underline style</li>
                  <li><strong>with-icon:</strong> Icon display variant</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #3'" 
            [subtitle]="'Best Practices'"
            variant="secondary" 
            [sectionId]="'secondary-3'"
            [showEditButton]="true">
            <ng-template #modal>
              <div class="space-y-2">
                <p><strong>Recommendations:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Use AccordionGroupComponent for related content</li>
                  <li>Set sectionId uniquely for each accordion item</li>
                  <li>Use descriptive titles for better UX</li>
                  <li>Consider accessibility with ARIA attributes</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
        </ui-accordion-group>
      </div>
    `,
    props: {},
  }),
};

// Flush Variant
export const Flush: Story = {
  args: {},
  render: () => ({
    imports: [AccordionComponent, AccordionGroupComponent, CommonModule],
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <h3 class="text-lg font-semibold mb-4">Flush - Borderless Style</h3>
        <p class="text-sm text-gray-600 mb-4">Clean, minimal accordion with underline separators</p>
        <ui-accordion-group variant="flush">
          <ui-accordion 
            [title]="'Accordion Item #1'" 
            variant="flush" 
            [sectionId]="'flush-1'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3 text-gray-700">
                <p>This is the first accordion item with flush styling. The flush variant removes borders and backgrounds for a clean, minimal appearance.</p>
                <p>Perfect for FAQ sections or simple content organization.</p>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #2'" 
            variant="flush" 
            [sectionId]="'flush-2'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3 text-gray-700">
                <p><strong>Key Features:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>No background colors - transparent design</li>
                  <li>Bottom border underline only</li>
                  <li>Ideal for content-focused layouts</li>
                  <li>Supports dark mode automatically</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Accordion Item #3'" 
            variant="flush" 
            [sectionId]="'flush-3'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3 text-gray-700">
                <p><strong>Common Use Cases:</strong></p>
                <ul class="list-disc list-inside space-y-1">
                  <li>FAQ pages and help sections</li>
                  <li>Settings and preferences panels</li>
                  <li>Documentation and guides</li>
                  <li>Product feature lists</li>
                </ul>
              </div>
            </ng-template>
          </ui-accordion>
        </ui-accordion-group>
      </div>
    `,
    props: {},
  }),
};

// With Icon Variant
export const WithIcon: Story = {
  args: {
    title: 'Accordion with Icon',
    subtitle: 'Icon variant accordion',
    variant: 'with-icon',
    icon: 'material-symbols:info',
    isOpen: false,
    sectionId: 'section-5',
    showEditButton: true,
  },
  render: (args) => ({
    props: {
      ...args,
      content: dummyContent,
    },
    template: `
      <div class="w-full max-w-2xl mx-auto p-4 space-y-4">
        <ui-accordion [title]="'Information'" [icon]="'material-symbols:info'" 
                      variant="with-icon" [sectionId]="'icon-1'">
          <ng-template #modal>
            <p>{{ content }}</p>
          </ng-template>
        </ui-accordion>
        <ui-accordion [title]="'Settings'" [icon]="'material-symbols:settings'" 
                      variant="with-icon" [sectionId]="'icon-2'">
          <ng-template #modal>
            <p>Configuration options go here.</p>
          </ng-template>
        </ui-accordion>
        <ui-accordion [title]="'Help & Support'" [icon]="'material-symbols:help'" 
                      variant="with-icon" [sectionId]="'icon-3'">
          <ng-template #modal>
            <p>Get help and support information.</p>
          </ng-template>
        </ui-accordion>
      </div>
    `,
  }),
};

// Always Open (Multiple Items Open)
export const AlwaysOpen: Story = {
  args: {
    allowMultiple: true,
  },
  render: () => ({
    props: {
      content: dummyContent,
    },
    template: `
      <div class="w-full max-w-2xl mx-auto p-4 space-y-4">
        <h3 class="text-lg font-semibold mb-4">Always Open - Multiple Items Can Expand</h3>
        <ui-accordion [title]="'Accordion Item #1'" variant="primary" [sectionId]="'multi-1'" 
                      [isOpen]="true" [allowMultiple]="true">
          <ng-template #modal>
            <p>{{ content }}</p>
          </ng-template>
        </ui-accordion>
        <ui-accordion [title]="'Accordion Item #2'" variant="primary" [sectionId]="'multi-2'" 
                      [allowMultiple]="true">
          <ng-template #modal>
            <p>This item can also remain open along with others.</p>
          </ng-template>
        </ui-accordion>
        <ui-accordion [title]="'Accordion Item #3'" variant="primary" [sectionId]="'multi-3'" 
                      [allowMultiple]="true">
          <ng-template #modal>
            <p>Multiple accordion items can be open simultaneously.</p>
          </ng-template>
        </ui-accordion>
      </div>
    `,
  }),
};

// All Variants
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="w-full max-w-2xl mx-auto p-4 space-y-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">Default</h3>
          <ui-accordion [title]="'Default Accordion'" variant="default" [sectionId]="'all-default'">
            <ng-template #modal>
              <p>{{ content }}</p>
            </ng-template>
          </ui-accordion>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Primary</h3>
          <ui-accordion [title]="'Primary Accordion'" variant="primary" [sectionId]="'all-primary'">
            <ng-template #modal>
              <p>{{ content }}</p>
            </ng-template>
          </ui-accordion>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Secondary</h3>
          <ui-accordion [title]="'Secondary Accordion'" variant="secondary" [sectionId]="'all-secondary'">
            <ng-template #modal>
              <p>{{ content }}</p>
            </ng-template>
          </ui-accordion>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Flush</h3>
          <div class="space-y-0">
            <ui-accordion [title]="'Flush Item #1'" variant="flush" [sectionId]="'all-flush-1'">
              <ng-template #modal>
                <p>{{ content }}</p>
              </ng-template>
            </ui-accordion>
            <ui-accordion [title]="'Flush Item #2'" variant="flush" [sectionId]="'all-flush-2'">
              <ng-template #modal>
                <p>Content item 2</p>
              </ng-template>
            </ui-accordion>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">With Icon</h3>
          <div class="space-y-4">
            <ui-accordion [title]="'Information'" [icon]="'material-symbols:info'" 
                          variant="with-icon" [sectionId]="'all-icon-1'">
              <ng-template #modal>
                <p>{{ content }}</p>
              </ng-template>
            </ui-accordion>
            <ui-accordion [title]="'Settings'" [icon]="'material-symbols:settings'" 
                          variant="with-icon" [sectionId]="'all-icon-2'">
              <ng-template #modal>
                <p>Configuration options</p>
              </ng-template>
            </ui-accordion>
          </div>
        </div>
      </div>
    `,
    props: {
      content: dummyContent,
    },
  }),
};

// Accordion Group with Flush Variant (Mutual Exclusion)
export const FlushMutualExclusion: Story = {
  args: {},
  render: () => ({
    imports: [AccordionComponent, AccordionGroupComponent, CommonModule],
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <h3 class="text-lg font-semibold mb-4">Flush Accordion - Only One Open at a Time</h3>
        <p class="text-sm text-gray-600 mb-4">In flush variant, when you open one accordion, others automatically close.</p>
        <ui-accordion-group variant="flush">
          <ui-accordion 
            [title]="'Basic Information'" 
            variant="flush" 
            [sectionId]="'flush-basic'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3">
                <p class="text-gray-700">This section contains basic information about the employee.</p>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Contact Details'" 
            variant="flush" 
            [sectionId]="'flush-contact'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3">
                <p><strong>Email:</strong> contact@example.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Main Street, City, State 12345</p>
              </div>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Additional Notes'" 
            variant="flush" 
            [sectionId]="'flush-notes'"
            [showEditButton]="false">
            <ng-template #modal>
              <div class="space-y-3">
                <p>Any additional notes or information can be added here.</p>
              </div>
            </ng-template>
          </ui-accordion>
        </ui-accordion-group>
      </div>
    `,
    props: {},
  }),
};

// Accordion Group with Default Variant (Multiple Open)
export const DefaultMultipleOpen: Story = {
  args: {},
  render: () => ({
    imports: [AccordionComponent, AccordionGroupComponent, CommonModule],
    template: `
      <div class="w-full max-w-2xl mx-auto p-4">
        <h3 class="text-lg font-semibold mb-4">Default Accordion - Multiple Can Be Open</h3>
        <p class="text-sm text-gray-600 mb-4">In default variant, you can open multiple accordions at the same time.</p>
        <ui-accordion-group [allowMultiple]="true">
          <ui-accordion 
            [title]="'Section 1: Overview'" 
            [subtitle]="'Key information'"
            variant="default" 
            [sectionId]="'default-1'">
            <ng-template #modal>
              <p>This section provides an overview of the main topic and key concepts.</p>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Section 2: Details'" 
            [subtitle]="'Detailed information'"
            variant="default" 
            [sectionId]="'default-2'">
            <ng-template #modal>
              <p>This section contains detailed information about the topic. You can expand multiple sections at once in the default variant.</p>
            </ng-template>
          </ui-accordion>
          <ui-accordion 
            [title]="'Section 3: Resources'" 
            [subtitle]="'Related links'"
            variant="default" 
            [sectionId]="'default-3'">
            <ng-template #modal>
              <ul class="list-disc list-inside space-y-2">
                <li>Documentation link</li>
                <li>Reference materials</li>
                <li>External resources</li>
              </ul>
            </ng-template>
          </ui-accordion>
        </ui-accordion-group>
      </div>
    `,
    props: {},
  }),
};
