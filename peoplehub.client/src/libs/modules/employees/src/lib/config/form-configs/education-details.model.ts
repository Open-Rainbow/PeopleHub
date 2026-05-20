import { IFormFieldConfig } from 'common';

export interface IEducationDetailsFormFields {
    higherQualification: IFormFieldConfig;
    specialization: IFormFieldConfig;
    yearofPassing: IFormFieldConfig;
    universityName: IFormFieldConfig;
    certifications: IFormFieldConfig;
}

export type { IEducationDetailsForm } from './education-details.types';


