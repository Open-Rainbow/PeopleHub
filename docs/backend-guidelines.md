# Backend Guidelines

You are an expert in ASP.NET Core, clean architecture, and scalable backend systems. Write secure, maintainable, testable, and high-performance backend code.

## Terminology

- Use **organization** terminology consistently in code, APIs, and docs.
- Avoid **tenant** naming unless required by an external contract or third-party integration.

## Core Principles

- Keep **Domain** pure (no infrastructure dependencies).
- Keep **Application** focused on use cases and orchestration.
- Keep **Infrastructure** as implementation details behind interfaces.
- Keep **Server/API** focused on transport concerns (HTTP, auth, serialization, versioning).
- Favor explicitness over magic and hidden behavior.

## Architecture Rules

- Follow dependency direction: `Server -> Application -> Domain`, and `Infrastructure -> (Application, Domain)`.
- Use feature/module-based folders for commands, queries, handlers, validators, and DTOs.
- Keep business rules in Domain entities/value objects/rules, not in controllers.
- Use CQRS for complex domains; keep simple CRUD simple.
- Use idempotent operations for retriable commands.

## API Design

- Use RESTful resource naming with clear versioning strategy.
- Return consistent response models and error payloads (ProblemDetails).
- Validate all incoming payloads using FluentValidation.
- Reject invalid model states early.
- Keep controllers thin: delegate to application handlers/services.
- Use pagination, filtering, and sorting for list endpoints.
- Use cancellation tokens in every async endpoint and service call.

## Coding Standards (C#)

- Enable nullable reference types and treat warnings seriously.
- Prefer async/await end-to-end for I/O-bound paths.
- Avoid sync-over-async (`.Result`, `.Wait()`).
- Use `readonly` and immutable records where possible.
- Keep methods focused and small; split orchestration from logic.
- Avoid primitive obsession; use value objects for domain concepts.
- Avoid static mutable state.

## Data Access (EF Core / Persistence)

- Use explicit migrations; review generated SQL before applying in production.
- Add indexes for frequent filters, joins, and sorting columns.
- Use `AsNoTracking()` for read-only queries.
- Project only required columns (select DTO shape directly).
- Avoid N+1 query patterns; use proper includes or explicit projections.
- Batch writes where possible and reduce transaction scope.
- Use optimistic concurrency tokens for conflict-sensitive entities.
- Keep transactions short and scoped to consistency boundaries.

## Caching Strategy

- Cache expensive, frequently read, low-volatility data.
- Define cache key conventions with organization scoping.
- Always set TTLs and define cache invalidation policy.
- Use cache-aside pattern for most read scenarios.
- Prevent cache stampede with jittered expirations or single-flight locks.
- Never cache sensitive data without encryption and strict key boundaries.

## Security Guidelines

- Enforce authentication and authorization on all protected endpoints.
- Apply least privilege with role/policy-based access.
- Validate organization context on every protected request.
- Sanitize and validate all external input.
- Use parameterized queries only (no dynamic SQL interpolation).
- Protect secrets in secure stores; never commit credentials.
- Enable HTTPS/HSTS and secure cookie/token handling.
- Add rate limiting for abusive or expensive endpoints.
- Log security-sensitive events (auth failures, privilege changes).

## Observability

- Use structured logging with correlation IDs and organization context.
- Log at appropriate levels (`Information`, `Warning`, `Error`, `Critical`).
- Avoid logging secrets or personal/sensitive payload fields.
- Add metrics for latency, throughput, error rates, and queue lag.
- Add tracing for request flow across API, DB, cache, and messaging.
- Define SLOs and alerting thresholds for critical flows.

## Background Jobs and Messaging

- Make consumers/jobs idempotent and retry-safe.
- Use exponential backoff with max retry caps.
- Send poison messages to a dead-letter queue for inspection.
- Keep message contracts versioned and backward compatible.
- Use outbox pattern for reliable publish-after-commit semantics.
- Add visibility metrics for queue depth, processing rate, and failure rate.

## Testing Strategy

- Unit tests for domain rules, value objects, and pure logic.
- Application tests for handlers, validators, and orchestration.
- Integration tests for API + DB + cache + auth boundaries.
- Contract tests for external integrations and message contracts.
- Keep test data deterministic and isolated per test.
- Run critical test suites in CI on every pull request.

## Performance and Optimization Techniques

### Request Path

- Reduce allocations on hot paths.
- Use pooling where beneficial (`ArrayPool`, connection pooling, `HttpClientFactory`).
- Avoid unnecessary serialization work; return only required fields.
- Compress responses for large payloads.

### Database

- Profile slow queries and fix query plans before scaling hardware.
- Add covering indexes for top latency queries.
- Use read replicas for heavy read workloads where consistency allows.
- Precompute aggregates for expensive dashboards/reports.

### Concurrency

- Use bounded concurrency for background processing.
- Avoid global locks; prefer partitioned or key-scoped coordination.
- Set clear timeout budgets per dependency call.

### Network and Integrations

- Use resilient HTTP policies (timeout, retry, circuit breaker, bulkhead).
- Cache integration responses when safe.
- Prefer async streaming for large result sets where applicable.

### Memory and CPU

- Measure before optimizing; use profiling tools and traces.
- Watch Gen2 and LOH pressure for large objects.
- Eliminate repeated expensive computations with memoization/caching.

## Reliability Checklist

- Every endpoint has validation, auth, and cancellation token support.
- Every external call has timeout and resilience policy.
- Every command is idempotent or protected from duplicate execution.
- Every critical flow has logs, metrics, and traces.
- Every persistence change has migration, rollback plan, and tests.

## Pull Request Checklist (Backend)

- Architecture boundaries are respected.
- No domain logic in controllers/infrastructure glue code.
- Validation and error handling are complete.
- Query efficiency reviewed (`AsNoTracking`, projection, indexing implications).
- Security implications reviewed (authz, data exposure, secrets).
- Observability added for new critical paths.
- Tests added/updated with meaningful coverage.

## Definition of Done

- Feature is correct, secure, observable, and performant under expected load.
- P95 latency and error budget targets are met for impacted endpoints.
- Documentation and runbooks are updated for operational support.
