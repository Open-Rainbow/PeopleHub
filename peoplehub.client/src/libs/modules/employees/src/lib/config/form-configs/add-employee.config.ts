import { IAddEmployeeConfig } from './add-employee.types';
import { assetsForm } from './assets.config';
import { personalInfoForm } from './personal-info.config';
import { changeRequestsAuditForm } from './change-requests-audit.config';
import { contactInfoForm } from './contact-info.config';
import { customFieldsAdditionalForm } from './custom-fields-additional.config';
import { documentsUploadForm } from './documents-upload.config';
import { educationDetailsForm } from './education-details.config';
import { familyMemberForm, dependentForm } from './family-details.config';
import { identityStatutoryForm } from './identity-statutory.config';
import { insurancePolicyForm, nomineeForm } from './insurance-details.config';
import { jobDetailsForm } from './job-details.config';
import { salaryStructureForm } from './salary-structure.config';
import { separationForm } from './separation.config';
import { skillsForm } from './skills.config';
import { tempLoginForm } from './temp-login.config';
import { workExperienceForm } from './work-experience.config';

export const addEmployeeConfig: IAddEmployeeConfig = {
  personalInfo: personalInfoForm,
  contactInfo: contactInfoForm,
  familyMember: familyMemberForm,
  dependent: dependentForm,
  jobDetails: jobDetailsForm,
  educationDetails: educationDetailsForm,
  skills: skillsForm,
  salaryStructure: salaryStructureForm,
  identityStatutory: identityStatutoryForm,
  workExperience: workExperienceForm,
  insurancePolicy: insurancePolicyForm,
  insuranceNominee: nomineeForm,
  documentsUpload: documentsUploadForm,
  tempLoginCredentials: tempLoginForm,
  separation: separationForm,
  assets: assetsForm,
  customFieldsAdditional: customFieldsAdditionalForm,
  changeRequestsAudit: changeRequestsAuditForm,
};
