# Payroll API (`api/v1/payroll`)

Database: section 14 of `database/PeopleHub.sql` (also `database/payroll.sql`). Business-rule errors come back as **422** (SQL `THROW 506xx`).
Until login exists, employee endpoints take `employeeId` (EMP00001) in the query / body; once authenticated the token wins.

## How a month is paid
1. **Settings + components** (HR, once): PF / ESI / PT / TDS switches; how CTC splits into Basic, HRA, allowances (one component takes the balance).
2. **Salary structures**: each employee gets an annual CTC from a date (`revisions` keep history). Preview shows the monthly split.
3. **Run**: `POST runs {year, month}` → add adjustments (bonus / arrears / recoveries) and LOP overrides → `process` (repeatable) → `lock` → `publish`.
   Any input change (structure, settings, declaration, approved claim) moves a *Processed* run back to *Draft*.
4. Employees see **published** payslips; approved reimbursements are paid in the next published run.

## Maths (PayrollCalculator)
- CTC = gross + employer PF + employer ESI. PF 12% of basic, capped at the ₹15,000 ceiling (configurable). ESI 0.75% / 3.25% when gross ≤ ₹21,000. PT by state slab.
- LOP = days before joining + unpaid leave (+ absent days when `lopFromAttendance`), or HR's override. Prorated components are reduced by paid days / days in month.
- TDS: projects the FY's taxable salary (YTD + this month + current structure for the remaining months), applies the chosen regime (new: ₹75k std deduction, 87A rebate up to ₹12L with marginal relief; old: ₹50k std deduction, PT, HRA exemption, 80C/80D/80CCD(1B)/24(b) caps, 80E/80G), adds 4% cess, subtracts TDS already deducted and spreads the rest over the months left.

## Endpoints
| Method | Route | Notes |
|---|---|---|
| GET/PUT | `settings` | |
| GET/PUT | `components` | `{components:[{code,name,calcType,value,isTaxable,isProrated}]}` |
| GET | `pt-slabs?state=` | |
| GET | `structures?search=` | every active employee + current CTC |
| POST | `structures/preview` | `{annualCtc, pfApplicable}` |
| GET | `structures/{employeeId}` | breakdown + revisions |
| POST | `structures/{employeeId}/revisions` | `{annualCtc, effectiveFrom, pfApplicable, reason}` |
| GET | `me/salary?employeeId=` | |
| GET/POST | `runs` | `?year=` / `{year, month, note}` |
| GET/DELETE | `runs/{id}` | delete only while not locked |
| POST | `runs/{id}/process` · `lock` · `unlock` · `publish` | |
| GET | `runs/{id}/payslips` | |
| GET/POST | `runs/{id}/adjustments` | `{employeeId, kind: Earning\|Deduction, label, amount, isTaxable}` |
| DELETE | `runs/{id}/adjustments/{adjustmentId}` | |
| PUT | `runs/{id}/lop/{employeeId}` | `{lopDays (null = calculated), reason}` |
| GET | `payslips?employeeId=` · `payslips/{id}?employeeId=` | published only for employees |
| GET/PUT | `declarations` | `?employeeId=&fy=&status=` / `{employeeId, financialYear, regime, items:[{section,description,amount}], submit}` |
| POST | `declarations/{id}/decision` | `{approve, note, items:[{id, approvedAmount}]}` |
| POST | `tax/compare` | `{employeeId, items}` → tax under both regimes |
| GET/POST | `reimbursements` | `?employeeId=&status=` / `{employeeId, category, claimDate, amount, description, billNumber}` |
| POST | `reimbursements/{id}/decision` · `cancel` | |
