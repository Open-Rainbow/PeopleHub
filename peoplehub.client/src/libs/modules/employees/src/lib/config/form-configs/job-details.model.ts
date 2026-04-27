import { IFormFieldConfig } from 'common';

export interface IAddEmployeeFormFields {
    officeEmail: IFormFieldConfig;
    department: IFormFieldConfig;
    designation: IFormFieldConfig;
    employeeType: IFormFieldConfig;
    workLocation: IFormFieldConfig;
    shiftTimings: IFormFieldConfig;
    paylevel: IFormFieldConfig;
    reportingManager: IFormFieldConfig;
}

export type { IJobDetailsForm } from './job-details.types';


