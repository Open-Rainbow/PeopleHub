import type {
    IBasicInfoConfig,
    IContactInfoConfig,
    IDocUploadConfig,
    IEduDetailsConfig,
    IInsuDetailsConfig,
    IJobInfoConfig,
    IWorkExperienceConfig,
} from "./add-employee.model";

export type IAddEmployeeConfig = {
    basicInfo: IBasicInfoConfig;
    contactInfo: IContactInfoConfig;
    docUpload: IDocUploadConfig;
    eduDetails: IEduDetailsConfig;
    insuDetails: IInsuDetailsConfig;
    jobDetails: IJobInfoConfig;
    workExperience: IWorkExperienceConfig;
};
