// Central step config map (route -> config)
import { basicInfoForm } from '../config/form-configs/basic-info.config';
import { contactInfoForm } from '../config/form-configs/contact-info.config';
import { jobDetailsForm } from '../config/form-configs/job-details.config';
import { educationDetailsForm } from '../config/form-configs/education-details.config';
import { workExperienceForm } from '../config/form-configs/work-experience.config';
import { documentsUploadForm } from '../config/form-configs/documents-upload.config';
import { tempLoginCredentialsForm } from '../../../../../shared/auth/src/lib/config/form-configs/temp-login-credentials.config';

export const STEP_FORM_CONFIG_MAP: Record<string, any> = {
  'basic-info': basicInfoForm,
  'contact-info': contactInfoForm,
  'job-details': jobDetailsForm,
  'education-details': educationDetailsForm,
  'work-experience': workExperienceForm,
  'documents-upload': documentsUploadForm,
  'temp-login-credentials': tempLoginCredentialsForm,
  // Add more as needed
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
