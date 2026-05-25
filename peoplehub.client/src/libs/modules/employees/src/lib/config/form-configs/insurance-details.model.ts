import { IFormFieldConfig } from 'common';

export interface IInsuranceDetailsFormFields {
    fatherName: IFormFieldConfig;
    fatherAadhaarNumber: IFormFieldConfig;
    aadhaarUpload: IFormFieldConfig;
    fatherPanNumber: IFormFieldConfig;
    panUpload: IFormFieldConfig;
    dob: IFormFieldConfig;
    occupation: IFormFieldConfig;
    motherName: IFormFieldConfig;
    motherAadhaarNumber: IFormFieldConfig;
    motherPanNumber: IFormFieldConfig;
    dateOfBirth: IFormFieldConfig;
    spouseName: IFormFieldConfig;
    spouseAadhaarNumber: IFormFieldConfig;
    spousePanNumber: IFormFieldConfig;
}

export type { IInsuranceDetailsForm } from './insurance-details.types';




