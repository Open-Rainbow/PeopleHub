# PeopleHub - Multi-Tenant HRMS Platform

A modern, scalable multi-tenant Human Resource Management System built with **ASP.NET Core** and **Angular**, following **Clean Architecture** principles.

## 🎯 Quick Overview

**PeopleHub** is not just an HRMS for one organization—it's a complete **HRMS product** designed to serve multiple organizations with:

- ✅ Multi-tenant data isolation
- ✅ Organization-specific customization
- ✅ API-first design (ready for mobile apps)
- ✅ Clean Architecture (Domain-Driven Design)
- ✅ Future-proof extensible structure

## 🏗️ Architecture

The project follows **Clean Architecture** with clear layer separation:

```
PeopleHub.sln
├── PeopleHub.Client/          (Angular SPA)
├── PeopleHub.Server/          (ASP.NET Core Host)
├── core/                      (Business Logic)
│   ├── PeopleHub.Domain/      (Entities & Rules)
│   ├── PeopleHub.Application/ (Use Cases & Services)
│   ├── PeopleHub.Infrastructure/ (Data Access & External Services)
│   └── PeopleHub.Worker/      (Background Jobs)
├── tests/                     (Unit & Integration Tests)
├── docs/                      (Architecture & Guides)
└── scripts/                   (Utility Scripts)
```

## 🚀 Tech Stack

### Backend
- **Framework**: ASP.NET Core 10 (.NET 10)
- **Database**: PostgreSQL
- **Architecture**: Clean Architecture (DDD)
- **Patterns**: Repository, Strategy, CQRS (with MediatR)

### Frontend
- **Framework**: Angular 18+
- **Styling**: CSS/SCSS
- **State Management**: NgRx/RxJS
- **Build Tool**: ng CLI

## 📋 HRMS Features

- **Employee Management** - Hiring, profiles, roles
- **Attendance** - Clock in/out, tracking
- **Leave Management** - Leave types, requests, balances
- **Payroll** - Salary processing, payslips
- **Recruitment** - Job postings, applicant tracking
- **Performance** - Reviews, ratings
- **Reports** - Business analytics
- **Documents** - File management
- **Super Admin** - Multi-tenant platform management

## 🔐 Multi-Tenancy

Each organization gets:
- **Isolated Data** - Strict data separation at DB and app levels
- **Custom Domain** - Map custom domains (e.g., hr.companyA.com)
- **Feature Flags** - Enable/disable features per organization
- **Custom Themes** - Branding customization
- **Custom Fields** - Organization-specific data fields
- **Customization Strategies** - Organization-specific business logic

## 📖 Documentation

- [**ARCHITECTURE.md**](docs/ARCHITECTURE.md) - Complete architecture reference
- [**MIGRATION_GUIDE.md**](docs/MIGRATION_GUIDE.md) - How to organize existing code
- [**PROJECT_SETUP_CHECKLIST.md**](docs/PROJECT_SETUP_CHECKLIST.md) - Implementation roadmap

## 🛠️ Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 18+
- PostgreSQL 13+
- Visual Studio 2024 or VS Code

### Setup Backend

```bash
# Install dependencies
dotnet restore

# Setup database
cd PeopleHub.Server
dotnet ef migrations add Initial --project ../core/PeopleHub.Infrastructure
dotnet ef database update

# Run server
dotnet run
```

### Setup Frontend

```bash
# Navigate to client
cd peoplehub.client

# Install dependencies
npm install

# Start development server
npm start
```

The Angular app will be served at `http://localhost:4200`  
The API will be available at `https://localhost:5001/api`

## 📚 Project Structure Details

### Domain Layer (core/PeopleHub.Domain)
Pure business logic with no external dependencies.

**Contains:**
- Business entities (Employee, Organization, LeaveRequest)
- Value objects (Email, DateRange)
- Enums and constants
- Domain events
- Business rules

### Application Layer (core/PeopleHub.Application)
Use cases and orchestration logic.

**Contains:**
- Commands and Queries (CQRS)
- Handlers and Services
- DTOs (Data Transfer Objects)
- Validation rules
- Mappers
- Customization Strategies

### Infrastructure Layer (core/PeopleHub.Infrastructure)
External concerns and data access.

**Contains:**
- Entity Framework DbContext
- Repositories
- Multi-tenant organization resolution
- Caching services
- External integrations
- Database migrations

### Worker Layer (core/PeopleHub.Worker)
Background processing.

**Contains:**
- Background jobs (Hangfire)
- Scheduled tasks
- Message consumers
- Report generation

## 🎨 Frontend Architecture

### Core Module (core/)
- **auth/**: Authentication services and guards
- **guards/**: Route guards for authorization
- **interceptors/**: HTTP interceptors
- **services/**: Singleton services
- **organization-context/**: Tenant information

### Shared Module (shared/)
- **components/**: Reusable UI components
- **directives/**: Custom directives
- **pipes/**: Custom pipes
- **models/**: Shared data models
- **utils/**: Helper functions

### Feature Modules (features/)
Lazy-loaded feature modules organized by business capability.

### Customization (customization/)
- **themes/**: Theming system
- **navigation/**: Custom navigation per organization
- **feature-flags/**: Feature toggle implementation
- **custom-fields/**: Dynamic field management
- **dashboard-widgets/**: Customizable dashboard

## 🔌 API Structure

```
/api/v1
├── /auth (Authentication)
├── /organizations (Org management)
├── /employees (Employee CRUD)
├── /attendance (Attendance tracking)
├── /leave (Leave management)
├── /payroll (Payroll processing)
├── /recruitment (Recruitment)
├── /reports (Analytics)
├── /settings (Settings)
└── /superadmin (Platform management)
```

## 🧪 Testing

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test tests/PeopleHub.Application.Tests

# With coverage
dotnet test /p:CollectCoverage=true
```

## 🚀 Deployment

See deployment guides in `docs/` folder for:
- Docker containerization
- Kubernetes deployment
- CI/CD pipeline setup
- Production configuration

## 📝 Development Workflow

1. **Feature Branch**: Create feature branches from `develop`
2. **Clean Architecture**: Follow layer separation rules
3. **Testing**: Write tests before implementation
4. **Documentation**: Update docs with new features
5. **Pull Request**: Review before merging to main

## 🤝 Contributing

1. Clone the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Create Pull Request

## 📞 Support & Documentation

- 📖 [Architecture Guide](docs/ARCHITECTURE.md)
- 🛠️ [Setup Guide](docs/PROJECT_SETUP_CHECKLIST.md)
- 🔄 [Migration Guide](docs/MIGRATION_GUIDE.md)

## 📄 License

This project is proprietary and confidential to Open Rainbow.

---

**Version**: 1.0.0  
**Last Updated**: April 5, 2026  
**Built With**: ASP.NET Core 10, Angular, PostgreSQL
