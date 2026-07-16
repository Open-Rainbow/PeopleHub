import type { IAssetsForm } from './assets.types';
import type { IPersonalInfoForm } from './personal-info.types';
import { IChangeRequestsAuditForm } from './change-requests-audit.types';
import type { IContactInfoForm } from './contact-info.types';
import { ICustomFieldsAdditionalForm } from './custom-fields-additional.types';
import type { IDocumentsUploadForm } from './documents-upload.types';
import type { IEducationDetailsForm } from './education-details.types';
import type { IFamilyMemberForm, IDependentForm } from './family-details.model';
import type { IIdentityStatutoryForm } from './identity-statutory.types';
import type {
  IInsurancePolicyForm,
  INomineeForm,
} from './insurance-details.types';
import type { IJobDetailsForm } from './job-details.types';
import type { ISalaryStructureForm } from './salary-structure.types';
import type { ISeparationForm } from './separation.types';
import type { ISkillsForm } from './skills.types';
import type { ITempLoginConfig } from './temp-login.types';
import type { IWorkExperienceForm } from './work-experience.types';

export interface IAddEmployeeConfig {
  personalInfo: IPersonalInfoForm;
  contactInfo: IContactInfoForm;
  familyMember: IFamilyMemberForm;
  dependent: IDependentForm;
  jobDetails: IJobDetailsForm;
  educationDetails: IEducationDetailsForm;
  skills: ISkillsForm;
  salaryStructure: ISalaryStructureForm;
  identityStatutory: IIdentityStatutoryForm;
  workExperience: IWorkExperienceForm;
  insurancePolicy: IInsurancePolicyForm;
  insuranceNominee: INomineeForm;
  documentsUpload: IDocumentsUploadForm;
  tempLoginCredentials: ITempLoginConfig;
  separation: ISeparationForm;
  assets: IAssetsForm;
  customFieldsAdditional: ICustomFieldsAdditionalForm;
  changeRequestsAudit: IChangeRequestsAuditForm;
}
