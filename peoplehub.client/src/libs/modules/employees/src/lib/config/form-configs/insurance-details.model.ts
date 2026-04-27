import { IFormFieldConfig } from 'common';

export interface IAddEmployeeFormFields {
    fatherName: IFormFieldConfig;
    fatherAadharNumber: IFormFieldConfig;
    aadharUpload: IFormFieldConfig;
    fatherPanNumber: IFormFieldConfig;
    panUpload: IFormFieldConfig;
    dob: IFormFieldConfig;
    occupation: IFormFieldConfig;
    motherName: IFormFieldConfig;
    motherAadharNumber: IFormFieldConfig;
    motherPanNumber: IFormFieldConfig;
    dateofBirth: IFormFieldConfig;
    spouseName: IFormFieldConfig;
    spouseAadharNumber: IFormFieldConfig;
    spousePanNumber: IFormFieldConfig;
}

export type { IInsuranceDetailsForm } from './insurance-details.types';


