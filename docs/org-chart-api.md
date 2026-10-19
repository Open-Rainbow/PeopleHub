# Org chart API

Base: `/api/v1/org-chart` (`PeopleHub.Server/Controllers/OrgChart/OrgChartController.cs`).
DB: `database/orgchart.sql` (section 13 of `PeopleHub.sql`). No new tables: reporting lines come from
`emp.EmploymentDetail.ReportingManager` (an employee code).

| Method | Route | Notes |
| --- | --- | --- |
| GET | `/` | Flat list of active people: name, designation, department, location, managerId, dotted line, email, mobile, joined, direct / total reports |
| PUT | `{employeeId}/manager` | `{ managerId }` (null = top). Their team moves with them. Returns the updated chart |

Rules (THROW 505xx → 422): nobody reports to themselves, the manager must be an active employee,
and the manager can't be someone already below the employee (no loops). Missing managers or loops
already in the data never hide anyone: those people show as roots (`inLoop = true` when a loop was cut).

The seed adds a CEO, Finance Head, Head of Engineering and Tech Lead (EMP00006–09) and fixes the old
EMP00004 → EMP00001 → EMP00004 loop (HR Manager now reports to the CEO).
