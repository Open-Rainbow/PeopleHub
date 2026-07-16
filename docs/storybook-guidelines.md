# Storybook Guidelines

## Overview

Storybook is used for **component documentation, visual testing, and development** in PeopleHub. Every component **must have a corresponding `.stories.ts` file** in the same folder as the component.

---

## File Structure Requirement

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.component.spec.ts
└── component-name.stories.ts    ← REQUIRED
```

---

## Story File Template

```typescript
import { Meta, StoryObj } from "@storybook/angular";
import { MyComponent } from "./my.component";

// TypeScript type for strongly-typed stories
type Story = StoryObj<MyComponent>;

// Meta configuration - defines component in Storybook
export const meta: Meta<MyComponent> = {
  component: MyComponent,
  title: "ui-my-component", // Selector name
  tags: ["autodocs"], // Auto-generate docs from JSDoc
  parameters: {
    layout: "centered", // Storybook canvas layout
  },

  // Define all @Input() properties here
  argTypes: {
    label: {
      control: "text",
      description: "Button label text",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description: "Button size variant",
      defaultValue: "medium",
    },
    onClick: {
      action: "clicked",
      description: "Callback when button is clicked",
    },
  },
};

// Default story - shows typical usage
export const Default: Story = {
  args: {
    label: "Click me",
    disabled: false,
    size: "medium",
  },
};

// Alternative story - shows variant
export const Disabled: Story = {
  args: {
    label: "Disabled button",
    disabled: true,
    size: "medium",
  },
};

// Another variant
export const Large: Story = {
  args: {
    label: "Large button",
    disabled: false,
    size: "large",
  },
};
```

---

## Writing Stories Step-by-Step

### 1. Read the Component

Understand all `@Input()` properties and their types:

```typescript
// my.component.ts
@Component({
  selector: "ui-my-component",
  standalone: true,
})
export class MyComponent {
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() variant: "primary" | "secondary" = "primary";
  @Output() onClick = new EventEmitter<void>();
}
```

### 2. Define argTypes

Map each `@Input()` to a Storybook control:

```typescript
argTypes: {
  label: {
    control: 'text',                    // Text input
    description: 'Button label',
  },
  disabled: {
    control: 'boolean',                 // Checkbox
    description: 'Disable button',
  },
  size: {
    control: 'radio',                   // Radio buttons
    options: ['small', 'medium', 'large'],
    description: 'Size variant',
  },
  variant: {
    control: 'select',                  // Dropdown
    options: ['primary', 'secondary'],
    description: 'Color variant',
  },
}
```

### 3. Create Default Story

Show typical/recommended usage:

```typescript
export const Default: Story = {
  args: {
    label: "Click me",
    disabled: false,
    size: "medium",
    variant: "primary",
  },
};
```

### 4. Create Variant Stories

Show different states/configurations:

```typescript
export const Disabled: Story = {
  args: {
    ...Default.args, // Inherit defaults
    disabled: true, // Override specific prop
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: "secondary",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "large",
  },
};
```

---

## Control Types Reference

| Control   | Use For                   | Example                           |
| --------- | ------------------------- | --------------------------------- |
| `text`    | String inputs             | label, placeholder, salutation    |
| `number`  | Numeric values            | borderRadius, padding, z-index    |
| `boolean` | True/false flags          | disabled, showIcon, isRequired    |
| `radio`   | Union types (few options) | size ('small'\|'medium'\|'large') |
| `select`  | Enums or lists            | color, variant, alignment         |
| `date`    | Date values               | startDate, endDate                |
| `color`   | Color hex values          | bgColor, textColor                |
| `object`  | Complex objects           | config, data {...}                |
| `array`   | Lists                     | items, options, labels            |

---

## Story Naming Conventions

```typescript
// ✅ Good - describes the story clearly
export const Default: Story = { ... };
export const Disabled: Story = { ... };
export const WithIcon: Story = { ... };
export const LargeButton: Story = { ... };
export const ErrorState: Story = { ... };
export const Loading: Story = { ... };

// ❌ Avoid - unclear names
export const Story1: Story = { ... };
export const Test: Story = { ... };
export const Example: Story = { ... };
```

---

## Common Patterns

### Dropdown/Select with Options

```typescript
argTypes: {
  options: {
    control: 'object',
    description: 'Dropdown options array',
    defaultValue: [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ],
  },
}
```

### Colors/Theme

```typescript
argTypes: {
  backgroundColor: {
    control: 'color',
    description: 'Background color',
    defaultValue: '#FFFFFF',
  },
}
```

### Event Callback

```typescript
argTypes: {
  onChanged: {
    action: 'changed',               // Will show in Actions panel
    description: 'Fired when value changes',
  },
}
```

---

## Preventing Common Errors

### ❌ Problem: Property doesn't exist

```typescript
// Component has NO @Input() for 'text'
argTypes: {
  text: { ... }           // ❌ ERROR: text not an @Input()
}
```

**Solution:** Only list actual @Input() properties

### ❌ Problem: Duplicate property names

```typescript
argTypes: {
  label: { ... },
  label: { ... }          // ❌ ERROR: Duplicate
}
```

**Solution:** Each property appears exactly once

### ❌ Problem: String instead of array

```typescript
argTypes: {
  items: {
    control: 'text',
    defaultValue: '[]',   // ❌ String, should be array
  }
}
```

**Solution:** Use actual arrays

```typescript
items: {
  control: 'object',
  defaultValue: [],       // ✅ Actual array
}
```

### ❌ Problem: Missing component import

```typescript
export const meta: Meta<ButtonComponent> = {
  component: ButtonComponent, // ❌ Not imported
};
```

**Solution:** Import the component

```typescript
import { ButtonComponent } from "./button.component";
```

---

## Storybook CLI

```bash
# Start Storybook dev server (Port 6006)
npm run storybook

# Build static Storybook (for CI/deployment)
npm run build-storybook

# Build and serve (Storybook 7+)
npm run storybook -- --host 0.0.0.0
```

---

## Storybook Configuration

**storybook/main.ts** - Main Storybook config:

```typescript
import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../src/libs/**/*.stories.ts", // Find all stories
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y", // Accessibility checks
  ],
  framework: "@storybook/angular",
};

export default config;
```

---

## Best Practices

### ✅ Do

- **Keep stories simple** - Show one thing per story
- **Use meaningful names** - `export const Disabled: Story` (not `export const Story2`)
- **Document with descriptions** - Add `description` field to argTypes
- **Test visually** - Verify component renders correctly in Storybook
- **Include realistic data** - Use sample data similar to production
- **Create variants** - Show all important states/configurations
- **Keep stories in sync** - Update when component inputs change

### ❌ Don't

- **Use magic values** - Always explain what properties do
- **Create too many stories** - Focus on important variants
- **Hard-code component state** - Use args for dynamic values
- **Import external styles** - Storybook loads global styles
- **Test business logic** - That's for unit tests
- **Leave outdated stories** - Remove unused variants

---

## Story Organization in Storybook

Stories appear organized by folder in Storybook sidebar:

```
Storybook Sidebar:
├── ui-button
├── ui-dropdown
├── ui-icon
├── ui-line-chart
├── ui-toast-stack
├── ui-table
├── ui-pagination
└── ui-calendar
```

**Title convention:** Matches component selector for clarity

---

## Running & Viewing Stories

1. **Start Storybook:**

   ```bash
   npm run storybook
   ```

2. **Open in browser:**

   ```
   http://localhost:6006
   ```

3. **Navigate stories:**
   - Left sidebar: Browse all component stories
   - Center: View current story
   - Right panel: Adjust controls, view actions, check accessibility

4. **Test interactions:**
   - Change control values
   - Verify component re-renders correctly
   - Check Actions panel for callbacks

---

## Future Enhancements

- [ ] Visual regression testing with Percy
- [ ] Accessibility (a11y) validation for all stories
- [ ] Interaction tests with Storybook play() functions
- [ ] Generate component documentation from JSDoc comments
- [ ] Custom Storybook addons for design token inspection
