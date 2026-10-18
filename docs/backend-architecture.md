# PeopleHub Backend Architecture

Practical companion to `ARCHITECTURE.md`. This is how the backend is actually built today.

## Decisions (and why)

| Topic | Choice | Why |
|---|---|---|
| Database | SQL Server, stored procedures | Matches the existing DB and `dbo.sp_*` procedures. |
| Data access | Dapper via one `IStoredProcedureExecutor` | Thin, fast, and SP-friendly. Timeouts, cancellation and SQL error mapping live in one place. |
| CQRS | In-house `IDispatcher` + pipeline behaviors | Same shape as MediatR without the commercial licence (MediatR 13+ is paid). |
| Validation | FluentValidation, run by `ValidationBehavior` | Handlers only ever see valid input. |
| Mapping | Manual (`*Dta.From(...)`) | AutoMapper is commercial now, and explicit mapping is easier to debug. |
| Errors | Typed `AppException`s -> `GlobalExceptionHandler` -> ProblemDetails | One error shape for the Angular client. |
| Auth | JWT bearer, fallback policy = authenticated | Off in dev (`Authentication:Jwt:Enabled=false`) until the login API exists. |
| Org scoping | `IRequestContext.OrganizationId` | Claim `org_id`. In dev, the `X-Organization-Id` header or `DefaultOrganizationId`. |
| Tracing | `X-Correlation-Id` middleware | Echoed in the response, in log scopes and in ProblemDetails. |

The Postgres/EF/MediatR/AutoMapper/Redis/RabbitMQ items in `ARCHITECTURE.md` are a target, not the current state. Add them only when a feature needs them.

## Projects

```text
PeopleHub.Server            HTTP only: controllers, middleware, auth, ProblemDetails
  Common/                   ApiControllerBase, ApiRoutes
  Configuration/            JwtOptions, OrganizationOptions
  Context/                  HttpRequestContext (IRequestContext for HTTP)
  Controllers/<Module>/     thin controllers -> Dispatcher.SendAsync(...)
  Errors/                   GlobalExceptionHandler
  Extensions/               AddPeopleHubApi / UsePeopleHubApi
  Middleware/               CorrelationIdMiddleware

core/PeopleHub.Application  use cases
  Abstractions/             Messaging (ICommand/IQuery/handlers/IDispatcher), Context, Time
  Common/                   Dispatcher, Behaviors, Exceptions, Models (paging), Utilities
  Modules/<Module>/<Feature>/
    Commands/<UseCase>/     XCommand, XCommandHandler, XCommandValidator
    Queries/<UseCase>/      XQuery, XQueryHandler, XDto
    Interfaces/             IXRepository (port)

core/PeopleHub.Domain       pure rules (EmployeeRules), base entities, DomainException

core/PeopleHub.Infrastructure  adapters
  Persistence/              SqlConnectionFactory, StoredProcedureExecutor, DatabaseOptions
  Time/                     SystemDateTimeProvider
  Modules/<Module>/         <Module>Infrastructure.cs (DI) + <Feature>/DTAs + Repositories

core/PeopleHub.Worker       background host. WorkerRequestContext, one DI scope per job

tests/PeopleHub.Application.Tests  xUnit + Moq, tests run through the real pipeline
```

Dependency direction: `Server -> Application -> Domain`, `Infrastructure -> Application/Domain`. Only `Program.cs` composes Infrastructure.

## Request flow

```text
HTTP -> CorrelationId -> ExceptionHandler -> Auth -> Controller
     -> Dispatcher -> LoggingBehavior -> ValidationBehavior -> Handler
     -> IXRepository (Infrastructure) -> StoredProcedureExecutor -> SQL Server
```

## Error contract (what the Angular client gets)

| Exception | Status | Body |
|---|---|---|
| `RequestValidationException` | 400 | `ValidationProblemDetails` with `errors: { FirstName: [..] }` |
| `ForbiddenException` | 403 | ProblemDetails |
| `NotFoundException` | 404 | ProblemDetails |
| `ConflictException` (SQL 2627/2601/547) | 409 | ProblemDetails |
| `BusinessRuleException` (SP `THROW 50001+`) | 422 | ProblemDetails, `detail` = SP message |
| anything else | 500 | ProblemDetails, detail only in Development |

Every body also carries `traceId` and `correlationId`.

## Recipe: add an Add Employee step API (e.g. Contact Info)

1. **Command**: `Application/Modules/Employees/ContactInfo/Commands/SaveContactInfo/SaveContactInfoCommand.cs`, a record implementing `ICommand<EmployeeSectionSaveResult>`. Property names must match the Angular form control names.
2. **Validator**: `SaveContactInfoCommandValidator : AbstractValidator<SaveContactInfoCommand>`. Max lengths come from the SP parameter sizes.
3. **Port**: `Interfaces/IContactInfoRepository.cs`.
4. **Handler**: `internal sealed class SaveContactInfoCommandHandler(IContactInfoRepository repo) : ICommandHandler<...>`. It is auto-registered.
5. **Adapter**: `Infrastructure/Modules/Employees/ContactInfo/DTAs/ContactInfoDta.cs` + `Repositories/ContactInfoRepository.cs` using `IStoredProcedureExecutor` and `DynamicParameters`.
6. **DI**: one line in `EmployeesInfrastructure.AddEmployeesInfrastructure`.
7. **Controller**: `Server/Controllers/Employees/ContactInfoController.cs` with `[Route(ApiRoutes.Employees.Root + "/contact-info")]`, inheriting `ApiControllerBase`.
8. **Test**: add a pipeline test in `tests/PeopleHub.Application.Tests/Employees`.

Validators and handlers are discovered automatically. Only repositories need manual DI registration.

## Conventions

- Routes: `api/v1/<module>/<resource>` in kebab-case. Prefixes come from `ApiRoutes`.
- Every async method takes a `CancellationToken` and passes it down.
- Never log request payloads (PII). `LoggingBehavior` logs only the name and duration.
- Never use `DateTime.Now` in Application. Inject `IDateTimeProvider`.
- SPs raise business errors with `THROW 50001, 'Readable message', 1;` and they surface as 422.
- Organization: once the DB has an `OrganizationId` column, pass `context.RequireOrganizationId()` into every SP.
- Secrets (JWT signing key, prod connection string) go in user-secrets or env vars, never in appsettings.json.
