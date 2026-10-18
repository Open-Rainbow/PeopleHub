# Add Employee: API contract map

All endpoints are on `AddEmployeeController`, `POST api/v1/add-employee/{step}`, and every one returns `SaveResponse(Id, EmployeeId, Message)`.
Contracts live in `core/PeopleHub.Application/Modules/Employees/AddEmployee/Contracts/`.

| # | Step | Endpoint | Request | Lists inside |
|---|---|---|---|---|
| 1 | Personal Information | `personal-info` | `PersonalInfoRequest` | none |
| 2 | Contact Details | `contact-info` | `ContactInfoRequest` | `Addresses[]`, `EmergencyContacts[]` |
| 3 | Family and Dependents | `family-details` | `FamilyDetailsRequest` | `FamilyMembers[]`, `Dependents[]` |
| 4 | Employment Details | `job-details` | `JobDetailsRequest` | none |
| 5 | Education Details | `education-details` | `EducationDetailsRequest` | `Educations[]`, `Certifications[]` |
| 6 | Skills and Competencies | `skills` | `SkillsRequest` | `Skills[]` |
| 7 | Compensation, Payroll and Bank | `salary-structure` | `SalaryStructureRequest` | `SalaryStructures[]` |
| 8 | Identity and Statutory | `identity-statutory` | `IdentityStatutoryRequest` | `IdentityDocuments[]`, `DocumentRepository[]` |
| 9 | Previous Employment | `work-experience` | `WorkExperienceRequest` | `WorkExperiences[]` |
| 10 | Insurance and Benefits | `insurance-details` | `InsuranceDetailsRequest` | `Policy` + `Nominee` (single objects) |
| 11 | Employee Documents | `documents` | `DocumentsUploadRequest` | none |
| 12 | System Access | `temp-login` | `TempLoginRequest` | none |
| 13 | Separation and Exit | `separation` | `SeparationRequest` | none |
| 14 | Assets and Compliance | `assets` | `AssetsRequest` | `SystemAccess[]`, `Assets[]` |
| 15 | Change Requests and Audit | `change-requests-audit` | `ChangeRequestsAuditRequest` | none |

## Rules

- Step 1 creates the employee and returns `EmployeeId`. Every later step sends that `EmployeeId`.
- `Id` empty means insert, `Id` set means update. List rows carry their own `Id`.
- JSON is camelCase and matches the Angular form control ids (binding is case-insensitive).
- Types: date fields are `DateTime?`, checkboxes and toggles are `bool`, money and percent fields are `decimal?`, and files are base64 / data-URI `string?`.
- The comments on each property (required, max N) come from the Angular configs. Validators should copy them.

## UI inconsistencies to fix (found while mapping)

- Contact: `priorityOrder` is rendered as a checkbox but configured like a number.
- Identity: `genericFileUpload` is rendered as a text box, not a file upload.
- Insurance nominee: `linkedFamilyOrDependentRecord`, `proofDocumentLink` and `address` have `maxLength: 10`, which looks wrong.
- Salary: the `salaryStructure` config field is never rendered. `reEnterAccountNumber` is UI-only and not sent.
- Personal Info: the configs say names are max 50, but the SP allows 250. Pick one.
- Insurance: Policy and Nominee are single objects in the UI. Most HRMS designs allow several of each, so decide before writing the SP.
