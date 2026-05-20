import type {
    IBasicInfoConfig,
    IContactInfoConfig,
    IDocumentsUploadConfig,
    IEducationDetailsConfig,
    IInsuranceDetailsConfig,
    IJobDetailsConfig,
    IWorkExperienceConfig,
} from "./add-employee.model";

export type IAddEmployeeConfig = {
    basicInfo: IBasicInfoConfig;
    contactInfo: IContactInfoConfig;
    documentsUpload: IDocumentsUploadConfig;
    educationDetails: IEducationDetailsConfig;
    insuranceDetails: IInsuranceDetailsConfig;
    jobDetails: IJobDetailsConfig;
    workExperience: IWorkExperienceConfig;
};
