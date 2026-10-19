# Attendance API

Base: `/api/v1/attendance` (controller `PeopleHub.Server/Controllers/Attendance/AttendanceController.cs`).
DB: `database/attendance.sql` (section 12 of `PeopleHub.sql`), schema `att`.

Times are stored and returned in the organization's local time zone (`att.Policy.TimeZone`, default India Standard Time).
"Today" is decided by the database, so a server in another time zone still gets the right day.
Until login exists, pass `employeeId` (e.g. `EMP00001`); once authenticated, the token wins.

| Method | Route | Notes |
| --- | --- | --- |
| GET | `policy` | Shift start/end, grace minutes, full/half day hours, regularize window, `serverNow` |
| GET | `days?employeeId&from&to` | One row per day. Default current month, max 93 days |
| POST | `check-in` | `{ employeeId, workMode: Office/Remote, note }` → `{ message, today }` |
| POST | `check-out` | `{ employeeId, note }` → `{ message, today }` |
| GET | `team?date&search&managerId` | Everyone's status for a day (HR / manager) |
| GET | `trend?from&to` | Daily present / late / remote / on leave / absent counts. Default last 30 days, max 62 |
| GET | `regularizations?employeeId&status` | status: All, Pending, Approved, Rejected, Cancelled |
| GET | `regularizations/{id}` | |
| POST | `regularizations` | `{ employeeId, workDate, checkIn: "09:30", checkOut: "18:30", workMode, reason }` |
| POST | `regularizations/{id}/decision` | `{ approve, note, approverId }`. Approving writes the attendance record (Source = Regularized) |
| POST | `regularizations/{id}/cancel` | `{ employeeId }`, pending only |

Day status: Present (≥ full day hours), Half day (≥ half day hours), Short day, Working (checked in today),
Missed check-out, On leave (approved leave), Holiday, Weekend, Not checked in (today), Absent, Upcoming.
Late = check-in after shift start + grace.

Business errors come back as 422 with the SP message (THROW 50401 to 50415):
already checked in/out, check in first, corrections only for the last N days, a pending correction already exists,
reject needs a note, only pending requests can be withdrawn.
