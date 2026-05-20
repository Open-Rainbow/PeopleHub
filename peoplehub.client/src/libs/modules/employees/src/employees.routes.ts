import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './lib/components/add-employee/add-employee.component';
import { BasicInfoComponent } from './lib/components/basic-info/basic-info.component';
import { ContactInfoComponent } from './lib/components/contact-info/contact-info.component';
import { JobDetailsComponent } from './lib/components/job-details/job-details.component';
import { EducationDetailsComponent } from './lib/components/education-details/education-details.component';
import { SalaryStructureComponent } from './lib/components/salary-structure/salary-structure.component';
import { WorkExperienceComponent } from './lib/components/work-experience/work-experience.component';
import { DocumentsUploadComponent } from './lib/components/documents-upload/documents-upload.component';
import { TempLoginCredentialsComponent } from './lib/components/temp-login-credentials/temp-login-credentials.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    children: [
      { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
      { path: 'basic-info', component: BasicInfoComponent },
      { path: 'contact-info', component: ContactInfoComponent },
      { path: 'job-details', component: JobDetailsComponent },
      { path: 'education-details', component: EducationDetailsComponent },
      { path: 'salary-structure', component: SalaryStructureComponent },
      { path: 'work-experience', component: WorkExperienceComponent },
      { path: 'documents-upload', component: DocumentsUploadComponent },
      {
        path: 'temp-login-credentials',
        component: TempLoginCredentialsComponent,
      },
    ],
  },
];
