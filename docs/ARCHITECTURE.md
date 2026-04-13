# PeopleHub Architecture Documentation

## 1. Project Overview & Vision

**PeopleHub** is a comprehensive, multi-organization Human Resource Management System (HRMS) designed as a scalable **SaaS product**. It enables organizations to:

- Manage employees, attendance, leave, payroll, recruitment, performance, and more
- Scale from single-organization to multi-organization deployments
- Customize features and branding per organization
- Integrate with external systems
- Generate business intelligence reports

### Core Principles

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Domain-Driven Design**: Business logic drives architecture
- **Multi-Tenancy-First**: Built from the ground up for multi-organizational support
- **API-First**: RESTful APIs support web, mobile, and third-party integrations
- **Extensibility**: Strategy pattern for customization without code changes

---

## 2. Solution Structure

```
PeopleHub/
├── core/                                 (Backend business logic)
│   ├── PeopleHub.Domain/                (Pure business entities & rules)
│   ├── PeopleHub.Application/           (Use cases & orchestration)
│   ├── PeopleHub.Infrastructure/        (Data access, external services)
│   └── PeopleHub.Worker/                (Background jobs & scheduling)
│
├── PeopleHub.Server/                    (ASP.NET Core API Host)
│   ├── Program.cs                       (Dependency injection & startup)
│   ├── Controllers/                     (HTTP endpoints)
│   ├── Middleware/                      (Request processing)
│   ├── Extensions/                      (Service registration)
│   └── Configuration/                   (Feature flags, settings)
│
├── peoplehub.client/                    (Angular SPA frontend)
│   ├── src/
│   │   ├── app/                         (Core app module & routing)
│   │   ├── libs/                        (Feature & shared libraries)
│   │   ├── assets/                      (Images, icons, etc.)
│   │   ├── styles/                      (Global styles)
│   │   └── environments/                (Configuration)
│   └── angular.json                     (Build configuration)
│
├── tests/                               (Unit & integration tests)
├── scripts/                             (Utility scripts)
└── docs/                                (Documentation)
    └── ARCHITECTURE.md                  (This file)
```

---

## 3. Backend Architecture

### 3.1 Layered Architecture Overview

PeopleHub follows **Clean Architecture** with strict dependency rules:

```
┌─────────────────────────────────────────────────────┐
│  PeopleHub.Server                                   │ (HTTP/REST Layer)
│  (Controllers, Middleware, Filters)                 │
└────────────┬────────────────────────────────────────┘
             │ depends on
             ↓
┌─────────────────────────────────────────────────────┐
│  PeopleHub.Application                              │ (Use Cases Layer)
│  (Commands, Queries, Services, DTOs, Validators)   │
└────────────┬────────────────────────────────────────┘
             │ depends on
             ↓
┌─────────────────────────────────────────────────────┐
│  PeopleHub.Domain                                   │ (Business Logic Layer)
│  (Entities, Value Objects, Domain Events, Rules)   │
└─────────────────────────────────────────────────────┘
             ↑ depends on
             │
┌─────────────────────────────────────────────────────┐
│  PeopleHub.Infrastructure                           │ (Data Access Layer)
│  (Repositories, DbContext, External Services)       │
│  (depends on both Application & Domain)             │
└─────────────────────────────────────────────────────┘

PeopleHub.Worker                                       (Background Processing)
(depends on Application & Infrastructure)
```

### 3.2 PeopleHub.Domain - Business Logic Foundation

**Purpose**: Define pure business entities, rules, and events with zero external dependencies.

**Structure**:
```
Domain/
├── Entities/              Business domain entities
│   ├── Employee           Employee master data
│   ├── Organization       Organization details
│   ├── AttendanceRecord   Daily attendance tracking
│   ├── LeaveRequest       Employee leave applications
│   ├── PayrollCycle       Salary processing cycles
│   ├── RecruitmentJob     Job postings & applications
│   ├── PerformanceReview  Performance evaluation data
│   └── Document           Document storage records
│
├── ValueObjects/          Immutable value types
│   ├── Email              Validated email
│   ├── PhoneNumber        Validated phone
│   ├── DateRange          Period with start & end
│   ├── Money              Currency with amount
│   └── LeaveBalance       Encapsulates leave calculations
│
├── Enums/                 Domain enumerations
│   ├── LeaveStatus        (Pending, Approved, Rejected)
│   ├── EmployeeStatus     (Active, Inactive, OnLeave)
│   ├── AttendanceType     (Present, Absent, Half-day)
│   ├── JobStatus          (Open, Closed, On-Hold)
│   └── PerformanceRating  (Outstanding, Exceeds, Meets, Below)
│
├── Events/                Domain events (event sourcing)
│   ├── EmployeeCreated    Fired when employee added
│   ├── LeaveRequested     Fired when leave requested
│   ├── AttendanceLogged   Fired when attendance recorded
│   └── PayrollProcessed   Fired when payroll completed
│
├── Rules/                 Business rule implementations
│   ├── LeaveBalanceCalculationRule
│   ├── SalaryCalculationRule
│   ├── AttendanceValidationRule
│   └── PromotionEligibilityRule
│
└── Constants/             Shared constants
    ├── LeaveTypeConstants
    ├── PayrollConstants
    └── OrganizationConstants
```

**Key Concepts**:
- **Entities**: Mutable objects with identity (e.g., Employee with ID)
- **Value Objects**: Immutable, no identity (e.g., Email, PhoneNumber)
- **Domain Events**: Represent significant business occurrences
- **Business Rules**: Encapsulate complex domain logic

### 3.3 PeopleHub.Application - Use Cases & Orchestration

**Purpose**: Implement application use cases by orchestrating domain logic and infrastructure.

**Structure**:
```
Application/
├── Common/
│   ├── Interfaces/        Contracts for infrastructure
│   │   ├── IRepository    Generic repository pattern
│   │   ├── IUnitOfWork    Transaction coordination
│   │   ├── IEmailService  Email sending
│   │   ├── IStorageService  File storage
│   │   └── ICacheService  Caching abstraction
│   │
│   ├── Behaviors/         MediatR pipeline behaviors
│   │   ├── ValidationBehavior  (FluentValidation)
│   │   ├── LoggingBehavior     (Request/response logging)
│   │   ├── TransactionBehavior (Unit of work)
│   │   └── PerformanceBehavior (Execution timing)
│   │
│   ├── Exceptions/        Application-specific exceptions
│   │   ├── ValidationException
│   │   ├── NotFoundException
│   │   ├── UnauthorizedException
│   │   └── BusinessRuleException
│   │
│   ├── Models/            Data Transfer Objects (DTOs)
│   │   ├── CreateEmployeeRequest
│   │   ├── EmployeeResponse
│   │   ├── UpdateLeaveRequestCommand
│   │   └── LeaveRequestResponse
│   │
│   ├── Mappings/          AutoMapper profiles
│   │   ├── EmployeeProfile
│   │   ├── LeaveProfile
│   │   └── AttendanceProfile
│   │
│   └── Validators/        FluentValidation rules
│       ├── CreateEmployeeValidator
│       ├── UpdateLeaveValidator
│       └── CreatePayrollCycleValidator
│
├── Modules/               Feature-specific use cases
│   ├── Attendance/
│   │   ├── Commands/
│   │   │   ├── LogAttendanceCommand
│   │   │   ├── UpdateAttendanceHandler
│   │   │   └── DeleteAttendanceCommand
│   │   ├── Queries/
│   │   │   ├── GetEmployeeAttendanceQuery
│   │   │   ├── GetMonthlyAttendanceQuery
│   │   │   └── GenerateAttendanceReportQuery
│   │   └── DTOs/
│   │       ├── LogAttendanceRequest
│   │       └── AttendanceResponse
│   │
│   ├── Employees/
│   │   ├── Commands/
│   │   │   ├── CreateEmployeeCommand
│   │   │   ├── UpdateEmployeeCommand
│   │   │   ├── PromoteEmployeeCommand
│   │   │   └── TerminateEmployeeCommand
│   │   ├── Queries/
│   │   │   ├── GetEmployeeQuery
│   │   │   ├── GetAllEmployeesQuery
│   │   │   ├── SearchEmployeesQuery
│   │   │   └── GetEmployeeHierarchyQuery
│   │   └── DTOs/
│   │       ├── CreateEmployeeRequest
│   │       └── EmployeeDetailResponse
│   │
│   ├── Leave/
│   │   ├── Commands/
│   │   │   ├── RequestLeaveCommand
│   │   │   ├── ApproveLeaveCommand
│   │   │   ├── RejectLeaveCommand
│   │   │   └── CancelLeaveCommand
│   │   ├── Queries/
│   │   │   ├── GetLeaveBalanceQuery
│   │   │   ├── GetLeaveRequestsQuery
│   │   │   └── GetPendingApprovalsQuery
│   │   └── DTOs/
│   │       ├── RequestLeaveRequest
│   │       └── LeaveRequestResponse
│   │
│   ├── Payroll/
│   │   ├── Commands/
│   │   │   ├── CreatePayrollCycleCommand
│   │   │   ├── ProcessPayrollCommand
│   │   │   ├── GeneratePayslipCommand
│   │   │   └── ApprovePayrollCommand
│   │   ├── Queries/
│   │   │   ├── GetPayslipQuery
│   │   │   ├── GetPayrollHistoryQuery
│   │   │   └── GetSalaryBreakdownQuery
│   │   └── DTOs/
│   │       ├── ProcessPayrollRequest
│   │       └── PayslipResponse
│   │
│   ├── Recruitment/
│   │   ├── Commands/
│   │   │   ├── PostJobCommand
│   │   │   ├── ApplyJobCommand
│   │   │   ├── ScreenApplicationCommand
│   │   │   ├── ScheduleInterviewCommand
│   │   │   └── MakeOfferCommand
│   │   ├── Queries/
│   │   │   ├── GetJobPostingQuery
│   │   │   ├── GetApplicationsQuery
│   │   │   └── GetCandidatePipelineQuery
│   │   └── DTOs/
│   │       ├── PostJobRequest
│   │       └── ApplicationResponse
│   │
│   ├── Performance/
│   │   ├── Commands/
│   │   │   ├── CreatePerformanceReviewCommand
│   │   │   ├── SubmitReviewCommand
│   │   │   └── PublishReviewCommand
│   │   ├── Queries/
│   │   │   ├── GetEmployeeReviewsQuery
│   │   │   └── GetReviewAnalyticsQuery
│   │   └── DTOs/
│   │       ├── CreateReviewRequest
│   │       └── ReviewResponse
│   │
│   ├── Reports/
│   │   ├── Queries/
│   │   │   ├── GenerateEmployeeReportQuery
│   │   │   ├── GeneratePayrollReportQuery
│   │   │   ├── GenerateAttendanceReportQuery
│   │   │   └── GenerateRecruitmentReportQuery
│   │   └── DTOs/
│   │       ├── ReportRequest
│   │       └── ReportResponse
│   │
│   ├── Organization/
│   │   ├── Commands/
│   │   │   ├── CreateOrganizationCommand
│   │   │   ├── UpdateOrganizationCommand
│   │   │   └── ConfigureOrganizationCommand
│   │   ├── Queries/
│   │   │   ├── GetOrganizationQuery
│   │   │   └── GetOrganizationSettingsQuery
│   │   └── DTOs/
│   │       ├── CreateOrganizationRequest
│   │       └── OrganizationResponse
│   │
│   ├── Identity/
│   │   ├── Commands/
│   │   │   ├── RegisterUserCommand
│   │   │   ├── LoginCommand
│   │   │   ├── RefreshTokenCommand
│   │   │   └── ChangePasswordCommand
│   │   ├── Queries/
│   │   │   ├── GetCurrentUserQuery
│   │   │   └── GetUserPermissionsQuery
│   │   └── DTOs/
│   │       ├── LoginRequest
│   │       ├── TokenResponse
│   │       └── UserResponse
│   │
│   └── SuperAdmin/
│       ├── Commands/
│       │   ├── CreateOrganizationCommand
│       │   ├── SuspendOrganizationCommand
│       │   └── ConfigureOrganizationCommand
│       ├── Queries/
│       │   ├── GetAllOrganizationsQuery
│       │   └── GetOrganizationMetricsQuery
│       └── DTOs/
│           ├── OrganizationResponse
│           └── OrganizationMetricsResponse
│
└── Customization/         Organization-specific logic
    ├── Features/          Feature toggle service
    ├── Themes/            Branding & theming
    ├── Navigation/        Custom menu structures
    ├── CustomFields/      Dynamic field definitions
    ├── Workflows/         Workflow definitions
    ├── Strategies/        Strategy implementations
    ├── Resolvers/         Organization resolver
    └── Contracts/         Customization contracts
```

**Pattern: CQRS (Command Query Responsibility Segregation)**
- **Commands**: Modify state (Create, Update, Delete)
- **Queries**: Read state (Get, Search, Report)
- **Handlers**: Implement business logic for commands/queries

**Example - Leave Request Flow**:
```
Client Request
    ↓
LeaveRequestValidator (validates input)
    ↓
RequestLeaveCommand (encapsulates intent)
    ↓
RequestLeaveHandler (orchestrates)
    ├─ Fetch Employee from Domain
    ├─ Fetch Leave Settings from Domain
    ├─ Calculate Leave Balance (Business Rule)
    ├─ Create LeaveRequest Entity
    ├─ Save via Repository (Infrastructure)
    ├─ Publish LeaveRequested Event
    └─ Return LeaveRequestResponse (DTO)
```

### 3.4 PeopleHub.Infrastructure - Data Access & External Services

**Purpose**: Implement persistence, external service integrations, and infrastructure concerns.

**Structure**:
```
Infrastructure/
├── Persistence/
│   ├── PeopleHubDbContext       EF Core DbContext
│   ├── Configurations/
│   │   ├── EmployeeConfiguration
│   │   ├── LeaveRequestConfiguration
│   │   ├── AttendanceConfiguration
│   │   └── ... (one per entity)
│   ├── Repositories/
│   │   ├── Repository           Generic base repository
│   │   ├── EmployeeRepository
│   │   ├── LeaveRepository
│   │   └── ... (one per entity)
│   ├── UnitOfWork/              Transaction management
│   └── Seeds/                   Initial data seeding
│
├── Identity/
│   ├── IdentityService          User authentication
│   ├── TokenService             JWT token generation
│   ├── PermissionService        Authorization & permissions
│   └── DirectoryService         LDAP/AD integration
│
├── MultiOrganization/
│   ├── Context/                 Organization context resolution
│   │   └── OrganizationContextProvider (Current org from request)
│   ├── DomainMapping/           Map domain to organization
│   ├── Resolution/              Organization resolution strategies
│   └── Stores/                  Organization configuration storage
│
├── Caching/
│   ├── CacheService             Cache abstraction layer
│   ├── DistributedCache         Redis/distributed caching
│   └── CacheInvalidation        Cache eviction strategies
│
├── Messaging/
│   ├── MessageBus               Event publishing
│   ├── EventPublisher           Domain event propagation
│   └── MessageHandlers/         Message processing
│
├── Integrations/
│   ├── PaymentGateway           Payment processing
│   ├── EmailService             Email notifications
│   ├── SmsService               SMS communications
│   ├── StorageService           File storage (S3, Azure Blob)
│   └── ApiClients/              Third-party API clients
│
├── Services/
│   ├── OrganizationService
│   ├── ReportGenerationService
│   ├── FileProcessingService
│   └── DataExportService
│
└── Storage/
    ├── FileStorageProvider      Abstract file storage
    ├── S3StorageProvider        AWS S3 implementation
    ├── AzureBlobProvider        Azure Blob implementation
    └── LocalFileProvider        Local filesystem
```

**Key Responsibilities**:
- **EF Core DbContext**: Database mapping and schema
- **Repositories**: Query and persist entities
- **Unit of Work**: Coordinate multiple repositories in transactions
- **Identity**: Authentication, JWT tokens, permissions
- **Multi-Org Context**: Resolve current organization from request
- **Caching**: Distributed caching for performance
- **External Services**: Email, SMS, storage, payments

### 3.5 PeopleHub.Worker - Background Processing

**Purpose**: Execute long-running jobs, scheduled tasks, and asynchronous processing.

**Structure**:
```
Worker/
├── Consumers/                Message queue consumers
│   ├── PayrollProcessConsumer
│   ├── ReportGenerationConsumer
│   ├── EmailNotificationConsumer
│   └── EmployeeDataSyncConsumer
│
├── Schedulers/              Scheduled job executors
│   ├── PayrollScheduler     Monthly payroll processing
│   ├── AttendanceScheduler  Daily attendance cleanup
│   ├── ReportScheduler      Scheduled report generation
│   └── LeaveExpiryScheduler Leave balance expiry
│
├── Jobs/                    Job definitions
│   ├── PayrollProcessJob
│   ├── GenerateReportJob
│   ├── SendNotificationJob
│   └── ArchiveDataJob
│
└── Services/                Worker-specific services
    ├── JobExecutionService
    ├── RetryPolicyService
    └── DeadLetterHandler
```

**Examples**:
- **Payroll Processing**: Monthly salary calculation & payment
- **Attendance Reports**: Generate dept-wise attendance summaries
- **Notifications**: Send approval reminders, leave confirmations
- **Data Archival**: Archive old records, compress logs

### 3.6 PeopleHub.Server - HTTP API Layer

**Purpose**: Expose REST API endpoints, handle HTTP concerns, host the SPA.

**Structure**:
```
Server/
├── Program.cs               Startup & dependency injection
│   ├── Service registration (Application, Infrastructure)
│   ├── Middleware setup
│   ├── Authentication configuration
│   └── CORS, logging, etc.
│
├── Controllers/             HTTP endpoint handlers
│   ├── Attendance/
│   │   ├── LogAttendanceRequest (POST /api/attendance)
│   │   ├── GetMyAttendance (GET /api/attendance/my)
│   │   └── ManagerReports (GET /api/attendance/reports)
│   │
│   ├── Employees/
│   │   ├── GetEmployees (GET /api/employees)
│   │   ├── CreateEmployee (POST /api/employees)
│   │   ├── UpdateEmployee (PUT /api/employees/{id})
│   │   └── TerminateEmployee (DELETE /api/employees/{id})
│   │
│   ├── Leave/
│   │   ├── RequestLeave (POST /api/leave-requests)
│   │   ├── GetLeaveBalance (GET /api/leave-balance)
│   │   ├── ApproveLeave (PUT /api/leave-requests/{id}/approve)
│   │   └── RejectLeave (PUT /api/leave-requests/{id}/reject)
│   │
│   ├── Payroll/
│   ├── Recruitment/
│   ├── Performance/
│   ├── Reports/
│   ├── Auth/
│   ├── Organization/
│   ├── Settings/
│   └── SuperAdmin/
│
├── Middleware/              HTTP request processing
│   ├── OrganizationResolverMiddleware  (Resolve organization)
│   ├── ExceptionHandlingMiddleware     (Global error handling)
│   ├── AuthenticationMiddleware        (JWT validation)
│   ├── RequestLoggingMiddleware        (Audit trail)
│   └── PerformanceMonitoringMiddleware
│
├── Filters/                 Action filters
│   ├── AuthorizeFilter      (Role-based access)
│   ├── ValidateModelFilter  (Model validation)
│   └── AuditFilter          (Track changes)
│
├── Extensions/              Service registration helpers
│   ├── ApplicationExtensions
│   ├── InfrastructureExtensions
│   ├── IdentityExtensions
│   └── CachingExtensions
│
└── Configuration/           Settings & feature flags
    ├── appsettings.json
    ├── appsettings.Development.json
    └── Feature flags per organization
```

---

## 4. Frontend Architecture

### 4.1 Frontend Structure Overview

```
peoplehub.client/
├── src/
│   ├── main.ts                 Application entry point
│   ├── index.html              Root HTML
│   ├── styles.css              Global styles
│   │
│   ├── app/                    Root module & shell
│   │   ├── app.module.ts       Main module
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts    Root component
│   │   ├── bootstrap/          Bootstrap configuration
│   │   ├── providers/          Global service providers
│   │   └── routes/             Route definitions
│   │
│   ├── libs/                   Feature & shared libraries
│   │   ├── base/               Base/core functionality
│   │   ├── modules/            Feature modules
│   │   ├── shell/              Shell/layout components
│   │   ├── shared/             Shared components & services
│   │   └── extensions/         Extensions & utilities
│   │
│   ├── assets/                 Static resources
│   ├── styles/                 Style sheets
│   └── environments/           Environment configuration
│
├── angular.json               Build configuration
├── tsconfig.json              TypeScript configuration
├── karma.conf.js              Test runner config
└── package.json               Dependencies
```

### 4.2 Monorepo Structure with Nx/ng-packagr

The frontend uses **workspace libraries** organized by feature:

```
libs/
├── base/
│   ├── app-shell/             Application shell & layout
│   │   ├── src/lib/
│   │   │   ├── components/
│   │   │   │   ├── app-shell/
│   │   │   │   ├── navbar/
│   │   │   │   ├── sidebar/
│   │   │   │   └── footer/
│   │   │   ├── services/
│   │   │   │   ├── app-shell.service
│   │   │   │   ├── navigation.service
│   │   │   │   └── layout.service
│   │   │   └── public-api.ts
│   │   └── ng-package.json
│   │
│   ├── auth/                  Authentication & authorization
│   ├── core-services/         Global services
│   ├── http-interceptors/     HTTP request/response handling
│   ├── guards/                Route guards
│   └── error-handling/        Global error handling
│
├── shared/
│   ├── ui-components/         Reusable UI components
│   │   ├── buttons/
│   │   ├── modals/
│   │   ├── tables/
│   │   ├── forms/
│   │   └── alerts/
│   │
│   ├── models/                Shared data models & interfaces
│   ├── utils/                 Utility functions
│   ├── pipes/                 Custom pipes
│   ├── directives/            Custom directives
│   └── validators/            Custom validators
│
├── modules/
│   ├── employees/             Employee management feature
│   │   ├── src/lib/
│   │   │   ├── components/
│   │   │   │   ├── employee-list/
│   │   │   │   ├── employee-detail/
│   │   │   │   ├── employee-form/
│   │   │   │   └── employee-card/
│   │   │   ├── pages/
│   │   │   │   ├── employees-page/
│   │   │   │   └── employee-detail-page/
│   │   │   ├── services/
│   │   │   │   ├── employee.service
│   │   │   │   └── employee-resolver.service
│   │   │   ├── models/
│   │   │   │   ├── employee.interface
│   │   │   │   └── employee.dto
│   │   │   ├── employees-routing.module
│   │   │   ├── employees.module
│   │   │   └── public-api.ts
│   │   └── ng-package.json
│   │
│   ├── attendance/            Attendance tracking
│   ├── leave/                 Leave management
│   ├── payroll/               Payroll & salary
│   ├── recruitment/           Recruitment & hiring
│   ├── performance/           Performance reviews
│   ├── reports/               Business reports
│   ├── documents/             Document management
│   ├── organization/          Organization settings
│   ├── settings/              User settings
│   └── dashboard/             Analytics dashboard
│
├── shell/
│   ├── header/                Top navigation
│   ├── sidebar/               Side navigation
│   ├── breadcrumbs/           Breadcrumb navigation
│   ├── notifications/         Notification center
│   ├── quick-actions/         Quick action menu
│   ├── theme-switcher/        Theme toggling
│   ├── search/                Global search
│   └── layout/                Main layout wrapper
│
└── extensions/
    ├── feature-flags/         Feature toggle management
    ├── customization/         Custom branding & themes
    └── plugins/               Plugin system
```

### 4.3 Feature Module Pattern (Example: Employees)

Each feature module follows a consistent pattern:

```
employees/
├── src/lib/
│   ├── components/            Dumb components (presentation)
│   │   ├── employee-list/
│   │   │   ├── employee-list.component.ts
│   │   │   ├── employee-list.component.html
│   │   │   ├── employee-list.component.scss
│   │   │   └── employee-list.component.spec.ts
│   │   ├── employee-form/
│   │   ├── employee-card/
│   │   └── employee-table/
│   │
│   ├── pages/                 Smart components (container)
│   │   ├── employees-page/
│   │   │   ├── employees-page.component.ts
│   │   │   ├── employees-page.component.html
│   │   │   ├── employees-page.component.scss
│   │   │   └── employees-page.component.spec.ts
│   │   └── employee-detail-page/
│   │
│   ├── services/              Feature services
│   │   ├── employee.service.ts        (API communication)
│   │   ├── employee-resolver.service  (Route data resolution)
│   │   └── employee-state.service     (State management)
│   │
│   ├── models/                Data models & interfaces
│   │   ├── employee.interface.ts
│   │   ├── employee.dto.ts
│   │   └── employee-form.interface.ts
│   │
│   ├── guards/                Route guards (if feature-specific)
│   │   └── employee-resolver.guard.ts
│   │
│   ├── pipes/                 Feature-specific pipes
│   │   └── employee-status.pipe.ts
│   │
│   ├── employees.module.ts    Feature module
│   ├── employees-routing.module.ts
│   └── public-api.ts          Public exports
│
├── ng-package.json            Library build config
└── tsconfig.lib.json          Library TypeScript config
```

### 4.4 Component Communication Flow

```
App.Component (Root)
├── App-Shell.Component (Layout)
│   ├── Header.Component (Navigation)
│   ├── Sidebar.Component (Menu)
│   ├── Main Content (Router Outlet)
│   │   └── Feature Page Component (Smart)
│   │       ├── Service (Fetches Data)
│   │       ├── Child Component 1 (Dumb)
│   │       │   └── @Input, @Output
│   │       ├── Child Component 2 (Dumb)
│   │       │   └── @Input, @Output
│   │       └── Child Component 3 (Dumb)
│   │           └── @Input, @Output
│   └── Footer.Component
```

### 4.5 Angular Service Architecture

**Authentication Service** (Core):
```
AuthService
├── login(credentials: LoginRequest): Observable<TokenResponse>
├── logout(): void
├── refreshToken(): Observable<TokenResponse>
├── getCurrentUser(): Observable<User>
├── isAuthenticated(): Observable<boolean>
└── getToken(): string
```

**Employee Service** (Feature):
```
EmployeeService
├── getEmployees(filter: EmployeeFilter): Observable<EmployeeResponse[]>
├── getEmployee(id: string): Observable<EmployeeResponse>
├── createEmployee(data: CreateEmployeeRequest): Observable<EmployeeResponse>
├── updateEmployee(id: string, data: UpdateEmployeeRequest): Observable<void>
├── deleteEmployee(id: string): Observable<void>
├── getHierarchy(organizationId: string): Observable<EmployeeHierarchy>
└── exportEmployees(format: 'csv' | 'excel'): Observable<Blob>
```

**Organization Context Service** (Shared):
```
OrganizationContextService
├── getCurrentOrganization(): Observable<Organization>
├── setCurrentOrganization(org: Organization): void
├── getOrganizationSettings(): Observable<OrganizationSettings>
├── onOrganizationChanged(): Observable<Organization>
└── getOrganizationPermissions(): Permission[]
```

---

## 5. Key Use Cases & Data Flows

### 5.1 Use Case: Employee Requests Leave

**Scenario**: Employee logs in, navigates to Leave module, and requests 5 days leave.

**Flow**:

```
┌─ Frontend (Angular) ──────────────────────────────┐
│                                                    │
│  1. User fills LeaveRequestForm                   │
│     ├─ Leave Type: Casual                         │
│     ├─ Start Date: 2025-05-01                     │
│     └─ End Date: 2025-05-05                       │
│                                                    │
│  2. Form validation (Frontend)                    │
│     ├─ Date range check                           │
│     ├─ Required field check                       │
│     └─ Custom async validation                    │
│                                                    │
│  3. POST /api/leave-requests                      │
│     └─ RequestLeaveRequest { leaveTypeId, ... }   │
│                                                    │
└─────────────────┬──────────────────────────────────┘
                  │
        HTTP POST
                  │
┌─ Backend (ASP.NET Core) ───────────────────────────┐
│                                                     │
│  4. LeaveController.RequestLeave(command)          │
│     └─ Validate JWT token, check authorization     │
│                                                     │
│  5. RequestLeaveCommand → Handler                  │
│     ├─ Validate command (BusinessRuleValidator)    │
│     ├─ AuthenticationBehavior (verify user)        │
│     ├─ TransactionBehavior (open transaction)      │
│     └─ LoggingBehavior (log request)               │
│                                                     │
│  6. RequestLeaveHandler executes:                  │
│     ├─ Get Employee from Repository                │
│     ├─ Get LeaveType & Settings                    │
│     ├─ Calculate Leave Balance (Domain Rule)       │
│     │  └─ For Casual: 12 days/year                 │
│     │  └─ Already used: 2 days                     │
│     │  └─ Available: 10 days                       │
│     ├─ Validate request (5 ≤ 10, no overlap)       │
│     ├─ Create LeaveRequest Entity                  │
│     │  └─ Status: Pending                          │
│     ├─ Save via LeaveRepository.Add()              │
│     ├─ Publish: LeaveRequested (Domain Event)      │
│     └─ Commit transaction                          │
│                                                     │
│  7. Event: LeaveRequested                          │
│     ├─ MessageBus publishes event                  │
│     ├─ Notification Consumer receives              │
│     │  ├─ Identify Manager                         │
│     │  └─ Queue email: "Leave request for approval"
│     └─ Optional: Send notification to Manager      │
│                                                     │
│  8. Return response (HTTP 200/201)                 │
│     └─ LeaveRequestResponse { id, status, ... }    │
│                                                     │
└─────────────────┬──────────────────────────────────┘
                  │
        HTTP Response
                  │
┌─ Frontend (Angular) ──────────────────────────────┐
│                                                    │
│  9. Handle response in Component                  │
│     ├─ Show success toast                         │
│     ├─ Redirect to Leave Requests page            │
│     └─ Refresh leave balance                      │
│                                                    │
│  10. NgRx Store updated (if using state mgmt)     │
│      └─ leaveRequests$ emits new state            │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 5.2 Use Case: Manager Approves Leave

**Flow**:

```
Manager Dashboard
  ↓
Pending Approvals Table
  ↓
Click "Approve" on Leave Request
  ↓
Confirmation Dialog
  ↓
PUT /api/leave-requests/{id}/approve
  ↓
Backend:
  ├─ Verify manager authorization
  ├─ Get LeaveRequest (must be Pending)
  ├─ Update status to Approved
  ├─ Publish LeaveApproved event
  ├─ Queue notification to employee
  └─ Return updated LeaveRequest
  ↓
Frontend:
  ├─ Close dialog
  ├─ Refresh table
  └─ Show success message
```

### 5.3 Use Case: System Generates Monthly Payroll

**Flow**:

```
Scheduled Job (Payroll Scheduler)
  ├─ Triggers: 1st of every month at 2 AM
  ├─ Get all organizations
  └─ For each organization:
      ├─ Resolve organization context
      ├─ Get all Active employees
      ├─ Calculate salary for each:
      │   ├─ Base salary
      │   ├─ Deductions (tax, insurance)
      │   ├─ Additions (bonus, incentive)
      │   ├─ Leave adjustments
      │   └─ Net salary
      ├─ Create PayslipEntity
      ├─ Create PaymentTransaction
      ├─ Save to database
      ├─ Publish PayrollProcessed event
      └─ Queue notification: "Payslip generated"
  ↓
Employee Portal:
  ├─ Sees notification "Your payslip is ready"
  ├─ Navigates to Payroll > Payslips
  ├─ Downloads PDF payslip
  └─ Views payment details
```

---

## 6. Multi-Tenancy Architecture

### 6.1 Organization Isolation Strategy

**Data Level**:
- Each organization has isolated database tables or schema
- All queries automatically filtered by `organization_id`
- Database constraints prevent data leakage

**Application Level**:
```
OrganizationResolverMiddleware
├─ Extract organization from:
│  ├─ Subdomain (org-a.peoplehub.com)
│  ├─ Header (X-Organization-ID)
│  └─ JWT claim (organization_id)
│
├─ Load organization settings
├─ Set in HttpContext.Items
└─ Make available to handlers

RequestLeaveHandler
├─ Get org from context
├─ Add filter: Where(x => x.OrganizationId == org.Id)
└─ Ensure data isolation
```

### 6.2 Customization Strategy Pattern

Each organization can customize behaviors without code changes:

```
IEmployeeValidationStrategy (interface)
├─ VerifyEmployeeData(employee)
│
├─ StandardEmployeeValidationStrategy (default)
│  └─ Basic validation for all orgs
│
└─ Organization-specific implementations:
    ├─ OrgA_EmployeeValidationStrategy
    │  └─ Requires medical clearance
    │
    ├─ OrgB_EmployeeValidationStrategy
    │  └─ Requires background check
    │
    └─ OrgC_EmployeeValidationStrategy
       └─ Requires security clearance
```

Resolution in handler:

```csharp
var strategy = strategyResolver.Resolve<IEmployeeValidationStrategy>(organizationId);
strategy.VerifyEmployeeData(employee);  // Org-specific logic
```

---

## 7. Authentication & Authorization

### 7.1 Authentication Flow

```
Frontend
  ├─ User enters credentials (email, password)
  ├─ POST /api/auth/login
  │  └─ {email, password}
  │
Backend:
  ├─ Find user by email
  ├─ Verify password hash
  ├─ Load user roles, permissions
  ├─ Generate JWT token
  │  └─ Claims: userId, email, roles, organizationId
  ├─ Return token + refresh token
  │
Frontend:
  ├─ Store JWT in localStorage/sessionStorage
  ├─ Store refresh token securely
  ├─ Set Authorization header: "Bearer {token}"
  └─ Redirect to dashboard

HTTPClient Interceptor:
  ├─ On each request
  ├─ Add Authorization header
  ├─ On 401: Try refresh token
  └─ On 403: Redirect to login
```

### 7.2 Role-Based Access Control (RBAC)

**Roles**:
- **Super Admin**: Full platform access
- **Organization Admin**: Organization configuration
- **Manager**: Department & team management
- **Employee**: Personal profile & requests
- **HR**: Recruitment, payroll, reports

**Authorization**:

Frontend Route Guard:
```typescript
@CanActivate([AuthGuard, RoleGuard])
{
  data: { requiredRoles: ['Manager', 'HR', 'Admin'] }
}
```

Backend Action Filter:
```csharp
[Authorize(Roles = "Manager,HR,Admin")]
public IActionResult ApproveLeave(int id) { ... }
```

---

## 8. Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  WEB BROWSER (Angular SPA)                                          │
│  ├─ Components (Employees, Leave, Payroll, etc.)                   │
│  ├─ Services (Data fetching, state management)                     │
│  └─ Guards (Authentication, authorization)                         │
└────────────────────────┬────────────────────────────────────────────┘
                         │ HTTP/REST
┌─────────────────────────▼────────────────────────────────────────────┐
│  ASP.NET CORE API (HTTP Layer)                                      │
│  ├─ Controllers (Handle requests)                                   │
│  ├─ Middleware (Organization resolution, auth, logging)            │
│  └─ Filters (Validation, authorization)                            │
└────────────────────────┬────────────────────────────────────────────┘
                         │ CQRS
┌─────────────────────────▼────────────────────────────────────────────┐
│  APPLICATION LAYER (Business Logic)                                 │
│  ├─ Commands/Queries (Use cases)                                    │
│  ├─ Handlers (Orchestrate logic)                                    │
│  ├─ Validators (Input validation)                                   │
│  └─ DTOs (Data transfer)                                            │
└────────────────────────┬────────────────────────────────────────────┘
                         │ Repositories
┌─────────────────────────▼────────────────────────────────────────────┐
│  DOMAIN LAYER (Business Rules)                                      │
│  ├─ Entities (Employee, Leave, Payroll)                             │
│  ├─ Value Objects (Email, PhoneNumber)                              │
│  ├─ Rules (Salary calculation, leave balance)                       │
│  └─ Events (EmployeeCreated, LeaveApproved)                         │
└────────────────────────┬────────────────────────────────────────────┘
                         │ Repository Pattern
┌─────────────────────────▼────────────────────────────────────────────┐
│  INFRASTRUCTURE LAYER (Data Access)                                 │
│  ├─ DbContext (EF Core)                                             │
│  ├─ Repositories (Query builders)                                   │
│  ├─ Services (Email, storage, cache)                                │
│  └─ External APIs (Payment, SSO)                                    │
└────────────────────────┬────────────────────────────────────────────┘
                         │ DB Driver
┌─────────────────────────▼────────────────────────────────────────────┐
│  DATA PERSISTENCE                                                   │
│  ├─ PostgreSQL Database (Employees, Leaves, Payroll, etc.)         │
│  ├─ Redis Cache (Sessions, frequently accessed data)                │
│  └─ File Storage (S3, Azure Blob)                                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 9. Deployment Architecture

### 9.1 Development Environment

```
Developer Machine
├─ Visual Studio 2024 / VS Code
├─ .NET 10 SDK
├─ Node.js 18+
├─ PostgreSQL (local or Docker)
├─ SQL Server (optional for testing)
└─ Git & GitHub

Workflow:
├─ Backend: PeopleHub.Server runs on https://localhost:5001
├─ Frontend: ng serve runs on http://localhost:4200
├─ API requests proxied via proxy.conf.js
└─ Hot reload on file changes
```

### 9.2 Production Deployment

```
On-Premises / Cloud (Azure, AWS, GCP)
│
├─ Load Balancer (NGINX, Azure LB)
│  └─ Routes to multiple instances
│
├─ Web Server Farm
│  ├─ PeopleHub.Server 1 (API)
│  ├─ PeopleHub.Server 2 (API)
│  └─ PeopleHub.Server N (API)
│     └─ Handles requests, serves Angular SPA
│
├─ Background Worker Services
│  ├─ PeopleHub.Worker 1 (Scheduled jobs)
│  ├─ PeopleHub.Worker 2 (Message consumers)
│  └─ Job Queue (RabbitMQ / Azure Service Bus)
│
├─ Data Layer
│  ├─ PostgreSQL (Primary + Replicas)
│  ├─ Redis Cluster (Distributed cache)
│  └─ Blob Storage (Azure Blob / S3)
│
└─ Monitoring & Logging
   ├─ Application Insights
   ├─ ELK Stack (Elasticsearch, Logstash, Kibana)
   └─ Grafana (Metrics)
```

---

## 10. Technology Stack Summary

### Backend
- **Language**: C# 13
- **.NET**: .NET 10
- **Database**: PostgreSQL 13+
- **ORM**: Entity Framework Core 8+
- **API Pattern**: REST with OpenAPI/Swagger
- **CQRS**: MediatR
- **Validation**: FluentValidation
- **Mapping**: AutoMapper
- **Logging**: Serilog
- **Caching**: Redis, In-Memory Cache
- **Message Queue**: RabbitMQ / Azure Service Bus
- **Testing**: xUnit, Moq

### Frontend
- **Language**: TypeScript 5.9
- **Framework**: Angular 21+
- **Architecture Style**: Standalone APIs (no NgModule-based app bootstrap)
- **Styling**: Tailwind CSS 4.2, CSS, SCSS
- **Icons**: Iconify (`iconify-icon` web component)
- **UI Documentation**: Storybook 8.6
- **Build Tool**: Angular CLI, ng-packagr, PostCSS (`@tailwindcss/postcss`)
- **State Management**: NgRx (optional), RxJS
- **Testing**: Jasmine, Karma
- **HTTP Client**: Angular HttpClient
- **Library Architecture**: Nx Monorepo style

### Infrastructure
- **Hosting**: Azure App Service / AWS EC2
- **CI/CD**: GitHub Actions, Azure DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes (optional)
- **CDN**: Azure CDN, CloudFront
- **Monitoring**: Application Insights, DataDog

---

## 11. Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Clean Architecture** | Clear separation of concerns, testability, maintainability |
| **CQRS Pattern** | Scalability, clear intent, query optimization possibilities |
| **Domain-Driven Design** | Business logic is central, ubiquitous language |
| **Multi-Tenancy First** | Built-in from day one, easier to scale for multiple orgs |
| **Monorepo Frontend** | Code reuse, shared utilities, consistent architecture |
| **Repository Pattern** | Abstract data access, easier to switch DBs, testability |
| **Strategy Pattern** | Org-specific customization without new code |
| **JWT Authentication** | Stateless, scalable, API-friendly |
| **Event Publishing** | Loose coupling, asynchronous processing, audit trail |
| **Middleware for Org Resolve** | Centralized organization resolution, clean abstraction |

---

## 12. Development Workflow

### Creating a New Feature (Example: Leave Allocation)

**1. Domain Layer** (`PeopleHub.Domain`)
```csharp
// Create entity
public class LeaveAllocation : Entity
{
    public string EmployeeId { get; set; }
    public string LeaveTypeId { get; set; }
    public int TotalDays { get; set; }
    public DateTime AllocationDate { get; set; }
}

// Create rule
public class LeaveAllocationRule
{
    public void ValidateAllocation(LeaveAllocation allocation)
    {
        if (allocation.TotalDays < 0)
            throw new BusinessRuleException("Leave days cannot be negative");
    }
}
```

**2. Application Layer** (`PeopleHub.Application`)
```csharp
// Create command
public class AllocateLeaveCommand : IRequest<AllocateLeaveResponse>
{
    public string EmployeeId { get; set; }
    public string LeaveTypeId { get; set; }
    public int Days { get; set; }
}

// Create handler
public class AllocateLeaveHandler : IRequestHandler<AllocateLeaveCommand, AllocateLeaveResponse>
{
    public async Task<AllocateLeaveResponse> Handle(AllocateLeaveCommand request, 
        CancellationToken cancellationToken)
    {
        var employee = await _employeeRepo.GetByIdAsync(request.EmployeeId);
        var allocation = new LeaveAllocation { /* ... */ };
        _leaveAllocationRule.ValidateAllocation(allocation);
        await _leaveAllocationRepo.AddAsync(allocation);
        return new AllocateLeaveResponse { /* ... */ };
    }
}

// Create validator
public class AllocateLeaveValidator : AbstractValidator<AllocateLeaveCommand>
{
    public AllocateLeaveValidator()
    {
        RuleFor(x => x.EmployeeId).NotEmpty();
        RuleFor(x => x.Days).GreaterThan(0);
    }
}
```

**3. Infrastructure Layer** (`PeopleHub.Infrastructure`)
```csharp
// Create repository
public class LeaveAllocationRepository : Repository<LeaveAllocation>
{
    public async Task<List<LeaveAllocation>> GetByEmployeeAsync(string employeeId)
    {
        return await _context.LeaveAllocations
            .Where(x => x.EmployeeId == employeeId)
            .ToListAsync();
    }
}

// Register in DI
services.AddScoped<IRepository<LeaveAllocation>, LeaveAllocationRepository>();
```

**4. Server Layer** (`PeopleHub.Server`)
```csharp
[ApiController]
[Route("api/[controller]")]
public class LeaveAllocationController : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "HR,Admin")]
    public async Task<ActionResult> AllocateLeave(AllocateLeaveRequest request)
    {
        var command = new AllocateLeaveCommand { /* ... */ };
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(AllocateLeave), result);
    }
}
```

**5. Frontend** (`peoplehub.client`)
```typescript
// Create service
@Injectable()
export class LeaveAllocationService {
    constructor(private http: HttpClient) {}
    
    allocateLeave(request: AllocateLeaveRequest): Observable<AllocateLeaveResponse> {
        return this.http.post<AllocateLeaveResponse>('/api/leave-allocation', request);
    }
}

// Create component
@Component({
    selector: 'app-allocate-leave',
    templateUrl: './allocate-leave.component.html',
    styleUrls: ['./allocate-leave.component.scss']
})
export class AllocateLeaveComponent {
    form: FormGroup;
    
    constructor(private leaveService: LeaveAllocationService) {}
    
    submit() {
        if (this.form.valid) {
            this.leaveService.allocateLeave(this.form.value).subscribe(
                result => this.handleSuccess(result),
                error => this.handleError(error)
            );
        }
    }
}
```

---

## 13. Future Enhancements

- **GraphQL API**: Alternative to REST for complex queries
- **Event Sourcing**: Complete audit trail with event replay
- **CQRS Read Models**: Separate optimized read database
- **API Versioning**: Support multiple API versions
- **Webhook Support**: Push notifications to external systems
- **Mobile Apps**: Native iOS/Android using same APIs
- **Advanced Analytics**: ML-based insights and predictions
- **Workflow Engine**: Visual workflow builder for processes
- **Integration Hub**: Pre-built connectors (Zoom, Slack, etc.)

---

## 14. Project Maintenance & Conventions

### Code Organization Rules

1. **Domain Layer**: No external dependencies (except base .NET)
2. **Application Layer**: Depends on Domain only
3. **Infrastructure**: Depends on Application & Domain
4. **Server/Frontend**: Depend on Application
5. **Cross-cutting**: Handled via middleware, DI, and base classes

### Naming Conventions

- **Entities**: Singular, no suffix (e.g., `Employee`)
- **Services**: `{Feature}Service` (e.g., `EmployeeService`)
- **Repositories**: `{Entity}Repository` (e.g., `EmployeeRepository`)
- **Commands**: `{Action}{Entity}Command` (e.g., `CreateEmployeeCommand`)
- **Queries**: `Get{Entity(ies)}{Criteria}Query` (e.g., `GetEmployeesByDepartmentQuery`)
- **Handlers**: `{Command/Query}Handler` (e.g., `CreateEmployeeCommandHandler`)
- **DTOs**: `{Entity}{Operation}Request/Response` (e.g., `CreateEmployeeRequest`)
- **Components**: `{feature}-{type}.component.ts` (e.g., `employee-list.component.ts`)
- **Services**: `{feature}.service.ts` (e.g., `employee.service.ts`)

### Testing Strategy

- **Unit Tests**: Domain logic, business rules, DTOs
- **Integration Tests**: Repository, service integration
- **API Tests**: Controller endpoints
- **E2E Tests**: Full feature workflows

---

## Conclusion

PeopleHub is architected to be **scalable, maintainable, and extensible**. The clean separation of concerns enables teams to work independently, the multi-tenancy support allows for SaaS deployment, and the CQRS pattern provides flexibility for future optimizations. The frontend modular structure ensures code reusability and clear feature organization.

This architecture provides a solid foundation for growing the HRMS platform while maintaining code quality and system performance.
