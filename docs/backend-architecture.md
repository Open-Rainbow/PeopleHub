# PeopleHub Backend: keep it simple

```text
Controller  ->  Service  ->  Repository  ->  SqlDb  ->  Stored procedure
(HTTP only)    (validate)    (SP params)    (Dapper)
```

## Where things live (Add Employee example)

| Layer | File | Job |
|---|---|---|
| Server | `Controllers/Employees/AddEmployeeController.cs` | One controller for all 15 steps. One line per action. |
| Application | `Modules/Employees/AddEmployee/Contracts/*Request.cs`, `SaveResponse.cs` | Request/response shapes. Property names = Angular form control names. |
| Application | `.../AddEmployee/Validators/*Validator.cs` | FluentValidation rules (auto-registered). |
| Application | `.../AddEmployee/Services/AddEmployeeService.cs` | Validate, then call the repository. |
| Application | `.../AddEmployee/Interfaces/` | `IAddEmployeeService`, `IAddEmployeeRepository`. |
| Infrastructure | `Modules/Employees/AddEmployeeRepository.cs` | Builds SP parameters, calls `SqlDb`. |
| Infrastructure | `Database/SqlDb.cs` | The only class that opens SQL connections. |
| Domain | `Modules/Employees/EmployeeRules.cs` | Pure rules (age, etc.). |

## Adding a step (e.g. Contact Info)

1. `Contracts/ContactInfoRequest.cs`
2. `Validators/ContactInfoValidator.cs`
3. Add `SaveContactInfoAsync` to `IAddEmployeeService` + `AddEmployeeService` (inject `IValidator<ContactInfoRequest>`).
4. Add `SaveContactInfoAsync` to `IAddEmployeeRepository` + `AddEmployeeRepository` (call the SP).
5. Add `[HttpPost("contact-info")]` to `AddEmployeeController`.

Nothing else to register.

## Errors the client gets (ProblemDetails)

| When | Status |
|---|---|
| Validator fails | 400 + `errors: { FirstName: [...] }` |
| Duplicate key / FK (SQL 2627, 2601, 547) | 409 |
| SP raises `THROW 50001, 'message', 1;` | 422, `detail` = message |
| Anything else | 500 |

## Rules

- Routes: `api/v1/<module>/<step>` in kebab-case.
- Always pass `CancellationToken` down.
- Empty strings are sent to SPs as NULL (`Clean()` in the repository).
- Secrets go in user-secrets or env vars, not appsettings.json.
