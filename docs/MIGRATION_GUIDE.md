# Migration Guide - From Flat to Clean Architecture

## What Changed

Your PeopleHub project has been restructured from a simple two-project setup to a **multi-layer Clean Architecture** while preserving all existing code.

## Where Things Are Now

### Before (Old Structure)
```
PeopleHub.slnx
├── peoplehub.client/
│   └── src/app/
├── PeopleHub.Server/
│   ├── Controllers/
│   ├── Program.cs
│   └── ...
```

### After (New Structure)
```
PeopleHub.slnx
├── peoplehub.client/
│   └── src/app/           (Now organized by core/shared/features/customization)
├── PeopleHub.Server/      (Thin API host - stays as is, now organized better)
├── core/                  (NEW - Backend business logic)
│   ├── PeopleHub.Domain/  (Business entities & rules)
│   ├── PeopleHub.Application/
│   ├── PeopleHub.Infrastructure/
│   └── PeopleHub.Worker/
├── tests/                 (Unit & integration tests)
├── docs/                  (Architecture & API docs)
└── scripts/               (Utility scripts)
```

## Existing Code - What to Do

### Existing PeopleHub.Server Code

Your existing `Controllers/` and application files remain intact and visible. Here's how to organize them as you develop:

#### Controllers - Keep as is for now, but organize into subfolders:

**Move server-side API classes:**
```
Program.cs
├── Any existing service classes → Extract to Application layer
├── Any existing repository classes → Move to Infrastructure
├── Any existing domain models → Move to Domain
└── Controllers/* → Keep organized in categorical subfolders
```

#### Gradual Migration Path:

1. **Phase 1 (Now)** - Structure is ready, keep working in familiar places
2. **Phase 2** - Extract business logic from controllers to Application layer services
3. **Phase 3** - Move data access from controllers to Infrastructure repositories
4. **Phase 4** - Move domain models to Domain project

### Existing PeopleHub.Client Code

Your existing Angular code remains intact. The new folder structure shows where things should go:

**Existing app files** → Map to new locations:
```
app.component.ts          → App shell (at root)
app.module.ts             → App configuration
app-routing.module.ts     → Route definitions in app/routes/

Existing features         → features/{feature-name}/
  dashboard               → features/dashboard/
  employees               → features/employees/
  
Existing services         → core/services/
Existing guards           → core/guards/
Existing interceptors     → core/interceptors/
Existing shared models    → shared/models/
Existing shared components → shared/components/
```

## How to Move Code to Correct Layers

### Moving Code to Domain (PeopleHub.Domain)

**What belongs here:**
- Business entities (Employee, Organization, LeaveRequest)
- Value objects (Email, Address, DateRange)
- Enums (EmployeeStatus, LeaveType)
- Domain rules/services
- Domain events

**Example - Move business model:**
```csharp
// Before: PeopleHub.Server/Models/Employee.cs or elsewhere
// After: core/PeopleHub.Domain/Entities/Employee.cs

public class Employee
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public EmployeeStatus Status { get; set; }
    
    // Domain methods
    public void Hire() => Status = EmployeeStatus.Active;
    public void Terminate() => Status = EmployeeStatus.Inactive;
}
```

### Moving Code to Application (PeopleHub.Application)

**What belongs here:**
- Use cases / Handlers (CQRS commands/queries)
- DTOs (Data Transfer Objects)
- Services
- Validators
- Mappers

**Example - Move service logic:**
```csharp
// Before: Scattered in PeopleHub.Server
// After: core/PeopleHub.Application/Modules/Employees/Commands/CreateEmployeeHandler.cs

public class CreateEmployeeCommand : IRequest<EmployeeDto>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class CreateEmployeeHandler : IRequestHandler<CreateEmployeeCommand, EmployeeDto>
{
    private readonly IEmployeeRepository _repository;
    
    public async Task<EmployeeDto> Handle(CreateEmployeeCommand request, C.T.)
    {
        var employee = new Employee { /* ... */ };
        await _repository.AddAsync(employee);
        return _mapper.Map<EmployeeDto>(employee);
    }
}
```

### Moving Code to Infrastructure (PeopleHub.Infrastructure)

**What belongs here:**
- Database context
- Repositories
- External service integrations
- Caching implementations
- Business rule implementations

**Example - Database access:**
```csharp
// Before: PeopleHub.Server/Controllers/* directly accessing DB
// After: core/PeopleHub.Infrastructure/Persistence/Repositories/EmployeeRepository.cs

public class EmployeeRepository : IEmployeeRepository
{
    private readonly PeopleHubDbContext _context;
    
    public async Task<Employee> GetByIdAsync(Guid id)
    {
        return await _context.Employees.FindAsync(id);
    }
}
```

### Server Controllers - Keep Thin

Controllers should only:
1. Accept HTTP requests
2. Call Application layer handlers
3. Return HTTP responses

```csharp
// PeopleHub.Server/Controllers/Employees/EmployeesController.cs

[Route("api/v1/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly IMediator _mediator;
    
    [HttpPost]
    public async Task<ActionResult<EmployeeDto>> CreateEmployee([FromBody] CreateEmployeeCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetEmployee), new { id = result.Id }, result);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeDto>> GetEmployee(Guid id)
    {
        var query = new GetEmployeeQuery { Id = id };
        var result = await _mediator.Send(query);
        return Ok(result);
    }
}
```

## Project References - Remember

**You DO NOT need to:**
- Update existing working code immediately
- Rewrite everything
- Delete anything

**You CAN:**
- Add new features using the correct layers
- Gradually move code to appropriate layers
- Keep existing code working while refactoring

## Building & Running

The solution will build successfully because:
1. ✅ Project references are set up correctly
2. ✅ All original files are preserved
3. ✅ New projects have proper dependencies
4. ✅ Solution file includes all projects

```bash
# Build entire solution
dotnet build

# Build specific project
dotnet build core/PeopleHub.Application/PeopleHub.Application.csproj

# Run server
dotnet run --project PeopleHub.Server

# Run Angular client
cd peoplehub.client
npm start
```

## Adding New Features

**For new features, follow this pattern:**

1. **Create Domain Entity** (core/PeopleHub.Domain/Entities/)
2. **Create Application Use Case** (core/PeopleHub.Application/Modules/)
3. **Implement Infrastructure** (core/PeopleHub.Infrastructure/)
4. **Add API Controller** (PeopleHub.Server/Controllers/)
5. **Build UI Components** (peoplehub.client/src/app/features/)

This keeps new code clean from the start while you refactor existing code gradually.

## Customization for Multiple Organizations

The structure now supports:
- **Organization-aware data** - Each table has organization_id
- **Strategy pattern** - Different rules per organization
- **Feature flags** - Enable/disable features per organization
- **Custom themes** - Branding per organization
- **Super Admin portal** - Manage multi-tenant system

See `docs/ARCHITECTURE.md` for details.

## Next: Setup MediatR & Dependencies

When ready, add these common packages to Application layer:
```xml
<PackageReference Include="MediatR" Version="12.0.0" />
<PackageReference Include="FluentValidation" Version="11.0.0" />
<PackageReference Include="AutoMapper" Version="12.0.0" />
```

And to Infrastructure:
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="10.0.0" />
<PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="10.0.0" />
```

---

**Questions?** See ARCHITECTURE.md for complete documentation.
