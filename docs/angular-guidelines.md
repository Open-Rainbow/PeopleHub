# Angular Guidelines

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript

- Enable strict type checking (`strict: true` in `tsconfig.json`).
- Prefer type inference when types are obvious.
- Avoid `any`; use `unknown` when uncertain.

## Core Principles

- Use **standalone components** (`standalone: true`) in every component — no NgModules.
- Use **OnPush change detection** (`ChangeDetectionStrategy.OnPush`).
- Use **signals** for state management and `computed()` for derived state.
- Keep state transformations pure; use `set()` / `update()` — never mutate state directly.
- Use **organization** terminology consistently in code, APIs, and docs; avoid **tenant** naming unless required by external contracts.
- No inline styles.

## Component Design

- Single responsibility per component.
- Prefer small, reusable components; build reusable components for charts and visible elements.
- Use `input()` / `output()` functions, not decorators.
- Use `computed()` for derived state.
- Prefer inline templates for simple components; external templates for complex UI.
- Define host bindings inside the `host` property, not decorators.

## Templates

- Keep templates simple; avoid complex logic.
- Use Angular control flow: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`, `*ngSwitch`).
- Use `async` pipe for observables.
- Use class/style bindings instead of `ngClass`/`ngStyle`.

## State Management

- Use signals and `computed()` for all state.
- Keep transformations pure.
- Use `set()` or `update()` — never mutate directly.

## Styling

- Use SCSS.
- Use design tokens (CSS variables); avoid hard-coded values.
- Any new color must define both light and dark theme tokens; do not add single-theme-only colors.
- When copying or moving frontend files into this project, convert any `.css` files/references to `.scss` immediately.

```css
color: var(--color-primary);
margin: var(--space-md);
```

## Forms

- Use Reactive Forms only.

## Services

- Single responsibility per service.
- Use `providedIn: 'root'`.
- Prefer `inject()` over constructor injection.
- Put all API calls in services.

## Performance

- Lazy load feature routes.
- Optimize images with `NgOptimizedImage` (not inline base64).

## Accessibility

- Must pass AXE checks.
- WCAG AA compliance required (focus management, contrast, ARIA attributes).
