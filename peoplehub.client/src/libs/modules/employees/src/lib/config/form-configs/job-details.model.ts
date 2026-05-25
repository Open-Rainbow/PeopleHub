import { IFormFieldConfig } from 'common';

export interface IJobDetailsFormFields {
    officeEmail: IFormFieldConfig;
    department: IFormFieldConfig;
    designation: IFormFieldConfig;
    employeeType: IFormFieldConfig;
    workLocation: IFormFieldConfig;
    shiftTimings: IFormFieldConfig;
    payLevel: IFormFieldConfig;
    reportingManager: IFormFieldConfig;
}

export type { IJobDetailsForm } from './job-details.types';




