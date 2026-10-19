# Leave API

Base route: `api/v1/leave` (LeaveController → LeaveService → LeaveRepository → stored procedures).
Scoped to the caller's organization. Until login exists, pass the employee code (`employeeId=EMP00001`); once JWT is on, the token wins.

| Method | Route | Body | Returns |
|---|---|---|---|
| GET | `/types` | | leave types + rules (entitlement, backdate days, max days, document after) |
| GET | `/holidays?year=2026` | | company holidays |
| GET | `/balances?employeeId=&year=` | | per type: entitlement, used, pending, available |
| GET | `/requests?employeeId=&status=All\|Pending\|Approved\|Rejected\|Cancelled` | | my requests, newest first |
| GET | `/requests/{id}` | | one request or 404 |
| POST | `/requests` | `{ employeeId, leaveType, fromDate, toDate, dayPart, reason }` | 201 + request |
| POST | `/requests/{id}/withdraw` | `{ employeeId }` | request (Cancelled) or 404 |
| GET | `/approvals?approverId=` | | pending requests for a manager (all pending when omitted) |
| POST | `/requests/{id}/decision` | `{ approve, note, approverId }` | request (Approved/Rejected) |

## Rules

Validator (400): leave type in the list, both dates, end ≥ start, at most a year, half day only for one date, reason 5–500 chars, reject needs a note.

`sp_apply_leave` (422, can't be bypassed by any client):
- working days = weekdays minus company holidays (`lv.fn_working_days`), half day = 0.5
- can't start in the past (sick leave: up to 7 days back, from `lv.LeaveType.BackdateDays`)
- per-type max days in one request
- no overlap with a pending/approved request
- balance: approved + pending + this request ≤ yearly entitlement (rows locked, so parallel submits can't overspend)
- approver = reporting manager from `emp.EmploymentDetail`

Withdraw: pending, or approved and not started. Decide: only pending.

## Database (database/leave.sql, also section 10 of PeopleHub.sql)

`org.Holiday`, `lv.LeaveType`, `lv.LeaveRequest`, functions `lv.fn_working_days`, `lv.fn_leave_requests`, 9 procedures. Seeds 5 leave types, 2026–2027 holidays and 5 demo requests for EMP00001.

Entitlements are per organization in `lv.LeaveType.AnnualEntitlement`. Change them there, the UI picks them up.
