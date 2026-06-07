import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { EducationDetailsComponent } from '../education-details/education-details.component';
import { SkillsComponent } from '../skills/skills.component';
import { SalaryStructureComponent } from '../salary-structure/salary-structure.component';
import { IdentityStatutoryComponent } from '../identity-statutory/identity-statutory.component';
import { WorkExperienceComponent } from '../work-experience/work-experience.component';
import { InsuranceDetailsComponent } from '../insurance-details/insurance-details.component';
import { DocumentsUploadComponent } from '../documents-upload/documents-upload.component';
import { TempLoginCredentialsComponent } from '../temp-login-credentials/temp-login-credentials.component';
import { SeparationComponent } from '../separation/separation.component';
import { AssetsComponent } from '../assets/assets.component';
import { CustomFieldsAdditionalComponent } from '../custom-fields-additional/custom-fields-additional.component';
import { ChangeRequestsAuditComponent } from '../change-requests-audit/change-requests-audit.component';
import { Routes } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'story-add-employee-wrapper',
  standalone: true,
  imports: [AddEmployeeComponent],
  template: `<employees-add-employee></employees-add-employee>`,
})
class AddEmployeeWrapperComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.router.navigate(['/add-employee/basic-info']);
  }
}

type Story = StoryObj<AddEmployeeWrapperComponent>;

const childRoutes: Routes = [
  { path: '', redirectTo: 'basic-info', pathMatch: 'full' },
  { path: 'basic-info', component: BasicInfoComponent },
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
  { path: 'temp-login-credentials', component: TempLoginCredentialsComponent },
  { path: 'separation', component: SeparationComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'custom-fields-additional', component: CustomFieldsAdditionalComponent },
  { path: 'change-requests-audit', component: ChangeRequestsAuditComponent },
];

const meta: Meta<AddEmployeeWrapperComponent> = {
  component: AddEmployeeWrapperComponent,
  title: 'Employees/Add Employee',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'add-employee', component: AddEmployeeComponent, children: childRoutes },
        ]),
        AddEmployeeWrapperComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const AddEmployee: Story = {
  render: () => ({
    template: `<router-outlet></router-outlet>`,
  }),
};

