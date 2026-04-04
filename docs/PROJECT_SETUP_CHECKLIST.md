# PeopleHub - Project Structure Setup Checklist

## ✅ Completed Setup

- [x] Created `core/` folder structure
- [x] Created `PeopleHub.Domain` project
- [x] Created `PeopleHub.Application` project
- [x] Created `PeopleHub.Infrastructure` project
- [x] Created `PeopleHub.Worker` project
- [x] Created `tests/` folder for unit tests
- [x] Created `docs/` folder for documentation
- [x] Created `scripts/` folder for utility scripts
- [x] Updated `PeopleHub.slnx` with all new projects
- [x] Updated `PeopleHub.Server.csproj` with core project references
- [x] Created internal folder structures for all projects
- [x] Verified all existing files are preserved

## 📋 Next Steps - Phase 1 (Foundation)

### Database & Entity Framework
- [ ] Install `Microsoft.EntityFrameworkCore` NuGet packages
- [ ] Install `Npgsql.EntityFrameworkCore.PostgreSQL` for PostgreSQL support
- [ ] Create `PeopleHubDbContext` in `Infrastructure/Persistence/`
- [ ] Define core entities in `Domain/Entities/`
- [ ] Create EF Core entity configurations in `Infrastructure/Persistence/Configurations/`
- [ ] Create initial migration
- [ ] Create database seed data

### Application Layer Core
- [ ] Install `MediatR` for command/query handling
- [ ] Install `FluentValidation` for validation
- [ ] Install `AutoMapper` for object mapping
- [ ] Create base handler/command/query interfaces in `Application/Common/`
- [ ] Setup MediatR dependency injection in Server Program.cs

### Infrastructure Core
- [ ] Implement repositories (base repository pattern)
- [ ] Setup organization context & resolution
- [ ] Implement multi-tenant data isolation
- [ ] Setup caching layer
- [ ] Create infrastructure service registration

## 🏗️ Next Steps - Phase 2 (Migrate Existing Code)

### Move Business Logic from Server
- [ ] Extract domain models → `Domain/Entities/`
- [ ] Extract business services → `Application/Modules/`
- [ ] Extract data access → `Infrastructure/Repositories/`
- [ ] Create DTOs → `Application/Common/Models/`
- [ ] Create validators → `Application/Common/Validators/`

### Refactor Server Controllers
- [ ] Setup `.json` routes file for API documentation
- [ ] Organize controllers into categorical subfolders
- [ ] Slim down controllers - move logic to Application layer
- [ ] Add middleware for:
  - Organization resolution
  - Exception handling
  - Request logging
  - Audit context

### Setup Authentication & Authorization
- [ ] Setup identity system
- [ ] Create JWT token generation
- [ ] Create authentication guard/middleware
- [ ] Setup role-based access control (RBAC)

## 🎨 Next Steps - Phase 3 (Frontend Reorganization)

### Organize Angular Code
- [ ] Move auth logic → `core/auth/`
- [ ] Move route guards → `core/guards/`
- [ ] Move HTTP interceptors → `core/interceptors/`
- [ ] Move base services → `core/services/`
- [ ] Move organization context → `core/organization-context/`
- [ ] Move shared components → `shared/components/`
- [ ] Move shared models → `shared/models/`
- [ ] Create layout components in `layouts/`
- [ ] Organize features into `features/{feature}/`

### Setup Routing
- [ ] Create new `app.routes.ts` for standalone routing
- [ ] Setup lazy loading for feature modules
- [ ] Create route guards for authentication/authorization
- [ ] Create layout selectors based on role

## 🔧 Next Steps - Phase 4 (Multi-Tenancy)

### Organization Management
- [ ] Create Organization entity in Domain
- [ ] Create organization database tables
- [ ] Implement organization resolver middleware
- [ ] Setup domain-to-organization mapping
- [ ] Create Super Admin module for organization management

### Customization Framework
- [ ] Create strategy interfaces for customizable behaviors
- [ ] Implement organization strategy mapping
- [ ] Create customization service in Application
- [ ] Test organization-specific logic

## 🧪 Next Steps - Phase 5 (Testing & Worker)

### Unit Tests
- [ ] Create test projects in `tests/`
- [ ] Test Domain entities and business rules
- [ ] Test Application handlers with mocks
- [ ] Test controllers

### Background Jobs
- [ ] Setup Hangfire or similar job scheduler
- [ ] Create payroll calculation job
- [ ] Create attendance sync job
- [ ] Create report generation job
- [ ] Create notification processing job

## 📊 Development Dependencies to Add

### Core NuGet Packages
```json
{
  "Microsoft.EntityFrameworkCore": "10.0.0",
  "Npgsql.EntityFrameworkCore.PostgreSQL": "10.0.0",
  "MediatR": "12.0.0",
  "MediatR.Extensions.Microsoft.DependencyInjection": "11.0.0",
  "FluentValidation": "11.0.0",
  "AutoMapper": "12.0.0",
  "AutoMapper.Extensions.Microsoft.DependencyInjection": "12.0.0"
}
```

### Testing Packages
```json
{
  "xunit": "2.6.0",
  "Moq": "4.20.0",
  "Microsoft.NET.Test.Sdk": "17.8.0"
}
```

### Optional Enhancement Packages
```json
{
  "Hangfire.Core": "1.8.0",                    // Background jobs
  "StackExchange.Redis": "2.6.0",              // Caching
  "Serilog": "3.0.0",                          // Logging
  "Polly": "8.2.0",                            // Resilience
  "FluentResults": "3.15.0"                    // Result patterns
}
```

### Angular Packages
```json
{
  "@ngrx/store": "latest",                     // State management
  "@ngrx/effects": "latest",
  "rxjs": "latest",
  "@angular/common": "latest",
  "@angular/forms": "latest"
}
```

## 🎯 Quick Start Commands

```bash
# Build solution
dotnet build

# Run database migrations
cd PeopleHub.Server
dotnet ef migrations add Initial --project ../core/PeopleHub.Infrastructure
dotnet ef database update

# Run server
dotnet run

# Run Angular client (in separate terminal)
cd peoplehub.client
npm install
npm start

# Run tests
dotnet test
```

## 📝 Documentation Files

See these files for more information:

- **`docs/ARCHITECTURE.md`** - Complete architecture documentation
- **`docs/MIGRATION_GUIDE.md`** - Guide for moving existing code
- **`docs/API_DESIGN.md`** - (To be created) API endpoint specifications
- **`docs/DATABASE_SCHEMA.md`** - (To be created) Database design
- **`docs/DEVELOPMENT_SETUP.md`** - (To be created) Local development setup

## 🚀 Success Criteria

When complete, your project will have:

✅ **Separation of Concerns** - Each layer has clear responsibilities  
✅ **Multi-Tenant Ready** - Built-in organization isolation  
✅ **API-First Design** - Backend services for web and mobile  
✅ **Clean Architecture** - Testable, maintainable code  
✅ **Scalable Structure** - Background jobs, caching, messaging ready  
✅ **Customizable** - Strategy pattern for client-specific rules  
✅ **No Code Lost** - All existing work preserved  

---

**Start with Phase 1 to get the foundation solid, then move to other phases as needed.**
