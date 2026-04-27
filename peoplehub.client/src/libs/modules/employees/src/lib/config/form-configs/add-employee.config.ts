import { IAddEmployeeConfig } from "./add-employee.model";
import { basicInfoForm } from "./basic-info.config";
import { contactInfoForm } from "./contact-info.config";
import { documentsUploadForm } from "./documents-upload.config";
import { educationDetailsForm } from "./education-details.config";
import { insuranceDetailsForm } from "./insurance-details.config";
import { jobDetailsForm } from "./job-details.config";
import { workExperienceForm } from "./work-experience.config";

export const addEmployeeConfig: IAddEmployeeConfig = {
    basicInfo: basicInfoForm,
    contactInfo: contactInfoForm,
    docUpload: documentsUploadForm,
    eduDetails: educationDetailsForm,
    insuDetails: insuranceDetailsForm,
    jobDetails: jobDetailsForm,
    workExperience: workExperienceForm,
} 