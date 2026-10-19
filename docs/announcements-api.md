# Announcements API

Base route: `api/v1/announcements` (AnnouncementsController → AnnouncementService → AnnouncementRepository → stored procedures).
Every call is scoped to the caller's organization (`X-Organization-Id` header, JWT claim, or `Organization:DefaultOrganizationId` in dev).

| Method | Route | Body | Returns |
|---|---|---|---|
| GET | `/` `?status=All\|Active\|Scheduled\|Expired&search=&includeScheduled=true` | | `AnnouncementDto[]` (pinned first, newest first) |
| GET | `/summary` | | `{ total, active, scheduled, expired, unread }` |
| GET | `/{id}` | | `AnnouncementDto` or 404 |
| POST | `/` | `AnnouncementRequest` | 201 + `AnnouncementDto` |
| PUT | `/{id}` | `AnnouncementRequest` | `AnnouncementDto` or 404 |
| PATCH | `/{id}/pin` | `{ "isPinned": true }` | `AnnouncementDto` or 404 |
| DELETE | `/{id}` | | 204 (soft delete) or 404 |
| POST | `/read` | `{ "ids": [1, 2] }` | 204 (idempotent) |

## AnnouncementRequest

| Field | Rules |
|---|---|
| title | required, ≤ 120 |
| description | required, ≤ 2000 |
| priority | `High` / `Medium` / `Low` |
| category, department, targetAudience | required (≤ 50 / 100 / 50) |
| publishOn | required; a future date = **Scheduled** (hidden from employee feeds) |
| expiresOn | required, ≥ publishOn, max 1 year after publishOn; on create it can't be in the past |
| isPinned | bool |
| postedBy | optional, ≤ 100 (defaults to "HR Team") |

`status`, `isRead` and `readCount` are computed by the database; status is never stored.

## Database (database/announcements.sql, also section 9 of PeopleHub.sql)

- `ann.Announcement`: one row per announcement, FK to `org.Organization`, audit columns, `IsDeleted` soft delete, CHECK constraints for priority and dates.
- `ann.AnnouncementRead`: PK (AnnouncementId, UserId), one row per user who read it.
- `ann.fn_announcements(@OrganizationId, @UserId)`: inline function shared by the list/single/summary procedures.
- Procedures: `sp_get_announcements`, `sp_get_announcement`, `sp_get_announcement_summary`, `sp_save_announcement`, `sp_set_announcement_pin`, `sp_delete_announcement`, `sp_mark_announcements_read`.
- 8 demo announcements are seeded when the table is empty (dates relative to the run date).

## Frontend

`AnnouncementsService` calls this API through the dev proxy. If the API doesn't answer within 5 s, the pages fall back to local demo data in localStorage. Once the API answers, every write goes to the server, and a failed write re-syncs the list.

Until login is wired up, unauthenticated callers share the read-tracking user `anonymous`.
