# PeopleHub Documentation

Welcome to the **PeopleHub** documentation center. This folder contains comprehensive guides for developing, maintaining, and extending the PeopleHub Human Resource Management System.

---

## 📚 Documentation Index

### For Getting Started
| Document | Purpose |
|----------|---------|
| [**Getting Started Guide**](./getting-started.md) | ⚡ **START HERE** - Setup, installation, development workflow |
| [**Frontend Structure**](./frontend-structure.md) | 📁 Frontend project organization, library dependencies |
| [**Storybook Guidelines**](./storybook-guidelines.md) | 🎨 Component documentation & Storybook usage |

### Architecture & Design
| Document | Purpose |
|----------|---------|
| [**Architecture**](./architecture.md) | 🏗️ Backend/frontend architecture, layering, design patterns |
| [**Angular Guidelines**](./angular-guidelines.md) | ✅ Frontend coding standards, best practices, patterns |
| [**Backend Guidelines**](./backend-guidelines.md) | ✅ Backend coding standards, ASP.NET Core patterns |

### Reference
| Document | Purpose |
|----------|---------|
| **common-ui-classification.csv** | Migration mapping - ORMS components → PeopleHub |
| **common-ui-source-tree.txt** | Source tree reference - ORMS component structure |

---

## 🚀 Quick Start

**Never developed on PeopleHub before?**

1. Read: [Getting Started Guide](./getting-started.md)
2. Install dependencies: `npm install`
3. Start dev server: `npm start`
4. View components: `npm run storybook`
5. Read: [Angular Guidelines](./angular-guidelines.md)
6. Create your first component!

---

## 📖 Documentation Guides

### Core Documentation

#### [Getting Started Guide](./getting-started.md)
- **Prerequisites:** Node.js, npm, .NET 8, SQL Server
- **Frontend setup:** Installation, dev server, dependencies
- **Backend setup:** .NET 8 API server, database setup
- **Development workflow:** Building, testing, debugging
- **Component creation:** Creating new components from scratch
- **Troubleshooting:** Common issues & solutions

**You should read this if:** You're setting up PeopleHub for the first time.

#### [Architecture](./architecture.md)
- **Backend architecture:** Layered architecture (Domain → Application → Infrastructure → Server)
- **Module structure:** Domain, Application, Infrastructure, Worker layers
- **Frontend architecture:** Nx monorepo, feature modules, shared libraries
- **Design patterns:** CQRS, Repository, Dependency Injection
- **Database design:** Entity relationships, materialization

**You should read this if:** You need to understand overall system design.

#### [Frontend Structure](./frontend-structure.md)
- **Project structure:** Folder organization, library responsibilities
- **Library map:** Shared libraries, base libraries, feature modules
- **Component layers:** Primitives, controls, charts, feature components
- **Naming conventions:** Component selectors, file naming
- **Styling:** Design tokens, SCSS, theme variables
- **Dependency hierarchy:** Which libraries depend on which

**You should read this if:** You're working on frontend features or need to understand folder organization.

#### [Angular Guidelines](./angular-guidelines.md)
- **TypeScript standards:** Strict mode, type inference, avoid `any`
- **Component design:** Standalone components, OnPush change detection, signals
- **Type definitions:** Never put interfaces in components, use `.model.ts` files
- **Component structure:** 5 required files (ts, html, scss, spec.ts, stories.ts)
- **Templates:** Control flow syntax, async pipe, property binding
- **Services:** Single responsibility, `providedIn: 'root'`, `inject()`
- **Performance:** Lazy loading, tree-shaking, image optimization
- **Accessibility:** WCAG AA compliance, focus management

**You should read this if:** You're writing Angular code.

#### [Backend Guidelines](./backend-guidelines.md)
- **Architecture rules:** Dependency direction, CQRS patterns
- **API design:** RESTful conventions, consistent response models
- **Data access:** EF Core best practices, N+1 prevention
- **Caching:** Cache strategies, invalidation policies
- **Security:** Authentication, authorization, input validation
- **Observability:** Logging, tracing, monitoring

**You should read this if:** You're writing backend (C#/.NET) code.

#### [Storybook Guidelines](./storybook-guidelines.md)
- **File structure:** Every component needs a `.stories.ts` file
- **Story template:** Meta config, argTypes, default story
- **Writing stories:** Step-by-step guide with examples
- **Control types:** Text, number, boolean, radio, select, color, etc.
- **Best practices:** Clear naming, meaningful descriptions, variant stories
- **Common errors:** Duplicate props, missing components, type mismatches
- **CLI commands:** Storybook start, build, serve

**You should read this if:** You're creating or updating component story files.

---

## 📋 Key Conventions

### Component Files

Every component **must have 5 separate files:**
```
component-name/
├── component-name.component.ts       (Logic)
├── component-name.component.html     (Template)
├── component-name.component.scss     (Styles)
├── component-name.component.spec.ts  (Tests)
└── component-name.stories.ts         (Storybook docs)  ← REQUIRED
```

### Component Selectors

| Library | Prefix | Example |
|---------|--------|---------|
| shared/ui | `ui-` | `ui-button`, `ui-dropdown` |
| Other shared | `ph-` | `ph-common`, `ph-auth` |
| Shell | `ph-` | `ph-layout`, `ph-sidebar` |
| Base | `ph-` | `ph-organization-context` |
| Modules | `ph-` | `ph-employees`, `ph-leave` |
| App root | `app-` | `app-root` |

### Type Definitions

**❌ NEVER:**
```typescript
// ❌ DON'T - interfaces in component
@Component({ selector: 'ui-button' })
export class ButtonComponent {
  interface ButtonConfig { ... }  // ❌ WRONG
}
```

**✅ ALWAYS:**
```typescript
// ✅ DO - interfaces in separate model file
// button.model.ts
export interface ButtonConfig { ... }

// button.component.ts
import { ButtonConfig } from './button.model';
@Component({ selector: 'ui-button' })
export class ButtonComponent {
  @Input() config: ButtonConfig;
}
```

---

## 🔧 Development Stack

### Frontend
- **Framework:** Angular 17+ (standalone components)
- **Monorepo:** Nx
- **State:** Signals with `computed()`
- **Build:** ng-packagr (libraries), Angular CLI (app)
- **Component docs:** Storybook
- **Testing:** Jest, Spectator
- **Styling:** SCSS with CSS variables
- **UI Components:** 140+ reusable components in `shared/ui` library

### Backend
- **Framework:** ASP.NET Core 8
- **Architecture:** Clean Architecture (Domain/Application/Infrastructure)
- **Database:** EF Core with SQL Server / PostgreSQL
- **API:** RESTful with CQRS pattern
- **Patterns:** Repository, Unit of Work, Dependency Injection
- **Validation:** FluentValidation
- **Mapping:** AutoMapper

### Database
- **Provider:** SQL Server / PostgreSQL
- **ORM:** Entity Framework Core
- **Migrations:** Code-first migrations
- **Multi-tenancy:** Schema isolation per organization

---

## 📊 Project Statistics

- **Frontend Components:** 140+
- **Storybook Stories:** 90+
- **Feature Modules:** 12 (employees, leave, payroll, etc.)
- **Shared Libraries:** 9 (ui, forms, auth, api, common, etc.)
- **Backend Modules:** 10+ (Domain layer, Application commands/queries)

---

## 🎯 Common Tasks

### Creating a New Component
1. Read: [Getting Started - Component Development](./getting-started.md#component-development)
2. Follow: [Angular Guidelines](./angular-guidelines.md#component-design)
3. Create: 5 files (ts, html, scss, spec.ts, stories.ts)
4. Document: Write Storybook story file
5. Test: Add unit tests to spec.ts

### Creating a Feature Module
1. Read: [Frontend Structure](./frontend-structure.md#feature-modules-libsmodules)
2. Create folder: `libs/modules/my-module/src/lib/`
3. Create structure: routes, pages, components, services, models
4. Export: Use `public-api.ts` for library exports
5. Register: Add routes to main app routing

### Adding a Storybook Story
1. Read: [Storybook Guidelines](./storybook-guidelines.md)
2. Create file: `component-name.stories.ts`
3. Define: argTypes for all @Input() properties
4. Create: Default story and variant stories
5. Test: View in Storybook and verify interactivity

### Running Tests
```bash
# All tests
npm test

# Specific library
ng test --project=ui

# With coverage
ng test --coverage

# Watch mode
ng test --watch
```

### Building for Production
```bash
# Build optimized bundle
ng build --configuration production

# Check bundle size
npm run build -- --stats-json
```

---

## 🔗 External Resources

- [Angular Documentation](https://angular.io/docs)
- [Nx Monorepo Documentation](https://nx.dev/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [ASP.NET Core Documentation](https://learn.microsoft.com/en-us/aspnet/core)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ❓ FAQ

**Q: Where do I start?**
A: Read [Getting Started Guide](./getting-started.md)

**Q: How do I create a new component?**
A: Read [Getting Started - Component Development](./getting-started.md#component-development)

**Q: What's the component structure?**
A: See [Frontend Structure](./frontend-structure.md#component-organization-by-layer)

**Q: How do I write a Storybook story?**
A: Read [Storybook Guidelines](./storybook-guidelines.md)

**Q: How are interfaces organized?**
A: See [Angular Guidelines - Type Definitions](./angular-guidelines.md#type-definitions)

**Q: What selector prefix should I use?**
A: See [Frontend Structure - Selector Prefixes](./frontend-structure.md#selector-prefixes)

**Q: Where do interfaces go?**
A: See [Angular Guidelines - Never put interfaces in components](./angular-guidelines.md#type-definitions)

**Q: How do I debug issues?**
A: See [Getting Started - Debugging](./getting-started.md#debugging)

---

## 📞 Support

- Check relevant documentation file
- Review examples in Storybook
- Check existing component implementations
- Ask team members

---

## 📝 Last Updated

- **Architecture:** Aligned with Angular 17+, Nx monorepo
- **Frontend Structure:** 85 components with Storybook stories
- **Component Selectors:** Renamed to library-specific prefixes (ui-, ph-)
- **Guidelines:** Updated with Type Definitions, Component Structure, Storybook requirements

---

**Welcome to PeopleHub! Start reading [Getting Started Guide](./getting-started.md) →**
