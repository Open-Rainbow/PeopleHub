# Leave Policy API

HR defines one leave policy per **year + employment type** (Full Time, Part Time, Contract, Intern).
Each policy has at most one **Draft** (being edited) and one **Published** version (in force). Publishing archives the previous version.
Apply Leave always uses the **published** policy for the employee's employment type and the year the leave starts. With no published policy, the `lv.LeaveType` defaults apply.

| Method | Route | Body / query | Returns |
|---|---|---|---|
| GET | `api/v1/leave/employment-types` | | `string[]` |
| GET | `api/v1/leave/policies` | `?year` | `LeavePolicySummaryDto[]` (published version, has draft) |
| GET | `api/v1/leave/policies/current` | `?year&employmentType&status=Draft\|Published` | `LeavePolicyDto` (draft, else published, else defaults with `status: "None"`) |
| PUT | `api/v1/leave/policies/draft` | `SaveLeavePolicyRequest` | `LeavePolicyDto` (the draft) |
| POST | `api/v1/leave/policies/publish` | `{ year, employmentType }` | `LeavePolicyDto` (published) |
| POST | `api/v1/leave/policies/discard` | `{ year, employmentType }` | `LeavePolicyDto` (what is left) |
| POST | `api/v1/leave/policies/copy` | `{ sourceYear, targetYear, employmentType? }` | `{ created, message }` |
| GET | `api/v1/leave/types` | `?employeeId&year` | rules in force for the employee, incl. `carryIn` and `approvalType` |

## Item fields

`code` (slug, generated from `label` when empty), `label`, `description`, `category` (standard / parental / additional),
`annualAllowance` (null = unlimited, unpaid only), `carryForwardDays` (≤ allowance), `isPaid`, `isEncashable` (paid only),
`mustBeTakenWithinMonths` (1-24), `allowanceBasis` (Yearly / Monthly accrual / Pro-rata), `approvalType` (Auto / Manager / HR / Manager + HR),
`certificateRequired` + `certificateAfterDays`, `backdateDays` (0-30), `maxConsecutive`.

## Enforced when applying for leave

Included types only (THROW 50214), allowance + carry forward from last year, backdating, max days per request, and `Auto` approval (request is approved at once).
Stored but not enforced yet: allowance basis (accrual / pro-rata), must be taken within, encashment.

## Errors

400 validation, 404 no draft to publish/discard, 422 from the procedures: 50221 bad items, 50222 duplicate type, 50223 no draft, 50224 empty draft, 50225 same year, 50226 nothing to copy.
