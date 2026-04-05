# PeopleHub Project Structure - Clean Architecture Documentation

## Project Overview

PeopleHub is a multi-tenant HRMS (Human Resource Management System) designed as a **product** that can be:
- Used by your own organization
- Sold to other organizations
- Configured differently for each organization
- Customized for premium clients when needed

## Solution Structure

```
PeopleHub.sln
├── .vs/                          (VS cache)
├── PeopleHub.Client/             (Angular Frontend - .NET 10)
├── PeopleHub.Server/             (ASP.NET Core Host - .NET 10)
├── core/                         (Backend Core Layers)
│   ├── PeopleHub.Application/    (Use cases, DTOs, services)
│   ├── PeopleHub.Domain/         (Business entities, rules)
│   ├── PeopleHub.Infrastructure/ (DB, external services)
│   └── PeopleHub.Worker/         (Background jobs, scheduling)
├── tests/                        (Automated tests)
├── docs/                         (Architecture documents)
└── scripts/                      (Utility scripts)
```

## Project Dependencies (Project References)

```
PeopleHub.Server ──→ PeopleHub.Application
PeopleHub.Server ──→ PeopleHub.Infrastructure
                  ┌→ PeopleHub.Domain
                  │
PeopleHub.Application ──→ PeopleHub.Domain
                  
PeopleHub.Infrastructure ──→ PeopleHub.Application
PeopleHub.Infrastructure ──→ PeopleHub.Domain

PeopleHub.Worker ──→ PeopleHub.Application
PeopleHub.Worker ──→ PeopleHub.Infrastructure
```

## Core Projects

### 1. PeopleHub.Domain (No External Dependencies)
The innermost layer containing pure business logic with **no dependencies** on other projects.

**Structure:**
```
Domain/
├── Entities/          (e.g., Employee, Organization, LeaveRequest)
├── Enums/            (e.g., LeaveStatus, AttendanceType)
├── ValueObjects/      (e.g., Email, PhoneNumber)
├── Events/           (Domain events - e.g., EmployeeCreated)
├── Rules/            (Business rules - e.g., LeaveBalanceCalculationRule)
└── Constants/        (Shared constants)
```

**Key Concepts:**
- Contains ONLY domain entities and business rules
- No database dependencies
- No external frameworks (except base .NET types)
- Entities are the heart of your business model

### 2. PeopleHub.Application (Depends on Domain)
Application layer containing use cases, services, and orchestration logic.

**Structure:**
```
Application/
├── Common/
│   ├── Interfaces/    (Contracts for infrastructure services)
│   ├── Behaviors/     (Logging, validation pipelines)
│   ├── Exceptions/    (Application-specific exceptions)
│   ├── Models/        (DTOs, requests, responses)
│   ├── Mappings/      (Entity to DTO mappings)
│   └── Validators/    (FluentValidation rules)
├── Modules/
│   ├── SuperAdmin/    (Platform administration)
│   ├── Organization/  (Organization management)
│   ├── Identity/      (Authentication/Authorization)
│   ├── Employees/     (Employee management)
│   ├── Attendance/    (Attendance tracking)
│   ├── Leave/         (Leave management)
│   ├── Payroll/       (Payroll processing)
│   ├── Recruitment/   (Recruitment management)
│   ├── Performance/   (Performance reviews)
│   ├── Reports/       (Business reports)
│   └── Documents/     (Document management)
└── Customization/
    ├── Features/      (Feature toggle logic)
    ├── Themes/        (Theme management)
    ├── Navigation/    (Custom navigation)
    ├── CustomFields/  (Custom field definitions)
    ├── Workflows/     (Workflow definitions)
    ├── Strategies/    (Strategy pattern implementations)
    ├── Resolvers/     (Organization strategy resolver)
    └── Contracts/     (Customization contracts)
```

**Key Responsibilities:**
- Defines use cases (handlers/commands/queries)
- Orchestrates business workflows
- Validates business rules
- Handles customization logic for different organizations
- Defines contracts for Infrastructure services

### 3. PeopleHub.Infrastructure (Depends on Application & Domain)
Infrastructure layer handling external concerns.

**Structure:**
```
Infrastructure/
├── Persistence/
│   ├── Configurations/  (EF Core entity configs)
│   ├── Repositories/    (Data access patterns)
│   ├── Migrations/      (Database migrations)
│   ├── Seed/           (Initial data seeding)
│   └── PeopleHubDbContext.cs
├── MultiOrganization/
│   ├── Context/        (Tenant/organization context)
│   ├── Resolution/     (Tenant resolution strategies)
│   ├── Stores/         (Organization data stores)
│   └── DomainMapping/  (Custom domain mapping)
├── Identity/          (Identity providers, token services)
├── Caching/           (Caching strategies)
├── Messaging/         (Message bus, event publishing)
├── Storage/           (File storage, blob services)
├── Integrations/      (Third-party APIs)
└── Services/          (Infrastructure services)
```

**Key Responsibilities:**
- Database access via EF Core
- External service integrations
- Multi-tenant/organization data isolation
- Caching layer
- File storage
- Message queuing

### 4. PeopleHub.Worker (Depends on Application & Infrastructure)
Background job processing and scheduled tasks.

**Structure:**
```
Worker/
├── Jobs/              (Background job definitions)
├── Schedulers/        (Scheduled task definitions)
├── Consumers/         (Message consumers)
└── Services/          (Worker-specific services)
```

**Use Cases:**
- Payroll calculation jobs
- Attendance sync jobs
- Report generation and export
- Notification processing
- Scheduled maintenance tasks

## Frontend Projects

### PeopleHub.Client (Angular)
Angular-based SPA frontend organized by feature.

**Structure:**
```
Client/
├── src/
│   ├── app/
│   │   ├── core/              (Singleton services, guards, auth)
│   │   │   ├── auth/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── services/
│   │   │   ├── state/
│   │   │   └── organization-context/
│   │   ├── shared/            (Common components, utilities)
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   ├── models/
│   │   │   └── utils/
│   │   ├── layouts/           (Layout components)
│   │   │   ├── employee-layout/
│   │   │   ├── hr-admin-layout/
│   │   │   └── super-admin-layout/
│   │   ├── modules/          (Feature modules - lazy loaded)
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── leave/
│   │   │   ├── payroll/
│   │   │   ├── recruitment/
│   │   │   ├── performance/
│   │   │   ├── reports/
│   │   │   ├── documents/
│   │   │   ├── settings/
│   │   │   └── super-admin/
│   │   ├── customization/     (Organization-specific customization)
│   │   │   ├── themes/
│   │   │   ├── navigation/
│   │   │   ├── feature-flags/
│   │   │   ├── custom-fields/
│   │   │   └── dashboard-widgets/
│   │   ├── routes/
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   ├── styles/
│   ├── index.html
│   └── main.ts
├── package.json
├── tsconfig.json
└── proxy.conf.json
```

## Backend Host

### PeopleHub.Server (ASP.NET Core)
RESTful API host serving both the Angular frontend and potential mobile apps.

**Structure:**
```
Server/
├── Controllers/      (API endpoints organized by domain)
│   ├── Auth/
│   ├── Organization/
│   ├── Employees/
│   ├── Attendance/
│   ├── Leave/
│   ├── Payroll/
│   ├── Recruitment/
│   ├── Reports/
│   ├── Settings/
│   └── SuperAdmin/
├── Middleware/       (Request processing pipeline)
│   ├── OrganizationResolutionMiddleware.cs
│   ├── ExceptionHandlingMiddleware.cs
│   ├── AuditContextMiddleware.cs
│   └── RequestLoggingMiddleware.cs
├── Filters/          (Action filters, authorization)
├── Extensions/       (Extension methods)
├── Configuration/    (Service configurations)
├── Contracts/        (API contracts/DTOs)
├── Common/          (Shared utilities)
├── Program.cs       (Application startup)
└── appsettings*.json
```

**Key Responsibilities:**
- Expose RESTful APIs
- Request/response validation
- Organization resolution from host/header/JWT
- Authentication & Authorization
- Error handling & exception mapping
- Swagger/OpenAPI documentation

## API Endpoints Structure

```
/api/v1
├── /auth
│   ├── POST   /login
│   ├── POST   /refresh-token
│   └── POST   /logout
├── /organizations
│   ├── GET    /current
│   ├── GET    /current/settings
│   └── GET    /current/features
├── /employees
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /{id}
│   └── PUT    /{id}
├── /attendance
├── /leave
├── /payroll
├── /reports
├── /settings
└── /superadmin
    ├── /organizations
    ├── /subscriptions
    └── /domain-mappings
```

## Multi-Tenant Architecture

### Organization Resolution
Organizations are resolved from incoming requests in this order:
1. **Host Header** - Custom domain (e.g., hr.companyA.com)
2. **Request Header** - X-Organization-Id header
3. **JWT Claim** - organization claim in token
4. **Route Parameter** - Fallback if needed

**Database Table:**
```
organization_domains
- id
- organization_id
- domain_name
- is_primary
- is_active
- created_at

organizations
- id
- name
- slug
- subscription_tier
- is_active
- created_at
```

### Data Isolation
All organization-owned tables include an `organization_id` column for strict data isolation at the application and database levels.

## Customization Strategy

Instead of sprinkling `if organization == X` checks throughout code, use the **Strategy Pattern**:

```
CustomFields/
├── Interfaces/
│   └── IPayrollStrategy.cs
├── Default/
│   └── DefaultPayrollStrategy.cs
└── Custom/
    ├── ClientXPayrollStrategy.cs
    └── ClientYPayrollStrategy.cs

OrganizationStrategyResolver
  └── ResolveStrategy(organizationId, strategyType)
```

**Benefits:**
- Clean separation of concerns
- Easy to add new custom organizations
- Testable strategies
- No messy branching

## Naming Conventions

### Projects
- `PeopleHub.{Layer}` (e.g., PeopleHub.Domain, PeopleHub.Application)

### Namespaces
- `PeopleHub.Domain.Entities`
- `PeopleHub.Application.Modules.Employees.Commands`
- `PeopleHub.Infrastructure.Persistence.Repositories`

### Files & Classes
- Feature classes: `{Action}{Entity}Handler.cs`, `Create{Entity}Dto.cs`
- Validators: `{Entity}Validator.cs`
- Mappings: `{Entity}MappingProfile.cs`
- Repositories: `{Entity}Repository.cs`

## File Preservation Summary

✅ **Preserved Without Changes:**
- `PeopleHub.Server/Program.cs` - Main entry point
- `PeopleHub.Server/appsettings.json` - Configuration
- `PeopleHub.Server/Controllers/WeatherForecastController.cs`
- `PeopleHub.Client/src/app/app.module.ts`
- `PeopleHub.Client/src/app/app.component.ts`
- All package.json, angular.json configs
- All existing .ts, .cs, .json files

✅ **Reorganized (Visible in new folder structure):**
- Existing controllers moved into categorized subfolders
- Existing Angular modules fit into feature/core/shared structure
- Solution file updated with new project references

## Next Steps

1. **Domain Layer Development**
   - Define core entities (Employee, Organization, Attendance, LeaveRequest, etc.)
   - Define value objects (Email, PhoneNumber, DateRange)
   - Define domain events
   - Define business rules

2. **Database Setup**
   - Implement EF Core DbContext
   - Create entity configurations
   - Create initial migration
   - Seed base data

3. **Application Layer**
   - Define use cases (commands/queries)
   - Implement handlers
   - Define validation rules
   - Implement customization strategies

4. **Infrastructure & Services**
   - Implement repositories
   - Setup multi-tenant support
   - Configure caching
   - Setup messaging

5. **API Development**
   - Implement controllers
   - Setup authentication middleware
   - Setup organization resolution
   - Add Swagger documentation

6. **Frontend Development**
   - Setup routing
   - Implement authentication flow
   - Build feature modules
   - Integrate with backend APIs

## Architecture Benefits

✅ **Separation of Concerns** - Each layer has clear responsibilities  
✅ **Testability** - Domain and Application layers are easy to unit test  
✅ **Maintainability** - Code is organized logically  
✅ **Scalability** - Worker layer can scale independently  
✅ **Multi-Tenancy** - Built-in support for multiple organizations  
✅ **Customization** - Strategy pattern for client-specific rules  
✅ **API-First** - Enables future mobile app development  

---

**Last Updated:** April 5, 2026  
**Architecture Pattern:** Clean Architecture (Domain-Driven Design)  
**Technology Stack:** ASP.NET Core 10, Angular, PostgreSQL  
