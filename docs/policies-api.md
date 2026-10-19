# Policies API (`api/v1/policies`)

Database: section 15 of `database/PeopleHub.sql` (also `database/policies.sql`). Business-rule errors return **422** (`THROW 507xx`).
Until login exists: employees pass `employeeId`; HR / admin / super-admin screens pass `manage=true`.

| Method | Route | Notes |
|---|---|---|
| GET | `categories` | Workplace, HR, IT & Security, Leave & Attendance, Finance, Code of Conduct, Health & Safety, Other |
| GET | `?employeeId=&category=&search=` | employee: published policies for everyone or their department, with `acknowledgedAt` |
| GET | `?manage=true&status=&category=&search=` | HR: every policy incl. drafts / archived, with `ackCount / audienceCount` |
| GET | `{id}?employeeId=` / `{id}?manage=true` | includes the policy text |
| GET | `{id}/file?employeeId=[&inline=true]` | download (or open) the attachment |
| POST | `` | create. `{title, category, summary, content, file:{fileName, data (base64 / data URI)}, effectiveFrom, requiresAck, audience, isPinned, publish}` |
| PUT | `{id}` | update; `removeFile`, `newVersion` (published policy -> everyone acknowledges again) |
| POST | `{id}/status` | `{status: Draft \| Published \| Archived}` |
| DELETE | `{id}` | soft delete |
| POST | `{id}/acknowledge` | `{employeeId}` |
| GET | `{id}/acknowledgements` | everyone in the audience, `acknowledgedAt` null = pending |

Files: PDF, Word, Excel, PowerPoint, text, PNG / JPG; up to 10 MB. Either policy text or a file is required.
