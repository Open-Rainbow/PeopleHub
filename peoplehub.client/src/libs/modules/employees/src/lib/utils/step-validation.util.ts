// Central step config map (route -> config)
import { basicInfoForm } from '../config/form-configs/basic-info.config';
import { contactInfoForm } from '../config/form-configs/contact-info.config';
import { familyMemberForm } from '../config/form-configs/family-details.config';
import { jobDetailsForm } from '../config/form-configs/job-details.config';
import { educationDetailsForm } from '../config/form-configs/education-details.config';
import { skillsForm } from '../config/form-configs/skills.config';
import { salaryStructureForm } from '../config/form-configs/salary-structure.config';
import { identityStatutoryForm } from '../config/form-configs/identity-statutory.config';
import { workExperienceForm } from '../config/form-configs/work-experience.config';
import { insurancePolicyForm } from '../config/form-configs/insurance-details.config';
import { documentsUploadForm } from '../config/form-configs/documents-upload.config';
import { tempLoginForm } from '../config/form-configs/temp-login.config';
import { separationForm } from '../config/form-configs/separation.config';
import { assetsForm } from '../config/form-configs/assets.config';
import { customFieldsAdditionalForm } from '../config/form-configs/custom-fields-additional.config';
import { changeRequestsAuditForm } from '../config/form-configs/change-requests-audit.config';

export const STEP_FORM_CONFIG_MAP: Record<string, any> = {
  'basic-info': basicInfoForm,
  'contact-info': contactInfoForm,
  'family-details': familyMemberForm,
  'job-details': jobDetailsForm,
  'education-details': educationDetailsForm,
  'skills': skillsForm,
  'salary-structure': salaryStructureForm,
  'identity-statutory': identityStatutoryForm,
  'work-experience': workExperienceForm,
  'insurance-details': insurancePolicyForm,
  'documents-upload': documentsUploadForm,
  'temp-login-credentials': tempLoginForm,
  'separation': separationForm,
  'assets': assetsForm,
  'custom-fields-additional': customFieldsAdditionalForm,
  'change-requests-audit': changeRequestsAuditForm,
};

// Utility to validate required fields for any step
export function validateStepRequiredFields(
  formGroup: any,
  stepRoute: string,
): { valid: boolean; invalidFields: string[] } {
  const config = STEP_FORM_CONFIG_MAP[stepRoute];
  if (!config) return { valid: true, invalidFields: [] };
  
  const invalidFields: string[] = [];
  Object.keys(config).forEach((key) => {
    const fieldCfg = config[key];
    if (fieldCfg.isRequired && formGroup.controls[key]) {
      const ctrl = formGroup.controls[key];
      if (
        ctrl.invalid ||
        ctrl.value === null ||
        ctrl.value === undefined ||
        ctrl.value === ''
      ) {
        invalidFields.push(key);
      }
    }
  });

  return { valid: invalidFields.length === 0, invalidFields };
}
