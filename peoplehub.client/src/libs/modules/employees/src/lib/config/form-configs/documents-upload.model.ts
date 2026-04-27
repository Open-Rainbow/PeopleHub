import { IFormFieldConfig } from 'common';

export interface IAddEmployeeFormFields {
    employeePhoto: IFormFieldConfig;
    employeePanNumber: IFormFieldConfig;
    employeePan: IFormFieldConfig;
    employeeAadharNumber: IFormFieldConfig;
    employeeAadhar: IFormFieldConfig;
    employeePassportNumber: IFormFieldConfig;
    employeePassport: IFormFieldConfig;
    last6monthsBankStatements: IFormFieldConfig;
    last3monthsPayslips: IFormFieldConfig;
    experienceLetter: IFormFieldConfig;
    relievingLetter: IFormFieldConfig;
    offerLetter: IFormFieldConfig;
}

export type { IDocumentsUploadForm } from './documents-upload.types';


