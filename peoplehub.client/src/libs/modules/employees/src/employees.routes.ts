import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './lib/components/add-employee/add-employee.component';
import { PersonalInfoComponent } from './lib/components/personal-info/personal-info.component';
import { ContactInfoComponent } from './lib/components/contact-info/contact-info.component';
import { JobDetailsComponent } from './lib/components/job-details/job-details.component';
import { EducationDetailsComponent } from './lib/components/education-details/education-details.component';
import { SalaryStructureComponent } from './lib/components/salary-structure/salary-structure.component';
import { WorkExperienceComponent } from './lib/components/work-experience/work-experience.component';
import { DocumentsUploadComponent } from './lib/components/documents-upload/documents-upload.component';
import { TempLoginCredentialsComponent } from './lib/components/temp-login-credentials/temp-login-credentials.component';
import { FamilyDetailsComponent } from './lib/components/family-details/family-details.component';
import { SkillsComponent } from './lib/components/skills/skills.component';
import { IdentityStatutoryComponent } from './lib/components/identity-statutory/identity-statutory.component';
import { SeparationComponent } from './lib/components/separation/separation.component';
import { AssetsComponent } from './lib/components/assets/assets.component';
import { InsuranceDetailsComponent } from './lib/components/insurance-details/insurance-details.component';
import { ChangeRequestsAuditComponent } from './lib/components/change-requests-audit/change-requests-audit.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    children: [
      { path: '', redirectTo: 'personal-info', pathMatch: 'full' },
      { path: 'personal-info', component: PersonalInfoComponent },
      { path: 'contact-info', component: ContactInfoComponent },
      { path: 'family-details', component: FamilyDetailsComponent },
      { path: 'job-details', component: JobDetailsComponent },
      { path: 'education-details', component: EducationDetailsComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'salary-structure', component: SalaryStructureComponent },
      { path: 'identity-statutory', component: IdentityStatutoryComponent },
      { path: 'work-experience', component: WorkExperienceComponent },
      { path: 'insurance-details', component: InsuranceDetailsComponent },
      { path: 'documents-upload', component: DocumentsUploadComponent },
      {
        path: 'temp-login-credentials',
        component: TempLoginCredentialsComponent,
      },
      { path: 'separation', component: SeparationComponent },
      { path: 'assets', component: AssetsComponent },
      {
        path: 'change-requests-audit',
        component: ChangeRequestsAuditComponent,
      },
    ],
  },
];
