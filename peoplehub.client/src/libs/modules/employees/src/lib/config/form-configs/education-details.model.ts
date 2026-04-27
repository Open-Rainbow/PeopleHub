import { IFormFieldConfig } from 'common';

export interface IAddEmployeeFormFields {
    higherQualification: IFormFieldConfig;
    specialization: IFormFieldConfig;
    yearofPassing: IFormFieldConfig;
    universityName: IFormFieldConfig;
    certifications: IFormFieldConfig;
}

export type { IEducationDetailsForm } from './education-details.types';


